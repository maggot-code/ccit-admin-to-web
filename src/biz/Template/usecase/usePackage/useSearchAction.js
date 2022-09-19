/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\usePackage\useSearchAction.js
 * @Author: maggot-code
 * @Date: 2022-09-19 13:44:48
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 14:43:37
 * @Description:
 */
import {
  watchEffect,
  unref,
  ref,
  shallowRef,
  computed,
} from "@vue/composition-api";

function toQuery(rawQuery) {
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
  const { config } = options;

  const formData = shallowRef({});
  const searchRefs = ref();
  const searchData = computed(() => {
    return toQuery(unref(formData));
  });

  function setupFormData() {
    // validate
    const { data } = unref(searchRefs).formOutput();
    formData.value = data;
  }
  function handlerQuery() {
    setupFormData();
  }
  function handlerReset() {
    unref(searchRefs).resetForm();
    setupFormData();
    // run handler query to select
  }

  watchEffect(() => {
    if (!unref(config.load)) return;

    setupFormData();
  });

  const data = {
    searchRefs,
    handlerQuery,
    handlerReset,
  };
  return {
    ...data,
    data,
    searchData,
  };
}

export default useSearchAction;
