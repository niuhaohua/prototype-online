// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import { defaultRouterMap,RouterMap } from './router'
import  store  from './vuex/hello'
import ElementUI from 'element-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api/api'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)
// Vue.use(axios)
Vue.config.productionTip = false
Vue.prototype.$api = api

Vue.use(MintUI)
Vue.use(ElementUI)

Vue.use(Router)

const router = new Router({
  routes:defaultRouterMap
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user')
  }
  if(from.path == '/login'){
    
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
