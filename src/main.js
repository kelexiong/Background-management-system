import Vue from 'vue'
import App from './App.vue'

// 导入组件-三级联动
import ThreeLinkage from '@/components/ThreeLinkage/ThreeLinkage'
// 轮播图组件
import Carsoule from '@/components/Carsoule/Carsoule'
// 分页器
import Pagination from '@/components/Pagination/Pagination'
// 引入路由
import router from '@/router'
// 导入mock数据
import '@/mock/mockServe'
// 导入swiper样式
import 'swiper/css/swiper.css'
// 导入vuex仓库
import store from './store/index'
// 导入引用所有的API
import * as API from '@/API/Apiindex'
// 引入UI组件库
import { MessageBox } from 'element-ui'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import xiao from '@/assets/123.gif'
// 引入表单验证插件
import '@/plugin/validate'
Vue.use(VueLazyload, {
  error: xiao,
  loading: xiao
})
// 注册全局组件---三级联动
Vue.component(ThreeLinkage.name, ThreeLinkage)
// 注册全局组件---轮播图
Vue.component(Carsoule.name, Carsoule)
// 注册分页器
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
