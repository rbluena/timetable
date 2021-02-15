module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'prettier'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    'import/no-cycle': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@app', './src/client'],
        ['@app/screens', './src/client/screens'],
        ['@app/containers', './src/client/containers'],
        ['@app/actions', './src/client/actions'],
        ['@app/slices', './src/client/slices'],
        ['@app/hooks', './src/client/hooks'],
        ['@app/utils', './src/client/utils'],
        ['@app/services', './src/client/services'],
        ['@app/components', './src/client/components'],
      ],
    },
  },
};
