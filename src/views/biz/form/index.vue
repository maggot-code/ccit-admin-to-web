<!--
 * @FilePath: \ccit-web-kit\src\views\biz\form\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-16 14:33:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-21 14:00:48
 * @Description: 
-->
<template>
  <div class="biz-form" v-loading="loading">
    <mg-form
    class="biz-form-core"
    ref="formRefs"
    :token="token"
    :proName="proName"
    :job="formJob"
    :schema="{ formSchema, cellSchema }">
    <template #form-button>
      <el-button v-show="!loading" size="mini" icon="el-icon-search" type="primary" @click="formSubmit">提交</el-button>
      <el-button v-show="!loading" size="mini" icon="el-icon-search" type="primary" @click="formData">数据</el-button>
      <el-button v-show="!loading" size="mini" icon="el-icon-refresh-right" :plain="true" @click="formReset">重置</el-button>
    </template>
  </mg-form>
  </div>
</template>

<script>
import {onMounted, onBeforeUnmount, unref } from "@vue/composition-api";
import { useParams } from "@/biz/Template/Shared";
import { defineForm } from "@/biz/Form";
import { toLoad,toState } from "@/biz/shared/service";

import Fetch from "@/biz/shared/fetch";
import { mockRequest } from "@/biz/shared/mock";
import MockData from "./__test__/v1.json";

const ServiceAddress = "/biz/form/config";

function request() {
  // axios
  return mockRequest(ServiceAddress, MockData);
}

export default {
  name: "BizForm",
  mixins: [],
  components: {},
  props: {},
  setup(props) {
    const service = Fetch(request);
    const params = useParams();
    const form = defineForm();
    const config = Object.assign({}, params.config, {});
    const loading = toLoad(service);
    const unwatchState = toState(service, form.form);

    async function send() {
      const response = await service.execute(config);
      if (unref(service.isReject)) return null;

      form.schema.setup(response);
      return response;
    }
    async function formSubmit() {
      const [state,data] = await form.setupFormData(true);
      console.log(state,data);
    }
    async function formData() {
      const [_, data] = await form.setupFormData(false);
      console.log(data);
    }
    function formReset() {
      form.resetFormData();
    }

    onMounted(() => {
      send();
    });
    onBeforeUnmount(() => {
      unwatchState();
    });
    return {
      ...form.template,
      loading,
      formSubmit,
      formData,
      formReset,
    }
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
