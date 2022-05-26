import request from "@/utils/request";

export const getpage = (page, limit) =>
  request({
    url: `/get-goods/admin/product/baseTrademark/${page}/${limit}`,
    method: "GET",
  });
// 添加
export const upgoods = (data) =>
  request({
    url: "/get-goods/admin/product/baseTrademark/save",
    method: "POST",
    data,
  });
// 修改
export const putgoods = (data) =>
  request({
    url: "/get-goods/admin/product/baseTrademark/update",
    method: "PUT",
    data,
  });
// 删除
export const deletegoods = (id) =>
  request({
    url: `/get-goods/admin/product/baseTrademark/remove/${id}`,
    method: "DELETE",
  });
