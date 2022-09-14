<!--
 * @FilePath: \ccit-admin-to-web\src\views\test\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-14 10:05:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-14 10:54:01
 * @Description: 
-->
<template>
  <div class="test">
    <mg-form ref="formRefs" :schema="schema" :job="job">
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
export default {
  name: "Test",
  mixins: [],
  components: {},
  props: {},
  setup() {
    const formRefs = ref();
    const { schema } = TestForm;

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
    function handlerReset() {
      unref(formRefs).resetForm();
    }

    return {
      formRefs,
      schema,
      job: {},
      handlerSubmit,
      handlerReset,
    };
  },
};
</script>
<style lang="scss" scoped>
.test {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
