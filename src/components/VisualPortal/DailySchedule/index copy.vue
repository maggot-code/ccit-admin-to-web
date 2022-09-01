<template>
  <el-card shadow="never" :class="['daily-box', titleColor]" :style="cardStyle">
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
    <div class="daily-content" ref="content" :style="bodyStyle">
      <div class="calendar" ref="calendar">
        <el-calendar v-model="currentDate" :range="range"> </el-calendar>
        <div class="btn" @click.native="collapesCalendar">
          <i v-if="collapes" class="icon-ym icon-ym-btn-collapse"></i>
          <i v-else class="icon-ym icon-ym-btn-expand"></i>
        </div>
      </div>
      <div class="portal-common-noData" v-if="timeList.length === 0">
        <img
          src="@/assets/images/portal-nodata.png"
          alt=""
          class="noData-img"
        />
        <p class="noData-txt">暂无数据</p>
      </div>
      <el-timeline
        v-else
        class="time-line"
        :style="{ height: lineHeight + 'px' }"
        :reverse="reverse"
        v-loading="loading"
      >
        <el-timeline-item
          v-for="(item, index) in timeList"
          :key="index"
          :timestamp="timestampToDate(item.timestamp)"
          :icon="itemIcon(item.status)"
          :color="itemColor(item.status)"
          placement="top"
        >
          {{ item.content }}
        </el-timeline-item>
      </el-timeline>
      <el-button
        class="button"
        type="primary"
        @click="addOrUpdateHandle(null, null)"
        >添加</el-button
      >
    </div>
    <Form v-if="formVisible" ref="Form" @refreshDataList="refreshDataList" />
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { myDayList } from "@/api/extend/schedule";
import Form from "@/views/extend/schedule/Form";
export default {
  name: "daily-schedule",
  components: {
    Form,
  },
  mixins: [mixin],
  data() {
    return {
      range: null, //日历区间
      monday: "",
      sunday: "",
      lineHeight: 0, //时间轴高度
      formVisible: false, //显示对话框
      timeList: [],
      currentDate: "",
      loading: false,
      reverse: false,
      collapes: false, //展开日历
    };
  },
  watch: {
    currentDate(val) {
      this.getList();
    },
  },
  mounted() {
    this.currentDate = new Date();
    var timeStamp = new Date().getTime();
    var currentDay = new Date().getDay();
    this.monday = new Date(timeStamp - (currentDay - 1) * 60 * 60 * 24 * 1000)
      .toLocaleDateString()
      .replace("/", "-");
    this.sunday = new Date(timeStamp + (7 - currentDay) * 60 * 60 * 24 * 1000)
      .toLocaleDateString()
      .replace("/", "-");
    this.range = [this.monday, this.sunday];
    this.$nextTick(() => {
      this.calcLineHeight();
    });
  },
  methods: {
    getList() {
      this.loading = true;
      let date = this.currentDate.toLocaleDateString().replaceAll("/", "-");
      myDayList(date)
        .then((res) => {
          this.loading = false;
          this.timeList = res.data.list || [];
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    /**
     * 展开折叠日历
     */
    collapesCalendar() {
      this.collapes = !this.collapes;
      if (this.collapes) {
        this.range = null;
      } else {
        this.range = [this.monday, this.sunday];
      }
      this.$nextTick(() => {
        this.calcLineHeight();
      });
    },
    /**
     * 计算时间轴高度
     */
    calcLineHeight() {
      let contentH = this.$refs.content.offsetHeight;
      let calendarH = this.$refs.calendar.offsetHeight;
      this.lineHeight = contentH - calendarH - 50;
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
      this.getList();
    },
    timestampToDate(val) {
      return new Date(val).toLocaleString();
    },
    itemIcon(status) {
      switch (status) {
        case 0:
          return "el-icon-refresh";
        case 1:
          return "el-icon-info";
        case 2:
          return "el-icon-circle-check";
      }
    },
    itemColor(status) {
      switch (status) {
        case 0:
          return "#F4C242";
        case 1:
          return "F56C6C";
        case 2:
          return "#82C48D";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.daily-box {
  >>> .el-card__body {
    width: 100%;
    height: 100%;
  }
  .daily-content {
    width: 100%;
    height: 100%;
    .calendar {
      position: relative;
      >>> .el-calendar__header {
        height: 40px;
      }
      >>> .el-calendar-day {
        height: auto;
        text-align: center;
      }
      .btn {
        position: absolute;
        bottom: 5px;
        left: 50%;
      }
    }
    .time-line {
      padding: 10px 20px;
      overflow: auto;
    }
    .button {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
}
</style>