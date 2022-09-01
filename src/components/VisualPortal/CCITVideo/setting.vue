<template>
  <div>
    <el-form-item v-if="activeData.fileId" label="自动播放">
      <el-switch v-model="activeData.config.autoplay"></el-switch>
    </el-form-item>
    <el-form-item v-if="activeData.fileId" label="循环播放">
      <el-switch v-model="activeData.config.loop"></el-switch>
    </el-form-item>
    <el-form-item label="视频文件">
      <CCIT-UploadFz
        v-model="fileList"
        :fileSize="20"
        accept="video/*"
        showTip
        :limit="1"
        buttonText="上传文件"
      ></CCIT-UploadFz>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  watch: {
    fileList: {
      handler(val) {
        if (val.length > 0) {
          this.activeData.fileId = val[0].fileId;
        } else {
          this.activeData.fileId = "";
        }
      },
      deep: true,
    },
  },
};
</script>