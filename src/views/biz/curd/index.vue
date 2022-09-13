<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 13:28:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 16:30:22
 * @Description: 
-->
<template>
  <div class="biz biz-curd">
    <div class="biz-curd-search">
      {{ date }}
    </div>

    <div class="biz-curd-function">
      <el-button-group>
        <template v-for="control in allController">
          <el-button
            :key="control.mode"
            :type="control.type"
            :icon="control.icon"
            size="mini"
            @click="handlerAllControl(control)"
          >
            {{ control.label }}
          </el-button>
        </template>
      </el-button-group>
    </div>

    <div class="biz-curd-list" v-loading="loading">
      <mg-table
        ref="tableRefs"
        :tableSchema="{ uiSchema, columnSchema }"
        :tableData="[]"
        :tableChoice="[]"
        :total="0"
        :controller="controller"
        :defaultPageSize="20"
        :loadPage="false"
      >
      </mg-table>
    </div>
  </div>
</template>

<script>
import { onMounted, unref, computed } from "@vue/composition-api";
import { useTmpParams } from "@/biz/Template/usecase/useTmpParams";
import {
  useSearchConfig,
  useListConfig,
  // useDataConfig,
} from "@/biz/Template/usecase/usePackage";

export default {
  name: "BizCurd",
  props: {},
  setup(props) {
    const { config } = useTmpParams();

    const searchConfig = useSearchConfig();
    const listConfig = useListConfig();

    const loading = computed(() => {
      return !unref(listConfig.load) && !unref(searchConfig.load);
    });

    onMounted(async () => {
      await Promise.allSettled([searchConfig.send(), listConfig.send()]);
    });

    return {
      config,
      loading,
      ...listConfig.data,
      ...searchConfig.data,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/biz.scss";
@import "@bizv/style/curd.scss";
</style>
