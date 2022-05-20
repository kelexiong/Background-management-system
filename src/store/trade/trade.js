import { reqtradeInfo, requserAddress } from '@/API/Apiindex'
const state = {
  detailList: [],
  address: []
}
const actions = {
  async gettradeinfo({ commit }) {
    let result = await reqtradeInfo()
    if (result.code === 200) {
      commit('SETTRADEINFO', result.data)
      return 'ok'
    } else return Promise.reject(new Error('获取订单列表失败了'))
  },
  async getuseraddress({ commit }) {
    let result = await requserAddress()
    if (result.code === 200) {
      commit('GETUSERADDRESS', result.data)
    }
    console.log(result)
  }
}
const mutations = {
  SETTRADEINFO(state, data) {
    state.detailList = data
  },
  GETUSERADDRESS(state, data) {
    state.address = data
  }
}
const getters = {
  detailArrayList(state) {
    return state.detailList.detailArrayList || []
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
