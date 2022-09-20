/*
 * @FilePath: \ccit-admin-to-web\src\biz\shared\schema.js
 * @Author: maggot-code
 * @Date: 2022-09-20 11:22:59
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 11:23:21
 * @Description:
 */
import { unref, shallowRef, computed } from "@vue/composition-api";

export function SchemaFactory(parts) {
  const data = shallowRef(parts ?? {});
  const len = computed(() => {
    return Array.isArray(unref(data))
      ? unref(data).length
      : Object.keys(unref(data)).length;
  });
  const usable = computed(() => unref(len) > 0);
  const unusable = computed(() => !unref(usable));
  function setup(value) {
    data.value = value ?? {};
  }

  return {
    data,
    len,
    usable,
    unusable,
    setup,
  };
}

export default SchemaFactory;
