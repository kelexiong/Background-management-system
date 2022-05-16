import { reqGoodsInfo } from '@/API/Apiindex'
const state = {
  goodsinfo: {}
}
const actions = {
  async getgoodsinfo({ commit }, data) {
    let result = await reqGoodsInfo(data)
    if (result.code === 200) commit('GETGOODSINFO', result.data)
  }
}
const mutations = {
  GETGOODSINFO(state, data) {
    state.goodsinfo = data
  }
}
const getters = {
  categoryView(state) {
    return state.goodsinfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsinfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsinfo.spuSaleAttrList || []
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
