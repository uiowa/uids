import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import { viteStaticCopy } from 'vite-plugin-static-copy';

const componentName = 'media';

// if ( componentName === '') {
//   throw new Error('LIB_NAME is not defined or is blank');
// } else if (componentsList.includes(componentName) === false) {
//   throw new Error('LIB_NAME does not exist in componentsConfig object');
// }

const entry = `src/components/${componentName}/main.ts`;
const fileName = `${componentName}`;
const outDir = `./dist/${componentName}`;
const name = `${componentName}`;
const src = `package.json`;

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' },
  assetsInclude: [
    './package.json',
  ],
  plugins: [
    vue( {customElement: true} ),
    dts(),
    viteStaticCopy({
      targets: [
        {
          src: src,
          dest: ``,
        },
      ],
    })
  ],
  logLevel: 'info',
  build: {
    outDir: outDir,
    lib: {
      entry: entry,
      name: name,
      fileName: fileName
    },
    // rollupOptions: {
    //   external: ["vue"],
    //   output: {
    //     globals: {
    //       vue: "Vue"
    //     }
    //   }
    // }
  },
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url))
  //   }
  // },
  // assetsInclude: [
  //   './package.json',
  // ],
});
