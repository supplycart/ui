/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|vue)'],
  addons: [],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // Add Vue plugin for processing .vue files
    const { default: vue } = await import('@vitejs/plugin-vue');
    config.plugins = config.plugins || [];
    config.plugins.push(vue());
    
    // Optimize deps to include Vue 3 dependencies
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = config.optimizeDeps.include || [];
    config.optimizeDeps.include.push('@vuepic/vue-datepicker');
    
    return config;
  },
};

export default config;