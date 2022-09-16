<!--
 * @FilePath: \ccit-admin-to-web\src\views\test\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-14 10:05:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 14:46:16
 * @Description: 
-->
<template>
  <div class="biz-tabs" v-loading="!loading">
    <div class="biz-tabs-head">
      <el-tabs
        v-model="active"
        type=""
        tab-position="top"
        :closable="false"
        :addable="false"
        :editable="false"
        :stretch="false"
        :before-leave="beforeLeave"
      >
        <template v-for="item in schema">
          <el-tab-pane
            :key="item.id"
            :name="item.id"
            :disabled="false"
            :lazy="false"
          >
            <template #label>
              {{ item.label }}
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>

    <div v-if="hasSchema" class="biz-tabs-body">body -> {{ template }}</div>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import { useTabs } from "@/biz/Tabs/usecase/useTabs";
export default {
  name: "Test",
  mixins: [],
  components: {},
  props: {},
  setup() {
    const tabs = useTabs();
    function beforeLeave() {
      return Promise.resolve();
    }

    onMounted(() => {
      tabs.send();
    });

    return {
      loading: tabs.load,
      ...tabs.data,
      beforeLeave,
    };
  },
};
</script>
<style lang="scss" scoped>
.biz-tabs {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
