<template>
  <el-form size="small" label-width="75px" labelPosition="left">
    <el-collapse
      value="0"
      class="collapse"
      v-for="(tab, index) in activeData.tabs"
      :key="index"
    >
      <el-collapse-item
        class="collapse-item"
        :title="`标签页${index + 1}`"
        name="0"
      >
        <el-form-item v-if="tab.title !== undefined" label="图标">
          <el-input clearable v-model="tab.icon" placeholder="请输入图标名称">
            <el-button slot="append" @click="openIconsDialog(index)"
              >选择</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="tab.title" placeholder="请输入标题" />
        </el-form-item>
        <template v-if="showDataInterface(activeData.ccitKey)">
          <com-data-interface
            :data-interface="tab.dataInterface"
            @getInterfaceData="getInterfaceData($event, index)"
          ></com-data-interface>
        </template>
      </el-collapse-item>
      <div class="collapse-btn" @click="delTab(index)">
        <i class="el-icon-remove-outline" />
      </div>
    </el-collapse>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      @click="addTab"
      v-if="activeData.tabs.length < 10"
      >添加标签页</el-button
    >
    <style-setting
      ref="styleSetting"
      @style-submit="styleSubmit"
    ></style-setting>
    <iconBox
      :visible.sync="iconsVisible"
      :current="activeData.icon"
      @choiceIcon="setIcon"
    />
  </el-form>
</template>
<script>
import themeColor from "@/assets/scss/theme.scss";
import styleSetting from "@/components/VisualPortal/StyleSetting";
import iconBox from "@/components/CCIT-iconBox";
import ComDataInterface from "./DataInterface.vue";
export default {
  components: { styleSetting, iconBox, ComDataInterface },
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
    parentComp: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
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
      titleBorder: {
        width: 1,
        color: "",
      },
      cardStyle: "default",
      opacity: 10,
      iconsVisible: false,
      currentIndex: 0,
    };
  },
  watch: {
    "activeData.titleColor": {
      handler(val) {
        this.cardStyle = val ? "custom" : "default";
      },
      immediate: true,
    },
    "activeData.opacity": {
      handler(val) {
        this.opacity = val * 10;
      },
      immediate: true,
    },
  },
  computed: {
    colorTagShow() {
      return (item) => {
        if (!item.theme) return true;
        return item.theme === this.$store.state.settings.slideClass;
      };
    },
    showDataInterface() {
      return (ccitKey) => {
        let arr = [
          "todo",
          "task",
          "rankList",
          "dataBoard",
          "timeLine",
          "annularChart",
          "areaChart",
          "barChart",
          "lineChart",
          "pieChart",
          "radarChart",
        ];
        let index = arr.findIndex((item) => {
          return item === ccitKey;
        });
        return index > -1;
      };
    },
  },
  methods: {
    addTab() {
      this.activeData.tabs.push({
        title: "",
        icon: "",
        dataInterface: "",
      });
    },
    delTab(index) {
      if (this.activeData.tabs.length === 1) {
        this.$message.warning("标签最少要保留一个");
        return;
      }
      this.activeData.tabs.splice(index, 1);
    },
    openIconsDialog(index) {
      this.iconsVisible = true;
      this.currentIndex = index;
    },
    setIcon(val) {
      this.activeData.tabs[this.currentIndex].icon = val;
    },
    changeColor(item) {
      if (item.className === this.activeData.titleColor) {
        this.activeData.titleColor = "";
      } else {
        this.activeData.titleColor = item.className;
      }
    },
    cardStyleChange(e) {
      if (e === "default") {
        this.activeData.titleColor = "";
      } else {
        this.activeData.titleColor = "blue";
      }
    },
    editStyle(index) {
      let content = this.activeData.titleCss;
      this.$refs.styleSetting.init(content);
    },
    styleSubmit(content) {
      this.activeData.titleCss = content;
    },
    formatTooltip(val) {
      return val / 10;
    },
    formatOpacity(e) {
      this.activeData.opacity = e / 10;
    },
    getInterfaceData(params, index) {
      switch (this.activeData.ccitKey) {
        case "todo":
        case "task":
        case "rankList":
        case "timeLine":
          this.activeData.tabs[index].dataInterface = params.dataInterface;
          this.$set(this.activeData, "list", params.data);
          break;
        case "barChart":
          this.initBarChart(params.data, params.dataInterface);
          break;
        case "pieChart":
          this.initPieChart(params.data, params.dataInterface);
          break;
        case "lineChart":
          this.initLineChart(params.data, params.dataInterface);
          break;
        case "radarChart":
          this.initRadarChart(params.data, params.dataInterface);
        default:
          break;
      }
    },
    //初始化饼图数据
    initPieChart(data) {
      if (!data.series) {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      //设置数据
      this.activeData.option.series = [];
      this.activeData.option.legend.data = [];
      this.activeData.props.groupColorList = [];
      this.$set(this.activeData.option, "type", "basic");
      let item = data.series[0];
      let _data = item.data;
      for (let i = 0; i < _data.length; i++) {
        let color = this.randomHexColor();
        _data[i].itemStyle = { color: color };
        this.activeData.props.groupColorList.push({
          name: _data[i].name,
          color: color,
        });
        this.activeData.option.legend.data.push(_data[i].name);
      }
      if (data.type) {
        this.activeData.option.type = data.type;
      }
      let seriesItem = {
        type: "pie",
        radius: "65%",
        center: ["50%", "50%"],
        selectedMode: "single",
        data: _data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      };
      this.activeData.option.series.push(seriesItem);
      console.log(this.activeData);
    },

    //初始化柱形图
    initBarChart(data, dataInterface) {
      if (!data.category || !data.series) {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      this.activeData.dataInterface = dataInterface;
      //设置坐标值
      if (this.activeData.option.xAxis[0].type == "category") {
        this.activeData.option.xAxis[0].data = data.category;
      } else {
        this.activeData.option.yAxis[0].data = data.category;
      }
      //设置数据
      this.activeData.option.series = [];
      this.activeData.option.legend.data = [];
      this.activeData.props.groupColorList = [];
      this.activeData.option.color = [];
      this.$set(this.activeData.option, "type", "basic");
      for (let i = 0; i < data.series.length; i++) {
        let item = data.series[i];
        let seriesItem = {
          name: item.name,
          type: "bar",
          barWidth: "30%",
          stack: "",
          label: {
            show: false,
            position: "",
          },
          emphasis: {
            focus: "series",
          },
          data: item.data,
        };
        this.activeData.option.series.push(seriesItem);
        this.activeData.option.legend.data.push(item.name);
        //默认颜色
        let color = this.randomHexColor();
        this.activeData.props.groupColorList.push({
          name: item.name,
          color: color,
        });
        this.activeData.option.color.push(color);
        if (data.type) {
          this.activeData.option.type = data.type;
        }
      }
    },
    //初始化折线图数据
    initLineChart(data, dataInterface) {
      if (!data.category || !data.series) {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      this.activeData.dataInterface = dataInterface;
      //设置坐标值
      if (this.activeData.option.xAxis[0].type == "category") {
        this.activeData.option.xAxis[0].data = data.category;
      } else {
        this.activeData.option.yAxis[0].data = data.category;
      }
      //设置数据
      this.$set(this.activeData.option, "series", []);
      this.$set(this.activeData.option, "color", []);
      this.activeData.option.legend.data = [];
      this.activeData.props.groupColorList = [];
      this.$set(this.activeData.option, "type", "basic");
      for (let i = 0; i < data.series.length; i++) {
        let item = data.series[i];
        let seriesItem = {
          name: item.name,
          type: "line",
          stack: "",
          label: {
            show: false,
            position: "",
          },
          emphasis: {
            focus: "series",
          },
          data: item.data,
          smooth: false,
          areaStyle: undefined,
        };
        this.activeData.option.series.push(seriesItem);
        this.activeData.option.legend.data.push(item.name);
        //默认颜色
        let color = this.randomHexColor();
        this.activeData.props.groupColorList.push({
          name: item.name,
          color: color,
        });
        this.activeData.option.color.push(color);
      }
      if (data.type) {
        this.activeData.option.type = data.type;
      }
    },
    //初始化雷达图数据
    initRadarChart(data, dataInterface) {
      if (!data.series) {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      this.activeData.dataInterface = dataInterface;
      //设置数据
      this.$set(this.activeData.option, "series", []);
      this.$set(this.activeData.option, "color", []);
      this.activeData.option.legend.data = [];
      this.activeData.props.groupColorList = [];
      this.$set(this.activeData.option, "type", "basic");
      for (let i = 0; i < data.series.length; i++) {
        let item = data.series[i];
        let seriesItem = {
          name: item.name,
          type: "radar",
          data: item.data,
        };
        this.activeData.option.series.push(seriesItem);
        //默认颜色
        item.data.forEach((itemData) => {
          let color = this.randomHexColor();
          this.activeData.props.groupColorList.push({
            name: itemData.name,
            color: color,
          });
          this.activeData.option.color.push(color);
          this.activeData.option.legend.data.push(itemData.name);
        });
      }
      if (data.type) {
        this.activeData.option.type = data.type;
      }
    },
    randomHexColor() {
      //随机生成十六进制颜色
      return (
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
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
.collapse {
  position: relative;
  border-top: none;
  >>> .el-collapse-item__arrow {
    margin: 0 40px 0 auto;
  }
  >>> .el-collapse-item__header {
    font-size: 14px;
    border-bottom: none;
  }
  >>> .el-collapse-item__content {
    padding-bottom: 0;
  }
  &-btn {
    position: absolute;
    top: 7px;
    right: 10px;
    cursor: pointer;
    color: #f56c6c;
  }
}
</style>