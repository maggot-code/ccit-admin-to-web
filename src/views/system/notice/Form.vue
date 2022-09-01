<template>
  <transition name="el-zoom-in-center">
    <div class="CCIT-preview-main">
      <div class="CCIT-common-page-header">
        <el-page-header
          @back="goBack"
          :content="!dataForm.id ? '新建公告' : '编辑公告'"
        />
        <div class="options">
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="dataFormSubmit()"
          >
            {{ $t("common.confirmButton") }}</el-button
          >
          <el-button @click="goBack()">{{
            $t("common.cancelButton")
          }}</el-button>
        </div>
      </div>
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="dataRule"
        v-loading="formLoading"
        label-width="80px"
        class="main"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="dataForm.title" placeholder="公告标题" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收件人" prop="receiver">
              <el-select
                v-model="receiver"
                :style="{ width: 'calc(100% - 55px)' }"
                multiple
                collapse-tags
                placeholder="请选择收件人"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.realName"
                  :value="item.id"
                ></el-option>
              </el-select>
              <el-button
                @click="handleUserRelation"
                icon="el-icon-search"
              ></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="定时发送">
              <el-switch v-model="timing"></el-switch>
              <el-date-picker
                v-if="timing"
                v-model="dataForm.publishTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="请选择发送时间"
                align="left"
                value-format="timestamp"
                :style="{ width: 'calc(100% - 44px)' }"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件">
          <CCIT-UploadFz
            v-model="fileList"
            buttonText="点击上传"
          ></CCIT-UploadFz>
        </el-form-item>
        <el-form-item label="正文" prop="bodyText">
          <CCITQuill v-model="dataForm.bodyText" @blur="editorBlur" />
        </el-form-item>
      </el-form>
      <el-dialog
        title="选择收件人"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="dialogVisible"
        lock-scroll
        append-to-body
        class="CCIT-dialog CCIT-dialog_center transfer-dialog"
        width="800px"
      >
       <UserTransfer
        :visible="dialogVisible"
        v-model="receiver"
        ref="OrgTransfer"
      />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{
            $t("common.cancelButton")
          }}</el-button>
          <el-button
            type="primary"
            :loading="btnLoading"
            @click="dialogVisible = false"
          >
            {{ $t("common.confirmButton") }}</el-button
          >
        </span>
      </el-dialog>
    </div>
  </transition>
</template>

<script>
import UserTransfer from "@/components/User-transfer";
import CCITQuill from "@/components/CCITEditor/quill";
import {
  createNotice,
  updateNotice,
  getNoticeInfo,
} from "@/api/system/message";

export default {
  components: { CCITQuill, UserTransfer },
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      transLoading: false,
      dataForm: {
        id: "",
        title: "",
        bodyText: "",
        toUserIds: "",
        publishTime: "",
        fileJson: "",
      },
      dataRule: {
        title: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        receiver: [
          {
            require: true,
            message: "公告收件人不能为空",
            trigger: "change",
            type: "array",
          },
        ],
        bodyText: [
          { required: true, message: "公告内容不能为空", trigger: "blur" },
        ],
      },
      timing: false,
      userList: [],
      fileList: [],
      receiver: [],
      dialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        },
      },
    };
  },
  watch: {
    timing(val) {
      if (!val) {
        this.dataForm.publishTime = "";
      }
    },
  },
  methods: {
    goBack() {
      this.$emit("close");
    },
    init(id) {
      this.userList = this.$store.getters.userList;
      this.dataForm.id = id || 0;
      this.visible = true;
      this.formLoading = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          getNoticeInfo(this.dataForm.id).then((res) => {
            this.dataForm = res.data;
            let list = this.dataForm.toUserIds.split(",");
            this.receiver = list;
            this.fileList = JSON.parse(this.dataForm.fileJson);
            if (res.data.publishTime) {
              this.dataForm.publishTime = new Date(
                res.data.publishTime
              ).getTime();
              this.timing = true;
            } else {
              this.dataForm.publishTime = "";
              this.timing = false;
            }
          });
        } else {
          this.userList.forEach((item) => {
            this.receiver.push(item.id);
          });
          this.dataForm.publishTime = "";
          this.timing = false;
          this.fileList = [];
        }
        this.formLoading = false;
      });
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.dataForm.toUserIds = this.receiver.join(",");
          this.dataForm.fileJson = JSON.stringify(this.fileList);
          this.btnLoading = true;
          const formMethod = this.dataForm.id ? updateNotice : createNotice;
          formMethod(this.dataForm)
            .then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.btnLoading = false;
                  this.$emit("refreshDataList");
                  this.goBack();
                },
              });
            })
            .catch(() => {
              this.btnLoading = false;
            });
        }
      });
    },
    handleUserRelation() {
      this.dialogVisible = true;
      this.transLoading = true;
      this.$nextTick(() => {
        this.$refs.OrgTransfer && (this.$refs.OrgTransfer.filterText = "");
      });
    },
    editorBlur(html) {
      this.dataForm.bodyText = html;
    },
  },
};
</script>
<style lang="scss" scoped>
.CCIT-preview-main {
  .content {
    >>> {
      p {
        line-height: 30px;
        img {
          display: block;
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }
  .vab-quill-content {
    >>> {
      .el-form-item__content {
        line-height: normal;
      }
    }
  }
}
</style>