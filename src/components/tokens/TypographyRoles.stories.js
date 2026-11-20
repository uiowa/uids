import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import primitives from '../../tokens/primitives/typography.json';
import semantic from '../../tokens/semantic/typography.json';
import { DOCUMENT_OUTLINE, OUTLINE_EMPHASIS } from './documentOutline';
import { gapSize, roleSpec as specOf, roleStyle, splitKey } from './roleStyle';
import { CodeBlock, codeCss, linesOf } from './codeView';

/**
 * The typography roles, as the token files define them: one scale. Six families (Headline, Eyebrow, Subhead,
 * Subhead 2, Body, Small print) in X-Small, Small, Medium, Large and X-Large, and Label. Body X-Small, Small,
 * Medium, Large and X-Large are the five body sizes, 12.67, 16, 19, 24 and 36px (9.5, 12, 14.25, 18 and 27pt), and each names a hierarchy that
 * every template, screen or print, chooses from: the family sizes of the same name, each a multiple of that
 * body size. Label is one set for every hierarchy. Six pages: Formats (the hierarchy each format takes, Medium
 * first), Hierarchy (one hierarchy at actual size, with its spacing, every size in the five, and each style with its
 * classes), Highlight (the box and the band), Landing Page (an event page on one hierarchy, with its headings' roles
 * kept apart from their tags), Make it your day (an event schedule and the Banner, each beside its HTML, on Default
 * or Large) and Before and After (today's styles beside the role each would take). Every
 * specimen is set through the live custom properties the token build ships, so the pages show what the
 * build ships. The values printed beside them are read from the token JSON.
 */

const FAMILIES = ['headline', 'headline-6x', 'headline-8x', 'eyebrow', 'subhead', 'subhead-2', 'body', 'small-print', 'label'];
const SIZES = ['x-large', 'large', 'medium', 'small', 'x-small'];
const BODY_SIZES = ['x-small', 'small', 'medium', 'large', 'x-large'];
const SIZE_NAMES = { 'x-small': 'X-Small', small: 'Small', medium: 'Medium', large: 'Large', 'x-large': 'X-Large' };
// The formats each hierarchy serves (the brand templates audit, 2026-11-09).
// The formats on each hierarchy: the web and the designed boards, and the brand site's templates as measured.
const FORMATS = { 'x-small': 'event programs, program flyers and brochures, mini flyers, table tents and Word documents', small: 'letters, forms, covers and name tags', medium: 'web pages and applications, video, the letter-size flyer and event poster', large: 'the digital ad and the 11 × 17 event poster', 'x-large': 'digital signs, slides, the research poster and the directional poster' };
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
const round = (n) => String(Math.round(n * 100) / 100);
const titleCase = (key) => key.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
// A family's name: 'headline-6x' is Headline 6×.
const familyName = (family) => titleCase(family).replace(/(\d)x$/, '$1×');

// A style's spec from the token files (roleStyle.js): face, weight, multiple of its body size, px, leading, the classes
// that set it, and its name.
function roleSpec(key) {
  const [family, size] = splitKey(key);
  const spec = specOf(family, size);
  return { key, name: `${familyName(family)} ${SIZE_NAMES[size]}`, ...spec, weightName: WEIGHT_NAMES[spec.weight] || String(spec.weight) };
}
// A style through the live custom properties, as its classes set it. Today's styles (heading-h1, paragraph and the
// rest) have a property for each channel.
function styleOf(key) {
  const [family, size] = splitKey(key);
  return family ? roleStyle(family, size) : Object.fromEntries(CHANNELS.map(([name, property]) => [property, `var(--uiowa-typography-${key}-${name})`]));
}
const emphasisOf = (key) => `var(--uiowa-typography-${splitKey(key)[0]}-font-weight-emphasis)`;
const roleIn = (family, size) => `${family}-${size}`;

const SPECIMEN = {
  headline: 'Lorem ipsum dolor sit',
  'headline-6x': 'Lorem ipsum dolor',
  'headline-8x': 'Lorem ipsum',
  eyebrow: 'Lorem ipsum dolor',
  subhead: 'Sed do eiusmod tempor incididunt',
  'subhead-2': 'Ut enim ad minim veniam, quis nostrud',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'small-print': 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

// A hierarchy: each content field takes its family's size of the same name (Medium in the Medium hierarchy),
// and the Labels are one set for every hierarchy. Subhead 2 is Regular; its emphasis weight, Medium, is for a
// line the designer wants to stand out, such as the date, and for a heading set in Subhead 2.
const FIELD_FAMILIES = {
  eyebrow: 'eyebrow', title: 'headline', lead: 'subhead', h2: 'subhead', details: 'subhead-2', h3: 'subhead-2',
  text: 'body', small: 'small-print',
};
const FIELD_LABELS = { button: 'label-large', meta: 'label-medium' };
const roleOf = (field, hierarchy = 'medium') => FIELD_LABELS[field] || roleIn(FIELD_FAMILIES[field], hierarchy);
// The headline steps: 4× is the hierarchy's Headline, and 6× or 8× its Headline 6× or 8× for a bigger statement.
const STEPS = [4, 6, 8];
const titleKey = (hierarchy, step) => roleIn(step === 4 ? 'headline' : `headline-${step}x`, hierarchy);
const headlineSize = (hierarchy, step) => styleOf(titleKey(hierarchy, step)).fontSize;
const titleStyle = (hierarchy, step) => styleOf(titleKey(hierarchy, step));
const fieldStyle = (field, hierarchy, step = 4) => (field === 'title' ? titleStyle(hierarchy, step) : styleOf(roleOf(field, hierarchy)));
const STEP_NAME = (step) => `${step}×${step === 4 ? ' (default)' : ''}`;
// A field's style name and px, with the headline at the step.
const fieldSpec = (field, hierarchy, step = 4) => SPECS[field === 'title' ? titleKey(hierarchy, step) : roleOf(field, hierarchy)];
// The h1–h6 defaults, the style a heading takes from its tag alone: the document outline, shared with the
// Document outline page.
const HEADINGS = DOCUMENT_OUTLINE;
// What the story CSS reads from a hierarchy: its body size, its headline at the step (the gap under a title
// is half of it) and its two text gaps.
const hierarchyVars = (hierarchy, step = 4) => ({
  '--tr-body': `var(--uiowa-typography-body-${hierarchy}-font-size)`,
  '--tr-title': headlineSize(hierarchy, step),
  '--tr-related': gapSize(hierarchy, 'related'),
  '--tr-break': gapSize(hierarchy, 'break'),
});
const FIELDS = [['eyebrow', 'Eyebrow'], ['title', 'Headline'], ['lead', 'Subhead'], ['details', 'Subhead 2'], ['text', 'Body'], ['small', 'Small print']];

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

const css = `
  .tr { box-sizing: border-box; max-width: 1310px; margin: 0 auto; padding: 40px 24px 64px; color: var(--uiowa-color-neutral-800); font-family: var(--uiowa-typography-font-family-roboto); }
  .tr *, .tr *::before, .tr *::after { box-sizing: border-box; }
  /* The pages' own text sits on the Medium hierarchy: the title Subhead, section heads Subhead 2 at its emphasis weight, text Body,
     notes and captions Small print, controls Label. */
  .lp, .tr {
    --tr-f-title: var(--uiowa-typography-subhead-font-weight) calc(var(--uiowa-typography-body-medium-font-size) * var(--uiowa-typography-subhead-multiple))/var(--uiowa-typography-subhead-line-height) var(--uiowa-typography-subhead-font-family);
    --tr-f-h2: var(--uiowa-typography-subhead-2-font-weight-emphasis) calc(var(--uiowa-typography-body-medium-font-size) * var(--uiowa-typography-subhead-2-multiple))/var(--uiowa-typography-subhead-2-line-height) var(--uiowa-typography-subhead-2-font-family);
    --tr-f-body: var(--uiowa-typography-body-font-weight) var(--uiowa-typography-body-medium-font-size)/var(--uiowa-typography-body-line-height) var(--uiowa-typography-body-font-family);
    --tr-f-small: var(--uiowa-typography-small-print-font-weight) calc(var(--uiowa-typography-body-medium-font-size) * var(--uiowa-typography-small-print-multiple))/var(--uiowa-typography-small-print-line-height) var(--uiowa-typography-small-print-font-family);
    --tr-f-label: var(--uiowa-typography-label-large-font-weight) var(--uiowa-typography-label-large-font-size)/var(--uiowa-typography-label-large-line-height) var(--uiowa-typography-label-large-font-family);
    --tr-f-tag: var(--uiowa-typography-label-small-font-weight) var(--uiowa-typography-label-small-font-size)/var(--uiowa-typography-label-small-line-height) var(--uiowa-typography-label-small-font-family);
  }
  .tr__eyebrow { margin: 0 0 6px; font: var(--tr-f-small); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .tr__title { margin: 0 0 12px; font: var(--tr-f-title); color: var(--uiowa-color-neutral-900); }
  .tr__lede { margin: 0 0 16px; max-width: 66ch; font: var(--tr-f-body); color: var(--uiowa-color-neutral-700); }
  .tr__lede b { color: var(--uiowa-color-neutral-900); }
  .tr__h2 { margin: 48px 0 8px; padding-bottom: 8px; border-bottom: 1px solid var(--uiowa-color-neutral-175); font: var(--tr-f-h2); color: var(--uiowa-color-neutral-900); }
  .tr__note { margin: 12px 0 0; max-width: 80ch; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .tr__note code, .tr__cap code, .tr__next code { font-family: var(--uiowa-font-family-mono, monospace); font-size: 0.9em; }
  .tr__table { width: 100%; margin: 12px 0 0; border-collapse: collapse; font: var(--tr-f-body); }
  .tr__table th { padding: 8px 10px; border-bottom: 1px solid var(--uiowa-color-neutral-175); text-align: left; font: var(--tr-f-small); font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .tr__table td { padding: 12px 10px; border-bottom: 1px solid var(--uiowa-color-neutral-150); vertical-align: top; color: var(--uiowa-color-neutral-700); }
  .tr__table td:first-child { color: var(--uiowa-color-neutral-900); }
  .tr__table strong { display: block; color: var(--uiowa-color-neutral-900); }
  .tr__table small { display: block; color: var(--uiowa-color-neutral-500); }
  .tr__cap { display: block; margin-top: 6px; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .tr__hl { background: var(--uiowa-color-gold); color: var(--uiowa-color-neutral-900); padding: 0 3px; }
  .tr__tag { display: inline-block; margin-left: 6px; padding: 1px 7px; border: 1px solid var(--uiowa-color-neutral-300); border-radius: 999px; font: var(--tr-f-tag); font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--uiowa-color-neutral-700); vertical-align: middle; }

  /* Each style: a specimen beside its spec */
  .tr__row { display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--uiowa-color-neutral-150); align-items: start; }
  .tr__side { font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .tr__side strong { display: block; font: var(--tr-f-body); font-weight: 700; color: var(--uiowa-color-neutral-900); }
  .tr__specimen { margin: 0; color: var(--uiowa-color-neutral-900); overflow-wrap: anywhere; }
  .tr__specimen--eyebrow, .tr__eb { text-transform: uppercase; letter-spacing: .04em; }

  /* Pills */
  .tr__pick { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 16px 0 8px; padding: 0; border: 0; }
  .tr__pick legend { float: left; margin-right: 6px; padding: 0; font: var(--tr-f-label); color: var(--uiowa-color-neutral-500); }
  .tr__pick label { position: relative; display: inline-flex; align-items: center; gap: 6px; margin: 0; padding: 6px 14px; border: 1px solid var(--uiowa-color-neutral-175); border-radius: 999px; font: var(--tr-f-label); color: var(--uiowa-color-neutral-800); cursor: pointer; }
  .tr__pick label.on { background: var(--uiowa-color-neutral-800); border-color: var(--uiowa-color-neutral-800); color: var(--uiowa-color-neutral-0); }
  .tr__pick label:has(input:focus-visible) { outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }
  .tr__pick input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
  .tr__pick small { opacity: .7; }
  .tr__more { display: inline-flex; align-items: center; margin: 0; padding: 6px 14px; border: 1px dashed var(--uiowa-color-neutral-300); border-radius: 999px; background: transparent; font: var(--tr-f-label); color: var(--uiowa-color-neutral-700); cursor: pointer; }
  .tr__more:focus-visible { outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }

  /* Formats */
  .tr__table--formats td:nth-child(3) { min-width: 22ch; }
  .tr__row--default td { background: color-mix(in srgb, var(--uiowa-color-gold) 16%, transparent); }

  /* Compositions and the page: spacing is the two space tokens. */
  .tr__fig { margin: 32px 0 0; }
  .tr__fig figcaption { margin-bottom: 8px; font: var(--tr-f-body); font-weight: 700; color: var(--uiowa-color-neutral-900); }
  .tr__fig figcaption span { display: block; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  /* Every block of text is trimmed to its cap height and baseline (text-box), so a gap is exactly its
     hierarchy's token: typography.space.related (1.5x) or typography.space.break (2x). On the Hierarchy
     page the gaps are blocks the Spacing toggle tints and labels; on the pages they are margins. */
  .tr__comp :is(h1, h2, h3, p, :where(.tr__eb)) { text-box: trim-both cap alphabetic; }
  .tr__comp { display: flex; flex-direction: column; padding: 48px; box-shadow: inset 0 0 0 1px var(--uiowa-color-neutral-200); color: var(--uiowa-color-neutral-900); }
  .tr__comp > * { margin: 0; }
  .tr__comp > :not(.tr__gap) { position: relative; z-index: 1; }
  .tr__gap { display: flex; align-items: center; justify-content: center; height: var(--tr-related); background: color-mix(in srgb, var(--uiowa-color-blue) 14%, transparent); font: 700 0.75rem/1 var(--uiowa-typography-font-family-roboto); color: var(--uiowa-color-neutral-900); }
  .tr__gap--break { height: var(--tr-break); }
  /* Under the title: half the title, never less than Break. */
  .tr__gap--title { height: max(calc(var(--tr-title) * 0.5), var(--tr-break)); background: color-mix(in srgb, var(--uiowa-color-gold) 35%, transparent); }
  .tr--hide .tr__gap { background: none; }
  .tr--hide .tr__gap span { visibility: hidden; }
  .tr__t { overflow-wrap: anywhere; }
  .tr__text { max-width: 80ch; }

  .tr__legend { margin: 12px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 4px 24px; font: var(--tr-f-small); color: var(--uiowa-color-neutral-700); }
  .tr__legend b { color: var(--uiowa-color-neutral-900); }

  /* Before and After */
  .tr__ba { display: grid; grid-template-columns: 170px minmax(0, 1fr) minmax(0, 1fr); gap: 0 20px; margin-top: 16px; }
  .tr__ba-col { padding: 0 0 8px; border-bottom: 2px solid var(--uiowa-color-neutral-900); font: var(--tr-f-small); font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .tr__ba-label, .tr__ba-spec { padding: 20px 0; border-bottom: 1px solid var(--uiowa-color-neutral-150); min-width: 0; }
  .tr__ba-label { font: var(--tr-f-body); font-weight: 700; color: var(--uiowa-color-neutral-900); }
  .tr__ba-spec > span:first-child { display: block; color: var(--uiowa-color-neutral-900); overflow-wrap: anywhere; }
  .tr__next { margin: 12px 0 0; padding-left: 1.25rem; max-width: 80ch; font: var(--tr-f-body); color: var(--uiowa-color-neutral-700); }
  .tr__next li + li { margin-top: 8px; }
  .tr__next b { color: var(--uiowa-color-neutral-900); }
`;

// A role takes every hierarchy; Label has its own three sizes.
const sizesOf = (family) => (family === 'label' ? SIZES.filter((size) => at(`typography.label.${size}`)) : SIZES);
const SPECS = Object.fromEntries(FAMILIES.flatMap((family) => sizesOf(family).map((size) => [roleIn(family, size), roleSpec(roleIn(family, size))])));
// The five hierarchies, each named by its body size.
const HIERARCHIES = BODY_SIZES.map((size) => ({ size, label: SIZE_NAMES[size], px: round(SPECS[`body-${size}`].px), pt: round(SPECS[`body-${size}`].px * 0.75), formats: FORMATS[size] }));
// A size in px, with points beside it for print.
const pxPt = (px) => `${round(px)}px · ${round(px * 0.75)}pt`;

export default {
  title: 'Tokens (typography)',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: null } },
  },
};

// The hierarchy pick the pages share: Medium, the web's, first and on by default; the other four formats behind
// a toggle, or always shown with `all`. Turning the toggle off puts the page back on Medium.
const MEDIUM_FIRST = ['medium', ...BODY_SIZES.filter((size) => size !== 'medium')];
const HierarchyPick = {
  props: { modelValue: { type: String, required: true }, others: Boolean, all: Boolean, name: { type: String, required: true }, pt: Boolean },
  emits: ['update:modelValue', 'update:others'],
  setup(props, { emit }) {
    const rows = MEDIUM_FIRST.map((size) => HIERARCHIES.find((p) => p.size === size));
    const shown = computed(() => (props.all || props.others ? rows : rows.slice(0, 1)));
    const text = (p) => `${p.label} · body ${p.px}px${props.pt ? ` · ${p.pt}pt` : ''}`;
    const toggle = () => {
      emit('update:others', !props.others);
      if (props.others) emit('update:modelValue', 'medium');
    };
    return { shown, text, toggle, pick: (size) => emit('update:modelValue', size) };
  },
  template: `
    <fieldset class="tr__pick"><legend>Hierarchy</legend>
      <label v-for="p in shown" :key="p.size" :class="{ on: modelValue === p.size }"><input type="radio" :name="name" :value="p.size" :checked="modelValue === p.size" @change="pick(p.size)"> {{ text(p) }}<small v-if="p.size === 'medium'">default</small></label>
      <button v-if="!all" type="button" class="tr__more" :aria-expanded="String(others)" @click="toggle">{{ others ? 'Hide the other formats' : 'Other formats' }}</button>
    </fieldset>`,
};

// Formats: the hierarchy a piece takes, by its format, Medium first. Each cell is a token's px.
const FORMAT_ROWS = BODY_SIZES.map((size) => {
  const body = SPECS[`body-${size}`].px;
  const px = (key) => round(SPECS[key].px);
  return {
    size,
    label: SIZE_NAMES[size],
    body: pxPt(body),
    formats: FORMATS[size][0].toUpperCase() + FORMATS[size].slice(1),
    headline: STEPS.map((s) => px(titleKey(size, s))).join(' · '),
    subhead: px(roleIn('subhead', size)),
    details: px(roleIn('subhead-2', size)),
    small: px(roleIn('small-print', size)),
    gaps: `${round(body * 1.5)} · ${round(body * 2)}`,
  };
});

export const Formats = {
  name: 'Formats',
  render: () => ({
    setup: () => ({ css, rows: FORMAT_ROWS }),
    template: `
      <div class="tr">
        <component is="style">{{ css }}</component>
        <div class="tr__eyebrow">Typography roles</div>
        <h1 class="tr__title">Formats</h1>
        <p class="tr__lede">
          <b>One formula, five hierarchies, and the format picks one.</b> Every piece, screen or print, takes one
          hierarchy, named by its body size, and every role, headline step and gap in the piece comes from it.
          Medium is the default: web pages and applications. The other four are print and display formats.
        </p>
        <p class="tr__lede">
          Within a piece the reading size never changes. Emphasis steps the Headline, 4× by default and 6× or 8×
          for a bigger statement, section by section on a page. Density drops roles: a dense list starts at its
          Subhead and keeps its body size. Nothing else moves the body text.
        </p>
        <table class="tr__table tr__table--formats">
          <thead><tr><th>Hierarchy</th><th>Body</th><th>Formats</th><th>Headline 4× · 6× · 8×</th><th>Subhead 2×</th><th>Subhead 2 and Eyebrow 1.5×</th><th>Small print 0.75×</th><th>Related 1.5× · Break 2×</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.size" :class="{ 'tr__row--default': r.size === 'medium' }">
              <td><strong>{{ r.label }}<span v-if="r.size === 'medium'" class="tr__tag">Default</span></strong></td>
              <td>{{ r.body }}</td><td>{{ r.formats }}</td><td>{{ r.headline }}px</td><td>{{ r.subhead }}px</td><td>{{ r.details }}px</td><td>{{ r.small }}px</td><td>{{ r.gaps }}px</td>
            </tr>
          </tbody>
        </table>
        <small class="tr__cap">Sizes in px from the token files: <code>typography.body.*</code> and the multiple on each role. A piece picks one row and uses it whole. The pages that follow open on Medium, with the other formats on a toggle.</small>
      </div>
    `,
  }),
};

// The Hierarchy figure as a component: the role classes set the type, and the component's CSS sets the gaps from
// the custom properties the hierarchy class sets. The HTML follows the picked hierarchy and headline step.
const pieceHtml = (hierarchy, step) => [
  `<article class="piece${hierarchy === 'medium' ? '' : ` type-scale--${hierarchy}`}">`,
  '  <p class="type-eyebrow">Lorem ipsum</p>',
  `  <h2 class="${headlineClass(step)} piece__title">Lorem ipsum dolor sit amet consectetur</h2>`,
  '  <p class="type-subhead">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
  '  <p class="type-subhead-2 piece__details"><span class="type-subhead-2--emphasis">Lorem ipsum, 00 dolor sit, 0 amet</span><br>Consectetur adipiscing, Elit sed</p>',
  '  <p class="type-body piece__text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>',
  '  <p class="type-small-print piece__small-print">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
  '</article>',
].join('\n');
const PIECE_CSS = linesOf([
  '/* Each block trimmed to its cap height and baseline, so every gap runs from a baseline to the next cap height. */',
  '.piece > * {',
  '  margin: 0;',
  '  text-box: trim-both cap alphabetic;',
  '}',
  '',
  '/* Related above the headline; under it, half the headline, never less than Break. Two classes outrank the base',
  '   h2:not(:first-child) margin. */',
  '.piece .piece__title {',
  '  margin-block: var(--uiowa-type-space-related) max(0.5em, var(--uiowa-type-space-break));',
  '}',
  '',
  '/* Break between groups. */',
  '.piece .piece__details,',
  '.piece .piece__small-print {',
  '  margin-block-start: var(--uiowa-type-space-break);',
  '}',
  '',
  '/* Related between text that belongs together. */',
  '.piece .piece__text {',
  '  margin-block-start: var(--uiowa-type-space-related);',
  '}',
  '',
  '/* Compact, for a layout of many short groups: the subhead meets its text with no gap, and the groups stay a Break',
  '   apart. Add .piece--compact to the article, and this rule after the one above:',
  '   .piece--compact .piece__text { margin-block-start: 0; } */',
].join('\n'));

export const Hierarchy = {
  name: 'Hierarchy',
  render: () => ({
    components: { HierarchyPick, CodeBlock },
    setup() {
      const hierarchy = ref('medium');
      const step = ref(4);
      const gaps = ref(true);
      const code = ref(false);
      const pieceLines = computed(() => linesOf(pieceHtml(hierarchy.value, step.value)));
      // The table's columns: Medium first, then the other four hierarchies.
      const cols = MEDIUM_FIRST;
      // Each role, each headline step and each text gap, in the five hierarchies: the math each one has done.
      const bodyPx = (size) => SPECS[`body-${size}`].px;
      const multiple = (label, tokens, by) => ({ label, tokens, by, px: Object.fromEntries(BODY_SIZES.map((size) => [size, round(bodyPx(size) * by)])) });
      const rows = [
        ...FIELDS.flatMap(([field, label]) => (field === 'title'
          ? STEPS.map((s) => ({
            label: `Headline, ${STEP_NAME(s)}`, tokens: `typography.${s === 4 ? 'headline' : `headline-${s}x`}.*`, by: s, px: Object.fromEntries(BODY_SIZES.map((size) => [size, round(SPECS[titleKey(size, s)].px)])),
          }))
          : [{ label, tokens: `typography.${FIELD_FAMILIES[field]}.*`, by: SPECS[roleOf(field)].by, px: Object.fromEntries(BODY_SIZES.map((size) => [size, round(SPECS[roleOf(field, size)].px)])) }])),
        multiple('Related gap', 'typography.space.related.*', 1.5),
        multiple('Break gap', 'typography.space.break.*', 2),
      ];
      const styles = computed(() => Object.fromEntries(FIELDS.map(([field]) => [field, fieldStyle(field, hierarchy.value, step.value)])));
      const vars = computed(() => hierarchyVars(hierarchy.value, step.value));
      const pick = computed(() => HIERARCHIES.find((p) => p.size === hierarchy.value));
      const px = (by) => round(bodyPx(hierarchy.value) * by);
      // Each style in the picked hierarchy, with the headline at the step, then the Labels, one set for every
      // hierarchy, so a Label's multiple is of Body Medium.
      const styleRows = computed(() => [
        ...FIELDS.map(([field, label]) => {
          const key = field === 'title' ? titleKey(hierarchy.value, step.value) : roleOf(field, hierarchy.value);
          return { ...SPECS[key], label, multiple: `${SPECS[key].by}×`, style: styleOf(key), text: SPECIMEN[FIELD_FAMILIES[field]], eyebrow: field === 'eyebrow' };
        }),
        ...sizesOf('label').map((size) => {
          const key = roleIn('label', size);
          return { ...SPECS[key], label: 'Label', multiple: `${SPECS[key].by}× Body Medium`, style: styleOf(key), text: SPECIMEN.label, eyebrow: false };
        }),
      ]);
      // The px beside each specimen is what the browser renders.
      const root = ref(null);
      const rendered = useRendered(root, [hierarchy, step]);
      const labels = computed(() => ({
        related: `1.5× · ${px(1.5)}px`,
        breakGap: `2× · ${px(2)}px`,
        titleGap: `½ headline · ${px(Math.max(step.value * 0.5, 2))}px`,
      }));
      return { css, rows, cols, sizeNames: SIZE_NAMES, hierarchy, steps: STEPS, step, stepName: STEP_NAME, pick, gaps, styles, vars, labels, styleRows, root, rendered, code, codeCss, pieceLines, pieceCss: PIECE_CSS };
    },
    template: `
      <div class="tr">
        <component is="style">{{ css }}{{ codeCss }}</component>
        <div class="tr__eyebrow">Typography roles</div>
        <h1 class="tr__title">Hierarchy</h1>
        <p class="tr__lede">
          <b>One scale, five hierarchies.</b> A hierarchy is a set of styles from the scale, each a multiple
          of its body size: 1× for body text, 1.5× for Subhead 2 and the eyebrow, 2× for the subhead, 4× for
          the headline, and 0.75× for small print. Body X-Small, Small, Medium, Large and X-Large name the
          five, and every template, screen or print chooses one by its format, as
          <a href="../?path=/story/tokens-typography--formats" target="_top">Formats</a> lists. Picking a body
          size picks every other size; the table has done the math. It is the only way to change the
          size of body text. The headline is the one other setting: 4× by default, and 6× or 8× for a bigger
          statement; only the headline and the gap under it change.
        </p>
        <hierarchy-pick v-model="hierarchy" all name="tr-step-hierarchy" />

        <h2 class="tr__h2">At actual size</h2>
        <p class="tr__lede">
          Every gap is a multiple of the hierarchy's body size, measured from baseline to cap height: Related
          (1.5×) between text that belongs together, Break (2×) between groups, and half the headline under
          the headline, never less than Break.
        </p>
        <fieldset class="tr__pick"><legend>Headline</legend>
          <label v-for="s in steps" :key="s" :class="{ on: step === s }"><input type="radio" name="tr-step" :value="s" v-model="step"> {{ stepName(s) }}</label>
        </fieldset>
        <fieldset class="tr__pick"><legend>Spacing</legend>
          <label :class="{ on: gaps }"><input type="radio" name="tr-gaps" :value="true" v-model="gaps"> Show</label>
          <label :class="{ on: !gaps }"><input type="radio" name="tr-gaps" :value="false" v-model="gaps"> Hide</label>
        </fieldset>
        <fieldset class="tr__pick"><legend>HTML</legend>
          <label :class="{ on: code }"><input type="radio" name="tr-code" :value="true" v-model="code"> Show</label>
          <label :class="{ on: !code }"><input type="radio" name="tr-code" :value="false" v-model="code"> Hide</label>
        </fieldset>
        <figure class="tr__fig">
          <figcaption>{{ pick.label }} hierarchy, {{ step }}× headline <span>Body {{ pick.label }}, {{ pick.px }}px ({{ pick.pt }}pt) · used by {{ pick.formats }}</span></figcaption>
          <div :class="['tr__comp', { 'tr--hide': !gaps }]" :style="vars">
            <div class="tr__eb" :style="styles.eyebrow">Lorem ipsum</div>
            <div class="tr__gap"><span>{{ labels.related }}</span></div>
            <p class="tr__t" :style="styles.title">Lorem ipsum dolor sit amet consectetur</p>
            <div class="tr__gap tr__gap--title"><span>{{ labels.titleGap }}</span></div>
            <p :style="styles.lead">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div class="tr__gap tr__gap--break"><span>{{ labels.breakGap }}</span></div>
            <p class="tr__details" :style="styles.details"><span class="type-subhead-2--emphasis">Lorem ipsum, 00 dolor sit, 0 amet</span><br>Consectetur adipiscing, Elit sed</p>
            <div class="tr__gap"><span>{{ labels.related }}</span></div>
            <p class="tr__text" :style="styles.text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
            <div class="tr__gap tr__gap--break"><span>{{ labels.breakGap }}</span></div>
            <p class="tr__text" :style="styles.small">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </figure>
        <div v-if="code" class="tr__hlcode">
          <code-block file="HTML" where="the figure as a component, on the picked hierarchy and headline" :lines="pieceLines" />
          <code-block file="CSS" where="the component's gaps, from the hierarchy's custom properties" :lines="pieceCss" />
        </div>
        <table class="tr__table">
          <thead><tr><th>Role</th><th>Tokens</th><th>Multiple</th><th v-for="size in cols" :key="size">{{ sizeNames[size] }}</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.label"><td>{{ r.label }}</td><td><code>{{ r.tokens }}</code></td><td>{{ r.by }}×</td><td v-for="size in cols" :key="size">{{ pxPt(r.px[size]) }}</td></tr>
          </tbody>
        </table>
        <p class="tr__note">
          When content runs long, shorten the copy or pick a smaller hierarchy; don't shrink a style by hand.
          The Labels are one set for every hierarchy, and the h1–h6 defaults for web text are on the
          <a href="../?path=/story/tokens-typography--document-outline" target="_top">Document outline</a> page.
        </p>

        <h2 class="tr__h2">Each style</h2>
        <p class="tr__lede">
          A style fixes the typeface, weight, size and leading. Each specimen is set the way its classes set it,
          shown beside it: the hierarchy class sets the body size, and the role class multiplies it by the role's
          multiple (<code>--uiowa-typography-&lt;role&gt;-multiple</code>). The px is what the browser renders; the
          rest is read from the token files. Six families in five hierarchies, the Headline also at 6× and 8×, and
          Label in three sizes make forty-three styles from 64 tokens. UIDS's components don't use the roles; of its
          other classes, only the intro classes do.
        </p>
        <div ref="root">
          <div v-for="r in styleRows" :key="r.key" class="tr__row">
            <div class="tr__side">
              <strong>{{ r.label }}</strong>
              {{ r.multiple }} · {{ pxPt(rendered[r.key] || r.px) }}<br>
              {{ r.name }} · {{ r.face }} {{ r.weightName }} {{ r.weight }} · leading {{ r.leading }}<br>
              <code>{{ r.classes }}</code>
            </div>
            <component :is="r.eyebrow ? 'div' : 'p'" :class="['tr__specimen', { 'tr__specimen--eyebrow': r.eyebrow }]" :style="r.style" :data-measure="r.key">{{ r.text }}</component>
          </div>
        </div>
        <p class="tr__note">
          Special Gothic Condensed is Google's Special Gothic at width 75, weight 600, which Storybook loads.
          X-Small's small print is 9.5px (7.125pt), too small to read.
        </p>
      </div>
    `,
    methods: { round, pxPt },
  }),
};

// Highlight: the token multiples drawn on the role's own line box. A gradient band stands in for the box,
// because text-box-trim does not reach an inline element, so the box ends at the cap height and the
// baseline in every browser. The face metrics are the fonts' own, measured: ascent, descent and cap
// height as a share of the font size.
const HL_FACES = {
  display: { asc: 1, desc: 0.29, cap: 0.71 }, // Special Gothic Condensed 600
  slab: { asc: 0.947, desc: 0.263 }, // Zilla Slab 600
};
const HL = Object.fromEntries(['headline.padding', 'headline.leading', 'subhead.above', 'subhead.below', 'subhead.bleed']
  .map((path) => [path, at(`typography.highlight.${path}`).$value]));
const hlCss = `
  .tr__lede code { font-family: var(--uiowa-font-family-mono, monospace); font-size: 0.9em; }
  .tr__hlc--gold { background: var(--uiowa-color-gold); }
  .tr__hlc--black { background: var(--uiowa-color-neutral-900); color: var(--uiowa-color-neutral-0); }
  .tr__hlcode { display: grid; gap: 16px; margin-top: 16px; }
  /* The headline box: the padding token past the cap height and the baseline, and past the text at each end. */
  .tr__hlm {
    --hl-pad: var(--uiowa-typography-highlight-headline-padding);
    --hl-top: calc((var(--hl-asc) - var(--hl-cap) - var(--hl-pad)) / (var(--hl-asc) + var(--hl-desc)) * 100%);
    --hl-bot: calc((var(--hl-asc) + var(--hl-pad)) / (var(--hl-asc) + var(--hl-desc)) * 100%);
    padding-inline: calc(var(--hl-pad) * 1em); padding-block: 0; background-color: transparent; color: var(--hl-ink);
    background-image: linear-gradient(to bottom, transparent var(--hl-top), var(--hl-bg) var(--hl-top), var(--hl-bg) var(--hl-bot), transparent var(--hl-bot));
    -webkit-box-decoration-break: clone; box-decoration-break: clone;
  }
  /* The subhead band: from the above token over the baseline to the below token under it, bled past the text without moving it. */
  .tr__hlb {
    --hl-bleed: var(--uiowa-typography-highlight-subhead-bleed);
    --hl-btop: calc((var(--hl-zasc) - var(--uiowa-typography-highlight-subhead-above)) / (var(--hl-zasc) + var(--hl-zdesc)) * 100%);
    --hl-bbot: calc((var(--hl-zasc) + var(--uiowa-typography-highlight-subhead-below)) / (var(--hl-zasc) + var(--hl-zdesc)) * 100%);
    padding-inline: calc(var(--hl-bleed) * 1em); margin-inline: calc(var(--hl-bleed) * -1em);
    background-image: linear-gradient(to bottom, transparent var(--hl-btop), var(--hl-band) var(--hl-btop), var(--hl-band) var(--hl-bbot), transparent var(--hl-bbot));
    -webkit-box-decoration-break: clone; box-decoration-break: clone;
  }
`;
// How the highlight is applied, on the figure's defaults: Medium, the 4× headline, a gold box on two words and the
// band on white. The box and band rules are cut from hlCss, so the view shows what the figure draws.
const HL_TOKENS = Object.keys(HL).map((path) => ({
  token: `typography.highlight.${path}`,
  property: `--uiowa-typography-highlight-${path.replace('.', '-')}`,
  value: HL[path],
  sets: at(`typography.highlight.${path}`).$description,
}));
const HL_HTML = [
  '<div class="tr__hlc">',
  '  <h1 class="type-headline">Lorem ipsum <mark class="tr__hlm">dolor sit</mark> amet consectetur</h1>',
  '  <p class="type-subhead"><span class="tr__hlb">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>',
  '</div>',
].join('\n');
const HL_CSS = [
  "/* The faces' measured metrics, as shares of the font size, and the colors: a gold box with black text, and a",
  '   gold band on white. */',
  '.tr__hlc {',
  `  --hl-asc: ${HL_FACES.display.asc}; --hl-desc: ${HL_FACES.display.desc}; --hl-cap: ${HL_FACES.display.cap}; /* Special Gothic Condensed 600 */`,
  `  --hl-zasc: ${HL_FACES.slab.asc}; --hl-zdesc: ${HL_FACES.slab.desc}; /* Zilla Slab 600 */`,
  '  --hl-bg: var(--uiowa-color-gold); --hl-ink: var(--uiowa-color-neutral-900); --hl-band: var(--uiowa-color-gold);',
  '}',
  '/* A headline with a highlight: the leading token added to its line height, and the padding token above and below. */',
  '.type-headline:has(.tr__hlm) {',
  '  line-height: calc(var(--uiowa-typography-headline-line-height) + var(--uiowa-typography-highlight-headline-leading));',
  '  padding-block: calc(var(--uiowa-typography-highlight-headline-padding) * 1em);',
  '}',
  hlCss.slice(hlCss.indexOf('  /* The headline box')).replace(/^  /gm, '').trim(),
].join('\n');

export const Highlight = {
  name: 'Highlight',
  render: () => ({
    components: { HierarchyPick, CodeBlock },
    setup() {
      const hierarchy = ref('medium');
      const step = ref(4);
      const hl = ref('gold');
      const bg = ref('white');
      const band = ref(true);
      const words = ref('two');
      const gaps = ref(true);
      const others = ref(false);
      const hlPx = (size, s = 4) => {
        const title = SPECS[titleKey(size, s)].px;
        const sub = SPECS[roleIn('subhead', size)].px;
        return {
          title: round(title), pad: round(title * HL['headline.padding']), lead: round(title * HL['headline.leading']),
          sub: round(sub), above: round(sub * HL['subhead.above']), below: round(sub * HL['subhead.below']), bleed: round(sub * HL['subhead.bleed']),
        };
      };
      const rows = computed(() => (others.value ? MEDIUM_FIRST : MEDIUM_FIRST.slice(0, 1)).map((size) => ({ label: SIZE_NAMES[size], ...hlPx(size) })));
      const styles = computed(() => {
        const s = Object.fromEntries(FIELDS.map(([field]) => [field, fieldStyle(field, hierarchy.value, step.value)]));
        if (hl.value !== 'off') {
          s.title = {
            ...s.title,
            lineHeight: `calc(${styleOf(titleKey(hierarchy.value, step.value)).lineHeight} + var(--uiowa-typography-highlight-headline-leading))`,
            paddingBlock: 'calc(var(--uiowa-typography-highlight-headline-padding) * 1em)',
          };
        }
        return s;
      });
      const vars = computed(() => ({
        ...hierarchyVars(hierarchy.value, step.value),
        '--hl-asc': HL_FACES.display.asc, '--hl-desc': HL_FACES.display.desc, '--hl-cap': HL_FACES.display.cap,
        '--hl-zasc': HL_FACES.slab.asc, '--hl-zdesc': HL_FACES.slab.desc,
        '--hl-bg': hl.value === 'black' ? 'var(--uiowa-color-neutral-900)' : 'var(--uiowa-color-gold)',
        '--hl-ink': hl.value === 'black' ? 'var(--uiowa-color-neutral-0)' : 'var(--uiowa-color-neutral-900)',
        '--hl-band': bg.value === 'gold' ? 'var(--uiowa-color-neutral-0)' : bg.value === 'black' ? 'transparent' : 'var(--uiowa-color-gold)',
      }));
      const pick = computed(() => HIERARCHIES.find((p) => p.size === hierarchy.value));
      const px = computed(() => hlPx(hierarchy.value, step.value));
      const labels = computed(() => {
        const body = (by) => round(SPECS[`body-${hierarchy.value}`].px * by);
        return { related: `1.5× · ${body(1.5)}px`, breakGap: `2× · ${body(2)}px`, titleGap: `½ headline · ${body(Math.max(step.value * 0.5, 2))}px` };
      });
      return { css, hlCss, codeCss, rows, hierarchy, others, steps: STEPS, step, stepName: STEP_NAME, hl, bg, band, words, gaps, styles, vars, pick, px, labels, hlTokens: HL_TOKENS, hlHtml: linesOf(HL_HTML), hlCssLines: linesOf(HL_CSS) };
    },
    template: `
      <div class="tr">
        <component is="style">{{ css }}{{ hlCss }}{{ codeCss }}</component>
        <div class="tr__eyebrow">Typography roles</div>
        <h1 class="tr__title">Highlight</h1>
        <p class="tr__lede">
          <b>A box behind chosen headline words, and a band under the subhead.</b> The headline highlight
          runs from cap height to baseline plus <code>typography.highlight.headline.padding</code>, 0.1× the
          headline size, on all four sides; descenders hang below it. A highlighted headline takes
          <code>.leading</code>, 0.05×, more leading per line and the padding at its top and bottom, so the
          gaps above and below measure from the box. The subhead band runs from
          <code>typography.highlight.subhead.above</code>, 0.32× the subhead size, above the baseline to
          <code>.below</code>, 0.16×, below it, and <code>.bleed</code>, 0.08×, past the text at each end; it
          adds no space. The box is gold with black text or black with white text; the band is gold on
          white and white on gold, and not used on black. Headline and subhead type only.
        </p>
        <hierarchy-pick v-model="hierarchy" v-model:others="others" name="tr-hl-hierarchy" />

        <h2 class="tr__h2">At actual size</h2>
        <fieldset class="tr__pick"><legend>Headline</legend>
          <label v-for="s in steps" :key="s" :class="{ on: step === s }"><input type="radio" name="tr-hl-step" :value="s" v-model="step"> {{ stepName(s) }}</label>
        </fieldset>
        <fieldset class="tr__pick"><legend>Highlight</legend>
          <label :class="{ on: hl === 'gold' }"><input type="radio" name="tr-hl" value="gold" v-model="hl"> Gold</label>
          <label :class="{ on: hl === 'black' }"><input type="radio" name="tr-hl" value="black" v-model="hl"> Black</label>
          <label :class="{ on: hl === 'off' }"><input type="radio" name="tr-hl" value="off" v-model="hl"> Off</label>
        </fieldset>
        <fieldset class="tr__pick"><legend>Words</legend>
          <label :class="{ on: words === 'two' }"><input type="radio" name="tr-hl-words" value="two" v-model="words"> Two</label>
          <label :class="{ on: words === 'all' }"><input type="radio" name="tr-hl-words" value="all" v-model="words"> All</label>
        </fieldset>
        <fieldset class="tr__pick"><legend>Subhead</legend>
          <label :class="{ on: band }"><input type="radio" name="tr-hl-band" :value="true" v-model="band"> Band</label>
          <label :class="{ on: !band }"><input type="radio" name="tr-hl-band" :value="false" v-model="band"> Plain</label>
        </fieldset>
        <fieldset class="tr__pick"><legend>Background</legend>
          <label :class="{ on: bg === 'white' }"><input type="radio" name="tr-hl-bg" value="white" v-model="bg"> White</label>
          <label :class="{ on: bg === 'gold' }"><input type="radio" name="tr-hl-bg" value="gold" v-model="bg"> Gold</label>
          <label :class="{ on: bg === 'black' }"><input type="radio" name="tr-hl-bg" value="black" v-model="bg"> Black</label>
        </fieldset>
        <fieldset class="tr__pick"><legend>Spacing</legend>
          <label :class="{ on: gaps }"><input type="radio" name="tr-hl-gaps" :value="true" v-model="gaps"> Show</label>
          <label :class="{ on: !gaps }"><input type="radio" name="tr-hl-gaps" :value="false" v-model="gaps"> Hide</label>
        </fieldset>
        <figure class="tr__fig">
          <figcaption>{{ pick.label }} hierarchy, {{ step }}× headline <span>Headline {{ px.title }}px: box pad {{ px.pad }}px, {{ px.lead }}px more leading · Subhead {{ px.sub }}px: band {{ px.above }}px above and {{ px.below }}px below the baseline, {{ px.bleed }}px past the text</span></figcaption>
          <div :class="['tr__comp', 'tr__hlc', 'tr__hlc--' + bg, { 'tr--hide': !gaps }]" :style="vars">
            <div class="tr__eb" :style="styles.eyebrow">Lorem ipsum</div>
            <div class="tr__gap"><span>{{ labels.related }}</span></div>
            <p class="tr__t" :style="styles.title">
              <template v-if="hl === 'off'">Lorem ipsum dolor sit amet consectetur</template>
              <mark v-else-if="words === 'all'" class="tr__hlm">Lorem ipsum dolor sit amet consectetur</mark>
              <template v-else>Lorem ipsum <mark class="tr__hlm">dolor sit</mark> amet consectetur</template>
            </p>
            <div class="tr__gap tr__gap--title"><span>{{ labels.titleGap }}</span></div>
            <p :style="styles.lead"><span :class="{ tr__hlb: band }">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
            <div class="tr__gap tr__gap--break"><span>{{ labels.breakGap }}</span></div>
            <p class="tr__details" :style="styles.details"><span class="type-subhead-2--emphasis">Lorem ipsum, 00 dolor sit, 0 amet</span><br>Consectetur adipiscing, Elit sed</p>
            <div class="tr__gap"><span>{{ labels.related }}</span></div>
            <p class="tr__text" :style="styles.text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </figure>
        <table class="tr__table">
          <thead><tr><th>Hierarchy</th><th>Headline 4×</th><th>Box pad</th><th>Extra lead</th><th>Subhead 2×</th><th>Band above</th><th>Band below</th><th>Band bleed</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.label"><td>{{ r.label }}</td><td>{{ r.title }}px</td><td>{{ r.pad }}px</td><td>{{ r.lead }}px</td><td>{{ r.sub }}px</td><td>{{ r.above }}px</td><td>{{ r.below }}px</td><td>{{ r.bleed }}px</td></tr>
          </tbody>
        </table>
        <h2 class="tr__h2">How it's applied</h2>
        <p class="tr__lede">
          The tokens, then the HTML and CSS behind the figure on its defaults: Medium, the 4× headline, a gold box
          on two words and the band on white. UIDS has no highlight class, so the classes are this page's own. The
          figure sets the headline's leading and padding inline; here they are one rule.
        </p>
        <table class="tr__table">
          <thead><tr><th>Token</th><th>Custom property</th><th>Value</th><th>Sets</th></tr></thead>
          <tbody>
            <tr v-for="t in hlTokens" :key="t.token"><td><code>{{ t.token }}</code></td><td><code>{{ t.property }}</code></td><td>{{ t.value }}</td><td>{{ t.sets }}</td></tr>
          </tbody>
        </table>
        <div class="tr__hlcode">
          <code-block file="HTML" where="the figure's two highlighted lines" :lines="hlHtml" />
          <code-block file="CSS" where="the custom properties, the headline rule, the box and the band" :lines="hlCssLines" />
        </div>
        <p class="tr__note">
          The box and the band are gradient bands on the role's own line box, placed with the fonts' measured
          ascent, descent and cap height, because <code>text-box-trim</code> does not reach an inline element.
          UIDS ships the five tokens but no highlight class; the shipped Headline highlight pads in rem and does
          not scale with the headline.
        </p>
      </div>
    `,
    methods: { round },
  }),
};

// Landing Page: the Ideas in motion page on the roles. One hierarchy for the whole page, and one Headline,
// in the hero. Each band picks its headings' roles; the tag follows the page's outline. Section headlines
// and eyebrows are the page's two options above a band's Subhead; a shown headline becomes the band's
// heading and moves the Subhead and the items down a level. Each section has its own headline stepper, None,
// 4×, 6× or 8×; the page opens on BAND_STEPS, the feature story at 6×, the closing at 8×, the rest at 4× and
// the news and events list none, since a dense list drops the Headline and starts at its Subhead.
const BANDS = ['idea', 'explore', 'day', 'news', 'visit', 'join'];
const BAND_NAMES = { idea: 'The idea', explore: 'Explore', day: 'The day', news: 'News & events', visit: 'Your visit', join: 'Join us' };
const BAND_STEPS = { idea: 6, explore: 4, day: 4, news: null, visit: 4, join: 8 };
// A section's hierarchy switch: the page's hierarchy, or one up, to see that section on the bigger reading size.
const HierPick = {
  props: { modelValue: { type: String, default: null }, page: { type: String, required: true }, name: { type: String, required: true } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const options = computed(() => [[null, SIZE_NAMES[props.page]], [props.page === 'large' ? 'x-large' : 'large', props.page === 'large' ? 'X-Large' : 'Large']]);
    return { options, pick: (value) => emit('update:modelValue', value) };
  },
  template: `
    <fieldset class="lp__step"><legend class="lp__step-name">Hierarchy</legend>
      <label v-for="[value, text] in options" :key="text" :class="{ on: modelValue === value }"><input type="radio" :name="name" :checked="modelValue === value" @change="pick(value)"> {{ text }}</label>
    </fieldset>`,
};
// A section's headline stepper, a segmented control: None, 4×, 6× or 8× (the hero has no None).
const StepPick = {
  props: { modelValue: { type: Number, default: null }, name: { type: String, required: true }, none: Boolean },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const options = computed(() => [...(props.none ? [[null, 'None']] : []), ...STEPS.map((s) => [s, `${s}×`])]);
    return { options, pick: (value) => emit('update:modelValue', value) };
  },
  template: `
    <fieldset class="lp__step"><legend class="lp__step-name">Headline</legend>
      <label v-for="[value, text] in options" :key="text" :class="{ on: modelValue === value }"><input type="radio" :name="name" :checked="modelValue === value" @change="pick(value)"> {{ text }}</label>
    </fieldset>`,
};
// The gap labels Spacing paints, for a body size.
const gapLabels = (body) => ({
  '--gap-related': `"Related · 1.5× · ${round(body * 1.5)}px"`,
  '--gap-break': `"Break · 2× · ${round(body * 2)}px"`,
  '--gap-list': `"One reading size · 1× · ${round(body)}px"`,
});
const BAND_FAMILIES = { heading: 'subhead', item: 'subhead-2' };
// Item headings take Subhead 2's emphasis weight, Roboto Medium, so they read apart from the Regular lead-in above them.
const ITEM_EMPHASIS = { fontWeight: 'var(--uiowa-typography-subhead-2-font-weight-emphasis)' };
const LANDING = {
  nav: ['The idea', 'Explore', 'The day', 'News & events', 'Your visit'],
  hero: {
    eyebrow: 'A day of discovery',
    lead: 'Big ideas. Open doors.',
    date: 'Saturday, Month 00, 0000',
    place: '10:00–15:00 · Venue name',
    text: 'Meet the people asking new questions. Follow a spark of curiosity into something unexpected. Free and open to everyone.',
  },
  idea: {
    eyebrow: 'The idea',
    headline: 'A new way to see.',
    title: 'Discovery starts with a question.',
    text: 'The familiar gets interesting when you look a little closer. Step into a demonstration, try an experiment, or hear a perspective that changes your own.',
    link: 'Find your starting point',
  },
  explore: {
    eyebrow: 'Explore',
    headline: 'Choose your own way in.',
    title: 'Find your spark.',
    lead: 'There’s more than one way to connect with an idea. Start with something that catches your attention.',
    cards: [
      { title: 'Make something', text: 'Get hands-on with a small experiment. See what happens when curiosity becomes something you can try.', link: 'Explore the making session' },
      { title: 'Change your view', text: 'Look at an everyday question from an unexpected angle through research, art, and shared discovery.', link: 'See a new perspective' },
      { title: 'Start a conversation', text: 'Bring a question and a willingness to listen. Leave with a connection you weren’t expecting.', link: 'Join the conversation' },
    ],
  },
  day: {
    eyebrow: 'The day',
    headline: 'An example day.',
    title: 'Make it your day.',
    lead: 'Start together, then follow your curiosity. A sample program for the day.',
    items: [
      { title: '10:00 · Opening conversation', text: 'Begin with one good question: what changes when people from different fields think together?' },
      { title: '11:00 · Try something new', text: 'Move from watching to making with a short, approachable experiment.', list: ['No specialist knowledge needed.', 'Bring a little curiosity.'] },
      { title: '13:00 · A different perspective', text: 'Explore how a new method, material, or point of view can change an everyday problem.' },
      { title: '14:00 · Keep the conversation going', text: 'Compare notes with someone new. Share what surprised you and the questions you want to carry forward.' },
    ],
    small: 'Times and sessions are examples.',
  },
  news: {
    eyebrow: 'What’s new',
    headline: 'News and events.',
    columns: [
      {
        title: 'Events',
        lead: 'Make time to try something, meet someone, and get involved.',
        items: [
          { title: '11:00 · Try something new', text: 'Join a hands-on making session and see where one small experiment leads.' },
          { title: '14:00 · Start a conversation', text: 'Bring a question, compare notes, and leave with a connection you weren’t expecting.' },
        ],
      },
      {
        title: 'News',
        lead: 'Fresh perspectives from people who keep asking questions.',
        items: [
          { title: 'A new way to see', text: 'Explore how a different perspective can turn an everyday question into a fresh idea.' },
          { title: 'Find your starting point', text: 'Discover the experiments, creative work, and conversations waiting for you.' },
        ],
      },
    ],
  },
  visit: {
    eyebrow: 'Your visit',
    headline: 'A little planning. A lot to discover.',
    title: 'Before you arrive.',
    lead: 'A few small preparations leave more room for discovery when you get here.',
    link: 'Read the visit guide',
    items: [
      { title: 'Find your way', text: 'Check the event’s venue information and transport options before planning your route.' },
      { title: 'Everyone belongs', text: 'If you need an accommodation, contact the event organizer before your visit.' },
      { title: 'Come as you are', text: 'Bring a question, a friend, and a little time to follow an unexpected idea.' },
    ],
  },
  join: {
    eyebrow: 'Join us',
    headline: 'Leave room for a new idea.',
    title: 'Stay open.',
    text: 'Your next idea starts here. Pick a place to begin, meet someone new, and see what happens when you give curiosity a little room.',
  },
  footer: 'Typography concept · Illustrative event content.',
};
const lpCss = `
  .lp { color: var(--uiowa-color-neutral-900); font-family: var(--uiowa-typography-font-family-roboto); }
  .lp *, .lp *::before, .lp *::after { box-sizing: border-box; }
  /* The content sits in the standard container; the bands run edge to edge. */
  .lp__in { max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 0 var(--uiowa-layout-digital-large-margin); }
  .lp__head { max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 32px var(--uiowa-layout-digital-large-margin); }
  .lp__picks { display: flex; flex-wrap: wrap; gap: 0 32px; }
  .lp__legend { margin: 12px 0 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px 28px; font: var(--tr-f-small); color: var(--uiowa-color-neutral-700); }
  .lp__legend b { color: var(--uiowa-color-neutral-900); }
  /* The space around a band is layout, from the space scale, not a text gap. */
  .lp__band { padding: var(--uiowa-space-600) 0; }
  .lp__band--gold { background: var(--uiowa-color-gold); }
  .lp__band--gray { background: var(--uiowa-color-neutral-100); }
  .lp__band--dark { background: var(--uiowa-color-neutral-900); color: var(--uiowa-color-neutral-0); }
  .lp__site { border-bottom: 1px solid var(--uiowa-color-neutral-175); }
  .lp__nav { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 28px; padding-top: 20px; padding-bottom: 20px; }
  .lp__nav a { color: inherit; text-decoration: none; }
  .lp__brand { text-transform: uppercase; letter-spacing: .06em; }
  .lp__links { display: flex; flex-wrap: wrap; gap: 4px 28px; }
  .lp__grid { display: grid; gap: var(--uiowa-space-600) 8%; align-items: start; }
  .lp__grid--hero { grid-template-columns: minmax(0, 1.25fr) minmax(0, .82fr); align-items: center; }
  .lp__grid--feature { grid-template-columns: minmax(0, .8fr) minmax(0, 1fr); align-items: center; }
  .lp__grid--two { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); }
  .lp__grid--news { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .lp__art { aspect-ratio: 4 / 3; display: grid; place-items: center; background: color-mix(in srgb, currentColor 12%, transparent); font-size: 0.75rem; letter-spacing: .08em; text-transform: uppercase; }
  .lp__cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--uiowa-space-150); margin-top: var(--tr-break); }
  .lp__card { background: var(--uiowa-color-neutral-100); border: 1px solid var(--uiowa-color-neutral-175); }
  .lp__card .lp__art { aspect-ratio: 16 / 9; }
  .lp__card .lp__stack { padding: var(--tr-related); }
  /* The closing section is centered. */
  .lp__closing { max-width: 60rem; margin: 0 auto; text-align: center; }
  .lp__closing .lp__btns { justify-content: center; }
  .lp__t, .lp__hl, .lp__sh, .lp__h { overflow-wrap: anywhere; }
  .lp__eb { text-transform: uppercase; letter-spacing: .04em; }
  .lp__leadin { max-width: 36ch; }
  .lp__link { color: inherit; text-decoration: underline; text-underline-offset: .15em; }
  .lp__btns { display: flex; flex-wrap: wrap; gap: calc(var(--tr-body) * 0.75); }
  .lp__btn { display: inline-block; padding: calc(var(--tr-body) * 0.7) calc(var(--tr-body) * 1.05); background: var(--uiowa-color-neutral-900); color: var(--uiowa-color-neutral-0); text-decoration: none; }
  .lp__btn--plain { background: transparent; color: var(--uiowa-color-neutral-900); box-shadow: inset 0 0 0 1px var(--uiowa-color-neutral-900); }
  /* Each section's headline stepper sits in the band's top padding, at the content's right edge. */
  .lp__step-row { position: relative; height: 0; z-index: 2; }
  .lp__step-row .lp__controls { position: absolute; right: var(--uiowa-layout-digital-large-margin); top: calc(var(--uiowa-space-600) * -1 + 20px); display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px 24px; }
  .lp__step { display: inline-flex; align-items: center; margin: 0; padding: 0; border: 0; }
  .lp__step-name { float: left; margin-right: 10px; padding: 0; font: var(--tr-f-tag); font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: inherit; opacity: .75; }
  .lp__step label { position: relative; display: inline-flex; align-items: center; justify-content: center; min-width: 48px; margin: 0; padding: 7px 12px; border: 1px solid var(--uiowa-color-neutral-400); border-left-width: 0; background: var(--uiowa-color-neutral-0); font: var(--tr-f-label); color: var(--uiowa-color-neutral-900); cursor: pointer; }
  .lp__step label:first-of-type { border-left-width: 1px; border-radius: 8px 0 0 8px; }
  .lp__step label:last-of-type { border-radius: 0 8px 8px 0; }
  .lp__step label.on { background: var(--uiowa-color-neutral-900); border-color: var(--uiowa-color-neutral-900); color: var(--uiowa-color-neutral-0); font-weight: 700; }
  .lp__step label:has(input:focus-visible) { outline: 2px solid var(--uiowa-color-neutral-900); outline-offset: 2px; z-index: 1; }
  .lp__step input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
  .lp .lp__list { margin: 0; padding: 0; list-style: none; }
  .lp__list li { position: relative; margin: 0; padding-left: 1.15em; line-height: inherit; }
  .lp__list li::before { content: "•"; position: absolute; left: 0; }
  .lp__foot { padding: var(--uiowa-space-300) 0; background: var(--uiowa-color-neutral-900); color: var(--uiowa-color-neutral-0); }
  .lp__foot .lp__in { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px 24px; }
  .lp__foot p { margin: 0; }
  .lp__foot a { color: inherit; }

  /* Text spacing, as the Foundations page defines it: Related between text that belongs together, Break
     between groups, and under a headline half the headline's size, never less than Break. */
  .lp__stack > * { margin: 0; }
  .lp__stack :is(h1, h2, h3, h4, p, :where(.lp__eb)), .lp__list { text-box: trim-both cap alphabetic; }
  .lp .lp__stack > * + * { margin-top: var(--tr-related); }
  .lp__stack > .lp__t + * { margin-top: max(calc(var(--tr-title) * 0.5), var(--tr-break)); }
  .lp__stack > .lp__hl + * { margin-top: max(calc(var(--lp-hl) * 0.5), var(--tr-break)); }
  .lp__stack > .lp__lead + *, .lp__stack > .lp__go, .lp__entries > * + *, .lp__stack + .lp__entries, .lp__entries + .lp__small { margin-top: var(--tr-break); }
  .lp__stack > .lp__list { margin-top: var(--tr-body); }
  .lp__grid--two > .lp__entries { margin-top: 0; }
  /* A compact heading, the title of an item in a list, card or schedule, sits on its own text: no gap, the
     two facing edges untrimmed. The items are a Break apart. */
  .lp .lp__stack > .lp__h { text-box: trim-start cap alphabetic; }
  .lp .lp__stack > .lp__h + * { margin-top: 0; text-box: trim-end cap alphabetic; }
  /* Spacing, shown: each gap painted on the element below it, its height the margin and its label the rule. */
  .lp .lp__stack > * + * { --gap-h: var(--tr-related); --gap-label: var(--gap-related); }
  .lp__stack > .lp__hl + * { --gap-h: max(calc(var(--lp-hl) * 0.5), var(--tr-break)); --gap-label: var(--gap-hl); }
  .lp__stack > .lp__t + * { --gap-h: max(calc(var(--tr-title) * 0.5), var(--tr-break)); --gap-label: var(--gap-hl); }
  .lp__stack > .lp__lead + *, .lp__stack > .lp__go, .lp__entries > * + *, .lp__entries + .lp__small { --gap-h: var(--tr-break); --gap-label: var(--gap-break); }
  .lp__stack > .lp__list { --gap-h: var(--tr-body); --gap-label: var(--gap-list); }
  .lp .lp__stack > .lp__h + * { --gap-h: 0px; --gap-label: none; }
  .lp--gaps :is(.lp__stack > *, .lp__entries > *, .lp__entries + .lp__small) { position: relative; }
  /* Spacing, shown: the gap above an element is filled with a solid blue band exactly its height, from the
     element's left edge to its right, naming the rule and the size; the role tags move to the right meanwhile. */
  .lp--gaps :is(.lp__stack > * + *, .lp__stack > .lp__go, .lp__entries > * + *, .lp__entries + .lp__small)::before { content: var(--gap-label, none); position: absolute; left: 0; right: 0; bottom: 100%; height: var(--gap-h, 0px); display: flex; align-items: center; padding: 0 8px; background: color-mix(in srgb, var(--uiowa-color-blue) 85%, transparent); font: var(--tr-f-tag); font-weight: 700; letter-spacing: .01em; text-transform: none; color: var(--uiowa-color-neutral-0); white-space: nowrap; overflow: hidden; pointer-events: none; z-index: 3; }
  .lp--gaps.lp--labels [data-label]::after { left: auto; right: 0; }
  .lp__small { text-box: trim-both cap alphabetic; }
  /* Labels: each heading's tag and the role it wears. */
  .lp--labels [data-label] { position: relative; }
  .lp--labels [data-label]::after { content: attr(data-label); position: absolute; left: 0; bottom: 100%; margin-bottom: 6px; padding: 2px 7px; border-radius: 3px; background: var(--uiowa-color-neutral-900); color: var(--uiowa-color-neutral-0); font: var(--tr-f-tag); font-weight: 700; letter-spacing: 0; text-transform: none; white-space: nowrap; z-index: 4; }
  @media (max-width: 900px) {
    .lp__grid--hero, .lp__grid--feature, .lp__grid--two, .lp__grid--news, .lp__cards { grid-template-columns: minmax(0, 1fr); }
    .lp__grid { row-gap: var(--uiowa-space-400); }
  }
`;

export const LandingPage = {
  name: 'Landing Page',
  render: () => ({
    components: { HierarchyPick, StepPick, HierPick },
    setup() {
      const hierarchy = ref('medium');
      const others = ref(false);
      // Every section's headline step, the hero's included; null is no headline.
      const steps = reactive({ hero: 6, ...BAND_STEPS });
      // Every section's hierarchy: null is the page's; 'large' shows the section one hierarchy up, to compare.
      const hiers = reactive(Object.fromEntries(['hero', ...BANDS].map((band) => [band, null])));
      const hierOf = (band) => hiers[band] || hierarchy.value;
      const eyebrows = ref(false);
      const gaps = ref(false);
      // The band's top heading level and where each heading's style comes from.
      const level = ref(2);
      const from = ref('role');
      const labels = ref(true);
      const role = (field) => roleOf(field, hierarchy.value);
      const s = computed(() => Object.fromEntries(['eyebrow', 'title', 'lead', 'details', 'text', 'small', 'button'].map((field) => [field, fieldStyle(field, hierarchy.value, steps.hero)])));
      // The same styles per section, on the section's hierarchy.
      const S = computed(() => Object.fromEntries(['hero', ...BANDS].map((band) => [band, Object.fromEntries(['eyebrow', 'title', 'lead', 'details', 'text', 'small', 'button'].map((field) => [field, fieldStyle(field, hierOf(band), steps.hero)]))])));
      const px = (key) => `${round(SPECS[key].px)}px`;
      // A band's headings: its headline when it has one, then its heading and its items, a level down each.
      const headings = (band) => {
        const hlStep = steps[band];
        const kinds = hlStep ? ['headline', 'heading', 'item'] : ['heading', 'item'];
        return Object.fromEntries(kinds.map((which, depth) => {
          const tag = `h${level.value + depth}`;
          const byRole = from.value === 'role';
          const key = byRole ? (which === 'headline' ? titleKey(hierOf(band), hlStep) : roleIn(BAND_FAMILIES[which], hierOf(band))) : roleIn(splitKey(HEADINGS[tag])[0], hierOf(band));
          const emphasis = byRole ? which === 'item' : OUTLINE_EMPHASIS.includes(tag);
          const label = `<${tag}> ${SPECS[key].name}${emphasis ? ', Roboto Medium' : ''}`;
          return [which, { tag, role: key, style: emphasis ? { ...styleOf(key), ...ITEM_EMPHASIS } : styleOf(key), label, px: px(key) }];
        }));
      };
      const H = computed(() => Object.fromEntries(BANDS.map((band) => [band, headings(band)])));
      const title = computed(() => fieldSpec('title', hierOf('hero'), steps.hero));
      // A section's variables: its hierarchy's body, gaps and labels, and the gap under its headline, half of
      // whatever size it renders at, never less than Break.
      const bandVars = (band) => {
        const h = hierOf(band);
        const body = SPECS[`body-${h}`].px;
        const vars = { ...hierarchyVars(h, steps.hero), ...gapLabels(body) };
        const headline = band === 'hero' ? { role: titleKey(h, steps.hero) } : H.value[band].headline;
        if (headline) {
          const under = Math.max(SPECS[headline.role].px / 2, body * 2);
          vars['--lp-hl'] = styleOf(headline.role).fontSize;
          vars['--gap-hl'] = `"Half the headline · ${round(under)}px"`;
        }
        return vars;
      };
      const titleLabel = computed(() => `<h1> ${title.value.name}`);
      const legend = computed(() => {
        const band = H.value.explore;
        const rows = [
          { where: 'Hero', what: `${titleLabel.value} ${round(title.value.px)}px · Subhead ${px(role('lead'))} · Subhead 2 ${px(role('details'))} · Body ${px(role('text'))}` },
          { where: 'Sections', what: `heading ${band.heading.label} ${band.heading.px} · lead-in Subhead 2 ${px(role('details'))} · items ${band.item.label} ${band.item.px}` },
        ];
        if (BANDS.some((band) => steps[band])) {
          const groups = new Map();
          BANDS.forEach((name) => {
            const headline = H.value[name].headline;
            const what = headline ? `${headline.label} ${headline.px}` : 'none, the list starts at its Subhead';
            groups.set(what, [...(groups.get(what) || []), BAND_NAMES[name]]);
          });
          rows.push({ where: 'Section headlines', what: [...groups].map(([what, names]) => `${names.join(', ')} ${what}`).join(' · ') });
        }
        return rows;
      });
      const scope = computed(() => ({ ...hierarchyVars(hierarchy.value, steps.hero), ...gapLabels(SPECS[`body-${hierarchy.value}`].px) }));
      return {
        css, lpCss, L: LANDING, s, S, H, bandVars, legend, scope, titleLabel,
        hierarchy, others, steps, hiers, eyebrows, gaps, level, from, labels,
      };
    },
    template: `
      <div :class="['lp', { 'lp--labels': labels, 'lp--gaps': gaps }]" :style="scope">
        <component is="style">{{ css }}{{ lpCss }}</component>
        <div class="lp__head">
          <div class="tr__eyebrow">Typography roles</div>
          <h1 class="tr__title">Landing Page</h1>
          <p class="tr__lede">
            <b>The Ideas in motion page, on the roles.</b> The whole page takes one hierarchy, Medium, the web's,
            so every role, gap and button comes from it. The reading size never changes within the page: emphasis
            steps the Headline, density drops roles. Each section has its own Headline stepper at the top right of
            its band, None, 4×, 6× or 8×. The page opens with the hero and the feature story at 6×, the closing at 8×,
            the rest at 4×, and the news and events list with none, starting at its Subhead: 4× is the system's
            default step, and the rest is one way to spend the two bigger steps, not a rule. Each section also has a
            Hierarchy switch, the page's or Large, to see that section on the bigger reading size; the rule stays one
            hierarchy per piece, so the switch is a comparison. Under a section's
            heading sit a Subhead 2 lead-in and item headings in Subhead 2's emphasis weight, Roboto Medium. Each item heading sits on
            its own text, and the items are a Break apart. Spacing paints every gap with its rule and size. The
            content sits in the standard container, <code>layout.container.max.standard</code>, 1310px, with the
            large tier's margin; the bands run edge to edge.
          </p>
          <p class="tr__lede">
            <b>The design picks the role; the outline picks the tag.</b> Each section heading is the Subhead and
            its items Subhead 2, at any heading level. Move the section headings down a level and, styled from
            the role, nothing changes on screen. Style them from the tag instead and each heading takes the
            h1–h6 default from the Document outline, so an h3 section heading becomes Subhead 2. A section headline
            is its section's heading, so the Subhead under it sits a level down, and the items with it; hide the
            section headlines and they move back up. Styled from the role, they look the same at either level.
          </p>
          <div class="lp__picks">
            <hierarchy-pick v-model="hierarchy" v-model:others="others" name="lp-hierarchy" />
            <fieldset class="tr__pick"><legend>Spacing</legend>
              <label :class="{ on: gaps }"><input type="radio" name="lp-gaps" :value="true" v-model="gaps"> Show</label>
              <label :class="{ on: !gaps }"><input type="radio" name="lp-gaps" :value="false" v-model="gaps"> Hide</label>
            </fieldset>
            <fieldset class="tr__pick"><legend>Section eyebrows</legend>
              <label :class="{ on: eyebrows }"><input type="radio" name="lp-eyebrows" :value="true" v-model="eyebrows"> Show</label>
              <label :class="{ on: !eyebrows }"><input type="radio" name="lp-eyebrows" :value="false" v-model="eyebrows"> Hide</label>
            </fieldset>
          </div>
          <div class="lp__picks">
            <fieldset class="tr__pick"><legend>Section headings</legend>
              <label :class="{ on: level === 2 }"><input type="radio" name="lp-level" :value="2" v-model="level"> Start at h2</label>
              <label :class="{ on: level === 3 }"><input type="radio" name="lp-level" :value="3" v-model="level"> Start at h3</label>
            </fieldset>
            <fieldset class="tr__pick"><legend>Style from</legend>
              <label :class="{ on: from === 'role' }"><input type="radio" name="lp-from" value="role" v-model="from"> The role</label>
              <label :class="{ on: from === 'tag' }"><input type="radio" name="lp-from" value="tag" v-model="from"> The tag</label>
            </fieldset>
            <fieldset class="tr__pick"><legend>Labels</legend>
              <label :class="{ on: labels }"><input type="radio" name="lp-labels" :value="true" v-model="labels"> Show</label>
              <label :class="{ on: !labels }"><input type="radio" name="lp-labels" :value="false" v-model="labels"> Hide</label>
            </fieldset>
          </div>
          <ul class="lp__legend">
            <li v-for="l in legend" :key="l.where"><b>{{ l.where }}</b> · {{ l.what }}</li>
          </ul>
        </div>

        <header class="lp__site">
          <nav class="lp__in lp__nav" aria-label="Site">
            <a href="#" class="lp__brand" :style="s.button" @click.prevent>Ideas in motion</a>
            <span class="lp__links"><a v-for="link in L.nav" :key="link" href="#" :style="s.button" @click.prevent>{{ link }}</a></span>
          </nav>
        </header>

        <section class="lp__band lp__band--gold" :style="bandVars('hero')">
          <div class="lp__in lp__step-row"><div class="lp__controls"><hier-pick v-model="hiers.hero" :page="hierarchy" name="lp-hier-hero" /><step-pick v-model="steps.hero" name="lp-step-hero" /></div></div>
          <div class="lp__in lp__grid lp__grid--hero">
            <div class="lp__stack">
              <div class="lp__eb" :style="S.hero.eyebrow">{{ L.hero.eyebrow }}</div>
              <h1 class="lp__t" :style="S.hero.title" :data-label="titleLabel">Ideas in<br>motion.</h1>
              <p class="lp__lead" :style="S.hero.lead">{{ L.hero.lead }}</p>
              <p class="lp__details" :style="S.hero.details"><span class="type-subhead-2--emphasis">{{ L.hero.date }}</span><br>{{ L.hero.place }}</p>
              <p :style="S.hero.text">{{ L.hero.text }}</p>
              <div class="lp__btns lp__go">
                <a href="#" class="lp__btn" :style="S.hero.button" @click.prevent>Explore the day ↗</a>
                <a href="#" class="lp__btn lp__btn--plain" :style="S.hero.button" @click.prevent>Plan your visit →</a>
              </div>
            </div>
            <div class="lp__art">Image</div>
          </div>
        </section>

        <section class="lp__band lp__band--dark" :style="bandVars('idea')">
          <div class="lp__in lp__step-row"><div class="lp__controls"><hier-pick v-model="hiers.idea" :page="hierarchy" name="lp-hier-idea" /><step-pick v-model="steps.idea" name="lp-step-idea" none /></div></div>
          <div class="lp__in lp__grid lp__grid--feature">
            <div class="lp__art">Image</div>
            <div class="lp__stack">
              <div v-if="eyebrows" class="lp__eb" :style="S.idea.eyebrow">{{ L.idea.eyebrow }}</div>
              <component v-if="H.idea.headline" :is="H.idea.headline.tag" class="lp__hl" :style="H.idea.headline.style" :data-label="H.idea.headline.label">{{ L.idea.headline }}</component>
              <component :is="H.idea.heading.tag" class="lp__sh" :style="H.idea.heading.style" :data-label="H.idea.heading.label">{{ L.idea.title }}</component>
              <p :style="S.idea.text">{{ L.idea.text }}</p>
              <p class="lp__go"><a href="#" class="lp__link" :style="S.idea.button" @click.prevent>{{ L.idea.link }} ↗</a></p>
            </div>
          </div>
        </section>

        <section class="lp__band" :style="bandVars('explore')">
          <div class="lp__in lp__step-row"><div class="lp__controls"><hier-pick v-model="hiers.explore" :page="hierarchy" name="lp-hier-explore" /><step-pick v-model="steps.explore" name="lp-step-explore" none /></div></div>
          <div class="lp__in">
            <div class="lp__stack">
              <div v-if="eyebrows" class="lp__eb" :style="S.explore.eyebrow">{{ L.explore.eyebrow }}</div>
              <component v-if="H.explore.headline" :is="H.explore.headline.tag" class="lp__hl" :style="H.explore.headline.style" :data-label="H.explore.headline.label">{{ L.explore.headline }}</component>
              <component :is="H.explore.heading.tag" class="lp__sh" :style="H.explore.heading.style" :data-label="H.explore.heading.label">{{ L.explore.title }}</component>
              <p class="lp__leadin" :style="S.explore.details">{{ L.explore.lead }}</p>
            </div>
            <div class="lp__cards">
              <article v-for="card in L.explore.cards" :key="card.title" class="lp__card">
                <div class="lp__art">Image</div>
                <div class="lp__stack">
                  <component :is="H.explore.item.tag" class="lp__h" :style="H.explore.item.style" :data-label="H.explore.item.label">{{ card.title }}</component>
                  <p :style="S.explore.text">{{ card.text }}</p>
                  <p class="lp__go"><a href="#" class="lp__link" :style="S.explore.button" @click.prevent>{{ card.link }} ↗</a></p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section class="lp__band lp__band--gray" :style="bandVars('day')">
          <div class="lp__in lp__step-row"><div class="lp__controls"><hier-pick v-model="hiers.day" :page="hierarchy" name="lp-hier-day" /><step-pick v-model="steps.day" name="lp-step-day" none /></div></div>
          <div class="lp__in lp__grid lp__grid--two">
            <div class="lp__stack">
              <div v-if="eyebrows" class="lp__eb" :style="S.day.eyebrow">{{ L.day.eyebrow }}</div>
              <component v-if="H.day.headline" :is="H.day.headline.tag" class="lp__hl" :style="H.day.headline.style" :data-label="H.day.headline.label">{{ L.day.headline }}</component>
              <component :is="H.day.heading.tag" class="lp__sh" :style="H.day.heading.style" :data-label="H.day.heading.label">{{ L.day.title }}</component>
              <p class="lp__leadin" :style="S.day.details">{{ L.day.lead }}</p>
            </div>
            <div>
              <div class="lp__entries">
                <div v-for="item in L.day.items" :key="item.title" class="lp__stack">
                  <component :is="H.day.item.tag" class="lp__h" :style="H.day.item.style" :data-label="H.day.item.label">{{ item.title }}</component>
                  <p :style="S.day.text">{{ item.text }}</p>
                  <ul v-if="item.list" class="lp__list" :style="S.day.text"><li v-for="line in item.list" :key="line">{{ line }}</li></ul>
                </div>
              </div>
              <p class="lp__small" :style="S.day.small">{{ L.day.small }}</p>
            </div>
          </div>
        </section>

        <section class="lp__band" aria-label="News and events" :style="bandVars('news')">
          <div class="lp__in lp__step-row"><div class="lp__controls"><hier-pick v-model="hiers.news" :page="hierarchy" name="lp-hier-news" /><step-pick v-model="steps.news" name="lp-step-news" none /></div></div>
          <div class="lp__in lp__stack">
            <div v-if="eyebrows" class="lp__eb" :style="S.news.eyebrow">{{ L.news.eyebrow }}</div>
            <component v-if="H.news.headline" :is="H.news.headline.tag" class="lp__hl" :style="H.news.headline.style" :data-label="H.news.headline.label">{{ L.news.headline }}</component>
            <div class="lp__grid lp__grid--news">
              <div v-for="col in L.news.columns" :key="col.title">
                <div class="lp__stack">
                  <component :is="H.news.heading.tag" class="lp__sh" :style="H.news.heading.style" :data-label="H.news.heading.label">{{ col.title }}</component>
                  <p class="lp__leadin" :style="S.news.details">{{ col.lead }}</p>
                </div>
                <div class="lp__entries">
                  <div v-for="item in col.items" :key="item.title" class="lp__stack">
                    <component :is="H.news.item.tag" class="lp__h" :style="H.news.item.style" :data-label="H.news.item.label"><a href="#" class="lp__link" @click.prevent>{{ item.title }}</a></component>
                    <p :style="S.news.text">{{ item.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="lp__band lp__band--gray" :style="bandVars('visit')">
          <div class="lp__in lp__step-row"><div class="lp__controls"><hier-pick v-model="hiers.visit" :page="hierarchy" name="lp-hier-visit" /><step-pick v-model="steps.visit" name="lp-step-visit" none /></div></div>
          <div class="lp__in lp__grid lp__grid--two">
            <div class="lp__stack">
              <div v-if="eyebrows" class="lp__eb" :style="S.visit.eyebrow">{{ L.visit.eyebrow }}</div>
              <component v-if="H.visit.headline" :is="H.visit.headline.tag" class="lp__hl" :style="H.visit.headline.style" :data-label="H.visit.headline.label">{{ L.visit.headline }}</component>
              <component :is="H.visit.heading.tag" class="lp__sh" :style="H.visit.heading.style" :data-label="H.visit.heading.label">{{ L.visit.title }}</component>
              <p class="lp__leadin" :style="S.visit.details">{{ L.visit.lead }}</p>
              <p class="lp__go"><a href="#" class="lp__link" :style="S.visit.button" @click.prevent>{{ L.visit.link }} ↗</a></p>
            </div>
            <div class="lp__entries">
              <div v-for="item in L.visit.items" :key="item.title" class="lp__stack">
                <component :is="H.visit.item.tag" class="lp__h" :style="H.visit.item.style" :data-label="H.visit.item.label">{{ item.title }}</component>
                <p :style="S.visit.text">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="lp__band lp__band--gold" :style="bandVars('join')">
          <div class="lp__in lp__step-row"><div class="lp__controls"><hier-pick v-model="hiers.join" :page="hierarchy" name="lp-hier-join" /><step-pick v-model="steps.join" name="lp-step-join" none /></div></div>
          <div class="lp__in">
            <div class="lp__stack lp__closing">
              <div v-if="eyebrows" class="lp__eb" :style="S.join.eyebrow">{{ L.join.eyebrow }}</div>
              <component v-if="H.join.headline" :is="H.join.headline.tag" class="lp__hl" :style="H.join.headline.style" :data-label="H.join.headline.label">{{ L.join.headline }}</component>
              <component :is="H.join.heading.tag" class="lp__sh" :style="H.join.heading.style" :data-label="H.join.heading.label">{{ L.join.title }}</component>
              <p :style="S.join.text">{{ L.join.text }}</p>
              <div class="lp__btns lp__go">
                <a href="#" class="lp__btn" :style="S.join.button" @click.prevent>Take another look ↑</a>
                <a href="#" class="lp__btn lp__btn--plain" :style="S.join.button" @click.prevent>Plan your visit →</a>
              </div>
            </div>
          </div>
        </section>

        <footer class="lp__foot">
          <div class="lp__in">
            <p class="lp__brand" :style="s.button">Ideas in motion</p>
            <p :style="s.small">{{ L.footer }}</p>
            <a href="#" :style="s.button" @click.prevent>Back to top ↑</a>
          </div>
        </footer>
      </div>
    `,
  }),
};

// Make it your day: the Landing Page's day band as an event schedule, then its hero as the Banner, each beside the
// HTML it renders and the CSS its classes match. The HTML uses the type classes in _type-roles.scss, so the Hierarchy
// switch changes one line of it. The bands, the gaps and the buttons are this page's CSS; the gaps read the
// properties the hierarchy class sets.
const DAY_TITLE = 'Event schedule for today';
const DAY_HIERARCHIES = [['medium', 'Default (Medium)'], ['large', 'Large']];
// Medium is the default, so its section takes no class.
const sectionTag = (hierarchy) => (hierarchy === 'medium' ? '<section>' : `<section class="type-scale--${hierarchy}">`);
const headlineClass = (step) => (step === 4 ? 'type-headline' : `type-headline-${step}x`);

function scheduleHtml(hierarchy, leadIn) {
  const { lead, items, small } = LANDING.day;
  return [
    sectionTag(hierarchy),
    `  <h2 class="type-subhead">${DAY_TITLE}</h2>`,
    ...(leadIn ? [`  <p class="type-subhead-2">${lead}</p>`] : []),
    ...items.flatMap(({ title, text, list }) => [
      `  <h3 class="type-subhead-2 type-subhead-2--emphasis">${title}</h3>`,
      `  <p class="type-body">${text}</p>`,
      ...(list ? ['  <ul class="type-body">', ...list.map((line) => `    <li>${line}</li>`), '  </ul>'] : []),
    ]),
    `  <p class="type-small-print">${small}</p>`,
    '</section>',
  ].join('\n');
}

function bannerHtml(hierarchy, step) {
  const { eyebrow, lead, date, place, text } = LANDING.hero;
  return [
    sectionTag(hierarchy),
    `  <div class="type-eyebrow">${eyebrow}</div>`,
    `  <h1 class="${headlineClass(step)}">Ideas in<br>motion.</h1>`,
    `  <p class="type-subhead">${lead}</p>`,
    `  <p class="type-subhead-2"><span class="type-subhead-2--emphasis">${date}</span><br>${place}</p>`,
    `  <p class="type-body">${text}</p>`,
    '  <div>',
    '    <a href="#" class="type-label--large">Explore the day ↗</a>',
    '    <a href="#" class="type-label--large">Plan your visit →</a>',
    '  </div>',
    '</section>',
  ].join('\n');
}

// The HTML as numbered lines, with the section's opening tag marked: the one line the Hierarchy switch changes.
const codeLines = (html) => linesOf(html).map((line) => (line.text.startsWith('<section') ? { ...line, tone: 'mark' } : line));

// A number to three places, so the Labels' 16.625px reads exactly.
const exact = (n) => String(Math.round(n * 1000) / 1000);

// Every style rule in the stylesheets the browser loaded.
function loadedStyleRules() {
  const rules = [];
  for (const sheet of document.styleSheets) {
    let list;
    try {
      list = sheet.cssRules;
    } catch {
      continue;
    }
    rules.push(...[...list].filter((rule) => rule instanceof CSSStyleRule));
  }
  return rules;
}

// The files the CSS tab's parts come from. The token build writes the second from the token files in src/tokens/.
const ROLES_FILE = 'src/scss/base/_type-roles.scss';
const TOKENS_FILE = 'src/scss/abstracts/_tokens-generated.scss';

// The CSS a design's classes use on a hierarchy, as the browser loaded it, in parts, each under a bar naming its file.
// On Default: the default rule on :root and the tokens it reads, marked. On another hierarchy, nothing is removed: the
// section's class sets the same properties again, so inside the section its values override the defaults it would
// inherit from :root. That shows as the :root rule with those declarations struck through, then the class's rule and
// the tokens it reads, marked. Last, each class's rules in the order the HTML first uses the class, and the tokens
// they read. A token's comment is the value it resolves to.
function cssRows(html, hierarchy) {
  const rules = loadedStyleRules();
  const tokens = new Map();
  for (const rule of rules.filter((r) => r.selectorText === ':root')) {
    for (const property of rule.style) tokens.set(property, rule.style.getPropertyValue(property).trim());
  }
  const resolve = (value, depth = 0) => (depth > 8 ? value : value.replace(/var\((--[\w-]+)\)/g, (match, name) => (tokens.has(name) ? resolve(tokens.get(name), depth + 1) : match)));
  const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const shown = new Set();
  // The tokens these rules read that aren't listed yet, in the order the rules name them.
  const tokensRead = (picked) => {
    const names = [];
    for (const rule of picked) {
      for (const property of rule.style) {
        for (const [, name] of rule.style.getPropertyValue(property).matchAll(/var\((--[\w-]+)\)/g)) {
          if (tokens.has(name) && !shown.has(name)) {
            shown.add(name);
            names.push(name);
          }
        }
      }
    }
    return names;
  };
  const tokenLine = (name) => {
    const declared = tokens.get(name);
    const resolved = resolve(declared);
    const rem = resolved.match(/^([\d.]+)rem$/);
    const value = rem ? `${resolved} = ${exact(rem[1] * rootPx)}px` : resolved;
    return `  ${name}: ${declared};${value === declared ? '' : ` /* ${value} */`}`;
  };
  // A rule's lines; toneOf gives each declaration's tone by its property.
  const ruleRows = (rule, toneOf = () => undefined) => [
    { text: `${rule.selectorText} {` },
    ...[...rule.style].map((property) => ({ text: `  ${property}: ${rule.style.getPropertyValue(property).trim()};`, tone: toneOf(property) })),
    { text: '}' },
  ];
  const tokenRows = (names) => [':root {', ...names.map(tokenLine), '}'].map((text) => ({ text }));
  const marked = (rows) => rows.map((row) => ({ ...row, tone: 'mark' }));
  const part = (file, what, rows) => [{ text: `${file} · ${what}`, tone: 'hunk' }, ...rows];

  const defaultRules = rules.filter((rule) => rule.selectorText === ':where(:root), .type-scale--medium');
  const classRules = hierarchy === 'medium' ? [] : rules.filter((rule) => rule.selectorText === `.type-scale--${hierarchy}`);
  const classes = [...new Set([...html.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(' ')))]
    .filter((name) => !name.startsWith('type-scale--'));
  const roleRules = classes.flatMap((name) => rules.filter((rule) => rule.selectorText === `.${name}` || rule.selectorText.startsWith(`.${name} `)));
  const hierarchyTokens = tokensRead(classRules.length ? classRules : defaultRules);
  const roleTokens = tokensRead(roleRules);
  const roleParts = [
    ...part(ROLES_FILE, 'the role rules', roleRules.flatMap((rule, i) => [...(i ? [{ text: '' }] : []), ...ruleRows(rule)])),
    ...part(TOKENS_FILE, 'the tokens the role rules read', tokenRows(roleTokens)),
  ];  if (!classRules.length) {
    return [
      ...part(ROLES_FILE, 'the default, on :root', marked(defaultRules.flatMap((rule) => ruleRows(rule)))),
      ...part(TOKENS_FILE, 'the tokens it reads', marked(tokenRows(hierarchyTokens))),
      ...roleParts,
    ];
  }
  const setAgain = new Set(classRules.flatMap((rule) => [...rule.style]));
  const className = `.type-scale--${hierarchy}`;
  return [
    ...part(ROLES_FILE, `the default, on :root, overridden inside the section by ${className}`, defaultRules.flatMap((rule) => ruleRows(rule, (property) => (setAgain.has(property) ? 'strike' : undefined)))),
    ...part(ROLES_FILE, `${className}, on the section`, marked(classRules.flatMap((rule) => ruleRows(rule)))),
    ...part(TOKENS_FILE, `the tokens ${className} reads`, marked(tokenRows(hierarchyTokens))),
    ...roleParts,
  ];
}

// A design's code in two tabs: its HTML, and the CSS its classes use.
const CodeTabs = {
  components: { CodeBlock },
  props: {
    name: { type: String, required: true },
    where: { type: String, required: true },
    html: { type: Array, required: true },
    css: { type: Array, required: true },
    // Off Default, the CSS shows what the section's class overrides.
    overrides: { type: Boolean, default: false },
  },
  setup() {
    const tab = ref('html');
    // The arrow keys move between the two tabs, as in any tab list.
    const move = (event) => {
      tab.value = tab.value === 'html' ? 'css' : 'html';
      nextTick(() => event.target.parentElement.querySelector('[aria-selected="true"]').focus());
    };
    return { tab, move, TABS: [['html', 'HTML'], ['css', 'CSS']] };
  },
  template: `
    <div>
      <div class="myd__tabs" role="tablist" aria-label="Code">
        <button v-for="[value, text] in TABS" :key="value" type="button" role="tab" :id="name + '-' + value" :aria-selected="String(tab === value)" :aria-controls="name + '-code'" :tabindex="tab === value ? 0 : -1" @click="tab = value" @keydown.left.prevent="move" @keydown.right.prevent="move">{{ text }}</button>
      </div>
      <div :id="name + '-code'" role="tabpanel" :aria-labelledby="name + '-' + tab" :class="{ myd__css: tab === 'css' }">
        <code-block :file="tab === 'html' ? 'HTML' : 'CSS'" :where="where" :lines="tab === 'html' ? html : css" />
        <p v-if="tab === 'css' && overrides" class="tr__note">
          Nothing is removed: every rule here is always in the stylesheet. <code>.type-scale--large</code> sets the
          five hierarchy properties again on the section, so inside it, its values override the defaults the section
          would inherit from <code>:root</code>, which are struck through. Outside the section, the defaults still
          apply. The role rules read <code>--uiowa-type-base</code> and the line heights it sets, so they're the same
          on every hierarchy. Each gray bar names the file the lines under it come from;
          <code>_tokens-generated.scss</code> is written by the token build from the token files in
          <code>src/tokens/</code> and isn't in git. A token's comment is the value it resolves to.
        </p>
        <p v-else-if="tab === 'css'" class="tr__note">
          The CSS this design's classes use, as the browser loaded it; each gray bar names the file the lines under it
          come from. The marked parts set the hierarchy, through <code>:root</code> on Default.
          <code>_tokens-generated.scss</code> is written by the token build from the token files in
          <code>src/tokens/</code> and isn't in git; a token's comment is the value it resolves to. Pick Large to see
          what its class overrides.
        </p>
      </div>
    </div>`,
};

// Each spec row: a class, the element it's on, and the selector its values are read from.
const SCHEDULE_SPECS = [
  ['type-subhead', '<h2>', 'h2'],
  ['type-subhead-2', '<p>, the lead-in', 'p.type-subhead-2'],
  ['type-subhead-2 type-subhead-2--emphasis', '<h3>', 'h3'],
  ['type-body', '<p> and <ul>', '.type-body'],
  ['type-small-print', '<p>', '.type-small-print'],
];
const bannerSpecs = (step) => [
  ['type-eyebrow', '<div>', '.type-eyebrow'],
  [headlineClass(step), '<h1>', 'h1'],
  ['type-subhead', '<p>', '.type-subhead'],
  ['type-subhead-2', '<p>', '.type-subhead-2'],
  ['type-subhead-2--emphasis', '<span>, the date', '.type-subhead-2--emphasis'],
  ['type-body', '<p>', '.type-body'],
  ['type-label--large', '<a>', '.type-label--large'],
];
// A spec as the browser computes it: the first family and its weight, the size, and the line height as a ratio and in
// px.
function computedSpec(el) {
  const style = getComputedStyle(el);
  const size = parseFloat(style.fontSize);
  const lineHeight = parseFloat(style.lineHeight);
  const face = style.fontFamily.split(',')[0].replace(/["']/g, '').trim();
  const uppercase = style.textTransform === 'uppercase' ? ', uppercase' : '';
  return {
    font: `${face} ${WEIGHT_NAMES[style.fontWeight] || style.fontWeight}${uppercase}`,
    size: `${exact(size)}px`,
    lineHeight: `${round(lineHeight / size)} · ${exact(lineHeight)}px`,
  };
}
const SpecTable = {
  props: { rows: { type: Array, required: true }, hierarchy: { type: String, required: true } },
  template: `
    <table class="tr__table myd__specs">
      <caption>Specs on {{ hierarchy }}, as the browser computes them</caption>
      <thead><tr><th scope="col">Class</th><th scope="col">Font</th><th scope="col">Size</th><th scope="col">Line height</th></tr></thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i"><td><code>{{ row.cls }}</code><small>{{ row.tag }}</small></td><td>{{ row.font }}</td><td>{{ row.size }}</td><td>{{ row.lineHeight }}</td></tr>
      </tbody>
    </table>`,
};

const dayCss = `
  .myd { padding-bottom: 64px; }
  .myd .tr__lede code { font-family: var(--uiowa-font-family-mono, monospace); font-size: 0.9em; }
  .myd__picks { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; margin-top: 16px; }
  .myd__picks .tr__pick { margin: 0; }
  .myd__check { display: inline-flex; align-items: center; gap: 6px; font: var(--tr-f-label); color: var(--uiowa-color-neutral-900); cursor: pointer; }
  .myd__check input { margin: 0; }
  .myd__toggle { padding: 6px 14px; border: 1px solid var(--uiowa-color-neutral-800); border-radius: 999px; background: var(--uiowa-color-neutral-0); font: var(--tr-f-label); color: var(--uiowa-color-neutral-800); cursor: pointer; }
  .myd__toggle[aria-pressed="true"] { background: var(--uiowa-color-neutral-800); color: var(--uiowa-color-neutral-0); }
  .myd__toggle:focus-visible { outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }
  /* The code's tabs sit on top of its caption bar; the open one shares the bar's gray. */
  .myd__tabs { display: flex; }
  .myd__tabs button { margin: 0; padding: 6px 16px; border: 1px solid var(--uiowa-color-border-default); border-bottom: 0; background: var(--uiowa-color-neutral-100); font: var(--tr-f-label); color: var(--uiowa-color-neutral-700); cursor: pointer; }
  .myd__tabs button + button { margin-left: -1px; }
  .myd__tabs button[aria-selected="true"] { background: var(--uiowa-color-neutral-200); color: var(--uiowa-color-neutral-900); font-weight: 700; }
  .myd__tabs button:focus-visible { position: relative; outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }
  /* The CSS tab has no line numbers, since its parts come from different files, so it drops their column. */
  .myd__css .cv__n { display: none; }
  .myd__css .cv__line { grid-template-columns: minmax(0, 1fr); padding-left: var(--uiowa-space-100); }
  /* A default the section's class sets again: overridden inside the section, struck through as DevTools shows it. */
  .myd .cv__line--strike .cv__text { text-decoration: line-through; color: var(--uiowa-color-neutral-500); }
  /* Each design beside its HTML; below 1100px the HTML sits under it. */
  .myd__row { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 24px; align-items: start; max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 0 var(--uiowa-layout-digital-large-margin); }
  .myd__design { padding: 48px 40px; }
  .myd__controls { display: flex; justify-content: flex-end; margin-bottom: 32px; }
  .myd__specs { margin-top: 16px; font: var(--tr-f-small); }
  .myd__specs caption { caption-side: top; padding-bottom: 6px; text-align: left; color: var(--uiowa-color-neutral-500); }
  .myd .myd__specs :is(th, td) { padding: 6px 8px; }
  /* A class name and a number stay on one line; the font names wrap. */
  .myd__specs code, .myd__specs th, .myd__specs td:nth-child(n + 3) { white-space: nowrap; }
  .myd__specs code { font-size: 0.95em; }
  @media (max-width: 1100px) {
    .myd__row { grid-template-columns: minmax(0, 1fr); }
  }

  /* The designs. Every block is trimmed to its cap height and baseline, so each gap is exactly --gap-h, the size
     its rule sets; Spacing paints it with --gap-label. */
  .myd .myd__design section > * { margin: 0; }
  /* :where() keeps this rule at an element's weight, so the schedule's h3 rules below still override it. */
  .myd .myd__design section :is(h1, h2, h3, p, ul, :where(.type-eyebrow)) { text-box: trim-both cap alphabetic; }
  .myd .myd__design section > * + * { margin-top: var(--gap-h); }
  .myd .myd__design ul { padding: 0; list-style: none; }  .myd .myd__design li { position: relative; margin: 0; padding-left: 1.15em; }
  .myd .myd__design li::before { content: "•"; position: absolute; left: 0; }
  /* The schedule: Related under the heading, a Break before an item and before the small print, one reading size
     before a list, and each item heading on its own text, their facing edges untrimmed. */
  .myd .myd__s section > * + * { --gap-h: var(--uiowa-type-space-related); --gap-label: var(--gap-related); }
  .myd .myd__s section > :is(p, ul) + h3, .myd .myd__s section > * + .type-small-print { --gap-h: var(--uiowa-type-space-break); --gap-label: var(--gap-break); }
  .myd .myd__s section > p + ul { --gap-h: var(--uiowa-type-base); --gap-label: var(--gap-list); }
  .myd .myd__s section > h3 { text-box: trim-start cap alphabetic; }
  .myd .myd__s section > h3 + * { --gap-h: 0px; --gap-label: none; text-box: trim-end cap alphabetic; }
  /* The Banner: Related, half the headline under it but never less than Break, and a Break under the Subhead and
     above the buttons. */
  .myd .myd__b section > * + * { --gap-h: var(--uiowa-type-space-related); --gap-label: var(--gap-related); }
  .myd .myd__b section > .type-headline + * { --gap-h: max(calc(var(--uiowa-type-base) * var(--uiowa-typography-headline-multiple) / 2), var(--uiowa-type-space-break)); --gap-label: var(--gap-hl); }
  .myd .myd__b section > .type-headline-6x + * { --gap-h: max(calc(var(--uiowa-type-base) * var(--uiowa-typography-headline-6x-multiple) / 2), var(--uiowa-type-space-break)); --gap-label: var(--gap-hl); }
  .myd .myd__b section > .type-headline-8x + * { --gap-h: max(calc(var(--uiowa-type-base) * var(--uiowa-typography-headline-8x-multiple) / 2), var(--uiowa-type-space-break)); --gap-label: var(--gap-hl); }
  .myd .myd__b section > .type-subhead + *, .myd .myd__b section > div:has(> a) { --gap-h: var(--uiowa-type-space-break); --gap-label: var(--gap-break); }
  .myd .myd__b h1 { overflow-wrap: anywhere; }
  .myd .myd__b section > div:has(> a) { display: flex; flex-wrap: wrap; gap: calc(var(--uiowa-type-base) * 0.75); }
  .myd .myd__b section > div > a { display: inline-block; padding: calc(var(--uiowa-type-base) * 0.7) calc(var(--uiowa-type-base) * 1.05); background: var(--uiowa-color-neutral-900); color: var(--uiowa-color-neutral-0); text-decoration: none; }
  .myd .myd__b section > div > a + a { background: transparent; color: var(--uiowa-color-neutral-900); box-shadow: inset 0 0 0 1px var(--uiowa-color-neutral-900); }
  /* Spacing, shown: each gap filled with a band its height, naming the rule and the size. */
  .myd--gaps .myd__design section > * { position: relative; }
  .myd--gaps .myd__design section > * + *::before { content: var(--gap-label, none); position: absolute; left: 0; right: 0; bottom: 100%; height: var(--gap-h, 0px); display: flex; align-items: center; padding: 0 8px; background: color-mix(in srgb, var(--uiowa-color-blue) 85%, transparent); font: var(--tr-f-tag); font-weight: 700; letter-spacing: normal; text-transform: none; color: var(--uiowa-color-neutral-0); white-space: nowrap; overflow: hidden; pointer-events: none; z-index: 3; }
`;

export const MakeItYourDay = {
  name: 'Landing Page · Make it your day',
  render: () => ({
    components: { StepPick, CodeTabs, SpecTable },
    setup() {
      const hierarchy = ref('medium');
      const leadIn = ref(false);
      const heroStep = ref(6);
      const gaps = ref(false);
      const specsOn = ref(false);
      const html = computed(() => ({ schedule: scheduleHtml(hierarchy.value, leadIn.value), banner: bannerHtml(hierarchy.value, heroStep.value) }));
      const code = computed(() => ({
        schedule: { html: codeLines(html.value.schedule), css: cssRows(html.value.schedule, hierarchy.value) },
        banner: { html: codeLines(html.value.banner), css: cssRows(html.value.banner, hierarchy.value) },
      }));
      const where = computed(() => Object.fromEntries(DAY_HIERARCHIES)[hierarchy.value]);
      const hierarchyName = computed(() => SIZE_NAMES[hierarchy.value]);
      // The labels Spacing paints, for the hierarchy and the Banner's headline step.
      const labelVars = computed(() => {
        const body = SPECS[`body-${hierarchy.value}`].px;
        const headline = SPECS[titleKey(hierarchy.value, heroStep.value)].px;
        return { ...gapLabels(body), '--gap-hl': `"Half the headline · ${round(Math.max(headline / 2, body * 2))}px"` };
      });
      // The specs, read from each design once it's drawn.
      const scheduleEl = ref(null);
      const bannerEl = ref(null);
      const specs = reactive({ schedule: [], banner: [] });
      const read = (root, rows) => rows.flatMap(([cls, tag, selector]) => {
        const el = root?.querySelector(selector);
        return el ? [{ cls, tag, ...computedSpec(el) }] : [];
      });
      const measure = () => {
        specs.schedule = read(scheduleEl.value, SCHEDULE_SPECS);
        specs.banner = read(bannerEl.value, bannerSpecs(heroStep.value));
      };
      onMounted(measure);
      watch([hierarchy, leadIn, heroStep], () => nextTick(measure));
      // The designs' links go nowhere.
      const stay = (event) => {
        if (event.target.closest('.myd__design a')) event.preventDefault();
      };
      return {
        css, lpCss, codeCss, dayCss, DAY_HIERARCHIES, hierarchy, leadIn, heroStep, gaps, specsOn,
        html, code, where, hierarchyName, labelVars, scheduleEl, bannerEl, specs, stay,
      };
    },
    template: `
      <div :class="['lp', 'myd', { 'myd--gaps': gaps }]" :style="labelVars" @click="stay">
        <component is="style">{{ css }}{{ lpCss }}{{ codeCss }}{{ dayCss }}</component>
        <div class="lp__head">
          <div class="tr__eyebrow">Typography roles</div>
          <h1 class="tr__title">Landing Page · Make it your day</h1>
          <p class="tr__lede">
            <b>One section from the Landing Page as an event schedule, then its hero as the Banner, each beside its
            HTML.</b> The schedule's heading is the Subhead, the preferred role for a section heading, and its items
            are Subhead 2 at its emphasis weight, Roboto Medium, with <code>type-subhead-2--emphasis</code>. Lead-in
            adds a line in Subhead 2 under the heading.
            Both designs are set with the type classes in <code>_type-roles.scss</code>, so the Hierarchy switch
            changes one line of each, marked in the HTML: Medium is the default and needs no class, and Large is
            <code>type-scale--large</code> on the section. Every size, line height and gap inside follows from that
            class; the CSS tab beside each design shows the rules and token values that make it so, and on Large,
            which defaults the class overrides. Show specs lists each class's font, size and line height as the browser
            computes them; Spacing
            paints every gap with its rule and size.
          </p>
          <p class="tr__note">
            The bands, the gaps between blocks and the buttons' boxes are this page's CSS, not part of the HTML. The
            gaps read <code>--uiowa-type-space-related</code>, <code>--uiowa-type-space-break</code> and
            <code>--uiowa-type-base</code>, which the hierarchy class sets.
          </p>
          <div class="myd__picks">
            <fieldset class="tr__pick"><legend>Hierarchy</legend>
              <label v-for="[value, text] in DAY_HIERARCHIES" :key="value" :class="{ on: hierarchy === value }"><input type="radio" name="myd-hierarchy" :value="value" v-model="hierarchy"> {{ text }}</label>
            </fieldset>
            <label class="myd__check"><input type="checkbox" v-model="leadIn"> Lead-in (Subhead 2)</label>
            <label class="myd__check"><input type="checkbox" v-model="gaps"> Spacing</label>
            <button type="button" class="myd__toggle" :aria-pressed="String(specsOn)" @click="specsOn = !specsOn">Show specs</button>
          </div>
        </div>
        <div class="myd__row">
          <div ref="scheduleEl" class="myd__design myd__s lp__band--gray" v-html="html.schedule"></div>
          <div>
            <code-tabs name="myd-schedule" :where="where" :html="code.schedule.html" :css="code.schedule.css" :overrides="hierarchy !== 'medium'" />
            <spec-table v-if="specsOn" :rows="specs.schedule" :hierarchy="hierarchyName" />
          </div>
        </div>
        <div class="lp__head">
          <h2 class="tr__h2">A Banner uses the entire hierarchy</h2>
          <p class="tr__lede">
            <b>Ideas in motion, the Landing Page’s hero, is a Banner.</b> Use the Banner component when a section needs
            the entire hierarchy: eyebrow, Headline, Subhead, Subhead 2, body and buttons. The HTML here is the type
            classes on plain elements, not the Banner component's markup.
          </p>
        </div>
        <div class="myd__row">
          <div class="myd__design myd__b lp__band--gold">
            <div class="myd__controls"><step-pick v-model="heroStep" name="myd-step" /></div>
            <div ref="bannerEl" v-html="html.banner"></div>
          </div>
          <div>
            <code-tabs name="myd-banner" :where="where" :html="code.banner.html" :css="code.banner.css" :overrides="hierarchy !== 'medium'" />
            <spec-table v-if="specsOn" :rows="specs.banner" :hierarchy="hierarchyName" />
          </div>
        </div>
      </div>
    `,
  }),
};

// Today's styles, and the role each would take: the headings the Document outline's h1–h6 defaults, both intros
// element--intro, the rest the nearest role in size, with the face the role carries. A composite today is one token with five channels;
// body is five tokens; the two sizes are a size alone on body.
// The Subhead 2 levels, h3 to h6, take Subhead 2's emphasis weight, Roboto Medium, as the Document outline sets them.
const TODAY = [
  ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tag) => ({ name: `Heading ${tag.slice(1)}`, key: `heading-${tag}`, token: `typography.heading.${tag}`, role: HEADINGS[tag], emphasis: HEADINGS[tag].startsWith('subhead-2') })),
  { name: 'Intro bold', key: 'intro-bold', token: 'typography.intro-bold', intro: 'element--intro' },
  { name: 'Intro light', key: 'intro-light', token: 'typography.intro-light', intro: 'element--intro' },
  { name: 'Body', key: 'paragraph', token: 'typography.paragraph', role: 'body-medium' },
  { name: 'Size large', key: 'paragraph', sizeKey: 'size-large', token: 'typography.size.large', role: 'subhead-2-medium' },
  { name: 'Size small', key: 'paragraph', sizeKey: 'size-small', token: 'typography.size.small', role: 'small-print-medium' },
];
// The intro under a page's title, from its own class: Subhead 2's face, weight and leading at the Subhead's size.
function introAfter(size, classes) {
  const subhead = SPECS[roleIn('subhead', size)];
  return {
    ...SPECS[roleIn('subhead-2', size)],
    name: `Intro ${SIZE_NAMES[size]}`,
    by: subhead.by,
    px: subhead.px,
    classes,
    style: { ...styleOf(roleIn('subhead-2', size)), fontSize: styleOf(roleIn('subhead', size)).fontSize },
  };
}
function todaySpec(row) {
  const token = at(row.token);
  const composite = token.$value && typeof token.$value === 'object' ? token.$value : null;
  const channel = (name) => (composite ? composite[name] : token[name]?.$value);
  const bodyChannel = (name) => at('typography.paragraph')[name].$value;
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
        let after;
        if (row.intro) {
          after = introAfter('medium', row.intro);
        } else {
          const [family] = splitKey(row.role);
          const weight = row.emphasis ? deref(at(`typography.${family}.fontWeightEmphasis`).$value) : null;
          after = weight
            ? { ...SPECS[row.role], weight, weightName: WEIGHT_NAMES[weight], style: { ...styleOf(row.role), fontWeight: emphasisOf(row.role) } }
            : { ...SPECS[row.role], style: styleOf(row.role) };
        }
        return {
          ...row,
          before,
          after,
          changed: { face: before.face !== after.face, weight: before.weight !== after.weight, leading: before.leading !== after.leading },
        };
      });
      return { css, rows, root, rendered };
    },
    template: `
      <div class="tr" ref="root">
        <component is="style">{{ css }}</component>
        <div class="tr__eyebrow">Typography roles</div>
        <h1 class="tr__title">Before and After</h1>
        <p class="tr__lede">
          <b>What the roles change.</b> Styles are named for their job, not a tag, so an h2 can look the
          way its job needs without borrowing another tag's style. One scale covers all text: banners,
          cards, buttons, form labels and badges, which set their own sizes in component CSS today, get
          places on it. Each hierarchy is a set of styles that are multiples of its body size, so a
          composition's ratio holds by construction and spacing follows the text. Each style is
          single-value tokens, so each becomes a Figma variable.
        </p>
        <p class="tr__lede">
          The roles are in the token files beside today's styles. Of today's classes only the intro classes take
          them, so the intro is the one style on the site that changes. Each of today's styles is on the left, read from the live tokens at this
          window width, and on the right the role it takes: for the headings the Document outline's h1–h6 defaults,
          Headline Medium, Subhead Medium, then Subhead 2 Medium in Roboto Medium for Headings 3 to 6; for both
          intros the one intro class, <code>element--intro</code>, Subhead 2 at the h2's size; and for the rest the role nearest in size on the web's
          hierarchy, Medium, with the face that role carries. Highlighter marks a
          face, weight or leading that changes; the size changes on every row.
        </p>
        <div class="tr__ba">
          <div class="tr__ba-col">Today</div>
          <div class="tr__ba-col">Before</div>
          <div class="tr__ba-col">After</div>
          <template v-for="r in rows" :key="r.name">
            <div class="tr__ba-label">{{ r.name }}</div>
            <div class="tr__ba-spec">
              <span :style="r.before.style" :data-measure="'before-' + r.name">{{ r.name }}</span>
              <span class="tr__cap"><code>{{ r.token }}</code> · {{ r.before.face }} {{ r.before.weightName }} {{ r.before.weight }} · {{ round(rendered['before-' + r.name] || 0) }}px · leading {{ r.before.leading }}</span>
            </div>
            <div class="tr__ba-spec">
              <span :style="r.after.style" :data-measure="'after-' + r.name">{{ r.name }}</span>
              <span class="tr__cap">
                <code>{{ r.after.classes }}</code> · <span :class="{ tr__hl: r.changed.face }">{{ r.after.face }}</span> <span :class="{ tr__hl: r.changed.weight }">{{ r.after.weightName }} {{ r.after.weight }}</span> · {{ r.after.by }}× · {{ round(rendered['after-' + r.name] || r.after.px) }}px · <span :class="{ tr__hl: r.changed.leading }">leading {{ r.after.leading }}</span>
              </span>
            </div>
          </template>
        </div>

        <h2 class="tr__h2">Why h3 to h6 share one size</h2>
        <p class="tr__lede">
          UIDS stops stepping down at the h3: h3 to h6 all take Subhead 2 at its emphasis weight, 1.5× the body.
          Two systems that style bare headings also hold their lower levels at one size:
        </p>
        <ul class="tr__next">
          <li><b>GOV.UK</b> has four heading sizes. The smallest, <code>govuk-heading-s</code>, is the body size,
            19px, and there is no smaller heading style.</li>
          <li><b>Tailwind Typography</b> sizes h1 to h3 and sets h4 at the body size. It gives h5 and h6 no styles
            of their own, so they take the body size too.</li>
        </ul>
        <p class="tr__lede">
          Others step down at every level, and their lowest headings end at or below the body size: Bootstrap's
          h6 is the body size, and USWDS and Primer set h4 at the body size and h5 and h6 below it. UIDS keeps h3
          to h6 above the body size, at 1.5× in the emphasis weight, so every heading stays bigger than the text
          under it.
        </p>

        <h2 class="tr__h2">Next steps</h2>
        <ol class="tr__next">
          <li><b>Bring fluid sizing to the web.</b> Today's headings clamp between 600 and 1310px; the roles are fixed. A fluid body size, or a Headline that clamps, is the candidate.</li>
          <li><b>Move UIDS onto the roles.</b> Point the paragraph, variables and utilities partials at the roles and retire today's heading, intro, body and size tokens. This is the step that changes how UIDS and SiteNow look.</li>
        </ol>
      </div>
    `,
    methods: { round },
  }),
};
