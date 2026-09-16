import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const repository = join(dirname(fileURLToPath(import.meta.url)), '..');

const dimension = (value, unit = 'rem') => ({ value, unit });
const color = (hex, components) => ({ colorSpace: 'srgb', components, hex });

function sourceTokens() {
  return {
    primitives: {
      'tokens.json': {
        color: {
          $type: 'color',
          brand: { $value: color('#00558C', [0, 0.3333, 0.549]) },
        },
        space: {
          $type: 'dimension',
          100: { $value: dimension(1) },
        },
        typography: {
          'font-family': { $type: 'fontFamily', sans: { $value: ['Roboto', 'sans-serif'] } },
          'font-weight': { $type: 'fontWeight', regular: { $value: 400 } },
          'font-size': { $type: 'dimension', 100: { $value: dimension(1) }, 200: { $value: dimension(2) } },
          'letter-spacing': { $type: 'dimension', normal: { $value: dimension(0) } },
          'line-height': { $type: 'number', 100: { $value: 1 } },
        },
      },
    },
    semantic: {
      'tokens.json': {
        color: {
          $type: 'color',
          text: { default: { $value: '{color.brand}' } },
        },
        typography: {
          heading: {
            $extensions: {
              'edu.uiowa.fluid': {
                minViewport: dimension(320, 'px'),
                maxViewport: dimension(1280, 'px'),
                max: '{typography.font-size.200}',
              },
            },
            h1: {
              $type: 'typography',
              $value: {
                fontFamily: '{typography.font-family.sans}',
                fontWeight: '{typography.font-weight.regular}',
                fontSize: '{typography.font-size.100}',
                letterSpacing: '{typography.letter-spacing.normal}',
                lineHeight: '{typography.line-height.100}',
              },
            },
          },
        },
      },
    },
  };
}

function fixture(tokens = sourceTokens()) {
  const root = mkdtempSync(join(tmpdir(), 'uids-tokens-'));
  mkdirSync(join(root, 'scripts'), { recursive: true });
  mkdirSync(join(root, 'src', 'scss', 'abstracts'), { recursive: true });
  cpSync(join(repository, 'scripts', 'build-tokens.mjs'), join(root, 'scripts', 'build-tokens.mjs'), { recursive: false });
  for (const [tier, files] of Object.entries(tokens)) {
    const directory = join(root, 'src', 'tokens', tier);
    mkdirSync(directory, { recursive: true });
    for (const [file, data] of Object.entries(files)) {
      writeFileSync(join(directory, file), `${JSON.stringify(data, null, 2)}\n`);
    }
  }
  return root;
}

function run(root, ...args) {
  try {
    return execFileSync(process.execPath, [join(root, 'scripts', 'build-tokens.mjs'), ...args], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (error) {
    throw new Error(error.stderr || error.message);
  }
}

function withFixture(callback, tokens) {
  const root = fixture(tokens);
  try {
    callback(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('generates primitive, semantic, reference, and fluid typography custom properties', () => {
  withFixture((root) => {
    run(root);
    const output = readFileSync(join(root, 'src/scss/abstracts/_tokens-generated.scss'), 'utf8');

    assert.match(output, /--uiowa-color-brand: #00558C;/);
    assert.match(output, /--uiowa-color-text-default: var\(--uiowa-color-brand\);/);
    assert.match(output, /--uiowa-typography-heading-h1-font-size: clamp\(1rem, calc\(1\.6667vw \+ 0\.6667rem\), 2rem\);/);
    assert.match(run(root, '--check'), /tokens up to date/);
  });
});

test('rejects unresolved references', () => {
  const tokens = sourceTokens();
  tokens.semantic['tokens.json'].color.text.default.$value = '{color.missing}';
  withFixture((root) => {
    assert.throws(() => run(root), /unresolved ref: color\.missing/);
  }, tokens);
});

test('rejects a token with no resolved type', () => {
  const tokens = sourceTokens();
  tokens.primitives['tokens.json'].untypeable = { token: { $value: dimension(1) } };
  withFixture((root) => {
    assert.throws(() => run(root), /missing \$type: untypeable\.token/);
  }, tokens);
});

test('rejects references whose resolved type differs from the token type', () => {
  const tokens = sourceTokens();
  tokens.primitives['tokens.json'].space[100] = { $type: 'dimension', $value: '{color.brand}' };
  withFixture((root) => {
    assert.throws(() => run(root), /type mismatch: space\.100 \(dimension\) references color\.brand \(color\)/);
  }, tokens);
});

test('rejects invalid fluid typography bounds', () => {
  const tokens = sourceTokens();
  tokens.semantic['tokens.json'].typography.heading.$extensions['edu.uiowa.fluid'].maxViewport = dimension(320, 'px');
  withFixture((root) => {
    assert.throws(() => run(root), /fluid maxViewport must exceed minViewport/);
  }, tokens);
});
