/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\usecase\useDataSource.js
 * @Author: maggot-code
 * @Date: 2022-09-20 14:02:52
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 15:48:07
 * @Description:
 */
import { onBeforeUnmount, nextTick, watch, unref } from "@vue/composition-api";

function toValid(item) {
  return !!item;
}

export function useDataSource(options, context) {
  const { search, list, data } = options;
  const { body, query } = context;
  const { form } = search;
  const { table } = list;

  const unwatchParams = watch([form.isReady, table.isReady], async (states) => {
    if (!states.every(toValid)) return;

    await nextTick();
    unwatchParams();
    data.send({
      body: unref(body),
      query: unref(query),
    });
  });

  return {};
}

export default useDataSource;
