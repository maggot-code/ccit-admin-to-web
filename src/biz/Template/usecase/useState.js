/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\useState.js
 * @Author: maggot-code
 * @Date: 2022-09-13 10:40:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 11:23:38
 * @Description:
 */
import { unref, ref, computed } from "@vue/composition-api";
import { toNamespace } from "@/biz/shared/utils";

export function useState(options = {}) {
  const selfState = ref(options?.state ?? false);
  const state = computed(() => unref(selfState));

  function setupState(rawState = false) {
    if (unref(selfState) === rawState) return unref(selfState);

    selfState.value = rawState;

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
