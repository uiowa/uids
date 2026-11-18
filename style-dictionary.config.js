import { readFileSync } from 'node:fs';
import StyleDictionary from 'style-dictionary';

const REM_IN_PIXELS = 16;
const FLUID_EXTENSION = 'edu.uiowa.fluid';
const RESPONSIVE_EXTENSION = 'edu.uiowa.responsive';
const VARIANT_EXTENSION = 'edu.uiowa.variant';
const VARIANT_SELECTORS_EXTENSION = 'edu.uiowa.variants';

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

// Style Dictionary hands fluid metadata to the transform in two shapes. On an
// expanded typography member the references are resolved to dimension objects; on a
// standalone token they arrive as transformed CSS strings such as "2.2rem".
function dimension(value) {
  const match = typeof value === 'string' && /^(-?(?:\d+\.?\d*|\.\d+))(px|rem)$/.exec(value);
  return match ? { value: Number(match[1]), unit: match[2] } : value;
}

const isUnresolved = (value) => typeof value === 'string' && value.includes('{');

function pixelDimension(dimensionValue, name) {
  const value = dimension(dimensionValue);
  if (!value || typeof value.value !== 'number') {
    throw new Error(`${name} must be a dimension`);
  }
  if (value.unit === 'px') return value.value;
  if (value.unit === 'rem') return value.value * REM_IN_PIXELS;
  throw new Error(`${name} must be a px or rem dimension`);
}

function maximumSize(minimumRem, fluid) {
  if (fluid.max) {
    const max = dimension(fluid.max);
    if (max.unit !== 'rem' || typeof max.value !== 'number') {
      throw new Error('edu.uiowa.fluid.max must be a rem dimension');
    }
    return max.value;
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

// A font size carrying the UIDS fluid extension: either a standalone `font-size`
// dimension token, or the fontSize member created when Style Dictionary expands a
// typography composite.
export const isFluidFontSize = (token) => token.$type === 'dimension'
  && ['fontSize', 'font-size'].includes(token.path.at(-1))
  && Boolean(token.$extensions?.[FLUID_EXTENSION]);

export const isBreakpoint = (token) => token.path[0] === 'breakpoint'
  || (token.path[0] === 'layout' && token.path[1] === 'breakpoint');

export function breakpointRem(token) {
  const value = token.$value;
  if (!value || value.unit !== 'px' || typeof value.value !== 'number') {
    throw new Error(`${token.path.join('.')} must be a px dimension`);
  }
  return `${decimal(value.value / REM_IN_PIXELS)}rem`;
}

// The override extensions are read from the token's source file rather than from
// Style Dictionary's token objects, for two reasons: Style Dictionary drops
// `$extensions` declared on a group, and it resolves the references inside a
// composite's extensions before expanding it, copying the result to every member.
const sourceFiles = new Map();

function sourceFile(token) {
  if (!sourceFiles.has(token.filePath)) {
    sourceFiles.set(token.filePath, JSON.parse(readFileSync(token.filePath, 'utf8')));
  }
  return sourceFiles.get(token.filePath);
}

const isObject = (value) => Boolean(value) && typeof value === 'object';

/**
 * Returns the `{ context: reference }` overrides a token declares under an
 * extension. A composite token (typography) keys each override by member, e.g.
 * `{ "narrow": { "fontSize": "{typography.font-size.100}" } }`, and each expanded
 * member receives only its own entry.
 */
export function overrides(token, extension) {
  if (!token.filePath) {
    // Without filePath there is no file to re-read, so only plain references work.
    const declared = token.original?.$extensions?.[extension] ?? {};
    for (const [context, value] of Object.entries(declared)) {
      if (typeof value !== 'string') {
        throw new Error(`${token.path.join('.')} ${extension}.${context}: tokens without a filePath support only plain token references`);
      }
    }
    return declared;
  }

  const name = token.path.join('.');
  let node = sourceFile(token);
  let member;
  for (const [index, key] of token.path.entries()) {
    if (isObject(node) && Object.hasOwn(node, '$value') && index === token.path.length - 1) {
      member = key;
      break;
    }
    node = node?.[key];
  }

  const declared = node?.$extensions?.[extension];
  if (!declared) return {};

  const result = {};
  for (const [context, value] of Object.entries(declared)) {
    if (member === undefined) {
      if (typeof value !== 'string') throw new Error(`${name} ${extension}.${context} must be a token reference`);
      result[context] = value;
    } else {
      if (!isObject(value)) {
        throw new Error(`${token.path.slice(0, -1).join('.')} ${extension}.${context} must key its overrides by member, e.g. { "${member}": "{...}" }`);
      }
      if (typeof value[member] === 'string') result[context] = value[member];
    }
  }
  return result;
}

// Before expanding a composite, Style Dictionary resolves every member reference
// that points at an object- or array-valued token (fontFamily, dimensions), so the
// expanded member no longer knows it was a reference and outputReferences cannot
// emit var(). This returns the member's reference as written in the source file.
export function compositeMemberReference(token) {
  if (!token.filePath || token.path.length < 2) return undefined;

  let node = sourceFile(token);
  for (const key of token.path.slice(0, -1)) node = node?.[key];

  const composite = node?.$value;
  if (!isObject(composite) || Array.isArray(composite)) return undefined;

  const member = composite[token.path.at(-1)];
  return typeof member === 'string' && /^\{[^{}]+\}$/.test(member) ? member : undefined;
}

// The nearest group that maps the variant to a selector wins; without one the
// selector follows the BEM modifier convention, `.{component}--{variant}`.

export function variantSelector(token, variant) {
  if (!/^[a-z][a-z0-9-]*$/.test(variant)) {
    throw new Error(`${token.path.join('.')} declares an invalid variant name "${variant}"`);
  }

  let selector = `.${token.path[0]}--${variant}`;
  // Without filePath the group's selector map is gone, so the default applies.
  if (!token.filePath) return selector;

  let group = sourceFile(token);
  for (const key of token.path.slice(0, -1)) {
    group = group?.[key];
    selector = group?.$extensions?.[VARIANT_SELECTORS_EXTENSION]?.[variant] ?? selector;
  }
  return selector;
}

// Emits the standard CSS custom properties, then appends a min-width media block
// for every value declared under the UIDS responsive extension, and a selector
// block for every value declared under the UIDS variant extension. Breakpoints and
// variants re-point the same custom property, so neither appears in a token name.
export async function cssResponsive(args) {
  const { dictionary } = args;
  const byPath = new Map(dictionary.allTokens.map((token) => [token.path.join('.'), token]));
  const originalValue = (token) => token?.original?.$value ?? token?.$value;

  const referenceToVar = (value) => {
    const match = /^\{(.+)\}$/.exec(value);
    if (!match) return value;
    const token = byPath.get(match[1]);
    if (!token) throw new Error(`override references unknown token "${value}"`);
    return `var(--${token.name})`;
  };

  // Follows the source references down to the px value. Style Dictionary's resolved
  // $value is already a transformed CSS string whose unit depends on the platform.
  // Circular references stop the build before this format runs.
  const breakpointPixels = (key) => {
    let path = `breakpoint.${key}`;
    let value;
    for (;;) {
      const token = byPath.get(path);
      if (!token) throw new Error(`responsive breakpoint "${key}" references unknown token "${path}"`);
      value = originalValue(token);
      const reference = typeof value === 'string' && /^\{(.+)\}$/.exec(value);
      if (!reference) break;
      path = reference[1];
    }
    if (!value || value.unit !== 'px' || typeof value.value !== 'number') {
      throw new Error(`responsive breakpoint "${key}" did not resolve to a px dimension`);
    }
    return value.value;
  };

  // Restores each composite member's source reference so css/variables can emit it.
  const withMemberReference = (token) => {
    const reference = compositeMemberReference(token);
    if (!reference || reference === token.original?.$value) return token;
    return { ...token, original: { ...token.original, $value: reference } };
  };

  // Base output is the existing css/variables result, minus breakpoint tokens.
  const base = await StyleDictionary.hooks.formats['css/variables']({
    ...args,
    dictionary: {
      ...dictionary,
      allTokens: dictionary.allTokens.filter((token) => !isBreakpoint(token)).map(withMemberReference),
    },
  });

  const groups = {};
  for (const token of dictionary.allTokens) {
    for (const [breakpoint, value] of Object.entries(overrides(token, RESPONSIVE_EXTENSION))) {
      (groups[breakpoint] ??= []).push(`    --${token.name}: ${referenceToVar(value)};`);
    }
  }

  // Every block sets the same properties with equal specificity, so the last match
  // wins. Emit narrowest first so the widest matching breakpoint applies.
  const media = Object.entries(groups)
    .map(([breakpoint, lines]) => [breakpointPixels(breakpoint), lines])
    .sort(([a], [b]) => a - b)
    .map(([pixels, lines]) => `@media (min-width: ${decimal(pixels / REM_IN_PIXELS)}rem) {\n  :root {\n${lines.join('\n')}\n  }\n}`)
    .join('\n\n');

  const selectors = {};
  for (const token of dictionary.allTokens) {
    for (const [variant, value] of Object.entries(overrides(token, VARIANT_EXTENSION))) {
      (selectors[variantSelector(token, variant)] ??= []).push(`  --${token.name}: ${referenceToVar(value)};`);
    }
  }

  const variants = Object.entries(selectors)
    .map(([selector, lines]) => `${selector} {\n${lines.join('\n')}\n}`)
    .join('\n\n');

  return [base.trimEnd(), media, variants].filter(Boolean).join('\n\n').concat('\n');
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
      'uids/fluid-font-size': {
        type: 'value',
        transitive: true,
        filter: isFluidFontSize,
        // Returning undefined defers the transform until Style Dictionary has
        // resolved the references inside the fluid metadata.
        transform: (token) => (
          Object.values(token.$extensions[FLUID_EXTENSION]).some(isUnresolved) ? undefined : fluidFontSize(token)
        ),
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
          // A fluid font size must emit its clamp(), not the token it starts from.
          options: { outputReferences: (token) => !isFluidFontSize(token) },
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
