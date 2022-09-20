/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\service\data.service.js
 * @Author: maggot-code
 * @Date: 2022-09-20 14:14:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 14:16:00
 * @Description:
 */
import Fetch from "@/biz/shared/fetch";

import { mockRequest } from "@/biz/shared/mock";

const ServiceAddress = "/biz/list/data";

export function request() {
  // axios
  const data = {
    data: [],
    total: 0,
  };
  return mockRequest(ServiceAddress, data);
}

export function DataService(request) {
  const service = Fetch(request);

  // TODO..
  return service;
}

export default DataService;
