# Tokens

Design tokens are the named design decisions the Iowa Design System is built from. They are organized in layers:

- **Reference tokens (primitives)** hold the raw values the system is built from — today that is color (brand, the neutral scale, accents, and the data-viz scales), and as they are decided it will also cover non-color values such as spacing, sizing, and radii. This is the only tier where a literal value is written.
- **Semantic tokens** name a *role* that applies across the whole system and point it at a reference token, so the UI targets meaning rather than a raw value — e.g. `--uiowa-color-link` → `--uiowa-color-blue`, `--uiowa-color-background` → `--uiowa-color-neutral-0`. Change what a role points at and every use of it updates at once.
- **Component tokens** name the value that *one component* (or one part or state of it) uses, usually by pointing at a semantic token — e.g. a future `--uiowa-button-background` → `--uiowa-color-brand`. The extra layer lets a single component be re-themed without changing the shared role everywhere else. None are defined yet.

In short: a reference token *is* the value, a semantic token names a system-wide *role*, and a component token names *one component's* use of a role. In product UI, prefer semantic (or component) tokens over raw reference tokens so intent stays stable when a value changes. Every token is a CSS custom property defined in `tokens.css`.

## Color

<hr>

### Reference tokens (primitives)

#### Brand

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-gold</code></td><td><code>#FFCD00</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-gold)"></span></td></tr>
    <tr><td><code>--uiowa-color-black</code></td><td><code>#000000</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-black)"></span></td></tr>
  </tbody>
</table>

#### Neutrals

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-neutral-0</code></td><td><code>#FFFFFF</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-0)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-100</code></td><td><code>#F3F3F3</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-100)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-150</code></td><td><code>#EAEBEC</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-150)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-175</code></td><td><code>#D8DADC</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-175)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-200</code></td><td><code>#BCBEC0</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-200)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-300</code></td><td><code>#8D9094</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-300)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-400</code></td><td><code>#777A7F</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-400)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-500</code></td><td><code>#63666A</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-500)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-700</code></td><td><code>#33363A</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-700)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-800</code></td><td><code>#232527</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-800)"></span></td></tr>
    <tr><td><code>--uiowa-color-neutral-900</code></td><td><code>#000000</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-neutral-900)"></span></td></tr>
  </tbody>
</table>

<details>
  <summary>Why <code>neutral-0</code>/<code>neutral-900</code> are separate from brand <code>black</code>/<code>white</code></summary>
  <p><code>--uiowa-color-neutral-0</code> (#FFFFFF) and <code>--uiowa-color-neutral-900</code> (#000000) share their values with the brand primitives <code>--uiowa-color-white</code> and <code>--uiowa-color-black</code>, but they are kept as separate tokens on purpose because they carry different intent. Brand black and white are Iowa's fixed identity anchors (logo and brand marks); the neutral endpoints are the lightest surface and darkest text value of the UI neutral scale — which is why the surface and text semantics resolve to <code>--uiowa-color-neutral-0</code> / <code>--uiowa-color-neutral-900</code>, not to the brand primitives. Keeping them apart lets the UI's surface and text values change independently — for example, if dark mode moves to a near-black surface such as #121212 — without shifting the brand black.</p>
</details>

#### Accents

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-blue</code></td><td><code>#3375D1</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-blue)"></span></td></tr>
    <tr><td><code>--uiowa-color-teal</code></td><td><code>#06967E</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-teal)"></span></td></tr>
    <tr><td><code>--uiowa-color-orange</code></td><td><code>#CC6D17</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-orange)"></span></td></tr>
    <tr><td><code>--uiowa-color-magenta</code></td><td><code>#AA4981</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-magenta)"></span></td></tr>
    <tr><td><code>--uiowa-color-ochre</code></td><td><code>#C08C00</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-ochre)"></span></td></tr>
  </tbody>
</table>

#### Data visualization

##### Light scale

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-data-light-1</code></td><td><code>#9E9283</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-1)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-2</code></td><td><code>#737578</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-2)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-3</code></td><td><code>#154E9F</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-3)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-4</code></td><td><code>#3375D1</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-4)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-5</code></td><td><code>#2F798A</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-5)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-6</code></td><td><code>#06967E</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-6)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-7</code></td><td><code>#0E6B4D</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-7)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-8</code></td><td><code>#728E44</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-8)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-9</code></td><td><code>#C08C00</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-9)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-10</code></td><td><code>#CC6D17</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-10)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-11</code></td><td><code>#AA4981</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-11)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-12</code></td><td><code>#6D58A0</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-light-12)"></span></td></tr>
  </tbody>
</table>

##### Dark scale

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-data-dark-1</code></td><td><code>#BCBEC0</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-1)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-2</code></td><td><code>#9E9283</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-2)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-3</code></td><td><code>#3375D1</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-3)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-4</code></td><td><code>#4EADF4</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-4)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-5</code></td><td><code>#25A2B7</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-5)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-6</code></td><td><code>#75BFAE</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-6)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-7</code></td><td><code>#369963</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-7)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-8</code></td><td><code>#89A64E</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-8)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-9</code></td><td><code>#D7A527</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-9)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-10</code></td><td><code>#F07A4C</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-10)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-11</code></td><td><code>#C26BA4</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-11)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-12</code></td><td><code>#8371BC</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-data-dark-12)"></span></td></tr>
  </tbody>
</table>

### Semantic tokens

Intent-based roles that alias a reference token. Only the roles decided so far are listed — more will be added as they're agreed. Prefer semantic tokens in product UI so meaning stays stable if the underlying value changes.

<table>
  <thead><tr><th>Token</th><th>Resolves to</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-text</code></td><td><code>--uiowa-color-neutral-900</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-text)"></span></td></tr>
    <tr><td><code>--uiowa-color-background</code></td><td><code>--uiowa-color-neutral-0</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-background)"></span></td></tr>
    <tr><td><code>--uiowa-color-link</code></td><td><code>--uiowa-color-blue</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-link)"></span></td></tr>
  </tbody>
</table>

### Status tokens

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-info</code></td><td><code>#3375D1</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-info)"></span></td></tr>
    <tr><td><code>--uiowa-color-info-wash</code></td><td><code>#EAF1FB</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-info-wash)"></span></td></tr>
    <tr><td><code>--uiowa-color-success</code></td><td><code>#0E6B4D</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-success)"></span></td></tr>
    <tr><td><code>--uiowa-color-success-wash</code></td><td><code>#E6F4EE</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-success-wash)"></span></td></tr>
    <tr><td><code>--uiowa-color-warning</code></td><td><code>#995C00</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-warning)"></span></td></tr>
    <tr><td><code>--uiowa-color-warning-wash</code></td><td><code>#FBF3DC</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-warning-wash)"></span></td></tr>
    <tr><td><code>--uiowa-color-danger</code></td><td><code>#C0392B</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-danger)"></span></td></tr>
    <tr><td><code>--uiowa-color-danger-wash</code></td><td><code>#FBEAEA</code></td><td><span class="swatch" style="--swatch:var(--uiowa-color-danger-wash)"></span></td></tr>
  </tbody>
</table>
