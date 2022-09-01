<template>
  <div>
    <el-form-item label="时间格式">
      <el-select v-model="activeData.format">
        <el-option
          v-for="(item, index) in dateFormats"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字号">
      <el-input-number v-model="activeData.fontSize"></el-input-number>
    </el-form-item>
    <el-form-item label="字体">
      <el-select v-model="activeData.fontFamily">
        <el-option
          v-for="(item, index) in fontFamilys"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="activeData.color"></el-color-picker>
    </el-form-item>
     <el-form-item label="显示钟表">
      <el-switch v-model="activeData.showClock"></el-switch>
    </el-form-item>
    <el-form-item label="显示星期">
      <el-switch v-model="activeData.showWeek"></el-switch>
    </el-form-item>
    <el-form-item label="样式">
      <el-button type="primary" @click="editStyle(index)">编辑</el-button>
    </el-form-item>
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
      dateFormats: [
        {
          label: "年月日 时:分:秒(24小时制)",
          value: "YYYY年MM月DD日 HH:mm:ss",
        },
        {
          label: "年/月/日 时:分:秒(24小时制)",
          value: "YYYY/MM/DD HH:mm:ss",
        },
        {
          label: "年月日 时:分:秒(12小时制)",
          value: "YYYY年MM月DD日 a hh:mm:ss",
        },
        {
          label: "年/月/日/时:分:秒(12小时制)",
          value: "YYYY/MM/DD a hh:mm:ss",
        },
        {
          label: "年月日 时:分(24小时制)",
          value: "YYYY年MM月DD日 HH:mm",
        },
        {
          label: "年/月/日 时:分(24小时制)",
          value: "YYYY/MM/DD HH:mm",
        },
        {
          label: "年月日 时:分(12小时制)",
          value: "YYYY年MM月DD日 a hh:mm",
        },
        {
          label: "年/月/日 时:分(12小时制)",
          value: "YYYY/MM/DD a hh:mm",
        },
        {
          label: "年月日",
          value: "YYYY年MM月DD日",
        },
        {
          label: "年/月/日",
          value: "YYYY-MM-DD",
        },
        {
          label: "时:分:秒 年月日(24小时制)",
          value: "HH:mm:ss YYYY年MM月DD日",
        },
      ],
      fontFamilys: [
        { label: "宋体", value: "SimSun" },
        { label: "黑体", value: "SimHei" },
        { label: "微软雅黑", value: "Microsoft YaHei" },
        { label: "PingFang SC", value: "PingFang SC" },
        { label: "微软正黑体", value: "Microsoft JhengHei" },
        { label: "楷体", value: "KaiTi" },
        { label: "新宋体", value: "NSimSun" },
        { label: "仿宋", value: "FangSong" },
      ],
    };
  },
  methods: {
    editStyle() {
      let content = this.activeData.css;
      this.$refs.styleSetting.init(content);
    },
    styleSubmit(content) {
      this.activeData.css = content;
    },
  },
};
</script>