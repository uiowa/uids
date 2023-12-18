import * as path from 'path';
import * as sass from 'sass';

const files_to_compile = [
  '/assets/scss/fonts.scss',
  '/assets/scss/uids-basic-base.scss',
];

export function cssPerComponentPlugin() {
  return {
    name: 'vite-css-component',
    async transform(code, id) {
      if (id.endsWith('.scss')) {
        const isBaseFile = files_to_compile.some(file => id.endsWith(file));

        if (isBaseFile) {
          // Extract the base file name
          const baseFileName = path.basename(id, '.scss');

          // Define the output CSS path for base files
          const outputCssPath = `dist/base/${baseFileName}.css`;

          // Compile SCSS to CSS
          const result = sass.renderSync({
            file: id,
            outputStyle: 'expanded',
          });

          // Emit CSS as an asset
          this.emitFile({
            type: 'asset',
            fileName: outputCssPath,
            source: result.css.toString(),
          });

          // Return import statement for the generated CSS file
          return {
            code: `import "/@fs/${outputCssPath}";`,
            map: null,
          };
        } else {
          // Extract the component name and path
          const matches = id.match(/\/components\/([^/]+)\/([^/]+)\.scss/);
          if (matches) {
            const componentName = matches[2];
            const componentPath = matches[1];

            // Define the output CSS path based on the component structure
            const outputCssPath = `dist/components/${componentPath}/${componentName}.css`;

            // Compile SCSS to CSS
            const result = sass.renderSync({
              file: id,
              outputStyle: 'expanded',
            });

            // Create CSS as an asset
            this.emitFile({
              type: 'asset',
              fileName: outputCssPath,
              source: result.css.toString(),
            });

            // Return import statement for the generated CSS file
            return {
              code: `import "/@fs/${outputCssPath}";`,
              map: null,
            };
          }
        }
      }
    },
  };
}
