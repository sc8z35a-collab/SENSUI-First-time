// graphics presets. LOW is for battery saving / thermal throttling; ULTRA = native resolution.
export const QUALITY = [
  { name: 'LOW', ja: '低', pr: 1.0, shadow: 0, shadowMap: 512, bloom: 3, volSteps: 16, shafts: 8, msaa: 0, snow: 0.35, cockpitShadow: false, aniso: 2 },
  { name: 'HIGH', ja: '高', pr: 1.5, shadow: 1, shadowMap: 1024, bloom: 5, volSteps: 32, shafts: 12, msaa: 4, snow: 0.7, cockpitShadow: true, aniso: 8 },
  { name: 'VERY HIGH', ja: '超高', pr: 2.0, shadow: 1, shadowMap: 2048, bloom: 6, volSteps: 48, shafts: 16, msaa: 4, snow: 1, cockpitShadow: true, aniso: 16 },
  { name: 'ULTRA', ja: '最高', pr: 3.0, shadow: 1, shadowMap: 4096, bloom: 6, volSteps: 64, shafts: 16, msaa: 4, snow: 1, cockpitShadow: true, aniso: 16 },
];
