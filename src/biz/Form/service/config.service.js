/*
 * @FilePath: \ccit-admin-to-web\src\biz\Form\service\config.service.js
 * @Author: maggot-code
 * @Date: 2022-09-16 15:31:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 15:49:09
 * @Description:
 */
import { inject } from "@vue/composition-api";
import { FormConfigSymbolKey } from "@/biz/Form/shared/context";
import { Service } from "@/biz/shared/service";

import { mockRequest } from "@/biz/shared/mock";
import MockResponse from "../__test__/response/test-form.json";

const ServiceAddress = "/api/biz/form/config";

function BizFormConfig() {
  // axios
  // return request();

  return mockRequest(ServiceAddress, MockResponse);
}

export function FormConfigService() {
  const request = inject(FormConfigSymbolKey, BizFormConfig);

  const service = Service(request);
  function send() {
    return service.execute();
  }

  // not return TODO ...
  return Object.assign({}, service, { send });
}

export default FormConfigService;
