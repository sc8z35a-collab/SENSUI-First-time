# dev screenshot harness (manual render mode):
#   python shot.py "URL?manual=1&pr=0.5" out.jpg [wait_s] [w] [h] [pre_js]
import sys, asyncio, os, base64
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/home/user/webapp/.cache/pw')
from playwright.async_api import async_playwright
async def main():
    url, out = sys.argv[1], sys.argv[2]
    wait = float(sys.argv[3]) if len(sys.argv) > 3 else 8
    w = int(sys.argv[4]) if len(sys.argv) > 4 else 844
    h = int(sys.argv[5]) if len(sys.argv) > 5 else 390
    js = sys.argv[6] if len(sys.argv) > 6 else None
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        pg = await b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, is_mobile=True)
        pg.set_default_timeout(180000)
        logs = []
        pg.on('console', lambda m: logs.append(f'[{m.type}] {m.text}'))
        pg.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
        await pg.goto(url)
        await pg.wait_for_timeout(int(wait * 1000))
        if js:
            r = await pg.evaluate(js); logs.append(f'[js] {r}')
        data = await pg.evaluate("window.__shot ? window.__shot() : null")
        if data:
            open(out, 'wb').write(base64.b64decode(data.split(',')[1]))
        else:
            await pg.screenshot(path=out)
        for l in logs[:60]: print(l[:600])
        await b.close()
asyncio.run(main())
