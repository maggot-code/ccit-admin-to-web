<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 14:16:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 10:37:28
 * @Description: 
-->
<template>
  <div class="biz-container">
    <router-view v-if="state"></router-view>

    <!-- before-close -->
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
            <component :is="dialog.toComponent" v-bind="dialog"></component>
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
          <h1>底部</h1>
        </template>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {
  provide,
  watchEffect,
  onMounted,
  onUnmounted,
  unref,
} from "@vue/composition-api";
import {
  TmpParamsSymbolKey,
  TmpDialogSymbolKey,
} from "@/biz/Template/shared/context";
import { useRouterQuery } from "@/biz/Template/usecase/useRouterQuery";
import { useState } from "@/biz/Template/usecase/useState";
import { defineDialog } from "@/biz/Dialog/usecase/defineDialog";

export default {
  name: "Biz",
  props: {},
  setup(props, { root }) {
    const dialog = defineDialog({ namespace: TmpDialogSymbolKey });

    const { $route, $router } = root;
    const { gather, hasGather } = useRouterQuery($route, $router);
    const { state, setupState } = useState({ state: false });

    provide(TmpParamsSymbolKey, gather);

    watchEffect(() => {
      if (!unref(hasGather)) {
        // 警告
        console.warn("参数不足,或者格式错误");
      }

      setupState(hasGather);
    });

    onMounted(() => {
      setupState(false);
    });

    onUnmounted(() => {
      setupState(false);
    });

    return {
      state,
      ...dialog,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/container.scss";
@import "@/biz/Dialog/shared/style/index.scss";
</style>
