// headless reproduction of the bugs listed in docs/BUG_AUDIT.md (node tools/test/bugprobe.mjs)
import { Submarine } from '../../src/sim/sub.js';
import { Systems } from '../../src/sim/systems.js';
import { Autopilot, heading } from '../../src/sim/autopilot.js';
import { Incidents } from '../../src/sim/incidents.js';
const mk = () => { const sub = new Submarine(), sys = new Systems(sub), env = {}, ap = new Autopilot(sub, sys), inc = new Incidents(sub, sys, env); inc.rateMul = 0; inc.cooldown = 1e9; return { sub, sys, env, ap, inc }; };
const idle = { surge: 0, yaw: 0, heave: 0, sway: 0 };
{ const { sub, ap } = mk(); sub.pitch = 0.3; sub._updateQuat(); ap.update(1/60, idle); sub._mix(); let tx = 0; for (const t of sub.thr) { const T = t.max * Math.sign(t.cmd) * t.cmd * t.cmd; tx += t.pos[1]*t.axis[2]*T - t.pos[2]*t.axis[1]*T; } console.log('#1 bow-up pitch -> SAS pitch torque', tx.toFixed(0), tx > 0 ? 'BUG (destabilising)' : 'ok'); }
{ const { sys, env } = mk(); sys.fire.active = true; sys.fire.intensity = 0.5; sys.fire.loc = 'NAV'; sys.breakers.NAV.closed = false; for (let i = 0; i < 3600; i++) sys.step(1/60, env); console.log('#2 fire 60s after de-energise: intensity', sys.fire.intensity.toFixed(2)); }
{ const { sys } = mk(); sys.isolate('P2'); sys.isolate('P2'); console.log('#3 HEAT (was OFF) after isolate/reopen P2:', sys.breakers.HEAT.closed); }
{ const { sys } = mk(); sys.isolate('P1'); sys.breakers.PROP.tripped = true; sys.toggleBreaker('PROP'); console.log('#4 PROP powered while P1 isolated:', sys.powered('PROP')); }
{ const { sys, env } = mk(); let t = 0; while (!sys.dead && t < 10800) { sys.fire.smoke = 1; sys.step(1, env); t++; } console.log('#5 smoke-only death cause:', sys.dead); }
{ const a = mk(); a.sub.pos.y = -1500; a.sub.depth = 1500; a.inc.trigger('turbidity'); a.inc.step(1/60); const d = JSON.parse(JSON.stringify({ sub: a.sub.serialize(), inc: a.inc.serialize() })); const b = mk(); b.sub.restore(d.sub); b.inc.restore(d.inc); for (let i = 0; i < 60*400; i++) b.inc.step(1/60); console.log('#6 turbidity 400s after reload: currentExtra', b.sub.currentExtra); }
{ const { sub, sys, env, inc } = mk(); sub.pos.y = -1000; sub.depth = 1000; inc.trigger('battery_cell'); const n = sys.bat.A.fault ? 'A' : 'B'; for (let i = 0; i < 3600; i++) sys.step(1, env); console.log('#7 cell fault after 1h temp', sys.bat[n].temp.toFixed(1)); }
{ const { sys, env } = mk(); sys.bat.A.temp = 90; sys.bat.A.fault = 'thermal'; sys.bat.A.online = false; for (let i = 0; i < 600; i++) sys.step(1, env); console.log('#8 offline battery temp after 10 min', sys.bat.A.temp); }
{ const yaw = 0.7, fx = -Math.sin(yaw) * 10, fz = -Math.cos(yaw) * 10, cs = Math.cos(-yaw), sn = Math.sin(-yaw); console.log('#9 NAV HDG-UP: point 10 m ahead drawn at', (fx*cs - fz*sn).toFixed(2), (fx*sn + fz*cs).toFixed(2), '(expected 0,-10)'); }
{ const { sub, inc } = mk(); sub.thr[0].fault = 'failed'; const f = inc.raise({ kind: 'thruster', target: 'T1', sev: 2, title: 'x', en: 'T1 MCU FAULT' }); inc._apply(f, 'disable'); console.log('#10 disabled thruster: enabled', sub.thr[0].enabled, 'card resolved', f.resolved); }
{ const { sub, sys, ap } = mk(); sub.pos.y = -100; sub.depth = 100; ap.engage(true); ap.setMode('descent', true, 0.8); for (let i = 0; i < 60; i++) { ap.update(1/60, idle); sub.step(1/60, sys); } sys.breakers.NAV.tripped = true; for (let i = 0; i < 1800; i++) { ap.update(1/60, idle); sub.step(1/60, sys); } console.log('#11 30s after AP dropped: vbtCmd', sub.vbtCmd.toFixed(2)); }
for (const [max, ticks] of [[2, 4], [3, 6]]) { const L = []; for (let i = 0; i <= ticks * 5; i += 5) L.push(Math.round(i / (ticks * 5) * max)); console.log('#12 gauge', max, 'labels', L.join(',')); }
{ const { sub } = mk(); sub.pos.y = -10; console.log('#52 trimState @10 m with VBT 0 L:', sub.trimState.toFixed(0), 'kg'); }
