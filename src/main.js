import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载注册Vant组件模块
import './utils/register-vant'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
