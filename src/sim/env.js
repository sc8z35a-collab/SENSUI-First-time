// Ocean environment model (western Pacific / Mariana-like water column).
// All functions take depth in metres (positive down) unless stated otherwise.
import { createNoise } from '../core/noise.js';

const N = createNoise(771);
export const G = 9.80665;
export const P_ATM = 101325;

// in-situ seawater density (kg/m^3): surface 1023 (warm) .. ~1071 at 11 km (compressibility)
export function seawaterDensity(d) {
  d = Math.max(0, d);
  const thermo = 1023.0 + 4.3 * (1 - Math.exp(-d / 600)); // cooling of thermocline
  return thermo + 0.00435 * d; // pressure compression ~4.4 kg/m3 per km
}

// hydrostatic absolute pressure (Pa). Integrated density ~ mean of surface and in-situ.
export function pressureAt(d) {
  d = Math.max(0, d);
  const rhoMean = 0.5 * (1023 + seawaterDensity(d));
  return P_ATM + rhoMean * G * d;
}
export const toBar = (pa) => pa / 1e5;

// temperature profile (°C): mixed layer 27°C to 50 m, thermocline, deep 1.5 °C, slight adiabatic rise in hadal zone
export function temperatureAt(d) {
  d = Math.max(0, d);
  if (d < 50) return 27.2 - d * 0.01;
  const t = 1.55 + 25.2 * Math.exp(-(d - 50) / 380);
  const hadal = d > 4000 ? (d - 4000) * 0.00012 : 0;
  return t + hadal;
}
export function salinityAt(d) {
  d = Math.max(0, d);
  return 34.6 + 0.4 * Math.exp(-d / 200) - 0.3 * Math.exp(-((d - 800) ** 2) / 1.2e5);
}
// Mackenzie (1981) sound speed
export function soundSpeed(d) {
  const T = temperatureAt(d), S = salinityAt(d), D = Math.max(0, d);
  return 1448.96 + 4.591 * T - 5.304e-2 * T * T + 2.374e-4 * T ** 3 + 1.34 * (S - 35) + 1.63e-2 * D + 1.675e-7 * D * D
    - 1.025e-2 * T * (S - 35) - 7.139e-13 * T * D ** 3;
}
// dissolved O2 (ml/l) with an oxygen-minimum zone around 700 m
export function dissolvedO2(d) {
  return 4.8 - 3.6 * Math.exp(-((d - 750) ** 2) / 1.6e5) + (d > 2000 ? 0.3 : 0);
}

// Current field (m/s, world frame). Surface: wind drift; mid: slow meanders; deep: weak
// along-trench flow. Plus rare, time-varying gusts from `events.turbidity`.
const _c = [0, 0, 0];
export function currentAt(x, y, z, t, extra = 0) {
  const d = Math.max(0, -y);
  const surf = 0.35 * Math.exp(-d / 40);
  const mid = 0.12 * Math.exp(-d / 900);
  const deep = 0.04;
  const a1 = N.noise3(x * 0.002, d * 0.004, t * 0.004) * Math.PI;
  const a2 = N.noise3(z * 0.002 + 9, d * 0.003, t * 0.003) * Math.PI;
  _c[0] = surf * 0.8 + Math.cos(a1) * mid + deep * 0.3 + extra * Math.cos(a2);
  _c[2] = surf * 0.4 + Math.sin(a1) * mid + deep * 0.95 + extra * Math.sin(a2);
  _c[1] = N.noise3(x * 0.01, y * 0.01, t * 0.02) * 0.02 * (1 + extra * 3);
  return _c;
}

export function zoneName(d) {
  if (d < 200) return ['表層 (有光層)', 'EPIPELAGIC'];
  if (d < 1000) return ['中深層 (薄明層)', 'MESOPELAGIC'];
  if (d < 4000) return ['漸深層 (漸深海帯)', 'BATHYPELAGIC'];
  if (d < 6000) return ['深海層 (深海平原)', 'ABYSSOPELAGIC'];
  return ['超深海層 (海溝)', 'HADOPELAGIC'];
}
