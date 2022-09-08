/*
 * @FilePath: \ccit-admin-to-web\src\views\test\curd\hooks\useSignal.js
 * @Author: maggot-code
 * @Date: 2022-09-08 13:13:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-08 13:21:06
 * @Description:由于表单和表格渲染组件写的烂，有BUG，所以通过信号量来控制响应
 */
import {
  onBeforeUnmount,
  watch,
  unref,
  ref,
  computed,
} from "@vue/composition-api";

export function useSignal() {
  let unwatch = () => {};
  // 列表或者搜索需要请求的时候需要更新信号量
  const tableSignal = ref(0);
  const formSignal = ref(0);
  const signal = computed(() => {
    return {
      table: unref(tableSignal),
      form: unref(formSignal),
      isReady: unref(tableSignal) >= 1 && unref(formSignal) >= 1,
    };
  });

  function updateTableSignal() {
    tableSignal.value++;
  }
  function updateFormSignal() {
    formSignal.value++;
  }

  function onWatchSignal(handler) {
    unwatch = watch(signal, () => {
      if (!unref(signal).isReady) return;

      handler();
    });
  }

  onBeforeUnmount(() => {
    unwatch();
    tableSignal.value = 0;
    formSignal.value = 0;
  });

  return {
    signal,
    updateTableSignal,
    updateFormSignal,
    onWatchSignal,
  };
}

export default useSignal;
