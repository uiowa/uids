export default {
  title: 'Foundation/Layout',
  tags: ['!autodocs'],
  parameters: {
    options: { showPanel: false },
    docs: { source: { code: null } },
  },
};

// ---------------------------------------------------------------------------
// Every measurement on this page is READ FROM THE LIVE TOKENS at runtime, never
// typed in. A foundation page that quotes a stale number is worse than no page:
// it reads as verified. Nothing checks story prose, so the only durable defence
// is to not write the numbers down. `resolve()` below paints each swatch from
// var(--uiowa-*) and measures the result, so a token edit moves this page.
// ---------------------------------------------------------------------------

const styles = {
  page: 'padding:2rem;max-width:1120px;font-family:system-ui,sans-serif;color:#111;',
  intro: 'font-size:1rem;line-height:1.55;max-width:78ch;margin:0 0 1.5rem;',
  section: 'margin-bottom:3rem;',
  sectionTitle: 'font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0;margin:0 0 0.45rem;padding-bottom:0.45rem;border-bottom:3px solid #FFCD00;',
  sectionDescription: 'font-size:0.875rem;color:#555;line-height:1.55;margin:0.65rem 0 1.1rem;max-width:78ch;',
  code: 'font-size:0.78rem;color:#444;',
  note: 'display:block;font-size:0.72rem;color:#666;margin-top:0.35rem;line-height:1.45;',
  table: 'width:100%;border-collapse:collapse;font-size:0.875rem;line-height:1.45;',
  th: 'text-align:left;border-bottom:2px solid #111;padding:0.65rem 0.75rem;',
  td: 'border-bottom:1px solid #E6E6E6;padding:0.75rem;vertical-align:top;',
  owner: 'display:inline-block;border:1px solid #63666A;padding:0.18rem 0.45rem;font-size:0.68rem;font-weight:700;text-transform:uppercase;margin-left:0.5rem;vertical-align:middle;',
  warn: 'border-left:4px solid #FFCD00;background:#FFFBEA;padding:0.85rem 1rem;font-size:0.85rem;line-height:1.55;margin:1rem 0;max-width:78ch;',
  demo: 'border:1px dashed #BCBEC0;background:#FAFAFA;margin:0.4rem 0 0.9rem;',
};

// UIDS ships the CSS for it, vs. uids_base does and UIDS only owns the vocabulary.
// This distinction is the thing to get right about the layout system, so it is on
// the page rather than in a footnote.
function owner(who) {
  const bg = who === 'UIDS' ? 'background:#111;color:#fff;border-color:#111;' : '';
  return `<span style="${styles.owner}${bg}">${who === 'UIDS' ? 'ships from UIDS' : 'ships from uids_base'}</span>`;
}

function section(title, tag, description, content) {
  return `
    <section style="${styles.section}">
      <h2 style="${styles.sectionTitle}">${title}${tag ? owner(tag) : ''}</h2>
      ${description ? `<p style="${styles.sectionDescription}">${description}</p>` : ''}
      ${content}
    </section>`;
}

function table(headers, rows) {
  return `
    <table style="${styles.table}">
      <thead><tr>${headers.map((h) => `<th style="${styles.th}">${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td style="${styles.td}">${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>`;
}

// A swatch whose bar is painted BY the token and whose caption is filled in by
// resolve() after mount — declared value on the left (so an alias chain is
// visible), measured pixels on the right.
function bar(token) {
  return `
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.5rem;">
      <code style="${styles.code}flex:0 0 20rem;">${token}</code>
      <div style="width:var(${token});height:22px;background:#FFCD00;border:1px solid #E0B400;flex:0 0 auto;"></div>
      <code style="${styles.code}color:#777;" data-token="${token}">…</code>
    </div>`;
}

function barsFor(tokens) {
  return tokens.map(bar).join('');
}

/**
 * Fills every [data-token] caption from the live cascade.
 *
 * Note what getPropertyValue actually returns here: the RESOLVED value, not the
 * authored one. A semantic token authored as `var(--uiowa-space-300)` reports as
 * `3rem`, because the browser substitutes custom-property references when it
 * computes the value. So this page can show what a token IS worth but not what
 * it POINTS AT — read tokens/semantic/layout.json for the alias chain.
 *
 * The pixel figure is measured from a probe rather than calculated, so it stays
 * honest for any unit. Rounded to 2dp: 0.325rem measures 5.1953125px, and a
 * caption that precise reads as significance it does not have.
 */
function resolve(root) {
  const doc = root.ownerDocument;
  const declared = doc.defaultView.getComputedStyle(doc.documentElement);
  root.querySelectorAll('[data-token]').forEach((el) => {
    const name = el.dataset.token;
    const probe = doc.createElement('div');
    probe.style.cssText = `position:absolute;visibility:hidden;width:var(${name});`;
    doc.body.appendChild(probe);
    const px = Math.round(probe.getBoundingClientRect().width * 100) / 100;
    probe.remove();
    el.textContent = `${declared.getPropertyValue(name).trim()} · ${px}px`;
  });
}

// ---------------------------------------------------------------------------
// Presentation-only CSS.
//
// As of 2026-08-24 the section rhythm SHIPS FROM THIS REPO
// (src/scss/abstracts/_section-rhythm.scss, ported from uids_base). So the
// rhythm diagrams below are drawn by the REAL .layout__container rules, not by
// a replica — the padding you measure on this page is the padding a Drupal
// section gets. Nothing here re-implements the rhythm; the .lyd- rules only
// make an otherwise invisible box visible.
//
// Keep it that way. The moment a rule below sets padding on .layout__container
// this page goes back to testing itself instead of the design system.
//
// Note `.lyd-band` deliberately contains no "bg-" substring: the merge selector
// keys on [class*="bg-"], so a presentation class that did would silently
// change which diagram merges.
//
// It is INJECTED from mounted(), not written as a <style> in the template:
// Vue's runtime template compiler silently drops <style> tags, so the markup
// rendered and the rules did not — every band measured 0 padding while looking
// structurally correct. Prefixing still matters because this lands in the
// shared preview document, the same cascade every other story renders into.
// ---------------------------------------------------------------------------
const DEMO_CSS = `
  .lyd-band { background:#F3F3F3; border:1px solid #E0E0E0; text-align:center; font-size:0.8rem; color:#444; }
  .lyd-band > span { display:block; background:#fff; border:1px dashed #CFCFCF; padding:0.5rem; }
  .lyd-util { background:#FFF8D6; border:1px solid #F0DFA0; }
  .lyd-util > span { display:block; background:#fff; border:1px dashed #CFCFCF; padding:0.4rem; font-size:0.75rem; }
  .lyd-3col { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
`;

// Idempotent by id — switching between the four stories must not stack copies.
function injectDemoCss(doc) {
  let el = doc.getElementById('lyd-demo-css');
  if (!el) {
    el = doc.createElement('style');
    el.id = 'lyd-demo-css';
    doc.head.appendChild(el);
  }
  el.textContent = DEMO_CSS;
}

// Real shipped markup. .layout__container carries the rhythm; .lyd-band only draws the
// box. `extra` takes real classes — a background treatment (bg--gold) or a Layout Builder
// modifier (section-padding__top-restored) — because the merge selector keys on the
// background treatment, so two sections merge only when their treatments match.
function band(label, extra) {
  return `<div class="layout__container lyd-band${extra ? ` ${extra}` : ''}"><span>${label}</span></div>`;
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

const scale = section(
  'Spacing scale',
  'UIDS',
  'The primitive steps, painted by the token itself. Step names are the rem value &times; 100, so <code>space/125</code> is 1.25rem. Source: <code>tokens/primitives/spacing.json</code>.',
  barsFor([
    '--uiowa-space-32', '--uiowa-space-50', '--uiowa-space-62', '--uiowa-space-75',
    '--uiowa-space-100', '--uiowa-space-105', '--uiowa-space-110', '--uiowa-space-125',
    '--uiowa-space-150', '--uiowa-space-160', '--uiowa-space-187', '--uiowa-space-200',
    '--uiowa-space-300', '--uiowa-space-600', '--uiowa-space-800',
  ]) +
    `<p style="${styles.note}">space/105, space/110 and space/160 are shipped legacy oddballs, tokenized as-shipped and flagged as 5.x consolidation candidates. space/32's <code>// 5px</code> comment in _variables.scss is wrong — the value is 0.325rem (5.2px) and is deliberately not "corrected".</p>`
);

const semantic = section(
  'Semantic layout tokens',
  null,
  'These alias the primitives above, so editing a primitive moves everything pointing at it. The captions show each token <em>resolved</em>, not as authored &mdash; the browser substitutes custom-property references when it computes a value, so a token written <code>{space.300}</code> reports as <code>3rem</code> here. Read <code>tokens/semantic/layout.json</code> for the alias chain itself.',
  barsFor([
    '--uiowa-layout-gutter-width-mobile', '--uiowa-layout-gutter-width-desktop',
    '--uiowa-layout-gutter-height-mobile', '--uiowa-layout-gutter-height-desktop',
    '--uiowa-layout-section-padding-mobile', '--uiowa-layout-section-padding-default',
    '--uiowa-layout-section-padding-extra',
    '--uiowa-layout-block-stack-default', '--uiowa-layout-block-stack-compact',
    '--uiowa-layout-block-stack-extra',
  ]) +
    `<div style="${styles.warn}"><strong>Two of these currently reach nothing.</strong>
      <code>layout/section/padding/*</code> is a parallel vocabulary: production authors
      <code>.layout__container</code> padding from the <em>gutter</em> tokens instead
      (<code>uids_base/scss/global.scss:153-161</code>), so editing section-padding moves the
      Claude Design preview and nothing else. <code>layout/gutter/height/desktop</code> has no
      consumer at all. Both are recorded in <code>contracts/layout.json</code> knownIssues;
      consolidating them is a 5.x decision, not a silent fix. <code>yarn check:drift</code>
      reports this class of problem as DOC-ONLY and ORPHAN.</div>`
);

const containers = section(
  'Containers',
  'uids_base',
  'Container controls a section\'s outer width and page margin. <code>.page__container</code> itself ships from UIDS (<code>abstracts/_layout-main.scss</code>), but the four modifiers are authored downstream.',
  table(
    ['Option', 'Class', 'Behavior'],
    [
      ['standard', '<code>page__container--normal</code>', 'Caps 81.875em (1310px) and centres from the page-container breakpoint; 1.25rem side margins below it. The modifier adds little over the default container mixin.'],
      ['narrow', '<code>page__container--narrow</code>', 'Caps 63.75em (1020px) from md — the only container that caps earlier than page-container.'],
      ['wide', '<code>page__container--extended</code>', 'Caps 100em (1600px) with 1.875rem side padding at page-container.'],
      ['full', '<code>page__container--full</code>', 'Viewport-wide, keeping 3rem outer margins from md (1.25rem below).'],
      ['edge', '<code>page__container--edge</code>', 'No outer margins — true edge to edge.'],
    ]
  )
);

const rhythm = section(
  'Section rhythm',
  'UIDS',
  'Sections carry the page\'s vertical rhythm. The rhythm steps at <strong>sm (768px), not md</strong> — a common mistake, since almost everything else about layout steps at md. The first section drops its top padding. <em>The diagrams below are drawn by the real shipped <code>.layout__container</code> rules, ported from uids_base on 2026-08-24, so what you measure here is what a Drupal section gets.</em>',
  `<div class="lyd-3col">
     <div>
       <strong style="font-size:0.85rem;">Different backgrounds &rarr; no merge</strong>
       <p style="${styles.note}">Each section pads top and bottom. The first drops its top edge because it is <code>:first-child</code>. These two do not merge because their background treatments differ.</p>
       <div style="${styles.demo}">${band('Section A')}${band('Section B', 'bg--gold')}</div>
     </div>
     <div>
       <strong style="font-size:0.85rem;">Same background &rarr; merged</strong>
       <p style="${styles.note}">The second section's top padding goes to 0, so the two read as one band. <strong>The merge is keyed on the background treatment</strong>, not on adjacency alone — that is the rule people miss.</p>
       <div style="${styles.demo}">${band('Section A')}${band('Section B')}</div>
     </div>
     <div>
       <strong style="font-size:0.85rem;">Restored</strong>
       <p style="${styles.note}">The same merged pair, with <code>section-padding__top-restored</code> on the second section putting its top edge back. <strong>Narrow this viewport below 768px:</strong> the other two diagrams drop to 1.25rem and this one stays at 3rem, because the class carries no media query. As shipped &mdash; see the note below.</p>
       <div style="${styles.demo}">${band('Section A')}${band('Section B', 'section-padding__top-restored')}</div>
     </div>
   </div>
   <div style="${styles.warn}"><strong>The merge is the part people get wrong.</strong> Two adjacent
     default-padded sections give one section's worth of separation, never two — the second
     contributes nothing. Do not add a margin to make up the difference; opt the section that needs
     more room into <code>section-padding__top-extra</code>.<br><br>
     <strong>&ldquo;Restore default spacing&rdquo; has two catches</strong>, both as-shipped. It restores
     the <em>top edge only</em> &mdash; there is no bottom-restore class. And it is a flat
     <code>padding-top:3rem</code> with no media query, so below sm it does not restore the default
     (1.25rem) but overshoots it by 2.4&times;, leaving that section with mismatched edges.</div>` +
    table(
      ['Author-facing label', 'Class', 'Effect'],
      [
        ['Remove default vertical spacing', '<code>section-padding__removed-top section-padding__removed-bottom</code>', 'Removes both edges'],
        ['Add extra top spacing', '<code>section-padding__top-extra</code>', 'Top padding &rarr; layout/section/padding/extra'],
        ['Add extra bottom spacing', '<code>section-padding__bottom-extra</code>', 'Bottom padding &rarr; layout/section/padding/extra'],
        ['Remove top spacing', '<code>section-padding__removed-top</code>', 'Top padding &rarr; 0'],
        ['Remove bottom spacing', '<code>section-padding__removed-bottom</code>', 'Bottom padding &rarr; 0'],
        ['Restore default spacing', '<code>section-padding__top-restored</code>', 'Top edge only &mdash; see above'],
        ['Remove default column spacing', '<code>column-spacing__removed</code>', 'Drops region gaps and stacked-region spacing'],
        ['Reverse column order on mobile', '<code>section-order__reversed</code>', 'Flips visual order below md'],
      ]
    )
);

// The one section on this page rendered with REAL shipped CSS. preview.js imports
// uids-core.scss, which forwards abstracts/utility-classes, so these are the same
// rules a consuming site gets.
function utilDemo(cls, label) {
  return `<div class="lyd-util ${cls}"><span>${label}</span></div>`;
}

const utilities = section(
  'Block, element and logical padding utilities',
  'UIDS',
  'Local spacing overrides from <code>abstracts/_utility-classes.scss</code>. These ship from this repo, as the section rhythm now does, and the boxes below are drawn by the real classes, not by demo CSS. The <code>.block-*</code> and <code>.element--*</code> namespaces are declared as one selector list — they are exactly equivalent and neither is preferred.',
  `<div class="lyd-3col">
     <div>${utilDemo('block-padding__all', '.block-padding__all')}</div>
     <div>${utilDemo('block-padding__all--minimal', '.block-padding__all--minimal')}</div>
     <div>${utilDemo('block-padding__all--extra', '.block-padding__all--extra')}</div>
     <div>${utilDemo('element--padding__all--sm', '.element--padding__all--sm')}</div>
     <div>${utilDemo('padding--block--sm', '.padding--block--sm')}</div>
     <div>${utilDemo('padding--block--md', '.padding--block--md')}</div>
   </div>
   <div style="${styles.warn}"><strong>Two different <code>--sm</code> scales, 2.5&times; apart.</strong>
     <code>.element--padding__all--sm</code> is 1.25rem on all four sides;
     <code>.padding--block--sm</code> is 0.5rem on the block axis only. The first is intended to
     supersede the second, but it is <strong>not a drop-in swap</strong> — switching adds inline
     padding that was never there and multiplies the block padding. Both still ship and live sites
     depend on the legacy one. The names were kept rather than corrected so a grep for the class in
     a Drupal template still lands; see <code>contracts/layout.json</code> changes[].</div>` +
    table(
      ['Family', 'Modifiers', 'Scale'],
      [
        ['<code>.block-padding__*</code> / <code>.element--padding__*</code>', '<code>__all</code>, <code>__top</code>, <code>__right</code>, <code>__bottom</code>, <code>__left</code>, each with <code>--minimal</code>; plus <code>__all--extra</code>', 'default 3rem, minimal 2rem, extra 6rem'],
        ['<code>.element--padding__all--sm</code>', 'none &mdash; declared on its own, no <code>.block-padding</code> twin', '1.25rem'],
        ['<code>.block-margin__*</code> / <code>.element--margin__*</code>', '<code>__top</code>, <code>__bottom</code> (+ <code>--extra</code>), <code>__left</code>, <code>__right</code>', '1.05rem; --extra steps to 2rem from sm'],
        ['<code>.padding--block--*</code> / <code>.padding--inline*--*</code>', '<code>--sm</code>, <code>--md</code> &mdash; but there is <strong>no</strong> <code>.padding--inline--sm</code>', '0.5rem / 1rem'],
      ]
    ) +
    `<p style="${styles.note}">Two more as-shipped asymmetries worth knowing:
      <code>.block-margin__left</code> and <code>__right</code> apply <em>only from sm</em> and have
      no mobile value at all, where <code>__top</code> and <code>__bottom</code> apply at every
      width. And in stacked Layout Builder regions the margin utilities act as <em>overrides</em> on
      the 1.6rem default sibling rhythm, not as additions to it.</p>`
);

const breakpoints = section(
  'Breakpoint reference',
  null,
  'What changes, and where. <code>layout/breakpoint/*</code> exist as tokens for documentation and Figma only — they are never emitted to CSS, because a custom property cannot drive a media query.',
  table(
    ['Range', 'What happens'],
    [
      ['<strong>&lt; 768px</strong><br><span style="' + styles.code + '">below sm</span>', 'Sections pad 1.25rem top and bottom. Full-width containers keep a 1.25rem outer margin. Multi-region layouts stack, with 2rem between regions. Content grids gap 2rem.'],
      ['<strong>768&ndash;979px</strong><br><span style="' + styles.code + '">sm</span>', 'Section padding becomes 3rem. The block-margin <code>--extra</code> step goes 1.05rem &rarr; 2rem. Most authored column ratios are still stacked.'],
      ['<strong>&ge; 980px</strong><br><span style="' + styles.code + '">md</span>', 'Column ratios engage. Full-width containers take 3rem outer margins. Desktop grid gaps are 3rem. Mobile stacked-region spacing is dropped.'],
      ['<strong>&ge; 1350px</strong><br><span style="' + styles.code + '">page-container</span>', 'Standard containers centre at 81.875em; wide expands to 100em with 1.875rem side padding; <code>grid--twocol--25-75</code> steps its gap 1.5rem &rarr; 3rem.'],
    ]
  )
);

const intro = `
  <h1 style="font-size:2rem;line-height:1.15;margin:0 0 0.75rem;">Layout &amp; Spacing</h1>
  <p style="${styles.intro}">
    The spacing scale, the semantic layout tokens, and the classes that consume them.
    <strong>Read the ownership tag on each section.</strong> UIDS owns the vocabulary for the whole
    system, but ships CSS for only part of it. The spacing utilities have always shipped from here;
    the <em>section rhythm</em> joined them on 2026-08-24, ported from <code>uids_base</code> so it
    is testable in this repo rather than only inside Drupal. Containers, the column-spacing and
    section-order modifiers, and the per-layout column ratios are still authored in SiteNow's
    <code>uids_base</code> theme, and are documented here because the tokens they use are defined
    here. The full public shape lives in <code>contracts/layout.json</code>.
  </p>`;

const hooks = {
  mounted() {
    injectDemoCss(this.$el.ownerDocument);
    resolve(this.$el);
  },
};

export const Tokens = {
  name: 'Tokens',
  render: () => ({ ...hooks, template: `<div style="${styles.page}">${intro}${scale}${semantic}</div>` }),
};

export const Sections = {
  name: 'Containers & section rhythm',
  render: () => ({ ...hooks, template: `<div style="${styles.page}">${containers}${rhythm}</div>` }),
};

export const Utilities = {
  name: 'Spacing utilities',
  render: () => ({ ...hooks, template: `<div style="${styles.page}">${utilities}</div>` }),
};

export const AllLayout = {
  name: 'All Layout',
  render: () => ({
    ...hooks,
    template: `<div style="${styles.page}">${intro}${scale}${semantic}${containers}${rhythm}${utilities}${breakpoints}</div>`,
  }),
};
