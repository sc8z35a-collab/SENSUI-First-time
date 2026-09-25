// helpers for canvas-backed textures (placards, labels, MFD screens)
import * as THREE from 'three';

export function canvasTexture(w, h, draw, { srgb = true } = {}) {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  if (draw) draw(ctx, w, h);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = 8;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.userData.ctx = ctx; t.userData.canvas = cv;
  return t;
}

export function placard(text, { w = 256, h = 64, bg = '#d8d2c0', fg = '#111', font = 'bold 34px "Noto Sans JP", sans-serif', border = true, sub = '' } = {}) {
  return canvasTexture(w, h, (c) => {
    c.fillStyle = bg; c.fillRect(0, 0, w, h);
    if (border) { c.strokeStyle = fg; c.lineWidth = 4; c.strokeRect(5, 5, w - 10, h - 10); }
    c.fillStyle = fg; c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(text, w / 2, sub ? h * 0.4 : h / 2);
    if (sub) { c.font = `bold ${Math.floor(h * 0.22)}px monospace`; c.fillText(sub, w / 2, h * 0.76); }
  });
}

export const FONT = '"Rajdhani","Segoe UI","Noto Sans JP",system-ui,sans-serif';
export const MONO = '"Share Tech Mono","DejaVu Sans Mono",Consolas,monospace';
