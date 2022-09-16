<!--
 * @FilePath: \ccit-admin-to-web\src\views\dialog\unknow\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-16 09:35:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 10:38:38
 * @Description: 
-->
<template>
  <div class="biz biz-unknow">
    <h1>unknow</h1>
    <el-button @click="handleraa">不知道</el-button>
  </div>
</template>

<script>
import { onBeforeUnmount } from "@vue/composition-api";
import { TmpDialogSymbolKey } from "@/biz/Template/shared/context";
import { useDialog } from "@/biz/Dialog/usecase/useDialog";
export default {
  name: "BizUnknow",
  mixins: [],
  components: {},
  props: {
    keyword: {
      type: String,
      default: "",
    },
    release: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { handler } = useDialog({ namespace: TmpDialogSymbolKey });
    function handleraa() {
      handler.setupDialog();
    }

    onBeforeUnmount(() => {
      props.release();
    });

    return {
      handleraa,
    };
  },
};
</script>
<style lang="scss" scoped></style>
