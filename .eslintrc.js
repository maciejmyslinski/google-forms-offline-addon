module.exports = {
  extends: ["prettier", "plugin:flowtype/recommended", "airbnb-base"],
  parser: "babel-eslint",
  plugins: ["flowtype", "prettier"],
  rules: {
    "prettier/prettier": ["error", { singleQuote: true }]
  }
};
