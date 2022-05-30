import request from "@/utils/request";
export const reqSpuInfoList = (page, limit, c3Id) =>
  request({
    url: `/get-goods/admin/product/${page}/${limit}`,
    method: "GET",
    params: {
      category3Id: c3Id,
    },
  });
// GET /admin/product/getSpuById/{spuId}
export const reqGetSpuById = (spuId) =>
  request({
    url: `/get-goods/admin/product/getSpuById/${spuId}`,
    method: "GET",
  });
// /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () =>
  request({
    url: "/get-goods/admin/product/baseTrademark/getTrademarkList",
    method: "GET",
  });
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) =>
  request({
    url: `/get-goods/admin/product/spuImageList/${spuId}`,
    method: "GET",
  });
// GET /admin/product/baseSaleAttrList
export const reqbaseSaleAttrList = () =>
  request({
    url: "/get-goods/admin/product/baseSaleAttrList",
    method: "GET",
  });
// 保存/admin/product/saveSpuInfo post
// {
//
// }
