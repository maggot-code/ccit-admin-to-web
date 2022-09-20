<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 13:28:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 17:34:00
 * @Description: 
-->
<template>
  <div class="biz biz-curd" v-loading="loading">
    <div class="biz-curd-search" v-if="formReady">
      <ToggleLayout>
        <template #toggle-form>
          <mg-form
            ref="formRefs"
            :token="token"
            :proName="proName"
            :job="formJob"
            :schema="{ formSchema, cellSchema }"
          ></mg-form>
        </template>
        <template #toggle-btn>
          <el-button
            size="mini"
            icon="el-icon-search"
            type="primary"
            @click="searchQuery"
            >查询</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-refresh-right"
            :plain="true"
            @click="searchReset"
            >重置</el-button
          >
        </template>
      </ToggleLayout>
    </div>

    <div class="biz-curd-body" v-if="tableReady">
      <div class="biz-curd-body-function">
        <el-button-group>
          <template v-for="control in allController">
            <el-button
              :key="control.mode"
              :type="control.type"
              :icon="control.icon"
              size="mini"
            >
              {{ control.label }}
            </el-button>
          </template>
        </el-button-group>
      </div>

      <div class="biz-curd-body-list">
        <!-- @rowEnter="rowEnter" -->
        <!-- @rowLeave="rowLeave" -->
        <mg-table
          ref="tableRefs"
          :loadPage="loadPage"
          :defaultPageSize="defaultPageSize"
          :resetCurrentPage="resetCurrentPage"
          :resizeTable="resizeTable"
          :controller="rowController"
          :tableSchema="{ uiSchema, columnSchema }"
          :tableChoice="choice"
          :tableData="data"
          :total="total"
          @tableHandle="tableHandle"
          @tableParams="tableParams"
        >
        </mg-table>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleLayout from "@/components/Toggle/toggle.vue";

import { useParams } from "@/biz/Template/Shared";
import { defineSearch, useSearch } from "@/biz/Template/Search";
import { defineList, useList } from "@/biz/Template/List";
import {
  defineDataSource,
  useDataSource,
  useDataAction,
} from "@/biz/Template/DataSource";

export default {
  name: "BizCurd",
  components: {
    ToggleLayout,
  },
  props: {},
  setup(props) {
    const params = useParams();
    const search = defineSearch({ params });
    const list = defineList({ params });
    const data = defineDataSource({ params });

    const utensil = { params, search, list, data };
    const { body, setupBody, resetBody } = useSearch(utensil);
    const { query } = useList(utensil);

    const context = { body, query, setupBody, resetBody };
    const { setupData } = useDataSource(utensil, context);
    const { template, onRequest } = useDataAction(utensil, context);

    onRequest(setupData);

    return {
      loading: data.loading,
      ...search.template,
      ...list.template,
      ...data.template,
      ...template,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/biz.scss";
@import "@bizv/style/curd.scss";
</style>
