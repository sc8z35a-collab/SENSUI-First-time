# Run from a folder containing amb/<AssetId>/ (unzipped ambientCG 1K-JPG sets): PaintedPlaster017,
# SurfaceImperfections003, SurfaceImperfections013, Fingerprints002, Smear002. Outputs wallpanel_*.jpg
# Photographic painted-panel PBR set baked from CC0 ambientCG scans (all tileable):
#   PaintedPlaster017  -> fine orange-peel / roller stipple (normal, height, roughness)
#   SurfaceImperfections003 -> streaky grime; SurfaceImperfections013 -> blotches/stains
#   Fingerprints002 / Smear002 -> glossy handling marks in the roughness
import numpy as np, glob
from PIL import Image
S = 1024
def load(asset, m, mode='L'):
    f = glob.glob(f'amb/{asset}/*_{m}.jpg')[0]
    return np.asarray(Image.open(f).convert(mode).resize((S, S), Image.LANCZOS), dtype=np.float32) / 255.0
def pn(x, lo=2, hi=98):  # percentile normalise to 0..1
    a, b = np.percentile(x, [lo, hi]); return np.clip((x - a) / (b - a + 1e-6), 0, 1)
def blur(x, r):
    # separable box blur x3 ~ gaussian, wrap (tileable)
    for _ in range(3):
        for ax in (0, 1):
            acc = np.zeros_like(x)
            for k in range(-r, r + 1): acc += np.roll(x, k, axis=ax)
            x = acc / (2 * r + 1)
    return x
pl_n = load('PaintedPlaster017', 'NormalGL', 'RGB') * 2 - 1
pl_h = pn(load('PaintedPlaster017', 'Displacement')); pl_r = pn(load('PaintedPlaster017', 'Roughness'))
g3 = pn(load('SurfaceImperfections003', 'Opacity'))
g13 = pn(load('SurfaceImperfections013', 'Opacity'), 50, 99.5)
i3n = load('SurfaceImperfections003', 'NormalGL', 'RGB') * 2 - 1
fp = pn(load('Fingerprints002', 'Opacity'), 40, 99)
sm = pn(load('Smear002', 'Roughness'), 30, 99)
# low-frequency "age" field: paint is never uniform over a panel
age = pn(blur(g3, 24))
grime = np.clip(0.55 * g3 ** 1.5 + 0.45 * age, 0, 1)
stains = g13 ** 1.6
# ---------- albedo (linear, mean ~0.85; material colour tints it)
alb = 0.9 - 0.14 * grime - 0.10 * stains + 0.03 * (pl_h - 0.5)
alb = np.clip(alb, 0, 1)
rgb = np.stack([alb * (1 - 0.00 * grime - 0.01 * stains), alb * (1 - 0.02 * grime - 0.03 * stains), alb * (1 - 0.05 * grime - 0.08 * stains)], -1)
Image.fromarray((np.clip(rgb, 0, 1) ** (1 / 2.2) * 255 + 0.5).astype(np.uint8)).save('wallpanel_color.jpg', quality=93)
# ---------- ORM (R=AO, G=roughness, B=0). Satin enamel ~0.35-0.5; handling polishes it; dirt dulls it
rough = 0.42 + 0.10 * (pl_r - 0.5) + 0.14 * grime + 0.08 * stains - 0.20 * fp - 0.10 * sm * (1 - fp)
rough = np.clip(rough, 0.16, 0.85)
ao = np.clip(1.0 - 0.45 * np.clip(0.5 - pl_h, 0, 1) - 0.08 * grime, 0, 1)
Image.fromarray((np.stack([ao, rough, np.zeros_like(ao)], -1) * 255 + 0.5).astype(np.uint8)).save('wallpanel_orm.jpg', quality=93)
# ---------- normal (UDN blend: stipple + faint dings)
n = np.stack([pl_n[..., 0] + 0.3 * i3n[..., 0], pl_n[..., 1] + 0.3 * i3n[..., 1], pl_n[..., 2]], -1)
n /= np.linalg.norm(n, axis=-1, keepdims=True) + 1e-6
Image.fromarray(((n * 0.5 + 0.5) * 255 + 0.5).astype(np.uint8)).save('wallpanel_normal.jpg', quality=94)
print('albedo %.3f..%.3f mean %.3f | rough %.3f..%.3f mean %.3f' % (alb.min(), alb.max(), alb.mean(), rough.min(), rough.max(), rough.mean()))
