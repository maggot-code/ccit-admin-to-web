/*
 * @FilePath: \ccit-admin-to-web\src\biz\Table\entity\Table.js
 * @Author: maggot-code
 * @Date: 2022-09-20 11:15:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 11:25:36
 * @Description:
 */
import { ref } from "@vue/composition-api";

function Other() {
  const loadPage = false;
  const defaultPageSize = 20;

  return {
    loadPage,
    defaultPageSize,
  };
}

export function Table() {
  const isReady = ref(false);
  const refs = ref();
  const keyname = ref("key");
  const other = Other();
  function toReady() {
    isReady.value = true;
  }
  function toNotReady() {
    isReady.value = false;
  }

  return {
    isReady,
    refs,
    keyname,
    other,
    toReady,
    toNotReady,
  };
}

export default Table;
