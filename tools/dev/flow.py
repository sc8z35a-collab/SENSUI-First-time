# mobile landscape flow check: title -> tap start -> play; prints errors, saves UI screenshots
#   .venv/bin/python tools/dev/flow.py [url] [w] [h]
import sys, asyncio, os
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/home/user/webapp/.cache/pw')
from playwright.async_api import async_playwright
async def main():
    url = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4173/?pr=0.5'
    w = int(sys.argv[2]) if len(sys.argv) > 2 else 915
    h = int(sys.argv[3]) if len(sys.argv) > 3 else 412
    os.makedirs('shots', exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'])
        pg = await b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=2, has_touch=True, is_mobile=True)
        pg.set_default_timeout(300000)
        logs = []
        pg.on('console', lambda m: logs.append(f'[{m.type}] {m.text}') if m.type in ('error','warning') else None)
        pg.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
        await pg.goto(url)
        await pg.wait_for_function('window.__game && window.__game.state === "title"', polling=1000)
        await pg.wait_for_timeout(1500)
        await pg.screenshot(path='shots/f1_title_ui.jpg', type='jpeg', quality=80)
        btn = pg.locator('#menu button').first
        await btn.tap()
        await pg.wait_for_timeout(6000)
        st = await pg.evaluate('window.__game.state')
        logs.append(f'[state after tap] {st}')
        await pg.screenshot(path='shots/f2_play_ui.jpg', type='jpeg', quality=80)
        extra = os.environ.get('FLOW_JS')
        if extra:
            logs.append('[js] ' + str(await pg.evaluate(extra)))
            await pg.wait_for_timeout(1500)
            await pg.screenshot(path='shots/f3_extra_ui.jpg', type='jpeg', quality=80)
        seen=set()
        for l in logs:
            if l[:100] in seen: continue
            seen.add(l[:100]); print(l[:500])
        await b.close()
asyncio.run(main())
