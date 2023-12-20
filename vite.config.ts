import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from "vite-plugin-dts";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env.NODE_ENV': '"production"' }, // need so built js files can run anywhere
  assetsInclude: [
    './package.json', // needed for package management
  ],
  build: {
    lib: {
      entry: "./src/main.ts",
      // entry: path.resolve(__dirname, "src/index.ts"),
      name: "UIDS",
      fileName: (format) => `uids.${format}.js`,
    },
    rollupOptions: {
      // external: ['vue'],
      input: {
        main: path.resolve(__dirname, 'src/main.ts'),
      },
      // output: {
      //   // Provide global variables to use in the UMD build
      //   // for externalized deps
      //   globals: {
      //     vue: 'Vue'
      //   },
      // },
    },
  },
  plugins: [
    vue({customElement: true} ),
    dts()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
});
