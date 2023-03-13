module.exports = {
  extends: [
    "plugin:vue/vue3-recommended",
    "../../.eslintrc.cjs",
  ],
  parser: "vue-eslint-parser", // 解析vue
  parserOptions: {
    tsconfigRootDir: "packages/web",
    extraFileExtensions: [".vue"],
  },
  rules: {
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3,
      },
    ],
    "object-curly-spacing": "off",
    "@typescript-eslint/object-curly-spacing": ["error", "always"],
    // override/add rules settings here, such as:
    // "vue/no-unused-vars": "error"
  },
};
