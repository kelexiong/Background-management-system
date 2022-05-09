import requsets from './requset'

export const reqCategoryList = () =>
  requsets({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })
