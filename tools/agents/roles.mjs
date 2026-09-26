// Six specialised agents. Each owns a slice of the codebase and receives only
// the files relevant to it (keeps context small and lets them run in parallel).
export const ROLES = [
  {
    id: 'architect', model: 'gpt-5.2', name: 'Integrator / Architect',
    files: ['src/main.js', 'src/game.js', 'index.html', 'vite.config.js'],
    brief: 'Owns the game loop, module wiring, state flow, save/load and boot sequence. Look for integration bugs, missing wiring, ordering issues, and memory leaks.',
  },
  {
    id: 'graphics', model: 'gpt-5.2-codex', name: 'Rendering / Graphics',
    files: ['src/render/pipeline.js', 'src/render/water.js', 'src/render/terrainMaterial.js', 'src/world/exterior.js'],
    brief: 'Owns the HDR pipeline, volumetric water, bloom, terrain material and exterior lighting. Maximise realism on a flagship Android GPU (no performance limits); fix shader bugs.',
  },
  {
    id: 'sim', model: 'gpt-5.2-codex', name: 'Simulation / Systems',
    files: ['src/sim/sub.js', 'src/sim/systems.js', 'src/sim/incidents.js', 'src/sim/env.js'],
    brief: 'Owns submarine physics, electrical/LSS/hull systems and the incident engine. Improve physical realism and failure cascades; keep APIs stable.',
  },
  {
    id: 'autopilot', model: 'gpt-5.2-codex', name: 'Autopilot / Navigation',
    files: ['src/sim/autopilot.js', 'src/cockpit/mfd.js'],
    brief: 'Owns PID loops, guidance modes, obstacle avoidance and the MFD pages. Tune for stability and graceful sensor degradation.',
  },
  {
    id: 'ui', model: 'gpt-5.2', name: 'Mobile UI / Touch Controls',
    files: ['src/ui/hud.js', 'src/ui/controls.js', 'src/ui/style.css'],
    brief: 'Owns landscape-only full-screen smartphone UI: twin sticks, look drag, panels, damage-control tablet. Check touch ergonomics, safe-area insets, multi-touch bugs.',
  },
  {
    id: 'qa', model: 'gpt-5.2', name: 'Audio + QA Reviewer',
    files: ['src/audio/audio.js', 'src/game.js'],
    brief: 'Owns the procedural WebAudio engine and performs a cross-cutting code review: runtime errors, NaN sources, unhandled promises.',
  },
];
