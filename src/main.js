import Vue from 'vue'
import App from './App.vue'

// 导入组件-三级联动
import ThreeLinkage from '@/components/ThreeLinkage/ThreeLinkage'
// 引入路由
import router from '@/router'
// 导入mock数据
import '@/mock/mockServe'
// 导入swiper样式
import 'swiper/css/swiper.css'
// 导入vuex仓库
import store from './store/index'
// 注册全局组件---三级联动

Vue.component(ThreeLinkage.name, ThreeLinkage)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
