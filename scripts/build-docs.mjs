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
const cssVar = (path) => `--uiowa-${path.replaceAll('.', '-')}`;
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

function roles() {
  const styles = [
    ...children('typography.heading').map((key) => [`typography.heading.${key}`, key.toUpperCase()]),
    ['typography.intro-bold', 'Intro bold'],
    ['typography.intro-light', 'Intro light'],
    ['typography.body', 'Body'],
  ];
  const rows = styles.map(([path, name]) => {
    const parts = node(path).$value;
    const prefix = cssVar(path);
    const family = source(alias(parts.fontFamily)).split('.').pop();
    const style = ['font-family', 'font-weight', 'font-size', 'line-height']
      .map((property) => `${property}: var(${prefix}-${property})`)
      .join('; ');
    return `<tr>
  <td><span class="tk-specimen" style="${style}">${name}</span></td>
  <td>${fontName(family)} ${resolve(alias(parts.fontWeight))}</td>
  <td>${dimension(resolve(alias(parts.fontSize)))}</td>
  <td>${resolve(alias(parts.lineHeight))}</td>
  <td><code>${prefix}-*</code></td>
</tr>`;
  });
  return `<div class="tablewrap"><table class="ref tk-roles">
<thead><tr><th>Style</th><th>Family and weight</th><th>Smallest size</th><th>Line height</th><th>Tokens</th></tr></thead>
<tbody>
${rows.join('\n')}
</tbody>
</table></div>
${note('typography.heading')}`;
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
  roles,
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
