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
          <i class="el-icon-refresh-right" @click="getData(innerActiveTab)"></i
        ></span>
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="portal-box-body mail-box" ref="content" :style="bodyStyle">
      <el-tabs v-model="innerActiveTab" @tab-click="tabClick">
        <el-tab-pane
          v-for="item in innerTabs"
          :key="item.name"
          class="mail"
          :style="{ height: mailHeight + 'px' }"
          :label="`${item.label}${
            item.count > 0 ? '(' + item.count + ')' : ''
          }`"
          :name="item.name"
          v-loading="loading"
        >
          <el-row class="row" v-for="(item, index) in item.list" :key="index">
            <!-- <el-col :span="2">
              <el-avatar size="large"></el-avatar>
            </el-col> -->
            <el-col :span="19">
              <el-link
                @click="handleMail(item, innerActiveTab, index)"
                class="mail-title"
                type="primary"
              >
                {{ item.sender || item.recipient }}
              </el-link>
              <div class="mail-text">{{ item.subject }}</div>
            </el-col>
            <el-col :span="4" :offset="1">
              <div class="mail-time">
                {{ item.creatorTime | toDate }}
              </div></el-col
            >
          </el-row></el-tab-pane
        >
      </el-tabs>
      <div class="tabs-extra" :style="{ top: showTitle ? '52px' : '0' }">
        <el-button
          v-for="(item, index) in list"
          :key="index"
          type="text"
          :icon="item.icon"
          @click="handleMail(null, item.type)"
          >{{ item.name }}</el-button
        >
      </div>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { EmailList } from "@/api/extend/email";
export default {
  mixins: [mixin],
  data() {
    return {
      innerTabs: [
        {
          label: "收件箱",
          name: "inBox",
          count: 0,
          list: [],
        },
        {
          label: "草稿箱",
          name: "draft",
          count: 0,
          list: [],
        },
        {
          label: "已发送",
          name: "sent",
          count: 0,
          list: [],
        },
      ],
      innerActiveTab: "inBox",
      mailHeight: 0,
    };
  },
  mounted() {
    this.innerTabs.forEach((item) => {
      this.getData(item.name);
    });
    this.$nextTick(() => {
      this.mailHeight = this.$refs.content.offsetHeight - 50;
    });
  },
  methods: {
    getData(type) {
      this.loading = true;
      let data = {
        currentPage: 1,
        pageSize: 999,
        sort: "desc",
        // startTime: this.startTime,
        // endTime: this.endTime,
        type: type,
      };
      EmailList(data).then((res) => {
        this.loading = false;
        let index = this.innerTabs.findIndex((item) => {
          return item.name === type;
        });
        this.innerTabs[index].list = res.data.list;
        this.innerTabs[index].count = res.data.pagination.total;
      }).catch(err => {
        this.loading = false;
      });
    },
    tabClick() {
      this.getData(this.innerActiveTab);
    },
    handleMail(item, type, index) {
      this.$router.push({
        name: "extend-email",
        params: { ...item, type: type, index: index, comp: "mailBox" },
      });
    },
    jumpToOther(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style lang="scss" scoped>
  .mail-box {
    padding: 0 20px;
    height: 100%;
    .tabs-extra {
      position: absolute;
      right: 10px;
      button {
        margin-left: 10px;
      }
    }
    >>> .el-tabs__header {
      margin: 0;
      .el-tabs__active-bar {
        width: 40%;
      }
      .el-tabs__item {
        width: auto;
      }
    }
    .tabs[data-v-53faf256] .el-tabs__item .mail .row:not(:last-child) {
      border-bottom: 1px solid #f3f3f3;
    }
    .mail {
      overflow-y: auto;
      padding-bottom: 10px;
      .row {
        padding: 10px 5px;
      }
      &-title {
        font-size: 16px;
        height: 25px;
        line-height: 25px;
      }
      &-text {
        width: 100%;
        font-size: 14px;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-time {
        color: #c0bfbf;
        font-size: 14px;
      }
    }
  }
</style>