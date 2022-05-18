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
// 商品详情接口
export const reqGoodsInfo = skuId =>
  requsets({
    url: `/item/${skuId}`,
    method: 'GET'
  })
// 添加/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqShoppingCart = ({ skuId, skuNum }) =>
  requsets({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
export const reqGetShopCart = () =>
  requsets({
    url: 'cart/cartList',
    method: 'GET'
  })
// 修改商品/api/cart/checkCart/{skuID}/{isChecked}
export const reqCheckCart = ({ skuId, isChecked }) =>
  requsets({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
  })
// 删除商品接口/api/cart/deleteCart/{skuId}
export const reqdeleteCart = skuId =>
  requsets({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })
