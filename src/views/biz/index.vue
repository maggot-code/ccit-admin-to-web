<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 14:16:54
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 17:37:09
 * @Description: 
-->
<template>
  <div class="biz-container">
    <router-view v-if="state"></router-view>

    <!-- before-close -->
    <template v-for="dialog in dialogs">
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
          <DialogTitle
            v-bind="dialog.title.value"
            :release="dialog.release"
          ></DialogTitle>
        </template>

        <template #footer>
          <!-- TODO -->
        </template>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import DialogTitle from "@/biz/Dialog/views/DialogTitle.vue";

import {
  provide,
  watchEffect,
  onMounted,
  onUnmounted,
  unref,
} from "@vue/composition-api";
import {
  ParamsSymbolKey,
  DialogSymbolKey,
  useRouterQuery,
  useState,
} from "@/biz/Tmp/Shared";
import { defineDialog } from "@/biz/Dialog/usecase/defineDialog";

export default {
  name: "Biz",
  components: {
    DialogTitle,
  },
  props: {},
  setup(props, { root }) {
    const dialog = defineDialog({ namespace: DialogSymbolKey });

    const { $route, $router } = root;
    const { gather, hasGather } = useRouterQuery($route, $router);
    const { state, setupState } = useState({ state: false });

    provide(ParamsSymbolKey, gather);

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
@import "@/biz/Dialog/shared/style/body.scss";
</style>
