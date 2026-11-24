// The document outline: the role each heading level takes by default where an author picks only the level, as in rich
// text, all in one hierarchy. A design still picks the role first, and components keep their own heading styles. Each
// style is named <role>-<hierarchy>; on Medium, the default, a role needs only its class, .type-<role>.
export const DOCUMENT_OUTLINE = {
  h1: 'headline-medium',
  h2: 'subhead-medium',
  h3: 'subhead-2-medium',
  h4: 'subhead-2-medium',
  h5: 'subhead-2-medium',
  h6: 'subhead-2-medium',
};

// h3 to h6 share Subhead 2 at its emphasis weight, Roboto Medium, so they read as headings; the h2 stays Zilla Slab.
export const OUTLINE_EMPHASIS = ['h3', 'h4', 'h5', 'h6'];
