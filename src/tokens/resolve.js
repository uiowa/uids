// How the source token files resolve variant selectors and breakpoint widths, shared by
// the token build (style-dictionary.config.js) and the Storybook token pages so the two
// can't disagree. Plain functions over token JSON: no Node or browser APIs.

export const VARIANT_SELECTORS_EXTENSION = 'edu.uiowa.variants';

/** The dotted path a `{path}` reference names, or null when the value isn't one. */
export const referencePath = (value) => {
  const match = typeof value === 'string' && /^\{([^{}]+)\}$/.exec(value);
  return match ? match[1] : null;
};

/**
 * The selector a variant override is emitted under. `source` is the token's source file
 * and `path` its path in it. The nearest group that maps the variant to a selector wins;
 * without one the selector follows the BEM modifier convention, `.{component}--{variant}`.
 * Without a source file only the default applies.
 */
export function variantSelector(source, path, variant) {
  if (!/^[a-z][a-z0-9-]*$/.test(variant)) {
    throw new Error(`${path.join('.')} declares an invalid variant name "${variant}"`);
  }

  let selector = `.${path[0]}--${variant}`;
  let group = source;
  for (const key of path.slice(0, -1)) {
    group = group?.[key];
    selector = group?.$extensions?.[VARIANT_SELECTORS_EXTENSION]?.[variant] ?? selector;
  }
  return selector;
}

/**
 * The px width a responsive key names, e.g. md or 980. `tokenAt(path)` returns the token
 * at a dotted path as `{ $value }`, with its source value, or undefined when there is none.
 * References are followed down to the px dimension.
 */
export function breakpointPixels(key, tokenAt) {
  const seen = new Set();
  let path = `breakpoint.${key}`;
  let value;
  for (;;) {
    if (seen.has(path)) throw new Error(`responsive breakpoint "${key}" has a circular reference at "${path}"`);
    seen.add(path);
    const token = tokenAt(path);
    if (!token) throw new Error(`responsive breakpoint "${key}" references unknown token "${path}"`);
    value = token.$value;
    const reference = referencePath(value);
    if (!reference) break;
    path = reference;
  }
  if (!value || value.unit !== 'px' || typeof value.value !== 'number') {
    throw new Error(`responsive breakpoint "${key}" did not resolve to a px dimension`);
  }
  return value.value;
}
