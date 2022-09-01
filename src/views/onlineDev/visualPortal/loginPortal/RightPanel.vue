<template>
  <el-aside width="300px" class="right-box">
    <el-form
      v-if="activeData"
      style="margin: 20px"
      size="small"
      label-width="80px"
      labelPosition="left"
    >
      <el-divider>卡片</el-divider>
      <el-form-item label="边框曲率">
        <el-input type="number" v-model="activeData.radius">
          <template slot="append">px</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="activeData.shadow" label="阴影显示">
        <el-radio-group v-model="activeData.shadow">
          <el-radio-button label="always">总是</el-radio-button>
          <el-radio-button label="hover">悬浮</el-radio-button>
          <el-radio-button label="never">从不</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="activeData.opacity !== undefined" label="透明度">
        <el-slider
          v-model="opacity"
          :min="0"
          :max="10"
          :format-tooltip="formatTooltip"
          show-stops
          style="width: 98%"
          @change="formatOpacity"
        ></el-slider>
      </el-form-item>
      <el-form-item v-if="activeData.position" label="定位">
        <el-select v-model="activeData.position.type">
          <el-option value="relative" label="默认(relative)"></el-option>
          <el-option value="absolute" label="绝对(absolute)"></el-option>
          <el-option value="fixed" label="固定(fixed)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="样式">
          <el-button type="primary" @click="editStyle">编辑</el-button>
        </el-form-item>
      <template v-if="activeData.resizable">
        <el-divider>栅格</el-divider>
        <el-form-item v-if="activeData.w !== undefined" label="宽度">
          <el-slider
            v-model="activeData.w"
            :max="activeData.maxW"
            :min="activeData.minW"
            show-stops
            :step="1"
            show-tooltip
          />
        </el-form-item>
        <el-form-item v-if="activeData.h !== undefined" label="高度">
          <el-slider
            v-model="activeData.h"
            :max="activeData.maxH"
            :min="activeData.minH"
            show-stops
            :step="1"
            show-tooltip
          />
        </el-form-item>
      </template>
      <el-form-item label="背景色">
        <el-color-picker v-model="activeData.bgColor"></el-color-picker>
        <!-- <div class="color-list">
          <template v-for="(item, index) in colorList">
            <el-tag
              v-show="colorTagShow(item)"
              :key="index"
              @click="changeBgColor(item)"
              :color="item.color"
            >
              <i
                class="el-icon-check"
                v-if="item.className === activeData.bgColor"
              ></i>
            </el-tag>
          </template>
        </div> -->
      </el-form-item>
      <el-form-item v-if="activeData.fontColor" label="字体颜色">
        <el-color-picker
          v-model="activeData.fontColor"
          size="medium"
          @change="changeFontColor"
        ></el-color-picker>
      </el-form-item>
      <comp-setting
        :activeData="activeData"
        @open-icons-dialog="openIconsDialog"
      ></comp-setting>
    </el-form>
    <iconBox
      :visible.sync="iconsVisible"
      :current="current"
      @choiceIcon="setIcon"
    />
    <style-setting
      ref="styleSetting"
      @style-submit="styleSubmit"
    ></style-setting>
  </el-aside>
</template>
<script>
import iconBox from "@/components/CCIT-iconBox";
import CompSetting from "@/components/VisualPortal/RightPanel/CompSetting.vue";
import themeColor from "@/assets/scss/theme.scss";
import styleSetting from "@/components/VisualPortal/StyleSetting";
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    CompSetting,
    iconBox,
    styleSetting
  },
  data() {
    return {
      iconsVisible: false,
      areaVisible: false,
      currentIndex: 0,
      current: "",
      currentTab: "basic",
      dataInterfaceList: [],
      colorList: [
        {
          className: "transparent",
          color: "transparent",
        },
        {
          className: "white",
          color: "#fff",
        },
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
      opacity: 10,
    };
  },
  computed: {
    colorTagShow() {
      return (item) => {
        if (!item.theme) return true;
        return item.theme === this.$store.state.settings.slideClass;
      };
    },
  },
  watch: {
    "activeData.opacity": {
      handler(val) {
        this.opacity = val * 10;
      },
      immediate: true,
    },
  },
  methods: {
    changeBgColor(item) {
      if (item.className === this.activeData.bgColor) return;
      this.activeData.bgColor = item.className;
    },
    changeFontColor(e) {
      this.activeData.fontColor = e;
    },
    setIcon(val) {
      this.activeData.list[this.currentIndex].icon = val;
    },
    openIconsDialog(index) {
      this.iconsVisible = true;
      this.currentIndex = index;
      this.current = this.activeData.list[this.currentIndex].icon;
    },
    formatTooltip(val) {
      return val / 10;
    },
    formatOpacity(e) {
      this.activeData.opacity = e / 10;
    },
    editStyle() {
      let content = this.activeData.cardCss;
      this.$refs.styleSetting.init(content);
    },
    styleSubmit(content) {
      this.activeData.cardCss = content;
    },
  },
};
</script>
<style lang="scss" scoped>
.right-box {
  background: #fff;
  border-radius: 4px;
  >>> .el-scrollbar__view {
    padding: 15px;
  }
  .aside-scrollbar {
    height: calc(100% - 60px) !important;
    overflow: hidden;

    .el-scrollbar__wrap {
      overflow-x: auto;
    }
  }
}
.color-list {
  display: flex;
  .el-tag--small {
    width: 24px;
    padding: 0 4px;
    border: 1px solid #ccc;
    i {
      color: #000;
    }
  }
}
</style>
