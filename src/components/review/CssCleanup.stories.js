import { reactive } from 'vue';
import CssCleanupSpecimen from './CssCleanupSpecimen.vue';
import beforeStyles from './fixtures/alpha0.css?inline';
import currentStyles from '../../scss/uids.scss?inline';
import currentCtaStyles from '../../scss/components/cta_uids3.scss?inline';
import './css-cleanup-review.css';

const images = import.meta.glob('../../assets/images/*', { eager: true, query: '?url', import: 'default' });
const withAssetUrls = css => css.replace(/url\((["']?)(?:\.\.\/)+assets\/images\/([^"')]+)\1\)/g,
  (match, quote, filename) => images[`../../assets/images/${filename}`]
    ? `url("${images[`../../assets/images/${filename}`]}")` : match);
const beforeCss = withAssetUrls(beforeStyles);
const currentCss = withAssetUrls(currentStyles + currentCtaStyles);

const stat = `<div class="stat stat--static element--flex-center">
  <h2 class="stat__title" data-measure="Title">200+</h2>
  <p class="stat__description" data-measure="Description">Areas of study</p>
  <p class="stat__content" data-measure="Supporting text">Find a path that fits your interests.</p>
</div>`;
const colorCases = [
  { id: 'black-stat', title: 'Stat title on black', scope: 'title', markup: `<div class="review-surface bg--black">${stat}</div>`,
    question: 'Should stat titles inherit white text on black backgrounds?',
    rule: 'stat.scss: black ancestors set the title to gold.',
    rationale: 'Inheriting the black background defaults would change the title from gold to white.' },
  { id: 'white-stat', title: 'Supporting stat text on black and white', scope: 'supporting', markup: `<div class="review-surface bg--black">${stat}</div><div class="review-surface bg--white">${stat}</div>`,
    question: 'Should supporting stat text have a separate gray color?',
    rule: 'stat.scss: supporting text uses #ccc on black and #666 on white rather than the surface text token.',
    rationale: 'Supporting text would inherit the background defaults: white on black backgrounds and black on white backgrounds.' },
  { id: 'nested-stat', title: 'White stat inside black', markup: `<div class="review-surface bg--black"><div class="review-surface bg--white">${stat}</div></div>`,
    question: 'Should nested stats follow their nearest background?',
    rule: 'Black-ancestor stat selectors still match through a nested white surface.',
    rationale: 'The outer black background currently overrides text inside the white panel. Inheriting the nearest background defaults would make all stat text black in that panel.' },
  { id: 'table-links', title: 'White table inside black', markup: `<div class="review-surface bg--black"><table><caption>Program information</caption><tbody><tr><td><a href="#review" data-measure="Table link">Explore a program</a></td></tr></tbody></table></div>`,
    question: 'Should a white table establish its own color context?',
    rule: 'tables.scss: table links use the default link color beneath any background ancestor.',
    rationale: 'Inheriting the outer black background would put gold links on white table cells. The table needs its own white background defaults if we remove its link color override.' },
];

function quote(alignment, canonical) {
  return `<div class="review-surface ${canonical ? '' : `blockquote-${alignment}`}"><blockquote class="blockquote ${canonical ? `blockquote--${alignment}` : ''}">
    <p>Discovery starts with a question.</p><footer><cite>Example author</cite></footer></blockquote></div>`;
}

const migrations = [
  { id: 'button', title: 'Small form button', note: 'Replacing button--small with bttn--small reduces the left and right padding from 2rem to 1rem.',
    old: '<div class="review-surface form"><button type="submit" class="bttn button--small">Explore programs</button></div>',
    next: '<div class="review-surface form"><button type="submit" class="bttn bttn--small">Explore programs</button></div>' },
  { id: 'highlight', title: 'Highlighted serif headline', note: 'Replacing bold-headline and its modifiers with headline and its modifiers reduces the space above and below the highlighted text.',
    old: '<div class="review-surface"><h2 class="bold-headline bold-headline--highlight bold-headline--serif"><span>Discover Iowa</span></h2></div>',
    next: '<div class="review-surface"><h2 class="headline headline--highlight headline--serif"><span>Discover Iowa</span></h2></div>' },
  { id: 'uppercase', title: 'Uppercase headline text span', note: 'Replacing bold-headline--caps with headline--uppercase adds a gold highlight to nested text inside headline__text. The old class did not highlight this markup.',
    old: '<div class="review-surface"><h2 class="bold-headline bold-headline--caps"><span class="headline__text"><span>Discover Iowa</span></span></h2></div>',
    next: '<div class="review-surface"><h2 class="headline headline--uppercase"><span class="headline__text"><span>Discover Iowa</span></span></h2></div>' },
  { id: 'cta', title: 'Left-aligned CTA headline', note: 'Replacing bold-headline with headline in a left-aligned CTA increases the font size from 2.5rem to 2.8rem and removes the 0.5rem bottom margin.',
    old: '<div class="review-surface cta__wrapper element--left"><h2 class="bold-headline">Start your next chapter</h2><p>Explore your options.</p></div>',
    next: '<div class="review-surface cta__wrapper element--left"><h2 class="headline">Start your next chapter</h2><p>Explore your options.</p></div>' },
  ...['center', 'right'].map(alignment => ({
    id: `quote-${alignment}`, title: `${alignment === 'center' ? 'Centered' : 'Right-aligned'} blockquote`,
    intro: alignment === 'center' ? 'Legacy blockquotes need their alignment class moved from the wrapper to the blockquote. The 4.x Vue component already uses the replacement classes, including for image layouts.' : '',
    note: `Replace blockquote-${alignment} on the wrapper with blockquote--${alignment} on the blockquote. The alignment and decorative line stay the same.`,
    old: quote(alignment, false), next: quote(alignment, true),
  })),
  ...[['white', 'bg-pattern--brain'], ['black', 'bg-pattern--brain-black'], ['gold', 'bg-pattern--brain-reversed']].map(([surface, legacy]) => ({
    id: `brain-${surface}`, title: `${surface} brain background`,
    intro: surface === 'white' ? 'The old brain classes adjusted elements inside a background without adding the background itself. Their replacements add the brain artwork, background color, and text and link colors.' : '',
    note: `Replacing ${legacy} with bg--${surface}--pattern--brain adds the ${surface} background and brain artwork shown on the right.`,
    old: `<div class="review-surface ${legacy}"><h2 class="headline">Explore Iowa</h2><p>Background text and <a href="#review">an example link</a>.</p></div>`,
    next: `<div class="review-surface bg--${surface}--pattern--brain"><h2 class="headline">Explore Iowa</h2><p>Background text and <a href="#review">an example link</a>.</p></div>`,
  })),
  { id: 'circle', title: 'Circle list class', note: 'Replacing uids-component--circle-list with element--circle-list preserves the list appearance. Both examples use bg--gray on the wrapper.',
    old: '<div class="review-surface bg--gray"><ol class="uids-component--circle-list"><li>Choose a program</li><li>Make a discovery</li></ol></div>',
    next: '<div class="review-surface bg--gray"><ol class="element--circle-list"><li>Choose a program</li><li>Make a discovery</li></ol></div>' },
  { id: 'circle-background', title: 'Circle list background', note: 'The gray comes from replacing uids-component--gray on the wrapper with bg--gray. The old class only changed the rings around the numbers; bg--gray also fills the wrapper with gray. Both examples use element--circle-list.',
    old: '<div class="review-surface uids-component--gray"><ol class="element--circle-list"><li>Choose a program</li><li>Make a discovery</li></ol></div>',
    next: '<div class="review-surface bg--gray"><ol class="element--circle-list"><li>Choose a program</li><li>Make a discovery</li></ol></div>' },
  { id: 'stat-width', title: 'Stat description width in grid--3-2', breakpoint: true, note: 'Removing the grid--3-2 width rule lets the stat description use its default 85% width instead of 60%. This change only applies at viewport widths of 980px and above.',
    old: '<div class="review-surface grid--3-2"><div class="stat"><p class="stat__description">A description long enough to show the old grid width and its replacement.</p></div></div>',
    next: '<div class="review-surface grid--3-2"><div class="stat"><p class="stat__description">A description long enough to show the old grid width and its replacement.</p></div></div>' },
  { id: 'flex-stat', title: 'Centered flex stat', note: 'Replacing flex--center with element--flex-center also adds equal left and right padding around the stat title. At 980px and above, it adds horizontal margins around the supporting text.',
    old: `<div class="review-surface">${stat.replace('element--flex-center', 'flex--center')}</div>`,
    next: `<div class="review-surface">${stat}</div>` },
];

const aliases = [
  ['bold-headline and modifiers', 'headline and modifiers; caps becomes uppercase', 'Highlights and CTA sizing can change, as shown above.'],
  ['block-padding / block-margin', 'element--padding / element--margin, with supported suffixes', 'The mapped spacing values stay the same.'],
  ['uids-component--bold-intro / light-intro', 'element--bold-intro / light-intro', 'The intro styles stay the same.'],
  ['uids-component--circle-list', 'element--circle-list', 'The list styles stay the same; changing its background class is a separate change.'],
  ['flex--center / flex--left', 'element--flex-center / element--flex-left', 'The flex styles stay the same; stats also gain title padding and supporting-text margins.'],
  ['visually-hidden', 'element-invisible', 'Preserve any framework-provided focus-reveal behavior on focusable elements.'],
  ['button--small / button--full-width', 'bttn--small / bttn--full', 'Small-button padding can change.'],
  ['blockquote-center / blockquote-right on wrapper', 'blockquote--center / blockquote--right on blockquote', 'Plain alignment stays the same. The 4.x Vue component already uses the replacement classes.'],
  ['bg-pattern--brain / brain-black / brain-reversed', 'bg--white / black / gold--pattern--brain', 'Adds images and surface colors.'],
];

export default { title: 'Review/CSS cleanup', parameters: { layout: 'fullscreen', controls: { disable: true } } };

export const InThisPR = {
  name: 'In this PR',
  render: () => ({
    components: { CssCleanupSpecimen },
    setup() {
      const colors = reactive({});
      return { beforeCss, currentCss, colorCases, migrations, aliases, colors };
    },
    template: `
      <main class="cleanup-review" id="review">
        <h1>CSS cleanup: in this PR</h1>
        <section id="color-review">
          <h2>Decisions needed</h2>
          <p>The alternatives below are for review. Production color rules have not changed.</p>
          <h3>Should stats inherit background colors?</h3>
          <p>Stats have special rules to override background colors. Removing them would cause stats to inherit the background defaults.</p>
          <template v-for="row in colorCases" :key="row.id">
          <template v-if="row.id === 'table-links'">
            <h3>Table link colors</h3>
            <p>Tables have a separate link color override because their cells are white, even inside another background.</p>
          </template>
          <article :id="row.id">
            <h4 class="cleanup-review__question">{{ row.question }}</h4>
            <p class="cleanup-review__decision">{{ row.rationale }}</p>
            <div class="cleanup-review__pair">
              <div><h5>Current colors</h5><CssCleanupSpecimen :css="currentCss" :markup="row.markup" @measured="colors[row.id + '-current'] = $event" /></div>
              <div><h5>Proposed: inherit background defaults</h5><CssCleanupSpecimen :css="currentCss" :markup="row.markup" defaults :default-scope="row.scope || 'all'" @measured="colors[row.id + '-defaults'] = $event" /></div>
            </div>
            <details><summary>CSS details and rendered colors</summary>
              <p><strong>{{ row.title }}:</strong> <code>{{ row.rule }}</code></p>
              <div class="cleanup-review__pair"><div><h4>Current colors</h4><ul class="cleanup-review__values"><li v-for="value in colors[row.id + '-current']" :key="value.label">{{ value.label }}: <code>{{ value.color }}</code></li></ul></div><div><h4>Proposed: inherit background defaults</h4><ul class="cleanup-review__values"><li v-for="value in colors[row.id + '-defaults']" :key="value.label">{{ value.label }}: <code>{{ value.color }}</code></li></ul></div></div>
            </details>
          </article>
          </template>
        </section>
        <nav aria-label="Other review sections"><a href="#migration-review">Migration examples</a><a href="#removal-review">Removal inventory</a></nav>
        <section id="migration-review">
          <h2>What changes when migrating</h2>
          <template v-for="row in migrations" :key="row.id">
          <p v-if="row.intro">{{ row.intro }}</p>
          <article :id="row.id">
            <h3>{{ row.title }}</h3><p>{{ row.note }}</p>
            <p v-if="row.breakpoint"><span class="cleanup-review__below-breakpoint">Below 980px, the panels match because the removed width rule does not apply. Widen the viewport to see the difference.</span><span class="cleanup-review__above-breakpoint">At this viewport width, the left description uses 60% of its container and the right uses 85%.</span></p>
            <div class="cleanup-review__pair">
              <div><h4>Before: alpha.0 classes</h4><CssCleanupSpecimen :css="beforeCss" :markup="row.old" /></div>
              <div><h4>After: replacement classes</h4><CssCleanupSpecimen :css="currentCss" :markup="row.next" /></div>
            </div>
          </article>
          </template>
        </section>
        <section id="removal-review">
          <h2>Removal inventory</h2>
          <table><thead><tr><th>Removed name</th><th>Replacement</th><th>Review note</th></tr></thead><tbody><tr v-for="row in aliases" :key="row[0]"><td><code>{{ row[0] }}</code></td><td><code>{{ row[1] }}</code></td><td>{{ row[2] }}</td></tr></tbody></table>
          <ul><li>Obsolete footer-cta wrapper/container and socket container styles, including their menu and outline-button rules: no replacement.</li><li>Tabs' is-hidden selector: use the native hidden attribute already managed by the tabs script.</li><li>Retired grid--3-2 stat width override: use the default width shown above.</li><li>Unused headline__headline typo selector: removed.</li></ul>
          <p>The changelog contains the complete class names and migration details. This page highlights visual differences and decisions still requiring review.</p>
          <details><summary>How the comparisons are rendered</summary><p>Review for UIDS #1092 / PR #1097, against 5.0.0-alpha.0. Before examples use a frozen stylesheet from that release; replacement examples use the current Sass build. Each specimen has isolated styles. The proposed color examples replace only the text or link colors under discussion with background defaults. Decorative borders and bars stay the same.</p></details>
        </section>
      </main>
    `,
  }),
};
