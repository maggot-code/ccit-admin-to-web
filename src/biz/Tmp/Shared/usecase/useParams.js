/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\Shared\usecase\useParams.js
 * @Author: maggot-code
 * @Date: 2022-09-20 17:31:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 17:33:09
 * @Description:
 */
import { inject, unref } from "@vue/composition-api";
import { ParamsSymbolKey } from "../context";

export const defaultParams = {};

export function useParams() {
  const params = inject(ParamsSymbolKey, defaultParams);

  return {
    config: unref(params),
  };
}

export default useParams;
