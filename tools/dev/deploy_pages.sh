#!/usr/bin/env bash
# Production deploy: build and force-push dist/ to the gh-pages branch (GitHub Pages serves it).
set -euo pipefail
cd "$(dirname "$0")/../.."
REV=$(git rev-parse --short HEAD)
rm -rf dist && npx vite build --logLevel error && touch dist/.nojekyll
cd dist && rm -rf .git && git init -q -b gh-pages && git add -A
git -c user.name="genspark" -c user.email="bot@genspark.ai" commit -qm "deploy: $REV"
git push -qf "$(cd .. && git remote get-url origin)" gh-pages
rm -rf .git
echo "deployed $REV -> https://sc8z35a-collab.github.io/SENSUI-First-time/"
