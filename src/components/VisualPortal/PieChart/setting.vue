<template>
  <div v-if="activeData.option">
    <el-divider>饼图</el-divider>
    <el-form-item label="饼图类型">
      <el-select
        v-model="activeData.option.type"
        placeholder="请选择"
        @change="pieTypeChange"
      >
        <el-option
          v-for="item in pieChart.type"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="activeData.option.type === 'basic'" label="半径">
      <el-input
        v-model="activeData.option.series[0].radius"
        placeholder="请输入"
      >
      </el-input>
    </el-form-item>
    <el-form-item v-if="activeData.option.type === 'ring'" label="半径">
      <div style="display: flex">
        <el-input
          v-model="activeData.option.series[0].radius[0]"
          placeholder="请输入"
        >
        </el-input>
        ——
        <el-input
          v-model="activeData.option.series[0].radius[1]"
          placeholder="请输入"
        >
        </el-input>
      </div>
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
      //饼图相关临时配置
      pieChart: {
        type: [
          {
            label: "基础饼图",
            value: "basic",
          },
          { label: "圆环图", value: "ring" },
          { label: "玫瑰图", value: "rose" },
        ],
      },
    };
  },
  methods: {
    pieTypeChange(type) {
      if (type === "basic") {
        this.activeData.option.series[0].radius = "65%";
        delete this.activeData.option.series[0].roseType;
      } else if (type === "ring") {
        this.activeData.option.series[0].radius = ["30%", "70%"];
        delete this.activeData.option.series[0].roseType;
      } else {
        delete this.activeData.option.series[0].radius;
        this.activeData.option.series[0].roseType = "area";
      }
    },
  },
};
</script>