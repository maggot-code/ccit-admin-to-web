<!--
 * @FilePath: \ccit-admin-to-web\src\views\test\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-14 10:05:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 17:19:40
 * @Description: 
-->
<template>
  <div class="biz-container">
    <template v-for="dialog in dialogs">
      <!-- before-close -->
      <el-dialog
        v-el-drag-dialog
        v-bind="dialog.bind.value"
        :visible.sync="dialog.visible.value"
        :key="dialog.key"
      >
        <template #default>
          <div class="biz-dialog-body">
            <component :is="dialog.toComponent"></component>
          </div>
        </template>

        <template #title>
          <div class="biz-dialog-title">
            <p class="biz-dialog-title-content">标题渲染位置</p>
            <div class="biz-dialog-title-control">
              <i class="icon-ym icon-ym-nav-close" @click="dialog.release"></i>
            </div>
          </div>
        </template>

        <template #footer>
          <!-- TODO -->
        </template>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import { defineDialog } from "@/biz/Dialog/usecase/defineDialog";
export default {
  name: "Test",
  mixins: [],
  components: {},
  props: {},
  setup() {
    const dialog = defineDialog();

    onMounted(() => {
      dialog.setupDialog();
      dialog.setupDialog();
      dialog.setupDialog();
    });

    return {
      ...dialog,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/container.scss";
@import "@/biz/Dialog/shared/style/index.scss";
</style>
