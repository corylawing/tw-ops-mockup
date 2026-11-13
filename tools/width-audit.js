/* Paste into the browser console on any page of the mockup (served locally or live).
   Loads every page for every role at nine widths and lists anything that spills out of the page or its card.
   Read the answer with:  window.RES     (done: true, problems: [] means clean) */
(function () {
  var stamp = Date.now(); window.RES = { done: false, checked: 0, problems: [] };
  function one(p, wd, role) {
    return new Promise(function (resolve) {
      var f = document.createElement('iframe'); f.style.cssText = 'position:fixed;left:-9999px;top:0;width:' + wd + 'px;height:900px;border:0';
      f.src = p + '.html?aud=' + wd + '-' + role + '-' + stamp; document.body.appendChild(f);
      f.onload = function () { setTimeout(function () {
        var d = f.contentDocument, w = f.contentWindow, wrap = d.querySelector('.wrap'), cs = w.getComputedStyle(wrap);
        var right = wrap.getBoundingClientRect().right - parseFloat(cs.paddingRight), bad = {};
        Array.prototype.forEach.call(d.querySelectorAll('.wrap *'), function (e) {
          var r = e.getBoundingClientRect(); if (!r.width || !r.height) return;
          for (var a = e.parentElement; a && a !== wrap; a = a.parentElement) { var o = w.getComputedStyle(a).overflowX; if (o === 'auto' || o === 'hidden' || o === 'scroll') return; }
          if (r.right > right + 2) bad[(String(e.className).split(' ')[0] || e.tagName) + '+' + Math.round(r.right - right)] = 1;
        });
        var inner = Array.prototype.filter.call(d.querySelectorAll('.wrap .scroll, .wrap .mgrid'), function (e) { return e.scrollWidth > e.clientWidth + 2; }).length;
        var pageX = d.documentElement.scrollWidth - w.innerWidth, keys = Object.keys(bad);
        window.RES.checked++;
        if (keys.length || inner || pageX > 0) window.RES.problems.push(wd + ' ' + p + ' as ' + role + ': ' + keys.slice(0, 4).join(', ') + (inner ? ' inner-scroll' : '') + (pageX > 0 ? ' pageX+' + pageX : ''));
        f.remove(); resolve();
      }, 500); };
    });
  }
  var G = { ops: ['index','huddle','people','compliance','scorecard','operations','calendar','brief','how-it-works','profile'], owners: ['owners','brief','index','scorecard'],
    lead: ['index','people','compliance','huddle','brief','operations','scorecard','calendar'], team: ['index','people','compliance','huddle','operations','calendar','profile'], inv: ['brief','operations','index','compliance'] };
  var before = localStorage.getItem('tw_role'), chain = Promise.resolve();
  Object.keys(G).forEach(function (role) { [320,375,414,768,920,1000,1100,1280,1440].forEach(function (wd) {
    chain = chain.then(function () { localStorage.setItem('tw_role', role); return Promise.all(G[role].map(function (p) { return one(p, wd, role); })); });
  }); });
  chain.then(function () { if (before) localStorage.setItem('tw_role', before); window.RES.done = true; console.log(window.RES); });
})();
