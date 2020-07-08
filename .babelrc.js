module.exports = {
  ignore: [
    'node_modules/**/*',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        // loose: true,
        modules: false,
        // exclude: ['transform-typeof-symbol']
      }
    ]
  ],
  // plugins: [
  //   '@babel/plugin-proposal-object-rest-spread'
  // ]
};
