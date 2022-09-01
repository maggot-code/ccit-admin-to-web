<template>
  <el-dialog
    :visible.sync="visible"
    fullscreen
    lock-scroll
    class="CCIT-full-dialog"
    :show-close="false"
    :modal="false"
  >
    <div class="CCIT-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/ccit.png" class="header-logo" />
        <p class="header-txt">· 门户设计</p>
      </div>
      <el-steps
        :active="activeStep"
        finish-status="success"
        simple
        class="steps"
      >
        <el-step
          v-for="(item, index) in steps"
          :key="index"
          :title="item.title"
        ></el-step>
      </el-steps>
      <div class="options">
        <el-button @click="prve" :disabled="activeStep <= 0">{{
          $t("common.prev")
        }}</el-button>
        <el-button @click="next" :disabled="activeStep >= steps.length - 1">{{
          $t("common.next")
        }}</el-button>
        <el-button
          type="primary"
          @click="dataFormSubmit()"
          :disabled="activeStep < steps.length - 1"
          :loading="btnLoading"
          >{{ $t("common.confirmButton") }}</el-button
        >
        <el-button @click="closeDialog()">{{
          $t("common.cancelButton")
        }}</el-button>
      </div>
    </div>
    <div class="main">
      <el-row
        type="flex"
        justify="center"
        align="middle"
        v-if="!activeStep"
        class="basic-box"
      >
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="10" class="basicForm">
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="80px"
            @submit.native.prevent
            label-position="right"
          >
            <el-form-item label="门户名称" prop="fullName">
              <el-input
                v-model="dataForm.fullName"
                placeholder="门户名称"
                maxlength="100"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="门户编码" prop="enCode">
              <el-input
                v-model="dataForm.enCode"
                placeholder="门户编码"
                maxlength="50"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="门户分类" prop="category">
              <el-select v-model="dataForm.category" placeholder="选择分类">
                <el-option
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id"
                  v-for="item in categoryList"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="enabledMark">
              <el-switch
                v-model="dataForm.enabledMark"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="门户说明" prop="description">
              <el-input
                v-model="dataForm.description"
                placeholder="门户说明"
                type="textarea"
                :rows="3"
                maxlength="150" show-word-limit
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <template v-if="show.layout">
        <layout
          ref="layout"
          v-model="formData.activeLayout"
        ></layout>
      </template>
      <template v-if="show.designer">
        <PortalDesigner
          ref="loginPortalDesigner"
          :conf="formData"
        />
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { getPortalInfo, Update, Create } from "@/api/onlineDev/portal";
import PortalDesigner from "./Designer";
import layout from "../components/Layout";
export default {
  components: { PortalDesigner, layout },
  data() {
    return {
      steps: [],
      visible: false,
      activeStep: 0,
      dataForm: {
        id: "",
        fullName: "",
        enCode: "",
        enabledMark: 1,
        category: "",
        type: 1,
        description: "",
      },
      dataRule: {
        fullName: [
          { required: true, message: "门户名称不能为空", trigger: "blur" },
        ],
        enCode: [
          { required: true, message: "门户编码不能为空", trigger: "blur" },
          { validator: this.formValidate("enCode"), trigger: "blur" },
        ],
        category: [
          { required: true, message: "门户分类不能为空", trigger: "change" },
        ],
        enabledMark: [
          { required: true, message: "状态不能为空", trigger: "blur" },
        ],
      },
      formVisible: false,
      btnLoading: false,
      formData: null,
      categoryList: [],
      show: {
        layout: false,
        designer: false,
      },
    };
  },
  watch: {
    activeStep(val) {
      switch (val) {
        case 0:
          this.show = { layout: false, designer: false };
          break;
        case 1:
          this.show = { layout: true, designer: false };
          break;
        case 2:
          this.show = { layout: false, designer: true };
          break;
      }
    },
  },
  methods: {
    init(categoryList, id) {
      this.steps = [
  { title: "基础设计" },
  { title: "门户布局" },
  { title: "门户设计" },
];
      this.categoryList = categoryList;
      this.activeStep = 0;
      this.dataForm.id = id || "";
      this.visible = true;
      this.formData = {};
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          getPortalInfo(this.dataForm.id).then((res) => {
            this.dataForm = res.data;
            this.formData = JSON.parse(this.dataForm.formData);
          });
        }
      });
    },
    dataFormSubmit() {
      this.$refs.loginPortalDesigner
        .getData()
        .then((res) => {
            let index = res.formData.layout.findIndex((item) => {
              return (item.ccitKey === "loginForm" || item.ccitKey === "loginForm2")
            });
            if (index === -1) {
              this.$message.warning("请先添加表单元素再进行保存操作!");
              return;
            }
          if (res.formData.layout) this.btnLoading = true;
          this.formData = res.formData;
          this.dataForm.formData = JSON.stringify(this.formData);
          const formMethod = this.dataForm.id ? Update : Create;
          formMethod(this.dataForm)
            .then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.closeDialog(true);
                },
              });
            })
            .catch(() => {
              this.btnLoading = false;
            });
        })
        .catch((err) => {
          err.msg && this.$message.warning(err.msg);
        });
    },
    closeDialog(isRefresh) {
      this.visible = false;
      this.$emit("close", isRefresh);
    },
    prve() {
      this.activeStep -= 1;
    },
    next() {
      if (this.activeStep === 0) {
        this.$refs["dataForm"].validate((valid) => {
          if (valid) this.activeStep += 1;
        });
      } else {
        if (this.activeStep === 1 && this.show.layout) {
          let activeLayout = this.$refs.layout.getActiveLayout();
          let w = 0;
          let h = 0;
          for (let key in activeLayout.config) {
            w += parseFloat(activeLayout.config[key].width);
            h += parseFloat(activeLayout.config[key].height);
          }
          if (activeLayout.type === "horizontal") {
            if (h.toFixed(0) != 100) {
              this.$message.warning("区域高度合计必须为100");
              return;
            }
          } else if (activeLayout.type === "vertical") {
            if (w.toFixed(0) != 100) {
              this.$message.warning("区域宽度合计必须为100");
              return;
            }
          }
          this.formData.activeLayout = activeLayout;
        }
        this.activeStep += 1;
      }
    }
  },
};
</script>
<style lang="scss" scoped>
>>> .steps {
}
</style>