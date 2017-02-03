module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: 'airbnb',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'arrow-parens': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  },
};
