// @vitest-environment node

import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { describe, expect, it } from 'vitest';
import config, { breakpointRem, fluidFontSize, variantSelector } from '../style-dictionary.config.js';

const repository = join(dirname(fileURLToPath(import.meta.url)), '..');

const fluid = {
  minViewport: { value: 600, unit: 'px' },
  maxViewport: { value: 1310, unit: 'px' },
  max: { value: 2.2, unit: 'rem' },
};

function literalColors(node, inheritedType, path = []) {
  const type = node.$type ?? inheritedType;

  if (Object.hasOwn(node, '$value')) {
    return type === 'color' && typeof node.$value === 'object'
      ? [{ name: path.join('.'), value: node.$value }]
      : [];
  }

  return Object.entries(node).flatMap(([name, child]) => (
    !name.startsWith('$') && child && typeof child === 'object'
      ? literalColors(child, type, [...path, name])
      : []
  ));
}

function hexFromSrgb(components) {
  return `#${components.map((component) => (
    Math.round(component * 255).toString(16).padStart(2, '0')
  )).join('')}`.toUpperCase();
}

// These unit tests describe the custom behavior that Style Dictionary does not
// provide: converting UIDS fluid typography metadata into a CSS clamp value.
describe('fluidFontSize', () => {
  it('creates a clamp value from explicit fluid metadata', () => {
    expect(fluidFontSize({
      $value: '1.6rem',
      $extensions: { 'edu.uiowa.fluid': fluid },
    })).toBe('clamp(1.6rem, calc(1.3521vw + 1.093rem), 2.2rem)');
  });

  it('derives an exponential maximum from the declared minimum', () => {
    expect(fluidFontSize({
      $value: '2.3rem',
      $extensions: {
        'edu.uiowa.fluid': {
          minViewport: { value: 600, unit: 'px' },
          maxViewport: { value: 1310, unit: 'px' },
          strategy: 'exponential',
          exponent: 1.34,
        },
      },
    })).toBe('clamp(2.3rem, calc(1.6967vw + 1.6637rem), 3.0529rem)');
  });

  it('rejects invalid viewport bounds', () => {
    expect(() => fluidFontSize({
      $value: '1rem',
      $extensions: {
        'edu.uiowa.fluid': {
          ...fluid,
          maxViewport: { value: 600, unit: 'px' },
        },
      },
    })).toThrow('edu.uiowa.fluid.maxViewport must exceed minViewport');
  });

  it('accepts rem viewport bounds, converting them to px', () => {
    // 37.5rem and 81.875rem are the rem equivalents of 600px and 1310px, so the
    // clamp must match the px case above exactly.
    expect(fluidFontSize({
      $value: '1.6rem',
      $extensions: {
        'edu.uiowa.fluid': {
          ...fluid,
          minViewport: { value: 37.5, unit: 'rem' },
          maxViewport: { value: 81.875, unit: 'rem' },
        },
      },
    })).toBe('clamp(1.6rem, calc(1.3521vw + 1.093rem), 2.2rem)');
  });

  it('rejects a viewport bound that is neither px nor rem', () => {
    expect(() => fluidFontSize({
      $value: '1.6rem',
      $extensions: {
        'edu.uiowa.fluid': {
          ...fluid,
          minViewport: { value: 600, unit: 'em' },
        },
      },
    })).toThrow('edu.uiowa.fluid.minViewport must be a px or rem dimension');
  });
});

// DTCG requires components for an sRGB value and permits a hex fallback. Style
// Dictionary uses the components, so this test prevents the readable fallback from
// drifting away from the value emitted to CSS.
it('keeps sRGB hex fallbacks consistent with their components', () => {
  const tokenRoot = join(repository, 'src/tokens');
  const tokenFiles = readdirSync(tokenRoot, { recursive: true })
    .filter((file) => file.endsWith('.json'));

  for (const file of tokenFiles) {
    const source = JSON.parse(readFileSync(join(tokenRoot, file), 'utf8'));

    for (const token of literalColors(source)) {
      if (token.value.colorSpace !== 'srgb') continue;

      const context = `${file}: ${token.name}`;
      expect(token.value.hex, `${context} must include a hex fallback`).toMatch(/^#[0-9A-F]{6}$/i);
      expect(token.value.hex.toUpperCase(), `${context} hex must match components`)
        .toBe(hexFromSrgb(token.value.components));
    }
  }
});

// This build-output test checks four conventions: full-path primitive names,
// expanded and transformed typography properties, references emitted as var(), and
// the absence of the former shortened typography name.
it('emits canonical names, fluid typography, and token references', () => {
  const output = readFileSync(join(repository, 'src/scss/abstracts/_tokens-generated.scss'), 'utf8');

  expect(output).toContain('--uiowa-typography-font-size-120: 1.2rem;');
  expect(output).toContain('--uiowa-typography-heading-h1-font-size: clamp(2.3rem, calc(1.6967vw + 1.6637rem), 3.0529rem);');
  // A standalone fluid font-size token, outside a typography composite.
  expect(output).toContain('--uiowa-brand-bar-site-name-font-size: clamp(1.65rem, calc(2.3784vw + 0.1932rem), 2.2rem);');
  expect(output).toContain('--uiowa-color-link-default: var(--uiowa-color-blue-dark);');
  expect(output).not.toContain('--uiowa-font-size-120:');
});

describe('breakpointRem', () => {
  it('converts a px breakpoint to rem at the 16px default', () => {
    expect(breakpointRem({
      path: ['breakpoint', '1350'],
      $value: { value: 1350, unit: 'px' },
    })).toBe('84.375rem');
  });

  it('rejects a breakpoint that is not stored in px', () => {
    expect(() => breakpointRem({
      path: ['breakpoint', 'wide'],
      $value: { value: 84.375, unit: 'rem' },
    })).toThrow('breakpoint.wide must be a px dimension');
  });
});

it('writes breakpoints to Sass in rem and durations as CSS times', () => {
  const tokens = readFileSync(join(repository, 'src/scss/abstracts/_tokens-generated.scss'), 'utf8');
  const breakpoints = readFileSync(join(repository, 'src/scss/abstracts/_breakpoints-generated.scss'), 'utf8');

  expect(breakpoints).toContain('$uiowa-breakpoint-1350: 84.375rem;');
  expect(breakpoints).toContain('$uiowa-breakpoint-standard: 84.375rem;');
  expect(tokens).not.toContain('--uiowa-breakpoint-');
  expect(tokens).toContain('--uiowa-duration-150: 150ms;');
  expect(tokens).not.toContain('[object Object]');
});

// Builds a throwaway token file through the real UIDS format, so these tests cover
// the variant extension without adding fixture tokens to src/tokens.
async function buildTokens(tokens) {
  const directory = mkdtempSync(join(tmpdir(), 'uids-tokens-'));

  try {
    writeFileSync(join(directory, 'tokens.json'), JSON.stringify(tokens));
    const dictionary = new StyleDictionary({
      usesDtcg: true,
      source: [join(directory, 'tokens.json')],
      log: { verbosity: 'silent' },
      expand: config.expand,
      hooks: config.hooks,
      platforms: {
        scss: {
          transformGroup: 'css',
          prefix: 'uiowa',
          buildPath: `${directory}/`,
          files: [{ destination: 'out.scss', format: 'uids/css-responsive', options: { outputReferences: true } }],
        },
      },
    });
    await dictionary.buildAllPlatforms();
    return readFileSync(join(directory, 'out.scss'), 'utf8');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

const color = (hex, extensions) => ({
  $type: 'color',
  $value: hex,
  ...(extensions && { $extensions: extensions }),
});

describe('edu.uiowa.variant', () => {
  it('re-points a token under the BEM modifier selector for its component', async () => {
    const output = await buildTokens({
      color: { gold: color('#ffcd00'), black: color('#000000') },
      card: {
        background: {
          $type: 'color',
          $value: '{color.gold}',
          $extensions: { 'edu.uiowa.variant': { black: '{color.black}' } },
        },
      },
    });

    expect(output).toContain('--uiowa-card-background: var(--uiowa-color-gold);');
    expect(output).toContain('.card--black {\n  --uiowa-card-background: var(--uiowa-color-black);\n}');
  });

  it('groups a variant under the selector its component declares', async () => {
    const output = await buildTokens({
      color: { gold: color('#ffcd00'), black: color('#000000'), gray: color('#333333') },
      button: {
        $extensions: { 'edu.uiowa.variants': { black: '.bttn--black' } },
        background: {
          $type: 'color',
          $value: '{color.gold}',
          $extensions: { 'edu.uiowa.variant': { black: '{color.black}' } },
        },
        'background-hover': {
          $type: 'color',
          $value: '{color.gold}',
          $extensions: { 'edu.uiowa.variant': { black: '{color.gray}' } },
        },
      },
    });

    expect(output).toContain([
      '.bttn--black {',
      '  --uiowa-button-background: var(--uiowa-color-black);',
      '  --uiowa-button-background-hover: var(--uiowa-color-gray);',
      '}',
    ].join('\n'));
    expect(output).not.toContain('.button--black');
  });

  // Style Dictionary copies a composite's extensions to every expanded member with
  // the references already resolved, so the override must come from the source file.
  it('re-points only the named member of a typography token', async () => {
    const typography = (extensions) => ({
      $type: 'typography',
      $value: {
        fontFamily: 'Roboto',
        fontWeight: 300,
        fontSize: '{size.large}',
        letterSpacing: { value: 0, unit: 'px' },
        lineHeight: 1.15,
      },
      $extensions: extensions,
    });
    const tokens = {
      size: {
        $type: 'dimension',
        large: { $value: { value: 1.65, unit: 'rem' } },
        small: { $value: { value: 1, unit: 'rem' } },
      },
    };

    const output = await buildTokens({
      ...tokens,
      card: { title: typography({ 'edu.uiowa.variant': { narrow: { fontSize: '{size.small}' } } }) },
    });

    expect(output).toContain('.card--narrow {\n  --uiowa-card-title-font-size: var(--uiowa-size-small);\n}');
    expect(output).not.toContain('[object Object]');

    await expect(buildTokens({
      ...tokens,
      card: { title: typography({ 'edu.uiowa.variant': { narrow: '{size.small}' } }) },
    })).rejects.toThrow('card.title edu.uiowa.variant.narrow must key its overrides by member');
  });

  // Style Dictionary resolves references to array- and object-valued tokens before
  // expanding a composite, so the format restores them from the source file.
  it('keeps references in expanded typography members', async () => {
    const output = await buildTokens({
      family: { $type: 'fontFamily', sans: { $value: ['Roboto', 'sans-serif'] } },
      size: { $type: 'dimension', body: { $value: { value: 1.2, unit: 'rem' } } },
      card: {
        title: {
          $type: 'typography',
          $value: {
            fontFamily: '{family.sans}',
            fontWeight: 300,
            fontSize: '{size.body}',
            letterSpacing: { value: 0, unit: 'px' },
            lineHeight: 1.15,
          },
        },
      },
    });

    expect(output).toContain('--uiowa-card-title-font-family: var(--uiowa-family-sans);');
    expect(output).toContain('--uiowa-card-title-font-size: var(--uiowa-size-body);');
    expect(output).toContain('--uiowa-card-title-letter-spacing: 0px;');
  });

  it('rejects a variant that references an unknown token', async () => {
    await expect(buildTokens({
      card: {
        background: color('#ffcd00', { 'edu.uiowa.variant': { black: '{color.missing}' } }),
      },
    })).rejects.toThrow(/could not be found|references unknown token/);
  });

  it('rejects a variant name that cannot form a class name', () => {
    expect(() => variantSelector({ path: ['card', 'background'] }, 'Black Card'))
      .toThrow('card.background declares an invalid variant name "Black Card"');
  });
});
