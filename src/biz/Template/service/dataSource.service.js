/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\service\dataSource.service.js
 * @Author: maggot-code
 * @Date: 2022-09-19 13:23:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 16:20:17
 * @Description:
 */
import { inject, unref } from "@vue/composition-api";
import { DataSourceSymbolKey } from "@/biz/Template/shared/context";
import { Service } from "@/biz/shared/service";

import { mockRequest } from "@/biz/shared/mock";

const ServiceAddress = "/api/biz/data/source";

function BizDataSource({ params, data }) {
  console.log(params, data);
  // axios
  // return request({})
  const Response = {
    total: 107,
    data: [],
  };
  for (let index = 0; index < 20; index++) {
    const number = Math.random();
    const choice = number > 0.5 ? true : false;

    Response.data.push({
      rowpower: choice ? "back" : "check",
      submittime: "2021-04-06 00:00:00",
      allusers: number,
      userid: number,
      checkresult: "0820",
      projno: "123",
      allusersname: "系统管理员",
      endtime: "2021-06-30 00:00:00",
      birth: "2020-12-01 00:00:00",
      submitman: 10000,
      projsourcesname: "市财政",
      starttime: "2021-04-06 00:00:00",
      submitmanname: "系统管理员",
      inhome: "001",
      checkresultname: "呼吸所办公室审核",
      projtype: "01",
      inhomename: "北京市呼吸疾病研究所",
      name: "测试项目",
      projecttype: "01",
      checktableid: 10,
      id: 10,
      projtotalfunding: 120.64,
      projtypename: "临床研究",
      projsources: "01",
      useridname: "系统管理员",
    });
  }

  return mockRequest(ServiceAddress, Response);
}

export function DataSourceService() {
  const request = inject(DataSourceSymbolKey, BizDataSource);

  const service = Service(request);
  function send(list, search) {
    return service.execute({
      params: unref(list.listParams),
      data: unref(search.searchData),
    });
  }

  // not return TODO ...
  return Object.assign({}, service, { send });
}

export default DataSourceService;
