/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\usePackage\useListConfig.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:40:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 11:28:43
 * @Description:
 */
import { unref, computed } from "@vue/composition-api";
import { ListConfigService } from "@/biz/Template/service/listConfig.service";

function toObject(list) {
  const data = {};
  if (!Array.isArray(list)) return data;

  list.forEach((item) => {
    const { mode } = item;
    data[mode] = item;
  });
  return data;
}

export function useListConfig() {
  const { load, result, send } = ListConfigService();

  const uiSchema = computed(() => unref(result)?.uiSchema);
  const columnSchema = computed(() => unref(result)?.columnSchema);
  const controller = computed(() => {
    return toObject(
      unref(result)?.controller.filter((control) => {
        const { useRow } = control;
        return !!useRow;
      })
    );
  });
  const allController = computed(() => {
    return unref(result)?.controller.filter((control) => {
      const { useAll } = control;
      return !!useAll;
    });
  });
  const hasAllController = computed(() => unref(allController)?.length > 0);

  return {
    load,
    send,
    data: {
      uiSchema,
      columnSchema,
      controller,
      allController,
      hasAllController,
    },
  };
}

export default useListConfig;
