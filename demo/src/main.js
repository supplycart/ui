import Vue from 'vue'
import App from './App.vue'
import "./main.css"
import PortalVue from 'portal-vue'

Vue.use(PortalVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
