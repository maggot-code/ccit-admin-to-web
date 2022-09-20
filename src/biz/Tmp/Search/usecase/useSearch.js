/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\Search\usecase\useSearch.js
 * @Author: maggot-code
 * @Date: 2022-09-20 10:27:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 17:22:19
 * @Description:
 */
import {
  onBeforeUnmount,
  nextTick,
  watch,
  unref,
  computed,
} from "@vue/composition-api";

function serializeQuery(rawQuery) {
  const query = {};

  Object.keys(rawQuery).forEach((field) => {
    const value = rawQuery[field];
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      value.length <= 0
    )
      return;

    query[field] = value;
  });

  return Object.keys(query).length <= 0 ? { searchnoquery: "no" } : query;
}

export function useSearch(options) {
  const { search } = options;
  const { form } = search;

  const body = computed(() => serializeQuery(unref(form.data.data)));

  const unwatchBody = watch(form.isReady, async (state) => {
    if (!state) return;

    await nextTick();
    setupBody();
    unwatchBody();
  });

  function setupBody() {
    const { data } = unref(form.refs).formOutput();
    form.data.setup(data);
  }
  function resetBody() {
    unref(form.refs).resetForm();
    setupBody();
  }

  onBeforeUnmount(() => {
    unwatchBody();
  });
  return {
    body,
    setupBody,
    resetBody,
  };
}

export default useSearch;
