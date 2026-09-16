// @vitest-environment node

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { fluidFontSize, validate } from '../style-dictionary.config.js';

const repository = join(dirname(fileURLToPath(import.meta.url)), '..');

const fluid = {
  minViewport: { value: 600, unit: 'px' },
  maxViewport: { value: 1310, unit: 'px' },
  max: { value: 2.2, unit: 'rem' },
};

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

describe('validate', () => {
  const color = (components, hex) => ({ colorSpace: 'srgb', components, hex });

  it('rejects a typography composite missing a member', () => {
    expect(() => validate({
      typography: { body: { $type: 'typography', $value: { fontFamily: 'a', fontSize: 'b', fontWeight: 'c', letterSpacing: 'd' } } },
    })).toThrow('typography.body is missing typography.lineHeight');
  });

  it('rejects a hex that disagrees with its components', () => {
    expect(() => validate({
      color: { gold: { $value: color([1, 0.803922, 0], '#00FF00') } },
    })).toThrow('color.gold hex #00FF00 does not match its components');
  });

  it('rejects sRGB components outside 0 through 1', () => {
    expect(() => validate({
      color: { gold: { $value: color([5, -2, 0], '#FFCD00') } },
    })).toThrow('color.gold has sRGB components outside 0 through 1');
  });

  it('accepts the repository token sources', () => {
    expect(() => validate({
      color: { gold: { $value: color([1, 0.803922, 0], '#FFCD00') } },
      typography: { body: { $type: 'typography', $value: { fontFamily: 'a', fontSize: 'b', fontWeight: 'c', letterSpacing: 'd', lineHeight: 'e' } } },
    })).not.toThrow();
  });
});

it('emits the public token variables from the repository token sources', () => {
  const output = readFileSync(join(repository, 'src/scss/abstracts/_tokens-generated.scss'), 'utf8');

  expect(output).toContain('--uiowa-typography-font-size-120: 1.2rem;');
  expect(output).toContain('--uiowa-typography-heading-h1-font-size: clamp(2.3rem, calc(1.6967vw + 1.6637rem), 3.0529rem);');
  expect(output).toContain('--uiowa-color-link-default: var(--uiowa-color-blue-dark);');
  expect(output).not.toContain('--uiowa-font-size-120:');
});
