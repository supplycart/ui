import pluginVue from "eslint-plugin-vue";
import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import js from "@eslint/js";
import prettierConfig from "@vue/eslint-config-prettier";

export default [
    js.configs.recommended,
    ...pluginVue.configs["flat/strongly-recommended"],
    prettierConfig,
    {
        files: ["src/**/*.{js,vue}"],
        plugins: {
            vue: pluginVue,
            import: fixupPluginRules(_import),
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        settings: {
            "import/resolver": {
                node: {
                    extensions: [".js", ".vue"],
                },
            },
        },
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    paths: [
                        {
                            name: "lodash",
                            message:
                                "Please use individual lodash imports (e.g., import cloneDeep from 'lodash/cloneDeep')",
                        },
                    ],
                },
            ],
            "import/extensions": [
                "error",
                "always",
                {
                    ignorePackages: true,
                    pattern: {
                        js: "always",
                        vue: "always",
                    },
                },
            ],
        },
    },
];
