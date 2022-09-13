/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\service\dataConfig.service.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:37:44
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 13:46:50
 * @Description:
 */
import { mockRequest } from "@/biz/shared/mock";

const ServiceAddress = "/api/biz/data/config";

export function setupDataConfig() {
  return mockRequest(ServiceAddress, {});
}

export default {};
