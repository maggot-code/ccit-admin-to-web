/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\Shared\usecase\useState.js
 * @Author: maggot-code
 * @Date: 2022-09-20 17:36:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 17:36:49
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
