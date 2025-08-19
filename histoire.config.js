import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue2'

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  setupFile: './src/histoire.setup.js',
  tree: {
    groups: [
      {
        id: 'top',
        title: '',
      },
      {
        title: 'DateTime Components',
        include: file => file.path.includes('src/datetime/'),
      },
    ]
  },
  theme: {
    title: '@supplycart/ui'
  }
})