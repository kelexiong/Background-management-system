//search小仓库
// 导入searchAPI
import { reqGetSearch } from '@/API/Apiindex'
const state = {
  search: {}
}
const actions = {
  async getsearchlist({ commit }, data = {}) {
    let result = await reqGetSearch(data)
    if (result.code === 200) {
      commit('GETSEARCJLIST', result.data)
    }
  }
}
const mutations = {
  GETSEARCJLIST(state, data) {
    state.search = data
  }
}
// 计算属性
// 项目当中的getters是为了简化数据
const getters = {
  goodsList(state) {
    return state.search.goodsList || []
  },
  attrsList(state) {
    return state.search.attrsList || []
  },
  trademarkList(state) {
    return state.search.trademarkList || []
  }
}
export default { state, actions, mutations, getters }
