import pluginVue from "eslint-plugin-vue";
import importPlugin from "eslint-plugin-import-x";
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
            "import-x": importPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        settings: {
            "import-x/resolver": {
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
            "import-x/extensions": [
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
