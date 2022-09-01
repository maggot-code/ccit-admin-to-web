<template>
  <div :id="id" style="height: 100%">
    <el-carousel
      :autoplay="config.autoplay"
      :interval="config.interval"
      :type="config.type"
      :arrow="config.arrow"
      :indicator-position="config.indicatorPosition"
      :height="carouselHeight"
    >
      <el-carousel-item
        v-for="(item, index) in imgList"
        :key="index"
        class="item"
      >
        <template v-if="item.img.length">
          <el-image
            class="item-img"
            :src="item.img[0].src"
            style="width: 100%; height: 100%"
            @click="openURL(item.url)"
          ></el-image>
        </template>
        <span class="item-text">{{ item.desc }}</span>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getDownloadUrl } from "@/api/common";
import erd from "element-resize-detector";
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
  created() {
    this.initImgList(this.list);
  },
  data() {
    return {
      id: new Date().getTime(),
      carouselHeight: "0px",
      imgList: [],
    };
  },
  methods: {
    openURL(url) {
      window.open(url, "_blank");
    },
    initImgList(list) {
      let imgTmpList = list.slice(0);
      for (let i = 0; i < list.length; i++) {
        if (list[i].img.length) {
          getDownloadUrl("annex", list[i].img[0].fileId).then((res) => {
            imgTmpList[i].img[0].src = this.define.comUrl + res.data.url;
          });
        }
      }
      this.imgList = imgTmpList;
    },
  },
  mounted() {
    erd().listenTo(document.getElementById(this.id), (element) => {
      this.$nextTick(() => {
        this.carouselHeight = element.offsetHeight + "px";
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.item {
  height: 100%;
  &-img {
    width: 100%;
    height: 100%;
  }
  &-text {
    position: absolute;
    color: #fff;
    bottom: 20px;
    left: 50%;
    margin-left: -50px;
    text-shadow: 5px 5px 5px #f5f5f5;
  }
}
</style>
