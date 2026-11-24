import { computed, ref } from 'vue';
import { DOCUMENT_OUTLINE, OUTLINE_EMPHASIS } from './documentOutline';
import semantic from '../../tokens/semantic/typography.json';
import { roleSpec, tokenValue } from './roleStyle';

// The document outline, h1 to h6, with each level's role, read from the token files, and
// the outline set in type-rich-text, where the headings need no classes. The Intro switch adds the intro under the h1.
const ROLE = /^(.+?)-(x-small|small|medium|large|x-large)$/;
const SIZE_NAMES = { 'x-small': 'X-Small', small: 'Small', medium: 'Medium', large: 'Large', 'x-large': 'X-Large' };
const round = (n) => Math.round(n * 100) / 100;
const familyName = (family) => family.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');

// Each level of an outline: its role, the classes that set it, and the role's face, weight, size and leading.
const outlineRows = (outline) => Object.entries(outline).map(([tag, key]) => {
  const [, family, size] = key.match(ROLE);
  const spec = roleSpec(family, size);
  const emphasis = OUTLINE_EMPHASIS.includes(tag);
  const weight = emphasis ? tokenValue(`typography.${family}.fontWeightEmphasis`) : spec.weight;
  return {
    tag,
    name: `${familyName(family)} ${SIZE_NAMES[size]}${emphasis ? ', emphasis weight' : ''}`,
    // Medium is the default hierarchy, so a Medium style needs only its role's class.
    className: `${size === 'medium' ? '' : `type-scale--${size} `}type-${family}${emphasis ? ` type-${family}--emphasis` : ''}`,
    setting: `${spec.face} ${weight}, ${round(spec.px)}px / ${spec.leading}`,
  };
});
const ROWS = outlineRows(DOCUMENT_OUTLINE);
// Each level's multiple of the body size, from the token files: the same in every hierarchy.
const multipleOf = (tag) => semantic.typography[DOCUMENT_OUTLINE[tag].match(ROLE)[1]].multiple.$value;
const MULTIPLES = { h1: multipleOf('h1'), h2: multipleOf('h2'), h3: multipleOf('h3') };
const BODY_PX = round(roleSpec('body', 'medium').px);
// The intro under the h1, element--intro: Roboto Regular, with Subhead 2's leading, at the Subhead's size.
const INTRO_FACE = roleSpec('subhead-2', 'medium');
const INTRO_ROW = {
  tag: 'p',
  note: 'under the h1',
  name: 'Intro',
  className: 'element--intro',
  setting: `${INTRO_FACE.face} ${INTRO_FACE.weight}, ${round(roleSpec('subhead', 'medium').px)}px / ${INTRO_FACE.leading}`,
};
const INTRO_TEXT = 'This intro is set in Roboto Regular, at the same step in the hierarchy as the Subhead in the h2. It says what '
  + "the page covers and who it's for, so a reader knows at once whether they're in the right place.";

const css = `
  .do { padding: var(--uiowa-space-300); max-width: 76rem; color: var(--uiowa-color-brand-black); }
  /* Doubled class: UIDS base heading rules such as h2:not(:first-child) carry (0,1,1). Only the page's own blocks:
     the sample's gaps are type-rich-text's. */
  .do.do > :where(h1, h2, h3, h4, h5, h6, p) { margin: 0; }
  .do.do > * + * { margin-top: var(--uiowa-type-space-related); }
  .do.do > h2 { margin-top: var(--uiowa-type-space-break); }
  .do code { font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.85em; }
  .do table { width: 100%; border-collapse: collapse; }
  .do th, .do td { text-align: left; padding: var(--uiowa-space-50) var(--uiowa-space-100); border-bottom: 1px solid var(--uiowa-color-border-default); vertical-align: top; }
  .do th { font-weight: var(--uiowa-typography-font-weight-medium); }
  .do__pick { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 0; border: 0; }
  .do__pick legend { float: left; margin-right: 6px; padding: 0; font: 400 0.875rem/1.2 var(--uiowa-typography-font-family-roboto); color: var(--uiowa-color-neutral-500); }
  .do__pick label { position: relative; display: inline-flex; align-items: center; margin: 0; padding: 6px 14px; border: 1px solid var(--uiowa-color-neutral-175); border-radius: 999px; font: 400 0.875rem/1.2 var(--uiowa-typography-font-family-roboto); color: var(--uiowa-color-neutral-800); cursor: pointer; }
  .do__pick label.on { background: var(--uiowa-color-neutral-800); border-color: var(--uiowa-color-neutral-800); color: var(--uiowa-color-neutral-0); }
  .do__pick label:has(input:focus-visible) { outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }
  .do__pick input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
  .do__sample { padding: var(--uiowa-space-200); border: 1px solid var(--uiowa-color-border-default); }
`;

export default {
  title: 'Tokens (typography)',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', docs: { source: { code: null } } },
};

export const DocumentOutline = {
  name: 'Document outline',
  render: () => ({
    setup() {
      const intro = ref(true);
      const tableRows = computed(() => (intro.value ? [ROWS[0], INTRO_ROW, ...ROWS.slice(1)] : ROWS));
      return { css, rows: ROWS, tableRows, bodyPx: BODY_PX, m: MULTIPLES, intro, introText: INTRO_TEXT };
    },
    template: `
      <div class="do">
        <component is="style">{{ css }}</component>
        <h1 class="type-subhead">Document outline</h1>
        <p class="type-body">
          Where an author picks only a heading level, as in rich text, each level takes a role by default, all in one
          hierarchy. Each level's size is a multiple of that hierarchy's body size, the same in every hierarchy: h1
          {{ m.h1 }}×, h2 {{ m.h2 }}×, h3 to h6 {{ m.h3 }}×, and the text 1×, so picking the hierarchy sizes the whole
          outline. This is the outline on the web's, Medium, with Body Medium ({{ bodyPx }}px) for the text
          under it.
          A design still picks a role first, and components keep their own heading styles.
        </p>
        <table class="type-small-print">
          <thead><tr><th>Level</th><th>Role</th><th>Face, weight, size / leading</th><th>Class</th></tr></thead>
          <tbody>
            <tr v-for="r in tableRows" :key="r.tag">
              <td><code>&lt;{{ r.tag }}&gt;</code><span v-if="r.note"> {{ r.note }}</span></td>
              <td>{{ r.name }}</td>
              <td>{{ r.setting }}</td>
              <td><code>.{{ r.className }}</code></td>
            </tr>
          </tbody>
        </table>
        <p class="type-body">
          h3 to h6 share Subhead 2 at its emphasis weight, Medium, so they read as headings. The intro under the h1
          takes <code>element--intro</code>: Roboto Regular, at the same step in the hierarchy as the Subhead in the h2.
          In rich text, put the content inside <code>type-rich-text</code> and the headings need no classes, as in the
          outline set below. Elsewhere, put each heading's class on it, such as
          <code>&lt;h2 class="type-subhead"&gt;</code>, and add <code>type-subhead-2--emphasis</code> to h3
          to h6.
        </p>

        <h2 class="type-subhead-2">The outline, set in <code>type-rich-text</code></h2>
        <fieldset class="do__pick"><legend>Intro</legend>
          <label :class="{ on: intro }"><input type="radio" name="do-intro" :value="true" v-model="intro"> Show</label>
          <label :class="{ on: !intro }"><input type="radio" name="do-intro" :value="false" v-model="intro"> Hide</label>
        </fieldset>
        <div class="do__sample type-rich-text">
          <template v-for="r in rows" :key="r.tag">
            <component :is="r.tag">{{ r.tag }}: {{ r.name }}</component>
            <p v-if="intro && r.tag === 'h1'" class="element--intro">{{ introText }}</p>
            <p v-else>
              Body Medium under the heading. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </template>
        </div>
      </div>
    `,
  }),
};
