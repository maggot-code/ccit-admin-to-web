<template>
  <el-card :class="['box', titleColor]" :style="cardStyle">
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
          <i class="el-icon-more more"></i
        ></span>
      </div>
    </div>
    <div class="box" ref="box" :style="bodyStyle">
      <component :is="mode"></component>
    </div>
  </el-card>
</template>
<script>
import standard from "./standard.vue";
import simple from "./simple.vue";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  props: {
    mode: { type: String, default: "standard" },
  },
  components: {
    standard,
    simple,
  },
};
</script>
<style lang="scss" scoped>
.box {
  >>> .el-card__body {
    width: 100%;
    height: 100%;
  }
}
</style>