/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\Search\usecase\defineSearch.js
 * @Author: maggot-code
 * @Date: 2022-09-20 09:49:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 15:46:35
 * @Description:
 */
import { onBeforeUnmount, inject, unref } from "@vue/composition-api";
import { defineForm } from "@/biz/Form";
import { toState } from "@/biz/shared/service";

import { ConfigService, request } from "../service/config.service";

const formSchemaConstant = {
  inline: true,
  labelWidth: "auto",
};

function toSchema({ formSchema, cellSchema }) {
  return {
    formSchema: Object.assign({}, formSchema, formSchemaConstant),
    cellSchema,
  };
}

function toSend(struct, params, form) {
  async function send(extend = {}) {
    const response = await struct.execute(
      Object.assign({}, params.config, extend)
    );
    if (unref(struct.isReject)) return null;

    form.schema.setup(toSchema(response));
    return response;
  }

  return send;
}

export function defineSearch(options) {
  const { params } = options;
  const searchRequest = inject("searchRequest", request);

  const struct = ConfigService(searchRequest);
  const form = defineForm();

  const unwatchState = toState(struct, form.form);
  const send = toSend(struct, params, form);

  onBeforeUnmount(unwatchState);

  const template = Object.assign({}, form.template, {});
  return {
    ...form,
    struct,
    template,
    send,
  };
}

export default defineSearch;
