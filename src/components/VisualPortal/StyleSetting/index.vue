<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    :visible.sync="visible"
    lock-scroll
    class="CCIT-dialog CCIT-dialog_center"
    width="600px"
  >
    <div slot="title">
      样式设置
      <el-popover
        placement="right"
        width="200"
        trigger="hover"
        :content="tipText"
      >
        <i slot="reference" class="el-icon-question question" />
      </el-popover>
    </div>
    <el-form ref="dataForm" label-width="80px" label-position="top">
      <el-form-item>
        <div class="formCodeEditor">
          <CCITCodeEditor :options="options" v-model="content" />
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="styleFormVisible = false">{{
        $t("common.cancelButton")
      }}</el-button>
      <el-button type="primary" @click="styleSubmit()">
        {{ $t("common.confirmButton") }}</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import CCITCodeEditor from "@/components/CCITEditor/monaco";
import { isJSON } from "@/utils";
export default {
  components: { CCITCodeEditor },
  data() {
    return {
      content: "",
      tipText: '格式如{"backgroundColor": "#000","border":"1px solid #000"}',
      options: {
        readOnly: false,
        language: "json",
      },
      visible: false,
    };
  },
  methods: {
    init(content) {
      this.visible = true;
      this.content = content;
    },
    styleSubmit() {
      if (!this.content ||isJSON(this.content)) {
        this.visible = false;
        this.$emit('style-submit', this.content)
      } else {
        this.$message.warning("格式不正确，请填写JSON格式的样式");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.formCodeEditor {
  width: 100%;
  height: 260px;
  margin: 0;
  padding: 0;
  border: 1px solid #c0c4cc;
  overflow: hidden;
}
.question {
  font-size: 18px;
  margin-left: 5px;
}
</style>