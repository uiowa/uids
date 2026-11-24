// 1099's token file before the switch to base + multiples (2026-11-17), frozen: the named sizes, and the file both
// prototypes are generated from, so the page keeps comparing the two after the switch.
import semantic from './typography-named.json';

// Two prototypes of a hierarchy switch over the typography roles. Both are generated from the token file and both give
// the same classes, .type-scale--<hierarchy> on a container and .type-<role> on the text, so the markup is the same:
// - Named sizes keeps a token for every role in every hierarchy; the class points each role at its hierarchy's tokens.
// - Base + multiples keeps the five body sizes and each role once; the class sets the body size, and CSS multiplies.
// The --uiowa-type-* names are placeholders.
export const SCALES = ['x-small', 'small', 'medium', 'large', 'x-large'];
// The headline's steps are roles of their own, so a headline takes its step from its own class.
export const SCALED_ROLES = ['eyebrow', 'headline', 'headline-6x', 'headline-8x', 'subhead', 'subhead-2', 'body', 'small-print'];
const PROPERTIES = ['font-family', 'font-weight', 'font-size', 'line-height', 'letter-spacing'];
const TOKENS = semantic.typography;
const kebab = (key) => key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
const countTokens = (node) => Object.entries(node).filter(([key]) => !key.startsWith('$'))
  .reduce((n, [, child]) => n + ('$value' in child ? 1 : countTokens(child)), 0);
const LABELS = countTokens(TOKENS.label);

// A rule is [selector, declarations]. With a scope, :root becomes the scope and every other selector sits inside it,
// so one page can run both prototypes side by side.
function renderRule([selector, declarations], scope) {
  const scoped = scope ? selector.split(', ').map((part) => (part === ':root' ? scope : `${scope} ${part}`)).join(', ') : selector;
  return `${scoped} {\n${declarations.map(([name, value]) => `  ${name}: ${value};`).join('\n')}\n}`;
}
export const renderRules = (rules, scope) => rules.map((rule) => renderRule(rule, scope)).join('\n');
// Medium's class also sits on :root, which makes it the default.
const scaleSelector = (scale) => (scale === 'medium' ? ':root, .type-scale--medium' : `.type-scale--${scale}`);

/* Named sizes: the token file as it is. */

const sized = (role, scale, property) => `var(--uiowa-typography-${role}-${scale}-${property})`;

/** One hierarchy's class: every role property pointed at that hierarchy's token. */
export function namedScaleRule(scale) {
  return [scaleSelector(scale), [
    ...SCALED_ROLES.flatMap((role) => PROPERTIES.map((property) => [`--uiowa-type-${role}-${property}`, sized(role, scale, property)])),
    ['--uiowa-type-subhead-2-font-weight-emphasis', sized('subhead-2', scale, 'font-weight-emphasis')],
    ['--uiowa-type-space-related', `var(--uiowa-typography-space-related-${scale})`],
    ['--uiowa-type-space-break', `var(--uiowa-typography-space-break-${scale})`],
  ]];
}

/** A role's class: its five properties, read from what the hierarchy class points at. */
export const namedRoleRule = (role) => [`.type-${role}`, PROPERTIES.map((property) => [property, `var(--uiowa-type-${role}-${property})`])];

// A reference such as {typography.body.x-small.fontSize} as the custom property the build writes for it.
const refVar = (value) => (typeof value === 'string' && value.startsWith('{') ? `var(--uiowa-${value.slice(1, -1).split('.').map(kebab).join('-')})` : String(value));
/** The named tokens as the build printed them before the switch: every role property in every hierarchy, and the gaps. */
function namedTokenRule() {
  const declarations = [];
  for (const role of SCALED_ROLES) {
    for (const scale of SCALES) {
      for (const [key, token] of Object.entries(TOKENS[role][scale])) {
        if (key.startsWith('$')) continue;
        const by = token.$extensions?.['edu.uiowa.multiply']?.by;
        declarations.push([`--uiowa-typography-${role}-${scale}-${kebab(key)}`, by === undefined ? refVar(token.$value) : `calc(${refVar(token.$value)} * ${by})`]);
      }
    }
  }
  for (const gap of ['related', 'break']) {
    for (const scale of SCALES) {
      const token = TOKENS.space[gap][scale];
      declarations.push([`--uiowa-typography-space-${gap}-${scale}`, `calc(${refVar(token.$value)} * ${refVar(token.$extensions['edu.uiowa.multiply'].by)})`]);
    }
  }
  return [':root', declarations];
}

export const namedRules = () => [
  namedTokenRule(),
  ...SCALES.map(namedScaleRule),
  ...SCALED_ROLES.map(namedRoleRule),
  ['.type-eyebrow', [['text-transform', 'uppercase']]],
  ['.type-subhead-2 :is(strong, b)', [['font-weight', 'var(--uiowa-type-subhead-2-font-weight-emphasis)']]],
];

const namedRoleTokens = SCALED_ROLES.reduce((n, role) => n + SCALES.reduce((m, scale) => m + countTokens(TOKENS[role][scale]), 0), 0);
export const NAMED_COUNT = { total: namedRoleTokens + LABELS, roles: namedRoleTokens, labels: LABELS };
export const namedJson = (role) => JSON.stringify({ [role]: TOKENS[role] }, null, 2);

/* Base + multiples: derived from the same token file. */

const ROLE_KEYS = ['fontFamily', 'fontWeight', 'fontWeightEmphasis', 'lineHeight', 'letterSpacing'];
const multipleOf = (token) => token.fontSize.$extensions?.['edu.uiowa.multiply']?.by;
const plain = ({ $type, $value, $description }) => ({ $type, $value, ...($description ? { $description } : {}) });

/**
 * Each role once: Medium's values, its multiple of the body size, and under a hierarchy only what differs from
 * Medium. Body has no multiple; its five sizes are the bases.
 */
export const BASE_MULTIPLES = Object.fromEntries(SCALED_ROLES.map((role) => {
  const group = TOKENS[role];
  const core = group.medium;
  const by = multipleOf(core);
  const definition = group.$description ? { $description: group.$description } : {};
  if (by !== undefined) definition.multiple = { $type: 'number', $value: by };
  for (const key of ROLE_KEYS) if (core[key]) definition[key] = plain(core[key]);
  for (const scale of SCALES) {
    const token = group[scale];
    // A body size's description names the formats its hierarchy serves; it stays with the size.
    const differs = token.$description ? { $description: token.$description } : {};
    if (by === undefined) differs.fontSize = plain(token.fontSize);
    else if (multipleOf(token) !== by) differs.multiple = { $type: 'number', $value: multipleOf(token) };
    for (const key of ROLE_KEYS) if (core[key] && token[key].$value !== core[key].$value) differs[key] = plain(token[key]);
    if (Object.keys(differs).some((key) => !key.startsWith('$'))) definition[scale] = differs;
  }
  return [role, definition];
}));

const perHierarchy = (role) => SCALES.reduce((n, scale) => n + (BASE_MULTIPLES[role][scale] ? countTokens(BASE_MULTIPLES[role][scale]) : 0), 0);
const bodySizes = perHierarchy('body');
const overrides = SCALED_ROLES.filter((role) => role !== 'body').reduce((n, role) => n + perHierarchy(role), 0);
const baseMultiplesTokens = countTokens(BASE_MULTIPLES);
export const BASE_MULTIPLES_COUNT = { total: baseMultiplesTokens + LABELS, bodySizes, roles: baseMultiplesTokens - bodySizes - overrides, overrides, labels: LABELS };
export const baseMultiplesJson = (role) => JSON.stringify({ [role]: BASE_MULTIPLES[role] }, null, 2);

/** The keys a hierarchy overrides for a role, besides body's size. */
export const overridesAt = (role, scale) => Object.keys(BASE_MULTIPLES[role][scale] ?? {})
  .filter((key) => !key.startsWith('$') && !(role === 'body' && key === 'fontSize'));
/** Everything a hierarchy overrides, as [role, key]: Subhead's and Subhead 2's line heights. */
export const SWITCHED = SCALED_ROLES.flatMap((role) => [...new Set(SCALES.flatMap((scale) => overridesAt(role, scale)))].map((key) => [role, key]));
export const multipleFor = (role) => BASE_MULTIPLES[role].multiple?.$value;

const tokenVar = (role, key, scale = '') => `var(--uiowa-typography-${role}${scale && `-${scale}`}-${kebab(key)})`;
const cssValue = (value) => (typeof value === 'string' && value.startsWith('{') ? `var(--uiowa-${value.slice(1, -1).replaceAll('.', '-')})` : String(value));
const isSwitched = (role, key) => SWITCHED.some(([r, k]) => r === role && k === key);
const read = (role, key) => (isSwitched(role, key) ? `var(--uiowa-type-${role}-${kebab(key)})` : tokenVar(role, key));

/** The role tokens, as the build would print them. */
function baseMultiplesTokenRule() {
  const declarations = [];
  for (const [role, definition] of Object.entries(BASE_MULTIPLES)) {
    for (const [key, entry] of Object.entries(definition)) {
      if (key.startsWith('$')) continue;
      if ('$value' in entry) declarations.push([`--uiowa-typography-${role}-${kebab(key)}`, cssValue(entry.$value)]);
      else for (const [own, token] of Object.entries(entry)) if (!own.startsWith('$')) declarations.push([`--uiowa-typography-${role}-${key}-${kebab(own)}`, cssValue(token.$value)]);
    }
  }
  return [':root', declarations];
}

/** One hierarchy's class: its body size, and the values that hierarchy overrides. */
export function baseMultiplesScaleRule(scale) {
  return [scaleSelector(scale), [
    ['--uiowa-type-base', `var(--uiowa-typography-body-${scale}-font-size)`],
    ...SWITCHED.map(([role, key]) => [`--uiowa-type-${role}-${kebab(key)}`, tokenVar(role, key, BASE_MULTIPLES[role][scale]?.[key] ? scale : '')]),
  ]];
}

/** A role's class: its own tokens, with its size multiplied from the body size. */
export function baseMultiplesRoleRule(role) {
  const size = multipleFor(role) === undefined ? 'var(--uiowa-type-base)' : `calc(var(--uiowa-type-base) * ${read(role, 'multiple')})`;
  return [`.type-${role}`, [
    ['font-family', read(role, 'fontFamily')],
    ['font-weight', read(role, 'fontWeight')],
    ['font-size', size],
    ['line-height', read(role, 'lineHeight')],
    ['letter-spacing', read(role, 'letterSpacing')],
  ]];
}

export const baseMultiplesRules = () => [
  baseMultiplesTokenRule(),
  ...SCALES.map(baseMultiplesScaleRule),
  ...SCALED_ROLES.map(baseMultiplesRoleRule),
  ['.type-eyebrow', [['text-transform', 'uppercase']]],
  ['.type-subhead-2 :is(strong, b)', [['font-weight', read('subhead-2', 'fontWeightEmphasis')]]],
];
