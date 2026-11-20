// @vitest-environment node

import { describe, expect, it } from 'vitest';
import { tokensCss } from './build-claude.mjs';

const tokens = {
  color: {
    themes: [{ id: 'light', name: 'Light' }],
    tokens: [
      { name: 'uiowa-color-gold', value: '#ffcd00' },
      { name: 'uiowa-color-brand-gold', value: '{uiowa-color-gold}' },
    ],
  },
  shadow: { tokens: [{ name: 'uiowa-shadow-raised', value: '0px 1px 2px 0px rgba(0, 0, 0, 0.2)' }] },
  spacing: { tokens: [{ name: 'uiowa-space-100', value: '1rem' }] },
  type: {
    families: { roboto: 'Roboto, sans-serif' },
    groups: [{ name: 'Text', family: 'roboto', styles: [{ name: 'body', fontSize: '1.2rem', fontWeight: 400, lineHeight: 1.7, letterSpacing: '0px' }] }],
  },
};

describe('tokensCss', () => {
  const css = tokensCss(tokens);

  it('opens with the line the artifact page recognizes', () => {
    expect(css.split('\n')[0]).toBe('/* UIDS — generated from tokens.json */');
  });

  it('writes color aliases as variable references', () => {
    expect(css).toContain('--uiowa-color-brand-gold: var(--uiowa-color-gold);');
  });

  it('declares other families, font stacks and a class per type style', () => {
    expect(css).toContain('--uiowa-space-100: 1rem;');
    expect(css).toContain('--font-roboto: Roboto, sans-serif;');
    expect(css).toContain('.body {\n  font-family: var(--font-roboto);');
  });
});
