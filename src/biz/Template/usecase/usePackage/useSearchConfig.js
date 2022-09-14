/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\usePackage\useSearchConfig.js
 * @Author: maggot-code
 * @Date: 2022-09-13 13:39:55
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-14 15:48:36
 * @Description:
 * schema.formSchema:{
 *  inline: 是否行内表单（行内用来做搜索表单）
 *  disabled: 是否禁用整个表单
 *  labelWidth: 标签宽度
 *  gutter: 表单项间隔
 * }
 * schema.cellSchema:[]
 * proName:""
 * token:""
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
