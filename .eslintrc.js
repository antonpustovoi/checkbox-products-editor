const { resolve } = require("path");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "react-app",
    "plugin:prettier/recommended",
    "plugin:sonarjs/recommended"
  ],
  plugins: ["prettier", "react", "import", "sonarjs"],
  settings: {
    "import/resolver": {
      typescript: {
        project: resolve(__dirname, "tsconfig.json")
      }
    }
  },
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react/prop-types": ["warn", { ignore: ["children"] }],
    "react/react-in-jsx-scope": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling"]],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before"
          },
          {
            pattern: "./**",
            group: "sibling",
            position: "after"
          }
        ],
        pathGroupsExcludedImportTypes: [],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: false
        }
      }
    ]
  }
};
