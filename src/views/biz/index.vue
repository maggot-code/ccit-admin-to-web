<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 14:16:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 11:24:49
 * @Description: 
-->
<template>
  <router-view v-if="state"></router-view>
</template>

<script>
import { provide, onMounted, onUnmounted } from "@vue/composition-api";
import { useRouterQuery } from "@/biz/Template/usecase/useRouterQuery";
import { useState } from "@/biz/Template/usecase/useState";

export default {
  name: "Biz",
  props: {},
  setup(props, { root }) {
    const { $route, $router } = root;
    useRouterQuery($route, $router);
    const { state, unusableState, usableState } = useState({ state: false });

    onMounted(() => {
      unusableState();
      // usableState();
      console.log(gather);
      console.log("biz install");
    });

    onUnmounted(() => {
      unusableState();
      console.log("biz uninstall");
    });

    return {
      state,
    };
  },
};
</script>
<style lang="scss" scoped></style>
