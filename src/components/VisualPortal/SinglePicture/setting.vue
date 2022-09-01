<template>
  <div>
    <el-form-item label="图片">
      <el-upload
        class="uploader"
        :action="define.comUploadUrl + '/annex'"
        :headers="uploadHeaders"
        :show-file-list="false"
        accept="image/*"
        :multiple="false"
        :on-success="handleSuccess"
      >
        <el-image
          v-if="activeData.fileId"
          :src="downLoadUrl"
          :fit="activeData.fit"
        ></el-image>
        <i v-else class="el-icon-plus uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item v-if="activeData.fileId" label="对齐方式">
      <el-select v-model="activeData.fit">
        <el-option
          v-for="fit in fits"
          :key="fit"
          :label="fit"
          :value="fit"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="activeData.fileId" label="链接">
      <el-input
        placeholder="请输入链接地址"
        v-model="activeData.url"
      ></el-input>
    </el-form-item>
  </div>
</template>
<script>
import { getDownloadUrl } from "@/api/common";
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      uploadHeaders: { Authorization: this.$store.getters.token },
    };
  },
  computed: {
    downLoadUrl() {
      getDownloadUrl("annex", this.activeData.fileId).then((res) => {
        return this.define.comUrl + res.data.url;
      });
    },
  },
  methods: {
    handleSuccess(res) {
      if (res.code == 200) {
        this.activeData.fileId = res.data.name;
        this.$message({
          message: "上传成功",
          type: "success",
          duration: 1000,
        });
      } else {
        this.$message({
          message: "上传失败",
          type: "error",
          duration: 1000,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.uploader {
  >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  >>> .el-upload:hover {
    border-color: #409eff;
  }
  >>> .el-image {
     width: 100px;
    height: 100px;
  }
  &-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  img {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>