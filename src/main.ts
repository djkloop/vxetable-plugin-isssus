import Vue from 'vue'
import App from './App.vue'
import { setupExtendComponents } from './components/test-components'

setupExtendComponents()


new Vue({
  render: (h) => h(App)
}).$mount('#app')

