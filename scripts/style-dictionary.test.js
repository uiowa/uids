// @vitest-environment node

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { fluidFontSize } from '../style-dictionary.config.js';

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
