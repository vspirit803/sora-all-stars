module.exports = {
  extends: [
    "../../.eslintrc.cjs",
    "plugin:vue/vue3-recommended",
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
    // override/add rules settings here, such as:
    // "vue/no-unused-vars": "error"
  },
};
