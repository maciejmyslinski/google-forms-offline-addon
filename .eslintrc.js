module.exports = {
  extends: ['airbnb-base', 'plugin:flowtype/recommended', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
