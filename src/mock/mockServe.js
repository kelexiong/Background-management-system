// 引入mock
import Mock from 'mockjs'
// 导入banner图片
import banner from '@/mock/banner'
import floor from '@/mock/floor'
// 发起ajax拦截，mock方法（请求地址，请求放回参数）
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
