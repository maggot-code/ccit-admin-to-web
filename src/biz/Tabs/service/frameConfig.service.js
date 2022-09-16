/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tabs\service\frameConfig.service.js
 * @Author: maggot-code
 * @Date: 2022-09-16 14:27:14
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 14:30:51
 * @Description:
 */
import { Service } from "@/biz/shared/service";

import { mockRequest } from "@/biz/shared/mock";
import FrameTabs1 from "../__test__/response/frame-tab1.json";
import FrameTabs2 from "../__test__/response/frame-tab2.json";
import FrameTabs3 from "../__test__/response/frame-tab3.json";

const ServiceAddress = "/api/biz/frame/config";

const response = {
  aaa: FrameTabs1,
  bbb: FrameTabs2,
  ccc: FrameTabs3,
};

function BizFrameConfig(params) {
  // axios
  // return request({})
  const { id } = params;

  return mockRequest(ServiceAddress, response[id] ?? {});
}

export function FrameConfigService() {
  const request = BizFrameConfig;

  const service = Service(request);
  function send() {
    return service.execute();
  }

  // not return TODO ...
  return Object.assign({}, service, { send });
}

export default FrameConfigService;
