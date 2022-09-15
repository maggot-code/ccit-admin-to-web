<!--
 * @FilePath: \ccit-admin-to-web\src\App.vue
 * @Author: maggot-code
 * @Date: 2022-02-23 10:01:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 14:29:12
 * @Description: 
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { onUnmounted } from "@vue/composition-api";
import { releaseDialog } from "@/biz/Dialog/usecase/defineDialog";
export default {
  name: "App",
  setup() {
    onUnmounted(() => {
      releaseDialog();
    });
  },
};
</script>
