// @vitest-environment node

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { breakpointRem, fluidFontSize, multipliedSize } from '../style-dictionary.config.js';

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

  it('accepts a maximum that resolved from a font-size reference', () => {
    expect(fluidFontSize({
      $value: '1.6rem',
      $extensions: { 'edu.uiowa.fluid': { ...fluid, max: '2.2rem' } },
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
});

describe('multipliedSize', () => {
  const multiplied = (by) => ({
    original: {
      $value: '{typography.base.fontSize}',
      $extensions: { 'edu.uiowa.multiply': { by } },
    },
  });

  it('multiplies a reference to the reading size by a multiplier, both as custom properties', () => {
    expect(multipliedSize(multiplied('{typography.scale.display}')))
      .toBe('calc(var(--uiowa-typography-base-font-size) * var(--uiowa-typography-scale-display))');
    expect(multipliedSize(multiplied('{typography.scale.related}')))
      .toBe('calc(var(--uiowa-typography-base-font-size) * var(--uiowa-typography-scale-related))');
  });

  it('multiplies by a number, for a role whose multiple is its own', () => {
    expect(multipliedSize(multiplied(6)))
      .toBe('calc(var(--uiowa-typography-base-font-size) * 6)');
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
  expect(output).toContain('--uiowa-color-link-default: var(--uiowa-color-blue-dark);');
  expect(output).not.toContain('--uiowa-font-size-120:');
});

it('emits the step 3 roles as multiples of the reading size', () => {
  const output = readFileSync(join(repository, 'src/scss/abstracts/_tokens-generated.scss'), 'utf8');

  expect(output).toContain('--uiowa-typography-base-font-size: var(--uiowa-typography-font-size-120);');
  expect(output).toContain('--uiowa-typography-headline-medium-font-size: calc(var(--uiowa-typography-base-font-size) * 6);');
  expect(output).toContain('--uiowa-typography-headline-xs-font-size: calc(var(--uiowa-typography-base-font-size) * 3);');
  expect(output).toContain('--uiowa-typography-subhead-large-font-family: var(--uiowa-typography-typeface-slab);');
  expect(output).toContain('--uiowa-typography-body-small-font-size: calc(var(--uiowa-typography-base-font-size) * 0.875);');
  expect(output).toContain('--uiowa-typography-space-related: calc(var(--uiowa-typography-base-font-size) * var(--uiowa-typography-scale-related));');
  expect(output).toContain('--uiowa-typography-body-font-size: var(--uiowa-typography-font-size-120);');
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
  expect(breakpoints).toContain('$uiowa-layout-breakpoint-standard: 84.375rem;');
  expect(tokens).not.toContain('--uiowa-breakpoint-');
  expect(tokens).toContain('--uiowa-duration-150: 150ms;');
  expect(tokens).not.toContain('[object Object]');
});

// Layout tokens: spacing roles and digital tiers.
function generated(name) {
  return readFileSync(join(repository, 'src/scss/abstracts', name), 'utf8');
}

describe('layout tiers', () => {
  it('puts spacing roles and tier margins and gutters on space stops', () => {
    const css = generated('_tokens-generated.scss');

    expect(css).toContain('--uiowa-layout-space-section: var(--uiowa-space-300);');
    expect(css).toContain('--uiowa-layout-digital-medium-margin: var(--uiowa-space-200);');
    expect(css).toContain('--uiowa-layout-digital-large-gutter: var(--uiowa-space-150);');
  });

  it('keeps padding equal to gutter in every tier', () => {
    const css = generated('_tokens-generated.scss');

    for (const tier of ['small', 'medium', 'large']) {
      expect(css).toContain(`--uiowa-layout-digital-${tier}-padding: var(--uiowa-layout-digital-${tier}-gutter);`);
    }
  });


});
