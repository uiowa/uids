import path from 'path';
import * as sass from 'sass';

const files_to_compile = [
  // Files must be declared in src/index.ts
  // or in src/components/index.ts before listed here.
  '/components/brand-bar/brand-bar.scss',
  '/components/card/card.scss',
  '/assets/scss/reset.scss',
  '/assets/scss/fonts.scss',
];

export function cssPerComponentPlugin() {
  return {
    name: 'vite-css-component',
    async transform(code, id) {
      if (id.endsWith('.scss') && files_to_compile.some((file) => id.endsWith(file))) {
        const componentPath = id.replace(/\.scss$/, '');
        const componentName = path.basename(componentPath);
        const outputCssPath = `assets/css/${componentName}.css`;

        const result = sass.renderSync({
          file: id,
          outputStyle: 'expanded',
        });

        this.emitFile({
          type: 'asset',
          fileName: outputCssPath,
          source: result.css.toString(),
        });

        return {
          code: `import "/@fs/${outputCssPath}";`,
          map: null,
        };
      }
    },
  };
}
