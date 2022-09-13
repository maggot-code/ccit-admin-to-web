/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\useIntercept\useListConfig.js
 * @Author: maggot-code
 * @Date: 2022-09-13 14:19:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 14:26:23
 * @Description:
 */
import { provide } from "@vue/composition-api";
import { ListConfigSymbolKey } from "@/biz/Template/shared/context";

export function useListConfig(config) {
  function setupListConfig(handlerFunc) {
    // func = handlerFunc;
    provide(ListConfigSymbolKey, handlerFunc);
  }

  return {
    setupListConfig,
  };
}

export default useListConfig;
