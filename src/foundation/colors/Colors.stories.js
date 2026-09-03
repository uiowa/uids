export default {
  title: 'Foundation/Colors',
  tags: ['!autodocs'],
  parameters: {
    options: { showPanel: false },
    docs: { source: { code: null } },
  },
};

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------

const styles = {
  page: 'padding:2rem;max-width:1120px;font-family:system-ui,sans-serif;color:#111;',
  intro: 'font-size:1rem;line-height:1.55;max-width:78ch;margin:0 0 1.5rem;',
  section: 'margin-bottom:3rem;',
  sectionTitle: 'font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:0;margin:0 0 0.45rem;padding-bottom:0.45rem;border-bottom:3px solid #FFCD00;',
  sectionDescription: 'font-size:0.875rem;color:#555;line-height:1.55;margin:0.65rem 0 1.1rem;max-width:78ch;',
  card: 'display:flex;flex-direction:column;gap:0.55rem;',
  swatch: 'height:100px;border:1px solid rgba(0,0,0,0.14);',
  label: 'display:block;font-size:0.9rem;margin-bottom:0.18rem;',
  code: 'display:block;font-size:0.74rem;color:#444;line-height:1.45;',
  note: 'display:block;font-size:0.72rem;color:#666;margin-top:0.35rem;line-height:1.45;',
  table: 'width:100%;border-collapse:collapse;font-size:0.875rem;line-height:1.45;',
  th: 'text-align:left;border-bottom:2px solid #111;padding:0.65rem 0.75rem;',
  td: 'border-bottom:1px solid #E6E6E6;padding:0.75rem;vertical-align:top;',
  pill: 'display:inline-block;border:1px solid #63666A;padding:0.18rem 0.45rem;font-size:0.7rem;font-weight:700;text-transform:uppercase;',
  link: 'color:#00558C;font-weight:700;',
};

function swatch({ bg, label, sub, hex, note = '', usedIn = [] }) {
  const usedInHtml = usedIn.length
    ? `<span style="${styles.note}"><em>Used in:</em> ${usedIn.join(', ')}</span>`
    : '';
  return `
    <div style="${styles.card}">
      <div style="${styles.swatch}background:${bg};"></div>
      <div>
        <strong style="${styles.label}">${label}</strong>
        <code style="${styles.code}">${sub}</code>
        ${hex ? `<code style="${styles.code}color:#777;">${hex}</code>` : ''}
        ${note ? `<span style="${styles.note}">${note}</span>` : ''}
        ${usedInHtml}
      </div>
    </div>`;
}

function section(title, description, content) {
  return `
    <section style="${styles.section}">
      <h2 style="${styles.sectionTitle}">${title}</h2>
      ${description ? `<p style="${styles.sectionDescription}">${description}</p>` : ''}
      ${content}
    </section>`;
}

function swatchGrid(swatches, columns = 4) {
  return `
    <div style="display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:1.35rem 1.5rem;">
      ${swatches.map(s => swatch(s)).join('')}
    </div>`;
}

function statusPill(label) {
  return `<span style="${styles.pill}">${label}</span>`;
}

function table(headers, rows) {
  return `
    <table style="${styles.table}">
      <thead>
        <tr>${headers.map(header => `<th style="${styles.th}">${header}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${rows.map(row => `<tr>${row.map(cell => `<td style="${styles.td}">${cell}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>`;
}

const grayRamp = [
  {
    bg: '#F3F3F3',
    label: 'Gray 50',
    sub: '$gray-50 / --uids-gray-50',
    hex: '#F3F3F3',
    note: 'Digital. Background only - subtle lift and slightly off-white surfaces.',
  },
  {
    bg: '#BCBEC0',
    label: 'Cool Gray (Print)',
    sub: 'Print only',
    hex: '#BCBEC0',
    note: 'Print background or decorative use only. Fails 3:1 on white, so do not use for digital UI borders, dividers, or text.',
  },
  {
    bg: '#949494',
    label: 'Gray Mid',
    sub: '--uids-gray-mid',
    hex: '#949494',
    note: 'Digital. Soft borders and accents only. 3.03:1 on white.',
  },
  {
    bg: '#737373',
    label: 'Gray 500',
    sub: '$gray-500 / --uids-gray-500',
    hex: '#737373',
    note: 'Digital. Secondary text. 4.74:1 on white.',
  },
  {
    bg: '#63666A',
    label: 'Gray 600 (Cool Gray Web)',
    sub: '$gray-600 / --uids-gray-600 / --uids-gray-cool',
    hex: '#63666A',
    note: 'Digital / Print. PMS Cool Gray 10. 5.77:1 on white.',
  },
  {
    bg: '#414042',
    label: 'Gray 900',
    sub: '$gray-900 / --uids-gray-900',
    hex: '#414042',
    note: 'Print. Primary text. 10.31:1 on white.',
  },
];

const deprecatedRows = [
  [
    '<code>$gray-light</code> / <code>--uids-gray-light</code>',
    '<code>#CACACA</code>',
    `${statusPill('Removed')} Migrate soft borders to <code>--uids-gray-mid</code>; disabled backgrounds to <code>$gray-50</code>.`,
  ],
  [
    '<code>$light-gray</code>',
    '<code>#B3B3B3</code>',
    `${statusPill('Removed')} Migrate pager disabled states to <code>$gray-50</code> background and <code>$gray-500</code> text.`,
  ],
  [
    '<code>$med-gray</code>',
    '<code>#666666</code>',
    `${statusPill('Removed')} Migrate consumers to <code>$gray-600</code> / PMS Cool Gray 10.`,
  ],
  [
    '<code>$lighter-gray</code>',
    '<code>#E6E6E6</code>',
    `${statusPill('Removed')} Fold single-use disabled/background cases into <code>$gray-50</code>.`,
  ],
];

const componentRows = [
  [
    '<a style="' + styles.link + '" href="?path=/story/components-accordion--default">Accordion</a>',
    'Border color',
    '<code>--uids-gray-mid</code>',
  ],
  [
    '<a style="' + styles.link + '" href="?path=/story/elements-form--text">Form inputs</a>',
    'Section border and default input outline',
    '<code>--uids-gray-mid</code>',
  ],
  [
    '<a style="' + styles.link + '" href="?path=/story/elements-form--toggle">Form toggle</a>',
    'Off-state switch background',
    '<code>$gray-50</code>',
  ],
  [
    '<a style="' + styles.link + '" href="https://github.com/uiowa/uids/blob/4.x/src/scss/components/tabs.scss" target="_blank" rel="noreferrer">Tabs source</a>',
    'Inactive tab text and underline',
    '<code>$gray-600</code>',
  ],
  [
    '<a style="' + styles.link + '" href="?path=/story/components-menu--vertical-menu">Menu</a>',
    'Active item indicator base color',
    '<code>--uids-gray-mid</code>',
  ],
  [
    '<a style="' + styles.link + '" href="https://github.com/uiowa/uids/blob/4.x/src/scss/components/pager.scss" target="_blank" rel="noreferrer">Pager source</a>',
    'Disabled state',
    '<code>$gray-500</code> text with <code>$gray-50</code> background.',
  ],
];

const contrastRows = [
  ['<code>$gray-500</code> text on <code>$white</code>', '4.74:1', 'Passes AA body text.'],
  ['<code>$gray-600</code> on <code>$white</code>', '5.77:1', 'Passes AA body text and AA non-text UI.'],
  ['<code>--uids-gray-mid</code> on <code>$white</code>', '3.03:1', 'Passes AA non-text UI. Use for borders and graphic accents only.'],
  ['<code>$gray-900</code> text on <code>$white</code>', '10.31:1', 'Passes AAA body text.'],
  ['Print cool gray <code>#BCBEC0</code> on <code>$white</code>', '1.86:1', 'Fails non-text contrast; print/decorative only.'],
  ['Deprecated <code>#CACACA</code> on <code>$white</code>', '1.64:1', 'Fails non-text contrast; this is why it is being phased out for borders.'],
];

const brandSwatches = [
  {
    bg: 'var(--uiowa-gold)',
    label: 'Gold',
    sub: '$primary / --uiowa-gold',
    hex: '#FFCD00',
    usedIn: ['button', 'badge', 'blockquote', 'brand-bar', 'brand-footer', 'banner', 'tables', 'tabs', 'pager', 'stat', 'slider', 'lists', 'paragraphs'],
  },
  {
    bg: 'var(--uiowa-black)',
    label: 'Black',
    sub: '$secondary / --uiowa-black',
    hex: '#000000',
    usedIn: ['button', 'badge', 'brand-bar', 'brand-footer', 'logo', 'menu', 'tabs', 'accordion', 'tables', 'pager', 'banner'],
  },
];

const statusSwatches = [
  {
    bg: '#00558C',
    label: 'Info',
    sub: '$info',
    hex: '#00558C',
    usedIn: ['badge (blue variant)', 'alert (info icon)'],
  },
  {
    bg: '#00664F',
    label: 'Success',
    sub: '$success',
    hex: '#00664F',
    usedIn: ['badge (green variant)', 'alert (success icon)'],
  },
  {
    bg: '#FFCD00',
    label: 'Warning',
    sub: '$warning',
    hex: '#FFCD00',
    usedIn: ['alert (warning bg base - same value as gold)'],
  },
  {
    bg: '#BD472A',
    label: 'Danger / Orange',
    sub: '$danger / $orange',
    hex: '#BD472A',
    usedIn: ['badge (orange variant)', 'alert (danger icon, warning icon)', 'form (error states)'],
  },
];

const alertSwatches = [
  {
    bg: '#EDF8FF',
    label: 'Info background',
    sub: '$info-light',
    hex: 'computed from $info',
    usedIn: ['alert--info'],
  },
  {
    bg: '#00558C',
    label: 'Info icon',
    sub: '$info',
    hex: '#00558C',
    usedIn: ['alert--info'],
  },
  {
    bg: '#EBFFFA',
    label: 'Success background',
    sub: '$success-light',
    hex: 'computed from $success',
    usedIn: ['alert--success'],
  },
  {
    bg: '#00664F',
    label: 'Success icon',
    sub: '$success',
    hex: '#00664F',
    usedIn: ['alert--success'],
  },
  {
    bg: '#FFF7D9',
    label: 'Warning background',
    sub: '$warning-light',
    hex: 'computed from $warning',
    usedIn: ['alert--warning'],
  },
  {
    bg: '#BD472A',
    label: 'Warning icon',
    sub: '$orange',
    hex: '#BD472A',
    usedIn: ['alert--warning (uses $orange, not $warning)'],
  },
  {
    bg: '#F7E2DD',
    label: 'Danger background',
    sub: '$danger-light',
    hex: 'computed from $danger',
    usedIn: ['alert--danger', 'form (error bg)', 'paragraphs (mark deletion)'],
  },
  {
    bg: '#BD472A',
    label: 'Danger icon',
    sub: '$danger',
    hex: '#BD472A',
    usedIn: ['alert--danger'],
  },
];

function grayPaletteTemplate() {
  return `
    <div style="${styles.page}">
      <h1 style="font-size:2rem;line-height:1.15;margin:0 0 0.75rem;">Gray Palette v2</h1>
      <p style="${styles.intro}">
        Final UIDS gray palette for digital and print contexts. White and black remain implicit brand/base colors and are not counted in this ramp.
        Existing legacy aliases remain in place during migration; removed stops are documented below.
      </p>

      ${section('Target Ramp', 'Use these variables for new gray references. <code>--uids-gray-mid</code> is retained in the ramp for borders and graphic accents only.', swatchGrid(grayRamp, 3))}

      ${section('Phasing Out', 'Deprecated values stay available for backwards compatibility, but new code should use the migration paths shown here.', table(['Old token', 'Hex', 'Migration path'], deprecatedRows))}

      ${section('Component Links', 'Components touched or reviewed by this migration. Storybook links open the closest available component story; source links are used where no story exists.', table(['Component', 'Color role', 'Change'], componentRows))}

      ${section('Contrast Checks', 'Ratios use WCAG relative luminance. The disabled text combination is documented for review because it is suitable only for large text.', table(['Pairing', 'Ratio', 'Result'], contrastRows))}
    </div>`;
}

export const GrayPaletteV2 = {
  name: 'Gray Palette v2',
  render: () => ({
    template: grayPaletteTemplate(),
  }),
};

export const AllColors = {
  name: 'All Colors',
  render: () => ({
    template: `<div style="${styles.page}">
      ${section('Brand', 'Core University of Iowa brand colors. <code>$primary</code> and <code>$secondary</code> remain the SCSS aliases used across almost every component.', swatchGrid(brandSwatches, 2))}

      ${section('Gray Palette v2', 'Current gray primitives and legacy aliases. Deprecated stops are shown in the dedicated <strong>Gray Palette v2</strong> story.', swatchGrid(grayRamp, 4))}

      ${section('Link', null, swatchGrid([
        {
          bg: 'var(--link-color)',
          label: 'Link',
          sub: '$link-color / --link-color',
          hex: '#00558C',
          usedIn: ['paragraphs (body links)', 'tables (links)', 'banner'],
        },
      ], 1))}

      ${section('Status', 'Used in badges and as the base colors for alert variants. Semantic status colors are intentionally out of scope for the gray palette migration.', swatchGrid(statusSwatches, 4))}

      ${section('Alert Colors', 'Each alert type uses a light computed background and a solid icon accent. Light variants have no CSS custom property - they are computed at build time via SCSS <code>color.scale()</code>.', swatchGrid(alertSwatches, 4))}
    </div>`,
  }),
};
