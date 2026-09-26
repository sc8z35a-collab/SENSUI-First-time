// Texture loading helpers. Packs AO + roughness (+ metalness) into one texture
// to save sampler slots in heavy triplanar shaders.
import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const cache = new Map();
let maxAniso = 8;
export function setMaxAnisotropy(a) { maxAniso = a; }

function loadImage(url) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => rej(new Error('failed ' + url));
    img.src = url;
  });
}

export function tex(name, { srgb = false, repeat = 1 } = {}) {
  const key = name + srgb;
  if (cache.has(key)) return cache.get(key);
  const t = loader.load(`./tex/${name}.jpg`);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = maxAniso;
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  if (repeat !== 1) t.repeat.set(repeat, repeat);
  cache.set(key, t);
  return t;
}

// Pack [ao, roughness, metalness] into RGB. Missing channels are filled with defaults.
export async function packORM(prefix, { ao = true, metal = false, defaultAO = 255, defaultMetal = 0 } = {}) {
  const key = 'orm:' + prefix;
  if (cache.has(key)) return cache.get(key);
  const [r, a, m] = await Promise.all([
    loadImage(`./tex/${prefix}_roughness.jpg`),
    ao ? loadImage(`./tex/${prefix}_ao.jpg`).catch(() => null) : Promise.resolve(null),
    metal ? loadImage(`./tex/${prefix}_metalness.jpg`).catch(() => null) : Promise.resolve(null),
  ]);
  const w = r.width, h = r.height;
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const read = (img) => { ctx.clearRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h); return ctx.getImageData(0, 0, w, h).data; };
  const R = read(r);
  const A = a ? read(a) : null;
  const M = m ? read(m) : null;
  const out = ctx.createImageData(w, h);
  const o = out.data;
  for (let i = 0; i < o.length; i += 4) {
    o[i] = A ? A[i] : defaultAO;
    o[i + 1] = R[i];
    o[i + 2] = M ? M[i] : defaultMetal;
    o[i + 3] = 255;
  }
  ctx.putImageData(out, 0, 0);
  const t = new THREE.CanvasTexture(cv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = maxAniso;
  t.colorSpace = THREE.NoColorSpace;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.needsUpdate = true;
  cache.set(key, t);
  return t;
}

// Standard PBR material from an ambientCG-style set
export async function pbrMaterial(prefix, opts = {}) {
  const { repeat = 1, metal = false, ao = false, color = 0xffffff, roughness = 1, metalness = metal ? 1 : 0, normalScale = 1, envMapIntensity = 1 } = opts;
  const orm = await packORM(prefix, { ao, metal });
  const map = tex(prefix + '_color', { srgb: true });
  const nrm = tex(prefix + '_normal');
  const mat = new THREE.MeshStandardMaterial({
    map, normalMap: nrm, roughnessMap: orm, metalnessMap: metal ? orm : null, aoMap: ao ? orm : null,
    color, roughness, metalness, envMapIntensity,
  });
  mat.normalScale.set(normalScale, normalScale);
  const rep = (t) => { if (t) { t.repeat.set(repeat, repeat); } };
  // clone textures if repeat differs so shared textures don't fight
  if (repeat !== 1) {
    mat.map = map.clone(); mat.normalMap = nrm.clone(); mat.roughnessMap = orm.clone();
    if (metal) mat.metalnessMap = mat.roughnessMap;
    if (ao) mat.aoMap = mat.roughnessMap;
    [mat.map, mat.normalMap, mat.roughnessMap].forEach((t) => { rep(t); t.needsUpdate = true; });
  }
  return mat;
}

// Clean factory-painted surface (enamel / powder coat): solid base colour, fine orange-peel
// normal detail and a roughness map remapped into a physically sensible range. The remap is
// baked into the texture (not done in the shader) so the material survives clone() and other
// onBeforeCompile patches (viewport cut-outs, underwater optics).
export async function paintedMaterial({ color = 0xe9e7e1, repeat = 4, rough = [0.32, 0.5], normalScale = 0.35, metalness = 0 } = {}) {
  const key = `painted-rough:${rough[0]}:${rough[1]}`;
  let rgh = cache.get(key);
  if (!rgh) {
    const img = await loadImage('./tex/whitepaint_roughness.jpg');
    const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height;
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, cv.width, cv.height), a = d.data;
    // source spans a narrow band; normalise it first, then map into [r0, r1]
    let lo = 255, hi = 0;
    for (let i = 0; i < a.length; i += 4) { if (a[i] < lo) lo = a[i]; if (a[i] > hi) hi = a[i]; }
    const span = Math.max(1, hi - lo);
    for (let i = 0; i < a.length; i += 4) {
      const v = (rough[0] + (rough[1] - rough[0]) * ((a[i] - lo) / span)) * 255;
      a[i] = a[i + 1] = a[i + 2] = v; a[i + 3] = 255;
    }
    ctx.putImageData(d, 0, 0);
    rgh = new THREE.CanvasTexture(cv);
    rgh.wrapS = rgh.wrapT = THREE.RepeatWrapping; rgh.colorSpace = THREE.NoColorSpace; rgh.anisotropy = maxAniso;
    cache.set(key, rgh);
  }
  const r = rgh.clone(); r.repeat.set(repeat, repeat); r.needsUpdate = true;
  const nrm = tex('whitepaint_normal').clone(); nrm.repeat.set(repeat, repeat); nrm.needsUpdate = true;
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 1, metalness, normalMap: nrm, roughnessMap: r });
  mat.normalScale.set(normalScale, normalScale);
  return mat;
}

// "Used object" surface: applies the baked photographic wear set (stipple normal, grime/stain albedo,
// fingerprint/smear roughness breakup) to any MeshStandardMaterial via world-space triplanar
// projection — so procedurally built props without UVs (bottles, frames, handles, cables) get
// real-looking micro-surface instead of flat CG colour.
//   scale: texture repeats per metre; wear: 0..1 amount of grime; gloss: base roughness offset
export function weathered(mat, { scale = 3.5, wear = 0.6, normal = 0.8, key = 'w' } = {}) {
  const T = { c: tex('wallpanel_color', { srgb: false }), o: tex('wallpanel_orm'), n: tex('wallpanel_normal') };
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (sh, r) => {
    prev?.(sh, r);
    sh.uniforms.tWC = { value: T.c }; sh.uniforms.tWO = { value: T.o }; sh.uniforms.tWN = { value: T.n };
    sh.uniforms.uWS = { value: scale }; sh.uniforms.uWW = { value: wear }; sh.uniforms.uWN = { value: normal };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWP; varying vec3 vWN;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz; vWN = normalize(mat3(modelMatrix) * objectNormal);');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform sampler2D tWC, tWO, tWN; uniform float uWS, uWW, uWN; varying vec3 vWP; varying vec3 vWN;
        vec3 triW(){ vec3 w = pow(abs(normalize(vWN)), vec3(4.0)); return w / (w.x + w.y + w.z); }
        vec4 tri(sampler2D t){ vec3 w = triW(); vec3 p = vWP * uWS; return texture2D(t, p.zy) * w.x + texture2D(t, p.xz) * w.y + texture2D(t, p.xy) * w.z; }`)
      .replace('#include <map_fragment>', `#include <map_fragment>
        vec3 wc = tri(tWC).rgb; // linear-ish grime/stain luminance around ~0.85
        diffuseColor.rgb *= mix(vec3(1.0), wc / 0.85, uWW);`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        vec4 wo = tri(tWO);
        roughnessFactor = clamp(mix(roughnessFactor, roughnessFactor * (0.6 + wo.g * 1.1), uWW), 0.05, 1.0);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        {
          vec3 tn = tri(tWN).xyz * 2.0 - 1.0;
          // perturb the view-space normal with the tangent-less triplanar detail (small-angle approx)
          vec3 dn = (viewMatrix * vec4(tn.x, tn.y, 0.0, 0.0)).xyz;
          normal = normalize(normal + dn * uWN * 0.6);
        }`);
  };
  const k = mat.customProgramCacheKey?.bind(mat);
  mat.customProgramCacheKey = () => (k ? k() : '') + '|weathered-' + key;
  return mat;
}
