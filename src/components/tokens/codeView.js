import { computed } from 'vue';

// Code as it sits in its file, for the token pages: a caption naming the file and the lines shown, lines that wrap
// under their own indent instead of scrolling sideways, and notes beside the code. A diff reads like GitHub's
// Files changed tab: old and new line numbers, a sign, and the hunk headers.

const list = (items) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items.at(-1)}` : items[0] ?? '');
const missing = (what) => [{ n: '', text: `(not found: ${what})`, tone: 'missing' }];

/** A file's text as numbered lines. */
export const linesOf = (text) => text.replace(/\n$/, '').split('\n').map((line, i) => ({ n: i + 1, text: line }));

/** The lines from the first that includes `from` through the first after it that includes `to`, or matches it. */
export function excerpt(text, from, to = from) {
  const lines = linesOf(text);
  const ends = (line) => (to instanceof RegExp ? to.test(line.text) : line.text.includes(to));
  const start = lines.findIndex((line) => line.text.includes(from));
  const end = start < 0 ? -1 : lines.findIndex((line, i) => i >= start && ends(line));
  return start < 0 || end < 0 ? missing(start < 0 ? from : String(to)) : lines.slice(start, end + 1);
}

/** A top-level function or constant with the comment above it, through the closing brace at the start of a line. */
export function definition(text, name) {
  const lines = linesOf(text);
  const declared = lines.findIndex((line) => new RegExp(`^(export )?(function|const) ${name}\\b`).test(line.text));
  if (declared < 0) return missing(name);
  let start = declared;
  while (start > 0 && /^(\/\*\*| \*|\/\/)/.test(lines[start - 1].text)) start -= 1;
  const end = lines[declared].text.trimEnd().endsWith(';') ? declared : lines.findIndex((line, i) => i > declared && /^\}/.test(line.text));
  return lines.slice(start, end + 1);
}

/** A group in a token file, such as ['typography', 'body'], from its "key": { line to its closing brace. */
export function jsonGroup(text, path) {
  const lines = linesOf(text);
  let start = 0;
  let end = lines.length - 1;
  for (const [depth, key] of path.entries()) {
    const indent = ' '.repeat(2 * (depth + 1));
    const open = lines.findIndex((line, i) => i >= start && i <= end && line.text.startsWith(`${indent}"${key}": {`));
    if (open < 0) return missing(path.join('.'));
    start = open;
    end = lines.findIndex((line, i) => i > open && line.text.startsWith(`${indent}}`));
  }
  return lines.slice(start, end + 1);
}

/** The lines that declare these custom properties, in file order. */
export const declaring = (text, names) => linesOf(text).filter((line) => names.some((name) => line.text.trimStart().startsWith(`${name}:`)));

/**
 * A unified diff as files of rows: each row a hunk header or a line with its old and new numbers. Lines before the
 * first `diff --git`, such as `base <commit>`, are returned as `meta`.
 */
export function parseDiff(text) {
  const meta = {};
  const files = [];
  let file;
  let oldN;
  let newN;
  for (const line of text.replace(/\n$/, '').split('\n')) {
    if (line.startsWith('diff --git ')) {
      file = { path: line.slice(line.indexOf(' b/') + 3), rows: [], adds: 0, dels: 0, inHunk: false };
      files.push(file);
    } else if (!file) {
      const [key, ...value] = line.split(' ');
      if (key) meta[key] = value.join(' ');
    } else {
      const hunk = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
      if (hunk) {
        [oldN, newN] = [Number(hunk[1]), Number(hunk[2])];
        file.inHunk = true;
        file.rows.push({ tone: 'hunk', text: line });
      } else if (file.inHunk && !line.startsWith('\\')) {
        const sign = line[0];
        const row = { sign, text: line.slice(1) };
        if (sign === '+') {
          Object.assign(row, { tone: 'add', newLine: newN++ });
          file.adds += 1;
        } else if (sign === '-') {
          Object.assign(row, { tone: 'del', oldLine: oldN++ });
          file.dels += 1;
        } else {
          Object.assign(row, { oldLine: oldN++, newLine: newN++ });
        }
        file.rows.push(row);
      }
    }
  }
  return { meta, files };
}

/**
 * Lines split where each note's anchor first appears, in order, each part with its note. A note whose anchor isn't
 * found is returned in `unplaced`, so the page can say so instead of dropping it.
 */
export function annotate(lines, notes) {
  const placed = [];
  const unplaced = [];
  let from = 0;
  for (const note of notes) {
    const at = lines.findIndex((line, i) => i >= from && `${line.sign ?? ''}${line.text}`.includes(note.at));
    if (at < 0) unplaced.push(note);
    else {
      placed.push({ at, note: note.note });
      from = at + 1;
    }
  }
  const sections = placed.length && placed[0].at > 0 ? [{ lines: lines.slice(0, placed[0].at) }] : [];
  placed.forEach(({ at, note }, i) => sections.push({ lines: lines.slice(at, placed[i + 1]?.at ?? lines.length), note }));
  return { sections: placed.length ? sections : [{ lines }], unplaced };
}

/**
 * Lines ready to draw: a gap row wherever the numbers skip, and each line's indent, which a wrapped line keeps.
 * `previous` is the line drawn just before these, when they continue another part.
 */
function rowsOf(lines, previous) {
  const rows = [];
  lines.forEach((line, i) => {
    const before = i ? lines[i - 1] : previous;
    if (typeof line.n === 'number' && typeof before?.n === 'number' && line.n > before.n + 1) rows.push({ text: '⋯', tone: 'gap', indent: 0 });
    rows.push({ ...line, indent: line.text.match(/^ */)[0].length });
  });
  return rows;
}

/** "lines 148–157", or "lines 127–129 and 196–197" where they skip. */
export function rangeOf(lines) {
  const runs = [];
  for (const { n } of lines) {
    if (typeof n !== 'number') continue;
    const last = runs.at(-1);
    if (last && n === last[1] + 1) last[1] = n;
    else runs.push([n, n]);
  }
  if (!runs.length) return '';
  const single = runs.length === 1 && runs[0][0] === runs[0][1];
  return `${single ? 'line' : 'lines'} ${list(runs.map(([a, b]) => (a === b ? `${a}` : `${a}–${b}`)))}`;
}

const LINE = `
  <div :class="['cv__line', row.tone && 'cv__line--' + row.tone]">
    <span v-if="row.tone === 'hunk'" class="cv__text cv__text--hunk">{{ row.text }}</span>
    <template v-else>
      <template v-if="diff"><span class="cv__n">{{ row.oldLine }}</span><span class="cv__n">{{ row.newLine }}</span><span class="cv__sign">{{ row.sign === ' ' ? '' : row.sign }}</span></template>
      <span v-else class="cv__n">{{ row.n }}</span>
      <span class="cv__text" :style="{ '--indent': row.indent }">{{ row.text }}</span>
    </template>
  </div>`;

/** A snippet: the file and its lines in the caption, then the numbered lines. */
export const CodeBlock = {
  props: {
    file: { type: String, required: true },
    where: { type: String, default: '' },
    lines: { type: Array, required: true },
  },
  setup(props) {
    return { rows: computed(() => rowsOf(props.lines)), range: computed(() => rangeOf(props.lines)), diff: false };
  },
  template: `
    <figure class="cv">
      <figcaption class="cv__file"><code>{{ file }}</code><span v-if="where">{{ ' ' + where }}</span><span v-if="range" class="cv__range">{{ ' ' + range }}</span></figcaption>
      <div class="cv__body"><template v-for="(row, i) in rows" :key="i">${LINE}</template></div>
    </figure>`,
};

/** Code with a note beside each part it explains; below 1100px the note sits above its part. */
export const Annotated = {
  props: {
    sections: { type: Array, required: true },
    diff: { type: Boolean, default: false },
  },
  setup() {
    return { rowsOf };
  },
  template: `
    <div class="an">
      <div v-for="(section, s) in sections" :key="s" class="an__section">
        <aside v-if="section.note" class="an__note"><div class="an__sticky" v-html="section.note"></div></aside>
        <div class="an__code cv__body" :class="{ 'cv--diff': diff }"><template v-for="(row, i) in rowsOf(section.lines, sections[s - 1]?.lines.at(-1))" :key="i">${LINE}</template></div>
      </div>
    </div>`,
};

export const codeCss = `
  .cv { margin: 0; min-width: 0; border: 1px solid var(--uiowa-color-border-default); background: var(--uiowa-color-background-white); }
  .cv__file {
    display: flex; flex-wrap: wrap; gap: 0 0.5em; align-items: baseline;
    padding: var(--uiowa-space-50) var(--uiowa-space-100);
    border-bottom: 1px solid var(--uiowa-color-border-default); background: var(--uiowa-color-neutral-200);
    font-size: 0.8rem;
  }
  .cv__file code { font-weight: 600; }
  .cv__range { margin-left: auto; color: var(--uiowa-color-neutral-600); }
  .cv__body {
    padding: var(--uiowa-space-50) 0; background: var(--uiowa-color-neutral-100);
    font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 0.8rem; line-height: 1.55;
  }
  .cv__line { display: grid; grid-template-columns: 3.5ch minmax(0, 1fr); column-gap: 1.5ch; padding-right: var(--uiowa-space-100); }
  .cv--diff .cv__line { grid-template-columns: 3.5ch 3.5ch 1ch minmax(0, 1fr); column-gap: 1ch; }
  .cv__n { text-align: right; color: var(--uiowa-color-neutral-500); user-select: none; }
  .cv__sign { user-select: none; }
  /* A long line wraps and keeps its indent, plus two characters, so the code stays readable at any width. */
  .cv__text {
    white-space: pre-wrap; overflow-wrap: anywhere;
    padding-left: calc((var(--indent, 0) + 2) * 1ch); text-indent: calc((var(--indent, 0) + 2) * -1ch);
  }
  .cv__line--mark { background: color-mix(in srgb, var(--uiowa-color-brand-gold) 35%, transparent); }
  .cv__line--add { background: color-mix(in srgb, var(--uiowa-color-success) 14%, transparent); }
  .cv__line--del { background: color-mix(in srgb, var(--uiowa-color-danger) 12%, transparent); }
  .cv__line--add .cv__sign { color: var(--uiowa-color-success); }
  .cv__line--del .cv__sign { color: var(--uiowa-color-danger); }
  .cv__line--hunk { display: block; padding: 0.15em var(--uiowa-space-100); background: var(--uiowa-color-neutral-200); color: var(--uiowa-color-neutral-600); }
  .cv__text--hunk { padding: 0; text-indent: 0; }
  .cv__line--gap, .cv__line--missing { color: var(--uiowa-color-neutral-500); }
  .cv__line--missing { color: var(--uiowa-color-danger); }
  /* Notes beside the code: each note starts level with the lines it explains and stays in view while they scroll. */
  .an__section { display: grid; grid-template-columns: minmax(0, 1fr) minmax(15rem, 25rem); column-gap: var(--uiowa-space-200); }
  .an__code { grid-column: 1; grid-row: 1; padding: 0; }
  .an__note { grid-column: 2; grid-row: 1; }
  .an__section + .an__section .an__code { border-top: 1px dashed var(--uiowa-color-neutral-400); }
  .an__section:first-child .an__code { padding-top: var(--uiowa-space-50); }
  .an__section:last-child .an__code { padding-bottom: var(--uiowa-space-50); }
  .an__sticky {
    position: sticky; top: var(--uiowa-space-100);
    padding: var(--uiowa-space-50) var(--uiowa-space-100); border-left: 3px solid var(--uiowa-color-brand-gold);
    font-size: 0.9rem; line-height: 1.5;
  }
  .an__sticky > * + * { margin-top: var(--uiowa-space-50); }
  .an__sticky p { margin: 0; font-size: inherit; line-height: inherit; }
  @media (max-width: 1100px) {
    .an__section { grid-template-columns: minmax(0, 1fr); }
    .an__note, .an__code { grid-column: 1; grid-row: auto; }
    .an__sticky { position: static; margin: var(--uiowa-space-100) 0 var(--uiowa-space-50); }
  }
`;
