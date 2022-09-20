/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\usecase\defineDataSource.js
 * @Author: maggot-code
 * @Date: 2022-09-20 13:59:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 14:22:17
 * @Description:
 */
import { inject, unref } from "@vue/composition-api";

import Source from "../entity/Source";
import { DataService, request } from "../service/data.service";

function toSend(struct, params, source) {
  async function send() {
    const response = await struct.execute(params.config);
    if (unref(struct.isReject)) return null;

    source.setup(toSchema(response));
    return response;
  }

  return send;
}

export function defineDataSource(options) {
  const { params } = options;
  const dataRequest = inject("dataRequest", request);
  const source = Source();

  const struct = DataService(dataRequest);

  const send = toSend(struct, params, source);

  const template = {
    choice: source.choiceSchema,
    data: source.dataSchema,
    total: source.total,
  };
  return {
    source,
    struct,
    template,
    send,
  };
}

export default defineDataSource;
