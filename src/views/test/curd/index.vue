<!--
 * @FilePath: \ccit-admin-to-web\src\views\test\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-06 15:17:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-06 18:04:42
 * @Description: 
-->
<template>
  <div class="test test-curd">
    <div class="test-curd-function">功能</div>

    <div class="test-curd-table" v-loading="loading">
      <mg-table
        :tableSchema="{ uiSchema: ui, columnSchema }"
        :tableData="tableData"
        :tableChoice="tableChoice"
        :controller="controller"
        :total="total"
        :defaultPageSize="100"
      >
      </mg-table>
    </div>
  </div>
</template>

<script>
import { unref, ref, shallowRef, computed } from "@vue/composition-api";
import TestTable from "static/schema/test-table.json";

const data = [];
for (let index = 0; index < 20; index++) {
  const choice = Math.random() > 0.5 ? true : false;
  data.push({
    id: index,
    date: "2022年9月6日 15:46:18",
    address: "上海市普陀区金沙江路 1518 弄",
    name: `张三-${index}`,
    choice,
  });
}

export default {
  name: "TestCurd",
  props: {},
  setup() {
    const { uiSchema, columnSchema, controller } = TestTable;
    const tableChoice = shallowRef([]);
    const tableData = shallowRef([]);
    const total = computed(() => unref(tableData).length);
    const loading = ref(true);

    setTimeout(() => {
      tableChoice.value = data.filter((item) => item.choice);
      tableData.value = data;
      loading.value = false;
    }, 3000);

    return {
      // tableSchema: { uiSchema: unref(ui), columnSchema },
      ui: uiSchema,
      columnSchema,
      tableChoice,
      tableData,
      total,
      controller,
      loading,
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
