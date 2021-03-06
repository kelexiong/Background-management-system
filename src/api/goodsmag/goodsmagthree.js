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
// 添加/admin/product/saveSpuInfo post
// /admin/product/updateSpuInfo POST 保存
export const reqUpdateAndSaveSpuInfo = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: "/get-goods/admin/product/updateSpuInfo",
      method: "POST",
      data: spuInfo,
    });
  } else {
    return request({
      url: "/get-goods/admin/product/saveSpuInfo",
      method: "POST",
      data: spuInfo,
    });
  }
};
// 删除SPU /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>
  request({
    url: `/get-goods/admin/product/deleteSpu/${spuId}`,
    method: "DELETE",
  });

// SKU模块GET /admin/product/spuSaleAttrList/{spuId}  this.$API.magtow.getAttributeData  this.reqSpuImageList
export const reqspuSaleAttrList = (spuId) =>
  request({
    url: `/get-goods/admin/product/spuSaleAttrList/${spuId}`,
    method: "GET",
  });
// /admin/product/saveSkuInfo post
export const reqSaveSkuInfo = (skuInfo) =>
  request({
    url: "/get-goods/admin/product/saveSkuInfo",
    method: "POST",
    data: skuInfo,
  });
// GET /admin/product/findBySpuId/{spuId}
export const reqFindBySpuId = (spuId) =>
  request({
    url: `/get-goods/admin/product/findBySpuId/${spuId}`,
    method: "GET",
  });
/*
*@as
*@ssx
x
xxx
x
*/
