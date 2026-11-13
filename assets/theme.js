/* TW Ops mockup — per-person colour scheme (same idea as Home-Brace).
   A scheme is two colours: p (banner, buttons) and a (badges, focus). Every other shade is derived here,
   and contrast floors are enforced so no scheme can make text unreadable. Applied at parse: no flash.
   In the real build the choice is saved on the person's own row and follows them to any computer. */
(function () {
  var THEMES = [
    { id: 'tw',         name: 'TW Blue',       p: '#2d5f77', a: '#ed6a40' },
    { id: 'blush',      name: 'Blush',         p: '#b85c7f', a: '#f0a35e' },
    { id: 'peony',      name: 'Peony',         p: '#c2417a', a: '#5fb8a6' },
    { id: 'lavender',   name: 'Lavender',      p: '#7a68b8', a: '#f08a9b' },
    { id: 'plum',       name: 'Plum',          p: '#6d3b6f', a: '#e3a23c' },
    { id: 'coral',      name: 'Coral',         p: '#c8553d', a: '#2f8f9d' },
    { id: 'sage',       name: 'Sage',          p: '#5f7f67', a: '#e08a4f' },
    { id: 'harbor',     name: 'Harbor',        p: '#24557f', a: '#f0b23c' },
    { id: 'evergreen',  name: 'Evergreen',     p: '#1f6650', a: '#ef8a4a' },
    { id: 'terracotta', name: 'Terracotta',    p: '#a8552f', a: '#3d7a96' },
    { id: 'graphite',   name: 'Graphite',      p: '#3a4248', a: '#ed6a40' },
    { id: 'contrast',   name: 'High contrast', p: '#000000', a: '#ffbf00', bg: '#ffffff' }
  ];
  var INK = '#1f2a30';
  function rgb(h) { h = h.replace('#', ''); return [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }); }
  function hex(c) { return '#' + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
  function lum(h) { var c = rgb(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
  function cr(a, b) { var x = lum(a), y = lum(b); if (x < y) { var t = x; x = y; y = t; } return (x + 0.05) / (y + 0.05); }
  function mix(a, b, t) { var x = rgb(a), y = rgb(b); return hex([0, 1, 2].map(function (i) { return x[i] * (1 - t) + y[i] * t; })); }
  function floor(c, against, min) { var i = 0; while (cr(c, against) < min && i < 60) { c = mix(c, '#000000', 0.05); i++; } return c; }
  function tokens(t) {
    var bg = t.bg || mix('#f2f5f6', t.p, 0.06);
    var soft = mix(t.p, '#ffffff', 0.86);
    var brand = floor(floor(floor(t.p, '#ffffff', 5.5), bg, 4.6), soft, 4.6);   // white text on it, and readable as text on tints
    var mid = floor(mix(brand, '#ffffff', 0.16), '#ffffff', 4.6);                // lighter end of the banner, still fine under white text
    var bright = floor(mix(t.p, '#ffffff', 0.22), '#ffffff', 3);                 // rings and bars: 3:1 as graphics
    var acc = t.a, on = INK;
    if (cr(acc, INK) < 4.5) { acc = floor(acc, '#ffffff', 4.5); on = '#ffffff'; }
    return { '--bg': bg, '--brand': brand, '--brand-ink': mix(brand, '#000000', 0.18), '--brand-deep': mix(brand, '#000000', 0.26), '--brand-mid': mid,
      '--brand-bright': bright, '--brand-soft': soft, '--brand-text': brand, '--teal': mid, '--teal-soft': soft, '--acc': brand, '--acc-soft': soft,
      '--orange': acc, '--on-accent': on, '--btn-line': mix(t.p, '#ffffff', 0.7) };
  }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function who() { return ls('tw_role') || 'ops'; }
  function byId(id) { for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i]; return THEMES[0]; }
  function current() { return byId(ls('tw_theme_' + who()) || 'tw').id; }
  function apply(id) {
    var t = byId(id), el = document.documentElement, all = tokens(THEMES[1]), k;
    for (k in all) el.style.removeProperty(k);
    if (t.id !== 'tw') { var tk = tokens(t); for (k in tk) el.style.setProperty(k, tk[k]); }
    el.setAttribute('data-scheme', t.id);
  }
  apply(current());
  window.TWTheme = { THEMES: THEMES, tokens: tokens, contrast: cr, current: current, apply: apply,
    set: function (id) { ls('tw_theme_' + who(), byId(id).id); apply(id); } };
})();
