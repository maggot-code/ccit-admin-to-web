/*
 * @FilePath: \ccit-business\src\utils\define.js
 * @Author: maggot-code
 * @Date: 2022-09-01 17:10:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-01 17:46:32
 * @Description: 
 */
// 开发环境接口配置
// const APIURl = 'http://192.168.3.138:30000'
// const APIURl = 'http://172.20.8.184:30000'
// const APIURl = 'http://172.16.12.24'
const APIURl = "http://192.1.1.6:8099";
module.exports = {
  APIURl: APIURl,
  timeout: process.env.NODE_ENV === "development" ? 1000000 : 1000000,
  WebSocketUrl: APIURl.replace("http", "ws") + "/api/system/Message/websocket",
  comUploadUrl: process.env.VUE_APP_BASE_API + "/api/file/Uploader",
  // comUrl: "http://192.168.3.138:30000",
  // comUrl: "http://172.20.8.184:30000",
  comUrl: "http://192.1.1.6:8099",
  // 大屏应用前端路径
  dataV:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8100/DataV"
      : process.env.VUE_APP_BASE_API + "/DataV",
  // 数据报表
  reportServer:
    process.env.NODE_ENV === "development"
      ? "http://localhost:30007/DataReport"
      : process.env.VUE_APP_BASE_API + "/DataReport",
  report:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8200/html"
      : process.env.VUE_APP_BASE_API + "/Report",
  version: "3.1",
};
