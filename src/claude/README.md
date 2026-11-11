These are the University of Iowa Design System rules. Follow them for anything presented as University of Iowa work.

## Setup

- Load `components/bundle.css`. It is the compiled UIDS stylesheet and declares every `--uiowa-*` variable.
- Load the fonts from Google Fonts:
  `https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&family=Zilla+Slab:wght@400;600;700&family=Antonio:wght@100;300;700&family=Lora&display=swap`
- Style with the `--uiowa-*` variables. Never copy a hex value or a size into a page when a token holds it.
- Target WCAG 2 AA.

## Color

- The brand colors are Hawkeye Gold, `uiowa-color-brand-gold`, and black, `uiowa-color-brand-black`.
- Use gold at full strength, never tinted or translucent.
- On gold, set text in `uiowa-color-text-default`, which is black. Never set gold text on white, or white text on gold. Gold text is only for short headlines and callouts on black.
- Build sections from the background classes: `bg--white`, `bg--gray`, `bg--gold`, `bg--black`. Each class sets `--uiowa-color-text`, `--uiowa-color-link` and `--uiowa-color-border` for what sits inside it, so style content with those three variables.
- Use the `uiowa-color-accent-*` colors only to draw one item out of a set, on about 10% of a layout at most. Never use them as text, against gold, for status, or as the only cue to meaning. Text on an accent fill is black.

## Status

- Use `uiowa-color-info`, `uiowa-color-success`, `uiowa-color-warning` and `uiowa-color-danger` only for status, never for decoration.
- Pair each status color with text or an icon.
- Behind a status message, fill with the matching `-surface` token and draw the border in the status color, e.g. `uiowa-color-danger-surface` with a `uiowa-color-danger` border.

## Links

- Always underline links. Never rely on blue alone to mark a link.
- `uiowa-color-link-default` on white and gray, `uiowa-color-link-inverse` on black, `uiowa-color-link-gold` on gold. Inside a background class, use `var(--uiowa-color-link)`.

## Data visualization

- Color series with `uiowa-color-data-visualization-categorical-1` onward, in order, without skipping or reordering.
- Label series or add patterns so color is not the only cue. Text inside a fill is black.
- Never use gold as a category. Around seven categories, change the chart's structure instead of adding colors.

## Typography

- Set body text in the `body` style, which is Roboto. `h1` is Zilla Slab and `h2` through `h6` are Roboto.
- Set an introductory paragraph in `intro-bold`, which is Zilla Slab, or `intro-light`, which is Roboto light.
- The stylesheet scales headings and intros between 600px and 1310px viewports. The type styles here list the largest size.
- For smaller or larger body text, use `uiowa-typography-size-small` and `uiowa-typography-size-large`.

## Space, borders and shape

- Space with the `uiowa-space-*` scale. Cap content columns at `uiowa-layout-container-max-standard`, or the `narrow` and `wide` variants.
- Draw borders and dividers at `uiowa-stroke-width-default` in `var(--uiowa-color-border)`. Draw borders on controls in `uiowa-color-border-strong`, or `uiowa-color-border-strong-inverse` on black.
- Round form fields and alerts with `uiowa-radius-3`; give badges and toggle tracks `uiowa-radius-full`.
- Use `uiowa-shadow-raised` for a small lift and `uiowa-shadow-inset` for a sunken edge.

## Patterns

- To add a branded texture, give a section a pattern class, `bg--{white|gray|gold|black}--pattern--{brain|community|particle}`. For example, `bg--black--pattern--brain`.

## Logo

- Use the Block IOWA logo files as provided. Never redraw, recolor or approximate the mark.
- Never display the logo narrower than `uiowa-logo-min-width`, which is 85px.

## Motion

- Time hover and focus feedback with `uiowa-motion-duration-fast`, state changes with `uiowa-motion-duration-medium` and larger movement with `uiowa-motion-duration-slow`. Ease them with `uiowa-easing-standard`.
