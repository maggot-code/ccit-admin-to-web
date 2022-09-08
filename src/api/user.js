/*
 * @FilePath: \ccit-admin-to-web\src\api\user.js
 * @Author: maggot-code
 * @Date: 2022-02-28 10:15:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-08 15:44:37
 * @Description:
 */
import request from "@/utils/request";

// 用户登录
export function login(data) {
  return request({
    url: "/api/iam/Login",
    method: "post",
    data,
    params: {
      client_id: "admin",
      client_secret: "123456",
      scope: "all",
      grant_type: "password",
    },
  });
}

// 获取当前用户信息
// export function getInfo() {
//   return request({
//     url: '/api/iam/Business/CurrentUser',
//     method: 'get',
//   })
// }
export function getInfo() {
  return request({
    url: "/api/example/Sm_Functiontree/CurrentUser",
    method: "get",
  });
}

// 退出登录
export function logout() {
  return request({
    url: "/api/iam/Logout",
    method: "get",
  });
}

// 锁屏解锁登录
export function unlock(data) {
  return request({
    url: "/api/iam/LockScreen",
    method: "post",
    data,
  });
}

// 获取用户配置
export function getUserConfig() {
  return request({
    url: "/api/system/Base/UserConfig",
    method: "GET",
  });
}

// 更新用户配置
export function updateUserConfig(data) {
  return request({
    url: "/api/system/Base/UserConfig",
    method: "PUT",
    data,
  });
}
