// Writes the typography as plain text, for readers that can't run the docs site, such as a web chat: an llms.txt
// (https://llmstxt.org) and the page it links to. Both come from dist/typography-roles.json and the classes the token
// build writes to src/scss/abstracts/_type-roles-generated.scss, so run this after the token build. Storybook
// publishes dist/llms at the site root.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const { version } = readJson('package.json');
// The docs build sets BASE_URL to the folder it publishes to: /latest/, /branches/<branch>/ or /docs/<tag>/.
const site = new URL(process.env.BASE_URL ?? '/', 'https://uids.brand.uiowa.edu');
const pageUrl = new URL('typography.md', site);

// The keys are typography.<role>.<hierarchy or size> and typography.space.<gap>.<hierarchy>.
const styles = {};
const gaps = {};
for (const [key, entry] of Object.entries(readJson('dist/typography-roles.json'))) {
  const [, group, member, hierarchy] = key.split('.');
  if (key.startsWith('$') || group === 'highlight') continue;
  if (group === 'space') (gaps[member] ??= {})[hierarchy] = entry;
  else (styles[group] ??= {})[member] = entry;
}
// Every class and custom property the page names must be one UIDS writes, so a renamed role or hierarchy fails here,
// not in a reader's CSS: the hierarchy and role classes come from the maps the token build writes, the Label classes
// and the default hierarchy from base/_type-roles.scss.
const generatedMaps = readFileSync(new URL('src/scss/abstracts/_type-roles-generated.scss', root), 'utf8');
const roleClassesScss = readFileSync(new URL('src/scss/base/_type-roles.scss', root), 'utf8');
const mapKeys = (name) => {
  const rest = generatedMaps.slice(generatedMaps.indexOf(`$${name}: (`));
  return [...rest.slice(0, rest.indexOf('\n);')).matchAll(/^ {2}'([\w-]+)': \(/gm)].map((match) => match[1]);
};
const labelSizes = /@each \$size in \(([^)]*)\)\s*\{\s*\.type-label--#\{\$size\}/.exec(roleClassesScss)?.[1].match(/[\w-]+/g) ?? [];
const classes = new Set([
  ...mapKeys('type-scales').map((scale) => `type-scale--${scale}`),
  ...mapKeys('type-roles').map((role) => `type-${role}`),
  ...labelSizes.map((labelSize) => `type-label--${labelSize}`),
]);
const defaultScale = /@if \$scale == '([\w-]+)'/.exec(roleClassesScss)?.[1];

// Each body size names a hierarchy. A role with a style in every hierarchy is listed in the order it reads on a
// piece; a role without, the Labels, is one set for every hierarchy.
const ROLE_ORDER = ['eyebrow', 'headline', 'headline-6x', 'headline-8x', 'subhead', 'subhead-2', 'body', 'small-print'];
const hierarchies = Object.keys(styles.body);
const rank = (role) => (ROLE_ORDER.includes(role) ? ROLE_ORDER.indexOf(role) : ROLE_ORDER.length);
const scaled = Object.keys(styles).filter((role) => hierarchies.every((hierarchy) => styles[role][hierarchy]))
  .sort((a, b) => rank(a) - rank(b));
const sets = Object.keys(styles).filter((role) => !scaled.includes(role));

const capitalize = (text) => text[0].toUpperCase() + text.slice(1);
const hierarchyName = (hierarchy) => hierarchy.split('-').map(capitalize).join('-');
const roleName = (role) => capitalize(role.replaceAll('-', ' ')).replace(/(\d)x$/, '$1×');
const number = (value) => String(Number(value.toFixed(2)));
const size = ({ px, pt }) => `${number(px)}px (${number(pt)}pt)`;
const formats = (hierarchy) => styles.body[hierarchy].description
  .replace(/^The .+? hierarchy's body size: /, '').replace(/\.$/, '');
// A description that opens with the style's own name, such as "Small print: credits…", drops it.
const use = (name, description) => capitalize(description.replace(new RegExp(`^${name}: `, 'i'), ''));
const code = (text) => `\`${text}\``;
function cssClass(name) {
  if (!classes.has(name)) throw new Error(`.${name} is not a class UIDS writes`);
  return name;
}
function gapProperty(gap) {
  const name = `--uiowa-type-space-${gap}`;
  if (!generatedMaps.includes(`'${name}'`)) throw new Error(`${name} is not set by the hierarchy classes`);
  return name;
}

function styleTable(rows) {
  const cells = ([name, style, className]) => [
    name,
    code(cssClass(className)),
    style.fontFamily,
    style.fontWeightEmphasis ? `${style.fontWeight}, emphasis ${style.fontWeightEmphasis}` : style.fontWeight,
    size(style.fontSize),
    `${style.lineHeight} (${number(style.fontSize.px * style.lineHeight)}px, ${number(style.fontSize.pt * style.lineHeight)}pt)`,
    style.letterSpacing.value === 0 ? '0' : `${style.letterSpacing.value}${style.letterSpacing.unit}`,
  ];
  return [
    '| Style | Class | Font | Weight | Size | Line height | Letter spacing |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...rows.map((row) => `| ${cells(row).join(' | ')} |`),
  ].join('\n');
}
const emphasized = Object.keys(styles).filter((role) => Object.values(styles[role]).some((style) => style.fontWeightEmphasis));

// UIDS's CSS loads no typefaces, so the page gives one Google Fonts link with every face and weight the styles use.
// Special Gothic Condensed is Google's Special Gothic at width 75; this is the only way the page offers to load it.
const GOOGLE_FACES = { 'Special Gothic Condensed': { family: 'Special Gothic', width: 75 } };
const weightsByFace = new Map();
for (const style of Object.values(styles).flatMap((byMember) => Object.values(byMember))) {
  const weights = weightsByFace.get(style.fontFamily) ?? new Set();
  [style.fontWeight, style.fontWeightEmphasis].filter(Boolean).forEach((weight) => weights.add(Number(weight)));
  weightsByFace.set(style.fontFamily, weights);
}
const faces = [...weightsByFace].sort(([a], [b]) => a.localeCompare(b))
  .map(([face, weights]) => ({ face, weights: [...weights].sort((a, b) => a - b), google: GOOGLE_FACES[face] }));
const fontsUrl = `https://fonts.googleapis.com/css2?${faces.map(({ face, weights, google }) => {
  const family = (google?.family ?? face).replaceAll(' ', '+');
  return google ? `family=${family}:wdth,wght@${weights.map((weight) => `${google.width},${weight}`).join(';')}`
    : `family=${family}:wght@${weights.join(';')}`;
}).join('&')}&display=swap`;
const list = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0]);

const hierarchyList = `${hierarchies.slice(0, -1).map(hierarchyName).join(', ')} or ${hierarchyName(hierarchies.at(-1))}`;
const sameEverywhere = (role) => new Set(Object.values(styles[role]).map((style) => style.description)).size === 1;

const page = [
  '# UIDS typography',
  `The type styles of UIDS, the University of Iowa Design System, with every size worked out. Generated from the design tokens of UIDS ${version} by \`yarn build:tokens\`; don't edit it by hand.`,
  '## How to use it',
  [
    `1. Find the piece's format under Formats. Its row names the piece's hierarchy: ${hierarchyList}.`,
    '2. Use that hierarchy\'s styles together, from its section below. Don\'t mix styles from two hierarchies in one piece.',
    `3. ${sets.map((role) => `The ${roleName(role)} styles are`).join(' and ')} one set for every hierarchy.`,
    `4. In CSS, use UIDS's classes rather than the numbers: the hierarchy's class on the piece, and each style's class, from the Class column, on its text. ${defaultScale ? `${hierarchyName(defaultScale)} is the default, so its pieces need no hierarchy class. ` : ''}An ${hierarchyName(hierarchies[0])} piece, for example, is ${code(`class="${cssClass(`type-scale--${hierarchies[0]}`)}"`)} and its headline ${code(`class="${cssClass('type-headline')}"`)}.${emphasized.map((role) => ` In ${roleName(role)}, \`strong\` or \`b\` takes its emphasis weight.`).join('')} UIDS's stylesheets uids.css and uids-core.css have the classes.`,
  ].join('\n'),
  'Sizes are in px, at a 16px root, and in pt (1pt = 4/3px). A line height is a multiple of the font size; the px and pt after it are the same height.',
  '## Fonts',
  [
    `UIDS's CSS does not load the typefaces. Load ${list(faces.map(({ face }) => face))} from Google Fonts with this link, which has every weight the styles use: ${fontsUrl}`,
    ...faces.filter(({ google }) => google).map(({ face, weights, google }) => `${face} is Google's ${google.family} at width ${google.width}, weight ${list(weights.map(String))}.`),
  ].join('\n\n'),
  '## Formats',
  [
    '| Hierarchy | Body size | Formats |',
    '| --- | --- | --- |',
    ...hierarchies.map((hierarchy) => `| ${hierarchyName(hierarchy)} | ${size(styles.body[hierarchy].fontSize)} | ${capitalize(formats(hierarchy))} |`),
  ].join('\n'),
  '## What each style is for',
  [
    ...scaled.filter(sameEverywhere).map((role) => `- ${roleName(role)}: ${use(roleName(role), styles[role][hierarchies[0]].description)}`),
    ...Object.entries(gaps).map(([gap, byHierarchy]) => `- ${capitalize(gap)} space: ${byHierarchy[hierarchies[0]].description}`),
  ].join('\n'),
  ...hierarchies.flatMap((hierarchy) => [
    `## ${hierarchyName(hierarchy)} hierarchy`,
    `For ${formats(hierarchy)}. Body size ${size(styles.body[hierarchy].fontSize)}. Hierarchy class ${code(cssClass(`type-scale--${hierarchy}`))}${hierarchy === defaultScale ? ', the default, which a piece doesn\'t need' : ''}.`,
    styleTable(scaled.map((role) => [roleName(role), styles[role][hierarchy], `type-${role}`])),
    `Space between text: ${Object.entries(gaps).map(([gap, byHierarchy]) => `${gap} ${size(byHierarchy[hierarchy])}`).join('; ')}. The hierarchy class sets them as ${list(Object.keys(gaps).map((gap) => code(gapProperty(gap))))}.`,
  ]),
  ...sets.flatMap((role) => [
    `## ${roleName(role)}`,
    Object.values(styles[role])[0].description,
    styleTable(Object.entries(styles[role]).map(([member, style]) => [`${roleName(role)} ${hierarchyName(member)}`, style, `type-${role}--${member}`])),
  ]),
];

const llms = [
  '# University of Iowa Design System (UIDS)',
  `> A design system for the University of Iowa. Its docs site, ${new URL('/', site)}, is a Storybook app that needs JavaScript; the page below is plain text, generated from the same design tokens.`,
  '## Typography',
  `- [UIDS typography](${pageUrl}): the hierarchy each format takes (${hierarchyList}), and each hierarchy's type styles in px and pt, with their CSS classes.`,
];

const out = new URL('dist/llms/', root);
mkdirSync(out, { recursive: true });
writeFileSync(new URL('typography.md', out), `${page.join('\n\n')}\n`);
writeFileSync(new URL('llms.txt', out), `${llms.join('\n\n')}\n`);
console.log('dist/llms/llms.txt and typography.md, linking to', pageUrl.href);
