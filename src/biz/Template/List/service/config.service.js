/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\List\service\config.service.js
 * @Author: maggot-code
 * @Date: 2022-09-20 13:06:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 13:08:00
 * @Description:
 */
import Fetch from "@/biz/shared/fetch";

import { mockRequest } from "@/biz/shared/mock";
import MockData from "../__test__/director.list.json";

const ServiceAddress = "/biz/list/config";

export function request() {
  // axios
  return mockRequest(ServiceAddress, MockData);
}

export function ConfigService(request) {
  const service = Fetch(request);

  // TODO..
  return service;
}

export default ConfigService;
