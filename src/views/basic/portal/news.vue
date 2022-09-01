<template>
    <div class="layout" v-loading="loading">
      <h1 class="title">{{ dataForm.title }}</h1>
      <div class="info">
        <span>日期：{{ dateFormat(dataForm.createDate) }}</span
        >
      </div>
      <div v-if="imgList.length" class="imgList">
        <el-image
          class="image"
          v-for="(item, index) in imgList"
          :key="index"
          :src="item"
        ></el-image>
      </div>
      <div class="description">
        <span>{{ dataForm.description }}</span>
      </div>
      <template v-if="dataForm.articleData">
        <div class="main" v-html="dataForm.articleData.content"></div>
      </template>
      <template v-if="dataForm.source== '1'">
        <div class="source">转载于{{dataForm.copyfrom}}&nbsp;&nbsp;{{dataForm.href}}</div>
      </template>
  </div>
</template>

<script>
import { getArticleInfo } from "@/api/extend/article";
import { getDownloadUrl } from "@/api/common";
export default {
  name: "portal-news",
  props: {
    props: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dataForm: {},
      loading: false,
      imgList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    dateFormat(date) {
      return this.ccit.dateFormat(date);
    },
    init() {
      if(this.$route.query.id == null) {
        this.$message.warning('获取新闻编号为空！')
        return
      }
      this.dataForm.id = this.$route.query.id;
      this.loading = true;
      let imgList = [];
      getArticleInfo(this.dataForm.id)
        .then((res) => {
          this.dataForm = Object.assign(this.dataForm, res.data);
          this.loading = false;
          if (this.dataForm.image !== "") {
            this.dataForm.image.split(",").forEach((id) => {
              getDownloadUrl("annex", id).then((res) => {
                let url = this.define.comUrl + res.data.url;
                imgList.push(url);
              });
            });
          }
          this.imgList = imgList;
        })
        .catch((err) => {
          this.imgList = [];
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.layout {
  background-color: #fff;
  width: 100%;
  padding: 10px;
  min-height: calc(100vh - 130px);
  .title {
    font-size: 28px;
    font-weight: 600;
    text-align: center;
        width: 100%;
    color: #0086d1;
  }
  .info {
    line-height: 35px;
    border-bottom: 1px solid #dcdfe6;
    text-align: center;
    span {
      padding: 0 10px;
    }
  }
  .imgList {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    margin: 10px 0;
    .image {
      width: 200px;
      height: 200px;
    }
  }
  .description {
    line-height: 40px;
    text-align: center;
    span {
      padding: 0 10px;
    }
  }
  .main {
    padding: 0 10px;
    line-height: 22px;
  }
  .source {
      margin: 20px 20px 0 0;
      float: right;
      font-size: 14px;
    }
}
</style>
