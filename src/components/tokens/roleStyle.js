import primitives from '../../tokens/primitives/typography.json';
import semantic from '../../tokens/semantic/typography.json';

// The typography roles as the stories set them, read from the token files. The roles are base + multiples: a role is
// held once with its multiple of the body size, and a hierarchy group inside it holds only what differs there; Body's
// multiple is 1, and its five sizes are the hierarchies. The Labels are one set, each a multiple of Body Medium.
const TREE = { typography: { ...primitives.typography, ...semantic.typography } };
const at = (path) => path.split('.').reduce((node, key) => node?.[key], TREE);
const deref = (value) => (typeof value === 'string' && value.startsWith('{') ? deref(at(value.slice(1, -1)).$value) : value);
const CHANNELS = ['font-family', 'font-weight', 'font-size', 'line-height', 'letter-spacing'];
const camel = (name) => name.replace(/-(\w)/g, (_, letter) => letter.toUpperCase());

/** The hierarchies, X-Small to X-Large: the keys under typography.body that hold a body size. */
export const HIERARCHIES = Object.keys(at('typography.body')).filter((key) => at(`typography.body.${key}.fontSize`));
/** The sizes a family comes in: a role, every hierarchy; Label, its own three. */
export const sizesOf = (family) => (family === 'label'
  ? ['large', 'medium', 'small'].filter((size) => at(`typography.label.${size}`))
  : HIERARCHIES);
/** A style key such as 'subhead-2-x-small' as [family, size]; a family and a size can each carry a hyphen. */
export const splitKey = (key) => key.match(/^(.+?)-(x-small|small|medium|large|x-large)$/)?.slice(1) ?? [];

/** A style's face, weight, leading, multiple, size in px, and the classes that set it. */
export function roleSpec(family, size) {
  const isLabel = family === 'label';
  const own = (channel) => at(`typography.${family}.${size}.${channel}`) ?? at(`typography.${family}.${channel}`);
  const sizeToken = at(isLabel ? `typography.label.${size}.fontSize` : `typography.body.${size}.fontSize`);
  let by = 1;
  if (isLabel) by = sizeToken.$extensions['edu.uiowa.multiply'].by;
  else if (family !== 'body') by = deref(at(`typography.${family}.multiple`).$value);
  return {
    face: deref(own('fontFamily').$value)[0],
    weight: deref(own('fontWeight').$value),
    leading: deref(own('lineHeight').$value),
    by,
    px: by * deref(sizeToken.$value).value * 16,
    classes: isLabel ? `type-label--${size}` : `type-scale--${size} type-${family}`,
  };
}

/**
 * A style's declarations through the live custom properties, as the role classes set them: the role's own properties,
 * and its size as the hierarchy's body size times the role's multiple; a hierarchy's own line height wins where it has
 * one. Keyed by CSS property name.
 */
export function roleDeclarations(family, size) {
  if (family === 'label') return Object.fromEntries(CHANNELS.map((name) => [name, `var(--uiowa-typography-label-${size}-${name})`]));
  const base = `var(--uiowa-typography-body-${size}-font-size)`;
  const ownLineHeight = Boolean(at(`typography.${family}.${size}.lineHeight`));
  return {
    'font-family': `var(--uiowa-typography-${family}-font-family)`,
    'font-weight': `var(--uiowa-typography-${family}-font-weight)`,
    'font-size': family === 'body' ? base : `calc(${base} * var(--uiowa-typography-${family}-multiple))`,
    'line-height': ownLineHeight ? `var(--uiowa-typography-${family}-${size}-line-height)` : `var(--uiowa-typography-${family}-line-height)`,
    'letter-spacing': `var(--uiowa-typography-${family}-letter-spacing)`,
  };
}
/** The same declarations as a Vue style object. */
export const roleStyle = (family, size) => Object.fromEntries(Object.entries(roleDeclarations(family, size)).map(([name, value]) => [camel(name), value]));
/** The same declarations as CSS text. */
export const roleCss = (family, size) => Object.entries(roleDeclarations(family, size)).map(([name, value]) => `${name}:${value}`).join(';');
/** A text gap, related or break, in a hierarchy: its body size times the gap's multiplier. */
export const gapSize = (size, gap) => `calc(var(--uiowa-typography-body-${size}-font-size) * var(--uiowa-typography-scale-${gap}))`;
