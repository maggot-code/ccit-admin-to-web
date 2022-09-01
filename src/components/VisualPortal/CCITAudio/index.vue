<template>
  <div>
    <el-card
      ref="card"
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
      <div :style="bodyStyle" v-loading="loading">
        <audio
          :style="{ width: '100%', height: '100%' }"
          :src="downLoadUrl"
          id="audio"
          :autoplay="config.autoplay"
          :loop="config.loop"
          controls
        ></audio>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getDownloadUrl } from "@/api/common";

export default {
  mixins: [mixin],
  data() {
    return {
      config: {
        autoplay: false,
        loop: false,
      },
      fileId: "",
      // audio: [
      //   {
      //     title: "secret base~君がくれたもの~",
      //     artist: "Silent Siren",
      //     src: "https://cn-east-17-aplayer-35525609.oss.dogecdn.com/secretbase.mp3",
      //     pic: "https://cn-east-17-aplayer-35525609.oss.dogecdn.com/secretbase.jpg",
      //   },
      // ],
    };
  },
  watch: {
    "config.autoplay"(val) {
      var audio = document.getElementById("audio");
      if (val) {
        audio.play();
      } else {
        audio.pause();
      }
    },
  },
  computed: {
    downLoadUrl() {
      if (this.fileId) {
        getDownloadUrl("annex", this.fileId).then((res) => {
          return this.define.comUrl + res.data.url;
        });
      } else {
        return "";
      }
    },
  },
  mounted() {
    // id3.fromUrl(require("../../../../static/music/test.mp3")).then((tags) => {
    //   debugger;
    //   let artist =encodeURI(encodeURI(tags.artist))
    // });
    if (this.config.autoplay) {
      var audio = document.getElementById("audio");
      audio.play();
    }
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.audio {
  display: flex;
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
