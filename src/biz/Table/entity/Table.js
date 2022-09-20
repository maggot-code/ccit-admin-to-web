/*
 * @FilePath: \ccit-admin-to-web\src\biz\Table\entity\Table.js
 * @Author: maggot-code
 * @Date: 2022-09-20 11:15:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 13:46:47
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
  function setup(response) {
    keyname.value = response?.keyname ?? "key";
  }

  return {
    isReady,
    refs,
    keyname,
    other,
    setup,
    toReady,
    toNotReady,
  };
}

export default Table;
