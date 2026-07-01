# Tokens

Design tokens are the named design decisions the UIowa design system is built from. They are organized in layers:

- **Reference tokens** are raw values: brand colors and gray scales.
- **Semantic tokens** describe intent: text, background, link.
- **Component tokens** describe a specific component/state when needed: button background, tab border, alert text.

Every token is a CSS custom property defined in [tokens.css](https://github.com/uiowa/uids/blob/5.x/tokens.css). In product UI, prefer semantic tokens over raw reference tokens so intent stays stable when themes or values change.

## Color

<hr>

### Reference tokens

#### Brand

Iowa's primary identity colors.

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-gold</code></td><td><code>#FFCD00</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gold)"></span></td></tr>
    <tr><td><code>--uiowa-color-black</code></td><td><code>#000000</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-black)"></span></td></tr>
  </tbody>
</table>

#### Neutral

Lightest to darkest. Backgrounds, borders, dividers, and reading surfaces.

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-gray-100</code></td><td><code>#F3F3F3</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-100)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-150</code></td><td><code>#EAEBEC</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-150)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-175</code></td><td><code>#D8DADC</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-175)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-200</code></td><td><code>#BCBEC0</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-200)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-300</code></td><td><code>#8D9094</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-300)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-400</code></td><td><code>#777A7F</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-400)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-500</code></td><td><code>#63666A</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-500)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-700</code></td><td><code>#33363A</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-700)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-800</code></td><td><code>#232527</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-800)"></span></td></tr>
    <tr><td><code>--uiowa-color-gray-900</code></td><td><code>#000000</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-gray-900)"></span></td></tr>
  </tbody>
</table>

#### Accent

Support the brand palette with emphasis and contrast. Blue also carries the link role.

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-blue</code></td><td><code>#3375D1</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-blue)"></span></td></tr>
    <tr><td><code>--uiowa-color-teal</code></td><td><code>#06967E</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-teal)"></span></td></tr>
    <tr><td><code>--uiowa-color-orange</code></td><td><code>#CC6D17</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-orange)"></span></td></tr>
    <tr><td><code>--uiowa-color-magenta</code></td><td><code>#AA4981</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-magenta)"></span></td></tr>
    <tr><td><code>--uiowa-color-ochre</code></td><td><code>#C08C00</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-ochre)"></span></td></tr>
  </tbody>
</table>

#### Data visualization

12-stop categorical ramps for charting multiple series — one tuned for light surfaces, one for dark.

##### Light ramp — on white

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-data-light-1</code></td><td><code>#9E9283</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-1)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-2</code></td><td><code>#737578</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-2)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-3</code></td><td><code>#154E9F</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-3)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-4</code></td><td><code>#3375D1</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-4)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-5</code></td><td><code>#2F798A</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-5)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-6</code></td><td><code>#06967E</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-6)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-7</code></td><td><code>#0E6B4D</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-7)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-8</code></td><td><code>#728E44</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-8)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-9</code></td><td><code>#C08C00</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-9)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-10</code></td><td><code>#CC6D17</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-10)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-11</code></td><td><code>#AA4981</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-11)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-light-12</code></td><td><code>#6D58A0</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-light-12)"></span></td></tr>
  </tbody>
</table>

##### Dark ramp — on #000

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-data-dark-1</code></td><td><code>#BCBEC0</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-1)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-2</code></td><td><code>#9E9283</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-2)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-3</code></td><td><code>#3375D1</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-3)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-4</code></td><td><code>#4EADF4</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-4)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-5</code></td><td><code>#25A2B7</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-5)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-6</code></td><td><code>#75BFAE</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-6)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-7</code></td><td><code>#369963</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-7)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-8</code></td><td><code>#89A64E</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-8)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-9</code></td><td><code>#D7A527</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-9)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-10</code></td><td><code>#F07A4C</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-10)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-11</code></td><td><code>#C26BA4</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-11)"></span></td></tr>
    <tr><td><code>--uiowa-color-data-dark-12</code></td><td><code>#8371BC</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-data-dark-12)"></span></td></tr>
  </tbody>
</table>

### Semantic tokens

Intent-based roles that alias a reference token. Only the roles decided so far are listed — more will be added as they're agreed. Prefer semantic tokens in product UI so meaning stays stable if the underlying value changes.

<table>
  <thead><tr><th>Token</th><th>Resolves to</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-text</code></td><td><code>--uiowa-color-black</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-text)"></span></td></tr>
    <tr><td><code>--uiowa-color-background</code></td><td><code>--uiowa-color-white</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-background)"></span></td></tr>
    <tr><td><code>--uiowa-color-link</code></td><td><code>--uiowa-color-blue</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-link)"></span></td></tr>
  </tbody>
</table>

### Status tokens

Each status has a strong edge color and a soft background fill, used for alerts and messages only.

<table>
  <thead><tr><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
  <tbody>
    <tr><td><code>--uiowa-color-info</code></td><td><code>#3375D1</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-info)"></span></td></tr>
    <tr><td><code>--uiowa-color-info-background</code></td><td><code>#EAF1FB</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-info-background)"></span></td></tr>
    <tr><td><code>--uiowa-color-success</code></td><td><code>#0E6B4D</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-success)"></span></td></tr>
    <tr><td><code>--uiowa-color-success-background</code></td><td><code>#E6F4EE</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-success-background)"></span></td></tr>
    <tr><td><code>--uiowa-color-warning</code></td><td><code>#995C00</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-warning)"></span></td></tr>
    <tr><td><code>--uiowa-color-warning-background</code></td><td><code>#FBF3DC</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-warning-background)"></span></td></tr>
    <tr><td><code>--uiowa-color-danger</code></td><td><code>#C0392B</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-danger)"></span></td></tr>
    <tr><td><code>--uiowa-color-danger-background</code></td><td><code>#FBEAEA</code></td><td><span style="display:inline-block;width:4rem;height:1.5rem;background:var(--uiowa-color-danger-background)"></span></td></tr>
  </tbody>
</table>
