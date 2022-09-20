/*
 * @FilePath: \ccit-admin-to-web\src\biz\shared\service.js
 * @Author: maggot-code
 * @Date: 2022-09-16 13:54:21
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 13:30:09
 * @Description:
 */
import { watch, ref, shallowRef, unref, computed } from "@vue/composition-api";

export function toState(struct, target) {
  const unwatch = watch(
    [struct.isFinished, struct.isPending, struct.isReject],
    ([finished, pending, reject]) => {
      const state = finished && !pending && !reject;
      if (!state) return;
      target.toReady();
      unwatch();
    }
  );

  return unwatch;
}

export function Service(request) {
  const isState = ref(false);
  const isFinished = ref(false);
  const isPending = ref(false);
  const result = shallowRef(null);
  const usableResult = computed(() => !!unref(result));
  const load = computed(() => {
    return (
      !unref(isState) &&
      !unref(isPending) &&
      unref(isFinished) &&
      unref(usableResult)
    );
  });

  async function execute(options) {
    signal(true);
    // request;
    return new Promise((resolve, reject) =>
      request(options)
        .then(async (response) => {
          result.value = response;
          return resolve(response);
        })
        .catch(async (error) => {
          console.log(error);
          return resolve(null);
        })
        .finally(() => {
          signal(false);
        })
    );
  }

  function signal(state) {
    isPending.value = state;
    isFinished.value = !state;
  }
  function setupState(state) {
    isState.value = state;
  }

  return {
    isFinished,
    isPending,
    usableResult,
    result,
    load,
    execute,
    startLoad: () => setupState(true),
    endLoad: () => setupState(false),
  };
}

export default Service;
