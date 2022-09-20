<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 13:28:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 13:33:23
 * @Description: 
-->
<template>
  <div class="biz biz-curd">
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
            @click="handlerQuery"
            >查询</el-button
          >
          <el-button size="mini" icon="el-icon-refresh-right" :plain="true"
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
              @click="handleAllControll(control)"
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
          :tableChoice="[]"
          :tableData="[]"
          :total="0"
        >
        </mg-table>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleLayout from "@/components/Toggle/toggle.vue";

import { useTmpParams } from "@/biz/Template/usecase/useTmpParams";
import { defineSearch, useSearch } from "@/biz/Tmp/Search";
import { defineList } from "@/biz/Tmp/List";

import {
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  unref,
} from "@vue/composition-api";
export default {
  name: "BizCurd",
  components: {
    ToggleLayout,
  },
  props: {},
  setup(props) {
    const tmpParams = useTmpParams();
    const search = defineSearch({ tmpParams });
    const list = defineList({ tmpParams });
    const { handlerQuery } = useSearch({ tmpParams, search });

    onMounted(async () => {
      const res = await Promise.allSettled([search.send(), list.send()]);
      console.log(res);
    });

    onBeforeUnmount(() => {});

    return {
      ...search.template,
      ...list.template,
      handlerQuery,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/biz.scss";
@import "@bizv/style/curd.scss";
</style>
