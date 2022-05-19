import store from '@/store'
import axios from 'axios'
// 导入进度条
import nprogress from 'nprogress'
// 导入进度条样式
import 'nprogress/nprogress.css'

// import { config } from 'vue/types/umd'
// 二次封装
const requsets = axios.create({
  // http://gmall-h5-api.atguigu.cn

  baseURL: '/api',
  timeout: 5000
})
// 设置请求拦截器
requsets.interceptors.request.use(config => {
  if (store.state.detail.uuidToken) {
    config.headers.userTempId = store.state.detail.uuidToken
  }
  if (store.state.userInfo.token) config.headers.token = store.state.userInfo.token
  nprogress.start()
  return config
})
// 设置响应拦截器
requsets.interceptors.response.use(
  res => {
    nprogress.done()
    // console.log(res)
    return res.data
  },
  error => {
    return Promise.reject(new Error('faile'))
  }
)
export default requsets
