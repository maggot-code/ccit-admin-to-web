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
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="portal-box-body" :style="bodyStyle">
      <template v-if="list.length">
        <div class="item" v-for="(item, i) in list" :key="i">
          <span class="name">
            <el-button
              type="text"
              @click="previewFile(item.fileId)"
              >{{ item.name }}</el-button
            >
          </span>
          <span class="download">
            <el-button
              type="text"
              icon="ym-custom ym-custom-download"
              @click="downloadFile(item.fileId)"
            ></el-button>
          </span>
        </div>
      </template>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getDownloadUrl, preview } from "@/api/common";
export default {
  mixins: [mixin],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    downloadFile(fileId) {
      getDownloadUrl("annex", fileId).then((res) => {
        if (res.data.url)
          window.location.href = this.define.comUrl + res.data.url;
      });
    },
    previewFile(fileId) {
      preview("annex", fileId);
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  margin-bottom: 0px;
  .download {
    float: right;
  }
  button {
    color: #606266;
  }
}
</style>