import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App.vue'
import store from './store'

import '@/styles/index.scss' // global css
import "./styles/less/base.less"
// 引入路由
import router from "router/index.js"
Vue.use(ElementUI);
 new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')