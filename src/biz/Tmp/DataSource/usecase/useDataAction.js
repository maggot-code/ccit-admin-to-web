/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\usecase\useDataAction.js
 * @Author: maggot-code
 * @Date: 2022-09-20 14:36:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 17:27:51
 * @Description:
 */
import { onUnmounted, unref } from "@vue/composition-api";
import { createEventHook } from "@vueuse/core";

export function useDataAction(options, context) {
  const { list } = options;
  const { body, query, setupBody, resetBody } = context;
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
    setupBody();
    table.data.setup(target);

    requestEvent.trigger(uncontext());
  }
  function searchQuery() {
    if (unref(isFirstPage)) {
      setupBody();
      requestEvent.trigger(uncontext());
    } else {
      control.reset.refresh();
    }
  }
  function searchReset() {
    resetBody();
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
