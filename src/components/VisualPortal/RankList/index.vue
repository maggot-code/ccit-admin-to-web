<template>
  <el-card :class="['portal-box', titleColor]" :style="cardStyle">
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
        <span v-if="item.showFresh" title="刷新" class="item">
          <i class="el-icon-refresh-right" @click="getData"></i
        ></span>
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <template v-if="!isEmpty">
      <div
        v-if="displayType === 'list'"
        class="portal-box-body"
        :style="bodyStyle"
        v-loading="loading"
      >
        <el-row class="header" v-if="showHeader">
          <el-col :span="3">排名</el-col>
          <el-col
            v-for="colItem in columns"
            :key="colItem.prop"
            :span="colItem.span"
          >
            {{ colItem.label }}
          </el-col>
        </el-row>
        <el-scrollbar class="scrollbar">
          <el-row class="row" v-for="(item, index) in handleList" :key="index">
            <el-col :span="3">
              <template v-if="index < 3">
                <img
                  :src="
                    require(`@/assets/images/visualPortal/rankList/rank-${
                      index + 1
                    }.png`)
                  "
                />
              </template>
              <template v-else>
                <span>{{ index + 1 }}</span>
              </template>
            </el-col>
            <el-col
              v-for="colItem in columns"
              :key="colItem.prop"
              :span="colItem.span"
            >
              <template>
                <span>{{ item[colItem.prop] }}</span>
              </template>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
      <div class="eChart-box-body" :style="bodyStyle" v-loading="loading">
        <div style="height: 100%; width: 100%" ref="chart" id="chart"></div>
      </div>
    </template>
    <div class="portal-common-noData" v-else>
      <img src="@/assets/images/portal-nodata.png" alt="" class="noData-img" />
      <p class="noData-txt">暂无数据</p>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { previewDataInterface } from "@/api/systemData/dataInterface";
export default {
  mixins: [mixin],
  data() {
    return {
      list: [],
      handleList: [],
      columns: [],
      showHeader: true,
      listSize: 0,
      sortField: "",
      sortType: "desc",
      displayType: "list",
      axisField: "",
      dynamic: false,
      interval: 5,
      isEmpty: true,
      timer: null,
      chart: null,
      option: {
       xAxis: {
                show: false,
                type: 'value',
                boundaryGap: [0, 0.01],
                axisTick: {       //轴刻度线
                    show: false
                },
                splitLine: {     //网格线
                    show: false
                }
            },
        yAxis: {
          type: "category",
          data: [],
          // axisLabel: {
          //   margin: 180,
          //           textStyle: {
          //               align: 'left'
          //           },
          //   // formatter: (value) => {
          //   //  return `{value|${value}}`;
          //   // },
          //   // rich: {},
          // },
        },

        series: [
          {
            type: "bar",
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ["#f5624f", "#eea64a", "#45cf83", "#92cdeb"];
                  let dataIndex =
                    colorList.length - params.dataIndex > 3
                      ? 3
                      : colorList.length - params.dataIndex;
                  return colorList[dataIndex];
                },
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 12,
                  },
                },
              },
              //鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            data: [],
          },
        ],
      },
    };
  },
  watch: {
    dataInterface() {
      this.getData();
    },
    listSize() {
      this.initData();
    },
    sortField() {
      this.initData();
    },
    sortType() {
      this.initData();
    },
    axisField() {
      this.initChart();
    },
    displayType(val) {
      if (val === "chart") {
        this.$nextTick(() => {
          this.initChart();
        });
      }
    },
  },
  mounted() {
    if (this.dynamic) {
      this.timer = setInterval(() => {
        this.getData();
      }, this.interval * 60 * 1000);
    } else {
      this.getData();
    }
  },
  methods: {
    getData() {
      let _this = this;
      if (this.dataInterface) {
        this.loading = true;
        previewDataInterface(this.dataInterface).then((res) => {
          this.loading = false;
          _this.list = res.data;
          this.isEmpty = !_this.list.length;
          this.initData();
        });
      }
    },
    initData() {
      const compare = (obj1, obj2) => {
        var val1 = parseFloat(obj1[this.sortField]);
        var val2 = parseFloat(obj2[this.sortField]);
        if (this.sortType === "asc") {
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (val1 < val2) {
            return 1;
          } else if (val1 > val2) {
            return -1;
          } else {
            return 0;
          }
        }
      };
      let list = JSON.parse(JSON.stringify(this.list));
      if (this.sortType && this.sortField) {
        list = list.sort(compare);
      }
      if (this.listSize >= list.length) {
        this.handleList = list;
      } else {
        this.handleList = list.slice(0, this.listSize);
      }
      if (this.displayType === "chart") {
        this.$nextTick(() => {
          this.initChart();
        });
      }
    },
    initChart() {
      if (!this.sortField) return;
      if (!this.axisField) return;
      if (this.$refs.chart) {
        let list = JSON.parse(JSON.stringify(this.handleList));
        let data = list.map((o) => o[this.sortField]);
        let axisData = list.map((o) => o[this.axisField]);
        this.option.series[0].data = data;
        this.option.yAxis.data = axisData;
        // axisData.forEach((axis, index) => {
        //   if (index < 3) {
        //     this.option.yAxis.axisLabel.rich[axis] = {
        //       height: 40,
        //       width: 40,
        //       backgroundColor: {
        //         image: `@/assets/images/visualPortal/rankList/rank-${
        //           index + 1
        //         }.png`,
        //       },
        //     };
        //   }
        // });
        this.chart = echarts.init(this.$refs.chart);
        this.chart.setOption(this.option);
        setTimeout(() => {
          this.$nextTick(() => {
            this.chart.resize();
          });
        }, 50);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
};
</script>
<style lang="scss" scoped>
.scrollbar {
  height: calc(100% - 40px);
  overflow: hidden;
}
.header {
  margin-bottom: 15px;
  text-align: center;
}
.row {
  height: 35px;
  line-height: 35px;
  margin-bottom: 5px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  img {
    vertical-align: middle;
  }
}
.row:nth-child(1) {
  border: 1px solid rgb(255, 198, 1);
  color: rgb(215, 137, 44);
  height: 60px;
  line-height: 60px;
  font-size: 20px;
}
.row:nth-child(2) {
  border: 1px solid rgb(159, 215, 255);
  color: rgb(64, 167, 255);
  height: 55px;
  line-height: 55px;
  font-size: 18px;
}
.row:nth-child(3) {
  border: 1px solid rgb(230, 170, 153);
  color: rgb(208, 145, 109);
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
</style>