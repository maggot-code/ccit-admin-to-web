<template>
  <el-card :class="['task-box', titleColor]" :style="cardStyle">
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
    <div class="task-box-body" :style="bodyStyle" v-loading="loading">
      <router-link
        class="item"
        :to="'/' + item.urlAddress"
        v-for="(item, i) in list"
        :key="i"
      >
        <i :class="item.icon + ' task-body-item' + (i + 1)"></i>
        <div class="text">
          <p class="name">{{ item.name }}</p>
          <p class="num">{{ item.num }}</p>
        </div>
      </router-link>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getInterfaceData } from "@/api/home";
export default {
  mixins: [mixin],
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      if (!this.dataInterface) {
        return;
      }
      getInterfaceData(this.dataInterface).then((res) => {
        this.loading = false;
        this.list = res.data;
        return;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.task-box {
  >>> .el-card__body {
    //background-color: #7abaff;
    width: 100%;
    height: 100%;
  }
  .task-box-body {
    .item {
      height: 33%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      i {
        width: 64px;
        height: 64px;
        border-radius: 25%;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        line-height: 64px;
        font-size: 40px;
        background: #ffffff;
        &.task-body-item1 {
          color: #f68900;
        }
        &.task-body-item2 {
          color: #1890ff;
        }
        &.task-body-item3 {
          color: #7b1ae1;
        }
      }
      .text {
        display: inline-block;
        height: 64px;
        width: 45%;
        .num {
          font-size: 34px;
          color: #ffffff;
          line-height: 30px;
        }
        .name {
          font-size: 18px;
          color: #ffffff;
          line-height: 34px;
        }
      }
    }
  }
}
</style>
