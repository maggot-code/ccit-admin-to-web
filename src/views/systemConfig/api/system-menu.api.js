/*
 * @FilePath: \ccit-admin-to-web\src\views\systemConfig\api\system-menu.api.js
 * @Author: zhangxin
 * @Date: 2022-08-30 17:21:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-08 15:47:47
 * @Description:
 */
import request from "@/utils/request";

export function getSelectionList(id) {
  return request({
    url: `/api/example/Sm_codeitem/getSelect/${id}`,
    method: "GET",
  });
}

// 获取树形结构菜单列表
export function getSystemMenuList(params) {
  return request({
    url: `/api/example/Sm_Functiontree/Menu`,
    method: "GET",
    params,
  });
}

// 根据id获取菜单详情
export function getSystemMenuInfoById(id) {
  return request({
    url: `/api/example/Sm_Functiontree/${id}`,
    method: "GET",
  });
}

// 新建菜单
export function createSystemMenuInfo(data) {
  return request({
    url: `/api/example/Sm_Functiontree`,
    method: "POST",
    data,
  });
}

// 根据id修改菜单
export function putSystemMenuInfoById(params) {
  const { id, ...other } = params;
  return request({
    url: `/api/example/Sm_Functiontree/${id}`,
    method: "PUT",
    data: other,
  });
}

// 根据id删除菜单
export function delSystemMenuInfoById(id) {
  return request({
    url: `/api/example/Sm_Functiontree/${id}`,
    method: "DELETE",
  });
}

// 查询菜单 - 弹框中的上级下拉选
export function selectSystemMenu() {
  return request({
    url: `/api/example/Sm_Functiontree/Menu/Selector`,
    method: "GET",
    params: { category: "Web" },
  });
}

// 通过id修改菜单状态
export function revisionMenuStatusById(id) {
  return request({
    url: `/api/example/Sm_Functiontree/${id}/State`,
    method: "PUT",
  });
}
