<template>
  <div>
    <el-divider>事件</el-divider>
    <div v-for="(item, index) in activeData.events" :key="index">
      <span class="close-btn" @click="activeData.events.splice(index, 1)">
        <i class="el-icon-close" />
      </span>
      <el-form-item label="事件名称" style="clear: both">
        <el-input v-model="item.funName" :disabled="true" />
      </el-form-item>
      <el-form-item label="内容" style="margin-bottom: 0">
        <el-button
          type="text"
          @click="openCodeDialog(item.funContext, item.funName, index)"
          >编辑</el-button
        >
      </el-form-item>
    </div>
    <div class="mt-10">
      <el-dropdown>
        <el-button type="primary"
          >添加常用事件<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="addEvent(item)"
            v-for="(item, i) in eventList"
            :key="i"
          >
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :title="funName"
      :visible.sync="dialogVisible"
      class="CCIT-dialog CCIT-dialog_center"
      lock-scroll
      width="66%"
      :before-close="handleClose"
      append-to-body
    >
      <div class="codeArea">
        <CCITCodeEditor
          v-model="codeData"
          :options="options"
          ref="codeEditor"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("common.cancelButton")
        }}</el-button>
        <el-button
          type="primary"
          @click="setEventCode()"
          :loading="btnLoading"
          >{{ $t("common.confirmButton") }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CCITCodeEditor from "@/components/CCITEditor/monaco";
export default {
  props: {
    activeData: {
      type: Object,
      default: () => ({}),
    },
    eventList: {
      type: Array,
      default: () => [
        { name: "点击事件(click)", funName: "click", funContext: "" },
        { name: "值改变事件(change)", funName: "change", funContext: "" },
        { name: "焦点事件(focus)", funName: "focus", funContext: "" },
        { name: "失去焦点事件(blur)", funName: "blur", funContext: "" },
        { name: "键盘按下事件(keydown)", funName: "keydown", funContext: "" },
        { name: "键盘抬起事件(keyup)", funName: "keyup", funContext: "" },
        { name: "文本选中事件(select)", funName: "select", funContext: "" },
      ],
    },
  },
  components: { CCITCodeEditor },
  data() {
    return {
      options: {
        language: "javascript",
        fontSize: 14,
        theme: "vs-dark",
      },
      codeData: "",
      funNameFlag: "",
      funName: "",
      dialogVisible: false,
      btnLoading: false,
      arrIndex: 0,
    };
  },
  methods: {
    addEvent(row) {
      if (!this.activeData.events) {
        this.activeData.events = [];
      }
      this.activeData.events.push({
        funName: row.funName,
        funContext: row.funContext,
      });
    },
    setEventData() {
      this.$set(this.activeData.events, this.arrIndex, {
        funName: this.funNameFlag,
        funContext: this.codeData,
      });
    },
    setEventCode() {
      this.setEventData();
      this.dialogVisible = false;
    },
    handleClose(done) {
      this.setEventData();
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    openCodeDialog(data, flag, index) {
      this.dialogVisible = true;
      this.funNameFlag = flag;
      this.arrIndex = index;
      this.funName = flag + "事件";
      this.$nextTick(function () {
        this.$refs.codeEditor.changeEditor({
          value: data,
          options: this.options,
        });
      });
    },
  },
};
</script>

<style>
.codeArea {
  width: 100%;
  height: 400px;
}
.close-btn {
  float: right;
}
</style>