import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokenSource = join(root, 'src/tokens');

// src/tokens/** is JSON, so nothing imports it and Vite never sees it change. Watching it
// here regenerates the Sass partial, which is in the module graph, so a token edit reloads
// the same way a Sass edit does.
const watchTokens = {
  name: 'uids-watch-tokens',
  apply: 'serve',
  configureServer(server) {
    server.watcher.add(tokenSource);
    server.watcher.on('change', (file) => {
      if (!file.startsWith(tokenSource)) return;
      try {
        execFileSync('node', [join(root, 'scripts/build-tokens.mjs')], { cwd: root, stdio: 'pipe' });
      } catch (error) {
        server.config.logger.error(`tokens: ${error.stderr?.toString().trim() || error.message}`);
      }
    });
  },
};

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@whitespace/storybook-addon-html',
  ],
  features: {
    actions: false,
    interactions: false,
  },
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [
        vue(),
        watchTokens,
        // Workaround for storybookjs/storybook#33537.
        {
          name: 'fix-mdx-react-shim',
          enforce: 'pre',
          resolveId(source) {
            if (source.startsWith('file://') && source.includes('mdx-react-shim.js')) {
              return new URL(source).pathname;
            }
            return null;
          },
        },
      ],
      base: process.env.BASE_URL || config.base,
      css: {
        lightningcss: {
          errorRecovery: true,
        },
        preprocessorOptions: {
          scss: {
            api: "modern",
          },
        },
      },
    });
  },
};

export default config;
