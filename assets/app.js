/* TW Ops mockup — shared chrome. No framework, no build step, no server.
   Every page sets window.PAGE = { id, hood: [ {what, how, svc:[...]} ] } before this script runs. */
(function () {
  var PLANS_URL = 'https://claude.ai/artifact/VLj8XUKVRok4G7auMnYBA9';
  var ROLES = {
    owners: { name: 'Dr. Wood (Owner)', email: 'bwood@twortho.com', home: 'owners.html' },
    ops:    { name: 'Savannah (Director of Ops)', email: 'savannah@twortho.com', home: 'index.html' },
    lead:   { name: '[Office lead] · Selma', email: 'selma.lead@twortho.com', home: 'huddle.html' },
    inv:    { name: '[Inventory coordinator]', email: 'inventory@twortho.com', home: 'operations.html' },
    team:   { name: '[Team member] · Selma', email: 'team@twortho.com', home: 'huddle.html' }
  };
  // What each role can open. 'full' = everything, 'own' = own office only, 'view' = read-only, 'self' = own items, false = hidden.
  var NAV = [
    { id: 'command',    href: 'index.html',        label: 'Command Center',    access: { owners: 'view', ops: 'full', lead: 'own', inv: 'view', team: 'view' } },
    { id: 'huddle',     href: 'huddle.html',       label: 'Office day',        access: { owners: 'view', ops: 'full', lead: 'own', inv: 'self', team: 'self' } },
    { id: 'people',     href: 'people.html',       label: 'People',            access: { owners: 'full', ops: 'full', lead: 'own', inv: 'self', team: 'self' } },
    { id: 'compliance', href: 'compliance.html',   label: 'Compliance',        access: { owners: 'full', ops: 'full', lead: 'own', inv: false, team: 'self' } },
    { id: 'scorecard',  href: 'scorecard.html',    label: 'Scorecard',         access: { owners: 'full', ops: 'full', lead: 'own', inv: false, team: false } },
    { id: 'operations', href: 'operations.html',   label: 'Operations',        access: { owners: 'view', ops: 'view', lead: 'own', inv: 'full', team: false } },
    { id: 'owners',     href: 'owners.html',       label: "Owner's Desk",      access: { owners: 'full', ops: false, lead: false, inv: false, team: false } },
    { id: 'calendar',   href: 'calendar.html',     label: 'Practice Calendar', access: { owners: 'full', ops: 'full', lead: 'own', inv: 'self', team: 'self' } },
    { id: 'brief',      href: 'brief.html',        label: '6:30 AM brief',     access: { owners: 'full', ops: 'full', lead: 'own', inv: 'self', team: false } },
    { id: 'how',        href: 'how-it-works.html', label: 'How it works ⚙', access: { owners: 'full', ops: 'full', lead: 'full', inv: 'full', team: 'full' } }
  ];
  var SVC = {
    auth:  'Front door · Google sign-in + roles',
    db:    'Database · Postgres, role rules',
    vault: 'File vault · Drive + private storage',
    job:   'Night shift · scheduled jobs',
    mail:  'Mailroom · Gmail + Slack',
    ai:    'AI desk · Claude API, server-side',
    ext:   'Outside system, linked'
  };

  function getRole() { try { return localStorage.getItem('tw_role') || 'ops'; } catch (e) { return 'ops'; } }
  function setRole(r) { try { localStorage.setItem('tw_role', r); } catch (e) {} location.reload(); }
  var role = getRole();
  var page = window.PAGE || { id: '', hood: [] };
  var me = ROLES[role];

  // 1. Mockup banner
  var banner = document.createElement('div');
  banner.className = 'mock';
  banner.innerHTML = '<div class="in"><b>MOCKUP</b><span>Sample data only, nothing here is real.</span>' +
    '<span>The look and feel is a placeholder and is <strong>fully adjustable</strong>. What we are deciding is the foundation underneath.</span>' +
    '<a href="how-it-works.html">How the infrastructure works →</a>' +
    '<a href="' + PLANS_URL + '" target="_blank" rel="noopener">Plan A / Plan B (Cory recommends B) →</a></div>';
  document.body.insertBefore(banner, document.body.firstChild);

  // 2. Header with hubs + "View as"
  var head = document.createElement('header');
  head.className = 'top';
  var navHtml = NAV.map(function (n) {
    var a = n.access[role];
    var cls = (n.id === page.id ? 'on' : '') + (a ? '' : ' locked');
    var title = a ? (a === 'own' ? 'Own office only' : a === 'view' ? 'View only' : a === 'self' ? 'Own items only' : 'Full access') : 'Hidden for this role';
    return '<a class="' + cls + '" href="' + n.href + '" title="' + title + '">' + n.label + '</a>';
  }).join('');
  var opts = Object.keys(ROLES).map(function (k) { return '<option value="' + k + '"' + (k === role ? ' selected' : '') + '>' + ROLES[k].name + '</option>'; }).join('');
  head.innerHTML = '<div class="in"><a class="brand" href="index.html">TW Ops<small>TW Orthodontics</small></a>' +
    '<nav class="hubs" aria-label="Hubs">' + navHtml + '</nav>' +
    '<div class="who"><span class="g" title="In the real build this is a Google Workspace sign-in. Only @twortho.com accounts can get in.">G · ' + me.email + '</span>' +
    '<label>View as <select id="roleSel">' + opts + '</select></label></div></div>';
  document.body.insertBefore(head, banner.nextSibling);
  document.getElementById('roleSel').addEventListener('change', function (e) { setRole(e.target.value); });

  // Pages the role may not open show a locked notice instead of content.
  var navItem = NAV.filter(function (n) { return n.id === page.id; })[0];
  if (navItem && !navItem.access[role]) {
    var wrap = document.querySelector('.wrap');
    if (wrap) {
      wrap.innerHTML = '<div class="locked-page"><h2>Hidden for this role</h2><p>' + me.name + ' cannot open ' + navItem.label + '. In the real build this is enforced by the database, not by hiding a menu item: a request from this account returns no rows.</p><p><a class="btn" href="' + me.home + '">Go to my home screen</a></p></div>';
    }
  }

  // 3. Under-the-hood drawer
  var hood = page.hood || [];
  var fab = document.createElement('button');
  fab.className = 'uthbtn';
  fab.innerHTML = 'Under the hood <span class="n">' + hood.length + '</span>';
  var back = document.createElement('div'); back.className = 'backdrop';
  var dr = document.createElement('aside'); dr.className = 'drawer'; dr.setAttribute('aria-label', 'How this screen works underneath');
  dr.innerHTML = '<header><h2>Under the hood · ' + (page.title || '') + '</h2><button class="x" id="uthClose">Close</button></header>' +
    '<div class="note">This screen is a mockup. Each numbered circle on the page points to one line below: which part of the foundation does the work, and what happens in the real build. See <a href="how-it-works.html">How it works</a> for the full picture.</div>' +
    hood.map(function (h, i) {
      return '<div class="hood" id="hood' + i + '"><div class="what"><span class="num">' + (i + 1) + '</span>' + h.what + '</div><div class="how">' + h.how + '</div>' +
        '<div class="svc">' + (h.svc || []).map(function (s) { return '<span class="' + s + '">' + SVC[s] + '</span>'; }).join('') + '</div></div>';
    }).join('');
  document.body.appendChild(back); document.body.appendChild(dr); document.body.appendChild(fab);
  function open(i) {
    dr.classList.add('open'); back.classList.add('open');
    Array.prototype.forEach.call(dr.querySelectorAll('.hood'), function (el) { el.classList.remove('hl'); });
    if (typeof i === 'number') { var el = document.getElementById('hood' + i); if (el) { el.classList.add('hl'); el.scrollIntoView({ block: 'center' }); } }
  }
  function close() { dr.classList.remove('open'); back.classList.remove('open'); }
  fab.addEventListener('click', function () { open(); });
  back.addEventListener('click', close);
  document.getElementById('uthClose').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  // numbered markers placed in the page: <button class="uth" data-h="0">1</button>
  Array.prototype.forEach.call(document.querySelectorAll('.uth'), function (b) {
    var i = parseInt(b.getAttribute('data-h'), 10);
    b.textContent = isNaN(i) ? 'i' : String(i + 1);
    b.title = 'How this works underneath';
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); open(i); });
  });

  // 4. Footer
  var ft = document.createElement('footer'); ft.className = 'ft';
  ft.innerHTML = 'TW Ops mockup · built October 2026 by Cory Lawing from the TW Ops Hub map · sample data · ' +
    '<a href="how-it-works.html">How it works</a> · <a href="' + PLANS_URL + '" target="_blank" rel="noopener">Foundation plans</a>';
  document.body.appendChild(ft);

  // Checkbox demo: ticking shows who signed and when (what the real build writes to the database).
  Array.prototype.forEach.call(document.querySelectorAll('.chk input[type=checkbox]'), function (c) {
    c.addEventListener('change', function () {
      var by = c.closest('li').querySelector('.by');
      if (by) by.textContent = c.checked ? 'Signed · ' + me.name.split(' (')[0] + ' · ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not done';
    });
  });
  window.TW = { role: role, me: me, open: open };
})();
