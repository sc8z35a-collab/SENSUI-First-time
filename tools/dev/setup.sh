#!/usr/bin/env bash
# One-shot dev environment restore (the sandbox may be reset at any time).
#   bash tools/dev/setup.sh        -> venv + playwright chromium + system deps + preview server (pm2)
set -u
cd "$(dirname "$0")/../.."
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.cache/pw"
[ -d node_modules/three ] || npm ci --silent
if [ ! -x .venv/bin/python ]; then python3 -m venv .venv && .venv/bin/pip install -q playwright; fi
[ -d .cache/pw ] || .venv/bin/playwright install chromium >/dev/null
ldconfig -p 2>/dev/null | grep -q libatk-1.0 || sudo PLAYWRIGHT_BROWSERS_PATH="$PLAYWRIGHT_BROWSERS_PATH" .venv/bin/playwright install-deps chromium >/dev/null 2>&1
command -v pm2 >/dev/null || npm i -g pm2 >/dev/null 2>&1
npx vite build --logLevel error
pm2 describe preview >/dev/null 2>&1 || pm2 start tools/dev/ecosystem.config.cjs >/dev/null
sleep 2; curl -s -o /dev/null -w "preview %{http_code}\n" http://localhost:4173/
