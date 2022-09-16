<!--
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\views\DialogTitle.vue
 * @Author: maggot-code
 * @Date: 2022-09-15 14:22:11
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 11:35:13
 * @Description: 
-->
<template>
  <div class="biz-dialog-title">
    <p class="biz-dialog-title-content">{{ content }}</p>
    <div class="biz-dialog-title-control">
      <i class="icon-ym icon-ym-nav-close" @click="handlerClose"></i>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount } from "@vue/composition-api";
import DialogTitleProps from "@/biz/Dialog/shared/props/title";
export default {
  name: "DialogTitle",
  mixins: [],
  components: {},
  props: DialogTitleProps,
  setup(props) {
    function handlerClose() {
      props.release();
    }

    onBeforeUnmount(() => {
      handlerClose();
    });

    return {
      content: props.text,
      handlerClose,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/biz/Dialog/shared/style/title.scss";
</style>
