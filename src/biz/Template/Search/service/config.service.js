/*
 * @FilePath: \ccit-admin-to-web\src\biz\Search\service\config.service.js
 * @Author: maggot-code
 * @Date: 2022-09-20 09:59:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 10:19:45
 * @Description:
 */
import Fetch from "@/biz/shared/fetch";

import { mockRequest } from "@/biz/shared/mock";
import MockData from "../__test__/director.search.json";

const ServiceAddress = "/biz/search/config";

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
