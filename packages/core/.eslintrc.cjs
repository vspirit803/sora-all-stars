module.exports = {
  extends: [
    "../../.eslintrc.cjs"
  ],
  parserOptions: {
    tsconfigRootDir: "packages/core",
  },
  rules: {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Za-z]|[A-Za-z]Config$",
          "match": true,
        },
      },
    ],
  }
}