const path = require('path');

const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: [path.resolve('.')],
      extensions: ['(.js|.ts)', '(.tsx|jsx)'],
      alias: {
        '@app': './src/client',
        '@app/screens': './src/client/screens',
        '@app/components': './src/client/components',
        '@app/containers': './src/client/containers',
        '@app/actions': './src/client/actions',
        '@app/utils': './src/client/utils',
        '@app/hooks': './src/client/hooks',
        '@app/slices': './src/client/slices',
        '@app/services': './src/client/services',
      },
    },
  ],
];

module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['next/babel'],
    plugins: plugins,
  };
};
