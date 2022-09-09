<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\kind\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-09 13:54:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 13:54:51
 * @Description: 
-->
<template>
  <router-view></router-view>
</template>

<script>
import { provide } from "@vue/composition-api";

export default {
  name: "BizKind",
  props: {},
  setup(props, { root }) {
    console.log("kind", root.$route);

    provide("getData", () => {
      console.log("kind biz get data");
    });
    return {};
  },
};
</script>
<style lang="scss" scoped></style>
