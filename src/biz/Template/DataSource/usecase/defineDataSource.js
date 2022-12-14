/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\usecase\defineDataSource.js
 * @Author: maggot-code
 * @Date: 2022-09-20 13:59:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 16:51:55
 * @Description:
 */
import { inject, unref, computed } from "@vue/composition-api";

import Source from "../entity/Source";
import { DataService, request } from "../service/data.service";

function toSend(struct, params, source) {
  async function send(extend = {}) {
    const response = await struct.execute(
      Object.assign({}, params.config, extend)
    );
    if (unref(struct.isReject)) return null;

    source.setup(response);
    return response;
  }

  return send;
}

export function defineDataSource(options) {
  const { params } = options;
  const dataRequest = inject("dataRequest", request);
  const source = Source();

  const struct = DataService(dataRequest);
  const loading = computed(() => {
    return !(
      unref(struct.isFinished) &&
      !unref(struct.isPending) &&
      !unref(struct.isReject)
    );
  });

  const send = toSend(struct, params, source);

  const template = {
    choice: source.choiceSchema,
    data: source.dataSchema,
    total: source.total,
  };
  return {
    source,
    struct,
    loading,
    template,
    send,
  };
}

export default defineDataSource;
