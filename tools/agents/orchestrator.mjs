#!/usr/bin/env node
// 6-agent parallel build pipeline.
//
//   node tools/agents/orchestrator.mjs [--check] [--apply] [--task "..."]
//
// 1. Preflight: verifies the LLM proxy really answers (detects plan/credit blocks
//    which the proxy returns as HTTP 200 with an explanatory message).
// 2. Runs the six role agents concurrently (Promise.allSettled). Each agent gets
//    its owned files + a brief and must answer with a unified diff and notes.
// 3. Writes reports to tools/agents/out/<role>.md, validates each diff with
//    `git apply --check`, optionally applies it (--apply), then runs `vite build`.
//    Any agent whose patch breaks the build is rolled back individually.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { ROLES } from './roles.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(ROOT, 'tools/agents/out');
const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const task = args.includes('--task') ? args[args.indexOf('--task') + 1] : 'Review your area and propose the single most valuable improvement for realism, correctness or mobile UX.';

function loadConfig() {
  let key = process.env.OPENAI_API_KEY, base = process.env.OPENAI_BASE_URL;
  const f = path.join(os.homedir(), '.genspark_llm.yaml');
  if (fs.existsSync(f)) {
    const y = fs.readFileSync(f, 'utf8');
    key = key || y.match(/api_key:\s*(\S+)/)?.[1];
    base = base || y.match(/base_url:\s*(\S+)/)?.[1];
  }
  if (!key || !base) throw new Error('LLM API not configured (OPENAI_API_KEY / OPENAI_BASE_URL or ~/.genspark_llm.yaml)');
  return { key, base: base.replace(/\/$/, '') };
}

async function chat(cfg, model, messages, { timeoutMs = 600000 } = {}) {
  const ac = new AbortController();
  const to = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(`${cfg.base}/chat/completions`, {
      method: 'POST', signal: ac.signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.key}` },
      body: JSON.stringify({ model, messages }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${JSON.stringify(j).slice(0, 300)}`);
    const content = j.choices?.[0]?.message?.content ?? '';
    // the proxy signals plan/credit problems in-band
    if (j.x_genspark?.code || /Free-plan credits can't be used|credit_exhausted/i.test(content)) {
      const e = new Error(`LLM proxy blocked: ${j.x_genspark?.code || 'credit/plan block'} — ${content.slice(0, 160)}`);
      e.blocked = true; throw e;
    }
    return { content, usage: j.usage };
  } finally { clearTimeout(to); }
}

// every model the proxy offers — used as fall-backs if a role's primary model is unavailable
const FALLBACK = ['gpt-5.2', 'gpt-5.2-codex', 'gpt-5.3-codex', 'gpt-5.1', 'gpt-5', 'gpt-5-codex', 'gpt-5-mini'];

export async function preflight(cfg) {
  const models = [...new Set([...ROLES.map((r) => r.model), ...FALLBACK])];
  const res = await Promise.allSettled(models.map((m) => chat(cfg, m, [{ role: 'user', content: 'Reply with the single word READY.' }], { timeoutMs: 60000 })));
  const report = models.map((m, i) => ({ model: m, ok: res[i].status === 'fulfilled' && /READY/i.test(res[i].value.content), err: res[i].reason?.message }));
  return report;
}

function readFiles(files) {
  return files.filter((f) => fs.existsSync(path.join(ROOT, f)))
    .map((f) => `===== FILE: ${f} =====\n${fs.readFileSync(path.join(ROOT, f), 'utf8')}`).join('\n\n');
}

const SYSTEM = `You are one of six senior engineers working in parallel on "ABYSSAL DESCENT", a hyper-realistic
first-person deep-sea submersible game (three.js, Vite, landscape-only fullscreen Android flagship phone, touch only).
Only modify files you own. Respond with:
1) a short NOTES section (Japanese OK), then
2) exactly one fenced \`\`\`diff block containing a unified diff (git format, paths a/ b/ relative to repo root).
If nothing should change, output an empty diff block.`;

async function runAgent(cfg, role) {
  const t0 = Date.now();
  const user = `ROLE: ${role.name}\nBRIEF: ${role.brief}\nTASK: ${task}\n\n${readFiles(role.files)}`;
  let content, usage, lastErr;
  for (const model of [role.model, ...(role.healthy || [])].filter((m, i, a) => a.indexOf(m) === i).slice(0, 3)) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try { ({ content, usage } = await chat(cfg, model, [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }])); lastErr = null; break; }
      catch (e) { lastErr = e; if (e.blocked) break; await new Promise((r) => setTimeout(r, 3000 * (attempt + 1))); }
    }
    if (!lastErr) break;
  }
  if (lastErr) throw lastErr;
  const diff = content.match(/```diff\n([\s\S]*?)```/)?.[1] ?? '';
  fs.writeFileSync(path.join(OUT, `${role.id}.md`), content);
  if (diff.trim()) fs.writeFileSync(path.join(OUT, `${role.id}.patch`), diff);
  return { id: role.id, ms: Date.now() - t0, usage, hasPatch: !!diff.trim() };
}

function sh(cmd) { return execSync(cmd, { cwd: ROOT, stdio: 'pipe' }).toString(); }

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const cfg = loadConfig();
  console.log(`[pipeline] preflight ${cfg.base}`);
  const pf = await preflight(cfg);
  for (const p of pf) console.log(`  ${p.ok ? 'OK ' : 'NG '} ${p.model}${p.err ? '  ' + p.err : ''}`);
  fs.writeFileSync(path.join(OUT, 'preflight.json'), JSON.stringify({ at: new Date().toISOString(), pf }, null, 2));
  const healthy = pf.filter((p) => p.ok).map((p) => p.model);
  if (!healthy.length) {
    const why = pf.find((p) => p.err)?.err || 'unknown';
    console.error(`[pipeline] LLM API unavailable — agents NOT started. (${why})`);
    fs.writeFileSync(path.join(OUT, 'STATUS.md'), `# Agent pipeline status\n\n- ${new Date().toISOString()}: BLOCKED — ${why}\n`);
    process.exit(2);
  }
  for (const r of ROLES) r.healthy = healthy;
  if (flag('--check')) return;

  console.log(`[pipeline] launching ${ROLES.length} agents in parallel`);
  const res = await Promise.allSettled(ROLES.map((r) => runAgent(cfg, r)));
  res.forEach((r, i) => console.log(`  ${ROLES[i].id.padEnd(10)} ${r.status === 'fulfilled' ? `done ${r.value.ms} ms patch=${r.value.hasPatch}` : 'FAILED ' + r.reason?.message}`));

  if (!flag('--apply')) return;
  for (const role of ROLES) {
    const p = path.join(OUT, `${role.id}.patch`);
    if (!fs.existsSync(p)) continue;
    try { sh(`git apply --check "${p}"`); } catch { console.log(`  ${role.id}: patch does not apply, skipped`); continue; }
    sh(`git apply "${p}"`);
    try { sh('npx vite build --logLevel error'); sh(`git add -A && git commit -m "agent(${role.id}): ${task.slice(0, 60).replace(/"/g, "'")}"`); console.log(`  ${role.id}: applied + committed`); }
    catch { sh(`git apply -R "${p}"`); console.log(`  ${role.id}: build failed, rolled back`); }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(e); process.exit(1); });
