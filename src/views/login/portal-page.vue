<template>
  <div>
    <template>
      <grid-layout
        :style="gridLayout"
        :layout.sync="layout"
        :row-height="rowHeight"
        :max-rows="14"
        :col-num="16"
        :vertical-compact="false"
        :prevent-collision="true"
        :use-css-transforms="true"
        :auto-size="false"
        :use-style-cursor="false"
        :isDraggable="false"
        :isResizable="false"
      >
        <div
          v-for="(value, key) in activeLayout.config"
          :key="key"
          :style="configStyle(value, key)"
        ></div>
        <grid-item
          v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          :style="gridItemStyle(item)"
        >
          <component
            :is="item.ccitKey"
            :item="item"
            :layoutBg="layoutBg"
            @change-theme="changeTheme"
          ></component>
        </grid-item>
      </grid-layout>
    </template>
  </div>
</template>

<script>
import {
  Copyright,
  Theme,
  LoginForm,
  Version,
  LoginTab,
  SinglePicture,
  CommonLinks,
  LoginForm2,
} from "@/components/VisualPortal";
import VueGridLayout from "vue-grid-layout";
import { myBrowser } from "@/utils";
export default {
  props: {
    layout: { type: Array, default: () => [] },
    layoutBg: {
      type: String,
      default: "",
    },
    activeLayout: { type: Object, default: () => ({}) },
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
  data() {
    return {
      activeId: null,
      activeData: null,
      browser: "",
    };
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
        backgroundImage: "url(" + layoutBg + ")",
        gridTemplateRows:
          this.activeLayout.type === "horizontal" ? rows : "100%",
          gridRows: this.activeLayout.type === "horizontal" ? rows : "100%",
        gridTemplateColumns:
          this.activeLayout.type === "vertical" ? cols : "100%",
          gridColumns: this.activeLayout.type === "vertical" ? cols : "100%",
        height: document.body.clientHeight + "px",
      };
    },
    gridItemStyle() {
      return (item => {
        let obj = {}
        if(item.gridCss) {
          obj = JSON.parse(item.gridCss);
        }
        if(item.position && item.position.type === 'fixed') {
          let top = 0
          let left = 0
          if(item.position.bottom === 0) {
            top = document.body.clientHeight - item.h * this.rowHeight
          }
          if(item.position.right === 0) {
            left = document.body.clientWidth
          }

          obj.transform = `translate3d(${left}px, ${top}px, 0px) !important`
        }
        return obj
      })
    },
    configStyle() {
      return (value, key) => {
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
        if(config[key].bgColor) {
          obj.backgroundColor = config[key].bgColor
        }
         if (this.browser === "IE") {
          obj.gridRow = value.row;
          obj.gridColumn = value.col;
        }
        return obj;
      };
    },
    rowHeight() {
      return document.body.clientHeight / 17.5;
    },
  },
  mounted() {
    this.browser = myBrowser();
  },
  methods: {
    changeTheme(fileId) {
      this.$emit("change-theme", fileId);
    },
  },
};
</script>
<style lang="scss" scoped>
.vue-grid-layout {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  display: grid;
  display: -ms-grid;
  .vue-grid-item {
    position: relative;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .setting {
      height: 20px;
      top: 10px;
      right: 10px;
      position: absolute;
      z-index: 20;
      display: none;
      .item {
        font-size: 16px;
        margin-left: 10px;
      }
      .editable {
        cursor: pointer;
      }
    }
    &:hover {
      .setting {
        display: block;
      }
    }
  }
}
</style>
