module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": ["@storybook/addon-links", {
    name: "@storybook/addon-essentials",
    options: {
      actions: false,
    },
  },
    "@storybook/preset-scss",
    "@storybook/addon-links",
    "@storybook/addon-interactions"
  ],

  "framework": {
    name: "@storybook/vue3-vite",
    options: {}
  },

  async viteFinal(config, { configType }) {
    config.base = process.env.BASE_URL || config.base;

    // return the customized config
    return config;
  },

  docs: {
    autodocs: true
  }
}
