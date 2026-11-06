/* =============================================================================
   docs-shell.js — behaviour for the docs shell in site.css.

   Load it in <head> WITHOUT defer, after the stylesheets: the saved theme and
   hierarchy are applied before first paint (a deferred load flashes the
   defaults first); everything else waits for DOMContentLoaded.

   The page works without it: the nav and links are plain HTML and the theme
   follows the system. Only the "On this page" minimap (>= 90rem) needs it.

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
           <article class="ds-doc">…</article> …
         </main>
         <nav class="ds-toc" aria-labelledby="ds-ol-title"><p class="ds-ol-title" id="ds-ol-title">On this page</p>
           <ul class="ds-ol"><li class="l2"><a href="#id">…</a></li><li class="l3">…</li></ul></nav>
       </div>
       <div class="ds-scrim"></div>

   Saved per browser in localStorage: ais-docs-theme (system | light | dark,
   shared with the toolkit's own docs), ais-docs-hierarchy (s | m | l) and
   ais-docs-bg (white | gray) and ais-docs-toc (on | off).
   ============================================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var THEMES = ['system', 'light', 'dark'];
  // The type hierarchies of Tokens (roles) > Style Library, named by their body size.
  var SIZES = ['s', 'm', 'l'];
  var SIZE_NAME = { s: 'Small, body 16px', m: 'Medium, body 19px (default)', l: 'Large, body 24px' };
  var BGS = ['white', 'gray'];
  var BG_HEX = { white: '#FFFFFF', gray: '#F3F3F3' };
  var TOCS = ['on', 'off'];

  // Storage throws outright in some privacy modes; the page must work with none.
  function read(key, allowed, fallback) {
    try { var v = localStorage.getItem(key); return allowed.indexOf(v) >= 0 ? v : fallback; } catch (e) { return fallback; }
  }
  function write(key, v) { try { localStorage.setItem(key, v); } catch (e) { /* not kept; works for this visit */ } }

  var theme = read('ais-docs-theme', THEMES, 'system');
  var size = read('ais-docs-hierarchy', SIZES, 'm');
  var bg = read('ais-docs-bg', BGS, 'white');
  var outlinePref = read('ais-docs-toc', TOCS, 'on');
  function applyTheme() { if (theme === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme); }
  function applySize() { if (size === 'm') root.removeAttribute('data-ds-hierarchy'); else root.setAttribute('data-ds-hierarchy', size); }
  function applyBg() { if (bg === 'white') root.removeAttribute('data-ds-bg'); else root.setAttribute('data-ds-bg', bg); }
  function applyToc() { if (outlinePref === 'on') root.removeAttribute('data-ds-toc'); else root.setAttribute('data-ds-toc', outlinePref); }
  applyTheme(); applySize(); applyBg(); applyToc();

  var ICON = {
    gear: '<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M8.6 1.8h2.8l.4 2.3a6.2 6.2 0 011.6.9l2.2-.8 1.4 2.4-1.8 1.5a6.3 6.3 0 010 1.8l1.8 1.5-1.4 2.4-2.2-.8a6.2 6.2 0 01-1.6.9l-.4 2.3H8.6l-.4-2.3a6.2 6.2 0 01-1.6-.9l-2.2.8L3 12.4l1.8-1.5a6.3 6.3 0 010-1.8L3 7.6l1.4-2.4 2.2.8a6.2 6.2 0 011.6-.9z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="10" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    close: '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 3.5l9 9m0-9l-9 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    system: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><rect x="1.5" y="2.5" width="13" height="8.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5.5 14h5M8 11v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    light: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M3.2 12.8l1.1-1.1M11.7 4.3l1.1-1.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    dark: '<svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M13.6 10.2A6 6 0 015.8 2.4a6 6 0 107.8 7.8z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    chevron: '<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function on(el, ev, fn) { if (el) el.addEventListener(ev, fn); }
  // Height of the sticky chrome. It changes only with the width, the hierarchy or the
  // fonts, so it is measured then and cached: measuring on every scroll frame forces
  // layout and restyles the whole document.
  var stickyPx = 0;
  function sticky() {
    var h = document.querySelector('.ds-head');
    var px = h ? h.offsetHeight : 0;
    if (px !== stickyPx) { stickyPx = px; root.style.setProperty('--ds-sticky', px + 'px'); }
    return px;
  }

  // ---- Display: theme + hierarchy in one popover ---------------------------------
  function display(box) {
    var id = 'ds-display-pop';
    box.innerHTML =
      '<button type="button" class="ds-iconbtn" aria-haspopup="dialog" aria-expanded="false" aria-controls="' + id + '" aria-label="Display settings">' +
        ICON.gear + '<span class="ds-display-lbl" aria-hidden="true">Display</span></button>' +
      '<div class="ds-pop" id="' + id + '" role="dialog" aria-modal="false" aria-labelledby="' + id + '-t" hidden>' +
        '<div class="ds-pop-head"><p class="ds-pop-title" id="' + id + '-t">Display</p><button type="button" class="ds-pop-x" aria-label="Close display settings">' + ICON.close + '</button></div>' +
        '<div><p class="ds-pop-label" id="' + id + '-th">Theme</p><div class="ds-seg ds-seg--3" role="group" aria-labelledby="' + id + '-th">' +
          THEMES.map(function (t) { return '<button type="button" data-theme-pick="' + t + '">' + ICON[t] + '<span>' + t.charAt(0).toUpperCase() + t.slice(1) + '</span></button>'; }).join('') +
        '</div></div>' +
        '<div><p class="ds-pop-label" id="' + id + '-ts">Hierarchy</p><div class="ds-seg ds-seg--3 ds-seg--size" role="group" aria-labelledby="' + id + '-ts">' +
          SIZES.map(function (s) { return '<button type="button" data-size-pick="' + s + '" aria-label="' + SIZE_NAME[s] + '"><span class="ds-a" aria-hidden="true">A</span><span class="ds-n" aria-hidden="true">' + s.toUpperCase() + '</span></button>'; }).join('') +
        '</div><p class="ds-pop-hint"></p></div>' +
        '<div><p class="ds-pop-label" id="' + id + '-bg">Background</p><div class="ds-seg ds-seg--2" role="group" aria-labelledby="' + id + '-bg">' +
          BGS.map(function (b) { return '<button type="button" data-bg-pick="' + b + '"><span class="ds-swatch" style="background:' + BG_HEX[b] + '" aria-hidden="true"></span><span>' + b.charAt(0).toUpperCase() + b.slice(1) + '</span></button>'; }).join('') +
        '</div><p class="ds-pop-hint">In the light theme.</p></div>' +
        '<div><p class="ds-pop-label" id="' + id + '-toc">Page outline menu</p><div class="ds-seg ds-seg--2" role="group" aria-labelledby="' + id + '-toc">' +
          TOCS.map(function (o) { return '<button type="button" data-toc-pick="' + o + '"><span>' + o.charAt(0).toUpperCase() + o.slice(1) + '</span></button>'; }).join('') +
        '</div><p class="ds-pop-hint">The page outline, on wide screens.</p></div>' +
        '<div class="ds-pop-foot"><p>Saved on this browser.</p><button type="button" class="ds-pop-reset">Reset to defaults</button></div>' +
      '</div>';
    var btn = box.firstChild, pop = box.querySelector('.ds-pop');

    function sync() {
      pop.querySelectorAll('[data-theme-pick]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-pick') === theme)); });
      pop.querySelectorAll('[data-size-pick]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-size-pick') === size)); });
      pop.querySelectorAll('[data-bg-pick]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-bg-pick') === bg)); });
      pop.querySelectorAll('[data-toc-pick]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-toc-pick') === outlinePref)); });
      pop.querySelector('.ds-pop-hint').textContent = SIZE_NAME[size];
      pop.querySelector('.ds-pop-reset').disabled = theme === 'system' && size === 'm' && bg === 'white' && outlinePref === 'on';
    }
    function open(v) {
      pop.hidden = !v; btn.setAttribute('aria-expanded', String(v));
      if (v) { sync(); pop.querySelector('[aria-pressed="true"]').focus({ preventScroll: true }); } else { btn.focus({ preventScroll: true }); }
    }
    on(btn, 'click', function () { open(pop.hidden); });
    on(pop.querySelector('.ds-pop-x'), 'click', function () { open(false); });
    on(pop, 'click', function (e) {
      var t = e.target.closest('[data-theme-pick], [data-size-pick], [data-bg-pick], [data-toc-pick], .ds-pop-reset');
      if (!t) return;
      if (t.hasAttribute('data-theme-pick')) { theme = t.getAttribute('data-theme-pick'); write('ais-docs-theme', theme); applyTheme(); }
      else if (t.hasAttribute('data-bg-pick')) { bg = t.getAttribute('data-bg-pick'); write('ais-docs-bg', bg); applyBg(); }
      else if (t.hasAttribute('data-toc-pick')) { outlinePref = t.getAttribute('data-toc-pick'); write('ais-docs-toc', outlinePref); applyToc(); }
      else if (t.hasAttribute('data-size-pick')) { size = t.getAttribute('data-size-pick'); write('ais-docs-hierarchy', size); applySize(); sticky(); if (items.length) spy(); }
      else { theme = 'system'; size = 'm'; bg = 'white'; outlinePref = 'on'; write('ais-docs-theme', theme); write('ais-docs-hierarchy', size); write('ais-docs-bg', bg); write('ais-docs-toc', outlinePref); applyTheme(); applySize(); applyBg(); applyToc(); sticky(); if (items.length) spy(); pop.querySelector('[data-theme-pick="system"]').focus(); }
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

  // ---- rail sections with pages under them: a button opens the list ----------------
  // The parent link becomes a button with a chevron, as the UIDS Menu marks a parent,
  // and moves into the list as its first entry. A list that holds the current page
  // starts open, and its button takes the current-page tab. Without the script the
  // parent stays a link with its pages below it.
  // A section's name is a link (it then also heads its own list) or a plain
  // <span> (a name only, for a section with no page of its own).
  function groups() {
    document.querySelectorAll('.ds-menu > li').forEach(function (li, i) {
      var a = li.querySelector(':scope > :is(a, span)'), list = li.querySelector(':scope > ul');
      if (!a || !list) return;
      var btn = document.createElement('button'), first = document.createElement('li');
      btn.type = 'button';
      btn.className = 'ds-menu-toggle';
      btn.textContent = a.textContent;
      btn.insertAdjacentHTML('beforeend', ICON.chevron);
      list.id = list.id || 'ds-menu-group-' + i;
      btn.setAttribute('aria-controls', list.id);
      if (a.tagName === 'A') {
        first.appendChild(a);
        list.insertBefore(first, list.firstChild);
      } else {
        a.remove();
      }
      li.insertBefore(btn, list);
      function set(open) { btn.setAttribute('aria-expanded', String(open)); list.hidden = !open; }
      var current = !!list.querySelector('[aria-current="page"]');
      btn.classList.toggle('is-current', current);
      set(current);
      on(btn, 'click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    });
  }

  // ---- outline: "On this page" as a minimap in the right column (.ds-toc) ----------
  var items = [], toc, panel, active = -1;

  function mark(i) {
    if (i === active) return;
    active = i;
    items.forEach(function (it, j) {
      if (j === i) it.a.setAttribute('aria-current', 'location'); else it.a.removeAttribute('aria-current');
      it.bar.classList.toggle('is-read', j <= i);
    });
    current();
  }
  // Keep the current entry in view inside the panel when it scrolls.
  function current() {
    var a = active >= 0 && items[active].a;
    if (!a || !toc.classList.contains('is-open')) return;
    var r = a.getBoundingClientRect(), p = panel.getBoundingClientRect();
    if (r.top < p.top || r.bottom > p.bottom) panel.scrollTop += r.top < p.top ? r.top - p.top - 16 : r.bottom - p.bottom + 16;
  }
  function spy() {
    // A heading counts as reached once it is at the scroll-padding line
    // (site.css: sticky chrome + 1rem), where a jump to it lands.
    var y = stickyPx + 20, a = 0;
    for (var i = 0; i < items.length; i++) { if (items[i].target.getBoundingClientRect().top <= y) a = i; else break; }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) a = items.length - 1;
    mark(a);
  }

  // A button of bars, one per entry, opens the list. Pointer: hover. Keyboard or
  // click: the button opens it and focus moves to the current entry, since the list
  // covers the button. Arrows move between entries; Escape closes and returns to the
  // button; focus leaving the list closes it.
  function minimap() {
    var title = toc.querySelector('.ds-ol-title');
    var box = document.createElement('div');
    var btn = document.createElement('button');
    panel = document.createElement('div');
    box.className = 'ds-mm-box';
    panel.className = 'ds-mm-panel';
    panel.id = 'ds-mm-panel';
    while (toc.firstChild) panel.appendChild(toc.firstChild);
    btn.type = 'button';
    btn.className = 'ds-mm-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', panel.id);
    btn.innerHTML = '<span class="sr-only"></span>';
    btn.firstChild.textContent = title ? title.textContent : 'On this page';
    items.forEach(function (it) {
      it.bar = document.createElement('span');
      it.bar.className = 'ds-mm-bar l' + it.lvl;
      btn.appendChild(it.bar);
    });
    box.appendChild(btn);
    box.appendChild(panel);
    toc.appendChild(box);
    toc.classList.add('ds-mm');

    var hover = false, timer;
    function set(open) {
      clearTimeout(timer);
      toc.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open);
      if (open) current();
    }
    function links() { return items.map(function (it) { return it.a; }); }

    on(toc, 'mouseenter', function () { hover = true; set(true); });
    on(toc, 'mouseleave', function () {
      hover = false;
      timer = setTimeout(function () { if (!panel.contains(document.activeElement)) set(false); }, 100);
    });
    on(btn, 'click', function () { set(true); (items[active] || items[0]).a.focus(); });
    on(toc, 'focusout', function (e) { if (!hover && !panel.contains(e.relatedTarget)) set(false); });
    on(toc, 'keydown', function (e) {
      if (e.key === 'Escape' && toc.classList.contains('is-open')) { set(false); btn.focus(); return; }
      var list = links(), i = list.indexOf(document.activeElement);
      if (i < 0) return;
      var to = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: list.length - 1 }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      list[Math.max(0, Math.min(list.length - 1, to))].focus();
    });
    // From the keyboard, a chosen entry closes the list and focus goes to its heading.
    on(panel, 'click', function (e) {
      var a = e.target.closest('a');
      if (!a || e.detail !== 0) return;
      var it = items.filter(function (x) { return x.a === a; })[0];
      if (!it) return;
      set(false);
      if (!it.target.hasAttribute('tabindex')) it.target.setAttribute('tabindex', '-1');
      it.target.focus({ preventScroll: true });
    });
  }

  function outline() {
    toc = document.querySelector('.ds-toc');
    var ol = toc && toc.querySelector('.ds-ol');
    if (!ol) return;
    ol.querySelectorAll('li').forEach(function (li) {
      var a = li.querySelector('a'), href = a && a.getAttribute('href'), id = href && href.replace(/^#/, '');
      // A stray % is a malformed escape; fall back to the raw id rather than lose the outline.
      try { id = id && decodeURIComponent(id); } catch (e) { /* keep the raw id */ }
      var target = id && document.getElementById(id);
      if (!target) return;
      items.push({ a: a, target: target, lvl: li.classList.contains('l3') ? 3 : 2 });
    });
    if (!items.length) return;

    minimap();
    sticky(); spy();
    var queued = false;
    on(window, 'scroll', function () { if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; spy(); }); } });
    on(window, 'resize', spy);
    // A jump to #id can land after fonts load and move the layout without a
    // scroll event, so check again once everything has loaded.
    on(window, 'load', spy);
    on(window, 'hashchange', function () { requestAnimationFrame(spy); });
  }

  function start() {
    var box = document.querySelector('[data-ds-display]');
    if (box) display(box);
    // Re-measured on every page, outline or not, whenever it can change. Registered
    // before outline() adds its own resize and load handlers, so they read the new value.
    on(window, 'resize', sticky);
    on(window, 'load', sticky);
    // Fonts that arrive late change line heights, so the current section is re-read
    // too, not only the header.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { sticky(); if (items.length) spy(); });
    groups();
    drawer();
    outline();
    sticky();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  // A reader on System follows the OS if it changes mid-visit: CSS handles it,
  // since 'system' leaves no data-theme attribute.
})();
