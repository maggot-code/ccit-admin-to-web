<template>
  <el-card :class="['daily-box', titleColor]" :style="cardStyle">
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
      <weather v-if="showWeather"></weather>
      <div class="right">
        <!-- <span @click="getData">刷新</span>
        <span @click="jumpToMore">更多</span> -->
        <span v-if="item.showFresh" title="刷新" class="item">
          <span
            style="
              color: #0f59a4;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
            "
            class="titleIconhover"
            @click="getData()"
            >刷新</span
          >
        </span>
        <span v-if="item.showMore" title="更多" class="item">
          <span
            style="
              color: #0f59a4;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
            "
            class="titleIconhover"
            @click="jumpToMore"
            >更多</span
          >
        </span>
      </div>
    </div>
    <div
      class="daily-content"
      ref="content"
      :style="bodyStyle"
      v-loading="loading"
    >
      <!-- 限号 -->
      <div class="traffic" @click="openjtgl">
        <span>{{ week }}</span>
        <span>7时至20时</span>
        <template v-if="week == '星期六' || week == '星期日'">
          <span>不限行</span>
        </template>
        <template v-else>
          <span>限行尾号</span>
          <span>
            <span class="num">{{ limitNum1 }}</span
            >&nbsp;和&nbsp;<span class="num">{{ limitNum2 }}</span></span
          >
        </template>
      </div>
      <!-- 日历 -->
      <div class="calendar" ref="calendar">
        <div class="header">
          <div class="left">
            <i class="el-icon-d-arrow-left" @click="skip('preYear')"></i>
            <i class="el-icon-arrow-left" @click="skip('preMonth')"></i>
          </div>
          <div>
            <i class="el-icon-arrow-right" @click="skip('nextMonth')"></i>
            <i class="el-icon-d-arrow-right" @click="skip('nextYear')"></i>
          </div>
        </div>
        <el-calendar ref="calendar" v-model="currentDate" :range="range">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="dotClass(date)">
              <span>{{ date.getDate() }}</span>
              <span class="lunar-date">{{ date | getLunarDate }}</span>
              <span class="tr" :style="{ color: isVacation(data.day).color }">{{
                isVacation(data.day).text
              }}</span>
            </div>
          </template>
        </el-calendar>
        <div class="today-btn" @click="jumpToToday">今天</div>
        <!-- <div class="btn" @click="collapesCalendar">
          <i v-if="collapes" class="icon-ym icon-ym-btn-collapse"></i>
          <i v-else class="icon-ym icon-ym-btn-expand"></i>
        </div> -->
      </div>
      <!-- 事项 -->
      <div class="daily" :style="{ height: lineHeight + 'px' }">
        <!-- 手撕日历效果,撕前保留上个日期的事项 -->
        <div :class="{ tear: showTear }" v-if="showTear">
          <!-- 时间轴方式展示 -->
          <template v-if="scheduleType === 'timeline'">
            <el-timeline class="time-line" :reverse="reverse">
              <el-timeline-item
                v-for="(item, index) in timeList"
                :key="index"
                :timestamp="timestampToDate(item.startTime)"
                :color="item.color"
                placement="top"
              >
                {{ item.content }}
              </el-timeline-item>
            </el-timeline>
          </template>
          <!-- 卡片方式展示 -->
          <el-popover
            v-else
            v-for="(item, index) in preTimeList"
            :key="index"
            placement="right-start"
            width="200"
            trigger="hover"
          >
            <div class="popover">
              <div class="dot" :style="regionStyle(item)"></div>
              <div>
                <div style="color: #333; font-size: 15px">
                  {{ ccit.toDate(new Date(item.startTime), "HH:mm") }} -
                  {{ ccit.toDate(new Date(item.endTime), "HH:mm") }}
                </div>
                <div style="color: #333">主题：{{ item.item }}</div>
                <div style="color: #999">地点：{{ item.place }}</div>
              </div>
            </div>
            <div
              slot="reference"
              :class="timeCardClass(item)"
              :style="{
                '--color': item.color,
              }"
            >
              <div class="bg"></div>
              <div class="middle">
                <div class="time">
                  {{ ccit.toDate(new Date(item.startTime), "HH:mm") }}-{{
                    ccit.toDate(new Date(item.endTime), "HH:mm")
                  }}
                  <div v-if="item.pendingDay === '待定日程'">待定日程</div>
                </div>
                <div class="content">{{ item.item }}</div>
              </div>
              <div class="right">
                <span class="text"> 即将开始 </span>
                <span class="type">{{ item.regionName }}</span>
              </div>
            </div>
          </el-popover>
        </div>
        <!-- 当前日期的事项，叠在上个日期之后 -->
        <!-- 时间轴方式展示 -->
        <template v-if="scheduleType === 'timeline'">
          <el-timeline class="time-line" :reverse="reverse">
            <el-timeline-item
              v-for="(item, index) in timeList"
              :key="index"
              :timestamp="timestampToDate(item.startTime)"
              :color="item.color"
              placement="top"
            >
              {{ item.content }}
            </el-timeline-item>
          </el-timeline>
        </template>
        <!-- 卡片方式展示 -->
        <!-- <div :style="{ height: lineHeight + 'px',overflowY:'auto' }" v-else> -->
        <el-popover
          v-else
          v-for="(item, index) in timeList"
          :key="index"
          placement="right-start"
          width="200"
          trigger="hover"
        >
          <div class="popover">
            <div class="dot" :style="regionStyle(item)"></div>
            <div>
              <div style="color: #333; font-size: 15px">
                {{ ccit.toDate(new Date(item.startTime), "HH:mm") }} -
                {{ ccit.toDate(new Date(item.endTime), "HH:mm") }}
              </div>
              <div style="color: #333">主题：{{ item.item }}</div>
              <div style="color: #999">地点：{{ item.place }}</div>
            </div>
          </div>
          <div
            slot="reference"
            :class="timeCardClass(item)"
            :style="{
              '--color': item.color,
            }"
          >
            <div class="bg"></div>
            <div class="middle">
              <div class="time">
                {{ ccit.toDate(new Date(item.startTime), "HH:mm") }}-{{
                  ccit.toDate(new Date(item.endTime), "HH:mm")
                }}
                <span
                  style="margin-left: 8px"
                  v-if="item.pendingDay === '待定日程'"
                  >待定日程</span
                >
              </div>
              <div class="content">{{ item.item }}</div>
            </div>
            <div class="right">
              <span class="text"> 即将开始 </span>
              <span class="type">{{ item.regionName }}</span>
            </div>
          </div>
        </el-popover>
        <!-- </div> -->

        <el-button
          v-if="showAdd"
          class="button"
          type="primary"
          @click="addOrUpdateHandle(null, null)"
          >添加</el-button
        >
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="refreshDataList" />
  </el-card>
</template>
<script>
// 北京交管局固定限号规则
const trafficList = [
  {
    startDate: "04-05",
    endDate: "07-04",
    nums: [
      {
        num1: 2,
        num2: 7,
      },
      {
        num1: 3,
        num2: 8,
      },
      {
        num1: 4,
        num2: 9,
      },
      {
        num1: 5,
        num2: 0,
      },
      {
        num1: 1,
        num2: 6,
      },
    ],
  },
  {
    startDate: "07-05",
    endDate: "10-03",
    nums: [
      {
        num1: 1,
        num2: 6,
      },
      {
        num1: 2,
        num2: 7,
      },
      {
        num1: 3,
        num2: 8,
      },
      {
        num1: 4,
        num2: 9,
      },
      {
        num1: 5,
        num2: 0,
      },
    ],
  },
  {
    startDate: "10-04",
    endDate: "01-02",
    nums: [
      {
        num1: 5,
        num2: 0,
      },
      {
        num1: 1,
        num2: 6,
      },
      {
        num1: 2,
        num2: 7,
      },
      {
        num1: 3,
        num2: 8,
      },
      {
        num1: 4,
        num2: 9,
      },
    ],
  },
  {
    startDate: "01-03",
    endDate: "04-03",
    nums: [
      {
        num1: 4,
        num2: 9,
      },
      {
        num1: 5,
        num2: 0,
      },
      {
        num1: 1,
        num2: 6,
      },
      {
        num1: 2,
        num2: 7,
      },
      {
        num1: 3,
        num2: 8,
      },
    ],
  },
];
import { mixin } from "../visualPortalMixin";
import { List, outerList, getHoliday } from "@/api/extend/schedule";
import Form from "@/views/extend/schedule/Form";
import Weather from "./Weather";
import calendar from "@/utils/calendar";
import { formatDate } from "@/utils/moment.js";
export default {
  name: "daily-schedule",
  components: {
    Form,
    Weather,
  },
  mixins: [mixin],
  data() {
    return {
      lineHeight: 0, //时间轴高度
      formVisible: false, //显示对话框
      scheduleList: [], //所有事项列表
      currentDate: "", //日历当前日期
      loading: false,
      reverse: false,
      isCollapes: true, //是否允许展开折叠
      collapes: true, //展开日历
      range: null, //日历区间
      scheduleType: "timeline",
      showAdd: false, //展示添加按钮
      showWeather: false, //展示天气
      holidayObj: {}, //公休集合
      week: "", //星期文字
      limitNum1: 0, //限号1
      limitNum2: 0, //限号2
      region11: "#4384f4",
      region12: "#33b579",
      region13: "#f85578",
      regionOther: "#9ba3af",
      showTear: false, //展示手撕日历效果
      preTimeList: [], // 上个日期事项
      timeList: [], //当前日期事项
    };
  },
  watch: {
    isCollapes() {
      this.collapesCalendar();
    },
    currentDate(val) {
      this.preTimeList = JSON.parse(JSON.stringify(this.timeList));
      // this.showTear = true;
      this.getHoliday();
      this.getTimeList();
      setTimeout(() => {
        this.showTear = false;
      }, 1000);
    },
  },
  computed: {
    // 判断该日是否有事项，过去事项灰色，当前白色，未来蓝色
    dotClass() {
      return (date) => {
        let hasDot = false;
        let currentDate = this.ccit.toDate(new Date(date), "yyyy-MM-dd");
        let today = this.ccit.toDate(new Date(), "yyyy-MM-dd");
        let dotType = "dot-white";
        if (this.scheduleList.length) {
          hasDot = this.scheduleList.some((item) => {
            return (
              currentDate ===
              this.ccit.toDate(new Date(item.startTime), "yyyy-MM-dd")
            );
          });
        }
        if (currentDate !== today) {
          dotType = new Date(date) < new Date() ? "dot-gray" : "dot-blue";
        }
        return {
          dot: hasDot,
          "dot-gray": dotType === "dot-gray",
          "dot-white": dotType === "dot-white",
          "dot-blue": dotType === "dot-blue",
        };
      };
    },
    timeCardClass() {
      return (item) => {
        let timeMinus = item.startTime - new Date().getTime();
        return {
          "time-card": true,
          region11: item.pendingDay === "确定日程" && item.region == 11,
          region12: item.pendingDay === "确定日程" && item.region == 12,
          region13: item.pendingDay === "确定日程" && item.region == 13,
          regionOther:
            item.pendingDay === "待定日程" ||
            (item.region !== 11 && item.region !== 12 && item.region !== 13),
          pendingDay: item.pendingDay === "待定日程",
          begin: timeMinus < 15 * 60 * 1000 && timeMinus > 0,
        };
      };
    },
    dailyHeight() {
      let height = 0;
      if (this.$refs.content && this.$refs.calendar) {
        height =
          this.$refs.content.offsetHeight - this.$refs.calendar.offsetHeight;
      }
      return { height };
    },
    isVacation() {
      return (date) => {
        if (JSON.stringify(this.holidayObj) !== "{}") {
          let day = this.ccit.toDate(new Date(date), "MM-dd");
          if (this.holidayObj.hasOwnProperty(day)) {
            return {
              text: this.holidayObj[day].holiday ? "休" : "班",
              color: this.holidayObj[day].holiday ? "#6fa1f7" : "#f23333",
            };
          }
        }
        return {
          text: "",
          color: "",
        };
      };
    },
    regionStyle() {
      return (item) => {
        let regionType = "regionOther";
        if (item.pendingDay === "确定日程") {
          if (item.region == 11 || item.region == 12 || item.region == 13) {
            regionType = "region" + item.region;
          }
        }
        return {
          backgroundColor: this[regionType],
        };
      };
    },
  },
  filters: {
    // 农历
    getLunarDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let lunarCalendar = calendar.solar2lunar(year, month, day);
      if (lunarCalendar.festival) return lunarCalendar.festival;
      if (lunarCalendar.lunarFestival) return lunarCalendar.lunarFestival;
      return lunarCalendar.IDayCn;
    },
  },
  mounted() {
    this.currentDate = new Date();
    if (!this.isCollapes) {
      this.collapes = !this.collapes;
      this.collapesCalendar();
    }
    this.$nextTick(() => {
      this.calcHeight();
    });
    this.getData();
    let date = new Date();
    this.week = formatDate(date, "dddd");
    this.getTraffic();
  },
  methods: {
    // 日期跳转
    skip(type) {
      switch (type) {
        case "preYear":
          this.currentDate = new Date(
            this.currentDate.setYear(this.currentDate.getFullYear() - 1)
          );
          break;
        case "preMonth":
          this.currentDate = new Date(
            this.currentDate.setMonth(this.currentDate.getMonth() - 1)
          );
          break;
        case "nextMonth":
          this.currentDate = new Date(
            this.currentDate.setMonth(this.currentDate.getMonth() + 1)
          );
          break;
        case "nextYear":
          this.currentDate = new Date(
            this.currentDate.setYear(this.currentDate.getFullYear() + 1)
          );
          break;
      }
    },
    /**
     * 展开折叠日历
     */
    collapesCalendar() {
      this.collapes = !this.collapes;
      if (this.collapes) {
        this.range = null;
      } else {
        var timeStamp = this.currentDate.getTime();
        var currentDay = this.currentDate.getDay();
        var monday = new Date(
          timeStamp - (currentDay - 1) * 60 * 60 * 24 * 1000
        )
          .toLocaleDateString()
          .replace("/", "-");
        var sunday = new Date(
          timeStamp + (7 - currentDay) * 60 * 60 * 24 * 1000
        )
          .toLocaleDateString()
          .replace("/", "-");
        this.range = [monday, sunday];
      }
      this.$nextTick(() => {
        this.calcHeight();
      });
    },
    getData() {
      this.loading = true;
      var timeStamp = this.currentDate.getTime();
      var currentDay = this.currentDate.getDay();
      let startTime = timeStamp - (currentDay + 30) * 60 * 60 * 24 * 1000;
      let endTime = timeStamp - (currentDay - 30) * 60 * 60 * 24 * 1000;
      outerList({
        startTime,
        endTime,
      })
        .then((res) => {
          this.loading = false;
          this.scheduleList = res.data.data || [];
          this.getTimeList();
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    /**
     * 计算时间轴高度
     */
    calcHeight() {
      let contentH = this.$refs.content.offsetHeight;
      let calendarH = this.$refs.calendar.offsetHeight;
      this.lineHeight = contentH - calendarH - 80;
    },
    // 新增 / 修改
    addOrUpdateHandle(id, startTime) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.Form.init(id, startTime);
      });
    },
    refreshDataList() {
      this.formVisible = false;
      this.getData();
    },
    timestampToDate(val) {
      return new Date(val).toLocaleTimeString();
    },
    jumpToToday() {
      this.currentDate = new Date();
    },
    getHoliday() {
      let param = this.currentDate.getFullYear();
      getHoliday(param).then((res) => {
        this.holidayObj = res.data.holiday;
      });
    },
    getTraffic() {
      let week = formatDate(new Date(), "d");
      if (week == 6 || week == 7) {
        return;
      }
      let year = new Date().getFullYear();
      let timeStamp = new Date().getTime();
      trafficList.forEach((item) => {
        let startDate = new Date(year + "-" + item.startDate).getTime();
        let endDate = new Date(year + "-" + item.endDate).getTime();
        if (startDate < timeStamp && endDate > timeStamp) {
          this.limitNum1 = item.nums[week - 1].num1;
          this.limitNum2 = item.nums[week - 1].num2;
        }
      });
    },
    getTimeList() {
      let filter = [];
      if (this.scheduleList.length) {
        filter = this.scheduleList.filter((item) => {
          return (
            this.ccit.toDate(new Date(item.startTime), "yyyy-MM-dd") ===
            this.ccit.toDate(new Date(this.currentDate), "yyyy-MM-dd")
          );
        });
        if (filter.length > 4) {
          filter = filter.splice(0, 4);
        }
      }
      this.timeList = filter;
    },
    // 限号跳转的链接跳转的方法
    openjtgl() {
      window.open(
        "http://jtgl.beijing.gov.cn/jgj/lszt/659722/660341/index.html"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.daily-box {
  background-image: url("../../../assets/images/visualPortal/dailySchedule/bg3.png");
  background-size: 100% 100%;
  border: none;
  >>> .el-card__body {
    width: 100%;
    height: 100%;
  }
  .daily-content {
    width: 100%;
    z-index: 1;
    padding: 0 8px;

    .traffic {
      // background-color: #f0f7ff;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #000;
      margin: 0 10px;
      padding: 0 30px;
      border: 1px solid #ededed;
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      .num {
        color: #0f59a4;
        font-weight: 600;
      }
      .append {
        margin-left: 5px;
      }
    }
    .calendar {
      position: relative;
      margin: 10px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      box-shadow: 0 2px 2px 0 rgb(0 0 0 / 5%);
      z-index: 1;
      background-color: #fff;
      .today-btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
      .btn {
        position: absolute;
        bottom: 10px;
        left: 50%;
      }
      .dot {
        position: relative;
        &::after {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          transform: translate(0, -50%);
          position: absolute;
          top: -4px;
          right: 0px;
          transform: translate(-50%, 0);
        }
      }
      .dot-gray {
        &::after {
          background-color: #c8c8c8;
        }
      }
      .dot-white {
        &::after {
          background-color: #fff;
        }
      }
      .dot-blue {
        &::after {
          background-color: #1f69b4;
        }
      }
      .dot-gray,
      .dot-white,
      .dot-blue {
        display: flex;
        flex-direction: column;
        font-size: 16px;
        position: relative;
        .lunar-date {
          color: #c0c4cc;
          font-size: 9px;
          line-height: 10px;
          width: 110%;
        }
        .tr {
          position: absolute;
          top: 2px;
          right: -8px;
          font-size: 0.5rem;
          color: #4f9efa;
        }
      }

      >>> .el-calendar__header {
        height: 40px;
        .el-calendar__title {
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }
      }
      >>> .el-calendar__button-group {
        display: none;
      }
      >>> .el-calendar__body {
        border-bottom: 1px solid #ebeef5;
        padding: 12px 20px 0;
        .el-calendar-table td {
          height: 40px;
          border: 1px solid #fff;
          box-sizing: border-box;
          font-size: 15px;
        }
        .el-calendar-table td:hover {
          border-radius: 2px;
          border: 1px solid #506cd2;
          box-sizing: border-box;
        }
        .el-calendar-table .el-calendar-day {
          height: 100%;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .el-calendar-table td.is-selected {
          border: 1px solid #506cd2;
          background-color: #fff;
          border-radius: 2px;
        }

        .el-calendar-table td.is-today {
          background-color: #1f69b4 !important;
          color: #fff !important;
          border-radius: 2px;
          .lunar-date {
            color: #fff !important;
          }
        }
        .el-calendar-table .el-calendar-day:hover {
          background-color: transparent;
          height: 100%;
        }
      }
      >>> .el-calendar-day {
        height: 100%;
        text-align: center;
      }
      .header {
        height: 40px;
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 0;
        width: 100%;
        line-height: 40px;
        padding: 0 20px;
        .left, .right {
          cursor: pointer;
        }
      }
    }
    .daily {
      position: relative;
      .time-line {
        padding: 10px 20px;
      }
      .time-card {
        margin: 10px;
        height: 60px;
        border: 1px solid #ebeef5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 5px;
        box-shadow: 0 2px 2px 0 rgb(0 0 0 / 5%);
        font-size: 15px;
        z-index: 2;
        position: relative;
        .bg {
          width: 8px;
          height: 104%;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          position: relative;
          left: -2px;
        }
        .middle,
        .right {
          padding: 5px 15px;
          .text {
            visibility: hidden;
            line-height: 25px;
          }
        }
        .middle {
          flex: 1;
          font-size: 14px;
          .time {
            color: #303131;
            line-height: 25px;
          }
          .content {
            width: 150%;
          }
        }
        .right {
          text-align: right;
          display: flex;
          flex-direction: column;
          font-size: 14px;
        }
      }
      .region11 {
        .bg {
          background-color: #4384f4;
        }
        .type {
          color: #4384f4;
        }
        &:hover {
          box-shadow: 0 0 5px 1px rgba(155, 163, 175, 0.3);
        }
      }
      .region12 {
        .bg {
          background-color: #33b579;
        }
        .type {
          color: #33b579;
        }
        &:hover {
          box-shadow: 0 0 5px 1px rgba(155, 163, 175, 0.3);
        }
      }
      .region13 {
        .bg {
          background-color: #f85578;
        }
        .type {
          color: #f85578;
        }
        &:hover {
          box-shadow: 0 0 5px 1px rgba(155, 163, 175, 0.3);
        }
      }
      .regionOther {
        .bg {
          background-color: #9ba3af;
        }
        .type {
          color: #9ba3af;
        }
        &:hover {
          box-shadow: 0 0 5px 1px rgba(155, 163, 175, 0.3);
        }
      }
      .begin {
        .middle .time {
          color: #4486ef !important;
        }
        .right .text {
          color: #4486ef !important;
          visibility: visible;
        }
      }
      .pendingDay {
        .middle .time {
          color: #9ba3af !important;
        }
      }
      .button {
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 1;
      }
    }
  }
}

.popover {
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
    top: 4px;
  }
}
.tear {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  -webkit-transform-origin: top left;
  transform-origin: top left;
  box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  -webkit-animation: tear-animation 0.8s linear forwards;
  animation: tear-animation 0.8s linear forwards;
}
@-webkit-keyframes tear-animation {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    top: 0;
    opacity: 1;
  }
  20% {
    -webkit-transform: rotate(9deg);
    transform: rotate(9deg);
    top: 0;
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    top: 200px;
    opacity: 0;
  }
}
@keyframes tear-animation {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    top: 0;
    opacity: 1;
  }
  20% {
    -webkit-transform: rotate(9deg);
    transform: rotate(9deg);
    top: 0;
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    top: 200px;
    opacity: 0;
  }
}
.portal-common-title {
  margin-top: 5px;
}
.portal-common-title .right span {
  padding-left: 3px !important;
}
.portal-common-title .right span:hover {
  color: #0f59a4 !important;
  font-weight: 500 !important;
}
</style>