/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\Search\usecase\useSearch.js
 * @Author: maggot-code
 * @Date: 2022-09-20 10:27:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 14:00:43
 * @Description:
 */
import { onMounted, unref } from "@vue/composition-api";

export function useSearch(options) {
  const { params, search, list } = options;

  function handlerQuery() {}

  return {
    handlerQuery,
  };
}

export default useSearch;
