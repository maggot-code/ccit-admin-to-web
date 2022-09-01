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
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="portal-box-body" :style="bodyStyle">
      <div v-if="fileId">
        <el-image class="img" :src="downLoadUrl" :fit="fit">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getDownloadUrl } from "@/api/common";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      fileId: "",
      fit: "",
    };
  },
  computed: {
    downLoadUrl() {
      getDownloadUrl("annex", this.fileId).then((res) => {
        return this.define.comUrl + res.data.url;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.img {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>