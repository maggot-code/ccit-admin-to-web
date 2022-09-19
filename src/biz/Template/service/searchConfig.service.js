/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\service\searchConfig.service.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:31:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 11:11:40
 * @Description:
 */
import { inject } from "@vue/composition-api";
import { SearchConfigSymbolKey } from "@/biz/Template/shared/context";
import { Service } from "@/biz/shared/service";

import { mockRequest } from "@/biz/shared/mock";
// import MockResponse from "../__test__/response/test-search.json";
import MockResponse from "../__test__/response/director.search.json";

const ServiceAddress = "/api/biz/search/config";

function BizSearchConfig() {
  // axios
  // return request();

  return mockRequest(ServiceAddress, MockResponse);
}

export function SearchConfigService() {
  const request = inject(SearchConfigSymbolKey, BizSearchConfig);

  const service = Service(request);
  function send() {
    return service.execute();
  }

  // not return TODO ...
  return Object.assign({}, service, { send });
}

export default SearchConfigService;
