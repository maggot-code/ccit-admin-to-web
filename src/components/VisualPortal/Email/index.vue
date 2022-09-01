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
        <span v-if="item.showFresh" title="刷新" class="item">
            <i class="el-icon-refresh-right" @click="getData"></i
          ></span>
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="portal-box-body" :style="bodyStyle">
      <template v-if="list.length">
        <router-link
          class="item"
          to="/extend/email"
          v-for="(item, i) in list"
          :key="i"
        >
          <span class="name">{{ item.fullName }}</span>
          <span class="time">{{ item.creatorTime | toDateText() }}</span>
        </router-link>
      </template>
      <div class="portal-common-noData" v-else>
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
import { getEmail } from "@/api/home";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getEmail().then((res) => {
        this.list = res.data.list.slice(0, 7);
      });
    },
  },
};
</script>