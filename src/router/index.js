import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/search'
import Detail from '@/pages/Detail'
import AddcartSucces from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
// 导入仓库
import store from '@/store/index'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//修改原型对象中的push和replace方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home, meta: { show: true } },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/search/:keyword?', component: Search, meta: { show: true }, name: 'search' },
    { path: '/detail/:goodsid', component: Detail, meta: { show: true } },
    { path: '/addshopcart', component: AddcartSucces, meta: { show: true }, name: 'addshopcart' },
    { path: '/ShopCart', component: ShopCart, meta: { show: true }, name: 'ShopCart' },
    { path: '/Trade', component: Trade }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path.indexOf('/detail') !== -1) {
      return { y: 0 }
    }
  }
})
router.beforeEach((to, form, next) => {
  // 只有登录了才有token
  if (localStorage.getItem('token')) {
    if (store.state.userInfo.username) {
      if (to.path === '/login') {
        next('/home')
      }
      next()
    } else {
      store.dispatch('getuserinfo')
      next()
    }
  } else {
    if (to.path === '/Trade') next(false)
    else next()
  }
})
export default router
