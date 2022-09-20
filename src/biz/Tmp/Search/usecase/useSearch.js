/*
 * @FilePath: \ccit-admin-to-web\src\biz\Search\usecase\useSearch.js
 * @Author: maggot-code
 * @Date: 2022-09-20 10:27:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 10:48:16
 * @Description:
 */
import { onMounted, unref } from "@vue/composition-api";

export function useSearch(options) {
  const { tmpParams, search } = options;
  const { template, form } = search;

  function handlerQuery() {}

  return {
    handlerQuery,
  };
}

export default useSearch;
