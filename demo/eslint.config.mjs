import pluginVue from "eslint-plugin-vue";
import importPlugin from "eslint-plugin-import-x";
import globals from "globals";
import js from "@eslint/js";
import prettierConfig from "@vue/eslint-config-prettier";

export default [
    { ignores: ["dist/**"] },
    js.configs.recommended,
    ...pluginVue.configs["flat/vue2-strongly-recommended"],
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
            "no-unused-vars": "warn",
            "no-redeclare": "warn",
            "no-constant-binary-expression": "warn",
            "no-unsafe-optional-chaining": "warn",
            "vue/no-unused-components": "warn",
            "vue/no-unused-vars": "warn",
            "vue/require-v-for-key": "warn",
            "vue/no-use-v-if-with-v-for": "warn",
            "vue/no-mutating-props": "warn",
            "vue/return-in-computed-property": "warn",
            "vue/require-valid-default-prop": "warn",
            "vue/no-side-effects-in-computed-properties": "warn",
            "vue/require-prop-type-constructor": "warn",
            "vue/no-duplicate-attributes": "warn",
            "vue/multi-word-component-names": "warn",
            "vue/no-reserved-component-names": "warn",
            "vue/no-v-text-v-html-on-component": "warn",
            "vue/no-useless-template-attributes": "warn",
        },
    },
];
