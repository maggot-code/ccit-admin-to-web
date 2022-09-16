/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tabs\service\tabConfig.service.js
 * @Author: maggot-code
 * @Date: 2022-09-16 13:56:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 14:12:23
 * @Description:
 */
import { Service } from "@/biz/shared/service";

import { mockRequest } from "@/biz/shared/mock";
import MockResponse from "../__test__/response/test-tabs.json";

const ServiceAddress = "/api/biz/tabs/config";

function BizTabsConfig() {
  // axios
  // return request({})

  return mockRequest(ServiceAddress, MockResponse);
}

export function TabConfigService() {
  const request = BizTabsConfig;

  const service = Service(request);
  function send() {
    return service.execute();
  }

  // not return TODO ...
  return Object.assign({}, service, { send });
}

export default TabConfigService;
