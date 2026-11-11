// Formats the tokens as the tokens.json of a Claude Design System artifact.

const TYPOGRAPHY_PARTS = new Set(['fontFamily', 'fontWeight', 'fontSize', 'letterSpacing', 'lineHeight']);
const FLUID_EXTENSION = 'edu.uiowa.fluid';
const GROUP_DESCRIPTION = 'edu.uiowa.group-description';

const isTypographyPart = (token) => token.path[0] === 'typography' && TYPOGRAPHY_PARTS.has(token.path.at(-1));

function referencedPath(value) {
  const match = typeof value === 'string' ? /^\{([^}]+)\}$/.exec(value) : null;
  return match ? match[1] : null;
}

// The artifact accepts only a single length for a type style's size.
function largestSize(value) {
  const match = /^clamp\((.+),\s*([^,]+)\)$/.exec(value);
  return match ? match[2].trim() : value;
}

function titleCase(segment) {
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
}

export function recordGroupDescriptions(node, inherited) {
  if (Object.hasOwn(node, '$value')) {
    return inherited
      ? { ...node, $extensions: { ...node.$extensions, [GROUP_DESCRIPTION]: inherited } }
      : node;
  }
  const description = node.$description ?? inherited;
  return Object.fromEntries(Object.entries(node).map(([key, child]) => [
    key,
    !key.startsWith('$') && child && typeof child === 'object' ? recordGroupDescriptions(child, description) : child,
  ]));
}

const usage = (token) => token.$description ?? token.$extensions?.[GROUP_DESCRIPTION];

export function designSystemTokens({ dictionary }) {
  const byPath = new Map(dictionary.allTokens.map((token) => [token.path.join('.'), token]));

  function entry(token, value = token.$value) {
    return usage(token) ? { name: token.name, value, usage: usage(token) } : { name: token.name, value };
  }

  function colorValue(token) {
    const target = byPath.get(referencedPath(token.original.$value));
    return target?.$type === 'color' ? `{${target.name}}` : token.$value;
  }

  const families = {};
  const fontStacks = {};
  const fontKeys = new Map();
  const styles = new Map();
  const tokens = {
    name: 'UIDS',
    version: 1,
    color: { themes: [{ id: 'light', name: 'Light' }], tokens: [] },
    type: { fonts: [], families: fontStacks, groups: [] },
    spacing: { tokens: [] },
    radius: { tokens: [] },
    shadow: { tokens: [] },
  };

  for (const token of dictionary.allTokens) {
    if (token.$type === 'fontFamily' && !isTypographyPart(token)) {
      fontStacks[token.path.at(-1)] = token.$value;
      fontKeys.set(token.$value, token.path.at(-1));
    } else if (isTypographyPart(token)) {
      const stylePath = token.path.slice(0, -1);
      const key = stylePath.join('.');
      if (!styles.has(key)) {
        styles.set(key, {
          group: stylePath.length > 2 ? titleCase(stylePath[1]) : 'Text',
          style: { name: stylePath.at(-1), usage: usage(token) },
        });
      }
      const { style } = styles.get(key);
      const part = token.path.at(-1);
      if (part === 'fontFamily') {
        style.family = token.$value;
      } else if (part === 'fontSize') {
        style.fontSize = largestSize(token.$value);
        const fluid = token.$extensions?.[FLUID_EXTENSION];
        if (style.fontSize !== token.$value && fluid) {
          const note = `Fluid: ${token.$value} between ${fluid.minViewport.value}px and ${fluid.maxViewport.value}px viewports. This value is the largest size.`;
          style.usage = style.usage ? `${style.usage} ${note}` : note;
        }
      } else {
        style[part] = token.$value;
      }
    } else if (token.$type === 'color') {
      tokens.color.tokens.push(entry(token, colorValue(token)));
    } else if (token.path[0] === 'space') {
      tokens.spacing.tokens.push(entry(token));
    } else if (token.path[0] === 'radius') {
      tokens.radius.tokens.push(entry(token));
    } else if (token.$type === 'shadow') {
      tokens.shadow.tokens.push(entry(token));
    } else {
      const family = token.path[0] === 'motion' ? token.$type : token.path[0];
      families[family] ??= { tokens: [] };
      families[family].tokens.push(entry(token));
    }
  }

  for (const { group, style } of styles.values()) {
    style.family = fontKeys.get(style.family);
    let target = tokens.type.groups.find((candidate) => candidate.name === group);
    if (!target) {
      target = { name: group, family: style.family, styles: [] };
      tokens.type.groups.push(target);
    }
    if (!style.usage) delete style.usage;
    target.styles.push(style);
  }

  return `${JSON.stringify({ ...tokens, ...families }, null, 2)}\n`;
}
