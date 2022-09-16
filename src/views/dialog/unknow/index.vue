<!--
 * @FilePath: \ccit-admin-to-web\src\views\dialog\unknow\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-16 09:35:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 13:08:42
 * @Description: 
-->
<template>
  <div class="biz biz-unknow">
    <h1>unknow</h1>
    <el-button @click="handleraa">不知道</el-button>
  </div>
</template>

<script>
import { TmpDialogSymbolKey } from "@/biz/Template/shared/context";
import { useDialog } from "@/biz/Dialog/usecase/useDialog";
export default {
  name: "BizUnknow",
  mixins: [],
  components: {},
  props: {},
  setup(props) {
    const { handler } = useDialog({ namespace: TmpDialogSymbolKey });
    const a = ["50%", "70%", "200px"];
    function handleraa() {
      // 随机获取a
      const index = Math.floor(Math.random() * a.length);
      handler.setupDialog({
        bind: {
          width: a[index],
        },
        title: {
          text: a[index],
        },
      });
    }

    return {
      handleraa,
    };
  },
};
</script>
<style lang="scss" scoped></style>
