import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/search'
// import Detail from '@/pages/Detail'
// import AddcartSucces from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySiccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import centerMyoder from '@/pages/Center/centerMyoder'
// import centerGroupshop from '@/pages/Center/centerGroupshop'
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
    {
      path: '/',
      component: () => import('@/pages/Home')
    },
    {
      path: '/home',
      component: () => import('@/pages/Home'),
      meta: {
        show: true
      }
    },
    {
      path: '/login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/register',
      component: () => import('@/pages/Register')
    },
    {
      path: '/search/:keyword?',
      component: () => import('@/pages/search'),
      meta: {
        show: true
      },
      name: 'search'
    },
    {
      path: '/detail/:goodsid',
      component: () => import('@/pages/Detail'),
      meta: {
        show: true
      }
    },
    {
      path: '/addshopcart',
      component: () => import('@/pages/AddCartSuccess'),
      meta: {
        show: true
      },
      name: 'addshopcart'
    },
    {
      path: '/ShopCart',
      component: () => import('@/pages/ShopCart'),
      meta: {
        show: true
      },
      name: 'ShopCart'
    },
    {
      path: '/Trade',
      component: () => import('@/pages/Trade')
    },
    {
      path: '/Pay',
      component: () => import('@/pages/Pay'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') && from.path.indexOf('/Trade') !== -1) next()
        else next(false)
      }
    },
    {
      path: '/PaySiccess',
      component: () => import('@/pages/PaySuccess'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token') && from.path.indexOf('/Pay') !== -1) next()
        else next(false)
      }
    },
    {
      path: '/center',
      component: () => import('@/pages/Center'),
      children: [
        {
          path: '',
          component: () => import('@/pages/Center/centerMyoder')
        },
        {
          path: 'centerGroupshop',
          component: () => import('@/pages/Center/centerGroupshop')
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.path.indexOf('/detail') !== -1) {
      return {
        y: 0
      }
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
    if (to.path === '/Trade' || to.path.indexOf('/center') !== -1) next(false)
    else {
      next()
    }
  }
})
export default router
