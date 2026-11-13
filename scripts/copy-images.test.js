// @vitest-environment node

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass';
import { expect, it } from 'vitest';
import { cssImages } from './copy-images.js';

const repository = join(dirname(fileURLToPath(import.meta.url)), '..');

it('copies every image the compiled CSS references', () => {
  const { css } = compile(join(repository, 'src/scss/uids.scss'));
  const urls = [...css.matchAll(/url\(["']?([^"')]+)/g)]
    .map(([, url]) => url)
    .filter((url) => !url.startsWith('data:'));

  expect(urls.length).toBeGreaterThan(0);
  for (const url of urls) {
    expect(url).toMatch(/^images\//);
    expect(cssImages).toContain(url.slice('images/'.length));
  }
});
