import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import RouteConfig from './config/routes.js'

const router = new VueRouter({ routes : RouteConfig})

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router : router,
  render: h => h(App)
}).$mount('#app')
