import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Reigers from '@/pages/Reigers'
import Search from '@/pages/search'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//修改原型对象中的push和replace方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.push = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home, meta: { show: true } },
    { path: '/login', component: Login },
    { path: '/reigers', component: Reigers },
    { path: '/search/:keyword?', component: Search, meta: { show: true }, name: 'search' }
  ]
})
// router.beforeEach((to, form, next) => {
//   // console.log(to, form)
//   next()
// })
export default router
