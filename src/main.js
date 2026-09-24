import * as THREE from 'three';
import { Pipeline } from './render/pipeline.js';
import { Terrain } from './world/terrain.js';
import { createTerrainMaterial } from './render/terrainMaterial.js';
import { updateWater, ambientAtDepth, waterUniforms } from './render/water.js';
import { setMaxAnisotropy } from './render/textures.js';

const canvas = document.getElementById('gl');
const params0 = new URLSearchParams(location.search);
const MANUAL = params0.has('manual');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: MANUAL });
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
setMaxAnisotropy(renderer.capabilities.getMaxAnisotropy());
const pipe = new Pipeline(renderer);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 900);
const params = new URLSearchParams(location.search);
camera.position.set(+(params.get('x') ?? 40), +(params.get('y') ?? -55), +(params.get('z') ?? 120));
camera.lookAt(camera.position.x + 20, camera.position.y + +(params.get('ly') ?? -6), camera.position.z - 30);
const hemi = new THREE.HemisphereLight(0xffffff, 0x223344, 1);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(30, 100, 20);
scene.add(sun);
const spot = new THREE.SpotLight(0xfff4e0, 3000, 120, 0.45, 0.5, 2);
camera.add(spot); spot.position.set(0.8, -0.5, 0); spot.target.position.set(0, -2, -10); camera.add(spot.target);
scene.add(camera);
if (!params0.has('nospot')) pipe.spots.push(spot); else spot.intensity = 0;
window.__pipe = pipe;
function resize() { const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); pipe.setSize(w, h, +(params0.get('pr') ?? Math.min(devicePixelRatio, 2))); }
addEventListener('resize', resize); resize();
let mat = await createTerrainMaterial();
if (params0.get('dbg') === 'std') { const { applyWater } = await import('./render/water.js'); mat = applyWater(new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 1 }), { caustics: params0.has('c') }); }
if (params0.get('dbg') === 'raw') mat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 1 });
const terrain = new Terrain(scene, mat);
window.__terrain = terrain;
const clock = new THREE.Clock();
function loop() {
  const t = clock.getElapsedTime();
  updateWater(t);
  const a = ambientAtDepth(camera.position.y);
  hemi.color.setRGB(a.r, a.g, a.b); hemi.groundColor.setRGB(a.r * 0.1, a.g * 0.15, a.b * 0.2); hemi.intensity = +(params0.get('hi') ?? 0.8);
  sun.color.setRGB(a.r, a.g, a.b); sun.intensity = +(params0.get('si') ?? 2.5);
  terrain.update(camera.position);
  if (!MANUAL) pipe.render(scene, null, camera, t);
  if (MANUAL) setTimeout(loop, 50); else requestAnimationFrame(loop);
}
loop();
window.__shot = () => { pipe.render(scene, null, camera, clock.getElapsedTime()); return canvas.toDataURL('image/jpeg', 0.9); };
