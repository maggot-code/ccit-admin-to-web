<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\kind\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-09 13:54:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 18:04:21
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
    provide("setupLabel", () => {
      return "Biz Kind Curd 工种业务增删改查业务模板";
    });

    return {};
  },
};
</script>
<style lang="scss" scoped></style>
