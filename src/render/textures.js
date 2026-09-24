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
