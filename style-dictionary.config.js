const REM_IN_PIXELS = 16;
const FLUID_EXTENSION = 'edu.uiowa.fluid';

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

const TYPOGRAPHY_MEMBERS = ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight'];

function hexFromComponents(components) {
  return `#${components.map((c) => Math.round(c * 255).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Style Dictionary accepts a typography composite that omits a member and a color whose
 * hex disagrees with its components. Both reach CSS: the first as a custom property the
 * Sass references but nothing defines, the second as a value nobody chose.
 */
export function validate(tokens, path = []) {
  for (const [key, node] of Object.entries(tokens)) {
    if (key.startsWith('$') || !node || typeof node !== 'object') continue;
    const here = [...path, key];
    const name = here.join('.');

    if (node.$type === 'typography' && node.$value && typeof node.$value === 'object') {
      for (const member of TYPOGRAPHY_MEMBERS) {
        if (!(member in node.$value)) throw new Error(`${name} is missing typography.${member}`);
      }
    }

    const value = node.$value;
    if (value && typeof value === 'object' && Array.isArray(value.components) && value.hex) {
      if (value.components.length !== 3 || value.components.some((c) => typeof c !== 'number' || c < 0 || c > 1)) {
        throw new Error(`${name} has sRGB components outside 0 through 1`);
      }
      const derived = hexFromComponents(value.components);
      if (derived.toLowerCase() !== value.hex.toLowerCase()) {
        throw new Error(`${name} hex ${value.hex} does not match its components, which are ${derived}`);
      }
    }

    if (!('$value' in node)) validate(node, here);
  }
  return tokens;
}

export default {
  usesDtcg: true,
  source: ['src/tokens/**/*.json'],
  expand: { include: ['typography'] },
  preprocessors: ['uids/validate'],
  hooks: {
    preprocessors: {
      'uids/validate': (tokens) => validate(tokens),
    },
    transforms: {
      'uids/fluid-font-size': {
        type: 'value',
        transitive: true,
        filter: (token) => token.$type === 'dimension'
          && token.path.at(-1) === 'fontSize'
          && Boolean(token.$extensions?.[FLUID_EXTENSION]),
        transform: fluidFontSize,
      },
    },
  },
  platforms: {
    scss: {
      transformGroup: 'css',
      transforms: ['uids/fluid-font-size'],
      prefix: 'uiowa',
      buildPath: 'src/scss/abstracts/',
      files: [
        {
          destination: '_tokens-generated.scss',
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
  },
};
