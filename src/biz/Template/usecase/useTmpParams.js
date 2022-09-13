/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\useTmpParams.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:13:08
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 13:53:51
 * @Description:
 */
import { inject, unref } from "@vue/composition-api";
import { TmpParamsSymbolKey } from "@/biz/Template/shared/context";

export const defaultTmpParams = {};

export function useTmpParams() {
  const tmpParams = inject(TmpParamsSymbolKey, defaultTmpParams);

  return {
    config: unref(tmpParams),
  };
}

export default useTmpParams;
