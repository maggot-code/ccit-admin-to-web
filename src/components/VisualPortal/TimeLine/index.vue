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
    <div class="portal-box-body" :style="bodyStyle" v-loading="loading">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in list"
          :key="index"
          :timestamp="activity.timestamp"
          :icon="activity.icon"
          :color="activity.color"
          :size="activity.size"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
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
      node: {},
      statusField: "",
      showHeader: true,
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
    };
  },
  watch: {
    dataInterface() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      if (!this.dataInterface) {
        return;
      }
      this.loading = true;
      previewDataInterface(this.dataInterface).then((res) => {
        this.loading = false;
        if (this.listSize >= res.data.list) {
          this.list = res.data;
        } else {
          this.list = res.data.slice(0, this.listSize);
        }
        this.handleList();
        return;
      });
    },
    handleList() {
      if (this.node && this.statusField) {
        let noStart = this.node.noStart.value;
        let progress = this.node.progress.value;
        let finish = this.node.finish.value;
        this.list.forEach((item) => {
          if (noStart !== 0) {
            if (this.node.noStart.condition === -1) {
              if (item[this.statusField] < noStart) {
                item.icon = this.node.noStart.icon;
                item.color = this.node.noStart.color;
              }
            } else if (this.node.noStart.condition === 0) {
              if (item[this.statusField] == noStart) {
                item.icon = this.node.noStart.icon;
                item.color = this.node.noStart.color;
              }
            } else if (this.node.noStart.condition === -1) {
              if (item[this.statusField] > noStart) {
                item.icon = this.node.noStart.icon;
                item.color = this.node.noStart.color;
              }
            }
          }
           if (progress !== 0) {
            if (this.node.progress.condition === -1) {
              if (item[this.statusField] < progress) {
                item.icon = this.node.progress.icon;
                item.color = this.node.progress.color;
              }
            } else if (this.node.progress.condition === 0) {
              if (item[this.statusField] == progress) {
                item.icon = this.node.progress.icon;
                item.color = this.node.progress.color;
              }
            } else if (this.node.noStar.condition === -1) {
              if (item[this.statusField] > progress) {
                item.icon = this.node.progress.icon;
                item.color = this.node.progress.color;
              }
            }
          }
          if (finish !== 0) {
            if (this.node.finish.condition === -1) {
              if (item[this.statusField] < finish) {
                item.icon = this.node.finish.icon;
                item.color = this.node.finish.color;
              }
            } else if (this.node.finish.condition === 0) {
              if (item[this.statusField] == finish) {
                item.icon = this.node.finish.icon;
                item.color = this.node.finish.color;
              }
            } else if (this.node.noStar.condition === -1) {
              if (item[this.statusField] > finish) {
                item.icon = this.node.finish.icon;
                item.color = this.node.finish.color;
              }
            }
          }
        });
      }
    },
  },
};
</script>