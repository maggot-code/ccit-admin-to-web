<template>
  <el-dialog
    v-bind="$attrs"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-on="$listeners"
    @open="onOpen"
    fullscreen
    lock-scroll
    class="CCIT-full-dialog"
    :show-close="false"
    :modal="false"
  >
    <div class="CCIT-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/ccit.png" class="header-logo" />
        <p class="header-txt">· 门户预览</p>
      </div>
      <div class="options">
        <el-button @click="closeDialog()">{{
          $t("common.cancelButton")
        }}</el-button>
      </div>
    </div>
    <div
      class="main"
      style="padding: 0"
      v-loading="loading"
      :element-loading-text="$t('common.loadingText')"
    >
      <PortalLayout
        :layout="layoutSelf"
        :config="formData"
        :portal-style="initStyleForm"
        mask
        parentComp="preview"
      />
    </div>
  </el-dialog>
</template>

<script>
import PortalLayout from "@/components/VisualPortal/Layout";
import { getPortalInfo } from "@/api/onlineDev/portal";
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    layout: {
      type: Array,
      default: () => {},
    },
    portalId: {
      type: String,
      default: "",
    },
    portalStyle: {
      type: Object,
      default: () => {}
    }
  },
  components: { PortalLayout },
  data() {
    return {
      formData: {},
      initStyleForm: {},
      loading: false,
      layoutSelf: [],
      layoutBg: "",
      bgColor: "",
    };
  },
  methods: {
    onOpen() {
      if (JSON.stringify(this.config) !== "{}") {
        this.formData = this.config;
        this.initStyleForm = this.portalStyle
        return;
      }
      this.loading = true;
      getPortalInfo(this.portalId)
        .then((res) => {
          if (res.data && res.data.formData) {
            this.formData = JSON.parse(res.data.formData);
            let { layout, layoutBg, layouyId, ...styleForm } = this.formData;
              this.initStyleForm = styleForm;
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    closeDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>