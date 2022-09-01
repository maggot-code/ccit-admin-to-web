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
    <div v-for="(item, index) in activeData.list" :key="index">
      <el-divider>{{ item.fullName }}</el-divider>
      <el-form-item v-if="item.show != undefined" label="显示">
        <el-switch v-model="item.show"></el-switch>
      </el-form-item>
      <el-form-item v-if="item.focus !== undefined" label="激活效果">
        <el-switch v-model="item.focus"></el-switch>
      </el-form-item>
      <el-form-item v-if="item.iconType" label="图标">
        <el-radio-group v-model="item.iconType">
          <el-radio label="icon">图标库</el-radio>
          <el-radio label="img">图片</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="item.iconType === 'icon'">
          <el-form-item :label="item.focus ? '未激活' : '选择图标'">
            <el-input v-model="item.originIcon" placeholder="请输入图标名称">
              <el-button slot="append" @click="openIconsDialog(index, 'originIcon')">
                选择</el-button
              >
            </el-input>
          </el-form-item>
          <el-form-item v-if="item.focus" label="激活时">
            <el-input
              v-model="item.activeIcon"
              placeholder="请输入图标名称"
            >
              <el-button slot="append" @click="openIconsDialog(index, 'activeIcon')">
                选择</el-button
              >
            </el-input>
          </el-form-item>
      </template>
      <el-form-item v-if="item.iconType === 'img'" label="上传图片">
        <el-row>
          <el-col :span="item.focus ? 11 : 24">
            <UploadFileSingle
              v-model="item.originImg"
              type="annex"
              accept=".jpg,.png"
              :buttonText="item.focus ? '未激活' : '选择图片'"
          /></el-col>
          <el-col v-if="item.focus" :span="11" :offset="1">
            <UploadFileSingle
              v-model="item.activeImg"
              type="annex"
              accept=".jpg,.png"
              buttonText="激活时"
          /></el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="item.originColor" :label="index === 3 ? '背景色' : '边框颜色'">
        <el-row>
          <el-col style="display: flex" :span="item.focus ? 11 : 24">
            {{item.focus ? '未激活' : ''}}
            <el-color-picker v-model="item.originColor"></el-color-picker>
          </el-col>
          <el-col style="display: flex" v-if="item.focus" :span="11" :offset="1">
            激活时
            <el-color-picker v-model="item.activeColor"></el-color-picker></el-col>
            <el-col style="display: flex" v-if="item.focus && item.shadowColor" :span="11">
            阴影
            <el-color-picker v-model="item.shadowColor"></el-color-picker></el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="item.placeholder" label="占位文本">
        <el-input v-model="item.placeholder" placeholder="请输入占位文本">
        </el-input>
      </el-form-item>
      <el-form-item v-if="item.text" label="文本">
        <el-input v-model="item.text" placeholder="请输入文本"> </el-input>
      </el-form-item>
      <el-form-item v-if="item.css" label="样式">
        <el-button type="primary" @click="editStyle(index)">编辑</el-button>
      </el-form-item>
    </div>
    <style-setting
      ref="styleSetting"
      @style-submit="styleSubmit"
    ></style-setting>
    <iconBox
      :visible.sync="iconsVisible"
      :current="current"
      @choiceIcon="setIcon"
    />
  </div>
</template>
<script>
import styleSetting from "@/components/VisualPortal/StyleSetting";
import iconBox from "@/components/CCIT-iconBox";
export default {
  components: { iconBox, styleSetting },
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
      iconsVisible: false,
      currentType: '',
      current: ''
    };
  },
  created() {
    if (this.activeData.logoObject.fileId != "") {
      this.fileList = [this.activeData.logoObject];
    }
  },
  watch: {
    fileList(val) {
      this.activeData.logoObject = val.length > 0 ? val[0] : "";
    },
  },
  methods: {
    openIconsDialog(index, type) {
      this.iconsVisible = true;
      this.currentIndex = index;
      this.currentType = type;
      this.current = this.activeData.list[this.currentIndex][type];
    },
    setIcon(val) {
      this.activeData.list[this.currentIndex][this.currentType] = val;
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
