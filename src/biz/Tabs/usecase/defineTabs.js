/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tabs\usecase\defineTabs.js
 * @Author: maggot-code
 * @Date: 2022-09-16 13:51:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 14:23:17
 * @Description:
 */
import {
  onUnmounted,
  watchEffect,
  unref,
  computed,
  ref,
  shallowRef,
} from "@vue/composition-api";
import { TabConfigService } from "@/biz/Tabs/service/tabConfig.service";

export function defineTabs() {
  const { load, result, send } = TabConfigService();
  const active = ref("");
  const schema = shallowRef([]);
  const hasSchema = computed(() => unref(schema).length > 0);
  const current = computed(() => {
    if (!unref(hasSchema)) return { template: "unknow" };

    const index = unref(schema).findIndex(({ id }) => id === unref(active));
    return unref(schema).at(index);
  });
  const template = computed(() => unref(current).template);

  watchEffect(() => {
    if (!unref(load)) return;

    active.value = unref(result)?.active;
    schema.value = unref(result)?.schema;
  });

  onUnmounted(() => {
    active.value = "";
    schema.value = [];
  });

  return {
    load,
    send,
    data: {
      active,
      schema,
      hasSchema,
      current,
      template,
    },
  };
}

export default defineTabs;
