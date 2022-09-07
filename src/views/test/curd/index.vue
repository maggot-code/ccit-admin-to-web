<!--
 * @FilePath: \ccit-admin-to-web\src\views\test\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-06 15:17:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-07 15:22:49
 * @Description: 
-->
<template>
  <div class="test test-curd">
    <div class="test-curd-function">
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

    <div class="test-curd-table" v-loading="loading">
      <mg-table
        ref="tableRefs"
        :resetCurrentPage="resetCurrentPage"
        :tableSchema="{ uiSchema, columnSchema }"
        :tableData="tableData"
        :tableChoice="tableChoice"
        :controller="controller"
        :total="tableTotal"
        :defaultPageSize="20"
        :loadPage="false"
        @onChoice="onChoice"
        @rowEnter="rowEnter"
        @rowLeave="rowLeave"
        @tableHandle="tableHandle"
        @cellEvent="cellEvent"
        @handleRow="handleRow"
      >
      </mg-table>
    </div>
  </div>
</template>
<script>
import {
  onMounted,
  unref,
  ref,
  shallowRef,
  computed,
} from "@vue/composition-api";

import TestTable from "static/schema/test-table.json";
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
function toObject(list) {
  const data = {};
  list.forEach((item) => {
    const { mode } = item;
    data[mode] = item;
  });
  return data;
}

function getConfig() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(TestTable), 2000);
  });
}
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(TestData), 1000);
  });
}
export default {
  name: "TestCurd",
  props: {},
  setup() {
    const resetCurrentPage = ref(Date.now());
    const tableConfig = shallowRef({
      keyName: "id",
      controller: [],
      columnSchema: [],
    });
    const tableRefs = ref();
    const tableTotal = ref(0);
    const tableData = shallowRef([]);
    const tableChoice = shallowRef([]);
    const uiSchema = shallowRef({
      stripe: true,
      isPage: true,
      isChoice: true,
      isIndex: true,
      sortProp: "id",
      sortOrder: "ascending",
      size: "small",
      handleFixed: "right",
    });
    const columnSchema = computed(() => unref(tableConfig).columnSchema);
    const controller = computed(() => {
      return toObject(
        unref(tableConfig).controller.filter((control) => {
          const { useRow } = control;
          return !!useRow;
        })
      );
    });
    const allController = computed(() => {
      return unref(tableConfig).controller.filter((control) => {
        const { useAll } = control;
        return !!useAll;
      });
    });
    const loading = ref(true);

    function onChoice(choice) {
      console.log(choice);
    }
    function rowEnter(target) {
      // console.log(target);
    }
    function rowLeave(target) {
      // console.log(target);
    }
    function tableHandle(target) {
      console.log(target);
    }
    function cellEvent(event) {
      console.log(event);
    }
    function handleRow(target) {
      console.log(target);
    }
    function handlerAllControl(target) {
      console.log(target);
    }

    onMounted(async () => {
      const config = await getConfig();
      tableConfig.value = config;
      uiSchema.value = config.uiSchema;
      resetCurrentPage.value = Date.now();

      const { total, data } = await getData();
      tableTotal.value = total;
      tableData.value = data;
      tableChoice.value = data.filter((item) => item.choice);

      loading.value = false;
    });

    return {
      resetCurrentPage,
      tableConfig,
      tableRefs,
      tableTotal,
      tableData,
      tableChoice,
      uiSchema,
      columnSchema,
      controller,
      allController,
      loading,

      onChoice,
      rowEnter,
      rowLeave,
      tableHandle,
      cellEvent,
      handleRow,
      handlerAllControl,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../test.scss";
.test-curd {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
  &-function,
  &-table {
    width: 100%;
  }
  &-function {
    height: 32px;
  }
  &-table {
    height: calc(100% - 42px);
  }
}
</style>
