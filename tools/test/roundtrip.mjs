// headless: every incident fires, first procedure is run, save/restore round-trips cleanly
import { Submarine } from '../../src/sim/sub.js';
import { Systems } from '../../src/sim/systems.js';
import { Autopilot } from '../../src/sim/autopilot.js';
import { Incidents, INCIDENT_IDS, proceduresFor } from '../../src/sim/incidents.js';
import { POIS } from '../../src/world/density.js';
const sub = new Submarine(), sys = new Systems(sub), env = {}, ap = new Autopilot(sub, sys), inc = new Incidents(sub, sys, env);
const P0 = POIS.find((p) => p.id === 'destroyer'); sub.pos.set(P0.x, P0.y + 40, P0.z); sub.depth = -sub.pos.y; sub.maxDepth = sub.depth;
for (let i = 0; i < 40; i++) sub.vbt = Math.max(0, Math.min(400, sub.vbt - sub.trimState / 1.025));
let raised = 0; for (const id of INCIDENT_IDS) if (inc.trigger(id)) raised++;
const dt = 1 / 30, idle = { surge: 0, yaw: 0, heave: 0, sway: 0 };
const tick = (n, S = sub, Y = sys, I = inc, A = ap, E = env) => { for (let i = 0; i < n; i++) { A.update(dt, idle); S.step(dt, Y); Y.activeCautions = I.cautionCount; Y.step(dt, E); I.step(dt); } };
for (const f of [...inc.active]) { if (f.resolved) continue; const P = proceduresFor(f, sys, sub); if (!P.length) { console.log('NO PROC', f.kind, f.target); continue; } inc.startRepair(f, P[0]); for (let i = 0; i < 70 * 30 && inc.repair; i++) tick(1); }
const d = JSON.parse(JSON.stringify({ sub: sub.serialize(), sys: sys.serialize(), inc: inc.serialize(), ap: ap.serialize() }));
const s2 = new Submarine(), y2 = new Systems(s2), i2 = new Incidents(s2, y2, {}), a2 = new Autopilot(s2, y2);
s2.restore(d.sub); y2.restore(d.sys); i2.restore(d.inc); tick(300, s2, y2, i2, a2, {});
const ok = raised === INCIDENT_IDS.length && i2.history.length >= inc.history.length && Number.isFinite(s2.pos.x + s2.vel.y) && !y2.dead && inc.history.length < 60;
console.log('raised', raised, '/', INCIDENT_IDS.length, 'history', inc.history.length, 'restored active', i2.active.length, 'depth', s2.depth.toFixed(0), 'dead', y2.dead, ok ? 'PASS' : 'FAIL');
process.exit(ok ? 0 : 1);
