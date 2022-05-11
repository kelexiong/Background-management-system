//home小仓库
import { reqCategoryList, reqGetBanner, reqGetFloor } from '@/API/Apiindex'
const state = {
  threelistdata: [],
  getlistbanner: [],
  getFloorlists: []
}
const actions = {
  async getThreelist({ commit }) {
    let result = await reqCategoryList()
    commit('GETTHREELIST', result.data)
  },
  async getbanner({ commit }) {
    let result = await reqGetBanner()
    // console.log(result)
    if (result.code === 200) commit('GETLISTBANNER', result.data)
  },
  async getFloorList({ commit }) {
    let result = await reqGetFloor()
    if (result.code === 200) commit('GETFLOORLIST', result.data)
  }
}
const mutations = {
  GETTHREELIST(state, data) {
    // console.log(state)
    state.threelistdata = data
  },
  GETLISTBANNER(state, data) {
    state.getlistbanner = data
    console.log(data)
  },
  GETFLOORLIST(state, data) {
    state.getFloorlists = data
    console.log(data)
  }
}
const getters = {}
export default { state, actions, mutations, getters }
