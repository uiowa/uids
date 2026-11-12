import StyleDictionary from 'style-dictionary';

const REM_IN_PIXELS = 16;
const FLUID_EXTENSION = 'edu.uiowa.fluid';
const RESPONSIVE_EXTENSION = 'edu.uiowa.responsive';

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
  if (!value || typeof value.value !== 'number') {
    throw new Error(`${name} must be a dimension`);
  }
  if (value.unit === 'px') return value.value;
  if (value.unit === 'rem') return value.value * REM_IN_PIXELS;
  throw new Error(`${name} must be a px or rem dimension`);
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

// Emits the standard CSS custom properties, then appends a min-width media block
// for every value declared under the UIDS responsive extension. The breakpoint is
// a token reference by name (e.g. `md`), so responsiveness stays out of token names.
export async function cssResponsive(args) {
  const { dictionary } = args;
  const byPath = new Map(dictionary.allTokens.map((token) => [token.path.join('.'), token]));
  const originalValue = (token) => token?.original?.$value ?? token?.$value;

  const referenceToVar = (value) => {
    const match = /^\{(.+)\}$/.exec(value);
    if (!match) return value;
    const token = byPath.get(match[1]);
    if (!token) throw new Error(`responsive override references unknown token "${value}"`);
    return `var(--${token.name})`;
  };

  const breakpointToRem = (key) => {
    let value = originalValue(byPath.get(`breakpoint.${key}`));
    const reference = typeof value === 'string' && /^\{(.+)\}$/.exec(value);
    if (reference) value = originalValue(byPath.get(reference[1]));
    if (!value || value.unit !== 'px' || typeof value.value !== 'number') {
      throw new Error(`responsive breakpoint "${key}" did not resolve to a px dimension`);
    }
    return `${decimal(value.value / REM_IN_PIXELS)}rem`;
  };

  // Base output is the existing css/variables result, minus breakpoint tokens.
  const base = await StyleDictionary.hooks.formats['css/variables']({
    ...args,
    dictionary: { ...dictionary, allTokens: dictionary.allTokens.filter((token) => !isBreakpoint(token)) },
  });

  const groups = {};
  for (const token of dictionary.allTokens) {
    const responsive = token.original?.$extensions?.[RESPONSIVE_EXTENSION];
    if (!responsive) continue;
    for (const [breakpoint, value] of Object.entries(responsive)) {
      (groups[breakpoint] ??= []).push(`    --${token.name}: ${referenceToVar(value)};`);
    }
  }

  const media = Object.entries(groups)
    .map(([breakpoint, lines]) => `@media (min-width: ${breakpointToRem(breakpoint)}) {\n  :root {\n${lines.join('\n')}\n  }\n}`)
    .join('\n\n');

  return media ? `${base}\n${media}\n` : base;
}

export default {
  usesDtcg: true,
  source: ['src/tokens/**/*.json'],
  expand: { include: ['typography'] },
  hooks: {
    formats: {
      'uids/css-responsive': cssResponsive,
    },
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
    },
  },
  platforms: {
    scss: {
      transformGroup: 'css',
      transforms: ['uids/fluid-font-size', 'uids/duration-css'],
      prefix: 'uiowa',
      buildPath: 'src/scss/abstracts/',
      files: [
        {
          destination: '_tokens-generated.scss',
          format: 'uids/css-responsive',
          options: { outputReferences: true },
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
