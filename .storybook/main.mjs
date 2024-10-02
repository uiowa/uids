import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    '@storybook/preset-scss',
    '@whitespace/storybook-addon-html',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [vue()],
      base: process.env.BASE_URL || config.base,
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern",
          },
        },
      },
    });
  },
  docs: {
    autodocs: true,
  },
};

export default config;
