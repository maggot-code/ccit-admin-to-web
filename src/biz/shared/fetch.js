/*
 * @FilePath: \ccit-admin-to-web\src\biz\shared\fetch.js
 * @Author: maggot-code
 * @Date: 2022-09-19 17:34:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 17:34:56
 * @Description:
 */
import { ref, shallowRef, unref, computed } from "@vue/composition-api";

export function Fetch(request) {
  const isFinished = ref(false);
  const isPending = ref(false);
  const result = shallowRef(null);
  const usableResult = computed(() => !!unref(result));

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

  return {
    isFinished,
    isPending,
    usableResult,
    result,
    execute,
  };
}

export default Fetch;
