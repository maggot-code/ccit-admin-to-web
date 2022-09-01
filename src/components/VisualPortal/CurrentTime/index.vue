<template>
  <el-card
    :class="['portal-box', titleColor]"
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
    <div class="content" :style="bodyStyle" v-loading="loading">
      <div class="chart" v-show="showClock" :ref="`chart-${parentComp}`"></div>
      <div class="time" :style="timeStyle">
        <div class="week" v-if="showWeek">{{ week }}</div>
        <div>{{ currentDate }}</div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";

import { formatDate } from "@/utils/moment.js";
import echarts from "echarts";
import resize from "@/components/Charts/mixins/resize";
export default {
  name: "current-time",
  mixins: [resize, mixin],
  props: {
    parentComp: {
      type: String,
      default: "dev",
    },
  },
  data() {
    return {
      format: "",
      currentDate: "",
      fontSize: 12,
      color: "",
      fontFamily: "",
      week: "",
      showClock: false,
      showWeek: false,
      chart: null,
      timer: null,
      option: {
        series: [
          {
            name: "hour",
            type: "gauge",
            startAngle: 90,
            endAngle: -269.999,
            radius: "90%",
            min: 0,
            max: 12,
            splitNumber: 12,
            clockwise: true,
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "rgba(0,0,0,0.7)"]],
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            axisTick: {
              // 坐标轴小标记
              show: false,
            },
            splitLine: {
              distance: 20,
              length: "15%", // 分隔线线长。支持相对半径的百分比,默认 30。
              lineStyle: {
                color: "#000",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 3,
              },
            },
            axisLabel: {
              show: false,
            },
            anchor: {
              show: true,
              icon: "path://M532.8,70.8C532.8,70.8,532.8,70.8,532.8,70.8L532.8,70.8C532.7,70.8,532.8,70.8,532.8,70.8z M456.1,49.6c-2.2-6.2-8.1-10.6-15-10.6h-37.5v10.6h37.5l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3v0h-22.5c-1.5,0.1-3,0.4-4.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.8c-0.6,1.7-0.9,3.4-0.9,5.3v16h10.6v-16l0,0l0,0c0-2.7,2.1-5,4.7-5.3h10.3l10.4,21.2h11.8l-10.4-21.2h0c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3C457,53,456.7,51.2,456.1,49.6z M388.9,92.1h11.3L381,39h-3.6h-11.3L346.8,92v0h11.3l3.9-10.7h7.3h7.7l3.9-10.6h-7.7h-7.3l7.7-21.2v0L388.9,92.1z M301,38.9h-10.6v53.1H301V70.8h28.4l3.7-10.6H301V38.9zM333.2,38.9v10.6v10.7v31.9h10.6V38.9H333.2z M249.5,81.4L249.5,81.4L249.5,81.4c-2.9,0-5.3-2.4-5.3-5.3h0V54.9h0l0,0c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.9-10.6h-37.5c-1.9,0-3.6,0.3-5.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.7c-0.6,1.7-0.9,3.5-0.9,5.3l0,0v21.3c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.5,0.9,5.3,0.9h33.6l3.9-10.6H249.5z M176.8,38.9v10.6h49.6l3.9-10.6H176.8z M192.7,81.4L192.7,81.4L192.7,81.4c-2.9,0-5.3-2.4-5.3-5.3l0,0v-5.3h38.9l3.9-10.6h-53.4v10.6v5.3l0,0c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.4,0.9,5.3,0.9h23.4h10.2l3.9-10.6l0,0H192.7z M460.1,38.9v10.6h21.4v42.5h10.6V49.6h17.5l3.8-10.6H460.1z M541.6,68.2c-0.2,0.1-0.4,0.3-0.7,0.4C541.1,68.4,541.4,68.3,541.6,68.2L541.6,68.2z M554.3,60.2h-21.6v0l0,0c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.8-10.6h-37.5l0,0c-6.9,0-12.8,4.4-15,10.6c-0.6,1.7-0.9,3.5-0.9,5.3c0,1.9,0.3,3.7,0.9,5.3c2.2,6.2,8.1,10.6,15,10.6h21.6l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3l0,0h-37.5v10.6h37.5c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3c0-1.9-0.3-3.7-0.9-5.3C567.2,64.6,561.3,60.2,554.3,60.2z",
              showAbove: false,
              offsetCenter: [0, "-35%"],
              size: 120,
              keepAspect: true,
              itemStyle: {
                color: "#707177",
              },
            },
            pointer: {
              icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
              width: 6,
              length: "55%",
              offsetCenter: [0, "8%"],
              itemStyle: {
                color: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4,
              },
            },
            detail: {
              show: false,
            },
            title: {
              offsetCenter: [0, "30%"],
            },
            data: [
              {
                value: 0,
              },
            ],
          },
          {
            name: "minute",
            type: "gauge",
            startAngle: 90,
            endAngle: -269.999,
            radius: "85%",
            min: 0,
            max: 60,
            splitNumber: 60,
            clockwise: true,
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "rgba(0,0,0,0.7)"]],
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            splitLine: {
              length: "10%", // 分隔线线长。支持相对半径的百分比,默认 30。
              lineStyle: {
                color: "#000",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            anchor: {
              show: true,
              size: 20,
              showAbove: false,
              itemStyle: {
                borderWidth: 15,
                borderColor: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4,
              },
            },
            pointer: {
              icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
              width: 4,
              length: "70%",
              offsetCenter: [0, "8%"],
              itemStyle: {
                color: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4,
              },
            },

            detail: {
              show: false,
            },
            title: {
              offsetCenter: ["0%", "-40%"],
            },
            data: [
              {
                value: 0,
              },
            ],
          },
          {
            name: "second",
            type: "gauge",
            startAngle: 90,
            endAngle: -269.999,
            min: 0,
            max: 60,
            animationEasingUpdate: "bounceOut",
            clockwise: true,
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[1, "rgba(0,0,0,0.7)"]],
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            anchor: {
              show: true,
              size: 15,
              showAbove: true,
              itemStyle: {
                color: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4,
              },
            },
            pointer: {
              icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
              width: 2,
              length: "85%",
              offsetCenter: [0, "8%"],
              itemStyle: {
                color: "#C0911F",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                shadowBlur: 8,
                shadowOffsetX: 2,
                shadowOffsetY: 4,
              },
            },
            detail: {
              show: false,
            },

            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    timeStyle() {
      return {
        fontSize: this.fontSize + "px",
        color: this.color,
        fontFamily: this.fontFamily,
      };
    },
  },
  watch: {
    showClock: {
      handler(val) {
        if (val) {
          if (this.chart) {
            this.chart.dispose();
          }
          this.initChart();
        } else {
          this.initClock();
        }
      },
      immediate: true,
    },
  },
  // watch: {
  //   option: {
  //     handler(val) {
  //       this.isEmpty = JSON.stringify(val) === "{}";
  //       if (!this.isEmpty) {
  //         if (this.chart) {
  //           this.chart.dispose();
  //         }
  //         this.initChart();
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    initChart() {
      this.$nextTick(() => {
        this.timer = null;
        this.chart = echarts.init(this.$refs[`chart-${this.parentComp}`]);
        this.chart.setOption(this.option);
        this.timer = setInterval(() => {
          var date = new Date();
          this.currentDate = formatDate(date, this.format);
          if (this.showWeek) {
            this.week = formatDate(date, "dddd");
          }
          var second = date.getSeconds();
          var minute = date.getMinutes() + second / 60;
          var hour = (date.getHours() % 12) + minute / 60;
          this.option.animationDurationUpdate = 300;
          this.chart.setOption({
            series: [
              {
                name: "hour",
                animation: hour !== 0,
                data: [{ value: hour }],
              },
              {
                name: "minute",
                animation: minute !== 0,
                data: [{ value: minute }],
              },
              {
                animation: second !== 0,
                name: "second",
                data: [{ value: second }],
              },
            ],
          });
        }, 1000);
        setTimeout(() => {
          this.$nextTick(() => {
            this.chart.resize();
          });
        }, 50);
      });
    },
    initClock() {
      this.timer = null;
      this.timer = setInterval(() => {
        var date = new Date();
        this.currentDate = formatDate(date, this.format);
        if (this.showWeek) {
          this.week = formatDate(date, "dddd");
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  .chart {
    width: 30%;
    height: 100%;
    margin-right: 30px;
  }
  .time {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .week {
      margin-bottom: 10px;
    }
  }
}
</style>