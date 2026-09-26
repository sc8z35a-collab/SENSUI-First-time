# multi-shot dev harness:
#   python shots.py URL wait_s w h  [js out.jpg]...
# waits until the game has booted, runs each js snippet, then captures the frame.
import sys, asyncio, os, base64
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/home/user/webapp/.cache/pw')
from playwright.async_api import async_playwright
INIT = """
(() => { window.__nan = [];
  const hook = () => { const T = window.__THREE; if (!T) return setTimeout(hook, 5); };
})();
"""
async def main():
    os.makedirs('shots', exist_ok=True)
    url, wait, w, h = sys.argv[1], float(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
    jobs = sys.argv[5:]
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        pg = await b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, is_mobile=True)
        pg.set_default_timeout(900000)
        logs = []
        def on_console(m):
            t = m.text
            if 'AudioContext' in t or 'requestFullscreen' in t: return
            logs.append(f'[{m.type}] {t}')
        pg.on('console', on_console)
        pg.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
        await pg.goto(url)
        await pg.wait_for_function('window.__game && window.__game.state && window.__game.state !== "boot"', timeout=900000, polling=1000)
        await pg.wait_for_timeout(int(wait * 1000))
        for i in range(0, len(jobs), 2):
            js, out = jobs[i], jobs[i + 1]
            if js:
                r = await pg.evaluate(js); logs.append(f'[js {out}] {str(r)[:1500]}')
            if out.endswith('_ui.jpg'):
                await pg.screenshot(path=out, type='jpeg', quality=85)
            elif out != '-':
                data = await pg.evaluate("window.__shot()")
                open(out, 'wb').write(base64.b64decode(data.split(',')[1]))
        seen = set()
        for l in logs:
            k = l[:120]
            if k in seen: continue
            seen.add(k); print(l[:900])
        await b.close()
asyncio.run(main())
