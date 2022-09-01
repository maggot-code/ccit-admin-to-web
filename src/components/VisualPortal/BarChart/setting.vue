<template>
  <div v-if="activeData.option">
    <el-divider>柱状图</el-divider>
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
    <el-form-item label="柱宽">
      <el-slider
        v-model="activeData.props.barWidth"
        :min="1"
        @change="changeBarWidth"
        show-tooltip
      />
    </el-form-item>
    <el-form-item label="方向">
      <el-radio-group
        v-model="activeData.props.directionValue"
        @change="changeDirection"
        size="mini"
      >
        <el-radio-button label="横向"></el-radio-button>
        <el-radio-button label="纵向"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="悬停效果">
      <el-select
        v-model="activeData.option.tooltip.axisPointer.type"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in barChart.axisPointerType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="显示分组">
      <el-switch v-model="activeData.option.legend.show"></el-switch>
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
          v-for="item in barChart.valuePositionList"
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
    <el-form-item label="堆叠">
      <el-switch
        v-model="activeData.props.stack"
        @change="changeStack"
      ></el-switch>
    </el-form-item>

    <el-form-item label="标记线">
      <el-select
        v-model="activeData.markLine"
        multiple
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in barChart.markLineType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标记点">
      <el-select
        v-model="activeData.markPoint"
        multiple
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in barChart.markLineType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
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
      //柱形图相关临时配置
      barChart: {
        valuePositionList: [
          { value: "top", label: "上方" },
          { value: "bottom", label: "下方" },
          { value: "left", label: "左边" },
          { value: "right", label: "右边" },
        ],
        axisPointerType: [
          { value: "shadow", label: "阴影" },
          { value: "line", label: "直线" },
          { value: "cross", label: "十字准星" },
        ],
        markLineType: [
          { value: "average", label: "平均值" },
          { value: "min", label: "最小值" },
          { value: "max", label: "最大值" },
        ],
      },
    };
  },
  methods: {
    //设置柱形图宽度
    changeBarWidth(v) {
      let series = this.activeData.option.series;
      for (let i = 0; i < series.length; i++) {
        series[i].barWidth = v + "%";
      }
    },
    //柱状图横向或纵向改变
    changeDirection(val) {
      if (val == "横向") {
        let data = this.activeData.option.xAxis;
        this.activeData.option.xAxis = this.activeData.option.yAxis;
        this.activeData.option.yAxis = data;
      } else {
        let data = this.activeData.option.yAxis;
        this.activeData.option.yAxis = this.activeData.option.xAxis;
        this.activeData.option.xAxis = data;
      }
    },
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
    //堆叠柱形图
    changeStack(v) {
      let series = this.activeData.option.series;
      for (let i = 0; i < series.length; i++) {
        series[i].stack = v ? "total" : "";
      }
    },
  },
};
</script>