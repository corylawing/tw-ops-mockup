"""Run before every publish:  python3 tools/check.py
Catches the two mistakes that have broken this mockup: an unbalanced brace in a stylesheet
(browsers silently drop the next rule) and a script that does not parse."""
import re, glob, subprocess, sys, tempfile, os
ok = True
def braces(name, css):
    global ok
    depth = 0; line = 1; i = 0
    while i < len(css):
        if css.startswith('/*', i):
            j = css.find('*/', i); j = len(css) if j < 0 else j + 2
            line += css.count('\n', i, j); i = j; continue
        ch = css[i]
        if ch == '\n': line += 1
        elif ch == '{': depth += 1
        elif ch == '}':
            depth -= 1
            if depth < 0: print('FAIL', name, 'stray } near line', line); ok = False; depth = 0
        i += 1
    if depth: print('FAIL', name, 'unclosed {'); ok = False
braces('assets/styles.css', open('assets/styles.css').read())
for f in sorted(glob.glob('*.html')):
    h = open(f).read()
    for k, m in enumerate(re.finditer(r'<style>(.*?)</style>', h, re.S)): braces('%s <style> %d' % (f, k), m.group(1))
    for k, m in enumerate(re.finditer(r'<script>(.*?)</script>', h, re.S)):
        t = tempfile.NamedTemporaryFile('w', suffix='.js', delete=False); t.write(m.group(1)); t.close()
        r = subprocess.run(['node', '--check', t.name], capture_output=True, text=True); os.unlink(t.name)
        if r.returncode: print('FAIL', f, 'script', k, r.stderr.strip().splitlines()[-1]); ok = False
for f in sorted(glob.glob('assets/*.js')):
    r = subprocess.run(['node', '--check', f], capture_output=True, text=True)
    if r.returncode: print('FAIL', f, r.stderr.strip().splitlines()[-1]); ok = False
print('all good' if ok else 'PROBLEMS FOUND'); sys.exit(0 if ok else 1)
