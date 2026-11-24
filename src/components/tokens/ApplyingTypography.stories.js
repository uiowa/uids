import primitives from '../../tokens/primitives/typography.json';
import semantic from '../../tokens/semantic/typography.json';
import { HIERARCHIES, roleSpec } from './roleStyle';

// How to apply the type roles: the hierarchies and roles, the gaps, and the rules for rich text, body text and weights.
// The page itself is set in type-rich-text. Sizes come from the token files, and each role's "Use for" is its
// token description.
const T = semantic.typography;
const SIZE_NAMES = { 'x-small': 'X-Small', small: 'Small', medium: 'Medium', large: 'Large', 'x-large': 'X-Large' };
const round = (n) => Math.round(n * 100) / 100;
const capitalize = (text) => text[0].toUpperCase() + text.slice(1);
const afterColon = (text) => capitalize(text.split(': ')[1]);
const weightOf = (reference) => primitives.typography['font-weight'][reference.slice(1, -1).split('.').pop()].$value;

const HIERARCHY_ROWS = HIERARCHIES.map((size) => ({
  size,
  name: SIZE_NAMES[size],
  body: `${round(roleSpec('body', size).px)}px`,
}));

const emphasisWeight = weightOf(T['subhead-2'].fontWeightEmphasis.$value);

// A role's row in one hierarchy: its classes, the tokens it reads beyond the body size, and its face, weight, size and
// leading there. A role's own token group holds its multiple; a hierarchy group inside it holds what differs there.
const roleRow = (name, family, size, use = T[family].$description) => {
  const spec = roleSpec(family, size);
  const tokens = [`typography.${family}`];
  if (family === 'body') tokens.push(`typography.body.${size}.fontSize`);
  else if (T[family][size]?.lineHeight) tokens.push(`typography.${family}.${size}.lineHeight`);
  return { name, classes: [`type-${family}`], tokens, face: `${spec.face} ${spec.weight}`, size: `${spec.by}× · ${round(spec.px)}px / ${spec.leading}`, use };
};
const labelRow = (size) => {
  const spec = roleSpec('label', size);
  return { name: `Label ${SIZE_NAMES[size]}`, classes: [`type-label--${size}`], tokens: [`typography.label.${size}`], face: `${spec.face} ${spec.weight}`, size: `${round(spec.px)}px / ${spec.leading}` };
};
const roleGroups = (size) => {
  const subhead2 = roleRow('Subhead 2', 'subhead-2', size);
  return [
    {
      name: 'Titles and headings',
      rows: [
        roleRow('Eyebrow', 'eyebrow', size),
        roleRow('Headline', 'headline', size),
        roleRow('Headline 6×', 'headline-6x', size),
        roleRow('Headline 8×', 'headline-8x', size),
        roleRow('Subhead', 'subhead', size),
        subhead2,
        {
          ...subhead2,
          name: 'Subhead 2, emphasis',
          classes: ['type-subhead-2', 'type-subhead-2--emphasis'],
          tokens: ['typography.subhead-2.fontWeightEmphasis'],
          face: `${roleSpec('subhead-2', size).face} ${emphasisWeight}`,
          use: 'A heading set in Subhead 2, and the line that leads a details group, such as the date.',
        },
      ],
    },
    {
      name: 'Text',
      rows: [
        roleRow('Body', 'body', size, 'Paragraphs and running text. Its size names the hierarchy.'),
        roleRow('Small print', 'small-print', size, afterColon(T['small-print'].$description)),
      ],
    },
    { name: 'Labels: one set for every hierarchy', rows: ['large', 'medium', 'small'].map(labelRow), use: T.label.$description },
  ];
};

// One tab per hierarchy. UIDS's Tabs takes each panel as HTML, so the table is written as a string.
const escapeHtml = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const codes = (list) => list.map((text) => `<code class="at__class">${escapeHtml(text)}</code>`).join('');
const rolesPanel = (size) => {
  const name = SIZE_NAMES[size];
  const hierarchyClass = size === 'medium'
    ? '<code>type-scale--medium</code>, the default, which a piece doesn’t need'
    : `<code>type-scale--${size}</code> on the piece`;
  const rows = roleGroups(size).map((group) => [
    `<tr class="at__group"><th colspan="6" scope="colgroup">${escapeHtml(group.name)}</th></tr>`,
    ...group.rows.map((row, i) => {
      let use = '';
      if (row.use) use = `<td>${escapeHtml(row.use)}</td>`;
      else if (i === 0) use = `<td rowspan="${group.rows.length}">${escapeHtml(group.use)}</td>`;
      return `<tr><th scope="row">${escapeHtml(row.name)}</th><td>${codes(row.classes)}</td><td>${codes(row.tokens)}</td>`
        + `<td>${escapeHtml(row.face)}</td><td class="at__size">${escapeHtml(row.size)}</td>${use}</tr>`;
    }),
  ].join('')).join('');
  return `<div class="type-rich-text"><p>${name}: ${hierarchyClass}, and a body size of ${round(roleSpec('body', size).px)}px, `
    + `<code>typography.body.${size}.fontSize</code>. Each role's size is that body size times its multiple; the Labels are the same `
    + 'in every hierarchy.</p>'
    + `<div class="at__scroll" tabindex="0" role="region" aria-label="Roles on ${name}"><table class="type-small-print">`
    + '<thead><tr><th scope="col">Style</th><th scope="col">Class</th><th scope="col">Tokens</th><th scope="col">Face and weight</th>'
    + '<th scope="col">Size / leading</th><th scope="col">Use for</th></tr></thead>'
    + `<tbody>${rows}</tbody></table></div></div>`;
};
// Medium first and open, the others closed under it.
const ROLE_PANELS = ['medium', ...HIERARCHIES.filter((size) => size !== 'medium')]
  .map((size) => ({ title: SIZE_NAMES[size], open: size === 'medium', content: rolesPanel(size) }));

// The two gaps: each is a multiple of the body size, set by the hierarchy class as a custom property.
const GAP_ROWS = ['related', 'break'].map((gap) => ({
  name: capitalize(gap),
  property: `--uiowa-type-space-${gap}`,
  token: `typography.scale.${gap}`,
  multiple: T.scale[gap].$value,
  sizes: HIERARCHIES.map((size) => ({ size, px: round(roleSpec('body', size).px * T.scale[gap].$value) })),
  use: T.scale[gap].$description,
}));

const RICH_TEXT_CODE = `<div class="type-rich-text">
  <h2>Before you arrive</h2>
  <p>Check the venue and parking before you plan your route.</p>
  <h3>Parking</h3>
  <ul>
    <li>Visitor lots open at 9:00.</li>
    <li>Accessible spaces are next to each entrance.</li>
  </ul>
  <h4>By bus</h4>
  <p>Two routes stop outside the main doors.</p>
</div>`;

const HIERARCHY_CODE = `<section class="type-scale--large">
  <h2 class="type-headline">…</h2>
  <p class="type-body">…</p>
</section>`;
const FONTS_LINK = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Special+Gothic:wdth,wght@75,600&family=Zilla+Slab:wght@600&display=swap';

// Subhead 2's emphasis twice, set by its class and by strong. The markup under each example is the markup it renders.
const WEIGHT_PAIRS = [
  {
    verdict: 'do',
    label: 'Do',
    caption: 'The date leads the details, in Subhead 2’s emphasis weight from its class.',
    html: '<p class="type-subhead-2"><span class="type-subhead-2--emphasis">Thursday, April 9</span> · Iowa Memorial Union</p>',
  },
  {
    verdict: 'dont',
    label: 'Don’t',
    caption: 'The same weight from <code>strong</code>, which says the date is important, not that it leads the details.',
    html: '<p class="type-subhead-2"><strong>Thursday, April 9</strong> · Iowa Memorial Union</p>',
  },
];

const Pairs = {
  props: { pairs: { type: Array, required: true } },
  template: `
    <div class="at__pairs">
      <figure v-for="p in pairs" :key="p.verdict" :class="['at__card', 'at__card--' + p.verdict]">
        <p class="type-label--large at__verdict">{{ p.label }}</p>
        <div class="at__example" v-html="p.html"></div>
        <figcaption class="type-body at__caption" v-html="p.caption"></figcaption>
        <pre class="at__code"><code>{{ p.html }}</code></pre>
      </figure>
    </div>`,
};

const css = `
  .at { padding: var(--uiowa-space-300); max-width: 76rem; color: var(--uiowa-color-text-default); }
  /* type-rich-text sets the page's type and the gaps between its blocks; these are the boxes inside them. */
  .at :where(table, figure) { margin: 0; }
  .at > p { max-width: 72ch; }
  .at code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .at table { width: 100%; border-collapse: collapse; }
  /* Below the tables' width they scroll in their own box, not the page. */
  .at__scroll { overflow-x: auto; }
  .at__scroll table { min-width: 40rem; }
  .at th, .at td { text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100); border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: top; }
  .at th { font-weight: var(--uiowa-typography-font-weight-medium); }
  .at .at__group th { background: var(--uiowa-color-background-gray); }
  .at__tag { margin-left: 0.5em; color: var(--uiowa-color-neutral-500); }
  .at.at pre.at__code { padding: var(--uiowa-space-100) var(--uiowa-space-200); background: var(--uiowa-color-background-gray); white-space: pre-wrap; overflow-wrap: anywhere; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.8125rem; line-height: 1.5; }
  /* Do and Don't: side by side from 768, each a card with the status color across its top. */
  .at__pairs { display: grid; gap: var(--uiowa-space-200); }
  @media (min-width: 48rem) { .at__pairs { grid-template-columns: 1fr 1fr; } }
  .at__card { display: flex; flex-direction: column; border: 1px solid var(--uiowa-color-border-default); border-top: 4px solid; }
  .at__card--do { border-top-color: var(--uiowa-color-success); }
  .at__card--dont { border-top-color: var(--uiowa-color-danger); }
  .at.at .at__verdict { padding: var(--uiowa-space-100) var(--uiowa-space-200) 0; }
  .at__example { padding: var(--uiowa-space-200); }
  /* The caption takes the card's spare height, so the same example is the same height in both cards. */
  .at.at .at__caption { flex: 1; padding: 0 var(--uiowa-space-200) var(--uiowa-space-200); }
  .at__roles { display: grid; gap: var(--uiowa-space-100); }
  .at__roles summary { cursor: pointer; font-weight: var(--uiowa-typography-font-weight-medium); }
  .at__size { white-space: nowrap; }
  .at__class { display: block; white-space: nowrap; }
`;

export default {
  title: 'Tokens (typography)',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { source: { code: null } } },
};

export const ApplyingTypography = {
  name: 'Applying typography',
  render: () => ({
    components: { Pairs },
    setup() {
      return {
        css, hierarchies: HIERARCHY_ROWS, rolePanels: ROLE_PANELS, gapRows: GAP_ROWS, weightPairs: WEIGHT_PAIRS,
        richTextCode: RICH_TEXT_CODE,
        hierarchyCode: HIERARCHY_CODE, fontsLink: FONTS_LINK,
      };
    },
    template: `
      <component is="style">{{ css }}</component>
      <div class="at type-rich-text">
        <div class="type-eyebrow">Typography</div>
        <h1>Applying typography</h1>
        <p>
          Pick a hierarchy for the piece, then a role for each piece of text. This page covers the roles, how to set
          them in code, and the rules for rich text, body text and weights.
        </p>

        <h2>Hierarchies and roles</h2>
        <p>
          A piece's format picks its hierarchy, as the
          <a href="../?path=/story/tokens-typography--formats" target="_top">Formats</a> page lists, and the hierarchy
          sets the body size. Every other role is a multiple of the body, so use one hierarchy's roles together. In
          code, the hierarchy is a class on the piece and each role is a class on its text. Medium, for web pages and
          applications, is the default and needs no class.
        </p>
        <div class="at__scroll" tabindex="0" role="region" aria-label="Hierarchies">
        <table class="type-small-print">
          <thead><tr><th scope="col">Hierarchy</th><th scope="col">Class</th><th scope="col">Body</th></tr></thead>
          <tbody>
            <tr v-for="h in hierarchies" :key="h.size">
              <th scope="row">{{ h.name }}</th>
              <td><code>type-scale--{{ h.size }}</code><span v-if="h.size === 'medium'" class="at__tag">default</span></td>
              <td>{{ h.body }}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <p>The roles in each hierarchy, with their classes and tokens:</p>
        <div class="at__roles">
          <details v-for="panel in rolePanels" :key="panel.title" :open="panel.open">
            <summary>{{ panel.title }}</summary>
            <div v-html="panel.content"></div>
          </details>
        </div>
        <p>A section or a component can take its own hierarchy. The nearest hierarchy class wins:</p>
        <pre class="at__code"><code>{{ hierarchyCode }}</code></pre>
        <p>
          UIDS's stylesheets, uids.css and uids-core.css, have the classes but don't load the typefaces. Load Roboto,
          Special Gothic Condensed and Zilla Slab from Google Fonts with this link, which has every weight the styles use:
        </p>
        <pre class="at__code"><code>{{ fontsLink }}</code></pre>
        <p>
          Every size in every hierarchy is on the
          <a href="../?path=/story/tokens-typography--hierarchy" target="_top">Hierarchy</a> page.
        </p>

        <h2>Space</h2>
        <p>The hierarchy class also sets two gaps, each a multiple of its body size:</p>
        <div class="at__scroll" tabindex="0" role="region" aria-label="Gaps">
        <table class="type-small-print">
          <thead>
            <tr>
              <th scope="col">Gap</th><th scope="col">Custom property</th><th scope="col">Token</th><th scope="col" class="at__size">Body ×</th>
              <th v-for="h in hierarchies" :key="h.size" scope="col" class="at__size">{{ h.name }}</th>
              <th scope="col">Use for</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in gapRows" :key="g.token">
              <th scope="row">{{ g.name }}</th>
              <td><code class="at__class">{{ g.property }}</code></td>
              <td><code class="at__class">{{ g.token }}</code></td>
              <td>{{ g.multiple }}×</td>
              <td v-for="s in g.sizes" :key="s.size" class="at__size">{{ s.px }}px</td>
              <td>{{ g.use }}</td>
            </tr>
          </tbody>
        </table>
        </div>

        <h2>Rich text</h2>
        <p>
          Where an author picks only a heading level, as in a WYSIWYG editor, put the rich text inside
          <code>type-rich-text</code>. Its headings, paragraphs and lists then need no classes: each heading level takes
          its role in the document outline, and the text takes Body. This page is set that way, and the
          <a href="../?path=/story/tokens-typography--document-outline" target="_top">Document outline</a> page shows
          each level's role.
        </p>
        <pre class="at__code"><code>{{ richTextCode }}</code></pre>
        <p>
          Rich text takes the hierarchy it sits in: Medium, unless a hierarchy class on it or around it sets another. The
          class styles only its own children: components inside rich text keep their own styles, and a role class on a heading, such as
          <code>type-headline</code>, still wins. Between blocks the gap is Related; below the h1 and above a heading that
          starts a section, it's Break.
        </p>

        <h2>Body text</h2>
        <p>
          Body sets paragraphs and running text at the hierarchy's body size. Small print, three quarters of the body,
          sets credits, dates and fine print under it.
        </p>
        <p>
          Controls and captions take a Label: buttons, form labels, badges and bylines. The three Labels are one set for
          every hierarchy.
        </p>

        <h2>Weights and emphasis</h2>
        <p>
          Each role carries its weight, so use the classes rather than setting weights: 600 for the Eyebrow, the
          Headlines and the Subhead; 400 for Body, Small print and Subhead 2; 500 for the Labels.
        </p>
        <p>
          Subhead 2 has one emphasis, 500: a heading set in Subhead 2, and the line that leads a details group, such as
          the date. Set it with <code>type-subhead-2--emphasis</code>, on the element or on a span for part of a line. A
          style is a class, not a tag: keep <code>strong</code> and <code>b</code> for real emphasis.
        </p>
        <Pairs :pairs="weightPairs" />

        <h2>Visual hierarchy</h2>
        <p>
          Hierarchy comes from the steps between roles, each a multiple of the body: Headline 4×, Subhead 2×, Subhead 2
          and Eyebrow 1.5×, Body 1×, Small print 0.75×. The faces add to it: Special Gothic Condensed for the Headline and
          Eyebrow, Zilla Slab for the Subhead, Roboto for the rest. Within a piece the body size stays put. For a bigger
          statement, step the Headline to 6× or 8×; for density, drop roles rather than shrink the text.
        </p>
      </div>
    `,
  }),
};
