import request from "@/utils/request";
export const levellOne = () =>
  request({
    url: "/get-goods/admin/product/getCategory1",
    method: "GET",
  });

export const levelTow = (category1Id) =>
  request({
    url: `/get-goods/admin/product/getCategory2/${category1Id}`,
    method: "GET",
  });
export const levelThree = (category2Id) =>
  request({
    url: `/get-goods/admin/product/getCategory3/${category2Id}`,
    method: "GET",
  });
export const getAttributeData = ({ category1Id, category2Id, category3Id }) =>
  request({
    url: `/get-goods/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "GET",
  });
export const addAttribute = (data) =>
  request({
    url: "/get-goods/admin/product/saveAttrInfo",
    method: "POST",
    data,
  });

export const deleteAttribute = (attrId) =>
  request({
    url: `/get-goods/admin/product/deleteAttr/${attrId}`,
    method: "DELETE",
  });
// {
//   "attrName": "string",
//   "attrValueList": [
//     {
//       "attrId": 0,
//       "valueName": "string"
//     }
//   ],
//   "categoryId": 0,
//   "categoryLevel": 0,
// }
