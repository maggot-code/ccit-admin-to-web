<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\form\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-16 14:33:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 09:47:26
 * @Description: 
-->
<template>
  <h1>biz form</h1>
  <!-- <div class="biz-form" v-loading="!loading">
    <mg-form
      class="biz-form-core"
      ref="formRefs"
      :token="token"
      :proName="proName"
      :schema="{ formSchema, cellSchema }"
      :job="{}"
    >
      <template #form-button>
        <el-button
          v-show="loading"
          size="mini"
          icon="el-icon-search"
          type="primary"
          @click="handlerSubmit"
          >提交</el-button
        >
        <el-button
          v-show="loading"
          size="mini"
          icon="el-icon-search"
          type="primary"
          @click="handlerData"
          >数据</el-button
        >
        <el-button
          v-show="loading"
          size="mini"
          icon="el-icon-refresh-right"
          :plain="true"
          @click="handlerReset"
          >重置</el-button
        >
      </template>
    </mg-form>
  </div> -->
</template>

<script>
export default {
  name: "BizForm",
  mixins: [],
  components: {},
  props: {},
  setup(props) {},
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
