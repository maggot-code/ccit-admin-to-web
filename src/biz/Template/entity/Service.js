/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\entity\Service.js
 * @Author: maggot-code
 * @Date: 2022-09-13 15:00:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 16:24:39
 * @Description:
 */
import { ref, shallowRef, unref, computed } from "@vue/composition-api";

export function Service(request) {
  const isFinished = ref(false);
  const isPending = ref(false);
  const result = shallowRef(null);
  const usableResult = computed(() => !!unref(result));
  const load = computed(() => {
    return !unref(isPending) && unref(isFinished) && unref(usableResult);
  });
  async function execute() {
    signal(true);
    // request;
    return new Promise((resolve, reject) =>
      request()
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

  return {
    isFinished,
    isPending,
    usableResult,
    result,
    load,
    execute,
  };
}

export default Service;
