// Custom HDR render pipeline:
//   1. exterior scene  -> rtScene (HalfFloat + depth texture)
//   2. volumetric water pass (background water, Snell window, sun shafts,
//      raymarched headlight cones with HG phase)           -> rtVol
//   3. interior (cockpit) scene rendered on top of rtVol (own depth)
//   4. bloom (13-tap down / tent up mip chain)
//   5. final: ACES tone-mapping, grading, vignette, chromatic aberration, grain,
//      lens effects (condensation, damage flash, blackout)
import * as THREE from 'three';
import { waterUniforms, WATER_GLSL } from './water.js';

const FSQ_VERT = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

function fsMat(frag, uniforms, defines = {}) {
  return new THREE.ShaderMaterial({
    vertexShader: FSQ_VERT, fragmentShader: frag, uniforms, defines,
    depthTest: false, depthWrite: false, toneMapped: false,
  });
}

const MAX_SPOTS = 4;

const VOL_FRAG = /* glsl */ `
#include <packing>
${WATER_GLSL.replace('varying vec3 vWaterWorld;', '')}
varying vec2 vUv;
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform mat4 uInvProj;
uniform mat4 uInvView;
uniform vec3 uCamPos;
uniform float uNear, uFar;
uniform vec2 uRes;
uniform float uFrame;
uniform int uSpotCount;
uniform vec3 uSpotPos[${MAX_SPOTS}];
uniform vec3 uSpotDir[${MAX_SPOTS}];
uniform vec3 uSpotColor[${MAX_SPOTS}];
uniform float uSpotCos[${MAX_SPOTS}];
uniform float uSpotPen[${MAX_SPOTS}];
uniform float uScatterBoost;
uniform float uSilt;
uniform float uRayStart;
uniform float uScatB;

float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hgPhase(float mu, float g){ float g2 = g*g; return (1.0 - g2) / (4.0*3.14159*pow(1.0 + g2 - 2.0*g*mu, 1.5)); }

vec3 viewRay(vec2 uv){
  vec4 c = uInvProj * vec4(uv * 2.0 - 1.0, 1.0, 1.0);
  vec3 v = normalize(c.xyz / c.w);
  return normalize((uInvView * vec4(v, 0.0)).xyz);
}
float linDepth(float d){
  // perspective depth -> view z distance
  float z = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
}
// cheap 2D noise for shafts
float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash12(i), b=hash12(i+vec2(1,0)), c=hash12(i+vec2(0,1)), d=hash12(i+vec2(1,1));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y); }

void main(){
  vec3 col = texture2D(tColor, vUv).rgb;
  float d = texture2D(tDepth, vUv).x;
  vec3 rd = viewRay(vUv);
  bool bg = d >= 0.99999;
  // distance along the ray to the hit
  vec4 cv = uInvProj * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  vec3 vpos = cv.xyz / cv.w;
  float dist = bg ? 600.0 : length(vpos);

  vec3 amb = waterAmbient(uCamPos.y);
  vec3 sigma = uSigma * (1.0 + uSilt * 6.0);

  if (bg) {
    // infinite water column. Looking up we see brighter water, down it goes dark.
    float up = rd.y;
    // radiance gradient: light coming from above
    float yl = uCamPos.y + up * 60.0;
    vec3 a2 = waterAmbient(min(yl, 0.0));
    float mu = dot(rd, uSunDir);
    float phase = 0.55 + 0.9 * pow(max(mu, 0.0), 6.0) + 0.35 * max(up, 0.0);
    col = a2 * uScatTint * phase * 0.22;
    // Snell's window: the surface seen from below
    if (up > 0.0 && uCamPos.y > -250.0) {
      float t = -uCamPos.y / up;
      vec3 sp = uCamPos + rd * t;
      vec3 T = exp(-uSigma * t);
      // wavy surface normal
      vec2 q = sp.xz * 0.08;
      float w1 = sin(q.x * 3.1 + uTime * 0.9) + sin(q.y * 2.3 - uTime * 0.7) + n2(q * 4.0 + uTime * 0.2) * 1.5;
      float sinI = sqrt(1.0 - up * up);
      float window = smoothstep(0.78, 0.72, sinI + w1 * 0.015); // critical angle ~48.6deg => sin=0.75
      vec3 sky = vec3(0.55, 0.8, 1.0) * 3.0 + vec3(1.0, 0.95, 0.8) * 40.0 * pow(max(dot(rd, uSunDir), 0.0), 800.0);
      vec3 tir = uScatTint * waterAmbient(-30.0) * 0.25; // total internal reflection of the deep
      vec3 surf = mix(tir, sky * (0.8 + 0.2 * w1), window);
      surf += vec3(1.0) * smoothstep(0.95, 1.0, n2(q * 12.0 + uTime * 0.5)) * 0.8 * window;
      col = surf * T + col * (1.0 - T);
    }
  }

  // --- sun shafts: modulated in-scatter by moving pattern, strong in first ~120 m
  float jitter = hash12(gl_FragCoord.xy + fract(uFrame * 0.618) * 100.0);
  if (uCamPos.y > -220.0) {
    const int SS = 16;
    float maxD = min(dist, 90.0);
    float stepL = maxD / float(SS);
    vec3 acc = vec3(0.0);
    for (int i = 0; i < SS; i++) {
      float t = (float(i) + jitter) * stepL;
      vec3 p = uCamPos + rd * t;
      if (p.y > 0.0) break;
      // project onto surface along sun dir
      vec2 sp = p.xz - uSunDir.xz * (p.y / uSunDir.y);
      float sh = n2(sp * 0.09 + uTime * 0.05) * n2(sp * 0.23 - uTime * 0.08);
      sh = smoothstep(0.18, 0.7, sh);
      acc += waterAmbient(p.y) * sh * exp(-sigma * t) * stepL;
    }
    float mu = dot(rd, uSunDir);
    col += acc * uScatTint * (0.02 + 0.5 * hgPhase(mu, 0.7)) * 0.35 * smoothstep(-220.0, -60.0, uCamPos.y);
  }

  // --- headlight volumetrics (single scattering, physically based)
  // L_in = ∫ b · p(θ) · I/l² · e^{-c(l + t)} dt, θ = angle between light propagation (lamp → sample)
  // and the direction to the eye (-rd). Two-term HG phase fitted to Petzold's ocean data (strong
  // forward peak, ~2.5 % backscatter): looking down the beam gives weak haze, looking across it or
  // towards a lamp gives the bright forward-scatter cone. The ray starts at the viewport glass.
  if (uSpotCount > 0) {
    const int STEPS = 48;
    float t0 = uRayStart;
    float maxD = max(min(dist, 80.0) - t0, 0.0);
    float stepL = maxD / float(STEPS);
    vec3 acc = vec3(0.0);
    for (int i = 0; i < STEPS; i++) {
      float t = t0 + (float(i) + jitter) * stepL;
      vec3 p = uCamPos + rd * t;
      vec3 Tc = exp(-sigma * t);
      for (int s = 0; s < ${MAX_SPOTS}; s++) {
        if (s >= uSpotCount) break;
        vec3 L = p - uSpotPos[s];
        float l2 = dot(L, L);
        float l = sqrt(l2);
        vec3 Ld = L / max(l, 1e-4);
        float c = dot(Ld, uSpotDir[s]);
        float cone = smoothstep(uSpotCos[s], uSpotCos[s] + uSpotPen[s], c);
        if (cone <= 0.0) continue;
        float mu = dot(Ld, -rd);
        float ph = 0.975 * hgPhase(mu, 0.9) + 0.025 * hgPhase(mu, -0.35);
        acc += uSpotColor[s] * cone * ph * Tc * exp(-sigma * l) / (l2 + 0.04) * stepL;
      }
    }
    // b = scattering coefficient (1/m): clear ocean ~0.03, rises with silt / turbidity
    col += acc * uScatB * (1.0 + uSilt * 12.0) * uScatterBoost * vec3(0.92, 0.97, 1.0);
  }
  gl_FragColor = vec4(col, 1.0);
}`;

// ---------------------------------------------------------------- bloom
const DOWN_FRAG = /* glsl */ `
varying vec2 vUv; uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uThreshold; uniform float uFirst;
vec3 s(vec2 o){ return texture2D(tSrc, vUv + o * uTexel).rgb; }
void main(){
  vec3 a = s(vec2(-2,-2)), b = s(vec2(0,-2)), c = s(vec2(2,-2));
  vec3 d = s(vec2(-1,-1)), e = s(vec2(1,-1));
  vec3 f = s(vec2(-2,0)), g = s(vec2(0,0)), h = s(vec2(2,0));
  vec3 i = s(vec2(-1,1)), j = s(vec2(1,1));
  vec3 k = s(vec2(-2,2)), l = s(vec2(0,2)), m = s(vec2(2,2));
  vec3 o = (d+e+i+j)*0.125 + (a+b+g+f)*0.03125 + (b+c+h+g)*0.03125 + (f+g+l+k)*0.03125 + (g+h+m+l)*0.03125;
  if (uFirst > 0.5) {
    float br = max(o.r, max(o.g, o.b));
    float soft = clamp(br - uThreshold + 0.5, 0.0, 1.0); soft = soft*soft*0.5;
    float w = max(soft, br - uThreshold) / max(br, 1e-4);
    o *= w;
    o = min(o, vec3(60.0));
  }
  gl_FragColor = vec4(o, 1.0);
}`;
const UP_FRAG = /* glsl */ `
varying vec2 vUv; uniform sampler2D tSrc; uniform sampler2D tPrev; uniform vec2 uTexel; uniform float uRadius;
vec3 s(vec2 o){ return texture2D(tSrc, vUv + o * uTexel * uRadius).rgb; }
void main(){
  vec3 o = s(vec2(-1,-1)) + s(vec2(0,-1))*2.0 + s(vec2(1,-1)) + s(vec2(-1,0))*2.0 + s(vec2(0,0))*4.0 + s(vec2(1,0))*2.0 + s(vec2(-1,1)) + s(vec2(0,1))*2.0 + s(vec2(1,1));
  gl_FragColor = vec4(o / 16.0 + texture2D(tPrev, vUv).rgb, 1.0);
}`;

// Scene metering for auto exposure: 64x32 log-luminance with centre-weighting (the pilot looks
// out through the main viewport; bright cabin walls at the edge must not dominate).
const LUM_FRAG = /* glsl */ `
varying vec2 vUv; uniform sampler2D tSrc;
void main(){
  vec3 c = texture2D(tSrc, vUv).rgb;
  float L = dot(c, vec3(0.2126, 0.7152, 0.0722));
  vec2 d = (vUv - vec2(0.5, 0.56)) * vec2(1.6, 1.0);
  float w = exp(-dot(d, d) * 6.0);
  gl_FragColor = vec4(log(max(L, 1e-4)) * w, w, 0.0, 1.0);
}`;

const FINAL_FRAG = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tColor; uniform sampler2D tBloom;
uniform float uExposure; uniform float uBloom; uniform float uTime; uniform vec2 uRes;
uniform float uVignette; uniform float uCA; uniform float uGrain; uniform float uFlash; uniform vec3 uFlashColor;
uniform float uBlackout; uniform float uShake; uniform float uRedAlert; uniform float uFog; uniform float uSmoke;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 RRTAndODTFit(vec3 v){ vec3 a = v*(v+0.0245786)-0.000090537; vec3 b = v*(0.983729*v+0.4329510)+0.238081; return a/b; }
vec3 aces(vec3 c){
  const mat3 i = mat3(0.59719,0.07600,0.02840, 0.35458,0.90834,0.13383, 0.04823,0.01566,0.83777);
  const mat3 o = mat3(1.60475,-0.10208,-0.00327, -0.53108,1.10813,-0.07276, -0.07367,-0.00605,1.07602);
  c = i * c; c = RRTAndODTFit(c); c = o * c; return clamp(c, 0.0, 1.0);
}
void main(){
  vec2 uv = vUv;
  vec2 cc = uv - 0.5;
  float r2 = dot(cc, cc);
  // chromatic aberration grows toward edges
  vec2 off = cc * r2 * uCA;
  vec3 col;
  col.r = texture2D(tColor, uv - off).r;
  col.g = texture2D(tColor, uv).g;
  col.b = texture2D(tColor, uv + off).b;
  col += texture2D(tBloom, uv).rgb * uBloom;
  // smoke in cabin
  col = mix(col, vec3(0.08,0.075,0.07) * (0.6 + 0.4*sin(uv.y*3.0 + uTime*0.3)), uSmoke * 0.85);
  col *= uExposure;
  col = aces(col);
  // grade: cool shadows, slightly lifted blacks
  col = pow(col, vec3(1.0/2.2));
  col = mix(col, col * vec3(0.94, 1.0, 1.05) + vec3(0.0, 0.004, 0.01), 0.6);
  col = (col - 0.5) * 1.06 + 0.5;
  // red emergency lighting
  col = mix(col, col * vec3(1.35, 0.55, 0.5), uRedAlert * 0.45);
  // condensation fog on lens
  col = mix(col, vec3(dot(col, vec3(0.33))) + 0.03, uFog * smoothstep(0.05, 0.35, r2));
  // vignette
  col *= mix(1.0, smoothstep(0.85, 0.2, r2 * 2.0), uVignette);
  // grain (luminance-dependent)
  float g = hash12(gl_FragCoord.xy + fract(uTime * 13.7) * 1000.0) - 0.5;
  col += g * uGrain * (0.35 + 0.65 * (1.0 - dot(col, vec3(0.33))));
  col = mix(col, uFlashColor, uFlash);
  col *= 1.0 - uBlackout;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

export class Pipeline {
  constructor(renderer) {
    this.renderer = renderer;
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.quad.frustumCulled = false;
    this.fsScene = new THREE.Scene();
    this.fsScene.add(this.quad);
    this.fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.frame = 0;
    this.params = { autoExposure: true, exposure: 1.0, bloom: 0.9, vignette: 0.55, ca: 0.012, grain: 0.035, flash: 0, flashColor: new THREE.Color(1, 1, 1), blackout: 0, redAlert: 0, fog: 0, smoke: 0, scatterBoost: 1, silt: 0 };

    const rtOpts = { type: THREE.HalfFloatType, format: THREE.RGBAFormat, colorSpace: THREE.LinearSRGBColorSpace, depthBuffer: true };
    this.rtScene = new THREE.WebGLRenderTarget(4, 4, { ...rtOpts, samples: 4 });
    this.rtScene.depthTexture = new THREE.DepthTexture(4, 4);
    this.rtScene.depthTexture.type = THREE.FloatType;
    this.rtVol = new THREE.WebGLRenderTarget(4, 4, { ...rtOpts, samples: 4 });
    this.bloomDown = []; this.bloomUp = [];
    for (let i = 0; i < 6; i++) {
      this.bloomDown.push(new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, depthBuffer: false }));
      this.bloomUp.push(new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, depthBuffer: false }));
    }
    this.rtLum = new THREE.WebGLRenderTarget(64, 32, { type: THREE.FloatType, depthBuffer: false, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    this.lumBuf = new Float32Array(64 * 32 * 4);
    this.avgLum = 0.18; this._lumFrame = 0;
    this.black = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1); this.black.needsUpdate = true;

    this.volMat = fsMat(VOL_FRAG, {
      ...waterUniforms,
      tColor: { value: null }, tDepth: { value: null },
      uInvProj: { value: new THREE.Matrix4() }, uInvView: { value: new THREE.Matrix4() },
      uCamPos: { value: new THREE.Vector3() }, uNear: { value: 0.1 }, uFar: { value: 1000 },
      uRes: { value: new THREE.Vector2() }, uFrame: { value: 0 },
      uSpotCount: { value: 0 },
      uSpotPos: { value: Array.from({ length: MAX_SPOTS }, () => new THREE.Vector3()) },
      uSpotDir: { value: Array.from({ length: MAX_SPOTS }, () => new THREE.Vector3(0, 0, -1)) },
      uSpotColor: { value: Array.from({ length: MAX_SPOTS }, () => new THREE.Vector3()) },
      uSpotCos: { value: new Array(MAX_SPOTS).fill(0.9) },
      uSpotPen: { value: new Array(MAX_SPOTS).fill(0.05) },
      uScatterBoost: { value: 1 }, uSilt: { value: 0 }, uRayStart: { value: 1.0 }, uScatB: { value: 0.035 },
    });
    this.downMat = fsMat(DOWN_FRAG, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uThreshold: { value: 1.2 }, uFirst: { value: 0 } });
    this.upMat = fsMat(UP_FRAG, { tSrc: { value: null }, tPrev: { value: null }, uTexel: { value: new THREE.Vector2() }, uRadius: { value: 1.0 } });
    this.lumMat = fsMat(LUM_FRAG, { tSrc: { value: null } });
    this.finalMat = fsMat(FINAL_FRAG, {
      tColor: { value: null }, tBloom: { value: null }, uExposure: { value: 1 }, uBloom: { value: 0.8 }, uTime: { value: 0 },
      uRes: { value: new THREE.Vector2() }, uVignette: { value: 0.5 }, uCA: { value: 0.01 }, uGrain: { value: 0.03 },
      uFlash: { value: 0 }, uFlashColor: { value: new THREE.Color() }, uBlackout: { value: 0 }, uShake: { value: 0 },
      uRedAlert: { value: 0 }, uFog: { value: 0 }, uSmoke: { value: 0 },
    });
    this.spots = [];
  }

  setSize(w, h, pr) {
    const W = Math.floor(w * pr), H = Math.floor(h * pr);
    this.W = W; this.H = H;
    this.rtScene.setSize(W, H);
    this.rtScene.depthTexture.image.width = W; this.rtScene.depthTexture.image.height = H;
    this.rtVol.setSize(W, H);
    let bw = W >> 1, bh = H >> 1;
    for (let i = 0; i < this.bloomDown.length; i++) {
      this.bloomDown[i].setSize(Math.max(1, bw), Math.max(1, bh));
      this.bloomUp[i].setSize(Math.max(1, bw), Math.max(1, bh));
      bw >>= 1; bh >>= 1;
    }
    this.volMat.uniforms.uRes.value.set(W, H);
    this.finalMat.uniforms.uRes.value.set(W, H);
  }

  // dev: average linear RGB of a render target region (tiny half-float readback)
  probe(which = 'vol', x = 0.5, y = 0.5, size = 8) {
    const rt = which === 'scene' ? this.rtScene : this.rtVol;
    const w = size, h = size, buf = new Uint16Array(w * h * 4);
    const px = Math.floor(rt.width * x - w / 2), py = Math.floor(rt.height * y - h / 2);
    try { this.renderer.readRenderTargetPixels(rt, px, py, w, h, buf); } catch (e) { return 'err ' + e.message; }
    const f = (u) => THREE.DataUtils.fromHalfFloat(u);
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < w * h; i++) { r += f(buf[i * 4]); g += f(buf[i * 4 + 1]); b += f(buf[i * 4 + 2]); }
    const n = w * h; return [r / n, g / n, b / n].map((v) => +v.toFixed(3));
  }

  _fs(mat, target) {
    this.quad.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.fsScene, this.fsCam);
  }

  render(extScene, intScene, camera, time) {
    const r = this.renderer;
    this.frame++;
    const P = this.params;
    // 1. exterior
    r.setRenderTarget(this.rtScene);
    r.setClearColor(0x000000, 1);
    r.clear(true, true, true);
    r.render(extScene, camera);

    // 2. volumetric
    const u = this.volMat.uniforms;
    u.tColor.value = this.rtScene.texture;
    u.tDepth.value = this.rtScene.depthTexture;
    u.uInvProj.value.copy(camera.projectionMatrixInverse);
    u.uInvView.value.copy(camera.matrixWorld);
    camera.getWorldPosition(u.uCamPos.value);
    u.uNear.value = camera.near; u.uFar.value = camera.far;
    u.uFrame.value = this.frame;
    u.uScatterBoost.value = P.scatterBoost;
    u.uSilt.value = P.silt;
    u.uRayStart.value = P.rayStart ?? 1.0;
    u.uScatB.value = P.scatB ?? 0.035;
    let n = 0;
    for (const s of this.spots) {
      if (n >= MAX_SPOTS) break;
      if (!s.visible || s.intensity <= 0) continue;
      s.getWorldPosition(u.uSpotPos.value[n]);
      const tp = new THREE.Vector3(); s.target.getWorldPosition(tp);
      u.uSpotDir.value[n].copy(tp).sub(u.uSpotPos.value[n]).normalize();
      u.uSpotColor.value[n].set(s.color.r, s.color.g, s.color.b).multiplyScalar(s.intensity); // candela
      u.uSpotCos.value[n] = Math.cos(s.angle);
      u.uSpotPen.value[n] = (1 - Math.cos(s.angle)) * s.penumbra + 0.001;
      n++;
    }
    u.uSpotCount.value = n;
    this._fs(this.volMat, this.rtVol);

    // 3. interior on top
    if (intScene) {
      r.setRenderTarget(this.rtVol);
      r.autoClear = false;
      r.clearDepth();
      r.render(intScene, camera);
      r.autoClear = true;
    }

    // 4. bloom
    let src = this.rtVol.texture;
    let sw = this.W, sh = this.H;
    for (let i = 0; i < this.bloomDown.length; i++) {
      this.downMat.uniforms.tSrc.value = src;
      this.downMat.uniforms.uTexel.value.set(1 / sw, 1 / sh);
      this.downMat.uniforms.uFirst.value = i === 0 ? 1 : 0;
      this._fs(this.downMat, this.bloomDown[i]);
      src = this.bloomDown[i].texture;
      sw = this.bloomDown[i].width; sh = this.bloomDown[i].height;
    }
    let prev = this.black;
    for (let i = this.bloomDown.length - 1; i >= 0; i--) {
      const s = i === this.bloomDown.length - 1 ? this.bloomDown[i] : this.bloomUp[i + 1];
      this.upMat.uniforms.tSrc.value = s.texture;
      this.upMat.uniforms.tPrev.value = i === this.bloomDown.length - 1 ? this.black : this.bloomDown[i].texture;
      this.upMat.uniforms.uTexel.value.set(1 / s.width, 1 / s.height);
      this._fs(this.upMat, this.bloomUp[i]);
      prev = this.bloomUp[i].texture;
    }

    // 4b. metering (every 4th frame; readback of 64x32 floats is cheap)
    if (P.autoExposure && (this._lumFrame++ & 3) === 0) {
      this.lumMat.uniforms.tSrc.value = this.rtVol.texture;
      this._fs(this.lumMat, this.rtLum);
      try {
        this.renderer.readRenderTargetPixels(this.rtLum, 0, 0, 64, 32, this.lumBuf);
        let sl = 0, sw = 0;
        for (let i = 0; i < 64 * 32; i++) { sl += this.lumBuf[i * 4]; sw += this.lumBuf[i * 4 + 1]; }
        if (sw > 0 && Number.isFinite(sl)) this.avgLum = Math.exp(sl / sw);
      } catch (e) { /* readback unsupported: keep last value */ }
    }

    // 5. final
    const f = this.finalMat.uniforms;
    f.tColor.value = this.rtVol.texture;
    f.tBloom.value = prev;
    f.uExposure.value = P.exposure; f.uBloom.value = P.bloom * 0.12; f.uTime.value = time;
    f.uVignette.value = P.vignette; f.uCA.value = P.ca; f.uGrain.value = P.grain;
    f.uFlash.value = P.flash; f.uFlashColor.value.copy(P.flashColor); f.uBlackout.value = P.blackout;
    f.uRedAlert.value = P.redAlert; f.uFog.value = P.fog; f.uSmoke.value = P.smoke;
    this._fs(this.finalMat, null);
  }
}
