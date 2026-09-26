const path = require('path');
const root = path.resolve(__dirname, '../..');
module.exports = { apps: [{ name: 'preview', cwd: root, script: path.join(root, 'node_modules/vite/bin/vite.js'), args: 'preview --host 0.0.0.0 --port 4173', autorestart: true, max_restarts: 1000 }] };
