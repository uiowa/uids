import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import primitives from '../../tokens/primitives/typography.json';
import semantic from '../../tokens/semantic/typography.json';

/**
 * The typography roles, as the token files define them: one scale. Six families (Headline, Eyebrow, Subhead,
 * Subhead 2, Body, Small print) in X-Small, Small, Medium, Large and X-Large, and Label. Body X-Small, Small,
 * Medium, Large and X-Large are the five body sizes, 12.67, 16, 19, 24 and 36px (9.5, 12, 14.25, 18 and 27pt), and each names a hierarchy that
 * every template, screen or print, chooses from: the family sizes of the same name, each a multiple of that
 * body size. Label is one set for every hierarchy. Eight pages: Formats (the hierarchy each format takes, Medium
 * first), Style Library (the scale, and the hierarchy each body size names), Hierarchy (one hierarchy at actual size, with its spacing), Highlight (the box and the
 * band), Landing Page (an event page on one hierarchy, with its headings' roles kept apart from their tags),
 * Make it your day (an event schedule's heading role, SiteNow beside the proposed hierarchy, then the Banner), Blog Post (one composition, with the h1–h6 ladder) and
 * Before and After (today's styles beside the role each would take). Every
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

// A role's spec from the token files: face, weight, multiple of its body size, px, leading. A body size is
// 1× of the hierarchy it names.
function roleSpec(key) {
  // a family key can carry a hyphen ('subhead-2'), and so can a size ('x-small')
  const [, family, size] = key.match(/^(.+?)-(x-small|small|medium|large|x-large)$/);
  const tokenName = `typography.${family}.${size}`;
  const token = at(tokenName);
  const weight = deref(token.fontWeight.$value);
  const multiply = token.fontSize.$extensions?.['edu.uiowa.multiply'];
  const by = multiply ? multiply.by : 1;
  return {
    key,
    name: `${familyName(family)} ${SIZE_NAMES[size]}`,
    tokenName,
    face: deref(token.fontFamily.$value)[0],
    weight,
    weightName: WEIGHT_NAMES[weight] || String(weight),
    by,
    px: by * deref(token.fontSize.$value).value * 16,
    leading: deref(token.lineHeight.$value),
  };
}
// A role's style, through the live custom properties.
const styleOf = (key) => Object.fromEntries(CHANNELS.map(([name, property]) => [property, `var(--uiowa-typography-${key}-${name})`]));
const roleIn = (family, size) => `${family}-${size}`;

const FAMILY_NOTES = {
  headline: 'The title: once per piece.',
  'headline-6x': 'The headline for a bigger statement, 6× its body size.',
  'headline-8x': 'The headline for the biggest statement, 8× its body size.',
  eyebrow: 'The label above a title, in uppercase; it names the composition. Also pre-title, kicker, caption (GOV.UK), detail (Spectrum). The Banner pre-title; not the Card pre-title, which is a Label.',
  subhead: 'The lead-in under a title, and section heads.',
  'subhead-2': 'Details and short headings.',
  body: 'Reading text. Each body size names a hierarchy.',
  'small-print': 'Credits, dates and fine print.',
  label: 'Controls and captions: one set for every hierarchy. Not the eyebrow, which is its own role, nor small print, which is Small Print.',
};
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
const headlineSize = (hierarchy, step) => `var(--uiowa-typography-${titleKey(hierarchy, step)}-font-size)`;
const titleStyle = (hierarchy, step) => styleOf(titleKey(hierarchy, step));
const fieldStyle = (field, hierarchy, step = 4) => (field === 'title' ? titleStyle(hierarchy, step) : styleOf(roleOf(field, hierarchy)));
const STEP_NAME = (step) => `${step}×${step === 4 ? ' (default)' : ''}`;
// A field's style name and px, with the headline at the step.
const fieldSpec = (field, hierarchy, step = 4) => SPECS[field === 'title' ? titleKey(hierarchy, step) : roleOf(field, hierarchy)];
// The h1–h6 defaults, the style a heading takes from its tag alone, for web text where an author picks only a
// heading level: a ladder drawn from the scale's sizes, so it steps down slowly, about 1.25× a step below the
// h2. h6 shares h5's style: a smaller Regular heading would read as body text.
const HEADINGS = { h1: 'headline-medium', h2: 'subhead-large', h3: 'subhead-2-large', h4: 'subhead-2-medium', h5: 'subhead-2-small', h6: 'subhead-2-small' };
// What the story CSS reads from a hierarchy: its body size, its headline at the step (the gap under a title
// is half of it) and its two text gaps.
const hierarchyVars = (hierarchy, step = 4) => ({
  '--tr-body': `var(--uiowa-typography-body-${hierarchy}-font-size)`,
  '--tr-title': headlineSize(hierarchy, step),
  '--tr-related': `var(--uiowa-typography-space-related-${hierarchy})`,
  '--tr-break': `var(--uiowa-typography-space-break-${hierarchy})`,
});
const FIELDS = [['eyebrow', 'Eyebrow'], ['title', 'Headline'], ['lead', 'Subhead'], ['details', 'Subhead 2'], ['text', 'Body'], ['small', 'Small print']];
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
  .tr { box-sizing: border-box; max-width: 1310px; margin: 0 auto; padding: 40px 24px 64px; color: var(--uiowa-color-neutral-800); font-family: var(--uiowa-typography-font-family-roboto); }
  .tr *, .tr *::before, .tr *::after { box-sizing: border-box; }
  /* The pages' own text sits on the Medium hierarchy: the title Subhead, section heads Subhead 2 at its emphasis weight, text Body,
     notes and captions Small print, controls Label. */
  .bp, .lp, .tr {
    --tr-f-title: var(--uiowa-typography-subhead-medium-font-weight) var(--uiowa-typography-subhead-medium-font-size)/var(--uiowa-typography-subhead-medium-line-height) var(--uiowa-typography-subhead-medium-font-family);
    --tr-f-h2: var(--uiowa-typography-subhead-2-medium-font-weight-emphasis) var(--uiowa-typography-subhead-2-medium-font-size)/var(--uiowa-typography-subhead-2-medium-line-height) var(--uiowa-typography-subhead-2-medium-font-family);
    --tr-f-body: var(--uiowa-typography-body-medium-font-weight) var(--uiowa-typography-body-medium-font-size)/var(--uiowa-typography-body-medium-line-height) var(--uiowa-typography-body-medium-font-family);
    --tr-f-small: var(--uiowa-typography-small-print-medium-font-weight) var(--uiowa-typography-small-print-medium-font-size)/var(--uiowa-typography-small-print-medium-line-height) var(--uiowa-typography-small-print-medium-font-family);
    --tr-f-label: var(--uiowa-typography-label-large-font-weight) var(--uiowa-typography-label-large-font-size)/var(--uiowa-typography-label-large-line-height) var(--uiowa-typography-label-large-font-family);
    --tr-f-tag: var(--uiowa-typography-label-small-font-weight) var(--uiowa-typography-label-small-font-size)/var(--uiowa-typography-label-small-line-height) var(--uiowa-typography-label-small-font-family);
  }
  .tr__eyebrow { margin: 0 0 6px; font: var(--tr-f-small); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .tr__title { margin: 0 0 12px; font: var(--tr-f-title); color: var(--uiowa-color-neutral-900); }
  .tr__lede { margin: 0 0 16px; max-width: 66ch; font: var(--tr-f-body); color: var(--uiowa-color-neutral-700); }
  .tr__lede b { color: var(--uiowa-color-neutral-900); }
  .tr__h2 { margin: 48px 0 8px; padding-bottom: 8px; border-bottom: 1px solid var(--uiowa-color-neutral-175); font: var(--tr-f-h2); color: var(--uiowa-color-neutral-900); }
  .tr__note { margin: 12px 0 0; max-width: 80ch; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .tr__note code, .tr__cap code { font-family: var(--uiowa-font-family-mono, monospace); font-size: 0.9em; }
  .tr__table { width: 100%; margin: 12px 0 0; border-collapse: collapse; font: var(--tr-f-body); }
  .tr__table th { padding: 8px 10px; border-bottom: 1px solid var(--uiowa-color-neutral-175); text-align: left; font: var(--tr-f-small); font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .tr__table td { padding: 12px 10px; border-bottom: 1px solid var(--uiowa-color-neutral-150); vertical-align: top; color: var(--uiowa-color-neutral-700); }
  .tr__table td:first-child { color: var(--uiowa-color-neutral-900); }
  .tr__table strong { display: block; color: var(--uiowa-color-neutral-900); }
  .tr__table small { display: block; color: var(--uiowa-color-neutral-500); }
  .tr__cap { display: block; margin-top: 6px; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .tr__hl { background: var(--uiowa-color-gold); color: var(--uiowa-color-neutral-900); padding: 0 3px; }
  .tr__tag { display: inline-block; margin-left: 6px; padding: 1px 7px; border: 1px solid var(--uiowa-color-neutral-300); border-radius: 999px; font: var(--tr-f-tag); font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--uiowa-color-neutral-700); vertical-align: middle; }

  /* Style Library */
  .tr__family { margin-top: 40px; }
  .tr__family-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 16px; padding-bottom: 8px; border-bottom: 2px solid var(--uiowa-color-neutral-900); }
  .tr__family-name { margin: 0; font: var(--tr-f-h2); color: var(--uiowa-color-neutral-900); }
  .tr__family-face { font: var(--tr-f-body); color: var(--uiowa-color-neutral-700); }
  .tr__family-use { font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
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
  .tr__comp :is(h1, h2, h3, p) { text-box: trim-both cap alphabetic; }
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
  .tr__details strong { font-weight: var(--uiowa-typography-subhead-2-medium-font-weight-emphasis); }
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

const sizesOf = (family) => SIZES.filter((size) => at(`typography.${family}.${size}`));
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
// a toggle. Turning the toggle off puts the page back on Medium.
const MEDIUM_FIRST = ['medium', ...BODY_SIZES.filter((size) => size !== 'medium')];
const HierarchyPick = {
  props: { modelValue: { type: String, required: true }, others: Boolean, name: { type: String, required: true }, pt: Boolean },
  emits: ['update:modelValue', 'update:others'],
  setup(props, { emit }) {
    const rows = MEDIUM_FIRST.map((size) => HIERARCHIES.find((p) => p.size === size));
    const shown = computed(() => (props.others ? rows : rows.slice(0, 1)));
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
      <button type="button" class="tr__more" :aria-expanded="String(others)" @click="toggle">{{ others ? 'Hide the other formats' : 'Other formats' }}</button>
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
        <p class="tr__eyebrow">Typography roles</p>
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

export const StyleLibrary = {
  name: 'Style Library',
  render: () => ({
    components: { HierarchyPick },
    setup() {
      const hierarchy = ref('medium');
      const step = ref(4);
      const others = ref(false);
      const pick = computed(() => HIERARCHIES.find((p) => p.size === hierarchy.value));
      // The picked hierarchy: each field's style, top to bottom, with the headline at the step.
      const combination = computed(() => FIELDS.map(([field, label]) => {
        const key = field === 'title' ? titleKey(hierarchy.value, step.value) : roleOf(field, hierarchy.value);
        return { ...SPECS[key], field, label, style: styleOf(key), text: SPECIMEN[FIELD_FAMILIES[field]] };
      }));
      const inHierarchy = (key) => combination.value.some((r) => r.key === key);
      // The whole scale, by family: Medium's styles, and the other hierarchies' when Other formats is on. Label is
      // one set for every hierarchy, so its three sizes always show.
      const families = computed(() => FAMILIES.map((family) => ({
        family,
        name: familyName(family),
        face: SPECS[roleIn(family, sizesOf(family)[0])].face,
        note: FAMILY_NOTES[family],
        sizes: sizesOf(family).filter((size) => others.value || family === 'label' || size === 'medium')
          .map((size) => ({ ...SPECS[roleIn(family, size)], size: SIZE_NAMES[size], style: styleOf(roleIn(family, size)), text: SPECIMEN[family] })),
      })));
      // The px beside each specimen is what the browser renders.
      const root = ref(null);
      const rendered = useRendered(root, [hierarchy, step, others]);
      return { css, hierarchy, others, steps: STEPS, step, stepName: STEP_NAME, pick, combination, inHierarchy, families, root, rendered };
    },
    template: `
      <div class="tr">
        <component is="style">{{ css }}</component>
        <p class="tr__eyebrow">Typography roles</p>
        <h1 class="tr__title">Style Library</h1>
        <p class="tr__lede">
          <b>One scale, and five hierarchies drawn from it.</b> Six families in X-Small, Small, Medium, Large and
          X-Large, the Headline also at 6× and 8×, and Label in three sizes: forty-three styles, each at one fixed size. Body X-Small,
          Small, Medium, Large and X-Large, 12.67, 16, 19, 24 and 36px (9.5, 12, 14.25, 18 and 27pt), are the five body sizes, and every
          template, screen or print, chooses one. Each names a hierarchy: the X-Small,
          Small, Medium, Large or X-Large of every other family, each a multiple of that body size, so the math is done and a template, or an
          agent building one, looks a size up. Pick a hierarchy and use its styles together.
          Label is one set for every hierarchy. The headline is 4× its body by default, and steps up to 6× or 8×.
        </p>
        <p class="tr__lede">
          A style fixes the typeface, weight, size and leading. Headline and Eyebrow are Special Gothic
          Condensed, Subhead is Zilla Slab, and Subhead 2, Body, Small Print and Label are Roboto. Each
          specimen is set through the live custom properties the token build ships
          (<code>--uiowa-typography-&lt;family&gt;-&lt;size&gt;-*</code>); the values beside it are read
          from the token files. No component uses the roles yet.
        </p>
        <hierarchy-pick v-model="hierarchy" v-model:others="others" name="tr-hierarchy" pt />
        <fieldset class="tr__pick"><legend>Headline</legend>
          <label v-for="s in steps" :key="s" :class="{ on: step === s }"><input type="radio" name="tr-headline-step" :value="s" v-model="step"> {{ stepName(s) }}</label>
        </fieldset>
        <div ref="root">
        <section class="tr__family">
          <header class="tr__family-head">
            <h2 class="tr__family-name">{{ pick.label }} hierarchy</h2>
            <span class="tr__family-use">Its styles together, top to bottom: each a multiple of Body {{ pick.label }}, {{ pick.px }}px ({{ pick.pt }}pt). Used by {{ pick.formats }}.</span>
          </header>
          <div v-for="r in combination" :key="r.key" class="tr__row">
            <div class="tr__side">
              <strong>{{ r.label }}</strong>
              {{ r.by }}× · {{ pxPt(rendered['combo-' + r.key] || r.px) }}<br>
              {{ r.name }} · {{ r.face }} {{ r.weightName }} {{ r.weight }} · leading {{ r.leading }}<br>
              <code>{{ r.tokenName }}</code>
            </div>
            <p :class="['tr__specimen', { 'tr__specimen--eyebrow': r.field === 'eyebrow' }]" :style="r.style" :data-measure="'combo-' + r.key">{{ r.text }}</p>
          </div>
        </section>
        <h2 class="tr__h2">The scale</h2>
        <p class="tr__note">Every style at its one size: Medium's, and the other formats' when they are on. The {{ pick.label }} hierarchy's styles are marked.</p>
        <section v-for="f in families" :key="f.family" class="tr__family">
          <header class="tr__family-head">
            <h3 class="tr__family-name">{{ f.name }}</h3>
            <span class="tr__family-face">{{ f.face }}</span>
            <span class="tr__family-use">{{ f.note }}</span>
          </header>
          <div v-for="s in f.sizes" :key="s.key" class="tr__row">
            <div class="tr__side">
              <strong>{{ s.size }}<span v-if="inHierarchy(s.key)" class="tr__tag">{{ pick.label }}</span></strong>
              {{ s.by }}× · {{ pxPt(rendered[s.key] || s.px) }}<br>
              {{ s.weightName }} {{ s.weight }} · leading {{ s.leading }}<br>
              <code>{{ s.tokenName }}</code>
            </div>
            <p :class="['tr__specimen', { 'tr__specimen--eyebrow': f.family === 'eyebrow' }]" :style="s.style" :data-measure="s.key">{{ s.text }}</p>
          </div>
        </section>
        </div>
        <p class="tr__note">
          Special Gothic Condensed is not in UIDS yet; here Google's Special Gothic at width 75 stands in
          through the second name in the token's font stack. Sizes are fixed; fluid sizing for the web is a
          next step. X-Small's small print is 9.5px (7.125pt), too small to read.
        </p>
      </div>
    `,
    methods: { round, pxPt },
  }),
};

export const Hierarchy = {
  name: 'Hierarchy',
  render: () => ({
    components: { HierarchyPick },
    setup() {
      const hierarchy = ref('medium');
      const step = ref(4);
      const gaps = ref(true);
      const others = ref(false);
      // The table's columns: Medium, and the other four hierarchies when Other formats is on.
      const cols = computed(() => (others.value ? MEDIUM_FIRST : MEDIUM_FIRST.slice(0, 1)));
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
      const labels = computed(() => ({
        related: `1.5× · ${px(1.5)}px`,
        breakGap: `2× · ${px(2)}px`,
        titleGap: `½ headline · ${px(Math.max(step.value * 0.5, 2))}px`,
      }));
      return { css, rows, cols, sizeNames: SIZE_NAMES, hierarchy, others, steps: STEPS, step, stepName: STEP_NAME, pick, gaps, styles, vars, labels };
    },
    template: `
      <div class="tr">
        <component is="style">{{ css }}</component>
        <p class="tr__eyebrow">Typography roles</p>
        <h1 class="tr__title">Hierarchy</h1>
        <p class="tr__lede">
          <b>One scale, five hierarchies.</b> A hierarchy is a set of styles from the scale, each a multiple
          of its body size: 1× for body text, 1.5× for Subhead 2 and the eyebrow, 2× for the subhead, 4× for
          the headline, and 0.75× for small print. Body X-Small, Small, Medium, Large and X-Large name the
          five, and every template, screen or print, chooses one: X-Small for event programs, program flyers and
          brochures, mini flyers, table tents and Word documents, Small for letters, forms, covers and name tags,
          Medium for web pages and applications, video, the letter-size flyer and event poster, Large for the
          digital ad and the 11 × 17 event poster, and X-Large for digital signs, slides, the research poster and
          the directional poster. Picking a body
          size picks every other size; the table has done the math. It is the only way to change the
          size of body text. The headline is the one other setting: 4× by default, and 6× or 8× for a bigger
          statement; only the headline and the gap under it change.
        </p>
        <hierarchy-pick v-model="hierarchy" v-model:others="others" name="tr-step-hierarchy" />
        <table class="tr__table">
          <thead><tr><th>Role</th><th>Tokens</th><th>Multiple</th><th v-for="size in cols" :key="size">{{ sizeNames[size] }}</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.label"><td>{{ r.label }}</td><td><code>{{ r.tokens }}</code></td><td>{{ r.by }}×</td><td v-for="size in cols" :key="size">{{ pxPt(r.px[size]) }}</td></tr>
          </tbody>
        </table>

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
        <figure class="tr__fig">
          <figcaption>{{ pick.label }} hierarchy, {{ step }}× headline <span>Body {{ pick.label }}, {{ pick.px }}px ({{ pick.pt }}pt) · used by {{ pick.formats }}</span></figcaption>
          <div :class="['tr__comp', { 'tr--hide': !gaps }]" :style="vars">
            <p class="tr__eb" :style="styles.eyebrow">Lorem ipsum</p>
            <div class="tr__gap"><span>{{ labels.related }}</span></div>
            <p class="tr__t" :style="styles.title">Lorem ipsum dolor sit amet consectetur</p>
            <div class="tr__gap tr__gap--title"><span>{{ labels.titleGap }}</span></div>
            <p :style="styles.lead">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div class="tr__gap tr__gap--break"><span>{{ labels.breakGap }}</span></div>
            <p class="tr__details" :style="styles.details"><strong>Lorem ipsum, 00 dolor sit, 0 amet</strong><br>Consectetur adipiscing, Elit sed</p>
            <div class="tr__gap"><span>{{ labels.related }}</span></div>
            <p class="tr__text" :style="styles.text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
            <div class="tr__gap tr__gap--break"><span>{{ labels.breakGap }}</span></div>
            <p class="tr__text" :style="styles.small">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </figure>
        <p class="tr__note">
          When content runs long, shorten the copy or pick a smaller hierarchy; don't shrink a style by hand.
          The Labels are one set for every hierarchy, and the h1–h6 defaults for web text are a ladder drawn
          from the scale's sizes (see Blog Post).
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
export const Highlight = {
  name: 'Highlight',
  render: () => ({
    components: { HierarchyPick },
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
            lineHeight: `calc(var(--uiowa-typography-${titleKey(hierarchy.value, step.value)}-line-height) + var(--uiowa-typography-highlight-headline-leading))`,
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
      return { css, hlCss, rows, hierarchy, others, steps: STEPS, step, stepName: STEP_NAME, hl, bg, band, words, gaps, styles, vars, pick, px, labels };
    },
    template: `
      <div class="tr">
        <component is="style">{{ css }}{{ hlCss }}</component>
        <p class="tr__eyebrow">Typography roles</p>
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
        <table class="tr__table">
          <thead><tr><th>Hierarchy</th><th>Headline 4×</th><th>Box pad</th><th>Extra lead</th><th>Subhead 2×</th><th>Band above</th><th>Band below</th><th>Band bleed</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.label"><td>{{ r.label }}</td><td>{{ r.title }}px</td><td>{{ r.pad }}px</td><td>{{ r.lead }}px</td><td>{{ r.sub }}px</td><td>{{ r.above }}px</td><td>{{ r.below }}px</td><td>{{ r.bleed }}px</td></tr>
          </tbody>
        </table>

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
            <p class="tr__eb" :style="styles.eyebrow">Lorem ipsum</p>
            <div class="tr__gap"><span>{{ labels.related }}</span></div>
            <p class="tr__t" :style="styles.title">
              <template v-if="hl === 'off'">Lorem ipsum dolor sit amet consectetur</template>
              <mark v-else-if="words === 'all'" class="tr__hlm">Lorem ipsum dolor sit amet consectetur</mark>
              <template v-else>Lorem ipsum <mark class="tr__hlm">dolor sit</mark> amet consectetur</template>
            </p>
            <div class="tr__gap tr__gap--title"><span>{{ labels.titleGap }}</span></div>
            <p :style="styles.lead"><span :class="{ tr__hlb: band }">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>
            <div class="tr__gap tr__gap--break"><span>{{ labels.breakGap }}</span></div>
            <p class="tr__details" :style="styles.details"><strong>Lorem ipsum, 00 dolor sit, 0 amet</strong><br>Consectetur adipiscing, Elit sed</p>
            <div class="tr__gap"><span>{{ labels.related }}</span></div>
            <p class="tr__text" :style="styles.text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </figure>
        <p class="tr__note">
          The box and the band are gradient bands on the role's own line box, placed with the fonts' measured
          ascent, descent and cap height, because <code>text-box-trim</code> does not reach an inline element.
          Nothing in UIDS renders the highlight yet; the shipped Headline highlight pads in rem and does not
          scale with the headline.
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
const itemEmphasis = (hierarchy) => ({ fontWeight: `var(--uiowa-typography-subhead-2-${hierarchy}-font-weight-emphasis)` });
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
  .lp__details strong { font-weight: var(--uiowa-typography-subhead-2-medium-font-weight-emphasis); }
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
  .lp__stack :is(h1, h2, h3, h4, p), .lp__list { text-box: trim-both cap alphabetic; }
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
          const key = byRole ? (which === 'headline' ? titleKey(hierOf(band), hlStep) : roleIn(BAND_FAMILIES[which], hierOf(band))) : HEADINGS[tag];
          const emphasis = byRole && which === 'item';
          const label = `<${tag}> ${SPECS[key].name}${emphasis ? ', Roboto Medium' : ''}`;
          return [which, { tag, role: key, style: emphasis ? { ...styleOf(key), ...itemEmphasis(hierOf(band)) } : styleOf(key), label, px: px(key) }];
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
          vars['--lp-hl'] = `var(--uiowa-typography-${headline.role}-font-size)`;
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
          <p class="tr__eyebrow">Typography roles</p>
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
            h1–h6 default from the Blog Post, so an h3 section heading becomes Subhead 2 Large. A section headline
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
              <p class="lp__eb" :style="S.hero.eyebrow">{{ L.hero.eyebrow }}</p>
              <h1 class="lp__t" :style="S.hero.title" :data-label="titleLabel">Ideas in<br>motion.</h1>
              <p class="lp__lead" :style="S.hero.lead">{{ L.hero.lead }}</p>
              <p class="lp__details" :style="S.hero.details"><strong>{{ L.hero.date }}</strong><br>{{ L.hero.place }}</p>
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
              <p v-if="eyebrows" class="lp__eb" :style="S.idea.eyebrow">{{ L.idea.eyebrow }}</p>
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
              <p v-if="eyebrows" class="lp__eb" :style="S.explore.eyebrow">{{ L.explore.eyebrow }}</p>
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
              <p v-if="eyebrows" class="lp__eb" :style="S.day.eyebrow">{{ L.day.eyebrow }}</p>
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
            <p v-if="eyebrows" class="lp__eb" :style="S.news.eyebrow">{{ L.news.eyebrow }}</p>
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
              <p v-if="eyebrows" class="lp__eb" :style="S.visit.eyebrow">{{ L.visit.eyebrow }}</p>
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
              <p v-if="eyebrows" class="lp__eb" :style="S.join.eyebrow">{{ L.join.eyebrow }}</p>
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

// Make it your day: the Landing Page's day band on its own, on Medium, as an event schedule: the heading, then its
// items. The Model switch compares two ways to set the heading's role. In the SiteNow model an author picks
// Headline, Subhead or Subhead 2, and the font switches with the pick; the proposed hierarchy sets it, Subhead
// being the preferred role for a section heading. A headline takes half its size as the gap under it. Below the
// schedule, the Landing Page's hero, Ideas in motion, stands for the Banner: the block that uses the entire hierarchy.
const DAY_HIERARCHY = 'medium';
const DAY_TITLE = 'Event schedule for today';
const DAY_CHOICES = [
  { family: 'headline', emphasis: false },
  { family: 'subhead', emphasis: false },
  { family: 'subhead-2', emphasis: true },
];
const dayCss = `
  .lpd__field { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin: 16px 0 0; font: var(--tr-f-label); color: var(--uiowa-color-neutral-500); }
  .lpd__field select { min-width: 280px; padding: 8px 12px; font: inherit; color: var(--uiowa-color-neutral-900); background: var(--uiowa-color-neutral-0); border: 1px solid var(--uiowa-color-neutral-300); }
  .lpd__check { display: inline-flex; align-items: center; gap: 6px; color: var(--uiowa-color-neutral-900); cursor: pointer; font: var(--tr-f-label); }
  .lpd__check input { margin: 0; }
  .lpd__picks { display: flex; flex-wrap: wrap; align-items: center; gap: 0 32px; }
  /* The schedule is one column, at a reading width. */
  .lpd__schedule { max-width: 48rem; }
`;

export const MakeItYourDay = {
  name: 'Landing Page · Make it your day',
  render: () => ({
    components: { StepPick },
    setup() {
      const model = ref('sitenow');
      const family = ref('headline');
      const step = ref(4);
      const heroStep = ref(6);
      const gaps = ref(false);
      // SiteNow shows the author's pick; the proposed hierarchy always sets the Subhead.
      const shown = computed(() => (model.value === 'proposed' ? 'subhead' : family.value));
      const choice = computed(() => DAY_CHOICES.find((c) => c.family === shown.value));
      const role = computed(() => (shown.value === 'headline' ? titleKey(DAY_HIERARCHY, step.value) : roleIn(shown.value, DAY_HIERARCHY)));
      const s = Object.fromEntries(['text', 'small'].map((field) => [field, fieldStyle(field, DAY_HIERARCHY)]));
      const item = roleIn('subhead-2', DAY_HIERARCHY);
      const itemStyle = { ...styleOf(item), ...itemEmphasis(DAY_HIERARCHY) };
      const itemLabel = `<h3> ${SPECS[item].name}, Roboto Medium`;
      const heading = computed(() => ({
        style: { ...styleOf(role.value), ...(choice.value.emphasis ? itemEmphasis(DAY_HIERARCHY) : {}) },
        label: `<h2> ${SPECS[role.value].name}${choice.value.emphasis ? ', Roboto Medium' : ''}`,
        className: shown.value === 'headline' ? 'lp__hl' : 'lp__sh',
      }));
      const scope = computed(() => ({
        ...hierarchyVars(DAY_HIERARCHY, step.value),
        ...gapLabels(SPECS[`body-${DAY_HIERARCHY}`].px),
        '--lp-hl': `var(--uiowa-typography-${role.value}-font-size)`,
        '--gap-hl': `"Half the headline · ${round(SPECS[role.value].px / 2)}px"`,
      }));
      const options = DAY_CHOICES.map(({ family: f, emphasis }) => {
        const key = roleIn(f, DAY_HIERARCHY);
        return { family: f, text: `${SPECS[key].name}${emphasis ? ', Roboto Medium' : ''} · ${round(SPECS[key].px)}px` };
      });
      // The hero, as on the Landing Page: its styles at its own headline step, and the gap under the headline.
      const hero = computed(() => Object.fromEntries(['eyebrow', 'title', 'lead', 'details', 'text', 'button'].map((field) => [field, fieldStyle(field, DAY_HIERARCHY, heroStep.value)])));
      const heroLabel = computed(() => `<h1> ${fieldSpec('title', DAY_HIERARCHY, heroStep.value).name}`);
      const heroVars = computed(() => {
        const body = SPECS[`body-${DAY_HIERARCHY}`].px;
        const titleRole = titleKey(DAY_HIERARCHY, heroStep.value);
        const under = Math.max(SPECS[titleRole].px / 2, body * 2);
        return {
          ...hierarchyVars(DAY_HIERARCHY, heroStep.value),
          ...gapLabels(body),
          '--lp-hl': `var(--uiowa-typography-${titleRole}-font-size)`,
          '--gap-hl': `"Half the headline · ${round(under)}px"`,
        };
      });
      return { css, lpCss, dayCss, L: LANDING, DAY_TITLE, model, family, step, heroStep, gaps, s, itemStyle, itemLabel, heading, options, scope, hero, heroLabel, heroVars };
    },
    template: `
      <div :class="['lp', 'lp--labels', { 'lp--gaps': gaps }]" :style="scope">
        <component is="style">{{ css }}{{ lpCss }}{{ dayCss }}</component>
        <div class="lp__head">
          <p class="tr__eyebrow">Typography roles</p>
          <h1 class="tr__title">Landing Page · Make it your day</h1>
          <p class="tr__lede">
            <b>One section from the Landing Page, on Medium, as an event schedule.</b> In the SiteNow model an author
            can set its heading as a Headline, Subhead or Subhead 2, and the font switches with the choice; a Headline
            steps to 6× or 8× and takes half its size as the gap under it. The proposed hierarchy sets the heading:
            Subhead is the preferred role for a section heading. The items are Subhead 2 in Roboto Medium, each on its
            own text and a Break apart. Spacing paints every gap with its rule and size.
          </p>
          <div class="lpd__picks">
            <fieldset class="tr__pick"><legend>Model</legend>
              <label :class="{ on: model === 'sitenow' }"><input type="radio" name="lpd-model" value="sitenow" v-model="model"> SiteNow</label>
              <label :class="{ on: model === 'proposed' }"><input type="radio" name="lpd-model" value="proposed" v-model="model"> Proposed hierarchy</label>
            </fieldset>
            <label class="lpd__check"><input type="checkbox" v-model="gaps"> Spacing</label>
          </div>
          <div v-if="model === 'sitenow'" class="lpd__field">Style of “{{ DAY_TITLE }}”
            <select v-model="family" aria-label="Style of the heading">
              <option v-for="o in options" :key="o.family" :value="o.family">{{ o.text }}</option>
            </select>
          </div>
          <div v-if="model === 'sitenow' && family === 'headline'" class="lpd__field">Headline step <step-pick v-model="step" name="lpd-step" /></div>
          <p v-if="model === 'proposed'" class="tr__note">Subhead is the preferred role here, so the system sets it.</p>
        </div>
        <section class="lp__band lp__band--gray">
          <div class="lp__in">
            <div class="lp__stack lpd__schedule">
              <h2 :class="heading.className" :style="heading.style" :data-label="heading.label">{{ DAY_TITLE }}</h2>
              <div class="lp__entries">
                <div v-for="entry in L.day.items" :key="entry.title" class="lp__stack">
                  <h3 class="lp__h" :style="itemStyle" :data-label="itemLabel">{{ entry.title }}</h3>
                  <p :style="s.text">{{ entry.text }}</p>
                  <ul v-if="entry.list" class="lp__list" :style="s.text"><li v-for="line in entry.list" :key="line">{{ line }}</li></ul>
                </div>
              </div>
              <p class="lp__small" :style="s.small">{{ L.day.small }}</p>
            </div>
          </div>
        </section>
        <div class="lp__head">
          <h2 class="tr__h2">A Banner uses the entire hierarchy</h2>
          <p class="tr__lede">
            <b>Ideas in motion, the Landing Page’s hero, is a Banner.</b> Use the Banner component when a section needs
            the entire hierarchy: eyebrow, Headline, Subhead, Subhead 2, body and buttons.
          </p>
        </div>
        <section class="lp__band lp__band--gold" :style="heroVars">
          <div class="lp__in lp__step-row"><div class="lp__controls"><step-pick v-model="heroStep" name="lpd-step-hero" /></div></div>
          <div class="lp__in lp__grid lp__grid--hero">
            <div class="lp__stack">
              <p class="lp__eb" :style="hero.eyebrow">{{ L.hero.eyebrow }}</p>
              <h1 class="lp__t" :style="hero.title" :data-label="heroLabel">Ideas in<br>motion.</h1>
              <p class="lp__lead" :style="hero.lead">{{ L.hero.lead }}</p>
              <p class="lp__details" :style="hero.details"><strong>{{ L.hero.date }}</strong><br>{{ L.hero.place }}</p>
              <p :style="hero.text">{{ L.hero.text }}</p>
              <div class="lp__btns lp__go">
                <a href="#" class="lp__btn" :style="hero.button" @click.prevent>Explore the day ↗</a>
                <a href="#" class="lp__btn lp__btn--plain" :style="hero.button" @click.prevent>Plan your visit →</a>
              </div>
            </div>
            <div class="lp__art">Image</div>
          </div>
        </section>
      </div>
    `,
  }),
};

// Blog Post: an article is one composition, on the web's hierarchy, Medium, in the standard container; the
// headings take the h1–h6 defaults, or the Headings choice.
const blogRole = (field) => HEADINGS[field === 'title' ? 'h1' : field] || roleOf(field);
// The article after its lead: headings, paragraphs (the lorem unless one has its own text) and two lists, a
// lettered one with a nested list and a bulleted one. A list item is [text] or [text, [nested items]].
const BLOG_OUTLINE = [
  ['h2', 'Ut enim ad minim veniam'], ['p'],
  ['p', 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus:'],
  ['ol', [
    ['Sed ut perspiciatis. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint.'],
    ['Nemo enim ipsam voluptatem.', [
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.',
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.',
    ]],
    ['Temporibus autem. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'],
  ]],
  ['h3', 'Quis nostrud exercitation ullamco'], ['p'],
  ['p', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa:'],
  ['ul', [
    ['Qui officia deserunt mollit anim id est laborum'],
    ['Sed ut perspiciatis unde omnis iste natus error sit voluptatem'],
    ['Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo'],
  ]],
  ['p', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.'],
  ['h4', 'Laboris nisi ut aliquip'], ['p'], ['h5', 'Ex ea commodo consequat'], ['p'], ['h6', 'Duis aute irure dolor'], ['p'],
];
const bpCss = `
  .bp__in { max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 0 var(--uiowa-layout-digital-large-margin) var(--uiowa-layout-space-section); color: var(--uiowa-color-neutral-900); font-family: var(--uiowa-typography-font-family-roboto); }
  .bp__in *, .bp__in *::before, .bp__in *::after { box-sizing: border-box; }
  .bp__head { max-width: var(--uiowa-layout-container-max-standard); margin: 0 auto; padding: 32px var(--uiowa-layout-digital-large-margin) 0; }
  .bp__post { padding-top: var(--uiowa-layout-space-section); border-top: 1px solid var(--uiowa-color-neutral-175); }
  .bp__post > * { margin: 0; font-weight: inherit; }
  .bp__post :where(h1, h2, h3, h4, h5, h6, p) { text-box: trim-both cap alphabetic; }
  .bp__post > * + * { margin-top: var(--tr-related); }
  .bp__post > .bp__t + * { margin-top: calc(var(--tr-title) * 0.5); }
  /* Each heading starts a section a Break below the last and is a Related step above its own text. */
  .bp__post > :is(h2, h3, h4, h5, h6) { margin-top: var(--tr-break); }
  .bp__t { overflow-wrap: anywhere; }
  /* The breadcrumb: plain links in Small Print, a gold slash between crumbs. */
  .bp__crumbs ol { display: flex; flex-wrap: wrap; margin: 0; list-style: none; font-size: inherit; }
  .bp__crumbs li { margin: 0; text-box: trim-both cap alphabetic; color: var(--uiowa-color-brand-black); }
  .bp__crumbs li:not(:last-child)::after { content: '/'; margin: 0 var(--uiowa-space-50); color: var(--uiowa-color-brand-gold); }
  .bp__crumbs a { color: inherit; text-decoration: none; }
  .bp__crumbs a:is(:hover, :focus) { text-decoration: underline; }
  .bp__meta { color: var(--uiowa-color-neutral-500); }
  .bp__text { max-width: 70ch; }
  /* Lists take UIDS's markers (.is-lower-alpha for letters, decimal nested, discs) and the body role. A list sits
     one body size below the paragraph it continues, as the Foundations page sets it; inside a list nothing is
     added, so items and a nested list keep the body's line spacing. */
  .bp__post > .bp__list { padding-left: 1.75em; text-box: trim-both cap alphabetic; }
  .bp__post > p + .bp__list { margin-top: var(--tr-body); }
  .bp__list :is(ol, ul) { margin: 0; padding-left: 1.75em; font-size: inherit; }
  .bp__list li { margin: 0; line-height: inherit; }
`;

// The ladder's Roboto levels, h3–h6, take Subhead 2's emphasis weight, Roboto Medium; the h2 stays Zilla Slab.
const EMPHASIS_LEVELS = ['h3', 'h4', 'h5', 'h6'];

export const BlogPost = {
  name: 'Blog Post',
  render: () => ({
    setup() {
      // The h1 is the Headline at the step; h3–h6 take Subhead 2's emphasis weight.
      const step = ref(4);
      const isTitle = (field) => field === 'title' || field === 'h1';
      const emphasis = (field) => EMPHASIS_LEVELS.includes(field);
      const style = (field) => {
        if (isTitle(field)) return titleStyle('medium', step.value);
        const key = blogRole(field);
        return emphasis(field) ? { ...styleOf(key), fontWeight: `var(--uiowa-typography-${key}-font-weight-emphasis)` } : styleOf(key);
      };
      const crumbs = [{ text: 'Home', url: '#' }, { text: 'The Blog', url: '#' }, { text: 'Lorem ipsum dolor sit amet consectetur' }];
      const fields = [['small', 'breadcrumbs'], ['h1', 'h1'], ['meta', 'byline'], ['text', 'text and lists'], ['h2', 'h2'], ['h3', 'h3'], ['h4', 'h4'], ['h5', 'h5'], ['h6', 'h6']];
      const legend = computed(() => fields.map(([field, label]) => {
        const spec = isTitle(field) ? fieldSpec('title', 'medium', step.value) : SPECS[blogRole(field)];
        const styleName = emphasis(field) ? `${spec.name}, Roboto Medium` : spec.name;
        return { field, label, styleName, px: spec.px };
      }));
      const outline = BLOG_OUTLINE.map(([tag, content], i) => ({
        key: i,
        tag,
        text: typeof content === 'string' ? content : null,
        items: Array.isArray(content) ? content.map(([text, sub]) => ({ text, sub })) : null,
      }));
      const vars = computed(() => hierarchyVars('medium', step.value));
      return { css, bpCss, steps: STEPS, step, stepName: STEP_NAME, style, legend, outline, crumbs, vars, lorem: LOREM };
    },
    template: `
      <div class="bp">
        <component is="style">{{ css }}{{ bpCss }}</component>
        <div class="bp__head">
          <p class="tr__eyebrow">Typography roles</p>
          <h1 class="tr__title">Blog Post</h1>
          <p class="tr__lede">
            <b>An article is one composition,</b> on the web's hierarchy, Medium, and the headings step down
            slowly inside it, about 1.25× a step below the h2. The h1 is Headline Medium and the h2 Subhead
            Large, then Roboto Medium at Subhead 2's sizes: the h3 Subhead 2 Large, the h4 Subhead 2 Medium, and the
            h5 and h6 Subhead 2 Small, so the h6 doesn't read as a paragraph. These h1–h6 defaults are a ladder drawn
            from the scale's sizes, for text where an author picks only a heading level. The post sits in the
            standard container (<code>layout.container.max.standard</code>, 1310px); the reading text keeps its
            own measure. The breadcrumbs are Small Print, a Related step above the title. Each heading is a
            Related step above its own text, and the sections are a Break apart. Lists take UIDS's markers and the
            body's role: a list sits one body size below the paragraph it continues, and inside it nothing is added,
            so its items and a nested list keep the body's line spacing.
            The h1 is 4× by default; the other steps change only the h1 and the gap under it. The h3 to h6 take
            Subhead 2's emphasis weight, Roboto Medium.
          </p>
          <fieldset class="tr__pick"><legend>Headline</legend>
            <label v-for="s in steps" :key="s" :class="{ on: step === s }"><input type="radio" name="bp-step" :value="s" v-model="step"> {{ stepName(s) }}</label>
          </fieldset>
          <ul class="tr__legend">
            <li v-for="l in legend" :key="l.field"><b>{{ l.label }}</b> · {{ l.styleName }} · {{ round(l.px) }}px</li>
          </ul>
        </div>
        <div class="bp__in">
          <article class="bp__post" :style="vars">
            <nav class="bp__crumbs" aria-label="Breadcrumb" :style="style('small')">
              <ol><li v-for="c in crumbs" :key="c.text"><a v-if="c.url" :href="c.url">{{ c.text }}</a><template v-else>{{ c.text }}</template></li></ol>
            </nav>
            <h1 class="bp__t" :style="style('title')">Lorem ipsum dolor sit amet consectetur</h1>
            <p class="bp__meta" :style="style('meta')">By Lorem Ipsum · 00 Dolor 0000 · 4 min read</p>
            <p class="bp__text" :style="style('text')">{{ lorem }}</p>
            <template v-for="o in outline" :key="o.key">
              <p v-if="o.tag === 'p'" class="bp__text" :style="style('text')">{{ o.text || lorem }}</p>
              <ol v-else-if="o.tag === 'ol'" class="bp__list bp__text is-lower-alpha" :style="style('text')">
                <li v-for="item in o.items" :key="item.text">{{ item.text }}<ol v-if="item.sub"><li v-for="line in item.sub" :key="line">{{ line }}</li></ol></li>
              </ol>
              <ul v-else-if="o.tag === 'ul'" class="bp__list bp__text" :style="style('text')">
                <li v-for="item in o.items" :key="item.text">{{ item.text }}</li>
              </ul>
              <h2 v-else-if="o.tag === 'h2'" :style="style('h2')">{{ o.text }}</h2>
              <h3 v-else-if="o.tag === 'h3'" :style="style('h3')">{{ o.text }}</h3>
              <h4 v-else-if="o.tag === 'h4'" :style="style('h4')">{{ o.text }}</h4>
              <h5 v-else-if="o.tag === 'h5'" :style="style('h5')">{{ o.text }}</h5>
              <h6 v-else-if="o.tag === 'h6'" :style="style('h6')">{{ o.text }}</h6>
            </template>
          </article>
        </div>
      </div>
    `,
    methods: { round },
  }),
};

// Today's styles, and the role each would take: the headings the Blog Post's h1–h6 defaults, the rest the
// nearest role in size, with the face the role carries. A composite today is one token with five channels;
// body is five tokens; the two sizes are a size alone on body.
// The Subhead 2 levels, h3 to h6, take Subhead 2's emphasis weight, Roboto Medium, as the Blog Post sets them.
const TODAY = [
  ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tag) => ({ name: `Heading ${tag.slice(1)}`, key: `heading-${tag}`, token: `typography.heading.${tag}`, role: HEADINGS[tag], emphasis: HEADINGS[tag].startsWith('subhead-2') })),
  { name: 'Intro bold', key: 'intro-bold', token: 'typography.intro-bold', role: 'subhead-medium' },
  { name: 'Intro light', key: 'intro-light', token: 'typography.intro-light', role: 'subhead-2-medium' },
  { name: 'Body', key: 'body', token: 'typography.body', role: 'body-medium' },
  { name: 'Size large', key: 'body', sizeKey: 'size-large', token: 'typography.size.large', role: 'subhead-2-medium' },
  { name: 'Size small', key: 'body', sizeKey: 'size-small', token: 'typography.size.small', role: 'small-print-medium' },
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
        const [, family, size] = row.role.match(/^(.*)-(x-small|small|medium|large|x-large)$/) || [];
        const weight = row.emphasis ? deref(at(`typography.${family}.${size}`).fontWeightEmphasis.$value) : null;
        const after = weight
          ? { ...SPECS[row.role], weight, weightName: WEIGHT_NAMES[weight], style: { ...styleOf(row.role), fontWeight: `var(--uiowa-typography-${row.role}-font-weight-emphasis)` } }
          : { ...SPECS[row.role], style: styleOf(row.role) };
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
        <p class="tr__eyebrow">Typography roles</p>
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
          The roles are in the token files beside today's styles; nothing uses them yet, so nothing on
          the site changes. Each of today's styles is on the left, read from the live tokens at this
          window width, and on the right the role it takes: for the headings the Blog Post's h1–h6 defaults as set,
          Headline Medium, Subhead Large, then Subhead 2 Large, Medium, Small and Small in Roboto Medium, and for
          the rest the role nearest in size on the web's hierarchy, Medium, with the face that role carries. Highlighter marks a
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
                <code>{{ r.after.tokenName }}</code> · <span :class="{ tr__hl: r.changed.face }">{{ r.after.face }}</span> <span :class="{ tr__hl: r.changed.weight }">{{ r.after.weightName }} {{ r.after.weight }}</span> · {{ r.after.by }}× · {{ round(rendered['after-' + r.name] || r.after.px) }}px · <span :class="{ tr__hl: r.changed.leading }">leading {{ r.after.leading }}</span>
              </span>
            </div>
          </template>
        </div>

        <h2 class="tr__h2">Next steps</h2>
        <ol class="tr__next">
          <li><b>Confirm the h1–h6 defaults.</b> The headings follow the Blog Post's ladder, so Heading 2 steps up to Subhead Large and Headings 5 and 6 share Subhead 2 Small; the Blog Post's Headings switch is where to compare. Decide before any SCSS moves.</li>
          <li><b>Bring fluid sizing to the web.</b> Today's headings clamp between 600 and 1310px; the roles are fixed. A fluid body size, or a Headline that clamps, is the candidate.</li>
          <li><b>Move UIDS onto the roles.</b> Point the paragraph, variables and utilities partials at the roles and retire today's heading, intro, body and size tokens. This is the step that changes how UIDS and SiteNow look.</li>
        </ol>
      </div>
    `,
    methods: { round },
  }),
};
