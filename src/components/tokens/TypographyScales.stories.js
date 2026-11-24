import { computed, ref } from 'vue';
import { roleSpec, roleStyle, sizesOf } from './roleStyle';

/**
 * Design system research: what the UIDS type system is, then each system researched, with how UIDS is like it and how
 * it isn't, then the UIDS roles beside the type scale of twelve other systems, one
 * system at a time, at actual size. Each system's values are from its own documentation, read on 2026-11-10
 * (Material 3's from the M3 type scale image on developer.android.com; Spectrum 2's from its token package and React
 * library, read on 2026-11-19; the benchmarks' from their documentation and source, read the same day, with UCL's and
 * GitLab's body line heights measured on their own sites); the section on systems like UIDS also uses
 * sources read on 2026-11-18, listed in the note at the bottom. The UIDS values are read from the token files, and
 * each UIDS specimen is set as its classes set it, the hierarchy's body size times the role's multiple. A face not
 * installed here falls back to the system font; the sizes hold.
 */

const WEIGHT_NAMES = { 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold' };
const round = (n) => String(Math.round(n * 100) / 100);
const titleCase = (key) => key.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');


// The jobs the rows pair by, and the UIDS families that do each.
const JOBS = [
  ['display', 'A bigger statement'],
  ['title', 'The title'],
  ['section', 'Section heads'],
  ['subheading', 'Short headings and details'],
  ['eyebrow', 'The label above the title'],
  ['body', 'Reading text'],
  ['small', 'Small print'],
  ['label', 'Controls and captions'],
];
const UIDS_JOBS = { display: ['headline-6x', 'headline-8x'], title: ['headline'], section: ['subhead'], subheading: ['subhead-2'], eyebrow: ['eyebrow'], body: ['body'], small: ['small-print'], label: ['label'] };

// Each system in its default context: its body size, its face and the stack that renders it here, a note on the
// context, why UIDS doesn't follow it, its styles by job as [name, font size, line height, weight] in px (a line
// height the system doesn't publish is null), and what it has no style for.
const lh = (px, ratio) => Math.round(px * ratio * 100) / 100;
// Stanford Decanter on a desktop at its default base, 19px: step N is 1.25^N em, rounded to two places as Decanter
// rounds it.
const decanterPx = (step) => Math.round(19 * Number((1.25 ** step).toFixed(2)) * 100) / 100;
// UCL's body sizes, shared by its two heading sets. UCL publishes no body line heights; body-md's 24px is measured on
// UCL's own site.
const UCL_TEXT = {
  body: [['body-lg', 18, null, 400], ['body-md', 16, 24, 400]],
  small: [['body-sm', 14, null, 400], ['body-xs', 12, null, 400]],
};
const UCL_NONE = { eyebrow: 'No eyebrow style.', label: 'No label styles; labels reuse the body styles, with Medium 500 for UI labels.' };
const SYSTEMS = [
  {
    key: 'decanter', name: 'Stanford Decanter', context: 'a desktop at the default base', body: 19, face: 'Source Sans 3', stack: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
    note: 'Six heading levels on one modular scale, the h1 at step 5, all in em of a base that one of five classes sets on the root or a region. Steps are powers of 1.15 on phones, 1.2 on tablets and 1.25 on desktops. Shown on a desktop, 992 to 1499px, at the default base, 19px, with its named text styles; type-7 is the step it suggests for a hero headline.',
    why: 'The closest to UIDS in how a piece gets its base: one class sets it for a site, a region or a component, and the type follows in em. But the five bases sit within a few pixels of each other, 18 to 21px on desktops, so they tune a site’s reading size rather than change format, and the steps between the roles change with the screen width.',
    styles: {
      display: [['type-7 · hero headline', decanterPx(7), lh(decanterPx(7), 1.2), 700], ['splash-text · type-6', decanterPx(6), lh(decanterPx(6), 1.2), 700]],
      title: [['h1 · type-5', decanterPx(5), lh(decanterPx(5), 1.2), 700]],
      section: [['h2 · type-4', decanterPx(4), lh(decanterPx(4), 1.2), 700], ['h3 · type-3', decanterPx(3), lh(decanterPx(3), 1.2), 700]],
      subheading: [['h4 · type-2', decanterPx(2), lh(decanterPx(2), 1.2), 700], ['h5 · type-1', decanterPx(1), lh(decanterPx(1), 1.2), 700], ['h6 · type-0', 19, lh(19, 1.2), 700]],
      body: [['p', 19, lh(19, 1.5), 400], ['intro-text · type-2', decanterPx(2), lh(decanterPx(2), 1.5), 400], ['big-paragraph', 21.85, lh(21.85, 1.5), 400], ['card-paragraph', 17.67, lh(17.67, 1.4), 400]],
      small: [['caption', 17.1, lh(17.1, 1.3), 400]],
    },
    none: { eyebrow: 'No eyebrow style.', label: 'No label styles.' },
  },
  {
    key: 'ucl-editorial', name: 'UCL editorial', context: 'the editorial set on large screens', body: 16, face: 'UCL Sans', stack: "'UCL Sans', 'DM Sans', system-ui, sans-serif",
    note: 'Six editorial headings, sm to 3xl, 24 to 64px on large screens, Semibold 600, in UCL Sans, UCL’s version of DM Sans; on small screens the top is 40px. Editorial products are expressive and brand-led, so this set adds display sizes. The body comes in four sizes: 18 for long-form, 16 by default, 14 for secondary text and 12 for captions; UCL publishes no body line heights, so only body-md’s, 24px measured on UCL’s own site, is given.',
    why: 'Two heading sets, picked by the kind of product rather than its format. The editorial set adds display sizes and tops out at 64px, four times the body; each element picks its heading by name, and only the screen width changes the sizes.',
    styles: {
      display: [['heading-3xl', 64, lh(64, 1.1), 600], ['heading-xxl', 56, lh(56, 1.2), 600]],
      title: [['heading-xl', 36, lh(36, 1.3), 600]],
      section: [['heading-lg', 32, lh(32, 1.3), 600], ['heading-md', 28, lh(28, 1.4), 600]],
      subheading: [['heading-sm', 24, lh(24, 1.4), 600]],
      ...UCL_TEXT,
    },
    none: UCL_NONE,
  },
  {
    key: 'ucl-functional', name: 'UCL functional', context: 'the functional set on large screens', body: 16, face: 'UCL Sans', stack: "'UCL Sans', 'DM Sans', system-ui, sans-serif",
    note: 'Six functional headings, xs to xxl, 16 to 40px on large screens, Semibold 600; on small and medium screens the top is 36px. Functional products put usability and task completion first, so the set is deliberately restrained, with no display sizes. The body is shared with the editorial set.',
    why: 'Two heading sets, picked by the kind of product rather than its format. The functional set keeps a simple hierarchy, its top heading 2.5 times the body, and each element picks its heading by name.',
    styles: {
      title: [['heading-xxl', 40, lh(40, 1.3), 600]],
      section: [['heading-xl', 32, lh(32, 1.3), 600], ['heading-lg', 24, lh(24, 1.4), 600]],
      subheading: [['heading-md', 20, lh(20, 1.4), 600], ['heading-sm', 18, lh(18, 1.5), 600], ['heading-xs', 16, lh(16, 1.5), 600]],
      ...UCL_TEXT,
    },
    none: { ...UCL_NONE, display: 'No display size; functional products avoid large display styles.' },
  },
  {
    key: 'gitlab', name: 'GitLab Pajamas', context: 'the dynamic scale at 1200px and wider', body: 14, face: 'GitLab Sans', stack: "'GitLab Sans', system-ui, sans-serif",
    note: 'Eight sizes, 100 to 800: level 1 is one per page, and 800 is a display option for it. Sizes 500 to 800 grow with the screen from 768 to 1200px and are shown at their widest; Markdown uses a fixed scale at their smallest. Headings are weight 600 at line height 1.25; the body’s 21px line height is measured on gitlab.com.',
    why: 'A product ladder with no switch for format: each element picks one of eight sizes, and only the screen width moves the top four. Its level 1 heading, one per page, stays near twice the body.',
    styles: {
      display: [['Display option · 800', 36, lh(36, 1.125), 600]],
      title: [['Level 1 · 700', 30, lh(30, 1.25), 600]],
      section: [['Level 2 · 600', 25, lh(25, 1.25), 600], ['Level 3 · 500', 20, lh(20, 1.25), 600]],
      subheading: [['Level 4 · 400', 16, lh(16, 1.25), 600], ['Level 5 · 300', 14, lh(14, 1.25), 600], ['Level 6 · 200', 13, lh(13, 1.25), 600]],
      body: [['Body · 300', 14, 21, 400]],
      small: [['Meta text · 100', 12, null, 400]],
    },
    none: { eyebrow: 'No eyebrow style.', label: 'No label styles; input labels use 300, 14px, at weight 600.' },
  },
  {
    key: 'm3', name: 'Material 3', context: 'its one scale', body: 16, face: 'Roboto', stack: 'var(--uiowa-typography-font-family-roboto)',
    note: 'Fifteen styles, five roles in three sizes, on a 16px body (Body Large). Large, Medium and Small are sizes an element picks, not contexts. From the M3 type scale image on developer.android.com; the Compose source differs slightly.',
    why: 'Each element picks its own style from one set of fixed sizes, so nothing holds a piece to a set hierarchy. A role’s Large, Medium and Small are sizing options for whoever builds the page, and how they’re put together is left to them.',
    styles: {
      display: [['Display Large', 57, 64, 400], ['Display Medium', 45, 52, 400], ['Display Small', 36, 44, 400]],
      title: [['Headline Large', 32, 40, 400], ['Headline Medium', 28, 36, 400], ['Headline Small', 24, 32, 400]],
      section: [['Title Large', 22, 28, 500]],
      subheading: [['Title Medium', 16, 24, 500], ['Title Small', 14, 20, 500]],
      body: [['Body Large', 16, 24, 400], ['Body Medium', 14, 20, 400], ['Body Small', 12, 16, 400]],
      label: [['Label Large', 14, 20, 500], ['Label Medium', 12, 16, 500], ['Label Small', 11, 16, 500]],
    },
    none: { eyebrow: 'No eyebrow style; Material 2’s Overline was dropped.', small: 'No small print style; Body Small is the smallest body text.' },
  },
  {
    key: 'apple', name: 'Apple', context: 'Dynamic Type at Large, the default size category', body: 17, face: 'SF Pro', stack: '-apple-system, system-ui, sans-serif',
    note: 'Eleven text styles, in points. The reader picks one of twelve size categories on the device and every style moves with it; Large is the default. Controls use Body and Headline.',
    why: 'Its one setting belongs to the reader, not the piece: every style follows the text size the reader picks on the device, and the proportions shift with it. The Large Title is 2.2 times the body at xSmall and 1.7 times at xxxLarge.',
    styles: {
      title: [['Large Title', 34, 41, 400]],
      section: [['Title 1', 28, 34, 400], ['Title 2', 22, 28, 400], ['Title 3', 20, 25, 400]],
      subheading: [['Headline', 17, 22, 600]],
      body: [['Body', 17, 22, 400], ['Callout', 16, 21, 400], ['Subhead', 15, 20, 400]],
      small: [['Footnote', 13, 18, 400], ['Caption 1', 12, 16, 400], ['Caption 2', 11, 13, 400]],
    },
    none: { display: 'No display size; Large Title is the biggest text style.', eyebrow: 'No eyebrow style.', label: 'No label styles; controls use Body and Headline.' },
  },
  {
    key: 'fluent', name: 'Fluent 2', context: 'the web ramp', body: 14, face: 'Segoe UI', stack: "'Segoe UI', system-ui, sans-serif",
    note: 'One ramp per platform, the web ramp shown: Body 1 at 14px up to Display at 68px, Semibold above the body. Windows, macOS, iOS and Android each have their own ramp.',
    why: 'Each element picks from one ladder of fixed sizes, as in Material 3. Its one switch is the platform, with a ramp each for the web, Windows, macOS, iOS and Android, so nothing changes with a piece’s format.',
    styles: {
      display: [['Display', 68, 92, 600], ['Large Title', 40, 52, 600]],
      title: [['Title 1', 32, 40, 600]],
      section: [['Title 2', 28, 36, 600], ['Title 3', 24, 32, 600]],
      subheading: [['Subtitle 1', 20, 26, 600], ['Subtitle 2', 16, 22, 600]],
      body: [['Body 1', 14, 20, 400]],
      small: [['Caption 1', 12, 16, 400], ['Caption 2', 10, 14, 400]],
    },
    none: { eyebrow: 'No eyebrow style.', label: 'No label styles; controls use Body 1 and Caption 1.' },
  },
  {
    key: 'atlassian', name: 'Atlassian', context: 'its heading and body tokens', body: 16, face: 'Atlassian Sans', stack: "'Atlassian Sans', system-ui, sans-serif",
    note: 'Seven heading sizes, each with a use: XXL and XL for brand and marketing, L for app page titles, M for modals, S and XS for small components, XXS for fine print. Body L is the long-form default and Body M the default in components.',
    why: 'One ladder, with more opinion than Material 3: each heading size names its use, such as L for app page titles and M for modals. But the opinion is per element, and the sizes stay the same whatever the format.',
    styles: {
      title: [['Heading XXL', 32, 36, 700], ['Heading XL', 28, 32, 700]],
      section: [['Heading L', 24, 28, 700], ['Heading M', 20, 24, 700]],
      subheading: [['Heading S', 16, 20, 700], ['Heading XS', 14, 20, 700], ['Heading XXS', 12, 16, 700]],
      body: [['Body L', 16, 24, 400], ['Body M', 14, 20, 400]],
      small: [['Body S', 12, 16, 400]],
    },
    none: { display: 'No display size; Heading XXL is the biggest, for brand and marketing.', eyebrow: 'No eyebrow style.', label: 'No label styles; components use Body M.' },
  },
  {
    key: 'govuk', name: 'GOV.UK', context: 'the large-screen scale', body: 19, face: 'GDS Transport', stack: "'GDS Transport', Arial, sans-serif",
    note: 'Seven points, 80 to 16, each with a small-screen size below 640px that the browser applies. Body and heading-s share 19px; 80 and 27 are for exceptional circumstances.',
    why: 'Its one switch is the screen width: below 640px each point takes a smaller size. Otherwise every element picks from the same seven points, so nothing changes with a piece’s format.',
    styles: {
      display: [['80, exceptional', 80, 80, 700]],
      title: [['48 · heading-xl', 48, 50, 700]],
      section: [['36 · heading-l', 36, 40, 700], ['27, exceptional', 27, 30, 700]],
      subheading: [['24 · heading-m', 24, 30, 700]],
      body: [['19 · body', 19, 25, 400], ['24 · body-l', 24, 30, 400]],
      small: [['16 · body-s', 16, 20, 400]],
    },
    none: { eyebrow: 'No eyebrow style.', label: 'No label styles; form labels use the same scale.' },
  },
  {
    key: 'uswds', name: 'USWDS', context: 'the default theme sizes', body: 16, face: 'Public Sans', stack: "'Public Sans', system-ui, sans-serif",
    note: 'Nine theme sizes set once in the project’s settings, 3xs 13px to 3xl 48px, drawn from 21 system sizes. The defaults: body sm 16px, lead lg 22px, h1 2xl 40px down to h6 3xs 13px, headings at line height 1.15 and body at 1.62.',
    why: 'Its sizes are set once for the whole project, in its settings, and every element then picks from that one ladder, so nothing changes with a piece’s format.',
    styles: {
      title: [['h1 · 2xl', 40, lh(40, 1.15), 700]],
      section: [['h2 · xl', 32, lh(32, 1.15), 700], ['h3 · lg', 22, lh(22, 1.15), 700]],
      subheading: [['h4 · sm', 16, lh(16, 1.15), 700], ['h5 · xs', 15, lh(15, 1.15), 700], ['h6 · 3xs', 13, lh(13, 1.15), 700]],
      body: [['body · sm', 16, lh(16, 1.62), 400], ['lead · lg', 22, lh(22, 1.62), 400]],
      small: [['small · 2xs', 14, lh(14, 1.62), 400]],
    },
    none: { display: 'No display size in the defaults; 3xl, 48px, is the largest theme size.', eyebrow: 'No eyebrow style.', label: 'No label styles; form labels use the body size.' },
  },
  {
    key: 'carbon', name: 'Carbon', context: 'the expressive set, for web pages', body: 16, face: 'IBM Plex Sans', stack: "'IBM Plex Sans', system-ui, sans-serif",
    note: 'Two type sets: Expressive on a 16px body for editorial and web pages, its headings and display sizes fluid (shown at their base), and Productive on a 14px body with fixed headings for product pages. One set per task or region.',
    why: 'The closest in idea, a set picked by context. But Carbon draws its two sets separately, each with its own labels, and an element still picks its style by name; UIDS works out its five sets from one formula and switches a piece with one class.',
    styles: {
      display: [['fluid-display-04', 92, 102, 300], ['fluid-display-03', 60, 70, 300], ['fluid-display-01', 54, 64, 300]],
      title: [['fluid-heading-06', 42, 50, 600], ['fluid-heading-05', 42, 50, 300]],
      section: [['fluid-heading-04', 28, 36, 400]],
      subheading: [['fluid-heading-03', 20, 28, 400], ['heading-02', 16, 24, 600]],
      body: [['body-02', 16, 24, 400], ['body-compact-02', 16, 22, 400]],
      small: [['legal-02', 14, 18, 400], ['helper-text-02', 14, 18, 400]],
      label: [['label-02', 14, 18, 400]],
    },
    none: { eyebrow: 'No eyebrow style.' },
  },
  {
    key: 'radix', name: 'Radix Themes', context: 'its nine steps', body: 16, face: 'the system font', stack: 'system-ui, sans-serif',
    note: 'Nine font-size steps, 12 to 60px, shared by Text and Heading through a size prop; weight is a separate prop, so the steps are shown Regular. The Theme’s scaling setting, 90 to 110 percent, scales every step at once. Ratios here are of step 3, 16px.',
    why: 'The closest in mechanism: its scaling setting multiplies every step by one number, for a whole page or part of one. But the setting only runs from 90 to 110 percent, for density, and the nine steps are numbered sizes that Text and Heading share, with no roles.',
    styles: {
      display: [['Step 9', 60, 60, 400], ['Step 8', 35, 40, 400]],
      title: [['Step 7', 28, 36, 400]],
      section: [['Step 6', 24, 30, 400]],
      subheading: [['Step 5', 20, 28, 400], ['Step 4', 18, 26, 400]],
      body: [['Step 3', 16, 24, 400], ['Step 2', 14, 20, 400]],
      small: [['Step 1', 12, 16, 400]],
    },
    none: { eyebrow: 'No eyebrow style.', label: 'No label styles; a step and a weight make one.' },
  },
  {
    key: 'spectrum', name: 'Spectrum 2', context: 'its desktop scale', body: 16, face: 'Adobe Clean Spectrum VF', stack: "'Adobe Clean Spectrum VF', system-ui, sans-serif",
    note: 'Heading is for the broadest idea, such as the main page title; Title for cards, panels and file names; Detail for supporting context; Component for the text in controls. Each family comes in up to eight sizes, all of them the base times a power of 1.125: 14px on its desktop scale, 17px on its mobile scale. Shown: every Heading size, paired with the rows by size, and the other families at their default size; ratios are of Body M, 16px.',
    why: 'Its sizes are built like UIDS’s, one base times a fixed number for each size (a power of 1.125), so moving the base moves every size. But its switch is for the device, a desktop scale on 14px and a mobile scale on 17px: its React library picks the mobile one on a touch screen by itself, and its Web Components take a scale attribute on a wrapper. Each element still picks a family and one of up to eight sizes by name, so nothing changes with a piece’s format.',
    styles: {
      display: [['Heading XXXXL', 73, 84, 800], ['Heading XXXL', 58, 66, 800], ['Heading XXL', 45, 52, 800]],
      title: [['Heading XL', 36, 42, 800], ['Heading L', 28, 32, 800]],
      section: [['Heading M', 22, 26, 800], ['Heading S', 20, 24, 800]],
      subheading: [['Heading XS', 18, 22, 800], ['Title M', 16, 20, 700], ['Detail M', 14, 18, 500]],
      body: [['Body M', 16, 24, 400]],
      label: [['Component', 14, 18, 400]],
    },
    none: { eyebrow: 'No eyebrow style.', small: 'No small print style; Body XS and Body XXS, 12 and 11px, are the smallest body sizes.' },
  },
];

// The research: each system, what it is, how UIDS is like it and how it isn't, with its page and the pages its facts
// come from. Their sizes are on the side-by-side comparison; Bootstrap, Bulma, Every Layout, Primer and Tailwind
// Typography are not in it.
const RESEARCH = [
  {
    key: 'decanter',
    name: 'Stanford Decanter',
    url: 'https://decanter.stanford.edu/for-developers/strategies-and-conventions#base-font-size-and-scales',
    sources: [
      { label: "Strategies and conventions", url: 'https://decanter.stanford.edu/for-developers/strategies-and-conventions#base-font-size-and-scales' },
      { label: "its source on GitHub", url: 'https://github.com/SU-SWS/decanter' },
    ],
    what: 'Five base sizes, basefont-19 to basefont-23, picked with a class on the root or a region, with most type in em of the base. Its h1 to h6 are steps 5 to 0 of one modular scale whose ratio grows with the screen: 1.15 on phones, 1.2 on tablets and 1.25 on desktops.',
    like: [
      'One class sets the base for a site, a region or a component, and the type follows it, as a UIDS hierarchy class does.',
      'Its six heading levels come from one scale on one base, as the UIDS document outline stays in one hierarchy.',
    ],
    unlike: [
      'The five bases sit within a few pixels of each other, 18 to 21px on desktops, so they tune a site’s reading size rather than change format.',
      'Its steps are powers of a ratio that changes with the screen width, not a fixed multiple per role. The h1 is about 3× the body on a desktop, where the Headline is 4×.',
    ],
  },
  {
    key: 'ucl',
    name: 'UCL',
    url: 'https://www.ucl.ac.uk/brand-and-experience/experience/ucl-design-system/foundations/typography/usage-guidelines',
    sources: [
      { label: "Typography usage guidelines", url: 'https://www.ucl.ac.uk/brand-and-experience/experience/ucl-design-system/foundations/typography/usage-guidelines' },
      { label: "Typography overview", url: 'https://www.ucl.ac.uk/brand-and-experience/experience/ucl-design-system/foundations/typography' },
    ],
    what: 'A 16px body and two heading sets: functional, for usability and tasks, topping out at 40px on large screens, 2.5× the body; and editorial, which adds display sizes and tops out at 64px, 4× the body.',
    like: ['A set is picked by context, and the editorial top, 4× the body, is the UIDS Headline’s multiple: a precedent for 4× as an editorial treatment, with routine titles lower.'],
    unlike: ['The sets are picked by the kind of product, not its format, and each element picks its heading by name.', 'Only the screen width changes the sizes.'],
  },
  {
    key: 'gitlab',
    name: 'GitLab Pajamas',
    url: 'https://design.gitlab.com/product-foundations/type-fundamentals/',
    sources: [
      { label: "Type fundamentals", url: 'https://design.gitlab.com/product-foundations/type-fundamentals/' },
    ],
    what: 'A 14px body and eight sizes, 100 to 800. Level 1, one per page, runs 24 to 30px with the screen width, 1.7 to 2.1× the body, and a display option for it runs 28 to 36px. Headings are weight 600.',
    like: ['Its level 1 heading is one per page, as the Headline is once per piece.'],
    unlike: ['A product ladder with no switch for format: each element picks one of eight sizes, and the screen width moves the top four.', 'Its page title stays near twice the body, where the Headline is 4×.'],
  },
  {
    key: 'apple',
    name: 'Apple',
    url: 'https://developer.apple.com/design/human-interface-guidelines/typography',
    sources: [
      { label: "Human Interface Guidelines: Typography, with the Dynamic Type sizes", url: 'https://developer.apple.com/design/human-interface-guidelines/typography' },
    ],
    what: 'Eleven text styles in points. The reader picks one of twelve size categories on the device, Large by default, and every style moves with it.',
    like: ['One setting moves every style at once, as one class moves every UIDS role.'],
    unlike: ['The setting belongs to the reader, not the piece.', 'The proportions shift with it: the Large Title is 2.2× the body at xSmall and 1.7× at xxxLarge, where a UIDS multiple holds.'],
  },
  {
    key: 'atlassian',
    name: 'Atlassian',
    url: 'https://atlassian.design/foundations/typography',
    sources: [
      { label: "Typography", url: 'https://atlassian.design/foundations/typography' },
      { label: "Applying typography", url: 'https://atlassian.design/foundations/typography/applying-typography' },
    ],
    what: 'Seven heading sizes, each with a stated use: XXL and XL for brand and marketing, L for app page titles, M for modals, S and XS for small components, XXS for fine print. Body L is the long-form default and Body M the default in components.',
    like: ['Each style names its job, as each UIDS role does. Its Applying typography page is the model for the UIDS page of that name.'],
    unlike: ['The opinion is per element, and the sizes stay the same whatever the format.'],
  },
  {
    key: 'bootstrap',
    name: 'Bootstrap',
    url: 'https://getbootstrap.com/docs/5.3/content/typography/',
    sources: [
      { label: "Typography", url: 'https://getbootstrap.com/docs/5.3/content/typography/' },
    ],
    what: 'Global styles for the bare h1 to h6, and .h1 to .h6 classes to give another element a heading’s look.',
    like: ['A heading’s look can be set apart from its level with a class, as the UIDS role classes do.'],
    unlike: ['Its heading styles are global defaults for every page. UIDS keeps the outline inside type-rich-text and leaves components’ headings alone.'],
  },
  {
    key: 'bulma',
    name: 'Bulma',
    url: 'https://bulma.io/documentation/elements/content/',
    sources: [
      { label: "Content", url: 'https://bulma.io/documentation/elements/content/' },
      { label: "content.scss", url: 'https://github.com/jgthms/bulma/blob/main/sass/elements/content.scss' },
    ],
    what: 'A size class on a content block, is-small, is-medium or is-large, sets its body to 12, 20 or 24px, and the headings inside keep the same multiples at every size, from the h1 at 2× the body to the h6 at 1×.',
    like: ['UIDS’s shape: one size class on a block, and headings at fixed multiples of the body at every size.'],
    unlike: ['Headings are its only roles: no eyebrow and no display steps.', 'Its sizes run only from 12 to 24px.'],
  },
  {
    key: 'carbon',
    name: 'Carbon',
    url: 'https://carbondesignsystem.com/elements/typography/overview/',
    sources: [
      { label: "Typography overview", url: 'https://carbondesignsystem.com/elements/typography/overview/' },
      { label: "Type sets", url: 'https://carbondesignsystem.com/elements/typography/type-sets/' },
    ],
    what: 'Two type sets: Expressive, on a 16px body with fluid headings, for editorial and web pages, and Productive, on a 14px body with fixed headings, for product pages. One set per task or region.',
    like: ['The closest in idea: a whole set picked by context. UIDS has five, picked by format: Medium for web pages and applications, Large for ads, banners and posters, and X-Small, Small and X-Large for programs, letters and displays.'],
    unlike: ['Carbon draws each set separately, with its own labels, and an element picks its style by name. UIDS works out all five sets from one formula, keeps one set of Labels, and switches a piece with one class.'],
  },
  {
    key: 'every-layout',
    name: 'Every Layout',
    url: 'https://every-layout.dev/rudiments/modular-scale/',
    sources: [
      { label: "Modular scale", url: 'https://every-layout.dev/rudiments/modular-scale/' },
      { label: "Units", url: 'https://every-layout.dev/rudiments/units/' },
    ],
    what: 'Heydon Pickering and Andy Bell’s modular scale: a ratio of 1.5 on a 1rem base, each step 1.5× the one below, used mostly for space, with type in rem.',
    like: ['Every size is a multiple of one base, and its first step, 1.5×, is the UIDS Related gap.'],
    unlike: ['The base is the root font size, which grows with the window, so the page moves by screen width rather than format.', 'The steps are powers of one ratio, not a multiple per role.'],
  },
  {
    key: 'fluent',
    name: 'Fluent 2',
    url: 'https://fluent2.microsoft.design/typography',
    sources: [
      { label: "Typography", url: 'https://fluent2.microsoft.design/typography' },
    ],
    what: 'One type ramp per platform. The web ramp runs from Body 1 at 14px to Display at 68px, Semibold above the body; Windows, macOS, iOS and Android have their own.',
    like: ['Named styles from the body up to display sizes, as the UIDS roles run from Small print to the Headline’s 8× step.'],
    unlike: ['Its one switch is the platform, and each element picks from one ladder of fixed sizes, so nothing changes with a piece’s format.'],
  },
  {
    key: 'govuk',
    name: 'GOV.UK',
    url: 'https://design-system.service.gov.uk/styles/type-scale/',
    sources: [
      { label: "Type scale", url: 'https://design-system.service.gov.uk/styles/type-scale/' },
      { label: "Headings", url: 'https://design-system.service.gov.uk/styles/headings/' },
    ],
    what: 'Seven points, 80 to 16, each with a smaller size below 640px, and a 19px body. Headings take a class, govuk-heading-xl, -l, -m or -s, and a caption above the h1 shows the larger section a page belongs to.',
    like: ['The same 19px body as UIDS Medium.', 'Its caption above the h1 does the Eyebrow’s job: it names what the page belongs to.'],
    unlike: ['One ladder for every element, switched only by the screen width.', 'Bare headings aren’t styled, so it has nothing like type-rich-text, and its four heading sizes cover six levels.'],
  },
  {
    key: 'm3',
    name: 'Material 3',
    url: 'https://m3.material.io/styles/typography/type-scale-tokens',
    sources: [
      { label: "Type scale tokens", url: 'https://m3.material.io/styles/typography/type-scale-tokens' },
      { label: "Material 3 in Compose, with the type scale image", url: 'https://developer.android.com/develop/ui/compose/designsystems/material3#typography' },
    ],
    what: 'Fifteen styles, five roles (Display, Headline, Title, Body and Label) in Large, Medium and Small, on a 16px body.',
    like: ['Named roles, including Labels for controls.'],
    unlike: ['Large, Medium and Small are sizes an element picks, not contexts, so nothing holds a piece to one set.'],
  },
  {
    key: 'primer',
    name: 'Primer (GitHub)',
    url: 'https://github.com/primer/css/blob/main/src/markdown/headings.scss',
    sources: [
      { label: "Markdown headings source", url: 'https://github.com/primer/css/blob/main/src/markdown/headings.scss' },
    ],
    what: 'markdown-body styles rendered Markdown: its h1 to h6 are 2, 1.5, 1.25, 1, 0.875 and 0.85em.',
    like: ['A wrapper for text where authors pick only heading levels, as type-rich-text is, with the headings in em of the block, so the outline follows the block’s size.'],
    unlike: ['All six levels step down, and h5 and h6 drop below the body size. UIDS stops at Subhead 2, 1.5× the body.'],
  },
  {
    key: 'radix',
    name: 'Radix Themes',
    url: 'https://www.radix-ui.com/themes/docs/theme/typography',
    sources: [
      { label: "Typography", url: 'https://www.radix-ui.com/themes/docs/theme/typography' },
      { label: "Theme, with its scaling setting", url: 'https://www.radix-ui.com/themes/docs/components/theme' },
    ],
    what: 'Nine font-size steps, 12 to 60px, shared by Text and Heading, and a Theme scaling setting, 90 to 110%, that scales every step for a page or part of one.',
    like: ['The closest in mechanism: one setting multiplies every step, for a page or part of one.'],
    unlike: ['The setting only runs from 90 to 110%, for density, not format.', 'The steps are numbered sizes with no roles.'],
  },
  {
    key: 'spectrum',
    name: 'Spectrum 2',
    url: 'https://spectrum.adobe.com/page/typography/',
    sources: [
      { label: "Typography", url: 'https://spectrum.adobe.com/page/typography/' },
      { label: "React Spectrum styling", url: 'https://react-spectrum.adobe.com/styling' },
      { label: "Web Components styles and scales", url: 'https://opensource.adobe.com/spectrum-web-components/tools/styles/#scales' },
      { label: "spectrum-tokens", url: 'https://github.com/adobe/spectrum-tokens' },
    ],
    what: 'Heading, Title, Detail and Component families, each in up to eight sizes, all one base times a power of 1.125: 14px on its desktop scale and 17px on its mobile scale.',
    like: ['Its sizes are built like UIDS’s: one base times a fixed number for each size, so moving the base moves every size.'],
    unlike: ['Its switch is the device: the React library picks the mobile scale on a touch screen, and its Web Components take a scale attribute on a wrapper.', 'Each element still picks a family and a size by name.'],
  },
  {
    key: 'tailwind',
    name: 'Tailwind Typography',
    url: 'https://github.com/tailwindlabs/tailwindcss-typography',
    sources: [
      { label: "tailwindcss-typography", url: 'https://github.com/tailwindlabs/tailwindcss-typography' },
      { label: "styles.js", url: 'https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js' },
    ],
    what: 'prose styles the bare elements in a content block, and prose-sm to prose-2xl set its body from 14 to 24px, with the headings in em. h1 to h3 have sizes; h4 takes the body size, and h5 and h6 aren’t styled.',
    like: ['One class on a block styles its bare headings and text, as type-rich-text does, and one size class switches the whole block, as a hierarchy class does.'],
    unlike: ['Each size has its own multiples: the h1 is 2.25× the body at the default size, 2.67× at prose-lg and 2.8× at prose-xl.', 'Its lower levels fall to the body size, where UIDS keeps h3 to h6 at Subhead 2.'],
  },
  {
    key: 'uswds',
    name: 'USWDS',
    url: 'https://designsystem.digital.gov/design-tokens/typesetting/font-size/',
    sources: [
      { label: "Font size", url: 'https://designsystem.digital.gov/design-tokens/typesetting/font-size/' },
      { label: "Settings", url: 'https://designsystem.digital.gov/documentation/settings/' },
      { label: "Prose", url: 'https://designsystem.digital.gov/components/prose/' },
    ],
    what: 'Nine theme sizes set once in a project’s settings, from a 16px body to a 40px h1. usa-prose gives the bare headings, paragraphs and lists in CMS or Markdown content USWDS’s default styles.',
    like: ['usa-prose is the model for type-rich-text: one class on the container, and no classes on what’s inside.', 'Its outline is fixed in one scale.'],
    unlike: ['Its sizes are set once per project, with no switch per piece, and usa-prose has no size variants.', 'Its h5 and h6 drop below the body size.'],
  },
];

// University homepages, from the survey of 2026-10-29 captured at 1440px: each site's link, general reading size,
// hero headline and section headings, in px. A range is [low, high]; null is no measurable headline.
const HOMEPAGES = [
  ['Cal Poly', 'https://www.calpoly.edu/', 19.2, 100, [60, 64], 'Intros 25.6px, compact cards 16px.'],
  ['NDSCS', 'https://ndscs.edu/', 18, 72, 72, 'Section display words 106px, 5.9×.'],
  ['Simmons', 'https://www.simmons.edu/', 22, 96, 50, 'Promotional statement 28px, cards 16px.'],
  ['North Dakota', 'https://und.edu/', 16, null, 72, 'The 234px hero is a decorative word; intros 28px.'],
  ['Louisiana at Lafayette', 'https://louisiana.edu/', 20, 38, 32, 'News and culture descriptions 16px.'],
  ['Virginia, Admission', 'https://www.virginia.edu/admission/', 18, 90, [81, 86.4], 'Opening introduction 32px.'],
  ['Quincy College', 'https://quincycollege.edu/', 21, 90, 48, 'Section introductions 26px.'],
  ['Alfred University', 'https://www.alfred.edu/', 20, null, 65, 'A video hero with no HTML headline.'],
  ['SUNY Adirondack', 'https://www.sunyacc.edu/', 17, 100, 60, 'One reading size; Campus Life 96px, 5.6×, closing 84px, 4.9×.'],
  ['College of Wooster', 'https://wooster.edu/', 18, 86, 40, 'One reading size; cards 30.4 and 24px.'],
  ['UA Little Rock', 'https://ualr.edu/', 20, 54, [38, 44], 'One reading size; news lead 32px.'],
  ['Southern Virginia', 'https://svu.edu/', 20, 128, 72, ''],
  ['USC Upstate', 'https://uscupstate.edu/', 20, 172.8, 64, 'The hero is 12vw, so it scales with the viewport.'],
];
const ratio = (px, body) => (px == null ? '—' : Array.isArray(px) ? `${round(px[0] / body)}–${round(px[1] / body)}×` : `${round(px / body)}×`);
const pxText = (px) => (px == null ? '—' : Array.isArray(px) ? `${px[0]}–${px[1]}px` : `${px}px`);
const HOMEPAGE_ROWS = HOMEPAGES.map(([site, url, body, hero, section, note]) => ({ site, url, body: `${body}px`, hero: pxText(hero), heroX: ratio(hero, body), section: pxText(section), sectionX: ratio(section, body), note }));

// A UIDS family's styles: a role in each hierarchy, its size the hierarchy's body size times the role's multiple
// (Headline Medium is 4× Body Medium); a body size is the 1× of its hierarchy, and the Labels are one set, each a
// multiple of Body Medium.
const SIZE_NAMES = { 'x-large': 'X-Large', large: 'Large', medium: 'Medium', small: 'Small', 'x-small': 'X-Small' };
const uidsStyles = (family) => Object.keys(SIZE_NAMES).filter((size) => sizesOf(family).includes(size));
const uidsFamily = (family) => uidsStyles(family).map((size) => {
  const { px, leading, weight, by } = roleSpec(family, size);
  const bodyName = family === 'label' ? 'Medium' : SIZE_NAMES[size];
  const basis = family === 'body' ? 'the body size' : `${by}× Body ${bodyName}`;
  return {
    key: `${family}-${size}`,
    size,
    badge: family === 'label' ? 'Every hierarchy' : `${SIZE_NAMES[size]} hierarchy`,
    name: `${titleCase(family).replace(/(\d)x$/, '$1×')} ${SIZE_NAMES[size]}`,
    px,
    spec: `${round(px)}/${round(px * leading)} · ${WEIGHT_NAMES[weight]} ${weight} · ${basis}`,
    style: roleStyle(family, size),
  };
});
const UIDS_COUNT = Object.values(UIDS_JOBS).flat().reduce((n, family) => n + uidsStyles(family).length, 0);

const familyName = (family) => titleCase(family).replace(/(\d)x$/, '$1×');
const familyFace = (family) => roleSpec(family, uidsStyles(family)[0]).face;

const css = `
  .m3c { box-sizing: border-box; max-width: 1440px; margin: 0 auto; padding: 40px 24px 64px; color: var(--uiowa-color-neutral-800); font-family: var(--uiowa-typography-font-family-roboto); }
  .m3c *, .m3c *::before, .m3c *::after { box-sizing: border-box; }
  /* The page's own text sits on the Medium hierarchy. */
  .m3c {
    --tr-f-title: var(--uiowa-typography-subhead-font-weight) calc(var(--uiowa-typography-body-medium-font-size) * var(--uiowa-typography-subhead-multiple))/var(--uiowa-typography-subhead-line-height) var(--uiowa-typography-subhead-font-family);
    --tr-f-h2: var(--uiowa-typography-subhead-2-font-weight-emphasis) calc(var(--uiowa-typography-body-medium-font-size) * var(--uiowa-typography-subhead-2-multiple))/var(--uiowa-typography-subhead-2-line-height) var(--uiowa-typography-subhead-2-font-family);
    --tr-f-body: var(--uiowa-typography-body-font-weight) var(--uiowa-typography-body-medium-font-size)/var(--uiowa-typography-body-line-height) var(--uiowa-typography-body-font-family);
    --tr-f-small: var(--uiowa-typography-small-print-font-weight) calc(var(--uiowa-typography-body-medium-font-size) * var(--uiowa-typography-small-print-multiple))/var(--uiowa-typography-small-print-line-height) var(--uiowa-typography-small-print-font-family);
    --tr-f-label: var(--uiowa-typography-label-large-font-weight) var(--uiowa-typography-label-large-font-size)/var(--uiowa-typography-label-large-line-height) var(--uiowa-typography-label-large-font-family);
    --tr-f-tag: var(--uiowa-typography-label-small-font-weight) var(--uiowa-typography-label-small-font-size)/var(--uiowa-typography-label-small-line-height) var(--uiowa-typography-label-small-font-family);
  }
  .m3c__eyebrow { margin: 0 0 6px; font: var(--tr-f-small); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .m3c__title { margin: 0 0 12px; font: var(--tr-f-title); color: var(--uiowa-color-neutral-900); }
  .m3c__lede { margin: 0 0 16px; max-width: 70ch; font: var(--tr-f-body); color: var(--uiowa-color-neutral-700); }
  .m3c__lede b { color: var(--uiowa-color-neutral-900); }
  .m3c__lede code { font-family: var(--uiowa-font-family-mono, monospace); font-size: 0.9em; }
  .m3c__lede--system { margin-top: 12px; }
  .m3c__grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 48px; margin-top: 32px; }
  .m3c__head { padding-bottom: 12px; border-bottom: 2px solid var(--uiowa-color-neutral-900); }
  .m3c__head h2 { margin: 0; font: var(--tr-f-h2); color: var(--uiowa-color-neutral-900); }
  .m3c__head p, .m3c__job { margin: 4px 0 0; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__cell { padding: 20px 0 28px; border-bottom: 1px solid var(--uiowa-color-neutral-175); }
  .m3c__family { margin: 0; font: var(--tr-f-small); font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .m3c__entry { margin-top: 16px; }
  .m3c__badge { padding: 2px 9px; border-radius: 999px; background: var(--uiowa-color-neutral-200); font: var(--tr-f-tag); font-weight: 700; letter-spacing: .02em; color: var(--uiowa-color-neutral-900); }
  .m3c__spec { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; margin: 0 0 4px; font: var(--tr-f-small); font-family: var(--uiowa-font-family-mono, monospace); color: var(--uiowa-color-neutral-500); }
  .m3c__specimen { margin: 0; color: var(--uiowa-color-neutral-900); overflow-wrap: anywhere; }
  .m3c__specimen--eyebrow { text-transform: uppercase; }
  .m3c__none { margin: 16px 0 0; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__note { margin: 24px 0 0; max-width: 80ch; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__note--system { margin-top: 12px; max-width: 90ch; color: var(--uiowa-color-neutral-700); }
  .m3c__toggles { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 32px; margin-top: 4px; }
  .m3c__toggle { display: inline-flex; align-items: center; gap: 6px; font: var(--tr-f-label); color: var(--uiowa-color-neutral-700); cursor: pointer; }
  .m3c__pick { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 16px 0 8px; padding: 0; border: 0; }
  .m3c__pick legend { float: left; margin-right: 6px; padding: 0; font: var(--tr-f-label); color: var(--uiowa-color-neutral-500); }
  .m3c__pick label { position: relative; display: inline-flex; align-items: center; gap: 6px; margin: 0; padding: 6px 14px; border: 1px solid var(--uiowa-color-neutral-175); border-radius: 999px; font: var(--tr-f-label); color: var(--uiowa-color-neutral-800); cursor: pointer; }
  .m3c__pick label.on { background: var(--uiowa-color-neutral-800); border-color: var(--uiowa-color-neutral-800); color: var(--uiowa-color-neutral-0); }
  .m3c__pick label:has(input:focus-visible) { outline: 2px solid var(--uiowa-color-neutral-800); outline-offset: 2px; }
  .m3c__pick input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
  .m3c__h2 { margin: 48px 0 8px; padding-bottom: 8px; border-bottom: 1px solid var(--uiowa-color-neutral-175); font: var(--tr-f-h2); color: var(--uiowa-color-neutral-900); }
  .m3c .m3c__h3 { margin: 28px 0 8px; font: var(--tr-f-body); font-weight: 700; color: var(--uiowa-color-neutral-900); }
  /* What UIDS is, and each system's research: what it is, then how UIDS is like it and how it isn't, side by side. */
  .m3c__list { margin: 0 0 16px; padding-left: 1.25em; max-width: 70ch; font: var(--tr-f-body); color: var(--uiowa-color-neutral-700); }
  .m3c__list li { margin: 0 0 6px; }
  .m3c__list code { font-family: var(--uiowa-font-family-mono, monospace); font-size: 0.9em; }
  .m3c__research { margin-top: 24px; padding-top: 4px; border-top: 1px solid var(--uiowa-color-neutral-150); }
  .m3c__research:first-of-type { margin-top: 0; padding-top: 0; border-top: 0; }
  .m3c__likes { display: grid; gap: 0 32px; }
  @media (min-width: 48rem) { .m3c__likes { grid-template-columns: 1fr 1fr; } }
  .m3c__likes-head { margin: 0 0 6px; font: var(--tr-f-label); color: var(--uiowa-color-neutral-900); }
  .m3c__sources { margin: 0 0 16px; max-width: 70ch; font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__table { width: 100%; margin: 12px 0 0; border-collapse: collapse; font: var(--tr-f-body); }
  .m3c__table th { padding: 8px 10px; border-bottom: 1px solid var(--uiowa-color-neutral-175); text-align: left; font: var(--tr-f-small); font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--uiowa-color-neutral-500); }
  .m3c__table td { padding: 10px; border-bottom: 1px solid var(--uiowa-color-neutral-150); vertical-align: top; color: var(--uiowa-color-neutral-700); }
  .m3c__table td:first-child { color: var(--uiowa-color-neutral-900); }
  .m3c__table a { color: inherit; text-decoration: underline; text-underline-offset: .15em; }
  .m3c__table td:last-child { font: var(--tr-f-small); color: var(--uiowa-color-neutral-500); }
  .m3c__cell::before { display: none; content: attr(data-side); }
  @media (max-width: 899px) {
    .m3c__grid { grid-template-columns: minmax(0, 1fr); }
    .m3c__head { display: none; }
    .m3c__cell::before { display: block; margin-bottom: 4px; font-weight: 700; color: var(--uiowa-color-neutral-900); }
  }
`;

export default {
  title: 'Tokens (typography)',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { source: { code: null } },
  },
};

export const ScalesCompared = {
  name: 'Design system research',
  render: () => ({
    setup() {
      const picked = ref('decanter');
      // Medium, the web's hierarchy, shows by default; the toggle adds the other four. Label is one set for every
      // hierarchy, so its three sizes always show.
      const others = ref(false);
      const system = computed(() => SYSTEMS.find((s) => s.key === picked.value));
      const theirs = (s, job) => (s.styles[job] || []).map(([name, px, lineHeight, weight]) => ({
        key: name,
        name,
        spec: `${px}/${lineHeight === null ? '–' : round(lineHeight)} · ${WEIGHT_NAMES[weight]} ${weight} · ${round(px / s.body)}×`,
        style: { fontFamily: s.stack, fontSize: `${px}px`, lineHeight: lineHeight === null ? 'normal' : `${lineHeight}px`, fontWeight: weight },
      }));
      const ours = (job) => UIDS_JOBS[job].flatMap((family) => uidsFamily(family).filter((s) => others.value || family === 'label' || s.size === 'medium'));
      const rows = computed(() => JOBS.map(([job, label]) => ({
        job,
        label,
        theirs: theirs(system.value, job),
        none: system.value.none?.[job] || 'No style for this job.',
        ours: ours(job),
        family: UIDS_JOBS[job].map(familyName).join(' and '),
        face: familyFace(UIDS_JOBS[job][0]),
      })));
      const theirCount = computed(() => Object.values(system.value.styles).flat().length);
      const shownCount = computed(() => rows.value.reduce((n, row) => n + row.ours.length, 0));
      return { css, research: RESEARCH, systems: SYSTEMS, picked, system, others, rows, theirCount, shownCount, uidsCount: UIDS_COUNT, homepages: HOMEPAGE_ROWS };
    },
    template: `
      <div class="m3c">
        <component is="style">{{ css }}</component>
        <div class="m3c__eyebrow">Typography roles</div>
        <h1 class="m3c__title">Design system research</h1>
        <h2 class="m3c__h2">What UIDS is</h2>
        <p class="m3c__lede">
          <b>One formula, picked by format.</b> A piece's format picks its hierarchy, and the hierarchy sets its body size:
          X-Small 12.67px, Small 16px, Medium 19px, Large 24px or X-Large 36px. Medium, for web pages and applications, is
          the default. Every role is a fixed multiple of that body size, in every hierarchy.
        </p>
        <ul class="m3c__list">
          <li>The Headline is 4× the body, once per piece, with 6× and 8× steps for a bigger statement.</li>
          <li>The Subhead is 2×, Subhead 2 and the Eyebrow 1.5×, Body 1× and Small print 0.75×. The gaps between text are multiples too: Related 1.5× and Break 2×.</li>
          <li>The Labels, for controls and captions, are one fixed set in every hierarchy.</li>
          <li>Three faces, each with a job: Special Gothic Condensed for the Headline and Eyebrow, Zilla Slab for the Subhead, and Roboto for the rest.</li>
          <li>One class on a piece or a section switches its hierarchy, such as <code>type-scale--large</code>. The nearest class wins, and a piece uses one hierarchy's roles.</li>
          <li>Where an author picks only a heading level, as in rich text, <code>type-rich-text</code> sets the document outline in that hierarchy: the h1 the Headline, the h2 the Subhead, h3 to h6 Subhead 2 at its emphasis weight, and text in Body.</li>
          <li>The hierarchies are named for formats, from a program to a slide, so one set of tokens serves print and screens.</li>
        </ul>

        <h2 class="m3c__h2">The research</h2>
        <p class="m3c__lede">Each system, what it is, how UIDS is like it, and how it isn't.</p>
        <section v-for="r in research" :key="r.key" class="m3c__research">
          <h3 class="m3c__h3"><a :href="r.url" target="_blank" rel="noopener">{{ r.name }}</a></h3>
          <p class="m3c__lede">{{ r.what }}</p>
          <div class="m3c__likes">
            <div>
              <p class="m3c__likes-head">Like UIDS</p>
              <ul class="m3c__list"><li v-for="t in r.like" :key="t">{{ t }}</li></ul>
            </div>
            <div>
              <p class="m3c__likes-head">Not like UIDS</p>
              <ul class="m3c__list"><li v-for="t in r.unlike" :key="t">{{ t }}</li></ul>
            </div>
          </div>
          <p class="m3c__sources">
            Sources:
            <template v-for="(src, i) in r.sources" :key="src.url"><a :href="src.url" target="_blank" rel="noopener">{{ src.label }}</a><template v-if="i < r.sources.length - 1">, </template></template>.
          </p>
        </section>

        <h2 class="m3c__h2">Twelve systems side by side</h2>
        <p class="m3c__lede">
          Each system is shown in its default context: Stanford Decanter on a desktop at its default base, UCL's
          editorial and functional sets on large screens (one entry each), GitLab's scale at its widest, Material 3's
          one scale, Apple's Large size category, Fluent 2's web ramp, Atlassian's heading and body tokens, GOV.UK's
          large-screen scale, USWDS's default theme sizes, Carbon's expressive set, Radix Themes' nine steps and
          Spectrum 2's desktop scale. The rows pair the styles that do the same job; where a system names sizes rather
          than uses, they pair by size. A dash stands for a line height the system doesn't publish.
        </p>
        <p class="m3c__lede">
          <b>Why the numbers do not line up.</b> Their body text runs 14 to 19px against Medium's 19; their page
          titles about two to three times the body against UIDS's four; their display sizes three to six
          times, where UIDS's steps reach six and eight. UIDS carries three typefaces and sets no tracking; each of the
          others carries one. On a page UIDS adds emphasis by stepping the Headline and density by dropping roles,
          where the others pick a different style per element.
        </p>
        <p class="m3c__lede">
          <b>Working with the other hierarchies.</b> Pick by format, as the Formats page lists: X-Small and Small for
          print documents, Large and X-Large for posters, digital signs and slides; screens stay on Medium. In code a
          template takes its hierarchy with one class, such as <code>.type-scale--small</code>, on the piece or on a
          section of it; the nearest class wins. The comparison opens
          on Medium; the toggle adds the other four. The ratio beside each style is of that system's body size, each
          UIDS multiple names the body size it is measured from, and the badge names the hierarchy the style belongs to.
        </p>
        <div class="m3c__toggles">
          <fieldset class="m3c__pick"><legend>Compare with</legend>
            <label v-for="s in systems" :key="s.key" :class="{ on: picked === s.key }"><input v-model="picked" type="radio" name="m3c-system" :value="s.key"> {{ s.name }}</label>
          </fieldset>
          <label class="m3c__toggle"><input v-model="others" type="checkbox"> Show the other formats: X-Small, Small, Large and X-Large</label>
        </div>
        <p class="m3c__lede m3c__lede--system"><b>Why not {{ system.name }}.</b> {{ system.why }}</p>
        <p class="m3c__note m3c__note--system">{{ system.note }}</p>
        <div class="m3c__grid">
          <div class="m3c__head"><h2>{{ system.name }}</h2><p>{{ system.context }} · {{ system.face }} · body {{ system.body }}px · {{ theirCount }} styles</p></div>
          <div class="m3c__head"><h2>UIDS</h2><p>{{ others ? 'Five hierarchies' : 'The Medium hierarchy' }} · {{ shownCount }} of {{ uidsCount }} styles</p></div>
          <template v-for="row in rows" :key="row.job">
            <section class="m3c__cell" :data-side="system.name">
              <h3 class="m3c__family">{{ row.label }}</h3>
              <template v-if="row.theirs.length">
                <div v-for="s in row.theirs" :key="s.key" class="m3c__entry">
                  <p class="m3c__spec">{{ s.spec }}</p>
                  <p class="m3c__specimen" :style="s.style">{{ s.name }}</p>
                </div>
              </template>
              <p v-else class="m3c__none">{{ row.none }}</p>
            </section>
            <section class="m3c__cell" data-side="UIDS">
              <h3 class="m3c__family">{{ row.family }} · {{ row.face }}</h3>
              <div v-for="s in row.ours" :key="s.key" class="m3c__entry">
                <p class="m3c__spec"><span class="m3c__badge">{{ s.badge }}</span>{{ s.spec }}</p>
                <component :is="row.job === 'eyebrow' ? 'div' : 'p'" :class="['m3c__specimen', { 'm3c__specimen--eyebrow': row.job === 'eyebrow' }]" :style="s.style">{{ s.name }}</component>
              </div>
            </section>
          </template>
        </div>
        <h2 class="m3c__h2">Headline steps on university homepages</h2>
        <p class="m3c__lede">
          <b>Where 6× and 8× show up in the wild.</b> Thirteen university homepages, captured on 2026-10-29 at 1440px,
          each headline divided by the site's general reading size. Heroes mostly run four to six times the body:
          two of the eleven measured reach 6×, and only one reaches 8×, set in viewport units. No section heading
          reaches 6×; the two that come close are a display-word treatment and one feature band. So a hero near 6×
          has company, a section at 6× or 8× does not, and 8× is one site's choice rather than a pattern.
        </p>
        <table class="m3c__table">
          <thead><tr><th>Homepage</th><th>Body</th><th>Hero</th><th>Hero ÷ body</th><th>Section heading</th><th>Section ÷ body</th><th>Note</th></tr></thead>
          <tbody>
            <tr v-for="h in homepages" :key="h.site"><td><a :href="h.url" target="_blank" rel="noopener">{{ h.site }}</a></td><td>{{ h.body }}</td><td>{{ h.hero }}</td><td>{{ h.heroX }}</td><td>{{ h.section }}</td><td>{{ h.sectionX }}</td><td>{{ h.note }}</td></tr>
          </tbody>
        </table>
        <p class="m3c__note">
          Values are from each system's own documentation, read on 2026-11-10: Material 3 from the M3 type scale image
          on developer.android.com (the Compose source differs slightly: Title Large is Regular, Display Large tracks
          -0.2), Apple from the Human Interface Guidelines, Fluent 2 from fluent2.microsoft.design, Atlassian from
          atlassian.design, GOV.UK from its type scale page, USWDS from its font size, line height and settings pages,
          Carbon from its type sets page, Radix from its Themes typography page. The section on systems like UIDS
          also uses, read on 2026-11-18: Carbon's typography overview and type sets pages, Apple's Dynamic Type size
          tables in the Human Interface Guidelines, Radix
          Themes' typography token CSS and Theme docs, Tailwind Typography's styles.js, Bulma's content element and
          size variables, and Every Layout's Modular scale and Units pages. Spectrum 2, read on 2026-11-19: its sizes and weights
          from its token package, @adobe/spectrum-tokens 15.8.0; the base, the 1.125 steps, the line heights and the
          touch switch from its React library, @react-spectrum/s2 1.8.2; the scale attribute from its Web Components'
          theme README, @spectrum-web-components/theme 1.12.6; and what each family is for from its typography
          system page. The benchmarks, read on 2026-11-19: Stanford Decanter's strategies and conventions page, and its
          source, decanter 7.5.3, for the h1's step and the step formula; UCL's typography usage guidelines; and GitLab
          Pajamas' type fundamentals. Their side-by-side styles also use Decanter's theme, base and styles source; UCL's
          typography overview, with body-md's line height and the heading weight measured on UCL's own site; and
          GitLab's tokens, @gitlab/ui 141.1.0, with the body line height measured on gitlab.com. Faces not installed here fall back to the system font; the
          sizes hold. Special Gothic Condensed is Google's Special Gothic at width 75, weight 600. The homepage sizes are
          the survey's desktop captures; TCU could not be measured.
        </p>
      </div>
    `,
  }),
};
