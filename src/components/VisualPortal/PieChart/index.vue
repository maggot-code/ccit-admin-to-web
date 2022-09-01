<template>
  <el-card
    :class="['portal-eChart-box', titleColor]"
    :style="cardStyle"
  >
    <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
      <div class="left">
        <div v-if="showBlock" class="block" :style="blockStyle"></div>
        <template v-if="tabs.length === 1">
          <i v-if="showIcon" :class="tabs[0].icon" style="font-size: 18px"></i>
          <span v-if="showTitle">{{ tabs[0].title }}</span>
        </template>
        <template v-else>
          <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane
              v-for="(item, index) in tabs"
              :key="index"
              :name="index.toString()"
            >
              <span slot="label"
                ><i
                  v-if="showIcon"
                  :class="item.icon"
                  style="font-size: 18px"
                ></i
                ><span v-if="showTitle">{{ item.title }}</span></span
              >
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <div class="right">
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="eChart-box-body" :style="bodyStyle" v-loading="loading">
      <div ref="chart" id="chart" v-show="!isEmpty"></div>
      <div
        class="portal-common-noData portal-common-noData-eChart"
        v-show="isEmpty"
      >
        <img
          src="@/assets/images/portal-nodata.png"
          alt=""
          class="noData-img"
        />
        <p class="noData-txt">暂无数据</p>
      </div>
    </div>
  </el-card>
</template>
<script>
import echarts from "echarts";
import resize from "@/components/Charts/mixins/resize";
import { mixin } from "../visualPortalMixin";
import { previewDataInterface } from "@/api/systemData/dataInterface";
export default {
  mixins: [resize, mixin],
  data() {
    return {
      chart: null,
      isEmpty: false,
      option: {},
    };
  },
  mounted() {
    if (this.dataInterface) {
      previewDataInterface(this.dataInterface).then((res) => {
        let _data = res.data.series[0].data;
        for (let i = 0; i < _data.length; i++) {
          this.option.series[0].data[i].name = _data[i].name;
          this.option.series[0].data[i].value = _data[i].value;
        }
        this.initChart();
      });
    } else {
      this.initChart();
    }
  },
  watch: {
    option: {
      handler(val) {
        this.isEmpty = JSON.stringify(val) === "{}";
        if (!this.isEmpty) {
          if (this.chart) {
            this.chart.dispose();
          }
          this.initChart();
        }
      },
      deep: true,
    },
    dataInterface() {
      this.initChart()
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$refs.chart, this.option.theme || "");
      this.chart.setOption(this.option);
      setTimeout(() => {
        this.$nextTick(() => {
          this.chart.resize();
        });
      }, 50);
    },
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
};
</script>