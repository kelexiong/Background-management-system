import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// home小仓库
import homestore from './homestore/homestroe'
// searcj小仓库
import searchstore from './searchstore/searchstore'
// 导入detail小仓库
import detail from './detailstore/detail'
// 导入购物车的小仓库
import shoppingcart from './shoppingcart/shoppingcart'
export default new Vuex.Store({
  modules: {
    homestore,
    searchstore,
    detail,
    shoppingcart
  }
})
