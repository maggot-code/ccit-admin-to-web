<template>
  <el-container class="CCIT-Portal">
    <el-aside v-if="showAside" width="250px" class="left-box">
      <template v-if="operator === 'admin'">
        <div class="components-list" style="height: 30%">
          <portal-theme
            :activeTheme="config.layoutBg"
            :type="0"
            @change-theme="changeTheme"
          ></portal-theme>
        </div>
        <div class="components-list" style="height: 50px; margin-top: 10px">
          <div class="components-title">
            <span>门户风格</span>
            <i class="el-icon-setting icon" @click="showStyleForm" />
          </div>
        </div>
        <div
          class="components-list"
          style="height: calc(35% - 25px); margin-top: 10px"
          v-for="(item, listIndex) in leftComponents"
          :key="listIndex"
        >
          <div class="components-title">
            <span>{{ item.title }}</span>
            <el-input
              v-model="item.keyword"
              class="search"
              suffix-icon="el-icon-search"
              size="mini"
              placeholder="请输入控件名称"
              @input="compSearch(listIndex)"
            ></el-input>
          </div>
          <el-scrollbar class="aside-scrollbar">
            <div class="list">
              <div
                v-for="(element, index) in item.filterList"
                :key="index"
                class="components-item"
                @click="addComponent(element)"
              >
                <div class="components-body">
                  <i :class="element.tabs[0].icon" />
                  {{ element.label }}
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </template>
      <template v-else>
        <div
          class="components-list"
          style="height: calc(100% - 25px); margin-top: 10px"
          v-for="(item, listIndex) in leftComponents"
          :key="listIndex"
        >
          <div class="components-title">
            <span>{{ item.title }}</span>
            <el-input
              v-model="item.keyword"
              class="search"
              suffix-icon="el-icon-search"
              size="mini"
              placeholder="请输入控件名称"
              @input="compSearch(listIndex)"
            ></el-input>
          </div>
          <el-scrollbar class="aside-scrollbar">
            <div class="list">
              <div
                v-for="(element, index) in item.filterList"
                :key="index"
                class="components-item"
                @click="addComponent(element)"
              >
                <div class="components-body">
                  <i :class="element.tabs[0].icon" />
                  {{ element.label }}
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </template>
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
      <el-scrollbar class="layout-area" :style="layoutStyle">
        <grid-layout :layout.sync="layout" :row-height="40" :col-num="24">
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
            :class="{ 'active-item': item.i === activeId }"
            drag-allow-from=".drag"
            @resized="resizedEvent"
            @click.native="handleClick(item)"
          >
            <div class="setting">
              <span v-if="item.draggable" title="可拖拽" class="item">
                <i class="el-icon-rank drag"></i
              ></span>
              <span v-if="item.resizable" title="可伸缩" class="item">
                <i class="ym-custom ym-custom-arrow-expand"></i
              ></span>
              <span
                v-if="item.editable && layoutType !== 'custom'"
                title="可编辑"
                class="item"
              >
                <i class="el-icon-edit-outline"></i
              ></span>
            </div>
            <component
              style="height: 100%"
              :is="item.ccitKey"
              :item="item"
              :portal-style="initStyleForm"
              :ref="'comp' + item.i"
              parentComp="dev"
              :reload="true"
            ></component>
            <div class="mask"></div>
            <span
              title="复制"
              class="drawing-item copy"
              @click="addComponent(item)"
            >
              <i class="el-icon-copy-document"></i
            ></span>
            <span
              title="删除"
              class="drawing-item delete"
              @click.stop="handleRemoveItem(item.i)"
            >
              <i class="el-icon-delete"></i
            ></span>
          </grid-item>
        </grid-layout>
        <div v-show="!layout.length" class="empty-info">
          <img src="@/assets/images/emptyPortal.png" alt="" class="empty-img" />
        </div>
      </el-scrollbar>
    </el-main>
    <right-panel
      v-if="showRightPanel"
      :active-data="activeData"
      parentComp="onlineDev"
      :compConfig="compConfig"
    />
    <Preview :visible.sync="previewVisible" :config="config" :portal-style="initStyleForm" />
    <el-dialog
      title="门户风格设置"
      :close-on-click-modal="false"
      append-to-body
      :visible.sync="styleVisible"
      class="CCIT-dialog CCIT-dialog_center"
      lock-scroll
      width="500px"
    >
      <el-form
        ref="dataForm"
        :model="styleForm"
        label-width="100px"
        class="main"
      >
        <el-form-item label="门户背景色" prop="bgColor">
          <el-color-picker
            class="color-picker"
            v-model="styleForm.bgColor"
          ></el-color-picker>
        </el-form-item>
        <el-form-item label="控件曲率">
          <el-input type="number" v-model="styleForm.radius">
            <template slot="append">px</template>
          </el-input>
        </el-form-item>
        <el-form-item class="checkbox" label="控件显示">
          <el-checkbox v-model="styleForm.showBlock">色块</el-checkbox>
          <el-checkbox v-model="styleForm.showIcon">图标</el-checkbox>
          <el-checkbox v-model="styleForm.showTitle">标题</el-checkbox>
        </el-form-item>
        <el-form-item label="色块">
          <div class="block">
            <el-color-picker v-model="styleForm.blockColor"></el-color-picker>
            <div class="block-label">宽度</div>
            <el-input
              class="block-width"
              type="number"
              v-model="styleForm.blockWidth"
            >
              <template slot="append">px</template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="控件换肤">
          <el-radio-group v-model="cardStyle" @change="cardStyleChange">
            <el-radio label="default">默认</el-radio>
            <el-radio label="custom">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="cardStyle === 'custom'" label="主题色">
          <div class="color-list">
            <template v-for="(item, index) in colorList">
              <el-tag
                :key="index"
                @click="changeColor(item)"
                :color="item.color"
              >
                <i
                  class="el-icon-check"
                  v-if="item.className === styleForm.titleColor"
                ></i>
              </el-tag>
            </template>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="styleVisible = false">{{
          $t("common.cancelButton")
        }}</el-button>
        <el-button type="primary" @click="styleSubmit()">
          {{ $t("common.confirmButton") }}</el-button
        >
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import { mapState } from "vuex";
import VueGridLayout from "vue-grid-layout";
import { deepClone } from "@/utils";
import { basicComponents, chartComponents } from "./config";
import { userComponents } from "./userConfig";
import Preview from "./Preview";
import RightPanel from "@/components/VisualPortal/RightPanel";
import portalTheme from "../components/theme.vue";
import themeColor from "@/assets/scss/theme.scss";
import {
  Todo,
  Task,
  CommonFunc,
  TodoList,
  Notice,
  Email,
  DataBoard,
  IframeDiv,
  Carousel,
  BarChart,
  AnnularChart,
  AreaChart,
  LineChart,
  PieChart,
  RadarChart,
  Mailbox,
  SingleLogin,
  CommonLinks,
  DailySchedule,
  Weather,
  AddFlow,
  Document,
  Note,
  ContactBook,
  SinglePicture,
  ModelQuery,
  News,
  RankList,
  CCITAudio,
  CCITVideo,
  CCITMap,
  TimeLine,
  CurrentTime,
  DisplayField,
  // TodoList2,
  // ToLearn,
  // ToRead,
  // MeetingMatters,
  // Emaill2,
  // EmployeeSelfService,
  // TodoList3,
  // Emaill3,
  // ToRead3,
  // EmployeeSelfService3,
  // DailySchedule2,
  //国风版本门户待办待阅邮件员工自助
  // ChineseTodoList,
  // ChineseEmaill,
  // ChineseToRead,
  // ChineseEmployeeSelfService,
} from "@/components/VisualPortal/index.js";
const defaultConf = {
  layouyId: 100,
  layout: [],
};

export default {
  name: "CCIT-PortalDesigner",
  props: {
    conf: {
      type: Object,
      default: () => ({}),
    },
    operator: {
      type: String,
      default: "admin",
    },
  },
  provide() {
    return {
      operator: this.operator,
    };
  },
  components: {
    portalTheme,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Preview,
    RightPanel,
    Todo,
    Task,
    CommonFunc,
    TodoList,
    Notice,
    Email,
    DataBoard,
    IframeDiv,
    Carousel,
    BarChart,
    AnnularChart,
    AreaChart,
    LineChart,
    PieChart,
    RadarChart,
    Mailbox,
    SingleLogin,
    CommonLinks,
    DailySchedule,
    Weather,
    AddFlow,
    Document,
    Note,
    ContactBook,
    SinglePicture,
    ModelQuery,
    News,
    RankList,
    CCITAudio,
    CCITVideo,
    CCITMap,
    TimeLine,
    CurrentTime,
    DisplayField,
    // TodoList2,
    // ToLearn,
    // ToRead,
    // MeetingMatters,
    // Emaill2,
    // EmployeeSelfService,
    // TodoList3,
    // Emaill3,
    // ToRead3,
    // EmployeeSelfService3,
    // DailySchedule2,
    // ChineseTodoList,
    // ChineseEmaill,
    // ChineseToRead,
    // ChineseEmployeeSelfService,
  },
  data() {
    return {
      leftComponents: [],
      layout: [],
      activeId: null,
      activeData: null,
      previewVisible: false,
      config: {},
      showAside: true,
      showRightPanel: false,
      styleVisible: false,
      styleForm: {},
      initStyleForm: {},
      cardStyle: "default",
      colorList: [
        {
          className: "blue",
          color: themeColor.blueRgbaTheme,
        },
        {
          className: "purple",
          color: themeColor.purpleRgbaTheme,
        },
        {
          className: "azure",
          color: themeColor.azureRgbaTheme,
        },
        {
          className: "ocean",
          color: themeColor.oceanRgbaTheme,
        },
        {
          className: "green",
          color: themeColor.greenRgbaTheme,
        },
        {
          className: "yellow",
          color: themeColor.yellowRgbaTheme,
        },
        {
          className: "orange",
          color: themeColor.orangeRgbaTheme,
        },
        {
          className: "red",
          color: themeColor.redRgbaTheme,
        },
      ],
      compConfig: {},
    };
  },
  computed: {
    ...mapState({
      layoutType: (state) => state.settings.layoutType,
    }),
    layoutStyle() {
      let obj = {};
      if (this.config.layoutBg) {
        obj.backgroundImage = `url(${this.define.comUrl}/api/file/Portal/theme/${this.config.layoutBg})`;
      }
      if (this.config.bgColor) {
        obj.backgroundColor = this.config.bgColor;
      }
      return obj;
    },
  },
  watch: {
    layout: {
      handler(val) {
        if (val.length === 0) this.config.layouyId = 100;
        this.config.layout = val;
      },
      deep: true,
    },
  },
  mounted() {
    if (this.operator === "admin") {
      this.leftComponents = [
        {
          title: "基础控件",
          list: basicComponents,
          filterList: basicComponents,
          keyword: "",
        },
        {
          title: "图表控件",
          list: chartComponents,
          filterList: chartComponents,
          keyword: "",
        },
      ];
    } else {
      this.leftComponents = [
        {
          title: "基础控件",
          list: userComponents,
          filterList: userComponents,
          keyword: "",
        },
      ];
    }
    if (typeof this.conf === "object" && JSON.stringify(this.conf) !== "{}") {
      this.config = this.conf;
      let { layout, layoutBg, layouyId, ...styleForm } = this.config;
      this.initStyleForm = JSON.parse(JSON.stringify(styleForm));
    } else {
      this.config = deepClone(defaultConf);
      this.config.layouyId = 100;
      this.initStyleForm = {
        bgColor: "",
        radius: 8,
        showBlock: true,
        showIcon: true,
        showTitle: true,
        blockColor: "#506CD2",
        blockWidth: 5,
        titleColor: "",
      };
    }
    if (!this.config.layoutBg) {
      this.$set(this.config, "layoutBg", "");
    }
    if (!this.config.bgColor) {
      this.$set(this.config, "bgColor", "");
    }
    this.layout = this.config.layout || [];
    this.activeLayout = this.config.activeLayout;
  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.config.layout = this.layout;
        resolve({ formData: this.config, target: 1 });
      });
    },
    addComponent(item) {
      let clone = deepClone(item);
      let x = 0,
        y = 0,
        i = this.config.layouyId;
      if (this.layout.length) {
        let lastItem = this.layout[this.layout.length - 1];
        y = lastItem.y + lastItem.h;
      }
      let row = { ...clone, i, x, y };
      this.layout.push(row);
      this.activeId = this.config.layouyId;
      this.activeData = row;
      this.config.layouyId++;
    },
    handleRemoveItem(i) {
      this.layout = this.layout.filter((item) => item.i !== i);
      this.activeId = null;
      this.activeData = {};
    },
    empty() {
      this.$confirm("确定要清空所有吗？", "提示", { type: "warning" })
        .then(() => {
          this.layout = [];
          this.config.layouyId = 100;
          this.activeId = null;
          this.activeData = {};
        })
        .catch(() => {});
    },
    preview() {
      this.previewVisible = true;
    },
    handleClick(item) {
      // if (this.activeId === item.i) return
      this.showRightPanel = false;
      this.activeId = item.i;
      this.activeData = item;
      if (this.operator === "user") {
        let index = userComponents.findIndex((o) => o.ccitKey === item.ccitKey);
        if (index === -1) {
          this.compConfig = {};
        } else {
          this.compConfig = JSON.parse(JSON.stringify(userComponents[index]));
        }
      } else {
        this.compConfig = JSON.parse(JSON.stringify(this.activeData));
      }
      if (item !== null && JSON.stringify(item) != "{}") {
        this.$nextTick(() => {
          this.showRightPanel = true;
        });
      }
    },
    resizedEvent(i) {
      this.$refs["comp" + i] &&
        this.$refs["comp" + i][0] &&
        this.$refs["comp" + i][0].chart &&
        this.$refs["comp" + i][0].chart.resize();
    },
    changeAsideShow() {
      this.showAside = !this.showAside;
    },
    changeTheme(fileId) {
      this.config.layoutBg = fileId;
    },
    compSearch(index) {
      let keyword = this.leftComponents[index].keyword;
      this.leftComponents[index].filterList = this.leftComponents[
        index
      ].list.filter((item) => {
        return item.label.indexOf(keyword) > -1;
      });
    },
    cardStyleChange(e) {
      if (e === "default") {
        this.styleForm.titleColor = "";
      } else {
        this.styleForm.titleColor = "blue";
      }
    },
    changeColor(item) {
      if (item.className === this.styleForm.titleColor) {
        this.styleForm.titleColor = "";
      } else {
        this.styleForm.titleColor = item.className;
      }
    },
    showStyleForm() {
      if (this.initStyleForm.titleColor !== "") {
        this.cardStyle = "custom";
      }
      this.styleForm = JSON.parse(JSON.stringify(this.initStyleForm));
      this.styleVisible = true;
    },
    styleSubmit() {
      this.initStyleForm = JSON.parse(JSON.stringify(this.styleForm));
      this.config = Object.assign(this.config, this.styleForm);
      this.styleVisible = false;
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
      margin-top: 10px;
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
        display: flex;
        .color-picker {
          margin-left: 10px;
        }
        .search {
          width: 150px;
          margin-left: 10px;
        }
        .icon {
          font-size: 20px;
          line-height: 30px;
          margin-left: 5px;
          &:hover {
            opacity: 0.6;
          }
        }
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
      height: calc(100% - 42px);
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

        .copy {
          right: 30px;
          border-color: $lighterBlue;
          color: $lighterBlue;
          background: #fff;

          &:hover {
            background: $lighterBlue;
            color: #fff;
          }
        }

        .delete {
          right: 0px;
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
            margin-left: 10px;
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
}
.color-list {
  display: flex;
  .el-tag--small {
    width: 24px;
    padding: 0 4px;
    i {
      color: #000;
    }
  }
}
.block {
  display: flex;
  &-label {
    height: 32px;
    line-height: 32px;
    margin: 0 10px;
  }
  &-width {
    width: calc(100% - 80px);
  }
}
</style>
