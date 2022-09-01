<template>
  <el-card ref="card" :class="['portal-box', titleColor]" :style="cardStyle">
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
    <div class="portal-box-body" :style="bodyStyle" v-loading="loading">
      <el-carousel
        class="carousel"
        :autoplay="config.autoplay"
        :interval="config.interval"
        :type="config.type"
        :arrow="config.arrow"
        :indicator-position="config.indicatorPosition"
        height="100%"
      >
        <el-carousel-item
          v-for="(item, index) in imgList"
          :key="index"
          class="item"
        >
          <el-image
            class="item-img"
            :src="item.src"
            style="width: 100%; height: 100%"
            @click="openURL(item.url)"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i></div
          ></el-image>
          <span class="item-text" :style="descStyle(item)">{{
            item.desc
          }}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getDownloadUrl } from "@/api/common";
export default {
  mixins: [mixin],
  data() {
    return {
      config: {},
    };
  },
  watch: {
    list: {
      handler(val) {
        this.initImgList(val);
      },
      deep: true,
    },
  },
  computed: {
    descStyle() {
      return (item) => {
        let obj = {};
        if (item.css) {
          obj = JSON.parse(item.css);
        }
        return obj;
      };
    },
  },
  created() {
    this.initImgList(this.list);
  },
  data() {
    return {
      id: new Date().getTime(),
      imgList: [],
    };
  },
  methods: {
    openURL(url) {
      if (url) {
        window.open(url, "_blank");
      }
    },
    initImgList(list) {
      let imgTmpList = list.slice(0);
      for (let i = 0; i < list.length; i++) {
        if (list[i].img) {
          getDownloadUrl("annex", list[i].img).then((res) => {
            imgTmpList[i].src = this.define.comUrl + res.data.url;
          });
        }
      }
      this.imgList = imgTmpList;
    },
  },
};
</script>
<style lang="scss" scoped>
.carousel {
  height: 100%;
  >>> .el-carousel__arrow {
    background-color: #f5f5f5;
    color: #333;
    &:hover {
      opacity: 0.8;
      background-color: #f5f5f5;
    }
  }
}
.item {
  background-color: #fff;
  &-img {
    >>> .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      color: #909399;
      font-size: 30px;
    }
  }
  &-text {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>