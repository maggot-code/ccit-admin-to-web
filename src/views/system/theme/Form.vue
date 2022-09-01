<template>
  <el-dialog
    :title="!dataForm.id ? '新建主题' : '编辑主题'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="CCIT-dialog CCIT-dialog_center"
    lock-scroll
    width="500px"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      v-loading="formLoading"
      label-width="80px"
      class="main"
    >
      <el-form-item label="主题名" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="请输入主题名" />
      </el-form-item>
      <el-form-item label="布局类型" prop="type">
        <el-input v-model="dataForm.type" placeholder="请输入主题布局类型" />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker
          style="width: 100%"
          v-model="dataForm.startTime"
          type="date"
          placeholder="请选择开始时间"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker
          style="width: 100%"
          v-model="dataForm.endTime"
          type="date"
          placeholder="请选择结束时间"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="关联门户" prop="portalId">
        <el-select v-model="dataForm.portalId" placeholder="请选择关联门户">
          <el-option-group
            v-for="group in portalList"
            :key="group.id"
            :label="group.fullName"
          >
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.fullName"
              :value="item.id"
              :disabled="item.enabledMark !== 1"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="权重" prop="weight">
            <el-input-number
              :min="0"
              v-model="dataForm.weight"
              placeholder="请输入权重"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="enabledMark">
            <el-switch
              v-model="dataForm.enabledMark"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{
        $t("common.cancelButton")
      }}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{ $t("common.confirmButton") }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getPortalList } from "@/api/onlineDev/portal";
import { addSystemTheme, updateSystemTheme } from "@/api/system/theme";

export default {
  data() {
    return {
      portalList: [],
      visible: false,
      formLoading: false,
      btnLoading: false,
      dataForm: {
        id: "",
        fullName: "",
        type: "",
        weight: 0,
        startTime: "",
        endTime: "",
        enabledMark: 1,
        portalId: "",
        path: "",
      },
      dataRule: {
        fullName: [
          { required: true, message: "主题名不能为空", trigger: "blur" },
        ],
        type: [
          {
            required: true,
            message: "布局类型不能为空",
            trigger: "blue",
          },
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "change" },
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getPortalList();
  },
  methods: {
    getPortalList() {
      this.$store
        .dispatch("base/getDictionaryData", { sort: "commonPortalDesigner" })
        .then((res) => {
          this.portalList = JSON.parse(JSON.stringify(res));
          getPortalList({ type: 0 }).then((res) => {
            for (let i = 0; i < this.portalList.length; i++) {
              let child = res.data.list.filter(
                (o) => this.portalList[i].id === o.category
              );
              child = 
              this.$set(this.portalList[i], "children", child);
            }
            this.portalList = this.portalList.filter((o) => o.children.length);
          });
        });
    },
    goBack() {
      this.$emit("close");
    },
    init(row) {
      this.visible = true;
      this.formLoading = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (row) {
          this.dataForm = JSON.parse(JSON.stringify(row));
        } else {
          this.dataForm = {
            id: "",
            fullName: "",
            type: "",
            weight: 0,
            startTime: "",
            endTime: "",
            enabledMark: 1,
            portalId: "",
            path: "",
          };
        }
        this.formLoading = false;
      });
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.endTime < this.dataForm.startTime) {
            this.$message.warning("结束时间不能小于开始时间！");
            return;
          }
          this.btnLoading = true;
          const formMethod = this.dataForm.id
            ? updateSystemTheme
            : addSystemTheme;
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
  },
};
</script>