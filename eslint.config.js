import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

/* 모듈 상수는 SCREAMING_CASE — 리터럴·배열·객체로 초기화하는 최상위 const만 본다(문법 기준).
 * 예외: 컴포넌트의 styles 객체(…Styles 포함) */
const SCREAMING_MODULE_CONST = {
  selector:
    ':matches(Program, ExportNamedDeclaration) > VariableDeclaration[kind="const"] > VariableDeclarator[id.type="Identifier"][id.name=/^(?!styles$)(?!\\w*Styles$)[a-z]/][init.type=/^(Literal|ArrayExpression|ObjectExpression|TemplateLiteral)$/]',
  message: "모듈 상수는 SCREAMING_SNAKE_CASE로 쓴다(styles 객체 제외).",
};

/* export하는 type·interface는 *Types.ts에만 */
const EXPORTED_TYPE_IN_TYPES_FILE = {
  selector:
    "ExportNamedDeclaration > :matches(TSTypeAliasDeclaration, TSInterfaceDeclaration)",
  message: "export하는 type·interface는 *Types.ts 파일에 둔다.",
};

const conventionRules = [
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/vite-env.d.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        SCREAMING_MODULE_CONST,
        EXPORTED_TYPE_IN_TYPES_FILE,
      ],
    },
  },
  {
    files: ["src/types/**/*.ts", "src/**/*Types.ts"],
    rules: { "no-restricted-syntax": ["error", SCREAMING_MODULE_CONST] },
  },
  /* 상수 객체의 키는 camelCase — 값만 wire 값 원형 */
  {
    files: ["src/constants/**/*.ts", "src/**/*Constants.ts"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "objectLiteralProperty",
          format: ["camelCase"],
          filter: { regex: "^\\d", match: false },
        },
      ],
    },
  },
];

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
      reactRefresh.configs.vite,
      pluginQuery.configs["flat/recommended"],
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
  },
  ...conventionRules,
]);
