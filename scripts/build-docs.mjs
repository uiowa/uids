// Fills the token-driven blocks in docs/site from src/tokens and copies the
// built dist/tokens.css next to the shell. Run with `yarn docs`.
//
// A page marks a block with a pair of comments; everything between them is
// replaced on each run:
//   <!-- tokens:accent --> ... <!-- /tokens:accent -->

import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
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

const blocks = {
  primary: () => swatches('color.brand'),
  neutral: () => swatches('color.neutral', (key) => `Neutral ${key}`),
  accent: () => swatches('color.accent'),
  data: () => swatches('color.data-visualization.categorical', (key, path) => `${key.padStart(2, '0')} ${title(source(path).split('.').pop())}`),
  status,
  families,
  roles,
};

copyFileSync(join(root, 'dist/tokens.css'), join(site, 'styles/uids-tokens.css'));

for (const file of readdirSync(site).filter((f) => f.endsWith('.html'))) {
  const path = join(site, file);
  const before = readFileSync(path, 'utf8');
  const after = before.replace(
    /(<!-- tokens:([a-z-]+) -->)[\s\S]*?(<!-- \/tokens:\2 -->)/g,
    (_, open, name, close) => {
      if (!blocks[name]) throw new Error(`${file}: unknown block tokens:${name}`);
      return `${open}\n${blocks[name]()}\n${close}`;
    },
  );
  if (after !== before) {
    writeFileSync(path, after);
    console.log(`Updated ${file}`);
  }
}
