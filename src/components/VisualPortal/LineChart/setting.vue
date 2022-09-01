<template>
  <div v-if="activeData.option">
    <el-divider>折线图</el-divider>
    <el-form-item label="横轴值">
      <el-input
        v-model="activeData.option.xAxis[0].name"
        placeholder="请输入横轴值"
      />
    </el-form-item>
    <el-form-item label="纵轴值">
      <el-input
        v-model="activeData.option.yAxis[0].name"
        placeholder="请输入纵轴值"
      />
    </el-form-item>
    <el-form-item label="显示数值">
      <el-switch
        v-model="activeData.props.showValue"
        @change="changeShowValue"
      ></el-switch>
    </el-form-item>
    <el-form-item label="数值位置" v-if="activeData.props.showValue">
      <el-select
        v-model="activeData.props.valuePosition"
        clearable
        placeholder="请选择"
        @change="changeValuePosition"
      >
        <el-option
          v-for="item in lineChart.valuePositionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="刻度对齐">
      <el-switch
        v-model="activeData.props.alignWithLabel"
        @change="changeAlignWithLabel"
      ></el-switch>
    </el-form-item>
    <el-form-item label="网格线">
      <el-switch
        v-model="activeData.props.splitLineShow"
        @change="changeSplitLine"
      ></el-switch>
    </el-form-item>
    <el-form-item label="区域">
      <el-switch
        v-model="activeData.props.area"
        @change="changeArea"
      ></el-switch>
    </el-form-item>
    <el-form-item label="平滑">
      <el-switch
        v-model="activeData.props.smooth"
        @change="changeSmooth"
      ></el-switch>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      //折线图相关临时配置
      lineChart: {
        valuePositionList: [
          { value: "top", label: "上方" },
          { value: "bottom", label: "下方" },
          { value: "left", label: "左边" },
          { value: "right", label: "右边" },
        ],
      },
    };
  },
  methods: {
    //数值显示
    changeShowValue(val) {
      let series = this.activeData.option.series;
      for (let i = 0; i < series.length; i++) {
        series[i].label.show = val;
      }
    },
    //数值位置
    changeValuePosition(val) {
      let series = this.activeData.option.series;
      for (let i = 0; i < series.length; i++) {
        series[i].label.position = val;
      }
    },
    //设置刻度对齐方式
    changeAlignWithLabel(val) {
      if (this.activeData.props.directionValue == "纵向") {
        this.activeData.option.xAxis[0].axisTick.alignWithLabel = val;
      } else {
        this.activeData.option.yAxis[0].axisTick.alignWithLabel = val;
      }
    },
    //设置网格线
    changeSplitLine(val) {
      if (this.activeData.props.directionValue == "纵向") {
        this.activeData.option.xAxis[0].splitLine.show = val;
      } else {
        this.activeData.option.yAxis[0].splitLine.show = val;
      }
    },
    //区域折线图
    changeArea(v) {
      let series = this.activeData.option.series;
      for (let i = 0; i < series.length; i++) {
        if (v) {
          let color = this.randomHexColor();
          series[i].areaStyle = {
            color: color,
            opacity: 0.5,
          };
        } else {
          series[i].areaStyle = undefined;
        }
      }
    },
    //设置平滑
    changeSmooth(v) {
      let series = this.activeData.option.series;
      for (let i = 0; i < series.length; i++) {
        series[i].smooth = v;
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