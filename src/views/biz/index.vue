<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 14:16:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 14:56:10
 * @Description: 
-->
<template>
  <div class="biz-container">
    <router-view v-if="state"></router-view>

    <!-- before-close -->
    <el-dialog
      v-el-drag-dialog
      :visible.sync="visabled"
      :fullscreen="fullscreen"
      :modal="true"
      :modal-append-to-body="true"
      :append-to-body="true"
      :lock-scroll="true"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :show-close="false"
      :center="false"
      :destroy-on-close="true"
      custom-class="biz-dialog"
      width="50%"
    >
      <template #default>
        <div class="biz-dialog-body">
          <h1>内容</h1>
          <el-button @click="setupFullscreen">缩放</el-button>

          <template v-for="item in dialogs">
            <p :key="item.key">{{ item.date }}</p>
          </template>
        </div>
      </template>

      <template #title>
        <el-row class="biz-dialog-title" :gutter="20">
          <el-col :span="22">
            <p class="biz-dialog-title-content">标题渲染位置</p>
          </el-col>
          <el-col :span="2">
            <div class="biz-dialog-title-control">
              <i class="icon-ym icon-ym-nav-close"></i>
              <i class="icon-ym icon-ym-full-screen"></i>
              <i class="icon-ym icon-ym-compress-screen"></i>
            </div>
          </el-col>
        </el-row>
      </template>

      <template #footer>
        <!-- TODO -->
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  provide,
  watchEffect,
  onMounted,
  onUnmounted,
  unref,
  ref,
} from "@vue/composition-api";
import { TmpParamsSymbolKey } from "@/biz/Template/shared/context";
import { useRouterQuery } from "@/biz/Template/usecase/useRouterQuery";
import { useState } from "@/biz/Template/usecase/useState";
import { defineDialog } from "@/biz/Dialog/usecase/defineDialog";

export default {
  name: "Biz",
  props: {},
  setup(props, { root }) {
    const { aa, dialogs, setupDialog } = defineDialog();

    const visabled = ref(true);
    const fullscreen = ref(false);
    const { $route, $router } = root;
    const { gather, hasGather } = useRouterQuery($route, $router);
    const { state, setupState } = useState({ state: false });

    function setupFullscreen() {
      fullscreen.value = !unref(fullscreen);
    }

    provide(TmpParamsSymbolKey, gather);

    watchEffect(() => {
      if (!unref(hasGather)) {
        // 警告
        console.warn("参数不足,或者格式错误");
      }

      setupState(hasGather);
    });

    onMounted(() => {
      setupDialog();
      setupDialog();
      setupDialog();

      setupState(false);
      console.log("biz install");
    });

    onUnmounted(() => {
      setupState(false);
      console.log("biz uninstall");
    });

    return {
      aa,
      dialogs,
      state,
      visabled,
      fullscreen,
      setupFullscreen,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/container.scss";
@import "@/biz/Dialog/shared/style/index.scss";
</style>
