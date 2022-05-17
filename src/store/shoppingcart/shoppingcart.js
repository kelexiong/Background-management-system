import { reqGetShopCart } from '@/API/Apiindex'
const state = {
  skuInfo: {}
}
const actions = {
  async getshopcartlist({ commit }, data) {
    let result = await reqGetShopCart(data)
    console.log(result + '1111111111')
  }
}
const mutations = {}
const getters = {}
export default {
  state,
  actions,
  mutations,
  getters
}
