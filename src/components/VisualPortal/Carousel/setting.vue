<template>
  <div>
    <el-divider>图片轮播</el-divider>
    <el-form-item label="自动切换">
      <el-switch v-model="activeData.config.autoplay"></el-switch>
    </el-form-item>
    <el-form-item v-if="activeData.config.autoplay" label="时间间隔">
      <el-select
        v-model="activeData.config.interval"
        placeholder="请选择时间间隔"
      >
        <el-option
          v-for="item in carouselConfig.intervalList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="指示器">
      <el-select
        v-model="activeData.config.indicatorPosition"
        placeholder="请选择指示器"
      >
        <el-option
          v-for="item in carouselConfig.indicatorPositionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="切换箭头">
      <el-select
        v-model="activeData.config.arrow"
        placeholder="请选择切换箭头的显示时机"
      >
        <el-option
          v-for="item in carouselConfig.arrowList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="activeData.config.type" placeholder="请选择类型">
        <el-option
          v-for="item in carouselConfig.typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-divider>选项</el-divider>
    <div>
      <el-collapse
        value="0"
        class="collapse"
        v-for="(item, index) in activeData.list"
        :key="index"
      >
        <el-collapse-item
          class="collapse-item"
          :title="`选项${index + 1}`"
          name="0"
        >
          <el-form-item label="图片">
            <singleImg v-model="item.img" type="annex"></singleImg>
            <!-- <CCIT-UploadFz
              v-model="item.img"
              :fileSize="25"
              sizeUnit="MB"
              :limit="1"
              buttonText="点击上传"
            ></CCIT-UploadFz>  -->
          </el-form-item>
          <el-form-item label="描述">
            <el-input placeholder="请输入描述" v-model="item.desc"></el-input>
          </el-form-item>
          <el-form-item label="样式">
            <el-button type="primary" @click="editStyle(index)">编辑</el-button>
          </el-form-item>
          <el-form-item label="链接">
            <el-input
              placeholder="请输入链接地址"
              v-model="item.url"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
        <div class="collapse-btn" @click="delSelectItem(index)">
          <i class="el-icon-remove-outline" />
        </div>
      </el-collapse>
      <el-button
        icon="el-icon-circle-plus-outline"
        type="text"
        @click="addImgItem"
        v-if="activeData.list.length < 5"
        >添加选项</el-button
      >
    </div>
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
      carouselConfig: {
        intervalList: [
          { label: "1秒", value: 1000 },
          { label: "3秒", value: 3000 },
          { label: "5秒", value: 5000 },
        ],
        typeList: [
          { label: "默认", value: "" },
          { label: "卡片", value: "card" },
        ],
        arrowList: [
          { label: "总是", value: "always" },
          { label: "悬停", value: "hover" },
          { label: "从不", value: "never" },
        ],
        indicatorPositionList: [
          { label: "隐藏", value: "none" },
          { label: "显示", value: "" },
        ],
      },
      currentIndex: 0
    };
  },
  methods: {
    //预览iframe
    previewIframe() {
      let pattern = /^((https|http)?:\/\/)[^\s]+/;
      if (pattern.test(this.activeData.iframeUrl)) {
        this.activeData.url = this.activeData.iframeUrl;
      } else {
        this.$message.warning("预览失败，请填写正确的链接地址");
      }
    },
    addImgItem() {
      this.activeData.list.push({
        img: "",
        desc: "",
        url: "",
        src: "",
        css: '{"color": "#ccc", "textShadow": "2px 2px 2px #ccc", "fontSize": "16px"}',
      });
    },
    delSelectItem(index) {
      this.activeData.list.splice(index, 1);
    },
    editStyle(index) {
      this.currentIndex= index;
      let content = this.activeData.list[index].css;
      this.$refs.styleSetting.init(content);
    },
    styleSubmit(content) {
      this.activeData.list[this.currentIndex].css = content;
    },
  },
};
</script>
<style lang="scss" scoped>
.collapse {
  position: relative;
  border-top: none;
  >>> .el-collapse-item__arrow {
    margin: 0 40px 0 auto;
  }
  >>> .el-collapse-item__header {
    font-size: 14px;
    border-bottom: none;
  }
  >>> .el-collapse-item__content {
    padding-bottom: 0;
  }
  &-btn {
    position: absolute;
    top: 7px;
    right: 10px;
    cursor: pointer;
    color: #f56c6c;
  }
}
</style>