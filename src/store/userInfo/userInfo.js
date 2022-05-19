import { reqgetvalidation, reqregistereduser, requserlogin, reqgetUserInfo } from '@/API/Apiindex'
const state = {
  code: '',
  token: '',
  username: ''
}
const actions = {
  async getvalidationcode(context, phone) {
    let result = await reqgetvalidation(phone)
    if (result.code === 200) {
      context.commit('GETVALIDATIONCODE', result.data)
      return 'ok'
    } else return Promise.reject(new Error('获取验证码失败了~~'))
  },
  async sendregistered({ commit }, data) {
    let result = await reqregistereduser(data)

    if (result.code === 200) {
      return '注册成功ok,前往登录'
    } else return Promise.reject(new Error(result.message))
  },
  // 用户登录
  async loginuseraccount({ commit }, data) {
    let result = await requserlogin(data)
    if (result.code === 200) {
      commit('LOGINUSERACCOUNT', result.data)
      sessionStorage.setItem('token', result.data.token)
      return 'ok'
    } else return Promise.reject(new Error(result.message))
  },
  // 带token获取验证
  async getuserinfo({ commit }) {
    let result = await reqgetUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else return Promise.reject(new Error(result.message))
  }
}
const mutations = {
  GETVALIDATIONCODE(state, data) {
    state.code = data
  },
  LOGINUSERACCOUNT(state, data) {
    data.nickName ? (state.username = data.nickName) : (state.username = data.name)
    state.token = data.token
    // sessionStorage.setItem('username', state.username)
  },
  GETUSERINFO(state, data) {}
}
const getters = {}
export default { state, actions, mutations, getters }
