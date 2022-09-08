<!--
 * @FilePath: \ccit-admin-to-web\src\views\test\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-06 15:17:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-08 13:11:04
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
        @tableParams="tableParams"
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
  watch,
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
    const tableConfig = shallowRef({
      keyName: "id",
      controller: [],
      columnSchema: [],
      uiSchema: {
        stripe: true,
        isPage: true,
        isChoice: true,
        isIndex: true,
        sortProp: "id",
        sortOrder: "ascending",
        size: "small",
        handleFixed: "right",
      },
    });
    const tableRefs = ref();
    const tableTotal = ref(0);
    const tableData = shallowRef([]);
    const tableChoice = shallowRef([]);
    const tableRequest = shallowRef({
      current: 1,
      order: "asc",
      prop: "id",
      size: 20,
    });
    const uiSchema = computed(() => unref(tableConfig).uiSchema);
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
    const tableSignal = ref(0);
    const formSignal = ref(0);
    const signal = computed(() => {
      return {
        table: unref(tableSignal),
        form: unref(formSignal),
        isReady: unref(tableSignal) >= 1 && unref(formSignal) >= 1,
      };
    });

    // function
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
      tableRequest.value = target;
      tableSignal.value++;
    }
    function tableParams(params) {
      tableRequest.value = params;
      tableSignal.value++;
      formSignal.value++;
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

    // business
    async function getTableData() {
      console.log(unref(tableRequest));

      loading.value = true;

      const { total, data } = await getData();
      tableTotal.value = total;
      tableData.value = data;
      tableChoice.value = data.filter((item) => item.choice);

      loading.value = false;
    }

    // flow path
    watch(signal, (newVal) => {
      newVal.isReady && getTableData();
    });
    onMounted(async () => {
      const config = await getConfig();
      tableConfig.value = config;
    });

    return {
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
      tableParams,
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
