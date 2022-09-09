<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 13:28:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 18:07:54
 * @Description: 
-->
<template>
  <div class="biz-curd">{{ label }}</div>
</template>

<script>
import { onMounted, inject, ref } from "@vue/composition-api";

export default {
  name: "BizCurd",
  props: {},
  setup(props, { root }) {
    const label = ref("");

    const setupLabel = inject("setupLabel", () => {
      return "Biz Curd 通用业务增删改查业务模板";
    });

    onMounted(() => {
      label.value = setupLabel();
    });

    return {
      label,
    };
  },
};
</script>
<style lang="scss" scoped></style>
