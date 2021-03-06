module.exports = {
  extends: ['prettier', 'plugin:flowtype/recommended', 'airbnb-base'],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'prettier', 'googleappsscript'],
  env: {
    'googleappsscript/googleappsscript': true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
  },
};
