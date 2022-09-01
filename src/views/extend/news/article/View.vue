<template>
  <el-dialog
    title="预览新闻"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="CCIT-dialog CCIT-dialog_center"
    lock-scroll
    width="80%"
    append-to-body
  >
    <div class="notice-wapper">
      <h1 class="title">{{ dataForm.title }}</h1>
      <div class="info">
        <span>日期：{{ dateFormat(dataForm.updateDate) }}</span
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
        <div class="source">转载于{{dataForm.copyfrom}}&nbsp;&nbsp;<el-link type="primary" @click="openHerf">{{dataForm.href}}</el-link></div>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{
        $t("common.cancelButton")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDownloadUrl } from "@/api/common";
export default {
  props: {
    props: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
      dataForm: {},
      imgList: [],
    };
  },
  methods: {
    init() {
      this.visible = true;
      this.dataForm = JSON.parse(JSON.stringify(this.props));
      let imgList = []
      if (this.dataForm.image !== "") {
        this.dataForm.image.split(",").forEach((id) => {
          getDownloadUrl("annex", id).then((res) => {
            let url = this.define.comUrl + res.data.url;
            imgList.push(url);
          });
        });
      }
      this.imgList = imgList;
    },
    dateFormat(date) {
      return this.ccit.dateFormat(date);
    },
    openHerf() {
      window.open(this.dataForm.href)
    }
  },
};
</script>
<style lang="scss" scoped>
.CCIT-dialog {
  >>> .el-dialog__body {
    min-height: 500px;
    padding: 0 20px !important;
  }
  .notice-wapper {
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
      display: flex;
      align-items: center;
    }
  }
}
</style>
