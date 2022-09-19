/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\usePackage\useSearchAction.js
 * @Author: maggot-code
 * @Date: 2022-09-19 13:44:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 16:49:28
 * @Description:
 */
import {
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  unref,
  ref,
  shallowRef,
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

export function useSearchAction(options) {
  const { config, listConfig } = options;

  let actionToQuery = () => {};
  let actionToReset = () => {};

  const formData = shallowRef({});
  const searchRefs = ref();
  const searchData = computed(() => {
    return serializeQuery(unref(formData));
  });

  function setupFormData() {
    // validate
    const { data } = unref(searchRefs).formOutput();
    formData.value = data;
    return data;
  }
  function handlerQuery() {
    listConfig.handlerResetCurrentPage();
    setupFormData();
    actionToQuery();
  }
  function handlerReset() {
    unref(searchRefs).resetForm();
    setupFormData();
    // run handler query to select
    actionToReset();
  }
  function toQuery(toHandler) {
    actionToQuery = toHandler;
  }
  function toReset(toHandler) {
    actionToReset = toHandler;
  }

  watch(config.load, (state) => {
    if (!unref(state)) return;

    setupFormData();
  });
  onMounted(async () => {
    config.startLoad();

    await nextTick();
    config.endLoad();
  });
  onBeforeUnmount(config.startLoad);

  const data = {
    searchRefs,
    handlerQuery,
    handlerReset,
  };
  return {
    ...data,
    data,
    searchData,
    toQuery,
    toReset,
  };
}

export default useSearchAction;
