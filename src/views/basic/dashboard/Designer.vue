<template>
  <transition name="el-zoom-in-center">
    <div class="CCIT-preview-main main">
      <div class="CCIT-common-page-header header">
        <el-page-header @back="goBack" content="修改个人工作台" />
        <div class="options">
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="submit()"
          >
            {{ $t("common.confirmButton") }}</el-button
          >
          <el-button @click="goBack()">{{
            $t("common.cancelButton")
        }}</el-button>
        </div>
      </div>
      <commonPortalDesigner
        class="container"
        ref="commonPortalDesigner"
        :conf="config"
        operator="user"
      />
    </div>
  </transition>
</template>
<script>
import commonPortalDesigner from "@/views/onlineDev/visualPortal/commonPortal/Designer";
import { deepClone } from "@/utils";
import {
  updateUserPortal,
  recover,
  getPortalSelector,
} from "@/api/onlineDev/portal";
export default {
  components: { commonPortalDesigner },
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      config: {},
      btnLoading: false
    };
  },
  created() {
    this.config = deepClone(this.formData);
  },
  methods: {
    goBack() {
      this.$emit("close");
    },
    submit() {
      this.btnLoading = true;
      let portalId = this.$store.getters.userInfo.portalId
      let _formData = JSON.stringify(this.config);
      updateUserPortal(portalId, {
        formData: _formData,
      })
        .then((res) => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 1500,
          });
          this.btnLoading = false;
          this.$emit("close");
          this.$emit('on-submit')
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  position: fixed;
  background-color: #ebeef5;
  .header {
    background-color: #fff;
  }
  .container {
    height: calc(100% - 62px);
  }
}
</style>