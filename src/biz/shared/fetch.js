/*
 * @FilePath: \ccit-admin-to-web\src\biz\shared\fetch.js
 * @Author: maggot-code
 * @Date: 2022-09-19 17:34:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 10:22:58
 * @Description:
 */
import { ref, shallowRef, unref, computed } from "@vue/composition-api";

export function Fetch(request) {
  const result = shallowRef(null);
  const isReject = computed(() => !unref(result));
  const isFinished = ref(false);
  const isPending = ref(false);

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
          result.value = null;
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
    result,
    isReject,
    isFinished,
    isPending,
    execute,
  };
}

export default Fetch;
