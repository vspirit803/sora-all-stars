module.exports = {
  extends: [
    "eslint:recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
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
    // project: "tsconfig.json", // eslint规则
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
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "array-bracket-spacing": ["error", "never"],
    "spaced-comment": ["error", "always", {
      "line": {
        "markers": ["/"],
        "exceptions": ["-", "+"],
      },
    }],
    "arrow-spacing": "error",
    "eol-last": ["error", "always"],
    "quotes": "error",

    // // TypeScript 规则覆盖 JavaScript 规则
    // "space-before-blocks": "off",
    // "@typescript-eslint/space-before-blocks": "error",
    // "brace-style": "off",
    // "@typescript-eslint/brace-style": [
    //   "error",
    //   "1tbs",
    //   {
    //     allowSingleLine: true,
    //   },
    // ],
    // "semi": "off",
    // "@typescript-eslint/semi": ["error", "always"],
    // "lines-between-class-members": "off",
    // "@typescript-eslint/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    // "indent": "off",
    // "@typescript-eslint/indent": ["error", 2, {
    //   ignoredNodes: [
    //     `FunctionExpression > .params[decorators.length > 0]`,
    //     `FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
    //     `ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`,
    //   ],
    // }],
    // "keyword-spacing": "off",
    // "@typescript-eslint/keyword-spacing": "error",
    // "space-before-function-paren": "off",
    // "@typescript-eslint/space-before-function-paren": ["error", "never"],
    // "padding-line-between-statements": "off",
    // "@typescript-eslint/padding-line-between-statements":
    //   "error",
    // "object-curly-spacing": "off",
    // "@typescript-eslint/object-curly-spacing": ["error", "always"],
    // "func-call-spacing": "off",
    // "@typescript-eslint/func-call-spacing": "error",
    // "comma-dangle": "off",
    // "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    // "comma-spacing": "off",
    // "@typescript-eslint/comma-spacing": "error",
    // "space-infix-ops": "off",
    // "@typescript-eslint/space-infix-ops": "error",
    // "no-throw-literal": "off",
    // "@typescript-eslint/no-throw-literal": "error",

    // TypeScript 规则
    // strict rules
    // "@typescript-eslint/prefer-nullish-coalescing": "error",
    // "@typescript-eslint/prefer-optional-chain": "error",
    // "@typescript-eslint/prefer-for-of": "error",
    // "@typescript-eslint/non-nullable-type-assertion-style": "error",
    // "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    // "@typescript-eslint/prefer-reduce-type-parameter": "error",

    // // normal rules
    // "@typescript-eslint/consistent-type-imports": ["error", {
    //   "fixStyle": "inline-type-imports"
    // }],
    // "@typescript-eslint/consistent-type-exports": "error",
    // "@typescript-eslint/promise-function-async": "error",
    // "@typescript-eslint/switch-exhaustiveness-check": "error",

    // "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    // "@typescript-eslint/naming-convention": [
    //   "error",
    //   {
    //     "selector": "interface",
    //     "format": ["PascalCase"],
    //     "custom": {
    //       "regex": "^I[A-Za-z]",
    //       "match": true,
    //     },
    //   },
    // ],
    // "@typescript-eslint/method-signature-style": ["error", "property"],
    // "@typescript-eslint/no-empty-interface": ["error", {
    //   "allowSingleExtends": true,
    // }],
    // "@typescript-eslint/no-inferrable-types": ["error", {
    //   "ignoreParameters": true,
    //   "ignoreProperties": true,
    // }],
    // "@typescript-eslint/restrict-template-expressions": ["error", {
    //   "allowNumber": true,
    // }],
    // "@typescript-eslint/type-annotation-spacing": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/recommended",],
      parserOptions: {
        project: "tsconfig.json", // eslint规则
      },
      rules: {
        // TypeScript 规则覆盖 JavaScript 规则
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
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": "error",
        "space-infix-ops": "off",
        "@typescript-eslint/space-infix-ops": "error",
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": "error",


        // TypeScript 规则
        // strict rules
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/non-nullable-type-assertion-style": "error",
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
        "@typescript-eslint/prefer-reduce-type-parameter": "error",

        // normal rules
        "@typescript-eslint/consistent-type-imports": ["error", {
          "fixStyle": "inline-type-imports"
        }],
        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/promise-function-async": "error",
        "@typescript-eslint/switch-exhaustiveness-check": "error",

        "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            "selector": "interface",
            "format": ["PascalCase"],
            "custom": {
              "regex": "^I[A-Za-z]",
              "match": true,
            },
          },
        ],
        "@typescript-eslint/method-signature-style": ["error", "property"],
        "@typescript-eslint/no-empty-interface": ["error", {
          "allowSingleExtends": true,
        }],
        "@typescript-eslint/no-inferrable-types": ["error", {
          "ignoreParameters": true,
          "ignoreProperties": true,
        }],
        "@typescript-eslint/restrict-template-expressions": ["error", {
          "allowNumber": true,
        }],
        "@typescript-eslint/type-annotation-spacing": "error",
      }
    }
  ]
};
