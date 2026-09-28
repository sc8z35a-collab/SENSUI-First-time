import sys, json
def edit(p, pairs):
    s=open(p).read()
    for a,b in pairs:
        if a not in s: raise SystemExit(f"MISSING in {p}: {a[:90]!r}")
        s=s.replace(a,b,1)
    open(p,'w').write(s)
