import { reqGetShopCart, reqShoppingCart, reqCheckCart, reqdeleteCart } from '@/API/Apiindex'
const state = {
  skuInfo: []
}
const actions = {
  async getshopcartlist({ commit }) {
    let result = await reqGetShopCart()
    if (result.code === 200) {
      commit('GETSHOPCARTLIST', result.data)
    }
  },
  // 修改个人购物车商品数量
  async changeshoppingcart(context, data) {
    let result = await reqShoppingCart(data)
    if (result.code == 200) return 'ok'
    else return Promise.reject(new Error('修改参数失败了'))
  },
  // 复选框的按钮
  async changescheckcart(context, data) {
    let result = await reqCheckCart(data)
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error('勾选失败了'))
  },
  // 全选按钮
  changesallcheckcart(context, isChecked) {
    let data = {}
    let PromiseAll = []
    context.getters.cartInfoList.cartInfoList.forEach(item => {
      data.skuId = item.skuId
      data.isChecked = isChecked
      let promise = context.dispatch('changescheckcart', data)
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  },
  // 删除
  async deletegoodscart(context, skuId) {
    let result = await reqdeleteCart(skuId)
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error('删除失败了'))
  },
  deleteCheckAll(context) {
    let PromiseAll = []
    context.getters.cartInfoList.cartInfoList.forEach(item => {
      let promise = item.isChecked === 1 ? context.dispatch('deletegoodscart', item.skuId) : ''
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}
const mutations = {
  GETSHOPCARTLIST(state, data) {
    state.skuInfo = data || []
  }
}
const getters = {
  cartInfoList(state) {
    return state.skuInfo[0] || {}
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
