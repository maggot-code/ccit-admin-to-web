<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 13:28:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 15:17:23
 * @Description: 
-->
<template>
  <div class="biz biz-curd" v-loading="!loading">
    <div class="biz-curd-search">
      <ToggleLayout>
        <template #toggle-form>
          <mg-form
            ref="searchRefs"
            :token="token"
            :proName="proName"
            :schema="{ formSchema, cellSchema }"
            :job="{}"
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
          <el-button
            size="mini"
            icon="el-icon-refresh-right"
            :plain="true"
            @click="handlerReset"
            >重置</el-button
          >
        </template>
      </ToggleLayout>
    </div>

    <div class="biz-curd-body">
      <div class="biz-curd-body-function" v-if="hasAllController">
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

      <div class="biz-curd-body-list" :class="className" ref="bodyRefs">
        <!-- @rowEnter="rowEnter" -->
        <!-- @rowLeave="rowLeave" -->
        <mg-table
          ref="listRefs"
          :loadPage="false"
          :defaultPageSize="20"
          :resizeTable="resizeTable"
          :controller="controller"
          :tableSchema="{ uiSchema, columnSchema }"
          :tableChoice="[]"
          :tableData="data"
          :total="total"
          @onChoice="onChoice"
          @tableHandle="tableHandle"
          @tableParams="tableParams"
          @cellEvent="cellEvent"
          @handleRow="handleRow"
        >
        </mg-table>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleLayout from "@/components/Toggle/toggle.vue";

import {
  onMounted,
  watchEffect,
  unref,
  computed,
  ref,
} from "@vue/composition-api";
import { useTmpParams } from "@/biz/Template/usecase/useTmpParams";
import { useDialog } from "@/biz/Dialog/usecase/useDialog";
import {
  useSearchConfig,
  useSearchAction,
  useListConfig,
  useListAction,
  useDataSource,
} from "@/biz/Template/usecase/usePackage";
import { TmpDialogSymbolKey } from "@/biz/Template/shared/context";

export default {
  name: "BizCurd",
  components: {
    ToggleLayout,
  },
  props: {},
  setup(props) {
    const resizeTable = ref(Date.now());
    const { config } = useTmpParams();
    const { handler } = useDialog({ namespace: TmpDialogSymbolKey });

    const searchConfig = useSearchConfig();
    const searchAction = useSearchAction({
      config: searchConfig,
    });

    const listConfig = useListConfig();
    const listAction = useListAction({
      config: listConfig,
    });

    const dataSource = useDataSource();

    const actionReady = computed(() => {
      return !unref(listConfig.load) && !unref(searchConfig.load);
    });
    const className = computed(() => {
      return unref(listConfig.data.hasAllController)
        ? []
        : ["biz-curd-body-list-only"];
    });

    watchEffect(async () => {
      if (unref(actionReady)) return;
      // TODO... params data
      await dataSource.send(
        unref(listAction.listParams),
        unref(searchAction.searchData)
      );
    });
    onMounted(async () => {
      await Promise.allSettled([
        searchConfig.send(config),
        listConfig.send(config),
      ]);
      resizeTable.value = Date.now();
    });

    return {
      resizeTable,
      config,
      className,
      loading: dataSource.load,
      ...searchConfig.data,
      ...searchAction.data,
      ...listConfig.data,
      ...listAction.data,
      ...dataSource.data,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/biz.scss";
@import "@bizv/style/curd.scss";
</style>
