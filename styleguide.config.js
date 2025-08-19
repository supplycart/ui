module.exports = {
  // Basic setup
  title: '@supplycart/ui - Component Library',
  version: '2.0.4',
  
  // Component discovery
  components: 'src/**/components/*.vue',
  
  // Custom sections organized by modules
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'DateTime Components',
      components: 'src/datetime/components/*.vue',
      content: 'docs/datetime.md'
    }
  ],

  // Documentation output
  styleguideDir: 'styleguide',
  
  // Development server
  serverPort: 6060,
  
  // Custom webpack configuration
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-env']
          }
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new (require('vue-loader/lib/plugin'))()
    ]
  },

  // Show usage examples and props
  exampleMode: 'expand',
  usageMode: 'expand',

  // Skip components without examples
  skipComponentsWithoutExample: false,
  
  // Ignore patterns
  ignore: [
    '**/__tests__/**',
    '**/*.test.js',
    '**/*.story.vue',
    '**/node_modules/**'
  ]
}