import Vue from 'vue'
import App from './App.vue'

// 导入组件-三级联动
import ThreeLinkage from '@/pages/Home/ThreeLinkage/ThreeLinkage'
// 引入路由
import router from '@/router'
// 注册全局组件---三级联动
Vue.component(ThreeLinkage.name, ThreeLinkage)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
