/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\usePackage\useSearchConfig.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:39:55
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 16:28:37
 * @Description:
 */
import { unref, computed } from "@vue/composition-api";
import { SearchConfigService } from "@/biz/Template/service/searchConfig.service";

export function useSearchConfig() {
  const { load, result, send } = SearchConfigService();

  const date = computed(() => unref(result)?.date);

  return {
    load,
    send,
    data: {
      date,
    },
  };
}

export default useSearchConfig;
