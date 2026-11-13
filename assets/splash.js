/* TW Ops mockup — animated TW Orthodontics loading screen.
   The loading bar is a smile: eight crooked teeth with braces straighten as the app loads, the braces come off
   with a sparkle, and the logo forms above. Everything stays on one centre line.
   MOCKUP ONLY: here it is a timed playback. In the real build it must show only while the app is actually
   loading, with the teeth driven by real progress (call render() with load progress instead of the clock).
   Plays when the app is opened or refreshed, not when you move between pages inside the app.
   Tap, click or press a key to skip. ?splash replays it; ?splash=hold freezes it for screenshots. */
(function () {
  var d = document, el = d.documentElement, show = true, hold = false;
  try {
    var qs = location.search, nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || {};
    var base = location.origin + location.pathname.replace(/[^/]*$/, '');
    var inside = d.referrer && d.referrer.indexOf(base) === 0;
    hold = /[?&]splash=hold/.test(qs);
    if (/[?&]splash/.test(qs)) show = true;
    else if (sessionStorage.getItem('tw_skip_splash') === '1') show = false;
    else if (nav.type === 'back_forward') show = false;
    else if (nav.type === 'reload') show = true;
    else show = !inside;
    sessionStorage.removeItem('tw_skip_splash');
  } catch (e) { show = true; }
  if (!show) return;
  var st = d.createElement('style'); st.textContent = "html.tw-splashing{background:#eef4f7}html.tw-splashing body{visibility:hidden}.tws{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;background:#eef4f7;overflow:hidden;visibility:visible;transition:opacity .45s ease}.tws.out{opacity:0;pointer-events:none}.tws-blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.75}.tws-blob.a{width:46vmax;height:46vmax;left:-14vmax;top:-16vmax;background:#cfe5ee;animation:tws-drift-a 6s ease-in-out infinite alternate}.tws-blob.b{width:38vmax;height:38vmax;right:-12vmax;bottom:-14vmax;background:#fbe1d6;animation:tws-drift-b 7s ease-in-out infinite alternate}.tws-stage{position:relative;width:min(470px,80vw);transition:transform .45s ease}.tws.out .tws-stage{transform:scale(1.05)}.tws-art{display:block;width:100%;height:auto;overflow:visible}.tws-c{fill:#559cb5}.tws-w{fill:#fff}.tws-l{fill:#636466}.tws-rip{fill:none;stroke:#559cb5;stroke-width:2}.tws-en{fill:#fff;stroke:#c3d6df;stroke-width:1.6}.tws-br{fill:#559cb5}.tws-wire{fill:none;stroke:#ed6a40;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1}.tws-star{fill:#ed6a40}.tws-star.two{fill:#559cb5}@keyframes tws-drift-a{to{transform:translate(6vmax,5vmax) scale(1.1)}}@keyframes tws-drift-b{to{transform:translate(-5vmax,-4vmax) scale(1.08)}}@media (prefers-reduced-motion:reduce){.tws-blob{animation:none}.tws-stage,.tws{transition-duration:.2s}}"; d.head.appendChild(st);
  el.classList.add('tw-splashing');
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var CX = 48.56, CY = 48.56, MID = 171, SHIFT = MID - CX, TOTAL = 3250, SC = 1.18;
  function clamp(p) { return p < 0 ? 0 : p > 1 ? 1 : p; }
  function seg(t, a, b) { return clamp((t - a) / (b - a)); }
  function outBack(p) { var c = 1.70158; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); }
  function softBack(p) { var c = 0.9; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); }
  function inOut(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function outCubic(p) { return 1 - Math.pow(1 - p, 3); }

  // Eight teeth on a gentle smile. "to" is the straight pose; "from" adds the crookedness.
  var N = 8, DX = [-3, 4, -2, 5, -4, 2, -5, 3], DY = [-11, 8, -6, 12, -9, 7, -12, 9], DR = [18, -24, 13, -16, 26, -14, 21, -19], T = [];
  for (var i = 0; i < N; i++) {
    var u = (i - 3.5) / 3.5, x = MID + (i - 3.5) * 38, y = 154 + 10 * (1 - u * u), rot = Math.atan(-20 * u / 133) * 180 / Math.PI;
    T.push({ x: x, y: y, r: rot, x0: x + DX[i], y0: y + DY[i], r0: rot + DR[i], wait: Math.abs(i - 3.5) * 45 });
  }
  function start() {
    var o = d.createElement('div'); o.className = 'tws'; o.setAttribute('role', 'status'); o.setAttribute('aria-label', 'Loading TW Ops');
    o.innerHTML = '<div class="tws-blob a"></div><div class="tws-blob b"></div><div class="tws-stage">' + "<svg class=\"tws-art\" viewBox=\"0 -12 342 214\" role=\"img\" aria-label=\"TW Orthodontics\"><circle class=\"tws-rip\" cx=\"48.56\" cy=\"48.56\" r=\"48.56\"/><circle class=\"tws-rip\" cx=\"48.56\" cy=\"48.56\" r=\"48.56\"/><g class=\"tws-mark\"><circle class=\"tws-c\" cx=\"48.56\" cy=\"48.56\" r=\"48.56\"/><rect class=\"tws-w\" x=\"43.15\" y=\"17.15\" width=\"1.94\" height=\"62.81\"/><path class=\"tws-w\" d=\"M19.65,40.6h-7.07v-4.83h19.59v4.83h-7.07v19.94h-5.46v-19.94Z\"/><path class=\"tws-w\" d=\"M53.38,35.77h5.95l3.95,15.88h.07l5.18-15.88h5.07l5.14,16.3h.07l4.16-16.3h5.53l-7.24,24.77h-4.86l-5.46-17.14h-.07l-5.46,17.14h-4.69l-7.35-24.77Z\"/></g><g class=\"tws-word\"><path class=\"tws-l\" d=\"M117.08,61.15c-1.44,0-2.77-.25-3.98-.76-1.21-.51-2.26-1.19-3.14-2.06-.88-.86-1.57-1.88-2.06-3.05-.49-1.17-.74-2.42-.74-3.76v-.05c0-1.34.25-2.59.75-3.76.5-1.17,1.19-2.19,2.07-3.07.88-.88,1.93-1.58,3.15-2.08,1.22-.51,2.55-.76,4-.76s2.77.25,3.98.76c1.21.51,2.26,1.19,3.14,2.06.88.86,1.57,1.88,2.06,3.05.49,1.17.74,2.42.74,3.76v.05c0,1.34-.25,2.59-.75,3.76-.5,1.17-1.19,2.19-2.07,3.07-.88.88-1.93,1.58-3.15,2.08-1.22.51-2.55.76-4,.76ZM117.13,57.35c.82,0,1.58-.15,2.27-.45.69-.3,1.29-.72,1.78-1.26.49-.53.87-1.15,1.15-1.86.28-.7.41-1.46.41-2.26v-.05c0-.8-.14-1.56-.41-2.27-.28-.71-.67-1.34-1.18-1.87-.51-.53-1.11-.96-1.8-1.27-.69-.31-1.45-.47-2.27-.47s-1.6.15-2.29.45c-.69.3-1.27.72-1.76,1.26-.49.53-.87,1.15-1.15,1.86-.28.7-.41,1.46-.41,2.26v.05c0,.8.14,1.56.41,2.27.28.71.67,1.34,1.18,1.87.51.53,1.1.96,1.79,1.27.69.31,1.45.47,2.28.47Z\"/><path class=\"tws-l\" d=\"M131.37,42.12h8.55c2.37,0,4.19.63,5.45,1.9,1.07,1.07,1.6,2.49,1.6,4.28v.05c0,1.51-.37,2.75-1.11,3.7-.74.95-1.71,1.65-2.9,2.1l4.57,6.68h-4.81l-4.01-5.99h-3.23v5.99h-4.12v-18.71ZM139.66,51.2c1.02,0,1.79-.24,2.34-.72.54-.48.82-1.12.82-1.92v-.05c0-.89-.29-1.56-.86-2-.57-.45-1.36-.67-2.38-.67h-4.09v5.37h4.17Z\"/><path class=\"tws-l\" d=\"M155.72,45.91h-5.69v-3.8h15.5v3.8h-5.69v14.91h-4.12v-14.91Z\"/><path class=\"tws-l\" d=\"M169.35,42.12h4.12v7.4h7.59v-7.4h4.12v18.71h-4.12v-7.51h-7.59v7.51h-4.12v-18.71Z\"/><path class=\"tws-l\" d=\"M199.42,61.15c-1.44,0-2.77-.25-3.98-.76-1.21-.51-2.26-1.19-3.14-2.06-.88-.86-1.57-1.88-2.06-3.05-.49-1.17-.74-2.42-.74-3.76v-.05c0-1.34.25-2.59.75-3.76.5-1.17,1.19-2.19,2.07-3.07.88-.88,1.93-1.58,3.15-2.08,1.22-.51,2.55-.76,4-.76s2.77.25,3.98.76c1.21.51,2.26,1.19,3.14,2.06.88.86,1.57,1.88,2.06,3.05.49,1.17.74,2.42.74,3.76v.05c0,1.34-.25,2.59-.75,3.76-.5,1.17-1.19,2.19-2.07,3.07-.88.88-1.93,1.58-3.15,2.08-1.22.51-2.55.76-4,.76ZM199.47,57.35c.82,0,1.58-.15,2.27-.45.69-.3,1.29-.72,1.78-1.26.49-.53.87-1.15,1.15-1.86.28-.7.41-1.46.41-2.26v-.05c0-.8-.14-1.56-.41-2.27-.28-.71-.67-1.34-1.18-1.87-.51-.53-1.11-.96-1.8-1.27-.69-.31-1.45-.47-2.27-.47s-1.6.15-2.29.45c-.69.3-1.27.72-1.76,1.26-.49.53-.87,1.15-1.15,1.86-.28.7-.41,1.46-.41,2.26v.05c0,.8.14,1.56.41,2.27.28.71.67,1.34,1.18,1.87.51.53,1.1.96,1.79,1.27.69.31,1.45.47,2.28.47Z\"/><path class=\"tws-l\" d=\"M213.72,42.12h7.3c1.46,0,2.8.24,4.02.71,1.22.47,2.27,1.13,3.15,1.96.88.84,1.56,1.82,2.04,2.95.48,1.13.72,2.36.72,3.67v.05c0,1.32-.24,2.55-.72,3.69-.48,1.14-1.16,2.13-2.04,2.97-.88.84-1.93,1.5-3.15,1.98-1.22.48-2.56.72-4.02.72h-7.3v-18.71ZM221.01,57.11c.84,0,1.6-.13,2.3-.4.69-.27,1.29-.65,1.78-1.15.49-.5.87-1.09,1.15-1.76.28-.68.41-1.43.41-2.27v-.05c0-.82-.14-1.58-.41-2.27-.28-.69-.66-1.29-1.15-1.79-.49-.5-1.08-.89-1.78-1.16-.7-.28-1.46-.41-2.3-.41h-3.18v11.28h3.18Z\"/><path class=\"tws-l\" d=\"M244.37,61.15c-1.44,0-2.77-.25-3.98-.76-1.21-.51-2.26-1.19-3.14-2.06-.88-.86-1.57-1.88-2.06-3.05-.49-1.17-.74-2.42-.74-3.76v-.05c0-1.34.25-2.59.75-3.76.5-1.17,1.19-2.19,2.07-3.07.88-.88,1.93-1.58,3.15-2.08,1.22-.51,2.55-.76,4-.76s2.77.25,3.98.76c1.21.51,2.26,1.19,3.14,2.06.88.86,1.57,1.88,2.06,3.05.49,1.17.74,2.42.74,3.76v.05c0,1.34-.25,2.59-.75,3.76-.5,1.17-1.19,2.19-2.07,3.07-.88.88-1.93,1.58-3.15,2.08-1.22.51-2.55.76-4,.76ZM244.42,57.35c.82,0,1.58-.15,2.27-.45.69-.3,1.29-.72,1.78-1.26.49-.53.87-1.15,1.15-1.86.28-.7.41-1.46.41-2.26v-.05c0-.8-.14-1.56-.41-2.27-.28-.71-.67-1.34-1.18-1.87-.51-.53-1.11-.96-1.8-1.27-.69-.31-1.45-.47-2.27-.47s-1.6.15-2.29.45c-.69.3-1.27.72-1.76,1.26-.49.53-.87,1.15-1.15,1.86-.28.7-.41,1.46-.41,2.26v.05c0,.8.14,1.56.41,2.27.28.71.67,1.34,1.18,1.87.51.53,1.1.96,1.79,1.27.69.31,1.45.47,2.28.47Z\"/><path class=\"tws-l\" d=\"M258.67,42.12h3.79l8.77,11.52v-11.52h4.06v18.71h-3.5l-9.06-11.89v11.89h-4.06v-18.71Z\"/><path class=\"tws-l\" d=\"M284.81,45.91h-5.69v-3.8h15.5v3.8h-5.69v14.91h-4.12v-14.91Z\"/><path class=\"tws-l\" d=\"M298.62,42.12h4.12v18.71h-4.12v-18.71Z\"/><path class=\"tws-l\" d=\"M316.85,61.15c-1.37,0-2.65-.25-3.82-.75-1.18-.5-2.19-1.18-3.05-2.04-.86-.86-1.52-1.88-2-3.06-.48-1.18-.72-2.43-.72-3.77v-.05c0-1.34.24-2.59.72-3.76.48-1.17,1.15-2.19,2-3.07.86-.88,1.88-1.58,3.07-2.08,1.19-.51,2.51-.76,3.96-.76.87,0,1.67.07,2.39.21.72.14,1.38.34,1.96.59.59.25,1.13.55,1.63.91.5.36.96.75,1.39,1.18l-2.62,3.02c-.73-.66-1.47-1.18-2.23-1.55-.76-.37-1.61-.56-2.55-.56-.78,0-1.51.15-2.18.45-.67.3-1.24.72-1.72,1.26-.48.53-.86,1.15-1.12,1.86-.27.7-.4,1.46-.4,2.26v.05c0,.8.13,1.56.4,2.27.27.71.64,1.34,1.11,1.87.47.53,1.04.96,1.71,1.27.67.31,1.4.47,2.2.47,1.07,0,1.97-.2,2.71-.59.74-.39,1.47-.93,2.2-1.6l2.62,2.65c-.48.52-.98.98-1.5,1.39-.52.41-1.08.76-1.7,1.06-.61.29-1.29.52-2.02.67-.73.15-1.55.23-2.46.23Z\"/><path class=\"tws-l\" d=\"M335.16,61.09c-1.43,0-2.82-.25-4.2-.73-1.37-.49-2.62-1.24-3.74-2.26l2.43-2.91c.86.69,1.73,1.25,2.63,1.66.9.41,1.88.61,2.95.61.86,0,1.52-.16,1.99-.47.47-.31.71-.74.71-1.3v-.05c0-.27-.05-.5-.15-.71-.1-.2-.29-.4-.56-.57-.28-.18-.66-.36-1.15-.53-.49-.18-1.13-.36-1.92-.56-.95-.23-1.8-.49-2.57-.78-.77-.28-1.42-.64-1.96-1.06-.54-.42-.95-.94-1.25-1.56-.29-.62-.44-1.4-.44-2.33v-.05c0-.86.16-1.63.48-2.31.32-.69.77-1.28,1.34-1.78.58-.5,1.26-.88,2.06-1.15.8-.27,1.68-.4,2.64-.4,1.37,0,2.63.2,3.78.61,1.15.41,2.2,1,3.17,1.76l-2.14,3.1c-.84-.57-1.66-1.02-2.46-1.35-.8-.33-1.6-.49-2.41-.49s-1.4.16-1.8.47c-.4.31-.6.7-.6,1.16v.05c0,.3.06.57.17.79.12.22.33.42.63.6.3.18.72.35,1.25.51.53.16,1.19.35,2,.56.95.25,1.79.53,2.53.84.74.31,1.37.69,1.88,1.12.51.44.89.95,1.15,1.54.26.59.39,1.29.39,2.11v.05c0,.93-.17,1.75-.5,2.47-.34.72-.81,1.33-1.41,1.82-.6.49-1.32.86-2.15,1.12s-1.76.39-2.78.39Z\"/></g><g class=\"tws-smile\"><g class=\"tws-tooth\"><path class=\"tws-en\" d=\"M-13 -10Q-13 -16 -7 -16H7Q13 -16 13 -10V4A13 12 0 0 1 -13 4Z\"/><rect class=\"tws-br\" x=\"-4.5\" y=\"-7\" width=\"9\" height=\"9\" rx=\"2.5\"/></g><g class=\"tws-tooth\"><path class=\"tws-en\" d=\"M-13 -10Q-13 -16 -7 -16H7Q13 -16 13 -10V4A13 12 0 0 1 -13 4Z\"/><rect class=\"tws-br\" x=\"-4.5\" y=\"-7\" width=\"9\" height=\"9\" rx=\"2.5\"/></g><g class=\"tws-tooth\"><path class=\"tws-en\" d=\"M-13 -10Q-13 -16 -7 -16H7Q13 -16 13 -10V4A13 12 0 0 1 -13 4Z\"/><rect class=\"tws-br\" x=\"-4.5\" y=\"-7\" width=\"9\" height=\"9\" rx=\"2.5\"/></g><g class=\"tws-tooth\"><path class=\"tws-en\" d=\"M-13 -10Q-13 -16 -7 -16H7Q13 -16 13 -10V4A13 12 0 0 1 -13 4Z\"/><rect class=\"tws-br\" x=\"-4.5\" y=\"-7\" width=\"9\" height=\"9\" rx=\"2.5\"/></g><g class=\"tws-tooth\"><path class=\"tws-en\" d=\"M-13 -10Q-13 -16 -7 -16H7Q13 -16 13 -10V4A13 12 0 0 1 -13 4Z\"/><rect class=\"tws-br\" x=\"-4.5\" y=\"-7\" width=\"9\" height=\"9\" rx=\"2.5\"/></g><g class=\"tws-tooth\"><path class=\"tws-en\" d=\"M-13 -10Q-13 -16 -7 -16H7Q13 -16 13 -10V4A13 12 0 0 1 -13 4Z\"/><rect class=\"tws-br\" x=\"-4.5\" y=\"-7\" width=\"9\" height=\"9\" rx=\"2.5\"/></g><g class=\"tws-tooth\"><path class=\"tws-en\" d=\"M-13 -10Q-13 -16 -7 -16H7Q13 -16 13 -10V4A13 12 0 0 1 -13 4Z\"/><rect class=\"tws-br\" x=\"-4.5\" y=\"-7\" width=\"9\" height=\"9\" rx=\"2.5\"/></g><g class=\"tws-tooth\"><path class=\"tws-en\" d=\"M-13 -10Q-13 -16 -7 -16H7Q13 -16 13 -10V4A13 12 0 0 1 -13 4Z\"/><rect class=\"tws-br\" x=\"-4.5\" y=\"-7\" width=\"9\" height=\"9\" rx=\"2.5\"/></g><path class=\"tws-wire\" pathLength=\"1\" d=\"M0 0\"/></g><path class=\"tws-star\" d=\"M0 -9Q1.2 -1.2 9 0Q1.2 1.2 0 9Q-1.2 1.2 -9 0Q-1.2 -1.2 0 -9Z\"/><path class=\"tws-star two\" d=\"M0 -9Q1.2 -1.2 9 0Q1.2 1.2 0 9Q-1.2 1.2 -9 0Q-1.2 -1.2 0 -9Z\"/></svg>" + '</div>';
    d.body.appendChild(o); el.classList.remove('tw-splashing');
    var q = function (s) { return o.querySelector(s); }, qa = function (s) { return Array.prototype.slice.call(o.querySelectorAll(s)); };
    var mark = q('.tws-mark'), rips = qa('.tws-rip'), letters = qa('.tws-l'), teeth = qa('.tws-tooth'), brs = qa('.tws-br'), wire = q('.tws-wire'), stars = qa('.tws-star');

    function render(t) {
      // 1. The mark pops in on the centre line, then slides left to make room for the wordmark
      var pop = outBack(seg(t, 0, 480)), slide = inOut(seg(t, 1950, 2450)), tx = SHIFT * (1 - slide);
      mark.setAttribute('transform', 'translate(' + (tx + CX) + ' ' + CY + ') scale(' + Math.max(pop, 0.0001) + ') translate(' + (-CX) + ' ' + (-CY) + ')');
      rips.forEach(function (c, k) {
        var p = seg(t, 180 + k * 300, 1150 + k * 300);
        c.setAttribute('transform', 'translate(' + (tx + CX) + ' ' + CY + ') scale(' + (1 + 0.85 * outCubic(p)) + ') translate(' + (-CX) + ' ' + (-CY) + ')');
        c.style.opacity = p <= 0 || p >= 1 ? 0 : 0.5 * (1 - p);
      });
      // 2. The wordmark rises in, letter by letter
      letters.forEach(function (l, k) {
        var p = outCubic(seg(t, 2390 + k * 36, 2720 + k * 36));   // only once the mark has slid clear
        l.style.opacity = p; l.setAttribute('transform', 'translate(0 ' + (9 * (1 - p)) + ')');
      });
      // 3. Teeth pop in crooked, then straighten; brackets ride on the teeth
      var off = seg(t, 2150, 2520), pts = [];
      teeth.forEach(function (g, k) {
        var m = T[k], s = outBack(seg(t, 280 + k * 60, 520 + k * 60)), a = softBack(seg(t, 1000 + m.wait, 1850 + m.wait));
        var x = m.x0 + (m.x - m.x0) * a, y = m.y0 + (m.y - m.y0) * a, r = m.r0 + (m.r - m.r0) * a;
        g.setAttribute('transform', 'translate(' + x + ' ' + y + ') rotate(' + r + ') scale(' + Math.max(s * SC, 0.0001) + ')');
        var b = brs[k], bs = 1 - off; b.style.opacity = bs;
        b.setAttribute('transform', 'translate(0 -2.5) scale(' + Math.max(bs, 0.0001) + ') translate(0 2.5)');
        var rad = r * Math.PI / 180; pts.push([x + 2.5 * SC * Math.sin(rad), y - 2.5 * SC * Math.cos(rad)]);
      });
      // 4. The wire runs through the brackets and straightens with them
      var dd = 'M' + pts[0][0].toFixed(2) + ' ' + pts[0][1].toFixed(2);
      for (var k = 0; k < pts.length - 1; k++) {
        var p0 = pts[k ? k - 1 : 0], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2 < pts.length ? k + 2 : k + 1];
        dd += 'C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(2) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(2) + ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(2) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(2) + ' ' + p2[0].toFixed(2) + ' ' + p2[1].toFixed(2);
      }
      wire.setAttribute('d', dd);
      wire.style.strokeDashoffset = 1 - inOut(seg(t, 620, 1020));
      wire.style.opacity = t < 620 ? 0 : 1 - off;
      // 5. Braces off: a sparkle on the finished smile
      stars.forEach(function (sp, k) {
        var p = seg(t, 2120 + k * 170, 2620 + k * 170), m = T[k ? 2 : 6], s = Math.sin(Math.PI * p) * (k ? 0.8 : 1.25);
        sp.style.opacity = p <= 0 || p >= 1 ? 0 : 1;
        sp.setAttribute('transform', 'translate(' + (m.x + (k ? -11 : 12)) + ' ' + (m.y - 19) + ') rotate(' + (60 * p) + ') scale(' + Math.max(s, 0.0001) + ')');
      });
    }
    var done = false, t0 = null;
    function end() { if (done) return; done = true; o.classList.add('out'); setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 480); d.removeEventListener('keydown', end); }
    o.addEventListener('click', end); d.addEventListener('keydown', end);
    if (reduce) { render(TOTAL); if (!hold) setTimeout(end, 800); return; }
    render(0);
    if (hold) { window.__tws = { render: render, total: TOTAL }; return; }   // held still for screenshots; step it by hand
    (function tick(now) { if (done) return; if (t0 === null) t0 = now; var t = now - t0; render(t > TOTAL ? TOTAL : t); if (t < TOTAL) requestAnimationFrame(tick); })(performance.now());
    setTimeout(end, TOTAL + 150);
  }
  function safe() { try { start(); } catch (e) { el.classList.remove('tw-splashing'); } }
  if (d.body) safe(); else d.addEventListener('DOMContentLoaded', safe);
})();
