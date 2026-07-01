import { readFile, writeFile, readdir, mkdir, cp } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

const rootDir = path.resolve(import.meta.dirname, '..');
const docsDir = path.join(rootDir, 'docs');
const contentDir = path.join(docsDir, 'content');
const distDir = path.join(rootDir, 'dist');

const template = await readFile(path.join(docsDir, 'template.html'), 'utf8');

function titleFromMarkdown(markdown, fallback) {
  const heading = markdown.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback;
}

await mkdir(distDir, { recursive: true });

const files = (await readdir(contentDir)).filter((file) => file.endsWith('.md'));
const pages = [];

for (const file of files) {
  const slug = path.basename(file, '.md');
  const markdown = await readFile(path.join(contentDir, file), 'utf8');
  const title = titleFromMarkdown(markdown, slug);
  const html = template
    .replaceAll('{{title}}', title)
    .replace('{{content}}', marked.parse(markdown));

  await writeFile(path.join(distDir, `${slug}.html`), html);
  pages.push({ slug, title });
}

if (!pages.some((page) => page.slug === 'index')) {
  const indexHtml = template
    .replaceAll('{{title}}', 'Iowa Design System Docs')
    .replace(
      '{{content}}',
      `<h1>Iowa Design System Docs</h1>\n<ul class="index-list">\n${pages
        .map((page) => `  <li><a href="${page.slug}.html">${page.title}</a></li>`)
        .join('\n')}\n</ul>`
    );

  await writeFile(path.join(distDir, 'index.html'), indexHtml);
}

await cp(path.join(rootDir, 'tokens.css'), path.join(distDir, 'tokens.css'));
await cp(path.join(docsDir, 'docs.css'), path.join(distDir, 'docs.css'));

console.log(`Built ${pages.length} page(s) to dist/`);
