const REM_IN_PIXELS = 16;
const FLUID_EXTENSION = 'edu.uiowa.fluid';
const DARK_EXTENSION = 'edu.uiowa.dark';

// Style Dictionary does not calculate a responsive font size from the UIDS fluid
// extension, so these helpers validate that metadata and convert it to clamp().
function decimal(value) {
  return String(Number(value.toFixed(4)));
}

function rem(value, name) {
  const match = /^(-?(?:\d+\.?\d*|\.\d+))rem$/.exec(String(value));
  if (!match) throw new Error(`${name} must resolve to rem`);
  return Number(match[1]);
}

function pixelDimension(value, name) {
  if (!value || value.unit !== 'px' || typeof value.value !== 'number') {
    throw new Error(`${name} must be a px dimension`);
  }
  return value.value;
}

function maximumSize(minimumRem, fluid) {
  if (fluid.max) {
    if (fluid.max.unit !== 'rem' || typeof fluid.max.value !== 'number') {
      throw new Error('edu.uiowa.fluid.max must be a rem dimension');
    }
    return fluid.max.value;
  }

  if (fluid.strategy === 'exponential' && typeof fluid.exponent === 'number') {
    return Number((minimumRem ** fluid.exponent).toFixed(4));
  }

  throw new Error('edu.uiowa.fluid must declare max or an exponential strategy and exponent');
}

/**
 * Turns the explicit `edu.uiowa.fluid` metadata on an expanded typography
 * fontSize token into its CSS value.
 */
export function fluidFontSize(token) {
  const fluid = token.$extensions?.[FLUID_EXTENSION];
  const minimumRem = rem(token.$value, 'fluid fontSize minimum');
  const maximumRem = maximumSize(minimumRem, fluid);
  const minimumViewport = pixelDimension(fluid.minViewport, 'edu.uiowa.fluid.minViewport');
  const maximumViewport = pixelDimension(fluid.maxViewport, 'edu.uiowa.fluid.maxViewport');

  if (maximumViewport <= minimumViewport) {
    throw new Error('edu.uiowa.fluid.maxViewport must exceed minViewport');
  }
  if (maximumRem === minimumRem) return `${minimumRem}rem`;

  const minimumPixels = minimumRem * REM_IN_PIXELS;
  const maximumPixels = maximumRem * REM_IN_PIXELS;
  const slope = Number((((maximumPixels - minimumPixels) / (maximumViewport - minimumViewport)) * 100).toFixed(4));
  const intercept = (minimumPixels - (slope / 100) * minimumViewport) / REM_IN_PIXELS;

  return `clamp(${decimal(minimumRem)}rem, calc(${decimal(slope)}vw + ${decimal(intercept)}rem), ${decimal(maximumRem)}rem)`;
}

export const isBreakpoint = (token) => token.path[0] === 'breakpoint'
  || (token.path[0] === 'layout' && token.path[1] === 'breakpoint');

export function breakpointRem(token) {
  const value = token.$value;
  if (!value || value.unit !== 'px' || typeof value.value !== 'number') {
    throw new Error(`${token.path.join('.')} must be a px dimension`);
  }
  return `${decimal(value.value / REM_IN_PIXELS)}rem`;
}

// A group's own token is written `$root` in DTCG; its custom property takes the
// group's name, so `color.text.$root` is `--uiowa-color-text`.
export const isRootToken = (token) => token.path.at(-1) === '$root';

export const hasDarkValue = (token) => Boolean(token.original.$extensions?.[DARK_EXTENSION]);

/**
 * Writes a token's `edu.uiowa.dark` reference as the referenced custom property.
 * Style Dictionary resolves references inside $extensions, so the reference is
 * read from the token's source.
 */
export function darkValue(token, tokensByPath) {
  const reference = /^\{([^}]+)\}$/.exec(token.original.$extensions[DARK_EXTENSION]);
  const target = reference && tokensByPath.get(reference[1]);
  if (!target) throw new Error(`${token.path.join('.')}: ${DARK_EXTENSION} must reference a token`);
  return `var(--${target.name})`;
}

function darkDeclarations(dictionary) {
  const tokensByPath = new Map(dictionary.unfilteredAllTokens.map((token) => [token.path.join('.'), token]));
  return [
    'color-scheme: dark;',
    ...dictionary.allTokens.map((token) => `--${token.name}: ${darkValue(token, tokensByPath)};`),
  ];
}

/**
 * Dark mode follows the operating system unless the page sets
 * data-theme="light" or data-theme="dark" on its root element.
 */
export function darkModeCss({ dictionary }) {
  const declarations = darkDeclarations(dictionary);
  const block = (indent) => declarations.map((line) => `${indent}${line}`).join('\n');

  return [
    '/**',
    ' * Do not edit directly, this file was auto-generated.',
    ' */',
    '',
    ':root[data-theme="dark"] {',
    block('  '),
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  :root:not([data-theme="light"]) {',
    block('    '),
    '  }',
    '}',
    '',
  ].join('\n');
}

/**
 * The same dark values as a Sass mixin, for a page that marks its color mode
 * some other way than data-theme (see src/scss/qualtrics.scss).
 */
export function darkModeMixin({ dictionary }) {
  return [
    '// Do not edit directly, this file was auto-generated.',
    '',
    '@mixin dark-mode {',
    ...darkDeclarations(dictionary).map((line) => `  ${line}`),
    '}',
    '',
  ].join('\n');
}

export default {
  usesDtcg: true,
  source: ['src/tokens/**/*.json'],
  expand: { include: ['typography'] },
  hooks: {
    transforms: {
      // Run only on the fontSize member created when Style Dictionary expands a
      // typography composite carrying the UIDS fluid extension.
      'uids/fluid-font-size': {
        type: 'value',
        transitive: true,
        filter: (token) => token.$type === 'dimension'
          && token.path.at(-1) === 'fontSize'
          && Boolean(token.$extensions?.[FLUID_EXTENSION]),
        transform: fluidFontSize,
      },
      'uids/duration-css': {
        type: 'value',
        filter: (token) => token.$type === 'duration',
        transform: (token) => `${token.$value.value}${token.$value.unit}`,
      },
      'uids/breakpoint-rem': {
        type: 'value',
        filter: isBreakpoint,
        transform: breakpointRem,
      },
      'uids/name-root': {
        type: 'name',
        filter: isRootToken,
        transform: (token) => token.name.replace(/-root$/, ''),
      },
    },
    formats: {
      'uids/css-dark': darkModeCss,
      'uids/scss-dark-mixin': darkModeMixin,
    },
  },
  platforms: {
    scss: {
      transformGroup: 'css',
      transforms: ['uids/fluid-font-size', 'uids/duration-css', 'uids/name-root'],
      prefix: 'uiowa',
      buildPath: 'src/scss/abstracts/',
      files: [
        {
          destination: '_tokens-generated.scss',
          format: 'css/variables',
          options: { outputReferences: true },
          filter: (token) => !isBreakpoint(token),
        },
        {
          destination: '_tokens-dark-generated.scss',
          format: 'uids/css-dark',
          filter: hasDarkValue,
        },
        {
          destination: '_tokens-dark-mixin-generated.scss',
          format: 'uids/scss-dark-mixin',
          filter: hasDarkValue,
        },
      ],
    },
    breakpoints: {
      transforms: ['name/kebab', 'uids/breakpoint-rem'],
      prefix: 'uiowa',
      buildPath: 'src/scss/abstracts/',
      files: [
        {
          destination: '_breakpoints-generated.scss',
          format: 'scss/variables',
          filter: isBreakpoint,
        },
      ],
    },
  },
};
