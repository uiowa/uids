// Copies the images the compiled CSS references into <cssDir>/images, where the
// default $imgpath points.
import { copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = join(dirname(fileURLToPath(import.meta.url)), '../src/assets/images');

export const cssImages = readdirSync(source)
  .filter((file) => /^(brain|community|particle)-pattern.*\.(svg|png)$/.test(file));

export function copyImages(cssDir) {
  const target = join(cssDir, 'images');
  mkdirSync(target, { recursive: true });
  for (const file of cssImages) {
    copyFileSync(join(source, file), join(target, file));
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cssDir = process.argv[2];
  if (!cssDir) {
    console.error('Usage: node scripts/copy-images.js <css-output-dir>');
    process.exit(1);
  }
  copyImages(cssDir);
}
