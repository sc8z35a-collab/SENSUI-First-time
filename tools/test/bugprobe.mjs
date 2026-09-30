// headless checks for the bugs listed in docs/BUG_AUDIT.md (node tools/test/bugprobe.mjs); exits 1 on regression
import { Submarine } from '../../src/sim/sub.js';
import { Systems } from '../../src/sim/systems.js';
import { Autopilot, heading } from '../../src/sim/autopilot.js';
import { Incidents } from '../../src/sim/incidents.js';
import { hdgUp } from '../../src/cockpit/mfd.js';
import { dialLabel } from '../../src/cockpit/canvasTex.js';
const mk = () => { const sub = new Submarine(), sys = new Systems(sub), env = {}, ap = new Autopilot(sub, sys), inc = new Incidents(sub, sys, env); inc.rateMul = 0; inc.cooldown = 1e9; return { sub, sys, env, ap, inc }; };
const idle = { surge: 0, yaw: 0, heave: 0, sway: 0 };
let bad = 0; const chk = (ok) => { if (!ok) { bad++; console.log('   ^ FAIL'); } };
{ const { sub, ap } = mk(); sub.pitch = 0.3; sub._updateQuat(); ap.update(1/60, idle); sub._mix(); let tx = 0; for (const t of sub.thr) { const T = t.max * Math.sign(t.cmd) * t.cmd * t.cmd; tx += t.pos[1]*t.axis[2]*T - t.pos[2]*t.axis[1]*T; } console.log('#1 bow-up pitch -> SAS pitch torque', tx.toFixed(0), tx > 0 ? 'BUG (destabilising)' : 'ok'); chk(tx < 0); }
{ const { sys, env } = mk(); sys.fire.active = true; sys.fire.intensity = 0.5; sys.fire.loc = 'NAV'; sys.breakers.NAV.closed = false; for (let i = 0; i < 3600; i++) sys.step(1/60, env); console.log('#2 fire 60s after de-energise: intensity', sys.fire.intensity.toFixed(2)); chk(!sys.fire.active); }
{ const { sys } = mk(); sys.isolate('P2'); sys.isolate('P2'); console.log('#3 HEAT (was OFF) after isolate/reopen P2:', sys.breakers.HEAT.closed); chk(!sys.breakers.HEAT.closed); }
{ const { sys } = mk(); sys.isolate('P1'); sys.breakers.PROP.tripped = true; sys.toggleBreaker('PROP'); console.log('#4 PROP powered while P1 isolated:', sys.powered('PROP')); chk(!sys.powered('PROP')); }
{ const { sys, env } = mk(); let t = 0; while (!sys.dead && t < 10800) { sys.fire.smoke = 1; sys.step(1, env); t++; } console.log('#5 smoke-only death cause:', sys.dead); chk(sys.dead === 'smoke'); }
{ const a = mk(); a.sub.pos.y = -1500; a.sub.depth = 1500; a.inc.trigger('turbidity'); a.inc.step(1/60); const d = JSON.parse(JSON.stringify({ sub: a.sub.serialize(), inc: a.inc.serialize() })); const b = mk(); b.sub.restore(d.sub); b.inc.restore(d.inc); for (let i = 0; i < 60*400; i++) b.inc.step(1/60); console.log('#6 turbidity 400s after reload: currentExtra', b.sub.currentExtra); chk(b.sub.currentExtra === 0); }
{ const { sub, sys, env, inc } = mk(); sub.pos.y = -1000; sub.depth = 1000; inc.trigger('battery_cell'); const n = sys.bat.A.fault ? 'A' : 'B'; for (let i = 0; i < 3600; i++) sys.step(1, env); console.log('#7 cell fault after 1h temp', sys.bat[n].temp.toFixed(1), 'online', sys.bat[n].online, 'fault', sys.bat[n].fault); chk(sys.bat[n].temp > 40 || !sys.bat[n].online); }
{ const { sys, env } = mk(); sys.bat.A.temp = 90; sys.bat.A.fault = 'thermal'; sys.bat.A.online = false; for (let i = 0; i < 600; i++) sys.step(1, env); console.log('#8 offline battery temp after 10 min', sys.bat.A.temp.toFixed(1)); chk(sys.bat.A.temp < 80); }
{ const [r, a] = hdgUp(-Math.sin(0.7) * 10, -Math.cos(0.7) * 10, 0.7); console.log('#9 NAV HDG-UP: point 10 m ahead drawn at', r.toFixed(2), (-a).toFixed(2), '(expected 0,-10)'); chk(Math.abs(r) < 1e-6 && Math.abs(a - 10) < 1e-6); }
{ const { sub, inc } = mk(); sub.thr[0].fault = 'failed'; const f = inc.raise({ kind: 'thruster', target: 'T1', sev: 2, title: 'x', en: 'T1 MCU FAULT' }); inc._apply(f, 'disable'); inc.setThruster('T1', true); const back = inc.active.some((g) => !g.resolved && g.target === 'T1'); console.log('#10 disabled thruster re-connected:', sub.thr[0].enabled, 'card re-raised', back); chk(sub.thr[0].enabled && back); }
{ const { sub, sys, ap } = mk(); sub.pos.y = -100; sub.depth = 100; ap.engage(true); ap.setMode('descent', true, 0.8); for (let i = 0; i < 60; i++) { ap.update(1/60, idle); sub.step(1/60, sys); } sys.breakers.NAV.tripped = true; for (let i = 0; i < 1800; i++) { ap.update(1/60, idle); sub.step(1/60, sys); } console.log('#11 30s after AP dropped: vbtCmd', sub.vbtCmd.toFixed(2)); chk(sub.vbtCmd === 0); }
for (const [max, ticks] of [[2, 4], [3, 6]]) { const L = []; for (let i = 0; i <= ticks; i++) L.push(dialLabel(i, ticks, max)); console.log('#36 gauge', max, 'labels', L.join(',')); chk(new Set(L).size === L.length); }
{ const { sub } = mk(); sub.pos.y = -10; sub.depth = 10; console.log('#25 trimState @10 m, VBT 0 L:', sub.trimState.toFixed(0), 'kg; VBT 150 L:', (sub.vbt = 150, sub.trimState).toFixed(0), 'kg'); chk(Math.abs(sub.trimState) < 10); }
{ const { sub } = mk(); console.log('#26 buoyancy at dive start (surface):', sub.trimState.toFixed(0), 'kg'); chk(sub.trimState < 0); }

{ const { sys } = mk(); sys.bat.A.fault = 'thermal'; sys.bat.A.temp = 100; sys.bat.A.online = false; const r = sys.setBattery('A', true); console.log('#18 reconnect thermal-tripped string:', r); chk(!r && !sys.bat.A.online); }
{ const { sys } = mk(); console.log('#35 emergency O2 before first use:', sys.emergencyO2 * 60, 'min'); chk(sys.emergencyO2 > 0); }
console.log(bad ? `${bad} FAIL` : 'ALL PASS'); process.exit(bad ? 1 : 0);
