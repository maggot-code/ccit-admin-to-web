<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 14:16:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 18:11:42
 * @Description: 
-->
<template>
  <router-view></router-view>
</template>

<script>
import { onMounted, onUnmounted } from "@vue/composition-api";

export default {
  name: "Biz",
  props: {},
  setup() {
    onMounted(() => {
      console.log("biz install");
    });

    onUnmounted(() => {
      console.log("biz uninstall");
    });

    return {};
  },
};
</script>
<style lang="scss" scoped></style>
