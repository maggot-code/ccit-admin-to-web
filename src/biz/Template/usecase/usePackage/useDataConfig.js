/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\usePackage\useDataConfig.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:41:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 13:59:15
 * @Description:
 */
import { DataConfigSymbolKey } from "@/biz/Template/shared/context";
import { setupDataConfig } from "@/biz/Template/service/dataConfig.service";

export function useDataConfig() {
  function sendDataConfig() {
    console.log(`send ${DataConfigSymbolKey.toString()} request!`);
  }

  return {
    sendDataConfig,
  };
}

export default useDataConfig;
