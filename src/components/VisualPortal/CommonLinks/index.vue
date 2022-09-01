<template>
  <el-card :class="['links-box', titleColor]" :style="cardStyle">
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
    <div
      class="links-content"
      :style="[bodyStyle, linkStyle]"
      v-loading="loading"
    >
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="jumpToLogin(item.url)"
      >
        <i
          :style="{ color: color, fontSize: fontSize + 'px' }"
          class="ym-custom ym-custom-link-variant"
        ></i>
        <a :style="{ color: color, fontSize: fontSize + 'px' }">{{
          item.name
        }}</a>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      position: "center",
      fontSize: 12,
    };
  },
  computed: {
    linkStyle() {
      return {
        backgroundColor: this.bgColor,
        justifyContent: this.position,
      };
    },
  },
  methods: {
    jumpToLogin(url) {
      window.open(url, "blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.links-box {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  height: 100%;
  >>> .el-card__header {
    display: none;
  }
  >>> .el-card__body {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
  .links-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .item {
      width: 90px;
      height: 35px;
      line-height: 35px;
      display: flex;
      margin-left: 10px;
      // i {
      //   // color: #4696ec;
      //   // font-size: 14px;
      // }
      a {
        // font-size: 14px;
        margin-left: 5px;
      }
    }
  }
}
</style>