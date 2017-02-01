module.exports = {
  env: {
    browser: true,
    jest: true,
  }
  extends: 'airbnb',
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
  }
};
