//home小仓库
import { reqCategoryList } from '@/API/Apiindex'
const state = {
  threelistdata: []
}
const actions = {
  async getThreelist({ commit }) {
    let result = await reqCategoryList()
    commit('GETTHREELIST', result.data)
  }
}
const mutations = {
  GETTHREELIST(state, data) {
    console.log(state)
    state.threelistdata = data
  }
}
const getters = {}
export default { state, actions, mutations, getters }
