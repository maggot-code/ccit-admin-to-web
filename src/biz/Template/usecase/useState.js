/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\useState.js
 * @Author: maggot-code
 * @Date: 2022-09-13 10:40:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 11:29:43
 * @Description:
 */
import { unref, ref, computed } from "@vue/composition-api";
import { toNamespace } from "@/biz/shared/utils";

export function useState(options = {}) {
  const selfState = ref(options?.state ?? false);
  const state = computed(() => unref(selfState));

  function setupState(rawState) {
    const value = unref(rawState) ?? false;
    if (unref(selfState) === value) return unref(selfState);

    selfState.value = value;

    return unref(selfState);
  }
  function usable() {
    return setupState(true);
  }
  function unusable() {
    return setupState(false);
  }

  return {
    setupState,
    ...toNamespace(options?.namespace ?? "", {
      state,
      usableState: usable,
      unusableState: unusable,
    }),
  };
}

export default useState;
