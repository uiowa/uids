// Biochemistry landing page — the Claude Design page rebuilt from UIDS source.
//
// WHY THIS EXISTS
// Claude Design generated "Biochemistry Landing Page.dc.html" in project
// e6a2c753-3902-4bc9-956d-8e684e8c02b9 from the .dc.html templates in claude-design/.
// Those templates are a hand-maintained VIEW of this repo with no compiler between them
// and the Vue components, so a visual defect there has two possible causes and they need
// different fixes:
//
//   1. UIDS itself renders that way  -> the defect is as-shipped; it belongs in a
//      contract's knownIssues, not in a "fix".
//   2. UIDS renders it differently   -> the .dc.html template, layout.css, or the
//      readme guidance that produced the composition has drifted.
//
// This story is the control. It reproduces the SAME page from the real Vue components and
// the real SCSS, following claude-design/readme.md's own composition guidance, so the two
// can be put side by side. Anything that looks wrong in both is case 1; anything that
// looks wrong only in Claude Design is case 2.
//
// Deltas found while building it are listed in DIVERGENCES at the bottom of this file.

import '../../scss/components/_background.scss';
import '../../scss/components/_inline.scss';
import '../../scss/components/_media.scss';
import '../../scss/layout/_grid.scss';

import UidsIowaBar from '../brand-bar/BrandBar.vue';
import UidsIowaFooter from '../brand-footer/BrandFooter.vue';
import UidsMenu from '../menu/Menu.vue';
import UidsBreadcrumbs from '../breadcrumbs/Breadcrumbs.vue';
import UidsPageTitle from '../page-title/PageTitle.vue';
import UidsBanner from '../banner/Banner.vue';
import UidsHeadline from '../headline/Headline.vue';
import UidsGrid from '../grid/Grid.vue';
import UidsGridItem from '../grid/GridItem.vue';
import UidsCard from '../card/Card.vue';
import UidsStat from '../stat/Stat.vue';
import UidsCallout from '../callout/Callout.vue';
import UidsButton from '../button/Button.vue';
import UidsCta from '../cta/Cta.vue';

export default {
  title: 'Showcase/Biochemistry Landing Page',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: null,
      },
    },
  },
  argTypes: {
    heroImage: {
      name: 'Hero image',
      control: { type: 'text' },
    },
    showResearchCallout: {
      name: 'Show research callout',
      control: { type: 'boolean' },
    },
    ctaBackground: {
      name: 'CTA background',
      options: ['black', 'gold', 'gray'],
      control: { type: 'select' },
    },
  },
};

const menuItems = [
  { label: 'Overview', url: '#', active: true },
  {
    label: 'Academic Programs',
    url: '#',
    children: [
      { label: 'BA in Biochemistry and Molecular Biology', url: '#' },
      { label: 'BS in Biochemistry and Molecular Biology', url: '#' },
      { label: 'Honors Program', url: '#' },
    ],
  },
  { label: 'Research', url: '#' },
  { label: 'Admissions and Visiting', url: '#' },
];

// The generated page passes crumb_3_text="" and Breadcrumbs.dc.html renders it as an
// (empty, hidden) fourth <li>. Breadcrumbs.vue takes an array, so the empty crumb simply
// does not exist here — see DIVERGENCES 1.
const breadcrumbItems = [
  { text: 'Home', url: 'https://uiowa.edu' },
  { text: 'Carver College of Medicine', url: 'https://medicine.uiowa.edu' },
  { text: 'Biochemistry and Molecular Biology' },
];

const whyCards = [
  {
    title: 'Research From Your First Year',
    body: 'Join a faculty lab through Undergraduate Biochemistry Research or the Honors Research Practicum — both open with no prerequisites — and present your findings at the Lata Undergraduate Research Symposium.',
    link_text: 'See Research Opportunities',
    url: 'https://bmb.medicine.uiowa.edu/undergraduate-research',
  },
  {
    title: 'A Flexible BA or BS',
    body: 'Your first two years are identical either way. Choose a flexible Bachelor of Arts or a lab-enriched Bachelor of Science once you know which path fits your goals.',
    link_text: 'Compare the Degrees',
    url: 'https://bmb.medicine.uiowa.edu/undergraduate-program/majors-offered',
  },
  {
    title: 'A Fast Track to a PhD',
    body: 'Qualified seniors can enter the combined BS/PhD U2G Fast Track, moving directly into graduate study with funding support starting the second half of senior year.',
    link_text: 'Learn About the Fast Track',
    url: 'https://catalog.registrar.uiowa.edu/carver-medicine/biochemistry-molecular-biology/biochemistry-molecular-biology-bs/',
  },
];

const researchCards = [
  {
    title: 'Gene Expression and Disease',
    body: 'Explore how genes are turned on and off, and what happens when that process goes wrong in cancer, genetic disorders, and infectious disease.',
    image: 'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-11/gettyimages-590634523-2-1493049119.jpg',
    alt: 'Stock photograph representing biochemistry research.',
  },
  {
    title: 'Structural and Computational Biology',
    body: 'Use X-ray crystallography, NMR spectroscopy, and computational modeling to reveal the three-dimensional shapes that let proteins do their jobs.',
    image: 'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2020-11/lilac.jpg',
    alt: 'Close-up photograph of lilac flowers in bloom.',
  },
  {
    title: 'Metabolism and Signal Transduction',
    body: 'Study how cells sense, use, and store energy, and how those signaling pathways break down in diabetes, obesity, and cancer.',
    image: 'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2024-12/blue_lotus2.png',
    alt: 'Close-up photograph of a blue lotus flower.',
  },
];

// A Stat is a comparison object, so the page needs three of them — stats-come-in-threes.
// The generated page had only the first; the other two are drawn from the same department
// facts the rest of the page cites.
const stats = [
  {
    stat_title: '1 in 3',
    stat_summary: 'graduates go on to study medicine',
    stat_content: 'Others pursue graduate research, dental or pharmacy school, or move directly into biotechnology and health-services careers.',
  },
  {
    stat_title: '8',
    stat_summary: 'major research areas',
    stat_content: 'From gene expression and structural biology to metabolism and signal transduction, each with faculty labs open to undergraduates.',
  },
  {
    stat_title: '0',
    stat_summary: 'prerequisites to join a lab',
    stat_content: 'Undergraduate Biochemistry Research and the Honors Research Practicum are both open from your first year.',
  },
];

const footerContact = `
  <div class="footer__links footer__links--icon">
    <p>
      51 Newton Road, 4-403 BSB<br>
      Iowa City, Iowa 52242<br>
      <a href="tel:319-467-0178"><span class="fa-phone fas" role="presentation"></span> 319-467-0178</a><br>
      <a href="mailto:biochem@uiowa.edu"><span class="fa-envelope fas" role="presentation"></span> biochem@uiowa.edu</a>
    </p>
  </div>
`;

// Support CSS — NOT design system CSS. Two kinds of rule: (a) container treatments
// uids_base ships and UIDS does not, (b) inline styles the generated .dc.html wrote on bare
// divs. Every selector is scoped to .dc-parity so nothing leaks into another story.
//
// It lives in this file, as a string, rather than in a sibling .css — deliberately.
// check-token-consumers.mjs counts anything under src/ as SHIPPED unless it matches
// DOC_IN_SRC (scripts/check-token-consumers.mjs:90: *.stories.[jt]s, src/foundation/,
// *.mdx). A sibling stylesheet reading --uiowa-layout-container-max-narrow therefore turned
// that token's real DOC-ONLY warning green — verified both ways on 2026-08-25 by moving the
// file out and back. That is the exact masking the checker's own header warns about, so the
// bytes stay inside a file the checker already knows is documentation.
const SUPPORT_CSS = `
  /* (a) uids_base container treatments UIDS does not ship. .page__container--narrow lives
     in uids_base/scss/global.scss:368-370 and is re-emitted into claude-design/layout.css,
     but src/scss has no rule for it — only the token, whose own comment
     (tokens/semantic/layout.json:30) names the class. Copied from layout.css:29-42. */
  @media (min-width: 980px) {
    .dc-parity .page__container--narrow {
      max-width: var(--uiowa-layout-container-max-narrow);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--uiowa-space-125);
      padding-right: var(--uiowa-space-125);
    }
  }
  @media (min-width: 1350px) {
    .dc-parity .page__container--narrow { padding-left: 0; padding-right: 0; }
  }

  /* Cards fill their grid cell. uids_base/scss/components/grid.scss:18-23 —
     \`.list-container__inner .card, .views-field { height: 100% }\`, with
     \`.section-alignment__start &{height:auto}\` as the opt-OUT. UIDS ships neither, so a
     card behind any wrapper (GridItem's .grid__column here, a .views-row downstream) goes
     ragged. Reproduced as production has it; see DIVERGENCES 5. */
  .dc-parity .list-container__inner .card { height: 100%; }

  /* (b) inline styles the generated page wrote on bare divs.
     The nav strip's border: UIDS ships .menu--container for exactly this (menu.scss:157),
     on --uiowa-menu-container-border-color; the generated page reached for the raw colour
     token instead. Both resolve to #DDD. */
  .dc-parity .dc-parity__menu-strip { border-bottom: 1px solid var(--uiowa-color-gray-165); }
  .dc-parity .dc-parity__grid { margin-top: var(--uiowa-space-200); }
  .dc-parity .dc-parity__center { margin-top: var(--uiowa-space-200); text-align: center; }
  /* The clearfix that stops the floated Callout escaping its section. UIDS has a clearfix
     MIXIN (abstracts/_utilities.scss) but no class, so an author placing an inline--align-*
     element has to know to write this. */
  .dc-parity .dc-parity__float-host { overflow: auto; }
`;

if (typeof document !== 'undefined' && !document.getElementById('dc-parity-support')) {
  const el = document.createElement('style');
  el.id = 'dc-parity-support';
  el.textContent = SUPPORT_CSS;
  document.head.appendChild(el);
}

const Template = {
  render: (args) => ({
    components: {
      UidsIowaBar,
      UidsIowaFooter,
      UidsMenu,
      UidsBreadcrumbs,
      UidsPageTitle,
      UidsBanner,
      UidsHeadline,
      UidsGrid,
      UidsGridItem,
      UidsCard,
      UidsStat,
      UidsCallout,
      UidsButton,
      UidsCta,
    },
    setup() {
      return { args, menuItems, breadcrumbItems, whyCards, researchCards, stats, footerContact };
    },
    template: `
      <div class="dc-parity">
        <uids-iowa-bar>
          <div class="parent-site-name">Carver College of Medicine</div>
          <template #second_row_content>
            <h1 class="site-name"><a href="#">Biochemistry and Molecular Biology</a></h1>
          </template>
        </uids-iowa-bar>

        <!-- column-container is NOT in the generated page. It is required: .menu--horizontal
             wraps its entire rule set in utilities.container-query() (menu.scss:127), which
             compiles to @container column (min-width: 768px), and the only things that
             establish that container are .grid__column / .column-container /
             .layout-container (layout/_grid.scss:118-125). .page__container is not one of
             them, so with the generated page's markup the container query never resolves:
             the menu renders VERTICAL with every submenu expanded, 363px tall instead of
             57px. Measured both ways at 1440px on 2026-08-25. See DIVERGENCES 8 — this is
             the one delta that would follow the design into production. -->
        <div class="dc-parity__menu-strip">
          <div class="page__container">
            <div class="column-container">
            <uids-menu
              variant="horizontal"
              label="Primary navigation"
              :items="menuItems"
              :top="true"
            />
            </div>
          </div>
        </div>

        <!-- <main> is not decoration. Production wraps every .layout__container in
             <div class="node__content">, which holds sections and NOTHING else, so
             '.layout__container:first-child' matches the title section and it contributes no
             top padding. The generated page (and Page Scaffold.dc.html until 2026-08-25)
             makes the sections siblings of the Brand Bar and the nav strip, so :first-child
             never matches and the first section adds 48px nobody asked for. Measured: 77px
             above the breadcrumb here against production's 28px, where the 28px is the
             breadcrumb's own margin-top and nothing else. DIVERGENCES 13. -->
        <main>
          <!-- Title section, per contracts/rules.json page-title-is-its-own-section. The
               generated page put the breadcrumb, the title AND the intro in one section;
               that is what made the title sit flush against the intro with no gap at all.
               DIVERGENCES 12. -->
          <section class="layout__container layout--title">
            <div class="page__container">
              <div class="column-container">
              <uids-breadcrumbs :items="breadcrumbItems" />
              <uids-page-title title="Biochemistry and Molecular Biology" />
              </div>
            </div>
          </section>

          <section class="layout__container">
            <div class="page__container">
              <div class="column-container">
              <p class="element--light-intro">
                Biochemistry is the study of the chemical processes that support life. As an
                undergraduate in our department, you'll examine the molecules behind human
                health and disease, join a faculty research lab, and build a direct path to
                medical school, graduate study, or a career in the biosciences.
              </p>
              </div>
            </div>
          </section>
        </main>

        <!-- column-container again, and for the third component. .banner__content's own cap
             is inside container-query() (banner.scss:129-131), so with no container host
             above it the max-width never resolves: measured max-width none and the content
             running the full 1425px bleed, against the 1310px page__container beside it.
             Banner.stories.js wraps every banner in .column-container and Banner.dc.html
             bakes in .dc-banner-column; Banner.vue emits neither, so the page owes it.
             DIVERGENCES 8. -->
        <div class="column-container">
        <uids-banner
          pre_title="Undergraduate Program"
          height="large"
          horizontal_alignment="left"
          vertical_alignment="center"
          :headline="{ text: 'Understand Life at the Molecular Level', level: 'h2', text_style: 'serif', size: 'large' }"
          :buttons="[{ label: 'Explore the Program', url: '#' }]"
        >
          <template #media>
            <div class="media media--image">
              <img
                :src="args.heroImage"
                alt="Artistic photograph referencing the human brain, reflecting the department's research in molecular neuroscience."
              />
            </div>
          </template>
          <p>
            From your first year, you'll work alongside faculty investigating the chemistry
            of health and disease — training that leads to medical school, graduate
            research, and careers in biotechnology.
          </p>
        </uids-banner>
        </div>

        <section class="layout__container">
          <div class="page__container">
            <div class="column-container">
            <uids-headline level="h2" text_style="serif" alignment="center">
              Why Study Biochemistry at Iowa
            </uids-headline>
            <p class="element--light-intro" style="text-align:center">
              A degree built around early research, real flexibility, and a clear path to
              what comes next.
            </p>
            <!-- Grid + GridItem, not the readme's hand-written .list-container__inner. The
                 difference is the .grid__column each GridItem emits, and it is load-bearing:
                 see DIVERGENCES 5. -->
            <uids-grid type="threecol--33-34-33" class="dc-parity__grid">
              <uids-grid-item v-for="card in whyCards" :key="card.title">
                <uids-card
                  headline_style="serif"
                  :url="card.url"
                  :link_text="card.link_text"
                >
                  <template #title>{{ card.title }}</template>
                  <p>{{ card.body }}</p>
                </uids-card>
              </uids-grid-item>
            </uids-grid>
            </div>
          </div>
        </section>

        <!-- Three stats, not one, and in the STANDARD container — rules
             stats-come-in-threes and container-width-by-content. The generated page put a
             single Stat alone in a narrow band; a lone number reads as a pull-quote that
             lost its attribution, because a stat only means something next to other stats.
             DIVERGENCES 14. -->
        <section class="layout__container bg--gray">
          <div class="page__container">
            <div class="column-container">
              <uids-grid type="threecol--33-34-33">
                <uids-grid-item v-for="s in stats" :key="s.stat_title">
                  <uids-stat v-bind="s" :stat_hover="false" />
                </uids-grid-item>
              </uids-grid>
            </div>
          </div>
        </section>

        <section class="layout__container">
          <div class="page__container">
            <div class="column-container">
            <uids-headline level="h2" text_style="serif" alignment="center">
              Explore Our Research Areas
            </uids-headline>
            <p class="element--light-intro" style="text-align:center">
              Faculty labs across the department span eight major research areas — here are
              three.
            </p>
            <uids-grid type="threecol--33-34-33" class="dc-parity__grid">
              <uids-grid-item v-for="card in researchCards" :key="card.title">
                <uids-card
                  headline_style="serif"
                  link_text="View Faculty Labs"
                  url="https://bmb.medicine.uiowa.edu"
                >
                  <template #media><img :src="card.image" :alt="card.alt" /></template>
                  <template #title>{{ card.title }}</template>
                  <p>{{ card.body }}</p>
                </uids-card>
              </uids-grid-item>
            </uids-grid>
            <div class="dc-parity__center">
              <uids-button
                url="https://medicine.uiowa.edu/biochemistry-molecular-biology"
                color="secondary"
                size="medium"
              >View All Research Areas</uids-button>
            </div>
            </div>
          </div>
        </section>

        <!-- The gray band in the white/gray/white run — alternate-section-backgrounds. The
             generated page ran five default sections back to back from the banner to the
             CTA, and because adjacent same-background sections MERGE (section-rhythm) that
             stretch read as one undifferentiated column. Narrow container is right here:
             this is a single block of body copy, which is exactly what
             container-width-by-content reserves narrow for. DIVERGENCES 15. -->
        <section class="layout__container bg--gray">
          <div class="page__container page__container--narrow dc-parity__float-host">
            <div class="column-container">
            <uids-headline level="h2" text_style="serif" :underline="true">
              Research Is Part of the Curriculum
            </uids-headline>
            <!-- white on the gray band, not gray on gray: the same reasoning
                 cta-is-always-narrow gives for a CTA's background — a block painted the
                 same colour as its band stops reading as a block at all. -->
            <uids-callout
              v-if="args.showResearchCallout"
              background="white"
              inline_size="small"
              inline_alignment="right"
            >
              <uids-headline level="h4" text_style="serif" :underline="true">
                Lata Undergraduate Research Symposium
              </uids-headline>
              <p>
                Every spring, graduating seniors present a year of original research to the
                department — the capstone moment for Honors students and a showcase of what
                undergraduates discover in Iowa labs.
              </p>
            </uids-callout>
            <p>
              Every Biochemistry and Molecular Biology major is encouraged to join a
              research lab early, through Undergraduate Biochemistry Research (BMB:3993) or
              the Honors Research Practicum (HONR:3994) — both open with no prerequisites.
              Many students continue into Advanced Undergraduate Biochemistry Research
              (BMB:4999), pairing with a faculty mentor for a year-long independent project
              in any of the department's research areas.
            </p>
            <p>
              Students who complete the honors track write and defend an honors thesis, then
              present their findings alongside their peers each spring. Along the way, the
              Biochemistry and Molecular Biology Club (BMBC) connects majors outside the
              lab, too.
            </p>
            </div>
          </div>
        </section>

        <section class="layout__container">
          <!-- Same story as the nav strip, on a second component: card--layout-left/right
               is entirely inside container-query() (card.scss:367, 456, 469), so without a
               container host the orientation axis silently renders STACKED — measured 963px
               tall in .page__container alone, 419px with the host. Card.dc.html bakes in
               <div class="dc-card-column"> to supply it; Card.vue does not. DIVERGENCES 8. -->
          <div class="page__container">
            <div class="column-container">
            <uids-card
              orientation="right"
              media_size="large"
              headline_style="serif"
              link_text="See What BMBC Is Up To"
              url="https://bmb.medicine.uiowa.edu/tags/bmbc"
            >
              <template #media>
                <img
                  src="https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/2021-12/ORC.jpeg"
                  alt="Photograph of a University of Iowa research building."
                />
              </template>
              <template #title>Find Your Community</template>
              <p>
                The Biochemistry and Molecular Biology Club (BMBC) connects majors outside
                the classroom and lab, through study groups, guest speakers, and social
                events with faculty and fellow students.
              </p>
            </uids-card>
            </div>
          </div>
        </section>

        <section :class="['layout__container', 'bg--' + args.ctaBackground]">
          <div class="page__container page__container--narrow">
            <div class="column-container">
            <uids-cta
              headline_style="uppercase"
              details="Talk with our undergraduate advisors about course planning, research opportunities, and what a career in biochemistry can look like."
              button_label="Request Information"
              url="https://bmb.medicine.uiowa.edu/webform/contact"
              :background="args.ctaBackground"
            >
              <template #title>Ready to Start Your Biochemistry Journey?</template>
            </uids-cta>
            </div>
          </div>
        </section>

        <uids-iowa-footer parent_site_title="Carver College of Medicine">
          <div class="site-name">Biochemistry and Molecular Biology</div>
          <template #parent_site_title>
            <div class="parent-site-name">Carver College of Medicine</div>
          </template>
          <template #contact_info>
            <div v-html="footerContact"></div>
          </template>
        </uids-iowa-footer>
      </div>
    `,
  }),
};

export const Default = {
  ...Template,
  args: {
    heroImage:
      'https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/no_crop__1024w/public/2023-10/2020_03_11-Brain%20in%20the%20Mirror_tschoon-010.JPG?itok=LVju3HWt',
    showResearchCallout: true,
    ctaBackground: 'black',
  },
};

// DIVERGENCES between this story and the Claude Design render of the same page.
// Numbered so the write-up and the contracts can cite them.
//
// 1. Breadcrumbs — the generated page passes an empty crumb_3; Breadcrumbs.dc.html emits a
//    fourth <li class="dc-crumb-empty"> for it. Breadcrumbs.vue takes an array, so no
//    empty item exists. Not visible (the template hides it), but the DOMs differ.
//
// 2. Card link target — Card.vue links the TITLE when a title slot and a url are both
//    present (linkedElement === 'title') and renders the footer as a PseudoButton (a
//    <div class="bttn">). Card.dc.html leaves the title unlinked and makes the footer a
//    real <a class="bttn">. Both carry the same .bttn classes, so the button looks the
//    same; the click target and the arrow do not (contracts/card.json knownIssues[0]).
//
// 3. Banner button — Banner.vue adds `click-container` and renders a PseudoButton when
//    exactly one button is passed. The generated banner has no click-container and a real
//    <a>. Same visual, different interaction model.
//
// 4. Brand Footer structure — BrandFooter.vue puts .socket INSIDE
//    .footer__links--contact and uses .footer__container--flex. Brand Footer.dc.html
//    emits two sibling .footer__container blocks and its own .contact / .contact-line
//    markup. The contact block is authored markup in both, so this is a template choice,
//    not a component one.
//
// 5. Cards must FILL their grid cell, and neither UIDS nor Claude Design makes them.
//    uids_base/scss/components/grid.scss:18-23 sets `.list-container__inner .card,
//    .views-field { height: 100% }` and treats ragged as the OPT-OUT
//    (`.section-alignment__start & { height: auto }`, global.scss:146-150). UIDS ships no
//    equivalent, so the moment a wrapper sits between the grid and the card — GridItem's
//    .grid__column here, a .views-row downstream, Card.dc.html's .dc-card-column inside the
//    runtime's .sc-host over there — the card stops being the grid item and shrinks to its
//    content. Measured at 1440px: 434/329/356 ragged, 434/434/434 filled. Claude Design
//    renders the ragged row; production renders the filled one.
//    CORRECTED 2026-08-25, same day, after the design system owner pointed at the uids_base
//    rule. The first version of this note called ragged "as-shipped" and cited
//    card.scss:126's commented-out `height: 100%` as where it was decided. Both halves were
//    wrong: nobody had grepped uids_base for a card height rule, and card.scss:126 is inside
//    a commented-out iframe/embed block that has nothing to do with card height. Two
//    citations, one unexecuted query. The story now applies production's rule in its support
//    CSS so it renders what a real page renders.
//    A container-side fix exists and is better than `height: 100%` — see the note below.
//
// 6. .page__container--narrow — shipped by uids_base and re-emitted into
//    claude-design/layout.css, but absent from src/scss. Shimmed above.
//
// 7. Lede paragraph — the generated page hand-rolls a `.intro` class in its <helmet>
//    <style>. UIDS already ships `.element--light-intro` / `.uids-component--light-intro`
//    (src/scss/base/_paragraph.scss:195-201) on the same token. This story uses the real
//    class. Nothing in claude-design/ mentions it, which is why the agent invented one.
//
// 8. Container-query hosts — the finding that would follow this design into production,
//    and it hits THREE components, which makes it a systemic gap rather than a quirk.
//    `.menu--horizontal` (menu.scss:127), `.card--layout-left/right` (card.scss:367) and
//    `.banner__content`'s width cap (banner.scss:129-131) are each wrapped in
//    utilities.container-query(), i.e. `@container column (min-width: 768px)`. The only
//    selectors that establish that container are .grid__column / .column-container /
//    .layout-container (layout/_grid.scss:118-125) — .page__container is NOT one, and
//    neither is a bare section.
//
//    Every view except UIDS itself hides this. The .dc.html templates each bake a host in
//    — Menu.dc.html:211 .column-container, Card.dc.html .dc-card-column,
//    Banner.dc.html:336 .dc-banner-column — and UIDS's own stories wrap their subjects in
//    .column-container. Production gets it from a Layout Builder region. So the ONE place
//    it is missing is a page composed the way claude-design/readme.md describes, and
//    nothing in the readme or in contracts/rules.json names the class.
//    Measured at 1440px, host vs no host: menu 57px vs 363px stacked with every submenu
//    open; wide card 419px vs 963px stacked; banner content capped at 1310px and aligned
//    with .page__container vs max-width none, running the full 1425px bleed.
//    The failure is silent in all three: no error, no checker, just wrong geometry.
//
// 9. Same defect one level down: .grid__column is ALSO a container host, so the readme's
//    grid markup silently disables card.scss's own 400px container query for every card in
//    a grid. Costs nothing on this page — none of the grid cards use an orientation — but
//    it is the identical failure mode as 8, and it is why 5 resolves the way it does.
//
// 10. Base line-height. UIDS's reset sets line-height 1.15 on html and body
//    (base/_reset.scss:36,64). claude-design/ ships no reset, so every text node that is
//    not a <p> falls back to `normal`: the breadcrumb measures 15px there against 20.5px
//    here, and the CTA is 284px against 238px. Cosmetic, but it is a floor under every
//    Claude Design measurement, so treat "off by a few px vs Storybook" as expected noise
//    unless it is bigger than this.
//
// 5b. The container-side alternative to `height: 100%`, measured in this story on
//    2026-08-25. Make the WRAPPER a column flex container and let the only child grow:
//
//      .list-container__inner > *            { display: flex; flex-direction: column; }
//      .list-container__inner > * > :only-child { flex: 1 1 auto; }
//      .section-alignment__start .list-container__inner > * { display: block; }
//
//    Four declarations, no percentage heights, and component-agnostic — a bare <div> as the
//    only child went 18px -> 434px, so .views-field and anything added later are covered
//    without extending a selector list. It also fixes a real defect in the shipped rule: in
//    a region holding TWO blocks, `height: 100%` gives the card the full 434px column and
//    the second block OVERFLOWS below it, while the flex version gives the card 385px, the
//    sibling its natural 33px, and nothing spills. Note .card already carries
//    `flex: 1 1 0%` (card.scss:24), inert today because no ancestor is a flex container —
//    which is fair evidence a flex parent was the original intent.
//    Not landed: this is a shipped-behaviour change in uids_base's territory and needs the
//    design system owner's ruling.
//
// 11. CTA details is unwrapped in UIDS. Cta.vue:110 renders the `details` prop as a bare
//    text node inside .cta__content, so it inherits 16px / line-height 1.15. CTA.dc.html
//    wraps it in a <p> and gets 19.2px / 1.7 — the body ramp, which is what Drupal's text
//    field would produce. Measured .cta__content: 18.4px tall here, 65.3px there. This one
//    is worth a ruling: the template is closer to production than the component is.
