module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  root: true,
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      modules: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ["@typescript-eslint", "import", "simple-import-sort"],

  rules: {
    // import order rules
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/order": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",


    "no-multi-spaces": ["error"],
    "array-bracket-spacing": ["error", "never"],
    "spaced-comment": ["error", "always"],

    "@typescript-eslint/method-signature-style": ["error", "property"],

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": "warn",
    "space-before-blocks": "off",
    "@typescript-eslint/space-before-blocks": "error",
    "brace-style": "off",
    "@typescript-eslint/brace-style": [
      "error",
      "1tbs",
      {
        allowSingleLine: true,
      },
    ],
    "semi": "off",
    "@typescript-eslint/semi": ["error", "always"],
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2, {
      ignoredNodes: [
        `FunctionExpression > .params[decorators.length > 0]`,
        `FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
        `ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`,
      ],
    }],
    "keyword-spacing": "off",
    "@typescript-eslint/keyword-spacing": "error",
    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": ["error", "never"],
    "padding-line-between-statements": "off",
    "@typescript-eslint/padding-line-between-statements":
       "error",
    "object-curly-spacing": "off",
    "@typescript-eslint/object-curly-spacing": ["error", "always"],
    "func-call-spacing": "off",
    "@typescript-eslint/func-call-spacing": "error",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": ["warn", "always-multiline"],
    "comma-spacing": "off",
    "@typescript-eslint/comma-spacing": "error",
    "space-infix-ops": "off",
    "@typescript-eslint/space-infix-ops": "error",
  },
};
