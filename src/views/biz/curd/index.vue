<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 13:28:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-14 10:03:21
 * @Description: 
-->
<template>
  <div class="biz biz-curd" v-loading="loading">
    <ToggleLayout class="biz-curd-search">
      <template #toggle-form>
        <p>{{ date }}</p>
      </template>
      <template #toggle-btn>
        <el-button size="mini" icon="el-icon-search" type="primary"
          >查询</el-button
        >
        <el-button size="mini" icon="el-icon-refresh-right" :plain="true"
          >重置</el-button
        >
      </template>
    </ToggleLayout>

    <div class="biz-curd-body">
      <div class="biz-curd-body-function" v-if="hasAllController">
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

      <div class="biz-curd-body-list" :class="className">
        <mg-table
          ref="tableRefs"
          :resizeTable="resizeTable"
          :tableSchema="{ uiSchema, columnSchema }"
          :tableData="TestData.data"
          :tableChoice="[]"
          :total="TestData.total"
          :controller="controller"
          :defaultPageSize="20"
          :loadPage="false"
        >
        </mg-table>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleLayout from "@/components/Toggle/toggle.vue";

import { onMounted, unref, computed, ref } from "@vue/composition-api";
import { useTmpParams } from "@/biz/Template/usecase/useTmpParams";
import {
  useSearchConfig,
  useListConfig,
} from "@/biz/Template/usecase/usePackage";

const TestData = {
  total: 107,
  data: [],
};

for (let index = 0; index < 20; index++) {
  const choice = Math.random() > 0.5 ? true : false;

  TestData.data.push({
    id: index,
    date: "2022/9/6 15:46:18",
    address: "上海市普陀区金沙江路 1518 弄",
    name: `张三-${index}`,
    rowpower: choice ? "export" : "",
    choice,
  });
}

export default {
  name: "BizCurd",
  components: {
    ToggleLayout,
  },
  props: {},
  setup(props) {
    const resizeTable = ref(Date.now());
    const { config } = useTmpParams();

    const searchConfig = useSearchConfig();
    const listConfig = useListConfig();

    const loading = computed(() => {
      return !unref(listConfig.load) && !unref(searchConfig.load);
    });
    const className = computed(() => {
      return unref(listConfig.data.hasAllController)
        ? []
        : ["biz-curd-body-list-only"];
    });

    onMounted(async () => {
      await Promise.allSettled([searchConfig.send(), listConfig.send()]);
      resizeTable.value = Date.now();
    });

    return {
      resizeTable,
      config,
      loading,
      className,
      ...listConfig.data,
      ...searchConfig.data,
      TestData,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/biz.scss";
@import "@bizv/style/curd.scss";
</style>
