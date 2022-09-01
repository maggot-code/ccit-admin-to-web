<template>
  <el-container class="CCIT-Portal">
    <el-aside v-if="showAside" width="250px" class="left-box">
      <div class="components-list" style="height: 60%">
        <portal-theme
          :activeTheme="config.layoutBg"
          :type="1"
          @change-theme="changeTheme"
        ></portal-theme>
      </div>
      <div class="components-list" style="height: 40%; margin-top: 10px">
        <div class="components-title">基础控件</div>
        <el-scrollbar class="aside-scrollbar">
          <div class="list">
            <div
              v-for="(element, index) in leftComponents"
              :key="index"
              class="components-item"
              @click="addComponent(element)"
            >
              <div class="components-body">
                <i :class="element.icon" />
                {{ element.label }}
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-main class="center-box">
      <div class="aside-control" @click="changeAsideShow">
        <img v-if="showAside" src="@/assets/images/aside-hide.png" />
        <img v-else src="@/assets/images/aside-show.png" />
      </div>
      <div class="action-bar">
        <el-button
          icon="el-icon-video-play"
          type="text"
          @click="preview"
          size="medium"
        >
          预览</el-button
        >
        <el-button
          class="delete-btn"
          icon="el-icon-delete"
          type="text"
          @click="empty"
          size="medium"
          >清空</el-button
        >
      </div>
      <el-scrollbar class="layout-area">
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
            :maxH="item.maxH"
            :minH="item.minH"
            :minW="item.minW"
            :maxW="item.maxW"
            :isDraggable="item.draggable"
            :isResizable="item.resizable"
            :static="item.static"
            :class="{ 'active-item': item.i === activeId }"
            :style="gridItemStyle(item)"
            @click.native="handleClick(item)"
          >
            <div class="setting">
              <span v-if="item.draggable" title="可拖拽" class="item">
                <i class="el-icon-rank"></i
              ></span>
              <!-- <span v-if="item.resizable" title="可伸缩" class="item">
                <i class="ym-custom ym-custom-arrow-expand"></i
              ></span> -->
              <span v-if="item.editable" title="可编辑" class="item">
                <i class="el-icon-edit-outline"></i
              ></span>
            </div>
            <component
              style="height: 100%"
              :is="item.ccitKey"
              :item="item"
              :reload="true"
            ></component>
            <div class="mask"></div>
            <span
              title="删除"
              class="drawing-item delete"
              v-if="item.delable || item.delable == undefined"
              @click.stop="handleRemoveItem(item.i)"
            >
              <i class="el-icon-delete"></i
            ></span>
          </grid-item>
        </grid-layout>
      </el-scrollbar>
    </el-main>
    <right-panel v-if="activeData" :active-data="activeData" />
    <Preview :visible.sync="previewVisible" :config="config" />
  </el-container>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import { deepClone } from "@/utils";
import { basicComponents } from "./config.js";
import Preview from "./Preview";
import RightPanel from "./RightPanel";
import portalTheme from "../components/theme.vue";
import { myBrowser } from "@/utils";
import {
  Copyright,
  Theme,
  LoginForm,
  Version,
  LoginTab,
  SinglePicture,
  CommonLinks,
  LoginForm2,
} from "@/components/VisualPortal/index.js";
export default {
  name: "CCIT-Designer",
  props: ["conf"],
  components: {
    portalTheme,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Preview,
    RightPanel,
    Copyright,
    Theme,
    LoginForm,
    Version,
    LoginTab,
    SinglePicture,
    CommonLinks,
    LoginForm2,
  },
  data() {
    return {
      leftComponents: basicComponents,
      layout: [],
      activeId: null,
      activeData: null,
      previewVisible: false,
      config: {},
      showAside: true,
      uploadVisible: false,
      uploadForm: {
        fullName: "",
        fileId: "",
      },

      defaultConf: {
        layouyId: 100,
        layout: [],
        layoutBg: "",
      },
      activeLayout: {},
      browser: "",
    };
  },
  watch: {
    layout: {
      handler(val) {
        if (val.length === 0) this.config.layouyId = 100;
      },
      deep: true,
    },
  },
  mounted() {
    this.browser = myBrowser();
    if (typeof this.conf === "object" && this.conf !== null) {
      this.config = this.conf;
    } else {
      this.config = deepClone(this.defaultConf);
      this.config.layouyId = 100;
      this.activeData = this.config.layout[0];
    }
    this.layout = this.config.layout || [];
    if (!this.config.layoutBg) {
      this.$set(this.config, "layoutBg", "");
    }
    this.activeLayout = this.config.activeLayout;
  },
  computed: {
    gridLayout() {
      let rows = "";
      let cols = "";
      for (let key in this.activeLayout.config) {
        rows += this.activeLayout.config[key].height + "% ";
        cols += this.activeLayout.config[key].width + "% ";
      }
      let layoutBg =
        this.define.comUrl + "/api/file/Portal/theme/" + this.config.layoutBg;
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
      return (item) => {
        let obj = {};
        if (item.gridCss) {
          obj = JSON.parse(item.gridCss);
        }
        if (item.position && item.position.type === "fixed") {
          let top = 0;
          let left = 0;
          if (item.position.bottom === 0) {
            top = document.body.clientHeight - item.h * this.rowHeight;
          }
          if (item.position.right === 0) {
            left = document.body.clientWidth;
          }
          obj.transform = `translate3d(${left}px, ${top}px, 0px) !important`;
        }
        return obj;
      };
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
        if (config[key].bgColor) {
          obj.backgroundColor = config[key].bgColor;
        }
        if (this.browser === "IE") {
          obj.gridRow = value.row;
          obj.gridColumn = value.col;
        }
        return obj;
      };
    },
    rowHeight() {
      return parseInt(document.body.clientHeight / 17.5);
    },
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.config.layout = this.layout;
        resolve({ formData: this.config, target: 1 });
      });
    },
    addComponent(item) {
      let index = this.layout.findIndex((layout) => {
        return layout.ccitKey === item.ccitKey;
      });
      if (index > -1) return;
      let clone = deepClone(item);
      let i = this.config.layouyId;

      let row = { ...clone, i };
      this.layout.push(row);
      this.activeId = this.config.layouyId;
      this.activeData = row;
      this.config.layouyId++;
    },
    handleRemoveItem(i) {
      this.layout = this.layout.filter((item) => item.i !== i);
      this.activeId = null;
      this.activeData = null;
    },
    empty() {
      this.$confirm("确定要清空所有吗？", "提示", { type: "warning" })
        .then(() => {
          this.defaultConf.layoutBg = this.config.layoutBg;
          this.config = deepClone(this.defaultConf);
          this.config.activeLayout = deepClone(this.activeLayout);
          this.layout = [];
          this.activeId = null;
          this.activeData = null;
        })
        .catch(() => {});
    },
    preview() {
      this.previewVisible = true;
      this.config.layout = this.layout;
    },
    handleClick(item) {
      this.activeId = item.i;
      this.activeData = item;
    },
    changeAsideShow() {
      this.showAside = !this.showAside;
    },
    changeTheme(fileId) {
      this.config.layoutBg = fileId;
    },
  },
};
</script>
<style lang="scss" scoped>
$lighterBlue: #409eff;
.CCIT-Portal {
  height: 100%;
  .el-aside,
  >>> .el-aside {
    padding: 0;
    margin: 0;
    .cap-wrapper {
      position: relative;
      height: 42px;
      border-bottom: 1px solid #dcdfe6;
      box-sizing: border-box;
      line-height: 41px;
      padding-left: 10px;
      font-size: 16px;
    }
    .aside-scrollbar {
      height: calc(100% - 40px);
      overflow: hidden;

      .el-scrollbar__wrap {
        overflow-x: auto;
      }
    }
  }
  .left-box {
    background-color: #ebeef5;
    border-radius: 4px;
    overflow: hidden;
    .components-list {
      box-sizing: border-box;
      background-color: #fff;
      padding: 10px 0 10px 10px;
      .components-title {
        font-size: 14px;
        color: #043254;
        line-height: 30px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .components-item {
        display: inline-block;
        width: 110px;
        margin: 0 10px 10px 0;
        .components-body {
          padding-left: 8px;
          background: #f3f9ff;
          font-size: 12px;
          cursor: p;
          border: 1px dashed #f3f9ff;
          border-radius: 3px;
          color: #043254;
          line-height: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          i {
            color: #043254;
            line-height: 16px;
            height: 16px;
            margin-right: 4px;
          }
        }
      }
    }
  }
  .center-box {
    width: calc(100% - 300px);
  }
  .el-main {
    height: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    .aside-control {
      width: 18px;
      height: 60px;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -30px;
      z-index: 11;
      cursor: pointer;
    }
    .action-bar {
      position: relative;
      height: 42px;
      text-align: right;
      padding: 0 15px;
      box-sizing: border-box;
      border-radius: 4px;
      background: #fff;
      margin: 0 10px;
      border: none;
      .left-dropdown {
        float: left;
        .title {
          font-size: 14px;
          color: #043254;
          line-height: 38px;
          margin-bottom: 10px;
          font-weight: bold;
        }
      }
      .delete-btn {
        color: #f56c6c !important;
      }
    }
    .empty-info {
      position: absolute;
      top: calc(50% - 250px);
      left: calc(50% - 250px);

      .empty-img {
        width: 500px;
        height: 500px;
      }
    }
    >>> .vue-grid-item.vue-grid-placeholder {
      background: $lighterBlue;
    }
    .layout-area {
      overflow-x: auto;
      overflow-y: auto;
      height: calc(100% - 40px);
      margin: 10px;
      position: relative;
      .vue-grid-layout {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: grid;
        display: -ms-grid;
        grid-auto-flow: row;
      }
    }

    >>> .el-scrollbar__wrap {
      margin-bottom: 0 !important;
      overflow-x: auto;
    }
    >>> .el-scrollbar__view {
      height: 100%;
    }
    .vue-grid-item {
      position: relative;
      height: 100%;
      border: 1px dashed #e2e0e0;
      &.active-item {
        border: 1px solid $lighterBlue;
        .drawing-item {
          display: block;
        }
      }
      >>> .vue-resizable-handle {
        z-index: 20;
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      .drawing-item {
        visibility: hidden;
        position: absolute;
        top: -10px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-radius: 50%;
        font-size: 12px;
        border: 1px solid;
        cursor: pointer;
        z-index: 20;
      }
      .delete {
        right: 20px;
        border-color: #f56c6c;
        color: #f56c6c;
        background: #fff;

        &:hover {
          background: #f56c6c;
          color: #fff;
        }
      }
      &:hover {
        .drawing-item,
        .setting {
          visibility: visible;
        }
      }
      .setting {
        top: -10px;
        right: 60px;
        position: absolute;
        display: flex;
        z-index: 22;
        visibility: hidden;
        .item {
          width: 22px;
          font-size: 12px;
          margin-left: 20px;
          color: #409eff;
          border: 1px solid #409eff;
          border-radius: 50%;
          background: #fff;
          text-align: center;
          line-height: 22px;
          height: 22px;
          display: block;
        }
      }
      >>> .el-card {
        width: 100%;
        height: 100%;
        .el-card__body {
          padding: 0;
        }
      }
    }
  }
}
</style>
