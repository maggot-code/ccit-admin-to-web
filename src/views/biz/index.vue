<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 14:16:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 13:10:32
 * @Description: 
-->
<template>
  <router-view v-if="state"></router-view>
</template>

<script>
import {
  provide,
  watchEffect,
  onMounted,
  onUnmounted,
  unref,
} from "@vue/composition-api";
import { useRouterQuery } from "@/biz/Template/usecase/useRouterQuery";
import { useState } from "@/biz/Template/usecase/useState";

export default {
  name: "Biz",
  props: {},
  setup(props, { root }) {
    const { $route, $router } = root;
    const { gather, hasGather } = useRouterQuery($route, $router);
    const { state, setupState } = useState({ state: false });

    provide("bizParams", gather);

    watchEffect(() => {
      if (!unref(hasGather)) {
        // 警告
        console.warn("参数不足,或者格式错误");
      }
      setupState(hasGather);
    });

    onMounted(() => {
      setupState(false);
      console.log("biz install");
    });

    onUnmounted(() => {
      setupState(false);
      console.log("biz uninstall");
    });

    return {
      state,
    };
  },
};
</script>
<style lang="scss" scoped></style>
