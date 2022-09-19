/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\usePackage\useListAction.js
 * @Author: maggot-code
 * @Date: 2022-09-19 13:44:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 16:50:52
 * @Description:
 */
import {
  onMounted,
  onBeforeUnmount,
  nextTick,
  unref,
  ref,
  shallowRef,
  computed,
} from "@vue/composition-api";

export function useListAction(options) {
  const { config } = options;

  const params = shallowRef({
    current: 1,
    order: "asc",
    prop: "key",
    size: 10,
  });
  const listRefs = ref();
  const listParams = computed(() => {
    return unref(params);
  });

  function tableParams(target) {
    params.value = target;
  }
  function tableHandle(target) {
    params.value = target;
  }
  function onChoice(choice) {
    console.log("action to on choice", choice);
  }
  function rowEnter(target) {
    console.log("action to row enter", target);
  }
  function rowLeave(target) {
    console.log("action to row leave", target);
  }
  function cellEvent(event) {
    console.log("action to cell event", event);
  }
  function handleRow(target) {
    console.log("action to handle row", target);
  }
  function handleAllControll(target) {
    console.log("action to handle all controll", target);
  }

  onMounted(async () => {
    config.startLoad();

    await nextTick();
    config.endLoad();
  });
  onBeforeUnmount(config.startLoad);

  const data = {
    listRefs,
    onChoice,
    rowEnter,
    rowLeave,
    tableHandle,
    tableParams,
    cellEvent,
    handleRow,
    handleAllControll,
  };
  return {
    ...data,
    data,
    listParams,
  };
}

export default useListAction;
