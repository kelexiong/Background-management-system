import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Reigers from '@/pages/Reigers'
import Search from '@/pages/Search'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home, meta: { show: true } },
    { path: '/login', component: Login },
    { path: '/reigers', component: Reigers },
    { path: '/search/:keyword', component: Search, meta: { show: true }, name: 'search' }
  ]
})
export default router
