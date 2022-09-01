<template>
<div class="Schedule-container app-container">
    <FullCalendar
    class='demo-app-calendar'
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :aspectRatio="1"
      :header="{
        left: 'prevYear,prev',
        center: 'title',
        right: 'next,nextYear',
      }"
      locale="zh-cn"
      :plugins="calendarPlugins"
      :events="calendarEvents"
      @dateClick="handleDateClick"
      @eventClick="eventClick"
      height="parent"
      :eventLimit="true"
      :editable="true"
      :dayNames="dayNamesShort"
      :dayNamesShort="dayNamesShort"
      @datesRender="datesRender"
    />
</div>
</template>
<script>
import { AppDayList, AppList, List } from "@/api/extend/schedule";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
export default {
  name: "extend-schedule",
  components: {
    FullCalendar,
  },
  data() {
    return {
      formVisible: false,
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
      ],
      calendarEvents: [],
      dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
      titleFormat: { year: "numeric", month: "2-digit" },
      startTime: "",
      endTime: "",
    };
  },
  created() {},
  mounted() {
    // let calendarApi = this.$refs.fullCalendar.getApi()
    // console.log(calendarApi);
  },
  methods: {
    datesRender(calendar) {
      let view = calendar.view;
      this.startTime = this.ccit.toDate(view.activeStart, "yyyy-MM-dd HH:mm");
      this.endTime = this.ccit.toDate(view.activeEnd, "yyyy-MM-dd HH:mm");
      this.initData();
    },
    handleDateClick(arg) {
      let startTime = this.ccit.toDate(arg.date, "yyyy-MM-dd HH:00"),
        clickTime = this.ccit.toDate(arg.date, "yyyyMMdd"),
        currTime = this.ccit.toDate(new Date(), "yyyyMMdd");
      if (clickTime < currTime) return;
      if (clickTime == currTime) {
        let thisDate = new Date();
        thisDate.setHours(thisDate.getHours() + 1);
        startTime = this.ccit.toDate(thisDate, "yyyy-MM-dd HH:00");
      }
      this.addOrUpdateHandle("", startTime);
      this.addOrUpdateHandle("", new Date(startTime).getTime());
    },
    eventClick(data) {
      if (
        this.ccit.toDate(data.event.start, "yyyyMMddHHmm") >
        this.ccit.toDate(new Date(), "yyyyMMddHHmm")
      ) {
        this.addOrUpdateHandle(data.event.id);
      }
    },
    initData() {
      // let query = {
      //   startTime: new Date(this.startTime).getTime(),
      //   endTime: new Date(this.endTime).getTime(),
      // }
      let query = {
        startTime: this.startTime,
        endTime: this.endTime,
      };
      List(query).then((res) => {
        this.calendarEvents = res.data.list.map((o) => ({
          id: o.id,
          title: o.content,
          start: o.startTime,
          end: o.endTime,
          color: o.colour,
          editable: false,
          allDay: false,
        }));
      });
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
      this.initData();
    },
  },
};
</script>
<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "~@fullcalendar/bootstrap/main.css";
.Schedule-container {
  padding: 0;
  .fc-toolbar.fc-header-toolbar {
    padding: 10px;
    margin-bottom: 0;
  }
  .fc-toolbar h2 {
    font-size: 1rem;
  }
  .fc-button-primary {
    background-color: #fff;
    color: #999;
    border: none;
    font-size: 12px;
  }
  .fc-button-primary:not(:disabled):active,
  .fc-button-primary:not(:disabled).fc-button-active {
    background-color: #f5f5f5;
  }
  .fc-button .fc-icon {
    line-height: 16px;
  }
  .fc-unthemed th {
    height: 40px;
    line-height: 40px;
    color: #1f1f1f;
    font-weight: 600;
  }
  .fc-center {
    color: #1F1F1F;
  }
  .fc-unthemed th,
  .fc-unthemed td,
  .fc-unthemed thead,
  .fc-unthemed .fc-divider,
  .fc-unthemed .fc-row,
  .fc-unthemed .fc-content,
  .fc-unthemed .fc-popover,
  .fc-unthemed .fc-list-view,
  .fc-unthemed .fc-list-heading td {
    border: none;
    color: #1F1F1F;
    vertical-align: middle;
    height: 100%;
    text-align: center;
  }
  .fc-unthemed td.fc-today {
    background-color: #4F9EFA;
  }
  .fc-row.fc-rigid .fc-content-skeleton {
    height: 100%;
  }
  .fc-content-skeleton table, .fc-content-skeleton td,.fc-mirror-skeleton td {
    height: 100%;
  }
  .fc-ltr .fc-dayGrid-view .fc-day-top .fc-day-number {
    float: none;
  }
}
</style>