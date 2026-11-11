// Assembles dist/claude/ as the project/ folder of the UIDS Claude Design System
// artifact. Run after `yarn build`, which writes dist/uids.css and dist/claude/tokens.json.

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(repository, 'dist/claude');
const TITLE = 'UIDS';

const git = (...args) => execFileSync('git', args, { cwd: repository, encoding: 'utf8' }).trim();

function declarations(tokens, value = (token) => token.value) {
  return tokens.map((token) => `  --${token.name}: ${value(token)};`).join('\n');
}

const alias = (value) => String(value).replace(/^\{(.+)\}$/, 'var(--$1)');

// Must match the layout the artifact page uses when it compiles tokens.json.
export function tokensCss(tokens) {
  const others = Object.entries(tokens)
    .filter(([key, family]) => !['color', 'shadow'].includes(key) && Array.isArray(family?.tokens))
    .flatMap(([, family]) => family.tokens);
  const fonts = Object.entries(tokens.type.families).map(([key, stack]) => `  --font-${key}: ${stack};`);
  const styles = tokens.type.groups.flatMap((group) => group.styles.map((style) => [
    `.${style.name} {`,
    `  font-family: var(--font-${style.family ?? group.family});`,
    `  font-size: ${style.fontSize};`,
    `  font-weight: ${style.fontWeight};`,
    `  line-height: ${style.lineHeight};`,
    `  letter-spacing: ${style.letterSpacing};`,
    '}',
  ].join('\n')));

  return [
    `/* ${TITLE} — generated from tokens.json */`,
    `:root, [data-theme="${tokens.color.themes[0].id}"] {`,
    declarations(tokens.color.tokens, (token) => alias(token.value)),
    declarations(tokens.shadow.tokens),
    '}',
    ':root {',
    declarations(others),
    fonts.join('\n'),
    '}',
    ...styles,
    '',
  ].join('\n');
}

function build() {
  const tokensPath = join(output, 'tokens.json');
  const tokens = JSON.parse(readFileSync(tokensPath, 'utf8'));
  const { version } = JSON.parse(readFileSync(join(repository, 'package.json'), 'utf8'));
  tokens.meta = {
    source: 'github',
    repo: 'uiowa/uids',
    ref: `${git('rev-parse', '--abbrev-ref', 'HEAD')}@${git('rev-parse', '--short', 'HEAD')}`,
    version,
    paths: { tokens: ['src/tokens'], docs: ['src/claude'] },
  };
  writeFileSync(tokensPath, `${JSON.stringify(tokens, null, 2)}\n`);
  writeFileSync(join(output, 'tokens.css'), tokensCss(tokens));

  mkdirSync(join(output, 'components/Cover'), { recursive: true });
  cpSync(join(repository, 'dist/uids.css'), join(output, 'components/bundle.css'));
  cpSync(join(repository, 'src/claude/README.md'), join(output, 'README.md'));
  cpSync(join(repository, 'src/claude/Cover/preview.html'), join(output, 'components/Cover/preview.html'));

  const images = join(repository, 'dist/images');
  if (existsSync(images)) {
    cpSync(images, join(output, 'components/images'), { recursive: true });
  } else {
    console.warn('dist/images/ is missing, so the pattern backgrounds in bundle.css will not load.');
  }

  console.log(`dist/claude/ built from ${tokens.meta.ref} (v${version}).`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) build();
