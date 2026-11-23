// @vitest-environment node

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import { expect, it } from 'vitest';

const repository = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(join(repository, path), 'utf8');

it("draws the wordmark from the Logo component's own path", () => {
  const [, block] = /<svg[^>]*viewBox="0 0 311\.6 90\.2"[^>]*>([\s\S]*?)<\/svg>/.exec(read('src/components/logo/Logo.vue'));
  const paths = [...block.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((match) => match[1]);
  const [, sassPath] = /\$iowa-wordmark-path: '([^']+)';/.exec(read('src/scss/abstracts/_logo-art.scss'));

  expect(paths).toHaveLength(4);
  expect(sassPath).toBe(paths.join(''));
});

it('builds a Qualtrics theme with the tokens and both of its dark states', () => {
  const { css } = sass.compile(join(repository, 'src/scss/qualtrics.scss'));

  // A font import only works ahead of every rule; only @charset may come before it.
  expect(css).toMatch(/^(@charset "UTF-8";\n)?@import url\("https:\/\/fonts\.googleapis\.com\//);
  expect(css).toContain('--uiowa-color-brand-gold:');

  // Qualtrics marks the mode with data-mode, and has no data-theme.
  expect(css).not.toContain('data-theme');
  expect(css).toMatch(/html:root:root\[data-mode=["']?dark["']?\]/);
  expect(css).toContain('html:root:root:not([data-mode])');
  expect(css.match(/--uiowa-color-text: var\(--uiowa-color-neutral-100\);/g)).toHaveLength(2);

  expect(css).not.toMatch(/variables\.|#\{|\$[a-z]/);
});
