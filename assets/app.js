/* TW Ops mockup — shared chrome. No framework, no build step, no server.
   Every page sets window.PAGE = { id, title, hood: [ {what, how, svc:[...]} ] } before this script runs. */
(function () {
  var PLANS_URL = 'https://claude.ai/artifact/VLj8XUKVRok4G7auMnYBA9';
  var ROLES = {
    owners: { name: 'Dr. Wood', role: 'Owner', email: 'bwood@twortho.com', office: 'All offices', home: 'owners.html', ini: 'BW' },
    ops:    { name: 'Savannah', role: 'Director of Operations', email: 'savannah@twortho.com', office: 'All offices', home: 'index.html', ini: 'SV' },
    lead:   { name: 'Kara Whitfield', role: 'Office lead · Selma', email: 'kara@twortho.com', office: 'Selma', home: 'huddle.html', ini: 'KW' },
    inv:    { name: 'Tasha Greer', role: 'Inventory coordinator', email: 'tasha@twortho.com', office: 'All offices', home: 'operations.html', ini: 'TG' },
    team:   { name: 'Jordan Lee', role: 'Clinical assistant · Selma', email: 'jordan@twortho.com', office: 'Selma', home: 'huddle.html', ini: 'JL' }
  };
  var I = {
    command: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    huddle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.5a5 5 0 0 1 6 4.5"/></svg>',
    compliance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 7.6-8 9-4.6-1.4-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    scorecard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    operations: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-3 3-2.7-2.3a4 4 0 0 1-5-5L8 6.3 10.3 4z"/><path d="M3 21l6-6"/></svg>',
    owners: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    brief: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    how: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/></svg>'
  };
  var NAV = [
    { id: 'command',    href: 'index.html',        label: 'Command Center',    cnt: 6,  access: { owners: 'view', ops: 'full', lead: 'own', inv: 'view', team: 'view' } },
    { id: 'huddle',     href: 'huddle.html',       label: 'Office day',               access: { owners: 'view', ops: 'full', lead: 'own', inv: 'self', team: 'self' } },
    { id: 'people',     href: 'people.html',       label: 'People',            cnt: 2,  access: { owners: 'full', ops: 'full', lead: 'own', inv: 'self', team: 'self' } },
    { id: 'compliance', href: 'compliance.html',   label: 'Compliance',               access: { owners: 'full', ops: 'full', lead: 'own', inv: false, team: 'self' } },
    { id: 'scorecard',  href: 'scorecard.html',    label: 'Scorecard',                access: { owners: 'full', ops: 'full', lead: 'own', inv: false, team: false } },
    { id: 'operations', href: 'operations.html',   label: 'Operations',               access: { owners: 'view', ops: 'view', lead: 'own', inv: 'full', team: false } },
    { id: 'owners',     href: 'owners.html',       label: "Owner's Desk",             access: { owners: 'full', ops: false, lead: false, inv: false, team: false } },
    { id: 'calendar',   href: 'calendar.html',     label: 'Practice Calendar',        access: { owners: 'full', ops: 'full', lead: 'own', inv: 'self', team: 'self' } },
    { id: 'brief',      href: 'brief.html',        label: 'Morning brief',            access: { owners: 'full', ops: 'full', lead: 'own', inv: 'self', team: false } }
  ];
  var SVC = { auth: 'Front door · Google sign-in + roles', db: 'Database · Postgres, role rules', vault: 'File vault · Drive + private storage', job: 'Night shift · scheduled jobs', mail: 'Mailroom · Gmail + Slack', ai: 'AI desk · Claude API, server-side', ext: 'Outside system, linked' };

  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  var role = ls('tw_role') || 'ops';
  var page = window.PAGE || { id: '', hood: [] };
  var me = ROLES[role];
  var hood = page.hood || [];
  if (ls('tw_explain') === '1') document.body.classList.add('explain');

  // 1. Shell: sidebar + main. No top bar: the product chrome stays clean.
  var navHtml = NAV.map(function (n) {
    var a = n.access[role];
    var cls = (n.id === page.id ? 'on' : '') + (a ? '' : ' locked');
    var title = a ? (a === 'own' ? 'Own office only' : a === 'view' ? 'View only' : a === 'self' ? 'Own items only' : 'Full access') : 'Not available for this role';
    var pre = n.id === 'calendar' ? '<div class="sec">Shared</div>' : '';
    return pre + '<a class="' + cls + '" href="' + n.href + '" title="' + title + '"' + (n.id === page.id ? ' aria-current="page"' : '') + (a ? '' : ' aria-disabled="true" tabindex="-1"') + '>' + I[n.id] + '<span>' + n.label + '</span>' + (n.cnt && a ? '<span class="cnt">' + n.cnt + '</span>' : '') + '</a>';
  }).join('');
  var side = document.createElement('aside'); side.className = 'side';
  side.innerHTML = '<a class="logo" href="index.html" aria-label="TW Ops home"><img src="assets/tw-logo.svg" alt="TW Orthodontics"></a>' +
    '<nav class="hubs" aria-label="Hubs">' + navHtml + '</nav>' +
    '<div class="sidefoot"><a href="how-it-works.html">' + I.how + 'How it works</a><a href="' + PLANS_URL + '" target="_blank" rel="noopener">' + I.owners + 'Foundation plans</a></div>' +
    '<a class="who' + (page.id === 'profile' ? ' on' : '') + '" href="profile.html" title="My profile and colors"><span class="avatar" aria-hidden="true">' + me.ini + '</span><span><b>' + me.name + '</b>My profile</span><span class="go" aria-hidden="true">›</span></a>';
  var shell = document.createElement('div'); shell.className = 'shell';
  var main = document.createElement('main');
  var wrapEl = document.querySelector('.wrap');
  shell.appendChild(side); shell.appendChild(main);
  document.body.insertBefore(shell, document.body.firstChild);
  if (wrapEl) main.appendChild(wrapEl);

  // 2. Demo controls live in one floating bar, outside the product chrome
  var opts = Object.keys(ROLES).map(function (k) { return '<option value="' + k + '"' + (k === role ? ' selected' : '') + '>' + ROLES[k].name + ' · ' + ROLES[k].role + '</option>'; }).join('');
  var demo = document.createElement('div'); demo.className = 'demobar'; demo.setAttribute('role', 'region'); demo.setAttribute('aria-label', 'Mockup controls');
  demo.innerHTML = '<span class="mock" title="Sample data. Invented names and numbers. Layout and wording are adjustable."><i></i>Mockup<span class="x"> · sample data</span></span>' +
    '<label><span class="x">View as</span><select id="roleSel" aria-label="View as">' + opts + '</select></label>' +
    '<button class="explain-btn" id="explainBtn" type="button" title="Show how each part works in the real build"><span class="sw"></span><span class="t">Explain<span class="x"> the build</span></span></button>';
  document.body.appendChild(demo);
  document.getElementById('roleSel').addEventListener('change', function (e) { ls('tw_role', e.target.value); location.reload(); });

  var navItem = NAV.filter(function (n) { return n.id === page.id; })[0];
  if (navItem && !navItem.access[role] && wrapEl) {
    wrapEl.innerHTML = '<div class="locked-page"><h2>Not available for your role</h2><p>' + me.name + ' (' + me.role + ') cannot open ' + navItem.label + '. In the real build the database returns no rows for this account; hiding the menu item is only a courtesy.</p><p><a class="btn" href="' + me.home + '">Go to my home screen</a></p></div>';
  }

  // 3. Explain mode: drawer with the under-the-hood notes
  var back = document.createElement('div'); back.className = 'backdrop';
  var dr = document.createElement('aside'); dr.className = 'drawer'; dr.setAttribute('aria-label', 'How this screen works underneath');
  dr.innerHTML = '<header><h2>How this works · ' + (page.title || '') + '</h2><button class="x" id="uthClose" type="button">Close</button></header>' +
    '<div class="note">Each numbered marker on the screen matches a line below: what the foundation does there in the real build. Full picture on <a href="how-it-works.html">How it works</a>.</div>' +
    hood.map(function (h, i) {
      return '<div class="hood" id="hood' + i + '"><div class="what"><span class="num">' + (i + 1) + '</span>' + h.what + '</div><div class="how">' + h.how + '</div>' +
        '<div class="svc">' + (h.svc || []).map(function (s) { return '<span class="' + s + '">' + SVC[s] + '</span>'; }).join('') + '</div></div>';
    }).join('');
  document.body.appendChild(back); document.body.appendChild(dr);
  function open(i) {
    dr.classList.add('open'); back.classList.add('open');
    Array.prototype.forEach.call(dr.querySelectorAll('.hood'), function (el) { el.classList.remove('hl'); });
    if (typeof i === 'number') { var el = document.getElementById('hood' + i); if (el) { el.classList.add('hl'); el.scrollIntoView({ block: 'center' }); } }
  }
  function close() { dr.classList.remove('open'); back.classList.remove('open'); }
  back.addEventListener('click', close);
  document.getElementById('uthClose').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.getElementById('explainBtn').addEventListener('click', function () {
    var on = document.body.classList.toggle('explain'); ls('tw_explain', on ? '1' : '0');
    if (on) { open(); } else { close(); }
  });
  Array.prototype.forEach.call(document.querySelectorAll('.uth'), function (b) {
    var i = parseInt(b.getAttribute('data-h'), 10);
    b.textContent = isNaN(i) ? '?' : String(i + 1); b.type = 'button';
    b.title = 'How this works in the real build'; b.setAttribute('aria-label', 'How this works in the real build, note ' + (i + 1));
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); open(i); });
  });

  // 4. Inert controls explain themselves
  var toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); var tt;
  function say(msg) { toast.textContent = msg; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('show'); }, 2600); }
  Array.prototype.forEach.call(document.querySelectorAll('a[href="#"]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var label = (a.getAttribute('title') || a.textContent).replace(/\s*\d+\s*$/, '').replace('▾', '').replace(/…/g, '').trim();
      say('Mockup: “' + label + '” works in the real build, not here.');
    });
  });

  // 5. Footer
  var ft = document.createElement('footer'); ft.className = 'ft';
  ft.innerHTML = 'TW Ops mockup · sample data, invented names · TW Orthodontics colours and logo from twortho.com · layout and wording still adjustable · <a href="how-it-works.html">How it works</a> · <a href="' + PLANS_URL + '" target="_blank" rel="noopener">Foundation plans</a>';
  main.appendChild(ft);

  // 6. Checklist demo: ticking records who signed and when
  Array.prototype.forEach.call(document.querySelectorAll('.chk input[type=checkbox]'), function (c) {
    c.addEventListener('change', function () {
      var by = c.closest('li').querySelector('.by');
      if (by) by.textContent = c.checked ? 'Signed · ' + me.name + ' · ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not done';
    });
  });
  window.TW = { role: role, me: me, open: open, say: say };
})();
