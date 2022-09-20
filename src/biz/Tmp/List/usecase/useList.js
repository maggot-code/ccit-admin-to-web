/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\List\usecase\useList.js
 * @Author: maggot-code
 * @Date: 2022-09-20 13:48:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 15:04:48
 * @Description:
 */
import { nextTick, watch, unref, computed } from "@vue/composition-api";

export function useList(options) {
  const { list } = options;
  const { table } = list;

  const query = computed(() => unref(table.data.data));

  return {
    query,
  };
}

export default useList;
