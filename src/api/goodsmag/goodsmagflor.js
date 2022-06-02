import request from "@/utils/request";
// GET /admin/product/list/{page}/{limit}
export const reqSkuInfo = (page, limit) =>
  request({
    url: `/get-goods/admin/product/list/${page}/${limit}`,
    method: "GET",
  });
// GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) =>
  request({
    url: `/get-goods/admin/product/onSale/${skuId}`,
    method: "GET",
  });
// /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) =>
  request({
    url: `/get-goods/admin/product/cancelSale/${skuId}`,
    method: "GET",
  });
// /admin/product/getSkuById/{skuId}
export const reqGetSkuById = (skuId) =>
  request({
    url: `/get-goods/admin/product/getSkuById/${skuId}`,
    method: "GET",
  });
// /admin/product/deleteSku/{skuId}
export const reqDeleteSku = (skuId) =>
  request({
    url: `/get-goods/admin/product/deleteSku/${skuId}`,
    method: "DELETE",
  });
