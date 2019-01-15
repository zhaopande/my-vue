import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "./router.js"

 new Vue({
  el: '#app',
  router,
  render: h => h(App)
})