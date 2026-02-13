import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const watchMode = process.argv.includes('--watch');

// Ensure dist directory exists
mkdirSync(join(__dirname, 'dist'), { recursive: true });

// Copy UI HTML to dist
const uiHtml = readFileSync(join(__dirname, 'src/ui.html'), 'utf-8');
writeFileSync(join(__dirname, 'dist/ui.html'), uiHtml);

// Build code.ts
const buildOptions = {
  entryPoints: [join(__dirname, 'src/code.ts')],
  bundle: true,
  outfile: join(__dirname, 'dist/code.js'),
  platform: 'node',
  target: 'es2017',
  logLevel: 'info',
};

if (watchMode) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(buildOptions);
  console.log('Build complete!');
}
