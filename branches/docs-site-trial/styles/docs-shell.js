/* =============================================================================
   docs-shell.js — behaviour for the docs shell in site.css.

   Load it in <head> WITHOUT defer, after the stylesheets: the saved theme and
   text size are applied before first paint (a deferred load flashes the
   defaults first); everything else waits for DOMContentLoaded.

   The page works without it: the nav, outline and links are plain HTML, the
   theme follows the system, and the outline column (>= 72rem) shows every
   entry. The mid-width rail copy and the narrow-width bar need the script.

   Markup it expects (all optional except <html data-ds-shell>):

     <html data-ds-shell>
     <body class="ds-shell">
       <header class="ds-head">
         <a class="ds-logo">…</a> <a class="ds-brand">Site name</a> <span class="ds-ver">…</span>
         <span class="ds-gap"></span>
         <div class="ds-display" data-ds-display></div>          ← Display button + popover
         <button class="ds-iconbtn ds-menu-btn" aria-controls="ds-rail">  ← opens the rail
       </header>
       <div class="ds-sitename">…</div>                          ← phones: name below the bar
       <div class="ds-body has-toc">
         <nav class="ds-rail" id="ds-rail"><div class="ds-rail-head">…<button data-ds-close></div>
           <ul class="ds-menu">…</ul></nav>
         <main class="ds-main" id="main">
           <div class="ds-local" hidden></div>                   ← filled here
           <article class="ds-doc">…</article> …
         </main>
         <aside class="ds-toc"><p class="ds-ol-title">On this page</p>
           <ul class="ds-ol"><li class="l2"><a href="#id">…</a></li><li class="l3">…</li></ul></aside>
       </div>
       <div class="ds-scrim"></div>

   Saved per browser in localStorage: ais-docs-theme (system | light | dark,
   shared with the toolkit's own docs) and ais-docs-text (s | m | l | xl).
   ============================================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var THEMES = ['system', 'light', 'dark'];
  var SIZES = ['s', 'm', 'l', 'xl'];
  var SIZE_NAME = { s: 'Small, 65%', m: 'Medium, 75% (default)', l: 'Large, 85%', xl: 'Extra large, 100% (UIDS 5.x)' };

  // Storage throws outright in some privacy modes; the page must work with none.
  function read(key, allowed, fallback) {
    try { var v = localStorage.getItem(key); return allowed.indexOf(v) >= 0 ? v : fallback; } catch (e) { return fallback; }
  }
  function write(key, v) { try { localStorage.setItem(key, v); } catch (e) { /* not kept; works for this visit */ } }

  // Display is off for now. Nothing saved is read: a saved choice could not be changed back.
  var DISPLAY_ON = false;
  var theme = DISPLAY_ON ? read('ais-docs-theme', THEMES, 'system') : 'system';
  var size = DISPLAY_ON ? read('ais-docs-text', SIZES, 'm') : 'm';
  function applyTheme() { if (theme === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme); }
  function applySize() { if (size === 'm') root.removeAttribute('data-ds-text'); else root.setAttribute('data-ds-text', size); }
  applyTheme(); applySize();

  var ICON = {
    gear: '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M8.6 1.8h2.8l.4 2.3a6.2 6.2 0 011.6.9l2.2-.8 1.4 2.4-1.8 1.5a6.3 6.3 0 010 1.8l1.8 1.5-1.4 2.4-2.2-.8a6.2 6.2 0 01-1.6.9l-.4 2.3H8.6l-.4-2.3a6.2 6.2 0 01-1.6-.9l-2.2.8L3 12.4l1.8-1.5a6.3 6.3 0 010-1.8L3 7.6l1.4-2.4 2.2.8a6.2 6.2 0 011.6-.9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="10" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    system: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><rect x="1.5" y="2.5" width="13" height="8.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5.5 14h5M8 11v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    light: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M3.2 12.8l1.1-1.1M11.7 4.3l1.1-1.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    dark: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13.6 10.2A6 6 0 015.8 2.4a6 6 0 107.8 7.8z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    chevR: '<svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M4.5 2.5L8 6l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevD: '<svg class="ds-otp-chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function on(el, ev, fn) { if (el) el.addEventListener(ev, fn); }
  // Height of the sticky chrome. It changes only with the width, the text size or the
  // fonts, so it is measured then and cached: measuring on every scroll frame forces
  // layout and restyles the whole document.
  var stickyPx = 0;
  function sticky() {
    var h = document.querySelector('.ds-head'), l = document.querySelector('.ds-local');
    var px = (h ? h.offsetHeight : 0) + (l && !l.hidden && getComputedStyle(l).display !== 'none' ? l.offsetHeight : 0);
    if (px !== stickyPx) { stickyPx = px; root.style.setProperty('--ds-sticky', px + 'px'); }
    return px;
  }

  // ---- Display: theme + text size in one popover ---------------------------------
  function display(box) {
    var id = 'ds-display-pop';
    box.innerHTML =
      '<button type="button" class="ds-iconbtn" aria-haspopup="dialog" aria-expanded="false" aria-controls="' + id + '" aria-label="Display settings: theme and text size">' +
        ICON.gear + '<span class="ds-display-lbl" aria-hidden="true">Display</span></button>' +
      '<div class="ds-pop" id="' + id + '" role="dialog" aria-modal="false" aria-labelledby="' + id + '-t" hidden>' +
        '<div class="ds-pop-head"><p class="ds-pop-title" id="' + id + '-t">Display</p><button type="button" class="ds-pop-x" aria-label="Close display settings">' + ICON.close + '</button></div>' +
        '<div><p class="ds-pop-label" id="' + id + '-th">Theme</p><div class="ds-seg ds-seg--3" role="group" aria-labelledby="' + id + '-th">' +
          THEMES.map(function (t) { return '<button type="button" data-theme-pick="' + t + '">' + ICON[t] + '<span>' + t.charAt(0).toUpperCase() + t.slice(1) + '</span></button>'; }).join('') +
        '</div></div>' +
        '<div><p class="ds-pop-label" id="' + id + '-ts">Text size</p><div class="ds-seg ds-seg--4" role="group" aria-labelledby="' + id + '-ts">' +
          SIZES.map(function (s) { return '<button type="button" data-size-pick="' + s + '" aria-label="' + SIZE_NAME[s] + '"><span class="ds-a" aria-hidden="true">A</span><span class="ds-n" aria-hidden="true">' + s.toUpperCase() + '</span></button>'; }).join('') +
        '</div><p class="ds-pop-hint"></p></div>' +
        '<div class="ds-pop-foot"><p>Saved on this browser.</p><button type="button" class="ds-pop-reset">Reset to defaults</button></div>' +
      '</div>';
    var btn = box.firstChild, pop = box.querySelector('.ds-pop');

    function sync() {
      pop.querySelectorAll('[data-theme-pick]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-pick') === theme)); });
      pop.querySelectorAll('[data-size-pick]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-size-pick') === size)); });
      pop.querySelector('.ds-pop-hint').textContent = SIZE_NAME[size];
      pop.querySelector('.ds-pop-reset').disabled = theme === 'system' && size === 'm';
    }
    function open(v) {
      pop.hidden = !v; btn.setAttribute('aria-expanded', String(v));
      if (v) { sync(); pop.querySelector('[aria-pressed="true"]').focus(); } else { btn.focus(); }
    }
    on(btn, 'click', function () { open(pop.hidden); });
    on(pop.querySelector('.ds-pop-x'), 'click', function () { open(false); });
    on(pop, 'click', function (e) {
      var t = e.target.closest('[data-theme-pick], [data-size-pick], .ds-pop-reset');
      if (!t) return;
      if (t.hasAttribute('data-theme-pick')) { theme = t.getAttribute('data-theme-pick'); write('ais-docs-theme', theme); applyTheme(); }
      else if (t.hasAttribute('data-size-pick')) { size = t.getAttribute('data-size-pick'); write('ais-docs-text', size); applySize(); sticky(); outlineFit(); }
      else { theme = 'system'; size = 'm'; write('ais-docs-theme', theme); write('ais-docs-text', size); applyTheme(); applySize(); sticky(); outlineFit(); pop.querySelector('[data-theme-pick="system"]').focus(); }
      sync();
    });
    on(document, 'click', function (e) { if (!pop.hidden && !box.contains(e.target)) { pop.hidden = true; btn.setAttribute('aria-expanded', 'false'); } });
    on(document, 'keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { e.preventDefault(); open(false); } });
  }

  // ---- the rail as a drawer on narrow screens ----------------------------------------
  function drawer() {
    var body = document.body, btn = document.querySelector('.ds-menu-btn'), rail = document.getElementById('ds-rail');
    if (!btn || !rail) return;
    var close = rail.querySelector('[data-ds-close]'), scrim = document.querySelector('.ds-scrim');
    // A link closes the drawer without taking focus back to the button: focus follows the link.
    function set(v, keepFocus) {
      body.classList.toggle('ds-drawer-open', v); btn.setAttribute('aria-expanded', String(v));
      if (keepFocus) return;
      if (v) { (close || rail).focus(); } else { btn.focus(); }
    }
    on(btn, 'click', function () { set(!body.classList.contains('ds-drawer-open')); });
    on(close, 'click', function () { set(false); });
    on(scrim, 'click', function () { set(false); });
    on(document, 'keydown', function (e) { if (e.key === 'Escape' && body.classList.contains('ds-drawer-open')) set(false); });
    on(rail, 'click', function (e) { if (e.target.closest('a') && body.classList.contains('ds-drawer-open')) set(false, true); });
  }

  // ---- outline: current section, automatic h3s, where it is shown ------------------
  // One outline, shown where the width allows (site.css decides by media query):
  //   >= 72rem      the right column (.ds-toc)
  //   50-72rem      inside the rail, under the current page (.ds-ol--rail)
  //   < 50rem       the "On this page" bar and its dropdown (.ds-local)
  // Every copy is kept in step: same current entry, same folded h3s.
  var items = [], toc, local, railOl, fit = true, active = -1;

  function shown(el) { return !!el && getComputedStyle(el).display !== 'none'; }

  // Every h3 is listed while the whole outline fits where it is shown; when it
  // would scroll, only the h3s under the section being read.
  function outlineFit() {
    if (!items.length) return;
    items.forEach(function (it) { it.lis.forEach(function (li) { li.hidden = false; }); });
    var rail = document.getElementById('ds-rail');
    if (shown(toc)) fit = toc.scrollHeight <= toc.clientHeight + 1;
    else if (shown(railOl) && rail) fit = rail.scrollHeight <= rail.clientHeight + 1;
    else {
      var row = parseFloat(getComputedStyle(root).getPropertyValue('--ds-ol-fs')) * 16 * 1.35 + 8;
      fit = items.length * row <= window.innerHeight * 0.6 - 40;
    }
    collapse();
  }
  function collapse() {
    var cur = -1;
    for (var i = active; i >= 0; i--) if (items[i].lvl === 2) { cur = i; break; }
    items.forEach(function (it) {
      var hide = !fit && it.lvl === 3 && it.parent !== cur;
      it.lis.forEach(function (li) { li.hidden = hide; });
    });
  }
  function mark(i) {
    if (i === active) return;
    active = i;
    items.forEach(function (it, j) {
      it.as.forEach(function (a) { if (j === i) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
    });
    if (local && i >= 0) local.querySelector('.ds-otp-cur').textContent = items[i].as[0].textContent;
    if (!fit) collapse();
    // Keep the current entry in view inside a scrolling column or rail.
    [[toc, 0], [document.getElementById('ds-rail'), 2]].forEach(function (pair) {
      var box = pair[0], a = i >= 0 && items[i].byKind[pair[1]];
      if (!shown(box) || !a || !shown(a)) return;
      var r = a.getBoundingClientRect(), t = box.getBoundingClientRect();
      if (r.top < t.top || r.bottom > t.bottom) a.scrollIntoView({ block: 'nearest' });
    });
  }
  function spy() {
    // A heading counts as reached once it is at the scroll-padding line
    // (site.css: sticky chrome + 1rem), where a jump to it lands.
    var y = stickyPx + 20, a = 0;
    for (var i = 0; i < items.length; i++) { if (items[i].target.getBoundingClientRect().top <= y) a = i; else break; }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) a = items.length - 1;
    mark(a);
  }
  // Attach a copy of the outline: each of its entries joins the item with the same target.
  function attach(list, kind) {
    var byHref = {};
    items.forEach(function (it) { byHref[it.href] = it; });
    list.querySelectorAll('li').forEach(function (li) {
      var a = li.querySelector('a'), it = a && byHref[a.getAttribute('href')];
      if (!it) { li.remove(); return; }
      it.lis.push(li); it.as.push(a); it.byKind[kind] = a;
    });
  }
  function outline() {
    toc = document.querySelector('.ds-toc');
    var ol = toc && toc.querySelector('.ds-ol');
    if (!ol) return;
    var last2 = -1;
    ol.querySelectorAll('li').forEach(function (li) {
      var a = li.querySelector('a'), href = a && a.getAttribute('href'), id = href && href.replace(/^#/, '');
      // A stray % is a malformed escape; fall back to the raw id rather than lose the outline.
      try { id = id && decodeURIComponent(id); } catch (e) { /* keep the raw id */ }
      var target = id && document.getElementById(id);
      if (!target) return;
      var lvl = li.classList.contains('l3') ? 3 : 2;
      if (lvl === 2) last2 = items.length;
      var byKind = {}; byKind[0] = a;
      items.push({ href: href, lis: [li], as: [a], byKind: byKind, target: target, lvl: lvl, parent: lvl === 3 ? last2 : -1 });
    });
    if (!items.length) return;

    // The rail copy, under the current page's entry (shown at mid widths only).
    var cur = document.querySelector('.ds-menu a[aria-current="page"]');
    if (cur) {
      railOl = ol.cloneNode(true);
      railOl.classList.add('ds-ol--rail');
      railOl.setAttribute('aria-label', 'On this page');
      cur.parentNode.appendChild(railOl);
      attach(railOl, 2);
    }

    local = document.querySelector('.ds-local');
    if (local) {
      local.innerHTML = '<button type="button" class="ds-otp" aria-expanded="false" aria-controls="ds-otp-pop"><span>On this page</span>' + ICON.chevR +
        '<span class="ds-otp-cur"></span>' + ICON.chevD + '</button><div class="ds-otp-pop" id="ds-otp-pop" hidden></div>';
      local.hidden = false;
      var pop = local.querySelector('.ds-otp-pop'), btn = local.querySelector('.ds-otp');
      var copy = ol.cloneNode(true); pop.appendChild(copy);
      attach(copy, 1);
      function set(v) { pop.hidden = !v; btn.setAttribute('aria-expanded', String(v)); }
      on(btn, 'click', function () { set(pop.hidden); });
      on(pop, 'click', function (e) { if (e.target.closest('a')) set(false); });
      on(document, 'click', function (e) { if (!local.contains(e.target)) set(false); });
      on(document, 'keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { set(false); btn.focus(); } });
    }
    sticky(); outlineFit(); spy();
    var queued = false;
    on(window, 'scroll', function () { if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; spy(); }); } });
    on(window, 'resize', function () { outlineFit(); spy(); });
    // A jump to #id can land after fonts load and move the layout without a
    // scroll event, so check again once everything has loaded.
    on(window, 'load', function () { outlineFit(); spy(); });
    on(window, 'hashchange', function () { requestAnimationFrame(spy); });
  }

  function start() {
    var box = document.querySelector('[data-ds-display]');
    if (box && DISPLAY_ON) display(box);
    // Re-measured on every page, outline or not, whenever it can change. Registered
    // before outline() adds its own resize and load handlers, so they read the new value.
    on(window, 'resize', sticky);
    on(window, 'load', sticky);
    // Fonts that arrive late change line heights, so the outline's fit and the current
    // section are re-read too, not only the header.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { sticky(); if (items.length) { outlineFit(); spy(); } });
    drawer();
    outline();
    sticky();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  // A reader on System follows the OS if it changes mid-visit: CSS handles it,
  // since 'system' leaves no data-theme attribute.
})();
