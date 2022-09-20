/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\List\usecase\defineList.js
 * @Author: maggot-code
 * @Date: 2022-09-20 13:08:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 13:37:37
 * @Description:
 */
import { onBeforeUnmount, inject, unref } from "@vue/composition-api";
import { defineTable } from "@/biz/Table";
import { toState } from "@/biz/shared/service";

import { ConfigService, request } from "../service/config.service";

function toSend(struct, params, table) {
  async function send() {
    const response = await struct.execute(params.config);
    if (unref(struct.isReject)) return null;

    table.schema.setup(response);
    table.control.setup(response);
    return response;
  }

  return send;
}

export function defineList(options) {
  const { tmpParams } = options;
  const listRequest = inject("listRequest", request);

  const struct = ConfigService(listRequest);
  const table = defineTable();

  const unwatchState = toState(struct, table.table);
  const send = toSend(struct, tmpParams, table);

  onBeforeUnmount(unwatchState);

  const template = Object.assign({}, table.template, {});
  return {
    ...table,
    struct,
    template,
    send,
  };
}

export default defineList;
