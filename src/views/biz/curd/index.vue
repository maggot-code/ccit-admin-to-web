<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 13:28:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 13:08:31
 * @Description: 
-->
<template>
  <div class="biz-curd">
    biz-curd
  </div>
</template>

<script>
import { inject } from "@vue/composition-api";

export default {
  name: "BizCurd",
  props: {},
  setup(props, { root }) {
    console.log(root.$route);

    const getData = inject("getData", () => {
      console.log("biz get data");
    });

    getData();

    return {};
  },
};
</script>
<style lang="scss" scoped></style>
