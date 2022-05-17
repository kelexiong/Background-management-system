import { reqGoodsInfo, reqShoppingCart } from '@/API/Apiindex'
import { getUuidToken } from '@/uilt/uuid_token'
const state = {
  goodsinfo: {},
  uuidToken: getUuidToken()
}
const actions = {
  async getgoodsinfo({ commit }, data) {
    let result = await reqGoodsInfo(data)
    if (result.code === 200) commit('GETGOODSINFO', result.data)
  },
  async addshoppingcart({ commit }, data) {
    let result = await reqShoppingCart(data)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('请求失败,又有吊毛把接口玩炸了'))
    }
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
