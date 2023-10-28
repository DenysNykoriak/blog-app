module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    // common rules
    "no-unused-vars": "off",
    "comma-dangle": ["error", "only-multiline"],
    eqeqeq: "error",
    "no-else-return": "error",
    "no-multi-spaces": "error",
    "no-console": "warn",
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    quotes: ["error", "double", { avoidEscape: true }],
    camelcase: [
      "error",
      {
        ignoreImports: true,
        ignoreDestructuring: true,
        properties: "always",
      },
    ],
    "no-lonely-if": "error",
    "no-mixed-operators": "error",
    "no-multi-assign": "error",
    "no-nested-ternary": "error",
    "no-plusplus": "error",
    "no-unneeded-ternary": ["error"],
    "one-var": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let"], next: "*" },
      { blankLine: "any", prev: ["const", "let"], next: ["const", "let"] },
    ],
    "no-var": "error",
    "prefer-const": "error",
    "no-useless-rename": "warn",

    // comments rules
    "sort-vars": ["error", { ignoreCase: true }],
    "prefer-destructuring": [
      "error",
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // typescript rules
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/prefer-namespace-keyword": "off",

    //import rules
    "import/no-unresolved": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-anonymous-default-export": "off",
    "import/default": "off",
    "import/export": "off",

    //   "error",
    //   {
    //     groups: [
    //       "builtin",
    //       "external",
    //       "internal",
    //       "parent",
    //       "sibling",
    //       "index",
    //     ],
    //     pathGroups: [
    //       {
    //         pattern: "*",
    //         group: "external",
    //         position: "before",
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ["builtin"],
    //     "newlines-between": "always",
    //     alphabetize: {
    //       order: "asc",
    //       caseInsensitive: true,
    //     },
    //   },
    // ],

    //prettier rules
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
