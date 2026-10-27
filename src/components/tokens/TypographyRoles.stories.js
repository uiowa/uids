import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import primitives from '../../tokens/primitives/typography.json';
import semantic from '../../tokens/semantic/typography.json';

/**
 * The typography roles, as the token files define them: six families (Headline, Eyebrow, Subhead, Subhead 2,
 * Body, Label) in Large, Medium and Small, every size a multiple of one reading size. Six pages:
 * Style Library (the 18 styles), Recipes (how a piece combines them, and the three compositions at
 * actual size), Web Page (one page under each recipe), Landing Page (one recipe per band),
 * Blog Post (one composition) and Before and After (today's styles beside the role each would take). Every specimen is set through the live custom properties the token
 * build ships, so the pages show what the build ships. The values printed beside them are read
 * from the token JSON.
 */

const FAMILIES = ['headline', 'eyebrow', 'subhead', 'subhead-2', 'body', 'label'];
const SIZES = ['large', 'medium', 'small'];
const CHANNELS = [
  ['font-family', 'fontFamily'],
  ['font-weight', 'fontWeight'],
  ['font-size', 'fontSize'],
  ['line-height', 'lineHeight'],
  ['letter-spacing', 'letterSpacing'],
];
const WEIGHT_NAMES = { 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 900: 'Black' };

// Token lookups. Both files share the typography root with no overlapping keys.
const TREE = { typography: { ...primitives.typography, ...semantic.typography } };
const at = (path) => path.split('.').reduce((node, key) => node?.[key], TREE);
const deref = (value) => (typeof value === 'string' && value.startsWith('{') ? deref(at(value.slice(1, -1)).$value) : value);
const READING_PX = deref('{typography.base.fontSize}').value * 16;
const round = (n) => String(Math.round(n * 100) / 100);
const titleCase = (key) => key.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

// A role's spec from the token files: face, weight, multiple, px at the reading size, leading.
function roleSpec(key) {
  // split on the last hyphen: a family key can carry one ('subhead-2')
  const cut = key.lastIndexOf('-');
  const family = key.slice(0, cut);
  const size = key.slice(cut + 1);
  const token = at(`typography.${family}.${size}`);
  const weight = deref(token.fontWeight.$value);
  return {
    key,
    name: titleCase(key),
    tokenName: `typography.${family}.${size}`,
    face: deref(token.fontFamily.$value)[0],
    weight,
    weightName: WEIGHT_NAMES[weight] || String(weight),
    by: token.fontSize.$extensions['edu.uiowa.multiply'].by,
    px: token.fontSize.$extensions['edu.uiowa.multiply'].by * READING_PX,
    leading: deref(token.lineHeight.$value),
  };
}
// A role's style, through the live custom properties.
const styleOf = (key) => Object.fromEntries(CHANNELS.map(([name, property]) => [property, `var(--uiowa-typography-${key}-${name})`]));
const roleIn = (family, size) => `${family}-${size}`;

const FAMILY_NOTES = {
  headline: 'The title: once per piece.',
  eyebrow: 'The label above a title, in uppercase; it names the composition. Also pre-title, kicker, caption (GOV.UK), detail (Spectrum). The Banner pre-title; not the Card pre-title, which is a Label.',
  subhead: 'The lead-in under a title, and section heads.',
  'subhead-2': 'Details and short headings.',
  body: 'Reading text.',
  label: 'Controls and captions. Not the eyebrow, which is its own role, nor small print, which is Body Small.',
};
const SPECIMEN = {
  headline: 'Lorem ipsum dolor sit',
  eyebrow: 'Lorem ipsum dolor',
  subhead: 'Sed do eiusmod tempor incididunt',
  'subhead-2': 'Ut enim ad minim veniam, quis nostrud',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

// A recipe names the style each content field takes. The ratio describes the result. The web page
// adds the fields a page has beyond a poster's four.
const RECIPES = {
  8: {
    id: 8,
    name: 'Hierarchy 8× · 8 : 2.5 : 2 : 1.25',
    when: 'A short title with room to spare.',
    eyebrow: 'eyebrow-large', title: 'headline-large', lead: 'subhead-large', details: 'subhead-2-large', text: 'body-large', small: 'body-small',
    h2: 'subhead-medium', h3: 'subhead-2-medium', h4: 'subhead-2-small', h5: 'label-large', h6: 'label-medium', cardTitle: 'subhead-2-medium', cardText: 'body-small', button: 'label-large', meta: 'label-medium',
  },
  6: {
    id: 6,
    name: 'Hierarchy 6× · 6 : 2.5 : 2 : 1.25',
    when: 'The working default.',
    eyebrow: 'eyebrow-large', title: 'headline-medium', lead: 'subhead-large', details: 'subhead-2-large', text: 'body-large', small: 'body-small',
    h2: 'subhead-medium', h3: 'subhead-2-medium', h4: 'subhead-2-small', h5: 'label-large', h6: 'label-medium', cardTitle: 'subhead-2-medium', cardText: 'body-small', button: 'label-large', meta: 'label-medium',
  },
  4: {
    id: 4,
    name: 'Hierarchy 4× · 4 : 2 : 1.25 : 1',
    when: 'A small format, or a long title.',
    eyebrow: 'eyebrow-medium', title: 'headline-small', lead: 'subhead-medium', details: 'subhead-2-small', text: 'body-medium', small: 'body-small',
    h2: 'subhead-small', h3: 'subhead-2-small', h4: 'label-large', h5: 'label-medium', h6: 'label-small', cardTitle: 'subhead-small', cardText: 'body-small', button: 'label-medium', meta: 'label-medium',
  },
};
const RECIPE_ORDER = [8, 6, 4];
const RECIPE_FIELDS = [['eyebrow', 'Eyebrow'], ['title', 'Title'], ['lead', 'Lead-in'], ['details', 'Details'], ['text', 'Reading text'], ['small', 'Small print']];
const PAGE_FIELDS = [
  ['eyebrow', 'Eyebrow (site name)'], ['title', 'Page title (h1)'], ['lead', 'Lead-in'], ['meta', 'Byline and date'], ['text', 'Reading text'],
  ['h2', 'Section head (h2)'], ['h3', 'Subsection head (h3)'], ['cardTitle', 'Card title'], ['cardText', 'Card text'], ['button', 'Button'],
];
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

// Reads what the browser rendered: each marked element's font size in px. The typography is CSS;
// this only reports it, after the fonts load and on any resize.
function useRendered(root, deps = []) {
  const rendered = ref({});
  const measure = () => {
    if (!root.value) return;
    const sizes = {};
    for (const el of root.value.querySelectorAll('[data-measure]')) sizes[el.dataset.measure] = parseFloat(getComputedStyle(el).fontSize);
    rendered.value = sizes;
  };
  let observer;
  onMounted(() => {
    measure();
    document.fonts?.ready.then(measure);
    observer = new ResizeObserver(measure);
    observer.observe(root.value);
  });
  onBeforeUnmount(() => observer?.disconnect());
  if (deps.length) watch(deps, () => nextTick(measure));
  return rendered;
}

// Special Gothic Condensed is not in UIDS yet; Google's Special Gothic at width 75 stands in for
// it, through the second name in the token's font stack.
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Special+Gothic:wdth,wght@75,600&display=swap');
  .tr { box-sizing: border-box; max-width: 1100px; margin: 0 auto; padding: 40px 24px 64px; color: var(--uiowa-color-neutral-800); font-family: var(--uiowa-typography-font-family-roboto); }
  .tr *, .tr *::before, .tr *::after { box-sizing: border-box; }
  /* The page examples take the standard container and the large tier's margin, as a site does. */
  .tr--standard { max-width: var(--uiowa-layout-container-max-standard); padding-left: var(--uiowa-layout-digital-large-margin); padding-right: var(--uiowa-layout-digital-large-margin); }
  .tr__eyebrow { margin: 0 0 6px; font-size: 0.75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .tr__title { margin: 0 0 12px; font: 700 2rem/1.2 var(--uiowa-typography-font-family-zilla-slab); color: var(--uiowa-color-neutral-900); }
  .tr__lede { margin: 0 0 12px; max-width: 70ch; font-size: 1.0625rem; line-height: 1.6; color: var(--uiowa-color-neutral-700); }
  .tr__lede b { color: var(--uiowa-color-neutral-900); }
  .tr__h2 { margin: 48px 0 8px; padding-bottom: 8px; border-bottom: 1px solid var(--uiowa-color-neutral-175); font: 700 1.5rem/1.25 var(--uiowa-typography-font-family-zilla-slab); color: var(--uiowa-color-neutral-900); }
  .tr__note { margin: 12px 0 0; max-width: 80ch; font-size: 0.8125rem; line-height: 1.5; color: var(--uiowa-color-neutral-500); }
  .tr__note code, .tr__cap code { font-family: var(--uiowa-font-family-mono, monospace); font-size: 0.9em; }
  .tr__table { width: 100%; margin: 12px 0 0; border-collapse: collapse; font-size: 0.875rem; }
  .tr__table th { padding: 8px 10px; border-bottom: 1px solid var(--uiowa-color-neutral-175); text-align: left; font-size: 0.6875rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .tr__table td { padding: 12px 10px; border-bottom: 1px solid var(--uiowa-color-neutral-150); vertical-align: top; color: var(--uiowa-color-neutral-700); }
  .tr__table td:first-child { color: var(--uiowa-color-neutral-900); }
  .tr__table strong { display: block; color: var(--uiowa-color-neutral-900); }
  .tr__table small { display: block; color: var(--uiowa-color-neutral-500); }
  .tr__cap { display: block; margin-top: 6px; font-size: 0.75rem; line-height: 1.5; color: var(--uiowa-color-neutral-500); }
  .tr__hl { background: var(--uiowa-color-gold); color: var(--uiowa-color-neutral-900); padding: 0 3px; }
  .tr__tag { display: inline-block; margin-left: 6px; padding: 1px 7px; border: 1px solid var(--uiowa-color-neutral-300); border-radius: 999px; font-size: 0.625rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--uiowa-color-neutral-700); vertical-align: middle; }

  /* Style Library */
  .tr__family { margin-top: 40px; }
  .tr__family-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 8px; border-bottom: 2px solid var(--uiowa-color-neutral-900); }
  .tr__family-name { margin: 0; font: 700 1.25rem/1.2 var(--uiowa-typography-font-family-zilla-slab); color: var(--uiowa-color-neutral-900); }
  .tr__family-face { font-size: 0.875rem; color: var(--uiowa-color-neutral-700); }
  .tr__family-use { font-size: 0.875rem; color: var(--uiowa-color-neutral-500); }
  .tr__row { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--uiowa-color-neutral-150); align-items: start; }
  .tr__side { font-size: 0.8125rem; line-height: 1.5; color: var(--uiowa-color-neutral-500); }
  .tr__side strong { display: block; font-size: 0.9375rem; color: var(--uiowa-color-neutral-900); }
  .tr__specimen { margin: 0; color: var(--uiowa-color-neutral-900); overflow-wrap: anywhere; }
  .tr__specimen--eyebrow, .tr__eb { text-transform: uppercase; letter-spacing: .04em; }

  /* Pills */
  .tr__pick { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 16px 0 8px; padding: 0; border: 0; }
  .tr__pick legend { float: left; margin-right: 6px; padding: 0; font-size: 0.875rem; color: var(--uiowa-color-neutral-500); }
  .tr__pick label { position: relative; display: inline-flex; align-items: center; gap: 6px; margin: 0; padding: 6px 14px; border: 1px solid var(--uiowa-color-neutral-175); border-radius: 999px; font-size: 0.875rem; line-height: 1.2; color: var(--uiowa-color-neutral-800); cursor: pointer; }
  .tr__pick label.on { background: var(--uiowa-color-neutral-800); border-color: var(--uiowa-color-neutral-800); color: var(--uiowa-color-neutral-0); }
  .tr__pick label:has(input:focus-visible) { outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }
  .tr__pick input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
  .tr__pick small { opacity: .7; }

  /* Compositions and the page: spacing is the two space tokens. */
  .tr__fig { margin: 32px 0 0; }
  .tr__fig figcaption { margin-bottom: 8px; font-size: 0.9375rem; font-weight: 700; color: var(--uiowa-color-neutral-900); }
  .tr__fig figcaption span { display: block; font-weight: 400; color: var(--uiowa-color-neutral-500); }
  /* Every block of text is trimmed to its cap height and baseline (text-box), so a gap is exactly its
     token: typography.space.related (1.5x) or typography.space.break (2x). On the Recipes page the
     gaps are blocks the Spacing toggle tints and labels, scaled by the recipe's reading text
     (--tr-text-by: 1.25 where the text is Body Large); on the pages they are margins. */
  .tr__comp :is(h1, h2, h3, p), .tr__page :is(h1, h2, h3, p:not(:has(.tr__button))), .tr__card :is(h3, p:not(:has(.tr__button))) { text-box: trim-both cap alphabetic; }
  .tr__comp { display: flex; flex-direction: column; padding: 48px; box-shadow: inset 0 0 0 1px var(--uiowa-color-neutral-200); color: var(--uiowa-color-neutral-900); }
  .tr__comp > *, .tr__page > * { margin: 0; }
  .tr__comp > :not(.tr__gap) { position: relative; z-index: 1; }
  .tr__gap { display: flex; align-items: center; justify-content: center; height: calc(var(--uiowa-typography-space-related) * var(--tr-text-by, 1)); background: color-mix(in srgb, var(--uiowa-color-blue) 14%, transparent); font: 700 0.75rem/1 var(--uiowa-typography-font-family-roboto); color: var(--uiowa-color-neutral-900); }
  .tr__gap--break { height: calc(var(--uiowa-typography-space-break) * var(--tr-text-by, 1)); }
  .tr--hide .tr__gap { background: none; }
  .tr--hide .tr__gap span { visibility: hidden; }
  .tr__t { overflow-wrap: anywhere; }
  .tr__rule { width: 4.5rem; height: var(--uiowa-stroke-width-6, 6px); background: var(--uiowa-color-gold); }
  .tr__details strong { font-weight: 700; }
  .tr__text { max-width: 80ch; }

  .tr__page { padding: 48px; box-shadow: inset 0 0 0 1px var(--uiowa-color-neutral-200); color: var(--uiowa-color-neutral-900); }
  .tr__page > * + * { margin-top: var(--uiowa-typography-space-related); }
  .tr__page > .tr__t + * { margin-top: var(--uiowa-typography-space-break); }
  .tr__page > h2, .tr__page > .tr__cards { margin-top: var(--uiowa-typography-space-break); }
  .tr__page h1, .tr__page h2, .tr__page h3 { font-weight: inherit; }
  .tr__brand { text-transform: uppercase; letter-spacing: .06em; color: var(--uiowa-color-neutral-700); }
  .tr__meta { color: var(--uiowa-color-neutral-500); }
  .tr__cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
  .tr__card { padding: 24px; border: 1px solid var(--uiowa-color-neutral-175); }
  .tr__card > * { margin: 0; }
  .tr__card > * + * { margin-top: var(--uiowa-typography-space-related); }
  .tr__button { display: inline-block; padding: 10px 16px; border: 2px solid var(--uiowa-color-neutral-900); text-transform: uppercase; letter-spacing: .04em; color: var(--uiowa-color-neutral-900); }
  .tr__legend { margin: 12px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 4px 24px; font-size: 0.8125rem; color: var(--uiowa-color-neutral-700); }
  .tr__legend b { color: var(--uiowa-color-neutral-900); }

  /* Before and After */
  .tr__ba { display: grid; grid-template-columns: 130px minmax(0, 1fr) minmax(0, 1fr); gap: 0 20px; margin-top: 16px; }
  .tr__ba-col { padding: 0 0 8px; border-bottom: 2px solid var(--uiowa-color-neutral-900); font-size: 0.6875rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .tr__ba-label, .tr__ba-spec { padding: 20px 0; border-bottom: 1px solid var(--uiowa-color-neutral-150); min-width: 0; }
  .tr__ba-label { font-size: 0.9375rem; font-weight: 700; color: var(--uiowa-color-neutral-900); }
  .tr__ba-spec > span:first-child { display: block; color: var(--uiowa-color-neutral-900); overflow-wrap: anywhere; }
  .tr__next { margin: 12px 0 0; padding-left: 1.25rem; max-width: 80ch; font-size: 0.9375rem; line-height: 1.6; color: var(--uiowa-color-neutral-700); }
  .tr__next li + li { margin-top: 8px; }
  .tr__next b { color: var(--uiowa-color-neutral-900); }
`;

const SPECS = Object.fromEntries(FAMILIES.flatMap((family) => SIZES.map((size) => [roleIn(family, size), roleSpec(roleIn(family, size))])));
const specLine = (spec) => `${spec.face} ${spec.weightName} ${spec.weight} · ${spec.by}× · ${round(spec.px)}px · leading ${spec.leading}`;

export default {
  title: 'Tokens (roles)',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: null } },
  },
};

export const StyleLibrary = {
  name: 'Style Library',
  render: () => ({
    setup() {
      const families = FAMILIES.map((family) => ({
        family,
        name: titleCase(family),
        face: SPECS[roleIn(family, 'medium')].face,
        note: FAMILY_NOTES[family],
        sizes: SIZES.map((size) => ({ ...SPECS[roleIn(family, size)], size: titleCase(size), style: styleOf(roleIn(family, size)), text: SPECIMEN[family] })),
      }));
      return { css, families, readingPx: READING_PX };
    },
    template: `
      <div class="tr">
        <component is="style">{{ css }}</component>
        <p class="tr__eyebrow">Typography roles</p>
        <h1 class="tr__title">Style Library</h1>
        <p class="tr__lede">
          <b>Six families, each in three sizes: eighteen styles.</b> A style fixes the typeface, weight,
          size and leading. Every size is a multiple of the reading size, Body Medium, {{ readingPx }}px
          (<code>typography.base.fontSize</code>), so changing that one token resizes them all. Headline and
          Eyebrow are Special Gothic Condensed, Subhead is Zilla Slab, and Subhead 2, Body and Label are Roboto.
        </p>
        <p class="tr__lede">
          Each specimen is set through the live custom properties the token build ships
          (<code>--uiowa-typography-&lt;family&gt;-&lt;size&gt;-*</code>); the values beside it are read
          from the token files. No component uses the roles yet.
        </p>
        <section v-for="f in families" :key="f.family" class="tr__family">
          <header class="tr__family-head">
            <h2 class="tr__family-name">{{ f.name }}</h2>
            <span class="tr__family-face">{{ f.face }}</span>
            <span class="tr__family-use">{{ f.note }}</span>
          </header>
          <div v-for="s in f.sizes" :key="s.key" class="tr__row">
            <div class="tr__side">
              <strong>{{ s.size }}</strong>
              {{ s.by }}× · {{ round(s.px) }}px<br>
              {{ s.weightName }} {{ s.weight }} · leading {{ s.leading }}<br>
              <code>{{ s.tokenName }}</code>
            </div>
            <p :class="['tr__specimen', { 'tr__specimen--eyebrow': f.family === 'eyebrow' }]" :style="s.style">{{ s.text }}</p>
          </div>
        </section>
        <p class="tr__note">
          Special Gothic Condensed is not in UIDS yet; here Google's Special Gothic at width 75 stands in
          through the second name in the token's font stack. Sizes are fixed at the reading size; fluid
          sizing for the web is a next step (see Web Page).
        </p>
      </div>
    `,
    methods: { round },
  }),
};

export const Recipes = {
  name: 'Recipes',
  render: () => ({
    setup() {
      const recipes = RECIPE_ORDER.map((id) => RECIPES[id]).map((r) => ({
        ...r,
        fields: RECIPE_FIELDS.map(([field, label]) => ({ field, label, spec: SPECS[r[field]] })),
        styles: Object.fromEntries(RECIPE_FIELDS.map(([field]) => [field, styleOf(r[field])])),
        summary: RECIPE_FIELDS.map(([field]) => SPECS[r[field]].name).join(' · '),
        // The gaps follow the recipe's reading text: the space tokens times its multiple of the reading size.
        textBy: SPECS[r.text].by,
        related: `1.5× · ${round(READING_PX * 1.5 * SPECS[r.text].by)}px`,
        breakGap: `2× · ${round(READING_PX * 2 * SPECS[r.text].by)}px`,
      }));
      const gaps = ref(true);
      return { css, recipes, fields: RECIPE_FIELDS, gaps };
    },
    template: `
      <div class="tr">
        <component is="style">{{ css }}</component>
        <p class="tr__eyebrow">Typography roles</p>
        <h1 class="tr__title">Recipes</h1>
        <p class="tr__lede">
          <b>A recipe names the style each content field takes.</b> The ratio describes the result; it is
          not a setting anyone adjusts, and recipes are compositions, not tokens. Three are proposed.
          Hierarchy 6× (6 : 2.5 : 2 : 1.25) is the working default; 8× (8 : 2.5 : 2 : 1.25) suits a short title with room
          to spare; 4× (4 : 2 : 1.25 : 1) suits a small format or a long title. The reading size never changes.
        </p>
        <table class="tr__table">
          <thead><tr><th>Field</th><th v-for="r in recipes" :key="r.id">{{ r.name }}</th></tr></thead>
          <tbody>
            <tr v-for="([field, label]) in fields" :key="field">
              <td>{{ label }}</td>
              <td v-for="r in recipes" :key="r.id"><strong>{{ r.fields.find(f => f.field === field).spec.name }}</strong><small>{{ r.fields.find(f => f.field === field).spec.by }}× · {{ round(r.fields.find(f => f.field === field).spec.px) }}px</small></td>
            </tr>
            <tr><td>Use when</td><td v-for="r in recipes" :key="r.id">{{ r.when }}</td></tr>
          </tbody>
        </table>

        <h2 class="tr__h2">The recipes at actual size</h2>
        <p class="tr__lede">The same composition three times, at full size in this column, with the same placeholder text. Only the six styles change. The gap below the title and the one above the small print are <code>typography.space.break</code> (2×); every other gap, including the one under the eyebrow, is <code>typography.space.related</code> (1.5×). Both are multiples of the recipe's reading text: on Hierarchy 4× that is Body Medium, the reading size, so the gaps are the two tokens as they stand; on 8× and 6× it is Body Large, so the gaps are the tokens times 1.25. Each block of text is trimmed to its cap height and baseline (<code>text-box: trim-both cap alphabetic</code>), so a gap is exactly its number.</p>
        <fieldset class="tr__pick"><legend>Spacing</legend>
          <label :class="{ on: gaps }"><input type="radio" name="tr-gaps" :value="true" v-model="gaps"> Show</label>
          <label :class="{ on: !gaps }"><input type="radio" name="tr-gaps" :value="false" v-model="gaps"> Hide</label>
        </fieldset>
        <figure v-for="r in recipes" :key="r.id" class="tr__fig">
          <figcaption>{{ r.name }} <span>{{ r.summary }}</span></figcaption>
          <div :class="['tr__comp', { 'tr--hide': !gaps }]" :style="{ '--tr-text-by': r.textBy }">
            <p class="tr__eb" :style="r.styles.eyebrow">Lorem ipsum</p>
            <div class="tr__gap"><span>{{ r.related }}</span></div>
            <p class="tr__t" :style="r.styles.title">Lorem ipsum dolor sit amet consectetur</p>
            <div class="tr__gap tr__gap--break"><span>{{ r.breakGap }}</span></div>
            <div class="tr__rule" aria-hidden="true"></div>
            <div class="tr__gap"><span>{{ r.related }}</span></div>
            <p :style="r.styles.lead">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div class="tr__gap"><span>{{ r.related }}</span></div>
            <p class="tr__details" :style="r.styles.details"><strong>Lorem ipsum, 00 dolor sit, 0 amet</strong><br>Consectetur adipiscing, Elit sed</p>
            <div class="tr__gap"><span>{{ r.related }}</span></div>
            <p class="tr__text" :style="r.styles.text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
            <div class="tr__gap tr__gap--break"><span>{{ r.breakGap }}</span></div>
            <p class="tr__text" :style="r.styles.small">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </figure>
        <p class="tr__note">When content exceeds a recipe, switch to the next one down or shorten the copy; don't shrink a style by hand. A six-word title runs to three lines at Hierarchy 8× in this column, which is why Hierarchy 6× is the default.</p>
      </div>
    `,
    methods: { round },
  }),
};

export const WebPage = {
  name: 'Web Page',
  render: () => ({
    setup() {
      const picked = ref(6);
      const recipe = computed(() => RECIPES[picked.value]);
      const style = (field) => styleOf(recipe.value[field]);
      const legend = computed(() => PAGE_FIELDS.map(([field, label]) => ({ field, label, spec: SPECS[recipe.value[field]] })));
      const root = ref(null);
      const rendered = useRendered(root, [picked]);
      return { css, recipes: RECIPE_ORDER.map((id) => RECIPES[id]), picked, recipe, style, legend, root, rendered, lorem: LOREM, readingPx: READING_PX };
    },
    template: `
      <div class="tr tr--standard" ref="root">
        <component is="style">{{ css }}</component>
        <p class="tr__eyebrow">Typography roles</p>
        <h1 class="tr__title">Web Page</h1>
        <p class="tr__lede">
          <b>One page, under each recipe.</b> A page has more fields than a poster: section and subsection
          heads, a byline, cards, a button. Each recipe assigns every one of them a style, so the author
          chooses a recipe and never a size. Choose one; the page below is set in the standard container
          (<code>layout.container.max.standard</code>, 1310px) at the fixed reading size of {{ readingPx }}px.
        </p>
        <fieldset class="tr__pick"><legend>Recipe</legend>
          <label v-for="r in recipes" :key="r.id" :class="{ on: picked === r.id }">
            <input type="radio" name="tr-recipe" :value="r.id" v-model="picked"> {{ r.name }} <small v-if="r.id === 6">(default)</small>
          </label>
        </fieldset>
        <ul class="tr__legend">
          <li v-for="l in legend" :key="l.field"><b>{{ l.label }}</b> · {{ l.spec.name }} · {{ round(rendered[l.field] || l.spec.px) }}px</li>
        </ul>

        <article class="tr__page">
          <p class="tr__brand" :style="style('eyebrow')" data-measure="eyebrow">The Site Name</p>
          <h1 class="tr__t" :style="style('title')" data-measure="title">Lorem ipsum dolor sit amet consectetur</h1>
          <p :style="style('lead')" data-measure="lead">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p class="tr__meta" :style="style('meta')" data-measure="meta">By Lorem Ipsum · 00 Dolor 0000 · 4 min read</p>
          <p class="tr__text" :style="style('text')" data-measure="text">{{ lorem }}</p>
          <h2 :style="style('h2')" data-measure="h2">Ut enim ad minim veniam</h2>
          <p class="tr__text" :style="style('text')">{{ lorem }}</p>
          <h3 :style="style('h3')" data-measure="h3">Quis nostrud exercitation ullamco</h3>
          <p class="tr__text" :style="style('text')">{{ lorem }}</p>
          <p class="tr__details" :style="style('details')" data-measure="details"><strong>Lorem ipsum, 00 dolor sit, 0 amet</strong><br>Consectetur adipiscing, Elit sed</p>
          <div class="tr__cards">
            <div class="tr__card" v-for="n in 2" :key="n">
              <p :style="style('cardTitle')" data-measure="cardTitle">Duis aute irure dolor</p>
              <p :style="style('cardText')" data-measure="cardText">In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p><span class="tr__button" :style="style('button')">Lorem ipsum</span></p>
            </div>
          </div>
        </article>
        <p class="tr__note">
          Sizes are fixed, so the Hierarchy 8× and 6× titles are poster sizes on a phone.
          The next step for the web is a fluid reading size, or a Headline that clamps between its Small and
          its recipe's size over the 600 to 1310px range today's headings use. The archived Clamp pages
          prototype one way.
        </p>
      </div>
    `,
    methods: { round },
  }),
};

// Landing Page: one recipe per band. The banner carries the page's title, so it takes Hierarchy 8×;
// the sections in the middle take Hierarchy 6×; the listing at the end takes Hierarchy 4×. Inside a
// band, the band's heading takes the recipe's Title field and its items take the smaller fields, so
// a recipe is chosen once per band and never per element.
const BANDS = [
  { key: 'banner', name: 'Banner', recipe: 8 },
  { key: 'section', name: 'Section', recipe: 6 },
  { key: 'split', name: 'Section', recipe: 6 },
  { key: 'listing', name: 'Listing', recipe: 4 },
];
const LANDING = {
  nav: ['Lorem', 'Ipsum', 'Dolor', 'Sit amet'],
  banner: { eyebrow: 'Lorem ipsum', title: 'Lorem ipsum dolor sit', lead: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt.', details: 'Lorem ipsum · 00 dolor 0000' },
  section: { title: 'Sed do eiusmod tempor', lead: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.', columns: ['Lorem ipsum dolor', 'Sit amet elit', 'Consectetur adipiscing'] },
  split: { title: 'Duis aute irure dolor', text: 'In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.' },
  listing: {
    title: 'Lorem ipsum et eventus',
    lead: 'Sunt in culpa qui officia deserunt mollit anim id est laborum.',
    items: [
      { title: 'Mollit anim id est laborum', meta: 'Lorem 00, 0000 · Dolor sit' },
      { title: 'Excepteur sint occaecat cupidatat', meta: 'Lorem 00, 0000 · Amet elit' },
      { title: 'Nisi ut aliquip ex ea commodo', meta: 'Lorem 00, 0000 · Consectetur' },
    ],
  },
};
const lpCss = `
  .lp { color: var(--uiowa-color-neutral-900); font-family: var(--uiowa-typography-font-family-roboto); }
  .lp *, .lp *::before, .lp *::after { box-sizing: border-box; }
  .lp__in { max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 0 var(--uiowa-layout-digital-large-margin); }
  .lp__head { max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 32px var(--uiowa-layout-digital-large-margin) 0; }
  .lp__band { position: relative; padding: var(--uiowa-layout-space-section, 48px) 0; }
  .lp__band--gray { background: var(--uiowa-color-neutral-100); }
  .lp__band--line { border-top: 1px solid var(--uiowa-color-neutral-150); }
  .lp__tag { position: absolute; top: 12px; right: var(--uiowa-layout-digital-large-margin); font-size: 0.6875rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .lp__nav { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; padding: 16px 0; border-bottom: 1px solid var(--uiowa-color-neutral-175); }
  .lp__nav a { color: inherit; text-decoration: none; }
  .lp__brand { text-transform: uppercase; letter-spacing: .06em; font-weight: 700; }
  .lp__links { display: flex; gap: 20px; margin-left: auto; }
  .lp__stack > * { margin: 0; }
  .lp__stack :is(h1, h2, h3, p:not(:has(.lp__link))) { text-box: trim-both cap alphabetic; }
  .lp__stack > * + * { margin-top: var(--uiowa-typography-space-related); }
  .lp__stack > .lp__t + * { margin-top: var(--uiowa-typography-space-break); }
  .lp__t { overflow-wrap: anywhere; font-weight: inherit; }
  .lp__two { display: grid; grid-template-columns: 3fr 2fr; gap: var(--uiowa-layout-space-section); align-items: center; }
  .lp__two--flip { grid-template-columns: 2fr 3fr; }
  .lp__two--flip > :first-child { order: 2; }
  .lp__art { aspect-ratio: 4 / 3; display: grid; place-items: center; background: var(--uiowa-color-neutral-150); color: var(--uiowa-color-neutral-500); font-size: 0.75rem; letter-spacing: .08em; text-transform: uppercase; }
  .lp__eyebrow { margin: 0 0 var(--uiowa-typography-space-related); text-transform: uppercase; letter-spacing: .04em; text-box: trim-both cap alphabetic; }
  .lp__banner-title { margin: 0 0 var(--uiowa-typography-space-break); }
  .lp__center { text-align: center; max-width: 60rem; margin: 0 auto; }
  .lp__cols, .lp__cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--uiowa-layout-digital-large-gutter); margin-top: var(--uiowa-typography-space-break); }
  .lp__card { padding: 24px; background: var(--uiowa-color-neutral-0); border: 1px solid var(--uiowa-color-neutral-175); }
  .lp__btns { display: flex; flex-wrap: wrap; gap: 12px; }
  .lp__btn { display: inline-block; padding: 10px 18px; background: var(--uiowa-color-gold); color: var(--uiowa-color-neutral-900); text-decoration: none; text-transform: uppercase; letter-spacing: .04em; }
  .lp__btn--plain { background: transparent; box-shadow: inset 0 0 0 2px var(--uiowa-color-neutral-900); }
  .lp__meta { color: var(--uiowa-color-neutral-500); }
  .lp__link { color: var(--uiowa-color-link-default, var(--uiowa-color-neutral-900)); text-decoration: underline; text-underline-offset: .15em; }
  .lp__legend { margin: 12px 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px 28px; font-size: 0.8125rem; color: var(--uiowa-color-neutral-700); }
  .lp__legend b { color: var(--uiowa-color-neutral-900); }
  @media (max-width: 760px) { .lp__two, .lp__cols, .lp__cards { grid-template-columns: 1fr; } .lp__two--flip > :first-child { order: 0; } }
`;

export const LandingPage = {
  name: 'Landing Page',
  render: () => ({
    setup() {
      // Each band's styles come from its recipe. The nav strip has no recipe: it is a label.
      const bandStyles = (recipe) => ({
        eyebrow: styleOf(RECIPES[recipe].eyebrow),
        title: styleOf(RECIPES[recipe].title),
        lead: styleOf(RECIPES[recipe].lead),
        details: styleOf(RECIPES[recipe].details),
        text: styleOf(RECIPES[recipe].text),
        h3: styleOf(RECIPES[recipe].h3),
        cardTitle: styleOf(RECIPES[recipe].cardTitle),
        cardText: styleOf(RECIPES[recipe].cardText),
        button: styleOf(RECIPES[recipe].button),
        meta: styleOf(RECIPES[recipe].meta),
      });
      const b = Object.fromEntries(BANDS.map((band) => [band.key, { ...band, tag: `${RECIPES[band.recipe].name} · ${band.name}`, s: bandStyles(band.recipe) }]));
      const legend = [8, 6, 4].map((id) => ({
        id,
        name: RECIPES[id].name,
        where: id === 8 ? 'banner' : id === 6 ? 'sections' : 'listing',
        heading: SPECS[RECIPES[id].title],
        item: SPECS[id === 4 ? RECIPES[id].cardTitle : RECIPES[id].h3],
      }));
      return { css, lpCss, L: LANDING, b, legend, nav: styleOf('label-large'), LOREM };
    },
    template: `
      <div class="lp">
        <component is="style">{{ css }}{{ lpCss }}</component>
        <div class="lp__head">
          <p class="tr__eyebrow">Typography roles</p>
          <h1 class="tr__title">Landing Page</h1>
          <p class="tr__lede">
            <b>One recipe per band.</b> The banner carries the page's title, so it takes Hierarchy 8×. The
            sections in the middle take Hierarchy 6×. The listing at the end takes Hierarchy 4×. Inside a band,
            the heading takes the recipe's Title style and the items take its smaller styles, so a recipe is
            chosen once per band and never per element. The page is the standard container
            (<code>layout.container.max.standard</code>, 1310px) with the large tier's margin and gutter,
            at the fixed reading size, in lorem ipsum.
          </p>
          <ul class="lp__legend">
            <li v-for="l in legend" :key="l.id"><b>{{ l.name }}</b> · {{ l.where }} · heading {{ l.heading.name }} {{ round(l.heading.px) }}px · items {{ l.item.name }} {{ round(l.item.px) }}px</li>
          </ul>
        </div>

        <div class="lp__in">
          <nav class="lp__nav" aria-label="Site">
            <a href="#" class="lp__brand" :style="nav" @click.prevent>Lorem Ipsum</a>
            <span class="lp__links"><a v-for="link in L.nav" :key="link" href="#" :style="nav" @click.prevent>{{ link }}</a></span>
            <a href="#" class="lp__btn lp__btn--plain" :style="nav" @click.prevent>Dolor</a>
          </nav>
        </div>

        <section class="lp__band">
          <span class="lp__tag">{{ b.banner.tag }}</span>
          <div class="lp__in">
            <p class="lp__eyebrow" :style="b.banner.s.eyebrow">{{ L.banner.eyebrow }}</p>
            <h1 class="lp__t lp__banner-title" :style="b.banner.s.title">{{ L.banner.title }}</h1>
          </div>
          <div class="lp__in lp__two">
            <div class="lp__stack">
              <p :style="b.banner.s.lead">{{ L.banner.lead }}</p>
              <p :style="b.banner.s.details">{{ L.banner.details }}</p>
              <span class="lp__btns">
                <a href="#" class="lp__btn" :style="b.banner.s.button" @click.prevent>Lorem ipsum</a>
                <a href="#" class="lp__btn lp__btn--plain" :style="b.banner.s.button" @click.prevent>Dolor sit</a>
              </span>
            </div>
            <div class="lp__art">Image</div>
          </div>
        </section>

        <section class="lp__band lp__band--gray">
          <span class="lp__tag">{{ b.section.tag }}</span>
          <div class="lp__in">
            <div class="lp__stack lp__center">
              <h2 class="lp__t" :style="b.section.s.title">{{ L.section.title }}</h2>
              <p :style="b.section.s.lead">{{ L.section.lead }}</p>
            </div>
            <div class="lp__cols">
              <div v-for="title in L.section.columns" :key="title" class="lp__stack">
                <h3 :style="b.section.s.h3">{{ title }}</h3>
                <p :style="b.section.s.text">{{ LOREM }}</p>
                <p><a href="#" class="lp__link" :style="b.section.s.button" @click.prevent>Lorem ipsum</a></p>
              </div>
            </div>
          </div>
        </section>

        <section class="lp__band">
          <span class="lp__tag">{{ b.split.tag }}</span>
          <div class="lp__in lp__two lp__two--flip">
            <div class="lp__stack">
              <h2 class="lp__t" :style="b.split.s.title">{{ L.split.title }}</h2>
              <p :style="b.split.s.text">{{ L.split.text }}</p>
              <span class="lp__btns"><a href="#" class="lp__btn" :style="b.split.s.button" @click.prevent>Lorem ipsum</a></span>
            </div>
            <div class="lp__art">Image</div>
          </div>
        </section>

        <section class="lp__band lp__band--line">
          <span class="lp__tag">{{ b.listing.tag }}</span>
          <div class="lp__in">
            <div class="lp__stack">
              <h2 class="lp__t" :style="b.listing.s.title">{{ L.listing.title }}</h2>
              <p :style="b.listing.s.lead">{{ L.listing.lead }}</p>
            </div>
            <div class="lp__cards">
              <article v-for="item in L.listing.items" :key="item.title" class="lp__card lp__stack">
                <p class="lp__meta" :style="b.listing.s.meta">{{ item.meta }}</p>
                <h3 :style="b.listing.s.cardTitle">{{ item.title }}</h3>
                <p :style="b.listing.s.cardText">{{ LOREM }}</p>
                <p><a href="#" class="lp__link" :style="b.listing.s.button" @click.prevent>Lorem ipsum</a></p>
              </article>
            </div>
          </div>
        </section>
      </div>
    `,
    methods: { round },
  }),
};

// Blog Post: an article is one composition. One recipe for the whole page, in the standard container,
// and the headings step down inside it: h1 Headline, h2 Subhead, h3 Subhead 2, then h4 to h6 on the
// small styles in Bold, the rows Before and After marks open.
const BLOG_OUTLINE = [
  ['h2', 'Ut enim ad minim veniam'], ['p'], ['h3', 'Quis nostrud exercitation ullamco'], ['p'],
  ['h4', 'Laboris nisi ut aliquip'], ['p'], ['h5', 'Ex ea commodo consequat'], ['p'], ['h6', 'Duis aute irure dolor'], ['p'],
];
const bpCss = `
  .bp__in { max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 0 var(--uiowa-layout-digital-large-margin) var(--uiowa-layout-space-section); color: var(--uiowa-color-neutral-900); font-family: var(--uiowa-typography-font-family-roboto); }
  .bp__in *, .bp__in *::before, .bp__in *::after { box-sizing: border-box; }
  .bp__head { max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 32px var(--uiowa-layout-digital-large-margin) 0; }
  .bp__post { padding-top: var(--uiowa-layout-space-section); border-top: 1px solid var(--uiowa-color-neutral-175); }
  .bp__post > * { margin: 0; font-weight: inherit; }
  .bp__post :is(h1, h2, h3, h4, h5, h6, p) { text-box: trim-both cap alphabetic; }
  .bp__post > * + * { margin-top: var(--uiowa-typography-space-related); }
  .bp__post > .bp__t + *, .bp__post > h2 { margin-top: var(--uiowa-typography-space-break); }
  .bp__t { overflow-wrap: anywhere; }
  .bp__blog { text-transform: uppercase; letter-spacing: .06em; color: var(--uiowa-color-neutral-700); }
  .bp__meta { color: var(--uiowa-color-neutral-500); }
  .bp__small { font-weight: 700 !important; }
  .bp__text { max-width: 70ch; }
`;

export const BlogPost = {
  name: 'Blog Post',
  render: () => ({
    setup() {
      const picked = ref(6);
      const recipe = computed(() => RECIPES[picked.value]);
      const style = (field) => styleOf(recipe.value[field]);
      const fields = [['eyebrow', 'eyebrow'], ['title', 'h1'], ['lead', 'intro'], ['meta', 'byline'], ['text', 'text'], ['h2', 'h2'], ['h3', 'h3'], ['h4', 'h4'], ['h5', 'h5'], ['h6', 'h6']];
      const legend = computed(() => fields.map(([field, label]) => ({ field, label, spec: SPECS[recipe.value[field]] })));
      const outline = BLOG_OUTLINE.map(([tag, text], i) => ({ key: i, tag, text }));
      return { css, bpCss, recipes: RECIPE_ORDER.map((id) => RECIPES[id]), picked, style, legend, outline, lorem: LOREM };
    },
    template: `
      <div class="bp">
        <component is="style">{{ css }}{{ bpCss }}</component>
        <div class="bp__head">
          <p class="tr__eyebrow">Typography roles</p>
          <h1 class="tr__title">Blog Post</h1>
          <p class="tr__lede">
            <b>An article is one composition.</b> One recipe for the whole page, and the headings step down
            inside it: the h1 is Headline, the h2 Subhead, the h3 Subhead 2, and h4 to h6 take the small styles
            in Bold. Hierarchy 6× is the default, as everywhere; Hierarchy 4× is the step down for a long title
            or a dense page. The post sits in the standard container (<code>layout.container.max.standard</code>,
            1310px); the reading text keeps its own measure.
          </p>
          <fieldset class="tr__pick"><legend>Recipe</legend>
            <label v-for="r in recipes" :key="r.id" :class="{ on: picked === r.id }">
              <input type="radio" name="bp-recipe" :value="r.id" v-model="picked"> {{ r.name }} <small v-if="r.id === 6">(default)</small>
            </label>
          </fieldset>
          <ul class="tr__legend">
            <li v-for="l in legend" :key="l.field"><b>{{ l.label }}</b> · {{ l.spec.name }} · {{ round(l.spec.px) }}px</li>
          </ul>
        </div>
        <div class="bp__in">
          <article class="bp__post">
            <p class="bp__blog" :style="style('eyebrow')">The Blog</p>
            <h1 class="bp__t" :style="style('title')">Lorem ipsum dolor sit amet consectetur</h1>
            <p class="bp__meta" :style="style('meta')">By Lorem Ipsum · 00 Dolor 0000 · 4 min read</p>
            <p :style="style('lead')">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="bp__text" :style="style('text')">{{ lorem }}</p>
            <template v-for="o in outline" :key="o.key">
              <p v-if="o.tag === 'p'" class="bp__text" :style="style('text')">{{ lorem }}</p>
              <h2 v-else-if="o.tag === 'h2'" :style="style('h2')">{{ o.text }}</h2>
              <h3 v-else-if="o.tag === 'h3'" :style="style('h3')">{{ o.text }}</h3>
              <h4 v-else-if="o.tag === 'h4'" class="bp__small" :style="style('h4')">{{ o.text }}</h4>
              <h5 v-else-if="o.tag === 'h5'" class="bp__small" :style="style('h5')">{{ o.text }}</h5>
              <h6 v-else class="bp__small" :style="style('h6')">{{ o.text }}</h6>
            </template>
          </article>
        </div>
      </div>
    `,
    methods: { round },
  }),
};


// Today's styles, and the role each would take: the nearest in size, with the face the role carries.
// A composite today is one token with five channels; body is five tokens; the two sizes are a size
// alone on body. open: a row the mapping has not settled.
const TODAY = [
  { name: 'Heading 1', key: 'heading-h1', token: 'typography.heading.h1', role: 'headline-small' },
  { name: 'Heading 2', key: 'heading-h2', token: 'typography.heading.h2', role: 'subhead-medium' },
  { name: 'Heading 3', key: 'heading-h3', token: 'typography.heading.h3', role: 'subhead-2-medium' },
  { name: 'Heading 4', key: 'heading-h4', token: 'typography.heading.h4', role: 'subhead-2-small', open: true },
  { name: 'Heading 5', key: 'heading-h5', token: 'typography.heading.h5', role: 'label-large', open: true },
  { name: 'Heading 6', key: 'heading-h6', token: 'typography.heading.h6', role: 'label-medium', open: true },
  { name: 'Intro bold', key: 'intro-bold', token: 'typography.intro-bold', role: 'subhead-small' },
  { name: 'Intro light', key: 'intro-light', token: 'typography.intro-light', role: 'body-large' },
  { name: 'Body', key: 'body', token: 'typography.body', role: 'body-medium' },
  { name: 'Size large', key: 'body', sizeKey: 'size-large', token: 'typography.size.large', role: 'body-large' },
  { name: 'Size small', key: 'body', sizeKey: 'size-small', token: 'typography.size.small', role: 'label-small' },
];
function todaySpec(row) {
  const token = at(row.token);
  const composite = token.$value && typeof token.$value === 'object' ? token.$value : null;
  const channel = (name) => (composite ? composite[name] : token[name]?.$value);
  const bodyChannel = (name) => at('typography.body')[name].$value;
  const weight = deref(row.sizeKey ? bodyChannel('fontWeight') : channel('fontWeight'));
  const style = styleOf(row.key);
  if (row.sizeKey) style.fontSize = `var(--uiowa-typography-${row.sizeKey})`;
  return {
    face: deref(row.sizeKey ? bodyChannel('fontFamily') : channel('fontFamily'))[0],
    weight,
    weightName: WEIGHT_NAMES[weight] || String(weight),
    leading: deref(row.sizeKey ? bodyChannel('lineHeight') : channel('lineHeight')),
    style,
  };
}

export const BeforeAndAfter = {
  name: 'Before and After',
  render: () => ({
    setup() {
      const root = ref(null);
      const rendered = useRendered(root);
      const rows = TODAY.map((row) => {
        const before = todaySpec(row);
        const after = SPECS[row.role];
        return {
          ...row,
          before,
          after: { ...after, style: styleOf(row.role) },
          changed: { face: before.face !== after.face, weight: before.weight !== after.weight, leading: before.leading !== after.leading },
        };
      });
      return { css, rows, root, rendered, readingPx: READING_PX };
    },
    template: `
      <div class="tr" ref="root">
        <component is="style">{{ css }}</component>
        <p class="tr__eyebrow">Typography roles</p>
        <h1 class="tr__title">Before and After</h1>
        <p class="tr__lede">
          <b>What the roles change.</b> Styles are named for their job, not a tag, so an h2 can look the
          way its job needs without borrowing another tag's style. One scale covers all text: banners,
          cards, buttons, form labels and badges, which set their own sizes in component CSS today, get
          places on it. Every size is a multiple of one reading size, so a composition's ratio holds by
          construction and spacing follows the text. Each style is single-value tokens, so each becomes
          a Figma variable, and the names are Material 3's.
        </p>
        <p class="tr__lede">
          The roles are in the token files beside today's styles; nothing uses them yet, so nothing on
          the site changes. Each of today's styles is on the left, read from the live tokens at this
          window width, and on the right the role nearest it in size, with the face that role carries.
          Highlighter marks a face, weight or leading that changes; the size changes on every row. Three
          rows are open: the small headings have no natural home among the roles.
        </p>
        <div class="tr__ba">
          <div class="tr__ba-col">Today</div>
          <div class="tr__ba-col">Before</div>
          <div class="tr__ba-col">After</div>
          <template v-for="r in rows" :key="r.name">
            <div class="tr__ba-label">{{ r.name }}<span v-if="r.open" class="tr__tag">open</span></div>
            <div class="tr__ba-spec">
              <span :style="r.before.style" :data-measure="'before-' + r.name">{{ r.name }}</span>
              <span class="tr__cap"><code>{{ r.token }}</code> · {{ r.before.face }} {{ r.before.weightName }} {{ r.before.weight }} · {{ round(rendered['before-' + r.name] || 0) }}px · leading {{ r.before.leading }}</span>
            </div>
            <div class="tr__ba-spec">
              <span :style="r.after.style" :data-measure="'after-' + r.name">{{ r.name }}</span>
              <span class="tr__cap">
                <code>{{ r.after.tokenName }}</code> · <span :class="{ tr__hl: r.changed.face }">{{ r.after.face }}</span> <span :class="{ tr__hl: r.changed.weight }">{{ r.after.weightName }} {{ r.after.weight }}</span> · {{ r.after.by }}× · {{ round(rendered['after-' + r.name] || r.after.px) }}px · <span :class="{ tr__hl: r.changed.leading }">leading {{ r.after.leading }}</span>
              </span>
            </div>
          </template>
        </div>

        <h2 class="tr__h2">Next steps</h2>
        <ol class="tr__next">
          <li><b>Settle the open rows.</b> Heading 4 lands on Subhead 2 Small, which is the reading size in Regular; Headings 5 and 6 land on Label, which is component text. Either the page recipe adds a rule for them (Subhead 2 Small in Bold, say) or the roles gain a step. Decide before any SCSS moves.</li>
          <li><b>Bring fluid sizing to the web.</b> Today's headings clamp between 600 and 1310px; the roles are fixed at the reading size. A fluid reading size, or a Headline that clamps from its Small to its recipe's size, is the candidate.</li>
          <li><b>Move UIDS onto the roles.</b> Point the paragraph, variables and utilities partials at the roles and retire today's heading, intro, body and size tokens. This is the step that changes how UIDS and SiteNow look.</li>
        </ol>
      </div>
    `,
    methods: { round },
  }),
};
