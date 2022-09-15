<!--
 * @FilePath: \ccit-admin-to-web\src\views\dialog\add\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-15 16:31:09
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 17:27:29
 * @Description: 
-->
<template>
  <div class="dialog-add">add dialog</div>
</template>

<script>
import { onBeforeUnmount } from "@vue/composition-api";

export default {
  name: "DialogAdd",
  mixins: [],
  components: {},
  props: {},
  setup() {
    onBeforeUnmount(() => {
      console.log("dialog add before destroy");
    });

    return {};
  },
};
</script>
<style lang="scss" scoped></style>
