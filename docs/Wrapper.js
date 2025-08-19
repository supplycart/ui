import Vue from 'vue'

// Global component registration if needed
// Import any global styles or configurations here

export default Vue.extend({
  name: 'Wrapper',
  render(h) {
    return h('div', {
      class: 'rsg-wrapper'
    }, this.$slots.default)
  }
})