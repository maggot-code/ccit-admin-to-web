<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\curd\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-08 13:28:40
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 18:20:21
 * @Description: 
-->
<template>
  <div class="biz biz-curd">
    <div class="biz-curd-search">
      <ToggleLayout>
        <template #toggle-form>
          <mg-form
            ref="searchRefs"
            :token="token"
            :proName="proName"
            :job="searchJob"
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
  </div>
</template>

<script>
import ToggleLayout from "@/components/Toggle/toggle.vue";

import { useTmpParams } from "@/biz/Template/usecase/useTmpParams";
import { defineSearch } from "@/biz/Search";

import {} from "@vue/composition-api";
export default {
  name: "BizCurd",
  components: {
    ToggleLayout,
  },
  props: {},
  setup(props) {
    const tmpParams = useTmpParams();
    const search = defineSearch({
      tmpParams,
    });

    console.log(search);

    return {
      ...search.output,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@bizv/style/biz.scss";
@import "@bizv/style/curd.scss";
</style>
