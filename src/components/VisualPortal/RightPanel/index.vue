<template>
  <el-aside width="300px" class="right-box">
    <!-- <div class="tabs" style="width: 100%">
      <a
        class="item"
        :class="{ active: currentTab == 'basic' }"
        @click="currentTab = 'basic'"
        >基本配置</a
      >
      <a
        class="item"
        :class="{ active: currentTab == 'tabs' }"
        @click="currentTab = 'tabs'"
        >标签页配置</a
      >
      <a
        class="item"
        :class="{ active: currentTab == 'comp' }"
        @click="currentTab = 'comp'"
        >控件配置</a
      >
    </div> -->

    <el-tabs v-model="currentTab" stretch>
      <el-tab-pane label="基本配置" name="basic">
        <el-form size="small" label-width="75px" labelPosition="left">
          <basic-setting
            :activeData="activeData"
            :parentComp="parentComp"
            :comp-config="compConfig"
          ></basic-setting>
        </el-form>
      </el-tab-pane>
      <el-tab-pane
        v-if="activeData.showTabsSetting"
        label="标签页配置"
        name="tabs"
      >
        <tab-setting :activeData="activeData"></tab-setting>
      </el-tab-pane>
      <el-tab-pane label="控件配置" name="comp">
        <el-form v-if="showCompSetting" size="small" label-width="75px" labelPosition="left">
          <comp-setting
            :activeData="activeData"
            @open-icons-dialog="openIconsDialog"
          ></comp-setting>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <!-- <template v-if="showDataInterface(activeData.ccitKey)">
          <el-divider>数据</el-divider>
          <com-data-interface
            :data-interface="activeData.dataInterface"
            @getInterfaceData="getInterfaceData"
          ></com-data-interface>
        </template> -->

    <JSONArea v-if="areaVisible" ref="JSONArea" @refresh="updataOption" />
    <iconBox
      :visible.sync="iconsVisible"
      :current="current"
      @choiceIcon="setIcon"
    />
  </el-aside>
</template>
<script>
import iconBox from "@/components/CCIT-iconBox";
import JSONArea from "../JSONArea";
import ComDataInterface from "./DataInterface.vue";
import BasicSetting from "./BasicSetting.vue";
import CompSetting from "./CompSetting.vue";
import TabSetting from "./TabSetting.vue";
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
    parentComp: {
      type: String,
      default: "",
    },
    compConfig: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    BasicSetting,
    CompSetting,
    iconBox,
    JSONArea,
    ComDataInterface,
    TabSetting,
  },
  data() {
    return {
      iconsVisible: false,
      areaVisible: false,
      currentIndex: 0,
      current: "",
      currentTab: "basic",
      dataInterfaceList: [],
      showCompSetting: true
    };
  },
  mounted() {
    if(JSON.stringify(this.compConfig)=="{}") {
      this.showCompSetting = false
    }
  },
  methods: {
    openIconsDialog(index) {
      this.iconsVisible = true;
      this.currentIndex = index;
      this.current = this.activeData.list[this.currentIndex].icon;
    },
    setIcon(val) {
      this.$set(this.activeData.list[this.currentIndex], "icon", val);
    },
    updataOption(data) {
      let option = data ? JSON.parse(data) : {};
      this.activeData.option = option;
    },
  },
};
</script>
<style lang="scss" scoped>
.right-box {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  padding: 0;
  >>> .el-tabs {
    height: 100%;
    .el-tabs__content {
      height: calc(100% - 60px) !important;
      overflow-y: auto;
      overflow-x: hidden;
      .el-tab-pane {
        padding: 0 15px;
      }
    }
  }
  .cap-wrapper {
    text-align: center;
  }
  .tabs {
    margin: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      position: relative;
      line-height: 32px;
      font-size: 14px;
      color: #334d65;
      text-align: center;
      &::after {
        display: block;
        content: "";
        overflow: hidden;
        width: 100px;
        height: 2px;
        position: absolute;
        left: -20px;
        bottom: 0;
        background-color: transparent;
        border-radius: 1px;
      }
      &.active {
        color: #1890ff;
        &::after {
          background-color: #1890ff;
        }
      }
    }
  }
  >>> .el-scrollbar__view {
    padding: 15px;
  }
  .select-item {
    display: flex;
    border: 1px dashed #fff;
    box-sizing: border-box;
    & .close-btn {
      cursor: pointer;
      color: #f56c6c;
    }
    .el-select {
      flex: 1;
    }
  }
  .select-line-icon {
    line-height: 32px;
    font-size: 22px;
    padding: 0 4px;
    color: #777;
  }
  .dataBoard-item {
    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }
    .el-divider--horizontal {
      margin: 14px 0;
    }
  }
}
</style>
