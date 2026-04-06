import { mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

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
};

export default config;
