import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

const currentDirectory = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
    plugins: [vue()],
    define: {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
    resolve: {
        alias: {
            "@": resolve(currentDirectory, "src"),
        },
    },
    server: {
        port: 8080,
    },
    build: {
        outDir: "dist",
        rollupOptions: {
            input: {
                main: resolve(currentDirectory, "index.html"),
            },
        },
    },
});
