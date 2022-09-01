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
    <div class="main" style="padding: 0">
      <el-scrollbar class="layout-area" v-loading="loading">
        <template v-if="layout.length">
          <grid-layout
            :style="gridLayout"
            :layout.sync="layout"
            :row-height="rowHeight"
            :col-num="16"
            :is-draggable="false"
            :is-resizable="false"
            :vertical-compact="false"
            :prevent-collision="true"
            :use-css-transforms="true"
            :auto-size="false"
            :use-style-cursor="false"
          >
            <div
              v-for="(value, key) in activeLayout.config"
              :key="key"
              :style="gridItemStyle(key)"
            ></div>
            <grid-item
              v-for="item in layout"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
            >
              <component :is="item.ccitKey" :item="item"></component>
            </grid-item>
          </grid-layout>
        </template>
        <div class="portal-layout-nodata" v-else>
          <img
            src="@/assets/images/dashboard-nodata.png"
            alt=""
            class="layout-nodata-img"
          />
          <p class="layout-nodata-txt">暂无数据</p>
        </div>
      </el-scrollbar>
    </div>
  </el-dialog>
</template>

<script>
import {
  SinglePicture,
  Copyright,
  Theme,
  LoginForm,
  Version,
  LoginTab,
  CommonLinks,
  LoginForm2,
} from "@/components/VisualPortal";
import VueGridLayout from "vue-grid-layout";
import { getPortalInfo } from "@/api/onlineDev/portal";
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    portalId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      layout: [],
      layoutBg: "",
      activeLayout: {},
      loading: false,
    };
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    SinglePicture,
    Copyright,
    Theme,
    LoginForm,
    Version,
    LoginTab,
    CommonLinks,
    LoginForm2,
  },
  computed: {
    gridLayout() {
      let layoutBg =
        this.define.comUrl + "/api/file/Portal/theme/" + this.layoutBg;
      let rows = "";
      let cols = "";
      for (let key in this.activeLayout.config) {
        rows += this.activeLayout.config[key].height + "% ";
        cols += this.activeLayout.config[key].width + "% ";
      }
      return {
        gridTemplateRows:
          this.activeLayout.type === "horizontal" ? rows : "100%",
        gridTemplateColumns:
          this.activeLayout.type === "vertical" ? cols : "100%",
        backgroundImage: "url(" + layoutBg + ")",
        height: document.body.clientHeight + "px",
      };
    },
    gridItemStyle() {
      return (key) => {
        let config = this.activeLayout.config;
        let obj = {};
        if (config[key].css) {
          obj = JSON.parse(config[key].css);
        }
        if (config[key].bgImg) {
          let bgImg =
            this.define.comUrl + "/api/file/Portal/theme/" + config[key].bgImg;
          obj.backgroundImage = "url(" + bgImg + ")";
          obj.backgroundRepeat = "no-repeat";
          obj.backgroundSize = "100% 100%";
        }
        if (config[key].bgColor) {
          obj.backgroundColor = config[key].bgColor;
        }
        return obj;
      };
    },
    rowHeight() {
      return parseInt(document.body.clientHeight / 17.5);
    },
  },
  methods: {
    onOpen() {
      if (this.config && this.config.layout) {
        this.layout = this.config.layout;
        this.layoutBg = this.config.layoutBg;
        this.activeLayout = this.config.activeLayout;
        return;
      }
      this.loading = true;
      getPortalInfo(this.portalId)
        .then((res) => {
          if (res.data && res.data.formData) {
            let formData = JSON.parse(res.data.formData);
            this.layout = formData.layout || [];
            this.layoutBg = formData.layoutBg || "";
            this.activeLayout = formData.activeLayout;
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
<style lang="scss" scoped>
$lighterBlue: #409eff;
.layout-area {
  height: 100%;
  overflow: hidden;
  >>> .el-scrollbar__wrap {
    margin-bottom: 0 !important;
    overflow-x: auto;
  }
  >>> .el-scrollbar__bar.is-horizontal > div {
    display: none;
  }
  .vue-grid-layout {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: grid;
    .vue-grid-item {
      position: relative;
    }
  }
}
</style>
