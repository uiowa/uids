import { readFileSync } from 'node:fs';

const REM_IN_PIXELS = 16;
const FLUID_EXTENSION = 'edu.uiowa.fluid';

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
    // A reference to a font-size token arrives resolved to its CSS value.
    if (typeof fluid.max === 'string') return rem(fluid.max, 'edu.uiowa.fluid.max');
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

const MULTIPLY_EXTENSION = 'edu.uiowa.multiply';

// The custom property a reference such as {typography.body.medium.fontSize} is written to. The prefix
// must match each platform's `prefix` below, or the calc() points at nothing.
function referenceName(reference) {
  const path = reference.slice(1, -1).split('.');
  return `--uiowa-${path.map((part) => part.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()).join('-')}`;
}

/**
 * Turns the explicit `edu.uiowa.multiply` metadata on a size or space token into a calc(): the
 * token's own reference times a multiplier, either a multiplier token or a number. The reference
 * stays a custom property.
 */
export function multipliedSize(token) {
  const { by } = token.original.$extensions[MULTIPLY_EXTENSION];
  const multiplier = typeof by === 'number' ? by : `var(${referenceName(by)})`;
  return `calc(var(${referenceName(token.original.$value)}) * ${multiplier})`;
}

const isMultiplied = (token) => Boolean(token.$extensions?.[MULTIPLY_EXTENSION]);

export const isBreakpoint = (token) => token.path[0] === 'breakpoint'
  || (token.path[0] === 'layout' && token.path[1] === 'breakpoint');

export function breakpointRem(token) {
  const value = token.$value;
  if (!value || value.unit !== 'px' || typeof value.value !== 'number') {
    throw new Error(`${token.path.join('.')} must be a px dimension`);
  }
  return `${decimal(value.value / REM_IN_PIXELS)}rem`;
}

const ROLE_FAMILIES = ['headline', 'headline-6x', 'headline-8x', 'eyebrow', 'subhead', 'subhead-2', 'body', 'small-print', 'label'];
export const isRole = (token) => token.path[0] === 'typography' && token.path.length === 4
  && (ROLE_FAMILIES.includes(token.path[1]) || token.path[1] === 'space' || token.path[1] === 'highlight');

// A size in rem, px at the 16px root, and pt (1pt = 4/3px).
function resolvedSize(remValue) {
  const px = remValue * REM_IN_PIXELS;
  return { rem: Number(decimal(remValue)), px: Number(decimal(px)), pt: Number(decimal(px * 0.75)) };
}

/**
 * The typography roles, resolved, for tools that read numbers rather than CSS, such as an agent building
 * print templates: each role style's face, weight, leading and size in rem, px and pt, and each text gap.
 * Points are never stored in a token; they are worked out here from the rem the token resolves to.
 */
export function typographyRoles({ dictionary }) {
  const byPath = new Map(dictionary.allTokens.map((token) => [token.path.join('.'), token]));
  // Style Dictionary drops a group's $description, so the descriptions come from the source file.
  const source = JSON.parse(readFileSync(new URL('./src/tokens/semantic/typography.json', import.meta.url), 'utf8'));
  const group = (path) => path.reduce((node, key) => node?.[key], source);
  // A multiplied size's multiplier: a number, or a reference to a number token; 1 when it has none.
  const multiplierOf = (token) => {
    const by = token.original.$extensions?.[MULTIPLY_EXTENSION]?.by;
    if (by === undefined) return 1;
    if (typeof by === 'number') return by;
    return byPath.get(by.slice(1, -1)).$value;
  };
  const remOf = (token) => {
    if (token.$value?.unit !== 'rem') throw new Error(`${token.path.join('.')} must resolve to rem`);
    return token.$value.value * multiplierOf(token);
  };
  const out = {
    $description: 'The UIDS typography roles, resolved from src/tokens: sizes in rem, px (at the 16px root) and pt (1pt = 4/3px). Generated by yarn build:tokens; do not edit.',
  };
  for (const token of dictionary.allTokens.filter(isRole)) {
    if (token.path[1] === 'space') {
      out[token.path.join('.')] = { ...resolvedSize(remOf(token)), description: group(token.path.slice(0, 3)).$description };
      continue;
    }
    const key = token.path.slice(0, 3).join('.');
    out[key] ??= { description: group(token.path.slice(0, 3)).$description ?? group(token.path.slice(0, 2)).$description };
    const channel = token.path[3];
    if (channel === 'fontSize') out[key].fontSize = resolvedSize(remOf(token));
    else if (channel === 'fontFamily') out[key].fontFamily = token.$value[0];
    else out[key][channel] = token.$value;
  }
  return `${JSON.stringify(out, null, 2)}\n`;
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
      'uids/multiply': {
        type: 'value',
        transitive: true,
        filter: isMultiplied,
        transform: multipliedSize,
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
    formats: {
      'uids/typography-roles': typographyRoles,
    },
  },
  platforms: {
    scss: {
      transformGroup: 'css',
      transforms: ['uids/fluid-font-size', 'uids/multiply', 'uids/duration-css'],
      prefix: 'uiowa',
      buildPath: 'src/scss/abstracts/',
      files: [
        {
          destination: '_tokens-generated.scss',
          format: 'css/variables',
          // A multiplied size prints its calc(), not a reference to the body size it starts from.
          options: { outputReferences: (token) => !isMultiplied(token) },
          filter: (token) => !isBreakpoint(token),
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
    // No transforms: the format reads each token's resolved DTCG value and works out the sizes itself.
    roles: {
      buildPath: 'dist/',
      files: [{ destination: 'typography-roles.json', format: 'uids/typography-roles' }],
    },
  },
};
