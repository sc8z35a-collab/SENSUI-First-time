// headless sanity check of hydrostatics + autopilot + systems
import { Submarine, SPEC } from '../../src/sim/sub.js';
import { Systems } from '../../src/sim/systems.js';
import { Autopilot } from '../../src/sim/autopilot.js';
import { Incidents } from '../../src/sim/incidents.js';
const sub = new Submarine(); const sys = new Systems(sub); const env = {}; const ap = new Autopilot(sub, sys); const inc = new Incidents(sub, sys, env);
inc.rateMul = +(process.argv[3] ?? 0);
console.log('trimState@surface kg', sub.trimState.toFixed(1), 'mass', sub.totalMass);
for (const d of [0, 100, 1000, 5000, 11000]) { sub.pos.y = -d; sub.depth = d; console.log('depth', d, 'heavy kg', sub.trimState.toFixed(1)); }
sub.pos.y = -2;
const mode = process.argv[2] || 'descent';
if (mode === 'descent') { ap.engage(true); ap.setMode('descent', true, 0.8); }
if (mode === 'depth') { ap.engage(true); ap.setMode('depth', true, 300); }
if (mode === 'nav') { ap.engage(true); const { POIS } = await import('../../src/world/density.js'); ap.navTo(POIS[+(process.argv[4] ?? 1)]); }
const dt = 1 / 30; let t = 0;
for (let i = 0; i < 30 * 60 * (+(process.argv[5] ?? 20)); i++) {
  ap.update(dt, { surge: 0, yaw: 0, heave: 0, sway: 0 });
  sub.step(dt, sys); sys.activeCautions = inc.cautionCount; sys.step(dt, env); inc.step(dt);
  t += dt;
  if (i % (30 * +(process.env.EVERY||60)) === 0) console.log(`t=${(t / 60).toFixed(0)}m d=${sub.depth.toFixed(1)} vz=${(-sub.vel.y).toFixed(2)} alt=${sub.altitude.toFixed(0)} vbt=${sub.vbt.toFixed(0)} heavy=${sub.trimState.toFixed(0)} spd=${sub.speed.toFixed(2)} pitch=${(sub.pitch*57.3).toFixed(1)} socA=${sys.bat.A.soc.toFixed(3)} socB=${sys.bat.B.soc.toFixed(3)} o2=${sys.o2.toFixed(2)} co2=${sys.co2.toFixed(2)} T=${sys.cabinT.toFixed(1)} ap=${ap.status} cf=${ap.chartFloor?.toFixed(0)} oas=${ap.oas.threat.toFixed(2)}@${ap.oas.dist.toFixed(0)} x=${sub.pos.x.toFixed(0)} z=${sub.pos.z.toFixed(0)} ${sys.dead||''} inc=${inc.history.map(f=>f.en).join('|')}`);
  if (sys.dead) break;
}
