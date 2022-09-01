<template>
  <div>
    <el-divider>logo</el-divider>
    <el-form-item label="登录logo">
      <CCIT-UploadFz
        v-model="fileList"
        :limit="1"
        buttonText="点击上传"
        accept="image/*"
      ></CCIT-UploadFz>
    </el-form-item>
    <div class="el-upload__tip">
      <span>只能上传不超过1M的image/*文件</span><br />
      <span>建议图片分辨率300*40</span>
    </div>
    <el-divider>登录方式</el-divider>
    <el-form-item label="扫码登录">
      <el-switch v-model="activeData.useScan"></el-switch>
    </el-form-item>
    <el-form-item label="人脸登录">
      <el-switch v-model="activeData.useFace"></el-switch>
    </el-form-item>
    <el-form-item label="验证码">
      <el-switch v-model="activeData.useVerifiCode"></el-switch>
    </el-form-item>
    <el-form-item label="记住密码">
      <el-switch v-model="activeData.useRemember"></el-switch>
    </el-form-item>
    <!-- <div v-for="(item, index) in activeData.list" :key="index">
      <el-divider>{{ item.fullName }}</el-divider>
      <el-form-item label="图标">
        <el-input v-model="item.icon" placeholder="请输入图标名称">
          <el-button slot="append" @click="openIconsDialog(index)">
            选择</el-button
          >
        </el-input>
      </el-form-item>
      <el-form-item label="样式">
        <el-button type="primary" @click="editStyle(index)">编辑</el-button>
      </el-form-item>
    </div> -->
    <style-setting
      ref="styleSetting"
      @style-submit="styleSubmit"
    ></style-setting>
  </div>
</template>
<script>
import styleSetting from "@/components/VisualPortal/StyleSetting";
export default {
  components: { styleSetting },
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      fileList: [],
      currentIndex: 0,
    };
  },
  created() {
    if(this.activeData.logoObject.fileId != ''){
      this.fileList = [this.activeData.logoObject];
    }
  },
  watch: {
    fileList(val) {
      this.activeData.logoObject = val.length > 0 ? val[0] : "";
    },
  },
  methods: {
    openIconsDialog(index) {
      this.$emit("open-icons-dialog", index);
    },
    editStyle(index) {
      let content = this.activeData.list[index].css;
      this.$refs.styleSetting.init(content);
      this.currentIndex = index;
    },
    styleSubmit(content) {
      this.activeData.list[this.currentIndex].css = content;
    },
  },
};
</script>
