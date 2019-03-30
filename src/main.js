import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入element的主题，并设置一些默认参数
/**
 * @description: element的引用方式为按需引入
 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')