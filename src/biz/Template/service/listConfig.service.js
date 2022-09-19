/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\service\listConfig.service.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:35:55
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 11:15:51
 * @Description:
 */
import { inject } from "@vue/composition-api";
import { ListConfigSymbolKey } from "@/biz/Template/shared/context";
import { Service } from "@/biz/shared/service";

import { mockRequest } from "@/biz/shared/mock";
// import MockResponse from "../__test__/response/test-table.json";
import MockResponse from "../__test__/response/director.list.json";

const ServiceAddress = "/api/biz/list/config";

function BizListConfig() {
  // axios
  // return request({})

  return mockRequest(ServiceAddress, MockResponse);
}

export function ListConfigService() {
  const request = inject(ListConfigSymbolKey, BizListConfig);

  const service = Service(request);
  function send() {
    return service.execute();
  }

  // not return TODO ...
  return Object.assign({}, service, { send });
}

export default ListConfigService;
