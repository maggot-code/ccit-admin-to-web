/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\usecase\useDataSource.js
 * @Author: maggot-code
 * @Date: 2022-09-20 14:02:52
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 16:42:37
 * @Description:
 */
import {
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  unref,
} from "@vue/composition-api";

function toValid(item) {
  return !!item;
}

export function useDataSource(options, context) {
  const { search, list, data } = options;
  const { body, query } = context;
  const { form } = search;
  const { table, control } = list;

  const unwatchParams = watch([form.isReady, table.isReady], async (states) => {
    if (!states.every(toValid)) return;

    unwatchParams();
    await nextTick();
    setupData();
  });

  function setupLayout() {
    return Promise.allSettled([search.send(), list.send()]);
  }
  async function setupData() {
    const response = await data.send({
      body: unref(body),
      query: unref(query),
    });
    control.resize.refresh();
    return response;
  }

  onMounted(() => {
    setupLayout();
  });

  onBeforeUnmount(() => {
    unwatchParams();
  });

  return { setupData };
}

export default useDataSource;
