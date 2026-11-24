import diffText from './pr-1099-tokens.diff?raw';
import semanticTokens from '../../tokens/semantic/typography.json';
import primitiveTokens from '../../tokens/primitives/typography.json';
import { NAMED_COUNT } from './typeScale';
import { Annotated, annotate, codeCss, parseDiff } from './codeView';

// PR 1099's diff, as GitHub shows it, with a note beside each change saying why: the token files, the stylesheets that
// read the renamed and new tokens, and the classes that apply the roles. pr-1099-tokens.diff is written by the
// command on the page; each note finds its place by the text of a line, and a note whose line is gone is listed at
// the top rather than dropped.

const SEMANTIC = semanticTokens.typography;
const SIZES = primitiveTokens.typography['font-size'];
const countTokens = (node) => Object.entries(node).filter(([key]) => !key.startsWith('$'))
  .reduce((n, [, child]) => n + ('$value' in child ? 1 : countTokens(child)), 0);
const HIERARCHIES = Object.keys(SEMANTIC.body).filter((key) => SEMANTIC.body[key]?.fontSize);
const ROLES = ['body', ...Object.keys(SEMANTIC).filter((key) => SEMANTIC[key]?.multiple)];
const GAPS = Object.keys(SEMANTIC.scale).filter((key) => !key.startsWith('$'));
const COUNT = {
  tokens: ROLES.reduce((n, role) => n + countTokens(SEMANTIC[role]), 0) + countTokens(SEMANTIC.label),
  named: NAMED_COUNT.total,
  roles: ROLES.length,
  hierarchies: HIERARCHIES.length,
  styles: ROLES.length * HIERARCHIES.length,
  gaps: GAPS.length * HIERARCHIES.length,
};

// Sizes worked out from the token files, as the classes work them out: a primitive font size in px, a body size, and
// a role's size in a hierarchy, the body size times the role's multiple.
const sizePx = (reference) => SIZES[reference.slice(1, -1).split('.').at(-1)].$value.value * 16;
const bodyPx = (hierarchy) => sizePx(SEMANTIC.body[hierarchy].fontSize.$value);
const rolePx = (role, hierarchy) => bodyPx(hierarchy) * (SEMANTIC[role].multiple?.$value ?? 1);
const labelPx = (size) => sizePx(SEMANTIC.label[size].fontSize.$value);
// Up to three decimals when they're exact (16.625px), else two (12.67px).
const fmt = (value) => (Math.abs(value * 1000 - Math.round(value * 1000)) < 1e-6 ? value : Number(value.toFixed(2)));
const px = (value) => `${fmt(value)}px`;
const pt = (value) => `${Number((value * 0.75).toFixed(2))}pt`;

const REFRESH = '{ echo "base $(git merge-base origin/next origin/typography_roles)"; echo "head $(git rev-parse origin/typography_roles)"; git diff --no-color origin/next...origin/typography_roles -- src/tokens src/scss/base/_paragraph.scss src/scss/abstracts/_variables.scss src/scss/base/_type-roles.scss src/scss/uids-core.scss; } > src/components/tokens/pr-1099-tokens.diff';

const DIFF_NOTES = {
  'src/tokens/primitives/typography.json': [
    {
      at: '@@ -5,7',
      note: `<p><strong>New font family: Special Gothic Condensed</strong>, Foundations' display face.
        <code>typography.typeface.display</code> points at it, so the Headline, Headline 6×, Headline 8× and Eyebrow are
        set in it.</p>
        <p>Its second name, Special Gothic, is the Google Fonts family the docs load at width 75 and weight 600
        (<code>.storybook/preview-head.html</code>). UIDS's own CSS loads no font file for it.
        The Antonio line changes only by the comma JSON needs before a new entry.</p>`,
    },
    {
      at: '@@ -18,29',
      note: `<p><strong>Seven new font sizes.</strong> Four are the body sizes next doesn't have: <code>79</code> X-Small
        (${px(bodyPx('x-small'))}, ${pt(bodyPx('x-small'))}), <code>119</code> Medium (${px(bodyPx('medium'))}),
        <code>150</code> Large (${px(bodyPx('large'))}) and <code>225</code> X-Large (${px(bodyPx('x-large'))}). Small's
        ${px(bodyPx('small'))} is the existing <code>100</code>.</p>
        <p>Three are the Labels' sizes: <code>104</code>, <code>89</code> and <code>74</code> (${px(labelPx('large'))},
        ${px(labelPx('medium'))} and ${px(labelPx('small'))}), 0.875, 0.75 and 0.625 of Body Medium, written out so a
        Label needs no math. The names follow the others: the rem value × 100, rounded.</p>`,
    },
    {
      at: '"line-height": {',
      note: `<p><strong>Five new line heights, the ones the roles use:</strong> 0.9 for Headline 6× and 8×, 1 for the
        Headline, 1.1 for the Subhead, 1.2 for the Eyebrow and for Subhead 2 in Large and X-Large, and 1.5 for Body and
        Small print. The others they use, 1.25, 1.3 and 1.4, were already here.</p>`,
    },
  ],
  'src/tokens/semantic/typography.json': [
    {
      at: '+    "paragraph": {',
      note: `<p><strong><code>typography.paragraph</code> is next's <code>typography.body</code>, renamed.</strong> The
        same five references, so the same 1.2rem with a line height of 1.7, written as five single tokens instead of
        one composite.</p>
        <p>It moved because the Body role, next, needed the name. UIDS's <code>p</code> rule and
        <code>$content-font-size</code> read it now, so paragraphs render as before: see the files that read the
        renamed tokens, below.</p>`,
    },
    {
      at: '    "body": {',
      note: `<p><strong><code>typography.body</code> is now the Body role.</strong> The composite is gone; it's
        <code>typography.paragraph</code> above. In its place: Body's own family, weight, line height and letter
        spacing, then one group per hierarchy holding that hierarchy's body size.</p>
        <p>Body isn't the paragraph style. Its line height is 1.5, not 1.7; its face comes through
        <code>typography.typeface.sans</code>; and its size depends on the hierarchy, ${px(bodyPx('medium'))} in Medium
        against the paragraph's 19.2px. Each group's description lists the formats that hierarchy is for.</p>`,
    },
    {
      at: '+    "small-print": {',
      note: `<p><strong>New role: Small print</strong>, 0.75 × the body size (${px(rolePx('small-print', 'medium'))} in
        Medium), for credits, dates and fine print. Like every role, it's written once: four properties and a
        <code>multiple</code>.</p>`,
    },
    {
      at: '     "size": {',
      note: `<p><strong>Unchanged.</strong> The <code>},</code> added after <code>size</code> is only punctuation: groups
        follow it now.</p>`,
    },
    {
      at: '+    "typeface": {',
      note: `<p><strong>New: three typeface roles</strong>, named after Foundations' families: display, slab and sans.
        Every role's family points at one of these, not at a font family primitive, so changing the face for every
        role on it is one edit here.</p>`,
    },
    {
      at: '+    "scale": {',
      note: `<p><strong>New: the two gaps</strong>, as multipliers of the body size: <code>related</code>, 1.5, between
        closely related elements, and <code>break</code>, 2, between sections. In each hierarchy a gap is its body size
        times one of these, so no gap needs a token per hierarchy. The hierarchy classes set them as
        <code>--uiowa-type-space-related</code> and <code>--uiowa-type-space-break</code>.</p>`,
    },
    {
      at: '+    "highlight": {',
      note: `<p><strong>New: the highlight measurements</strong>, multiples of the role's own font size (em in CSS): the
        box behind chosen headline words, and the band under a subhead. The Highlight story draws them, and UIDS ships
        no highlight class.</p>`,
    },
    {
      at: '+    "headline": {',
      note: `<p><strong>New role: Headline</strong>, the title: 4 × the body size, ${px(rolePx('headline', 'medium'))} in
        Medium. Every role from here down has the same shape: a <code>multiple</code>, then family, weight, line height
        and letter spacing, each pointing at a shared token.</p>`,
    },
    {
      at: '+    "headline-6x": {',
      note: `<p><strong>Headline 6× and 8×</strong>, the bigger steps for a statement: 6 and 8 × the body size,
        ${px(rolePx('headline-6x', 'medium'))} and ${px(rolePx('headline-8x', 'medium'))} in Medium, with a tighter line
        height, 0.9.</p>`,
    },
    {
      at: '+    "eyebrow": {',
      note: `<p><strong>New role: Eyebrow</strong>, the label above a title: 1.5 × the body size,
        ${px(rolePx('eyebrow', 'medium'))} in Medium, in the display face. The uppercase isn't a token: the
        <code>.type-eyebrow</code> class adds it.</p>`,
    },
    {
      at: '+    "subhead": {',
      note: `<p><strong>New role: Subhead</strong>, the lead-in and section heads: 2 × the body size,
        ${px(rolePx('subhead', 'medium'))} in Medium, Zilla Slab, line height 1.1.</p>
        <p>Its <code>x-small</code> and <code>small</code> groups hold the one value that differs there, a line height
        of 1.25. A hierarchy group holds only what differs.</p>`,
    },
    {
      at: '+    "subhead-2": {',
      note: `<p><strong>New role: Subhead 2</strong>, details and short headings: 1.5 × the body size,
        ${px(rolePx('subhead-2', 'medium'))} in Medium, Roboto, line height 1.3, and 1.2 in Large and X-Large.</p>
        <p><code>fontWeightEmphasis</code>, Medium 500, is a sixth property, for the line that leads a details group.
        The five-value composite type has no place for it.</p>`,
    },
    {
      at: '+    "label": {',
      note: `<p><strong>New: the Labels</strong>, one set for every hierarchy: Large, Medium and Small, Roboto Medium,
        line height 1.4.</p>
        <p>Their sizes don't change with the hierarchy, so each points at a plain size: ${px(labelPx('large'))},
        ${px(labelPx('medium'))} and ${px(labelPx('small'))}, which are 0.875, 0.75 and 0.625 of Body Medium. If Body
        Medium changes, these three change by hand.</p>`,
    },
  ],
  'src/tokens/README.md': [
    {
      at: '+## Typography roles',
      note: `<p><strong>A new section on the roles:</strong> the five body sizes that name the hierarchies, each role
        written once with its multiple, hierarchy groups only for what differs, the gaps as multipliers, and the Labels
        as plain sizes.</p>`,
    },
    { at: '+The classes that apply the roles', note: '<p>How a page uses them: a hierarchy class on a container, a role class on the text, and <code>.type-subhead-2--emphasis</code> for Subhead 2\'s emphasis weight. Medium is the default.</p>' },
    {
      at: 'takes it too. The intro under a',
      note: `<p><strong>The intro under a page's title</strong> is <code>.element--intro</code>: Roboto Regular at the
        Subhead's size, so it is the h2's size in every hierarchy. <code>.element--light-intro</code> and
        <code>.element--bold-intro</code> are deprecated names for it.</p>`,
    },
    {
      at: '+`typography.paragraph` is the style',
      note: '<p>What <code>typography.paragraph</code> is. The rename from <code>typography.body</code> is in the CHANGELOG.</p>',
    },
    { at: '+The highlight tokens', note: '<p>What each highlight value measures.</p>' },
    {
      at: '+`llms/llms.txt` and',
      note: `<p>Added when the PR dropped the script that wrote <code>llms/</code>. Nothing rebuilds those files now, so
        the README tells whoever changes a typography token to change <code>llms/typography.md</code> too.</p>`,
    },
    {
      at: '+## Document outline',
      note: `<p><strong>New: the document outline.</strong> Where an author picks only a heading level, each level
        takes a role, and <code>.type-rich-text</code> applies them with no classes.</p>`,
    },
  ],
  'src/scss/base/_paragraph.scss': [
    {
      at: '@@ -26,10',
      note: `<p><strong>Why the <code>p</code> rule changed.</strong> In 1099, <code>--uiowa-typography-body-*</code> is
        the Body role. Left as it was, this rule would give every paragraph Body's line height, 1.5 instead of 1.7, and
        no size of its own: <code>--uiowa-typography-body-font-size</code> no longer exists, so a paragraph would take
        its parent's size.</p>
        <p>Reading <code>--uiowa-typography-paragraph-*</code>, the old style under its new name, paragraphs render
        exactly as before: 19.2px, line height 1.7.</p>`,
    },
    {
      at: '@@ -181,19',
      note: `<p><strong>The intro classes.</strong> On next, <code>.element--light-intro</code> was Roboto Light and
        <code>.element--bold-intro</code> Zilla Slab 600, each growing with the screen from 25.6px to 33.6px or 35.2px.
        Now one rule sets both and <code>.element--intro</code> from the roles: Subhead 2's face, weight and leading at
        the Subhead's size, the h2's, so 38px on Medium. The old names are deprecated; the
        <code>typography.intro-*</code> tokens stay, and no UIDS stylesheet reads them now.</p>`,
    },
  ],
  'src/scss/abstracts/_variables.scss': [
    {
      at: '@@ -64,7',
      note: `<p><strong>The same rename for <code>$content-font-size</code></strong>, which lists, tables, alerts,
        accordions, blockquotes and tabs use for their text. It reads the paragraph's size, 1.2rem, as it did on
        next.</p>`,
    },
  ],
  'src/scss/base/_type-roles.scss': [
    {
      at: '+// The type roles as classes',
      note: `<p><strong>New: the classes that apply the roles</strong>, written out in Sass, one rule each. Nothing here
        is generated, so a search for a class finds its rule.</p>`,
    },
    {
      at: '+.type-scale--x-small {',
      note: `<p><strong>One class per hierarchy</strong>, <code>.type-scale--x-small</code> to
        <code>.type-scale--x-large</code>. Each sets <code>--uiowa-type-base</code> to its body size, the two gaps from
        it, and the two line heights that switch: the hierarchy's own where the token file has one, else the
        role's.</p>
        <p>Medium's selector also gets <code>:where(:root)</code>, so a page with no hierarchy class gets Medium.
        <code>:where()</code> gives that default no specificity, so a hierarchy class on <code>&lt;html&gt;</code> still
        overrides it.</p>`,
    },
    {
      at: '+// Rich text, where an author picks only a heading level',
      note: `<p><strong>New: <code>.type-rich-text</code></strong>, for rich text, where an author picks only a heading
        level. Its own children take the document outline with no classes: the h1 the Headline, the h2 the Subhead, h3
        to h6 Subhead 2 at its emphasis weight, and paragraphs and lists Body, all in the hierarchy it sits in.</p>
        <p>The element rules sit in <code>:where()</code>, so they carry only the container's specificity and come before
        the role classes: a role class on a heading still wins. The gaps are Related between blocks and Break under the
        h1 and above a heading that starts a section; the heading selectors outweigh the base
        <code>h2:not(:first-child)</code> margins.</p>`,
    },
    { at: '+.type-body {', note: '<p>Body\'s class: its size is the base itself.</p>' },
    {
      at: '+.type-small-print {',
      note: `<p><strong>Every other role's class.</strong> Its size is
        <code>calc(var(--uiowa-type-base) * var(--uiowa-typography-&lt;role&gt;-multiple))</code>, so the browser works
        out each role's size in whatever hierarchy it sits in. Subhead and Subhead 2 read the line height the hierarchy
        class sets.</p>`,
    },
    {
      at: '+.type-eyebrow {',
      note: '<p>The Eyebrow\'s class also sets uppercase.</p>',
    },
    {
      at: '+.type-subhead-2 :is(strong, b) {',
      note: `<p>Subhead 2's emphasis weight, on <code>strong</code> and <code>b</code> inside it and on
        <code>.type-subhead-2--emphasis</code>.</p>`,
    },
    {
      at: '+// The Labels are one set for every hierarchy.',
      note: `<p><strong>The three Label classes, written out.</strong> The Labels don't change with the hierarchy, so
        each class reads its own five tokens, with no base and no multiple.</p>`,
    },
  ],
  'src/scss/uids-core.scss': [
    { at: '@@ -6,6', note: '<p>Pulls the type-role classes into the stylesheet, so <code>uids.css</code> and <code>uids-core.css</code> have them.</p>' },
  ],
};
const GROUPS = [
  { key: 'tokens', files: ['src/tokens/primitives/typography.json', 'src/tokens/semantic/typography.json', 'src/tokens/README.md'] },
  { key: 'readers', files: ['src/scss/base/_paragraph.scss', 'src/scss/abstracts/_variables.scss'] },
  { key: 'classes', files: ['src/scss/base/_type-roles.scss', 'src/scss/uids-core.scss'] },
];

const DIFF = parseDiff(diffText);
const fileView = (file) => ({ path: file.path, adds: file.adds, dels: file.dels, ...annotate(file.rows, DIFF_NOTES[file.path] ?? []) });
const grouped = new Set(GROUPS.flatMap((g) => g.files));
// A file in the diff that no group names is shown with the token files rather than left out.
const DIFF_FILES = Object.fromEntries(GROUPS.map((g) => [g.key, g.files.map((path) => DIFF.files.find((file) => file.path === path)).filter(Boolean).map(fileView)]));
DIFF_FILES.tokens.push(...DIFF.files.filter((file) => !grouped.has(file.path)).map(fileView));
const UNPLACED = Object.values(DIFF_FILES).flat().flatMap((view) => view.unplaced.map((note) => `${view.path}: ${note.at}`));

const css = `
  .td { padding: var(--uiowa-space-300); max-width: 120rem; color: var(--uiowa-color-brand-black); }
  .td > :is(p, ul) { max-width: 52rem; }
  .td.td :where(h1, h2, h3, p, ul, figure, table) { margin: 0; }
  .td.td > * + * { margin-top: var(--uiowa-type-space-related); }
  .td.td > h2 { margin-top: var(--uiowa-type-space-break); }
  .td code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .td__refresh { display: block; margin-top: var(--uiowa-space-50); padding: var(--uiowa-space-100); background: var(--uiowa-color-neutral-100); white-space: pre-wrap; overflow-wrap: anywhere; }
  .td__warn { padding: var(--uiowa-space-100); border-left: 4px solid var(--uiowa-color-danger); background: color-mix(in srgb, var(--uiowa-color-danger) 8%, transparent); }
  .td__file { border: 1px solid var(--uiowa-color-border-default); }
  .td__file-head {
    display: flex; flex-wrap: wrap; gap: 0 var(--uiowa-space-100); align-items: baseline;
    padding: var(--uiowa-space-50) var(--uiowa-space-100); background: var(--uiowa-color-neutral-200);
    border-bottom: 1px solid var(--uiowa-color-border-default);
  }
  .td__file-head code { font-weight: 600; font-size: 0.9rem; }
  .td__add { color: var(--uiowa-color-success); font-weight: 600; }
  .td__del { color: var(--uiowa-color-danger); font-weight: 600; }
  ${codeCss}
`;

const FILE_LIST = `
  <section v-for="f in files" :key="f.path" class="td__file">
    <header class="td__file-head"><code>{{ f.path }}</code><span class="td__add">+{{ f.adds }}</span><span class="td__del">−{{ f.dels }}</span></header>
    <Annotated :sections="f.sections" diff />
  </section>`;

export default {
  title: 'Tokens (typography)',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { source: { code: null } } },
};

export const TokenDiff = {
  name: 'Token diff',
  render: () => ({
    components: {
      Annotated,
      FileList: { components: { Annotated }, props: { files: { type: Array, required: true } }, template: `<div style="display: contents">${FILE_LIST}</div>` },
    },
    setup() {
      return {
        css, count: COUNT, base: DIFF.meta.base?.slice(0, 10), head: DIFF.meta.head?.slice(0, 10), refresh: REFRESH,
        groups: DIFF_FILES, unplaced: UNPLACED,
      };
    },
    template: `
      <div class="td">
        <component is="style">{{ css }}</component>
        <h1 class="type-subhead">Token diff</h1>
        <p class="type-body">
          The diff GitHub shows for PR 1099, from its base, next at <code>{{ base }}</code>, to the pushed head,
          <code>{{ head }}</code>, with a note beside each change saying why it changed: the token files, the
          stylesheets that read the renamed and new tokens, and the classes that apply the roles. The PR's other five files
          aren't shown: <code>llms/llms.txt</code> and <code>llms/typography.md</code>, the typography as plain text,
          kept by hand; the CHANGELOG; the line in <code>.storybook/main.mjs</code> that serves <code>llms/</code>; and
          the Special Gothic link in <code>.storybook/preview-head.html</code>.
        </p>
        <p v-if="unplaced.length" class="td__warn type-small-print">
          {{ unplaced.length }} notes didn't find their line, so the code has changed since they were written:
          <template v-for="(u, i) in unplaced" :key="u">{{ i ? '; ' : '' }}<code>{{ u }}</code></template>.
        </p>
        <p class="type-small-print">To refresh the diff after a push, run this in the repo:<code class="td__refresh">{{ refresh }}</code></p>

        <h2 class="type-subhead-2">The token files</h2>
        <FileList :files="groups.tokens" />

        <h2 class="type-subhead-2">The files that read the renamed tokens</h2>
        <p class="type-body">
          Not token files, but they changed because of one: <code>typography.body</code> became the Body role, so
          everything in UIDS that meant the paragraph style moved to <code>typography.paragraph</code>.
          <code>_paragraph.scss</code> also sets the intro classes from the roles.
        </p>
        <FileList :files="groups.readers" />

        <h2 class="type-subhead-2">The classes that apply the roles</h2>
        <FileList :files="groups.classes" />

        <h2 class="type-subhead-2">How every size is worked out from {{ count.tokens }} tokens</h2>
        <p class="type-body">
          The token file holds {{ count.tokens }} typography role tokens. Written as named sizes, before the switch to
          base + multiples, it held {{ count.named }}; most of that was repetition, each role's family, weight, line
          height and letter spacing written again in every hierarchy. What really changes by hierarchy is size:
          {{ count.styles }} role styles, {{ count.roles }} roles in {{ count.hierarchies }} hierarchies, and
          {{ count.gaps }} gaps.
        </p>
        <p class="type-body">
          No build code works those out. The token build is next's, unchanged: Style Dictionary writes each token as a
          custom property, the multiples included. The browser does the rest, in the classes above: a hierarchy class
          sets the base, and a role's size is the base times its multiple. A tool that needs the numbers, such as a
          Figma script, does the same sum: the hierarchy's body size times the role's multiple.
          <code>llms/typography.md</code> lists every style with the sum already done.
        </p>
      </div>
    `,
  }),
};
