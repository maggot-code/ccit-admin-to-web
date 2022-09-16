<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\form\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-16 14:33:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 15:49:16
 * @Description: 
-->
<template>
  <div class="biz-form" v-loading="!loading">
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
  </div>
</template>

<script>
import { onMounted, unref, ref } from "@vue/composition-api";
import { useTmpParams } from "@/biz/Template/usecase/useTmpParams";
import { useDialog } from "@/biz/Dialog/usecase/useDialog";
import { useFormConfig } from "@/biz/Form/usecase/usePackage";
import { TmpDialogSymbolKey } from "@/biz/Template/shared/context";

export default {
  name: "BizForm",
  mixins: [],
  components: {},
  props: {},
  setup(props) {
    const formRefs = ref();
    const { config } = useTmpParams();
    // const { handler } = useDialog({ namespace: TmpDialogSymbolKey });

    const formConfig = useFormConfig();

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

    onMounted(async () => {
      await formConfig.send();
    });

    return {
      loading: formConfig.load,
      config,
      formRefs,
      ...formConfig.data,
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
