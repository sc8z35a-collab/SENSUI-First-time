// Physically-inspired underwater optics shared by every "outdoor" material.
//
// Beer-Lambert extinction per RGB channel along the view ray, plus single-scatter
// in-scattering of the ambient down-welling light, whose own spectrum is attenuated
// with depth (Kd).  Red dies within ~15 m, green by ~150 m, blue survives to ~250 m,
// below ~400 m the only light is what the submarine brings (or bioluminescence).
import * as THREE from 'three';

export const water = {
  // extinction (absorption + scattering) per metre for the *view* path
  sigma: new THREE.Vector3(0.30, 0.070, 0.050),
  // diffuse attenuation of the down-welling sunlight per metre of depth
  kd: new THREE.Vector3(0.36, 0.055, 0.030),
  // colour of sun+sky light entering at the surface (linear HDR)
  surfaceLight: new THREE.Color(1.0, 0.97, 0.9).multiplyScalar(3.2),
  // single-scattering albedo tint
  scatterTint: new THREE.Color(0.12, 0.62, 0.95),
  turbidity: 1.0,
};

export const waterUniforms = {
  uSigma: { value: water.sigma.clone() },
  uKd: { value: water.kd },
  uSurfLight: { value: water.surfaceLight },
  uScatTint: { value: water.scatterTint },
  uTime: { value: 0 },
  uCausticStrength: { value: 1 },
  uSunDir: { value: new THREE.Vector3(0.3, 1, 0.2).normalize() },
  uUnderwater: { value: 1 },
};

// Radiance of down-welling light at depth y (y<0) – used on CPU for light intensities
const _c = new THREE.Color();
export function ambientAtDepth(y, out = _c) {
  const d = Math.max(0, -y);
  out.setRGB(
    water.surfaceLight.r * Math.exp(-water.kd.x * d),
    water.surfaceLight.g * Math.exp(-water.kd.y * d),
    water.surfaceLight.b * Math.exp(-water.kd.z * d),
  );
  return out;
}

export function updateWater(time, turbidity = 1) {
  waterUniforms.uTime.value = time;
  water.turbidity = turbidity;
  waterUniforms.uSigma.value.copy(water.sigma).multiplyScalar(turbidity);
}

const GLSL_COMMON = /* glsl */ `
uniform vec3 uSigma;
uniform vec3 uKd;
uniform vec3 uSurfLight;
uniform vec3 uScatTint;
uniform float uTime;
uniform float uCausticStrength;
uniform vec3 uSunDir;
uniform float uUnderwater;
varying vec3 vWaterWorld;

vec3 waterAmbient(float y){
  float d = max(0.0, -y);
  return uSurfLight * exp(-uKd * d);
}
// cheap animated caustics (two layers of warped voronoi-ish sin patterns)
float causticLayer(vec2 p, float t){
  vec2 i = p;
  float c = 1.0, inten = 0.005;
  for (int n = 0; n < 4; n++) {
    float tt = t * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
  }
  c /= 4.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}
float caustics(vec3 wp){
  vec2 p = wp.xz * 0.16 + wp.y * uSunDir.xz * 0.16;
  float a = causticLayer(mod(p, 6.2831853) , uTime * 0.55);
  float b = causticLayer(mod(p * 1.37 + 2.1, 6.2831853), uTime * 0.43 + 1.7);
  return (a + b) * 0.5;
}
`;

function injectVertex(src) {
  src = src.replace('#include <common>', '#include <common>\nvarying vec3 vWaterWorld;');
  // compute world position regardless of other defines (handles instancing / skinning via mvPosition)
  src = src.replace(
    '#include <fog_vertex>',
    `#include <fog_vertex>
    vWaterWorld = (inverse(viewMatrix) * mvPosition).xyz;`,
  );
  return src;
}

function injectFragment(src, opts) {
  src = src.replace('#include <common>', '#include <common>\n' + GLSL_COMMON);
  let causticCode = '';
  if (opts.caustics) {
    causticCode = /* glsl */ `
    {
      float cy = -vWaterWorld.y;
      float cAmt = uCausticStrength * exp(-cy * 0.045) * smoothstep(-0.2, 0.6, normalize(vNormalW_).y);
      vec3 cc = waterAmbient(vWaterWorld.y) * caustics(vWaterWorld) * cAmt * 0.9;
      outgoingLight += diffuseColor.rgb * cc;
    }`;
  }
  src = src.replace(
    '#include <opaque_fragment>',
    `${causticCode}
    #include <opaque_fragment>
    if (uUnderwater > 0.5) {
      vec3 toFrag = vWaterWorld - cameraPosition;
      float dist = length(toFrag);
      vec3 T = exp(-uSigma * dist);
      // in-scatter: ambient at the average depth along the ray
      float ym = 0.5 * (vWaterWorld.y + cameraPosition.y);
      vec3 amb = waterAmbient(ym);
      vec3 vdir = toFrag / max(dist, 1e-4);
      float mu = dot(vdir, uSunDir);
      float phase = 0.55 + 0.9 * pow(max(mu, 0.0), 6.0) + 0.25 * max(-vdir.y, 0.0) * 0.0 + 0.35 * max(vdir.y, 0.0);
      vec3 inscatter = amb * uScatTint * phase * 0.32;
      gl_FragColor.rgb = gl_FragColor.rgb * T + inscatter * (1.0 - T);
    }`,
  );
  if (opts.caustics) {
    src = src.replace('#include <common>', '#include <common>\nvarying vec3 vNormalW_;');
  }
  return src;
}

// Adds underwater optics to a built-in material. opts.caustics=true adds sunlight caustics.
export function applyWater(material, opts = {}) {
  const prev = material.onBeforeCompile;
  material.onBeforeCompile = (shader, renderer) => {
    if (prev) prev(shader, renderer);
    Object.assign(shader.uniforms, waterUniforms);
    shader.vertexShader = injectVertex(shader.vertexShader);
    if (opts.caustics) {
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vNormalW_;')
        .replace('#include <fog_vertex>', '#include <fog_vertex>\n vNormalW_ = normalize(mat3(inverse(viewMatrix)) * transformedNormal);');
    }
    shader.fragmentShader = injectFragment(shader.fragmentShader, opts);
  };
  const key = material.customProgramCacheKey ? material.customProgramCacheKey.bind(material) : () => '';
  material.customProgramCacheKey = () => key() + '|water' + (opts.caustics ? 'C' : '');
  return material;
}

export { GLSL_COMMON as WATER_GLSL };
