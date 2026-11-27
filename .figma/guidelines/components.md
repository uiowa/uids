# UIDS components for Foundations pages

## The Foundations page pattern (copy it)

A page is two files in `src/foundations/`:

- **`<Page>.mdx`** holds the words: `# Title`, a lead paragraph, `## Section` headings, and
  `### Guidance` / `### When to use` bullet lists. It starts with
  `import { Meta, Story } from '@storybook/addon-docs/blocks'; import * as Stories from './<Page>.stories';`
  and `<Meta of={Stories} />`, and embeds each example with `<Story of={Stories.Name} />`.
  No Vue components inside the MDX: Vue cannot render there.
- **`<Page>.stories.js`** holds the Vue examples. `export default { title: 'Foundations/<Page>' }`.
  Every story carries the literal `tags: ['!dev']` so it stays out of the sidebar. Values are read
  from the token JSON through the `primitive()` / `role()` helpers in `Color.stories.js`. Each
  story's render object registers the components it uses (`components: { UidsCard, UidsGrid, … }`);
  nothing is registered globally, so a story without that renders empty with a "Failed to resolve
  component" warning.

The Color page's stories: `Primary`, `Neutral`, `Accent`, `DataVisualization`, `Status` (swatch
grids) and `StatusRoles` (a table). Story ids are `foundations-color--<name>`; the docs page is
`foundations-color--docs`.

## Components the Color page uses

| Component | File | Props the page uses (each file defines more; read it before adding one) | Slots | How the Color page uses it |
|---|---|---|---|---|
| Card | `src/components/card/Card.vue` | `headline_style` (String; `'serif'` on the page) | `media`, `pre_title`, `title`, `subtitle`, `meta`, default | One card per swatch: `#media` holds an `<img>` whose `src` is a one-color SVG data URI; `#title` the name; the body is `<p>` lines (hex, print values) and `<p><code>` token names |
| Grid | `src/components/grid/Grid.vue` | `type` (String, default `'threecol--33-34-33'`; the page uses `'twocol--50-50'`, `'threecol--33-34-33'`, `'fourcol--25'`, each with `' grid--gap__sm'` appended) | default | Wraps the cards |
| GridItem | `src/components/grid/GridItem.vue` | none | default | One per card |
| Table | `src/components/table/Table.vue` | `caption` (String), `border` (Boolean); also defines `summary` and two more booleans | `thead`, `tbody` | The status roles table: `<th scope="col">` header row, `<th scope="row">` per role |

Template names are kebab-case: `<uids-card>`, `<uids-grid>`, `<uids-grid-item>`, `<uids-table>`.

## Things that go wrong

- An empty Card body renders the fallback text "Body". Always give the default slot content.
- Table's `caption` defaults to the word "Table" and renders it as the visible caption. Always pass
  one.
- The Grid sets its own gaps. `grid--gap__sm` narrows the column gap; there is no row-gap option.
  Don't add CSS to change it.
- Markdown pipe tables do not render in this MDX (no remark-gfm). Use the system Table in a story.
- Storybook's docs theme styles bare HTML elements (`hr`, `table`, `code`, blockquotes) in its own
  look, not UIDS's. Use a system component, or plain headings and paragraphs; never a bare element
  for visual effect.

## Other components available

The folders in `src/components/`: accordion, alert, background, badge, banner, blockquote,
brand-bar, brand-footer, button, callout, card, cta, form, grid, headline, inline, logo, media,
menu, stat, table. Read the folder: it holds the component's `.vue` file(s) and stories where they
exist, and the stylesheet is in `src/scss/components/` (Grid's is `src/scss/layout/_grid.scss`).
Prefer an existing component over new markup; if none fits, say so instead of inventing one.

## Figma

Library file `hNShklBztaeaQneScM0KoM`: pages `Foundations / Typography`, `Foundations / Layout`,
`Foundations / Backgrounds`, and one `Components / <Name>` page per component. Variables use the
code's token names (`color/neutral/100` ↔ `--uiowa-color-neutral-100`), px = rem × 16.

## Selection guidance

- A set of values with a name and a sample (colors, sizes): Cards in a Grid.
- Rows that compare attributes across roles: the Table.
- Running copy and rules: plain MDX headings and bullets, no component.
