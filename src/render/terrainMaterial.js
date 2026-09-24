// Triplanar PBR terrain material built on MeshStandardMaterial.
// 3 layers: rock (steep), sand (shallow flats), sediment/ooze (deep flats).
import * as THREE from 'three';
import { tex, packORM } from './textures.js';
import { applyWater } from './water.js';

export async function createTerrainMaterial() {
  const [rockORM, sandORM, sedORM, rock2ORM] = await Promise.all([
    packORM('rock1', { ao: true }), packORM('sand', { ao: true }), packORM('sediment', { ao: true }), packORM('rock2', { ao: true }),
  ]);
  const u = {
    tRockC: { value: tex('rock1_color', { srgb: true }) },
    tRockN: { value: tex('rock1_normal') },
    tRockO: { value: rockORM },
    tRock2C: { value: tex('rock2_color', { srgb: true }) },
    tRock2N: { value: tex('rock2_normal') },
    tRock2O: { value: rock2ORM },
    tSandC: { value: tex('sand_color', { srgb: true }) },
    tSandN: { value: tex('sand_normal') },
    tSandO: { value: sandORM },
    tSedC: { value: tex('sediment_color', { srgb: true }) },
    tSedN: { value: tex('sediment_normal') },
    tSedO: { value: sedORM },
  };
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0, envMapIntensity: 0.0 });
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
        attribute float ao;
        varying float vAO;
        varying vec3 vTpPos;
        varying vec3 vTpNrm;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vAO = ao;
        vTpPos = (modelMatrix * vec4(position, 1.0)).xyz;
        vTpNrm = normalize(mat3(modelMatrix) * normal);`);

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform sampler2D tRockC, tRockN, tRockO, tRock2C, tRock2N, tRock2O, tSandC, tSandN, tSandO, tSedC, tSedN, tSedO;
        varying float vAO;
        varying vec3 vTpPos;
        varying vec3 vTpNrm;
        vec3 gTpW; vec3 gTpNrm; float gTpAO; float gTpRough;

        float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
        float vnoise3(vec3 p){ return (vnoise(p.xz) + vnoise(p.xy + 17.0) + vnoise(p.zy + 31.0)) / 3.0; }

        // triplanar sampling
        vec4 tpC(sampler2D t, vec3 p, vec3 w, float s){
          return texture2D(t, p.zy * s) * w.x + texture2D(t, p.xz * s) * w.y + texture2D(t, p.xy * s) * w.z;
        }
        // whiteout blended triplanar normal (world space)
        vec3 tpN(sampler2D t, vec3 p, vec3 n, vec3 w, float s, float strength){
          vec3 tx = texture2D(t, p.zy * s).xyz * 2.0 - 1.0;
          vec3 ty = texture2D(t, p.xz * s).xyz * 2.0 - 1.0;
          vec3 tz = texture2D(t, p.xy * s).xyz * 2.0 - 1.0;
          tx.xy *= strength; ty.xy *= strength; tz.xy *= strength;
          // swizzle to world
          vec3 nx = vec3(tx.xy + n.zy, abs(tx.z) * n.x);
          vec3 ny = vec3(ty.xy + n.xz, abs(ty.z) * n.y);
          vec3 nz = vec3(tz.xy + n.xy, abs(tz.z) * n.z);
          return normalize(nx.zyx * w.x + ny.xzy * w.y + nz.xyz * w.z);
        }
      `)
      .replace('#include <map_fragment>', `
        vec3 Nw = normalize(vTpNrm);
        vec3 bw = pow(abs(Nw), vec3(6.0));
        bw /= (bw.x + bw.y + bw.z);
        vec3 P = vTpPos;
        float depth = max(0.0, -P.y);
        float macro = vnoise3(P * 0.025) * 0.6 + vnoise3(P * 0.11) * 0.4;
        float upness = Nw.y;
        // layer weights
        float wRock = 1.0 - smoothstep(0.62, 0.86, upness + (macro - 0.5) * 0.35);
        float deepK = smoothstep(180.0, 900.0, depth);
        float wFlat = 1.0 - wRock;
        float wSand = wFlat * (1.0 - deepK);
        float wSed = wFlat * deepK;
        float r2 = smoothstep(0.35, 0.65, vnoise3(P * 0.012 + 3.0));

        // rock at two scales to kill tiling
        vec3 rockC = mix(tpC(tRockC, P, bw, 0.11).rgb, tpC(tRock2C, P, bw, 0.08).rgb, r2);
        rockC *= mix(0.75, 1.15, tpC(tRockC, P, bw, 0.013).g * 1.5);
        vec3 rockO = mix(tpC(tRockO, P, bw, 0.11).rgb, tpC(tRock2O, P, bw, 0.08).rgb, r2);
        vec3 rockN = normalize(mix(tpN(tRockN, P, Nw, bw, 0.11, 1.4), tpN(tRock2N, P, Nw, bw, 0.08, 1.4), r2));

        vec3 sandC = tpC(tSandC, P, bw, 0.22).rgb * mix(0.85, 1.1, macro);
        vec3 sandO = tpC(tSandO, P, bw, 0.22).rgb;
        vec3 sandN = tpN(tSandN, P, Nw, bw, 0.22, 1.0);

        vec3 sedC = tpC(tSedC, P, bw, 0.09).rgb;
        // abyssal ooze: paler, greyer with depth, darker patches
        sedC = mix(sedC, vec3(dot(sedC, vec3(0.33))) * vec3(0.95, 0.9, 0.82), 0.45) * mix(0.8, 1.1, macro);
        vec3 sedO = tpC(tSedO, P, bw, 0.09).rgb;
        vec3 sedN = tpN(tSedN, P, Nw, bw, 0.09, 0.8);

        // deep rock is darker basalt
        rockC *= mix(vec3(1.0), vec3(0.55, 0.55, 0.6), smoothstep(800.0, 3000.0, depth));

        vec3 albedo = rockC * wRock + sandC * wSand + sedC * wSed;
        vec3 orm = rockO * wRock + sandO * wSand + sedO * wSed;
        gTpNrm = normalize(rockN * wRock + sandN * wSand + sedN * wSed);
        gTpAO = orm.r * vAO;
        gTpRough = orm.g;
        diffuseColor.rgb *= albedo;
      `)
      .replace('#include <roughnessmap_fragment>', `float roughnessFactor = roughness * mix(0.75, 1.0, gTpRough);`)
      .replace('#include <normal_fragment_maps>', `normal = normalize((viewMatrix * vec4(gTpNrm, 0.0)).xyz);`)
      .replace('#include <aomap_fragment>', `
        float ambientOcclusion = gTpAO;
        reflectedLight.indirectDiffuse *= ambientOcclusion;
        reflectedLight.directDiffuse *= mix(1.0, ambientOcclusion, 0.6);
      `);
  };
  mat.customProgramCacheKey = () => 'terrain-tp-v1';
  applyWater(mat, { caustics: true });
  return mat;
}
