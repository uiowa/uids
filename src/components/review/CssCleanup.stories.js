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
  { id: 'black-stat', title: 'Stat on black', markup: `<div class="review-surface bg--black">${stat}</div>`,
    question: 'Should stats use gold and gray text on black?',
    rule: 'stat.scss: black ancestors set the title to gold and supporting text to #ccc.',
    rationale: 'No rationale documented in the rule. Confirm why these text roles should differ from the black surface defaults.' },
  { id: 'white-stat', title: 'Stat on white', markup: `<div class="review-surface bg--white">${stat}</div>`,
    question: 'Should supporting stat text have a separate gray color?',
    rule: 'stat.scss: supporting text uses #666 rather than the surface text token.',
    rationale: 'No rationale documented in the rule. Confirm whether supporting text needs a distinct role.' },
  { id: 'nested-stat', title: 'White stat inside black', markup: `<div class="review-surface bg--black"><div class="review-surface bg--white">${stat}</div></div>`,
    question: 'Should nested stats follow their nearest background?',
    rule: 'Black-ancestor stat selectors still match through a nested white surface.',
    rationale: 'Review whether the nearest background should control these colors. The background tokens reset at the white surface.' },
  { id: 'table-links', title: 'White table inside black', markup: `<div class="review-surface bg--black"><table><caption>Program information</caption><tbody><tr><td><a href="#review" data-measure="Table link">Explore a program</a></td></tr></tbody></table></div>`,
    question: 'Should a white table establish its own color context?',
    rule: 'tables.scss: table links use the default link color beneath any background ancestor.',
    rationale: 'The table paints a white background. Simply inheriting the outer black surface link token would put light links on white. Confirm whether the table should establish its own white surface context.' },
];

function quote(alignment, image, canonical) {
  const variant = image ? `blockquote--img-${image}` : '';
  const media = '<div class="blockquote__media"><img alt="Example portrait" width="80" height="80" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\'%3E%3Crect width=\'80\' height=\'80\' fill=\'%23999\'/%3E%3Ccircle cx=\'40\' cy=\'29\' r=\'13\' fill=\'%23eee\'/%3E%3Cpath d=\'M15 75 Q15 45 40 45 Q65 45 65 75\' fill=\'%23eee\'/%3E%3C/svg%3E"></div>';
  return `<div class="review-surface ${canonical ? '' : `blockquote-${alignment}`}"><blockquote class="blockquote ${variant} ${canonical ? `blockquote--${alignment}` : ''}">
    ${image === 'above' ? media : ''}<div class="blockquote__content"><div class="blockquote__paragraph"><p>Discovery starts with a question.</p></div>
    <footer>${image === 'below' ? media : ''}<div><cite>Example author</cite></div></footer></div></blockquote></div>`;
}

const migrations = [
  { id: 'button', title: 'Small form button', note: 'Horizontal padding changes from 2rem to 1rem when the button stylesheet is loaded.',
    old: '<div class="review-surface form"><button type="submit" class="bttn button--small">Explore programs</button></div>',
    next: '<div class="review-surface form"><button type="submit" class="bttn bttn--small">Explore programs</button></div>' },
  { id: 'highlight', title: 'Highlighted serif headline', note: 'Span padding changes from 0.85rem 1rem to 0.2rem 1rem 0.5rem through an existing canonical rule.',
    old: '<div class="review-surface"><h2 class="bold-headline bold-headline--highlight bold-headline--serif"><span>Discover Iowa</span></h2></div>',
    next: '<div class="review-surface"><h2 class="headline headline--highlight headline--serif"><span>Discover Iowa</span></h2></div>' },
  { id: 'uppercase', title: 'Uppercase headline text span', note: 'The canonical uppercase class additionally highlights spans inside headline__text. The old caps selector only supported headline__heading.',
    old: '<div class="review-surface"><h2 class="bold-headline bold-headline--caps"><span class="headline__text"><span>Discover Iowa</span></span></h2></div>',
    next: '<div class="review-surface"><h2 class="headline headline--uppercase"><span class="headline__text"><span>Discover Iowa</span></span></h2></div>' },
  { id: 'cta', title: 'Legacy left CTA headline', note: 'Font size changes from 2.5rem to 2.8rem; bottom margin changes from 0.5rem to 0.',
    old: '<div class="review-surface cta__wrapper element--left"><h2 class="bold-headline">Start your next chapter</h2><p>Explore your options.</p></div>',
    next: '<div class="review-surface cta__wrapper element--left"><h2 class="headline">Start your next chapter</h2><p>Explore your options.</p></div>' },
  ...['center', 'right'].flatMap(alignment => ['above', 'below'].map(image => ({
    id: `quote-${alignment}-${image}`, title: `${alignment === 'center' ? 'Centered' : 'Right-aligned'} blockquote, image ${image}`,
    note: 'Move the alignment class from the wrapper to the blockquote. Existing canonical image rules also change this layout.',
    old: quote(alignment, image, false), next: quote(alignment, image, true),
  }))),
  ...[['white', 'bg-pattern--brain'], ['black', 'bg-pattern--brain-black'], ['gold', 'bg-pattern--brain-reversed']].map(([surface, legacy]) => ({
    id: `brain-${surface}`, title: `${surface} brain background`,
    note: 'The replacement also paints the background image and establishes the surface colors. The old class only supplied descendant rules.',
    old: `<div class="review-surface ${legacy}"><h2 class="headline">Explore Iowa</h2><p>Background text and <a href="#review">an example link</a>.</p></div>`,
    next: `<div class="review-surface bg--${surface}--pattern--brain"><h2 class="headline">Explore Iowa</h2><p>Background text and <a href="#review">an example link</a>.</p></div>`,
  })),
  { id: 'circle', title: 'Circle list', note: 'List declarations are identical after renaming. The gray ancestor replacement additionally supplies gray surface styles.',
    old: '<div class="review-surface uids-component--gray"><ol class="uids-component--circle-list"><li>Choose a program</li><li>Make a discovery</li></ol></div>',
    next: '<div class="review-surface bg--gray"><ol class="element--circle-list"><li>Choose a program</li><li>Make a discovery</li></ol></div>' },
  { id: 'stat-width', title: 'Retired stat grid override', note: 'Description width changes from 60% to 85% at 980px viewport width and above. Resize the viewport to check the breakpoint.',
    old: '<div class="review-surface grid--3-2"><div class="stat"><p class="stat__description">A description long enough to show the old grid width and its replacement.</p></div></div>',
    next: '<div class="review-surface grid--3-2"><div class="stat"><p class="stat__description">A description long enough to show the old grid width and its replacement.</p></div></div>' },
  { id: 'flex-stat', title: 'Centered flex stat', note: 'The flex utility declarations match, but canonical stat title-padding and content-margin selectors also begin matching. Compare at narrow and wide viewports.',
    old: `<div class="review-surface">${stat.replace('element--flex-center', 'flex--center')}</div>`,
    next: `<div class="review-surface">${stat}</div>` },
];

const aliases = [
  ['bold-headline and modifiers', 'headline and modifiers; caps becomes uppercase', 'Review combinations and component context.'],
  ['block-padding / block-margin', 'element--padding / element--margin, with supported suffixes', 'Shared declarations match.'],
  ['uids-component--bold-intro / light-intro', 'element--bold-intro / light-intro', 'Shared declarations match.'],
  ['uids-component--circle-list', 'element--circle-list', 'List declarations match; review gray ancestors.'],
  ['flex--center / flex--left', 'element--flex-center / element--flex-left', 'Utilities match; stat component rules can begin matching.'],
  ['visually-hidden', 'element-invisible', 'Preserve any framework-provided focus-reveal behavior on focusable elements.'],
  ['button--small / button--full-width', 'bttn--small / bttn--full', 'Small-button padding can change.'],
  ['blockquote-center / blockquote-right on wrapper', 'blockquote--center / blockquote--right on blockquote', 'Image layouts can change.'],
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
        <p class="cleanup-review__callout"><strong>Feedback requested:</strong> We are considering removing the special stat text colors so stats follow the color choices of their background. The related decisions below need review before changing those rules.</p>
        <section id="color-review">
          <h2>Decisions needed</h2>
          <p class="cleanup-review__note">The alternatives below are for review. Production color rules have not changed.</p>
          <h3>Removing special stat colors</h3>
          <p>Stats currently have their own text color rules: gold titles and gray supporting text on black backgrounds, and gray supporting text on white backgrounds. These rules override the background component's text colors. Removing them would let stats use the background defaults.</p>
          <p>That single change raises three related choices: whether to keep the gold title on black, whether supporting text needs a separate gray color, and whether a nested stat should follow its nearest background. The comparisons show the effects of removing the special colors. Any colors we retain need a clear design rationale.</p>
          <template v-for="row in colorCases" :key="row.id">
          <template v-if="row.id === 'table-links'">
            <h3>Table link colors</h3>
            <p>The table link override is a separate decision. Tables paint a white background, so removing their special link color also requires deciding how that white surface should establish its color context.</p>
          </template>
          <article :id="row.id">
            <h4 class="cleanup-review__question">{{ row.question }}</h4>
            <p class="cleanup-review__decision">{{ row.rationale }}</p>
            <div class="cleanup-review__pair">
              <div><h5>Current colors</h5><CssCleanupSpecimen :css="currentCss" :markup="row.markup" @measured="colors[row.id + '-current'] = $event" /></div>
              <div><h5>Proposed: background defaults only</h5><CssCleanupSpecimen :css="currentCss" :markup="row.markup" defaults @measured="colors[row.id + '-defaults'] = $event" /></div>
            </div>
            <details><summary>CSS details and rendered colors</summary>
              <p><strong>{{ row.title }}:</strong> <code>{{ row.rule }}</code></p>
              <div class="cleanup-review__pair"><div><h4>Current colors</h4><ul class="cleanup-review__values"><li v-for="value in colors[row.id + '-current']" :key="value.label">{{ value.label }}: <code>{{ value.color }}</code></li></ul></div><div><h4>Proposed: background defaults only</h4><ul class="cleanup-review__values"><li v-for="value in colors[row.id + '-defaults']" :key="value.label">{{ value.label }}: <code>{{ value.color }}</code></li></ul></div></div>
            </details>
          </article>
          </template>
        </section>
        <nav aria-label="Other review sections"><a href="#migration-review">Migration examples</a><a href="#removal-review">Removal inventory</a></nav>
        <section id="migration-review">
          <h2>What changes when migrating</h2>
          <article v-for="row in migrations" :key="row.id">
            <h3>{{ row.title }}</h3><p>{{ row.note }}</p>
            <div class="cleanup-review__pair">
              <div><h4>Before: alpha.0 classes</h4><CssCleanupSpecimen :css="beforeCss" :markup="row.old" /></div>
              <div><h4>After: replacement classes</h4><CssCleanupSpecimen :css="currentCss" :markup="row.next" /></div>
            </div>
          </article>
        </section>
        <section id="removal-review">
          <h2>Removal inventory</h2>
          <table><thead><tr><th>Removed name</th><th>Replacement</th><th>Review note</th></tr></thead><tbody><tr v-for="row in aliases" :key="row[0]"><td><code>{{ row[0] }}</code></td><td><code>{{ row[1] }}</code></td><td>{{ row[2] }}</td></tr></tbody></table>
          <ul><li>Obsolete footer-cta wrapper/container and socket container styles, including their menu and outline-button rules: no replacement.</li><li>Tabs' is-hidden selector: use the native hidden attribute already managed by the tabs script.</li><li>Retired grid--3-2 stat width override: use the default width shown above.</li><li>Unused headline__headline typo selector: removed.</li></ul>
          <p>The changelog contains the complete class names and migration details. This page highlights visual differences and decisions still requiring review.</p>
          <details><summary>How the comparisons are rendered</summary><p>Review for UIDS #1092 / PR #1097, against 5.0.0-alpha.0. Before examples use a frozen stylesheet from that release; replacement examples use the current Sass build. Each specimen has isolated styles. Background defaults only replaces the shown text/link overrides with surface tokens for comparison. Decorative borders and bars remain untouched.</p></details>
        </section>
      </main>
    `,
  }),
};
