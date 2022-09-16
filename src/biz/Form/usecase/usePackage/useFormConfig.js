/*
 * @FilePath: \ccit-admin-to-web\src\biz\Form\usecase\usePackage\useFormConfig.js
 * @Author: maggot-code
 * @Date: 2022-09-16 15:30:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 15:42:01
 * @Description:
 */
import { unref, computed, ref } from "@vue/composition-api";
import { FormConfigService } from "@/biz/Form/service/config.service";

export function useFormConfig() {
  const { load, result, send } = FormConfigService();

  const token = ref("");
  const proName = ref("");
  const formSchema = computed(() => {
    return Object.assign({}, unref(result)?.formSchema, {
      inline: false,
    });
  });
  const cellSchema = computed(() => unref(result)?.cellSchema ?? []);

  return {
    load,
    send,
    data: {
      token,
      proName,
      formSchema,
      cellSchema,
    },
  };
}

export default useFormConfig;
