/*
 * @FilePath: \ccit-web-kit\src\biz\Template\DataSource\usecase\useDataAction.js
 * @Author: maggot-code
 * @Date: 2022-09-20 14:36:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 14:25:59
 * @Description:
 */
import { onUnmounted, unref } from "@vue/composition-api";
import { createEventHook } from "@vueuse/core";

export function useDataAction(options, context) {
  const { search, list } = options;
  const { body, query } = context;
  const {form} = search;
  const { table, isFirstPage, control } = list;
  const requestEvent = createEventHook();
  function uncontext() {
    return {
      body: unref(body),
      query: unref(query),
    };
  }

  function tableParams(target) {
    table.data.setup(target);
  }
  function tableHandle(target) {
    search.setupFormData(false);
    table.data.setup(target);

    requestEvent.trigger(uncontext());
  }
  function searchQuery() {
    if (unref(isFirstPage)) {
      search.setupFormData(false);
      requestEvent.trigger(uncontext());
    } else {
      control.reset.refresh();
    }
  }
  function searchReset() {
    search.resetFormData();
  }

  onUnmounted(() => {
    requestEvent.off();
  });
  const template = {
    tableParams,
    tableHandle,
    searchQuery,
    searchReset,
  };
  return {
    template,
    onRequest: requestEvent.on,
  };
}

export default useDataAction;
