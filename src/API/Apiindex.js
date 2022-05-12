import requsets from './requset'
import mockRequset from '@/API/mockRequset'
// 暴露一个二次封装的ajax请求方法，获取三级联动列表
export const reqCategoryList = () =>
  requsets({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
// 暴露一个二次封装的ajax的mock请求方法
export const reqGetBanner = () =>
  mockRequset({
    url: '/banner',
    method: 'GET'
  })
export const reqGetFloor = () =>
  mockRequset({
    url: '/floor',
    method: 'GET'
  })
// list搜索列表
export const reqGetSearch = parms =>
  requsets({
    url: '/list',
    method: 'POST',
    data: parms
  })
