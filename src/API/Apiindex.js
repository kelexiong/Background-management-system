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
// 获取验证码/user/passport/sendCode/phone
export const reqgetvalidation = phone =>
  requsets({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
  })
// 注册用户/api/user/passport/register
export const reqregistereduser = data =>
  requsets({
    url: `/user/passport/register`,
    method: 'POST',
    data
  })
// 用户登录/api/user/passport/login
export const requserlogin = data =>
  requsets({
    url: '/user/passport/login',
    method: 'POST',
    data
  })
// 校验token api/user/passport/auth/getUserInfo
export const reqgetUserInfo = () =>
  requsets({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
  })
// 退出用户  /user/passport/logout
export const reqExitUserInfo = () =>
  requsets({
    url: '/user/passport/logout',
    method: 'GET'
  })
// 获取购物车结算 /order/auth/trade
export const reqtradeInfo = () =>
  requsets({
    url: '/order/auth/trade',
    method: 'GET'
  })
// 用户地址user/userAddress/auth/findUserAddressList  methood:get
export const requserAddress = () =>
  requsets({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'GET'
  })
