/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\usePackage\useDataSource.js
 * @Author: maggot-code
 * @Date: 2022-09-19 13:27:32
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 13:29:16
 * @Description:
 */
import { unref, computed } from "@vue/composition-api";
import { DataSourceService } from "@/biz/Template/service/dataSource.service";

export function useDataSource() {
  const { load, result, send } = DataSourceService();

  const total = computed(() => unref(result)?.total ?? 0);
  const data = computed(() => unref(result)?.data ?? []);

  return {
    load,
    send,
    data: {
      total,
      data,
    },
  };
}
