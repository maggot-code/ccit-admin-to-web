<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\form\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-16 14:33:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 14:41:25
 * @Description: 
-->
<template>
  <div class="biz-form">
    <mg-form ref="formRefs" proName="api/node" :schema="schema" :job="job">
      <template #form-button>
        <el-button
          size="mini"
          icon="el-icon-search"
          type="primary"
          @click="handlerSubmit"
          >提交</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-search"
          type="primary"
          @click="handlerData"
          >数据</el-button
        >
        <el-button
          size="mini"
          icon="el-icon-refresh-right"
          :plain="true"
          @click="handlerReset"
          >重置</el-button
        >
      </template>
    </mg-form>
  </div>
</template>

<script>
import { onMounted, unref, ref } from "@vue/composition-api";
import TestForm from "static/schema/test-form.json";
import TestSearchForm from "static/schema/test-search-form.json";
export default {
  name: "BizForm",
  mixins: [],
  components: {},
  props: {},
  setup() {
    const formRefs = ref();
    const { schema } = TestForm;
    const { schema: searchSchema } = TestSearchForm;

    onMounted(() => {
      console.log(unref(formRefs));
    });

    function handlerSubmit() {
      const { validate, data } = unref(formRefs).formOutput();
      validate()
        .then((res) => {
          console.log(res, data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function handlerData() {
      const { data } = unref(formRefs).formOutput();
      console.log(data);
    }
    function handlerReset() {
      unref(formRefs).resetForm();
    }

    return {
      formRefs,
      schema,
      searchSchema,
      job: {},
      handlerSubmit,
      handlerData,
      handlerReset,
    };
  },
};
</script>
<style lang="scss" scoped>
.biz-form {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
