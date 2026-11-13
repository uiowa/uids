// Fills the generated blocks in docs/site from src/tokens and package.json, and
// compiles src/scss/tokens.scss next to the shell. Run with `yarn docs`.
//
// A page marks a block with a pair of comments; everything between them is
// replaced on each run:
//   <!-- generated:accent --> ... <!-- /generated:accent -->

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as sass from 'sass';

const root = new URL('..', import.meta.url).pathname;
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const site = join(root, 'docs/site');

function merge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && !('$value' in value)) {
      target[key] = merge(target[key] ?? {}, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const tree = {};
for (const tier of ['primitives', 'semantic']) {
  const dir = join(root, 'src/tokens', tier);
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    merge(tree, JSON.parse(readFileSync(join(dir, file), 'utf8')));
  }
}

function node(path) {
  const found = path.split('.').reduce((n, key) => n?.[key], tree);
  if (!found) throw new Error(`No token at ${path}`);
  return found;
}

function alias(value) {
  const match = typeof value === 'string' && /^\{(.+)\}$/.exec(value);
  return match ? match[1] : null;
}

function resolve(path) {
  const value = node(path).$value;
  const next = alias(value);
  return next ? resolve(next) : value;
}

// The primitive a semantic token points at.
function source(path) {
  const next = alias(node(path).$value);
  return next ? source(next) : path;
}

const dimension = ({ value, unit }) => `${value}${unit}`;
const cssVar = (path) => `--uiowa-${path.replaceAll('.', '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
const hex = (path) => resolve(path).hex.toUpperCase();
const children = (path) => Object.keys(node(path)).filter((k) => !k.startsWith('$'));
const title = (s) => s.charAt(0).toUpperCase() + s.slice(1).replaceAll('-', ' ');
const fontName = (s) => s.split('-').map(title).join(' ');
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function note(path) {
  const description = node(path).$description;
  return description ? `<p class="tk-note"><span>From the tokens</span> ${escape(description)}</p>` : '';
}

function swatch(path, name) {
  return `<li class="tk-swatch">
  <span class="tk-chip" style="background: var(${cssVar(path)})"></span>
  <b>${escape(name)}</b>
  <span class="tk-hex">${hex(path)}</span>
  <code>${cssVar(path)}</code>
</li>`;
}

function swatches(group, name = (key, path) => title(source(path).split('.').pop())) {
  const items = children(group).map((key) => swatch(`${group}.${key}`, name(key, `${group}.${key}`)));
  return `<ul class="tk-swatches">\n${items.join('\n')}\n</ul>\n${note(group)}`;
}

function status() {
  const items = ['info', 'success', 'warning', 'danger'].map((role) => `<li class="tk-status">
  <b>${title(role)}</b>
  <span class="tk-chip" style="background: var(${cssVar(`color.${role}-surface`)}); border-color: var(${cssVar(`color.${role}`)})"></span>
  <span class="tk-hex">surface ${hex(`color.${role}-surface`)} · edge ${hex(`color.${role}`)}</span>
  <code>${cssVar(`color.${role}`)}</code>
  <code>${cssVar(`color.${role}-surface`)}</code>
</li>`);
  return `<ul class="tk-swatches tk-swatches--status">\n${items.join('\n')}\n</ul>\n${note('color.info')}`;
}

function families() {
  const rows = children('typography.font-family').map((key) => {
    const path = `typography.font-family.${key}`;
    return `<tr><td><span class="tk-specimen" style="font-family: var(${cssVar(path)})">${fontName(key)}</span></td><td><code>${cssVar(path)}</code></td></tr>`;
  });
  return `<div class="tablewrap"><table class="ref">
<thead><tr><th>Family</th><th>Token</th></tr></thead>
<tbody>
${rows.join('\n')}
</tbody>
</table></div>`;
}

const REM_IN_PIXELS = 16;
const num = (n) => String(Number(n.toFixed(4)));
const rem = (n) => `${num(n)}rem`;
const px = (n) => `${num(n * REM_IN_PIXELS)}px`;
const inPixels = ({ value, unit }) => (unit === 'rem' ? value * REM_IN_PIXELS : value);

// A type style is one composite token (the heading, intro and body styles) or a
// group of member tokens (body and the roles). Returns the path a member aliases.
function member(path, key) {
  const style = node(path);
  const value = '$value' in style ? style.$value[key] : style[key]?.$value;
  const next = alias(value);
  if (!next) throw new Error(`${path}.${key} is not an alias`);
  return next;
}

// The factor a multiplied size applies to the size it starts from.
function multiplier(path) {
  const by = node(path).$extensions?.['edu.uiowa.multiply']?.by;
  if (by === undefined) return 1;
  return typeof by === 'number' ? by : resolve(alias(by));
}

const specimenStyle = (prefix) => ['font-family', 'font-weight', 'font-size', 'line-height']
  .map((property) => `${property}: var(${prefix}-${property})`)
  .join('; ');

const table = (className, head, rows) => `<div class="tablewrap"><table class="ref${className ? ` ${className}` : ''}">
<thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
<tbody>
${rows.join('\n')}
</tbody>
</table></div>`;

function styles() {
  const styles = [
    ...children('typography.heading').map((key) => [`typography.heading.${key}`, key.toUpperCase()]),
    ['typography.intro-bold', 'Intro bold'],
    ['typography.intro-light', 'Intro light'],
    ['typography.body', 'Body'],
  ];
  const rows = styles.map(([path, name]) => {
    const prefix = cssVar(path);
    const family = source(member(path, 'fontFamily')).split('.').pop();
    return `<tr>
  <td><span class="tk-specimen" style="${specimenStyle(prefix)}">${name}</span></td>
  <td>${fontName(family)} ${resolve(member(path, 'fontWeight'))}</td>
  <td>${dimension(resolve(member(path, 'fontSize')))}</td>
  <td>${resolve(member(path, 'lineHeight'))}</td>
  <td><code>${prefix}-*</code></td>
</tr>`;
  });
  return `${table('tk-roles', ['Style', 'Family and weight', 'Smallest size', 'Line height', 'Tokens'], rows)}
${note('typography.heading')}`;
}

const readingSize = () => resolve('typography.base.fontSize').value;

function reading() {
  const base = readingSize();
  const rows = [`<tr>
  <td><span class="tk-specimen" style="${specimenStyle(cssVar('typography.body.medium'))}">Reading size</span></td>
  <td>${rem(base)} · ${px(base)}</td>
  <td><code>${cssVar('typography.base.fontSize')}</code></td>
</tr>`];
  return `${table('tk-roles', ['Body Medium', 'Size', 'Token'], rows)}
${note('typography.base')}`;
}

const ROLE_FAMILIES = ['headline', 'eyebrow', 'subhead', 'subhead-2', 'body', 'label'];
const ROLE_SIZES = ['large', 'medium', 'small'];

function roles() {
  const base = readingSize();
  return ROLE_FAMILIES.map((family) => {
    const rows = ROLE_SIZES.map((size) => {
      const path = `typography.${family}.${size}`;
      const prefix = cssVar(path);
      const by = multiplier(`${path}.fontSize`);
      const face = source(member(path, 'fontFamily')).split('.').pop();
      return `<tr class="tk-specimen-row"><td colspan="5"><span class="tk-specimen" style="${specimenStyle(prefix)}">${title(size)}</span></td></tr>
<tr>
  <td>${fontName(face)} ${resolve(member(path, 'fontWeight'))}</td>
  <td>${num(by)}×</td>
  <td>${rem(base * by)} · ${px(base * by)}</td>
  <td>${resolve(member(path, 'lineHeight'))}</td>
  <td><code>${prefix}-*</code></td>
</tr>`;
    });
    return `<h3 id="role-${family}">${title(family)}</h3>
${note(`typography.${family}`)}
${table('tk-roles tk-roles--stacked', ['Family and weight', 'Of reading size', 'Size', 'Line height', 'Tokens'], rows)}`;
  }).join('\n');
}

function textSpaces() {
  const base = readingSize();
  const rows = children('typography.space').map((key) => {
    const path = `typography.space.${key}`;
    const by = multiplier(path);
    return `<tr>
  <td>${title(key)}</td>
  <td>${num(by)}×</td>
  <td>${rem(base * by)} · ${px(base * by)}</td>
  <td>${escape(node(path).$description ?? '')}</td>
  <td><code>${cssVar(path)}</code></td>
</tr>`;
  });
  return `${table('', ['Space', 'Of reading size', 'Size', 'Use', 'Token'], rows)}
${note('typography.space')}`;
}

// The layout tokens that alias each step of the space scale.
function spaceUsers() {
  const users = {};
  const add = (path, label) => (users[source(path)] ??= []).push(label);
  for (const key of children('layout.space')) add(`layout.space.${key}`, title(key));
  for (const tier of children('layout.digital')) {
    for (const key of ['margin', 'gutter']) add(`layout.digital.${tier}.${key}`, `${title(tier)} ${key}`);
  }
  return users;
}

function spaces() {
  const users = spaceUsers();
  const steps = children('space').sort((a, b) => Number(a) - Number(b));
  const rows = steps.map((key) => {
    const path = `space.${key}`;
    const { value } = resolve(path);
    return `<tr>
  <td>${key}</td>
  <td><span class="tk-bar" style="width: var(${cssVar(path)})"></span></td>
  <td>${rem(value)} · ${px(value)}</td>
  <td>${(users[path] ?? []).join(', ')}</td>
  <td><code>${cssVar(path)}</code></td>
</tr>`;
  });
  return `${table('tk-spaces', ['Step', '', 'Size', 'Used by', 'Token'], rows)}
${note('space')}`;
}

function spacing() {
  const rows = children('layout.space').map((key) => {
    const path = `layout.space.${key}`;
    const { value } = resolve(path);
    return `<tr>
  <td>${title(key)}</td>
  <td><span class="tk-bar" style="width: var(${cssVar(path)})"></span></td>
  <td>${rem(value)} · ${px(value)}</td>
  <td>Space ${source(path).split('.').pop()}</td>
  <td><code>${cssVar(path)}</code></td>
</tr>`;
  });
  return `${table('tk-spaces', ['Role', '', 'Size', 'From', 'Token'], rows)}
${note('layout.space')}`;
}

// The window width each tier starts at (src/tokens/README.md, Layout tiers).
const TIER_START = { small: null, medium: 'breakpoint.768', large: 'breakpoint.980' };

function tiers() {
  const size = (path) => {
    const { value } = resolve(path);
    return `${rem(value)} · ${px(value)}`;
  };
  const rows = children('layout.digital').map((tier) => {
    const path = `layout.digital.${tier}`;
    const start = TIER_START[tier];
    return `<tr>
  <td>${title(tier)}</td>
  <td>${start ? `${inPixels(resolve(start))}px` : 'Any width'}</td>
  <td>${resolve(`${path}.columns`)}</td>
  <td>${size(`${path}.margin`)}</td>
  <td>${size(`${path}.gutter`)}</td>
  <td>${size(`${path}.padding`)}</td>
  <td>${resolve(`${path}.reading`)} columns</td>
  <td><code>${cssVar(path)}-*</code></td>
</tr>`;
  });
  return `${table('', ['Tier', 'Starts at', 'Columns', 'Margin', 'Gutter', 'Padding', 'Reading width', 'Tokens'], rows)}
${note('layout.digital')}`;
}

function containers() {
  const rows = children('layout.container.max').map((key) => {
    const path = `layout.container.max.${key}`;
    const { value } = resolve(path);
    return `<tr>
  <td>${title(key)}</td>
  <td>${rem(value)} · ${px(value)}</td>
  <td><code>${cssVar(path)}</code></td>
</tr>`;
  });
  return `${table('', ['Width', 'Size', 'Token'], rows)}
${note('layout.container.max')}`;
}

// Snippets name the version in package.json, which is the next release, so their
// URLs do not resolve until that release is published.
const hosted = `https://uids.brand.uiowa.edu/docs/v${version}/dist/css`;

function hostedCss() {
  return `<pre><code>&lt;!-- Everything --&gt;
&lt;link rel="stylesheet" href="${hosted}/uids.css"&gt;

&lt;!-- Or the core styles plus the components you use --&gt;
&lt;link rel="stylesheet" href="${hosted}/uids-core.css"&gt;
&lt;link rel="stylesheet" href="${hosted}/components/button.css"&gt;</code></pre>`;
}

function install() {
  return `<pre><code>"dependencies": {
  "@uiowa/uids": "https://github.com/uiowa/uids/releases/download/v${version}/uids-${version}.tgz"
}</code></pre>`;
}

const inline = new Set(['version']);
const blocks = {
  version: () => version,
  hosted: hostedCss,
  install,
  primary: () => swatches('color.brand'),
  neutral: () => swatches('color.neutral', (key) => `Neutral ${key}`),
  accent: () => swatches('color.accent'),
  data: () => swatches('color.data-visualization.categorical', (key, path) => `${key.padStart(2, '0')} ${title(source(path).split('.').pop())}`),
  status,
  families,
  styles,
  reading,
  roles,
  'text-spaces': textSpaces,
  spaces,
  spacing,
  tiers,
  containers,
};

writeFileSync(join(site, 'styles/uids-tokens.css'), sass.compile(join(root, 'src/scss/tokens.scss')).css);

for (const file of readdirSync(site).filter((f) => f.endsWith('.html'))) {
  const path = join(site, file);
  const before = readFileSync(path, 'utf8');
  const after = before.replace(
    /(<!-- generated:([a-z-]+) -->)[\s\S]*?(<!-- \/generated:\2 -->)/g,
    (_, open, name, close) => {
      if (!blocks[name]) throw new Error(`${file}: unknown block generated:${name}`);
      const gap = inline.has(name) ? '' : '\n';
      return `${open}${gap}${blocks[name]()}${gap}${close}`;
    },
  );
  if (after !== before) {
    writeFileSync(path, after);
    console.log(`Updated ${file}`);
  }
}
