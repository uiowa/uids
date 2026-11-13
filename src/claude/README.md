The University of Iowa Design System (UIDS) as Claude uses it: the tokens, stylesheet and logos from the [uiowa/uids](https://github.com/uiowa/uids) repository. For guidance on using UIDS, see the documentation at [uids.brand.uiowa.edu](https://uids.brand.uiowa.edu).

## For agents

The rules for each token are in its usage note in `tokens.json`. Read them before choosing a token.

When you build a page with this system:

- Load `components/bundle.css`, the compiled UIDS stylesheet. It declares every `--uiowa-*` variable.
- Load the fonts from Google Fonts:
  `https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&family=Zilla+Slab:wght@400;600;700&family=Antonio:wght@100;300;700&family=Lora&display=swap`
- Style with the `--uiowa-*` variables. Never copy a hex value or a size into a page when a token holds it.
- Build sections from the background classes `bg--white`, `bg--gray`, `bg--gold` and `bg--black`. Each sets `--uiowa-color-text`, `--uiowa-color-link` and `--uiowa-color-border` for its contents, so style what sits inside with those three variables.
- For a branded texture, add a pattern to a background: `bg--{white|gray|gold|black}--pattern--{brain|community|particle}`, for example `bg--black--pattern--brain`.
- Use the Block IOWA files in the Logos group as provided. Never redraw or recolor the mark.
- Meet WCAG 2 AA.
