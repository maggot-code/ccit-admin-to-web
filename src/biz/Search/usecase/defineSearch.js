/*
 * @FilePath: \ccit-admin-to-web\src\biz\Search\usecase\defineSearch.js
 * @Author: maggot-code
 * @Date: 2022-09-20 09:49:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 11:03:44
 * @Description:
 */
import { onBeforeUnmount, watch, inject, unref } from "@vue/composition-api";
import { defineForm } from "@/biz/Form";

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

function toState(struct, form) {
  const unwatch = watch(
    [struct.isFinished, struct.isPending, struct.isReject],
    ([finished, pending, reject]) => {
      const state = finished && !pending && !reject;
      if (!state) return;
      form.form.toReady();
      unwatch();
    }
  );

  return unwatch;
}

function toSend(struct, params, form) {
  async function send() {
    const response = await struct.execute(params.config);
    if (unref(struct.isReject)) return null;

    form.schema.setup(toSchema(response));
    return response;
  }

  return send;
}

export function defineSearch(options) {
  const { tmpParams } = options;
  const searchRequest = inject("searchRequest", request);

  const struct = ConfigService(searchRequest);
  const form = defineForm();

  const unwatchState = toState(struct, form);
  const send = toSend(struct, tmpParams, form);

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
