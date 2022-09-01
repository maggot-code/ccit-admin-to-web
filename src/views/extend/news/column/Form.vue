<template>
  <el-dialog
    class="CCIT-dialog CCIT-dialog_center"
    :title="!dataForm.id ? '新增栏目' : '编辑栏目'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    lock-scroll
    width="500px"
    :append-to-body="true"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      v-loading="formLoading"
      label-width="80px"
      class="main"
    >
      <el-form-item label="上级栏目" prop="parentCode">
        <CCIT-TreeSelect
          :props="treeProps"
          v-model="dataForm.parentCode"
          :options="treeData"
          placeholder="请选择上级栏目"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="栏目名称" prop="categoryName">
        <el-input
          placeholder="请输入栏目名称"
          v-model="dataForm.categoryName"
        ></el-input>
      </el-form-item>
      <el-form-item label="栏目编号" prop="categoryCode">
        <el-input
        :disabled="dataForm.id !== ''"
          placeholder="请输入栏目编号"
          v-model="dataForm.categoryCode"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容模型" prop="moduleType">
        <el-select placeholder="请选择内容模型" v-model="dataForm.moduleType">
          <el-option label="文章" value="article"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="dataForm.status"
          :active-value="9"
          :inactive-value="2"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number :min="0" v-model="dataForm.sort"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{
        $t("common.cancelButton")
      }}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="btnLoading">
        {{ $t("common.confirmButton") }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import {
  listTree,
  createColumn,
  updateColumn,
  getColumnInfo,
} from "@/api/extend/column";
import CCITQuill from "@/components/CCITEditor/quill";
import CCITTransfer from "@/components/CCIT-transfer";

export default {
  components: { CCITQuill, CCITTransfer },
  data() {
    return {
      treeProps: {
        value: "categoryCode",
        label: "categoryName",
        children: "children",
      },
      visible: false,
      formLoading: false,
      btnLoading: false,
      transLoading: false,
      dataForm: {
        parentCode: "",
        categoryCode: "",
        categoryName: "",
        moduleType: "article",
        sort: 0,
        status: 9,
      },
      dataRule: {
        parentCode: [
          { required: true, message: "上级栏目不能为空", trigger: "change" },
        ],
        categoryCode: [
          { required: true, message: "栏目编号不能为空", trigger: "blur" },
        ],
        categoryName: [
          { required: true, message: "栏目名称不能为空", trigger: "blur" },
          { max: 10, message: '栏目名称最大长度为10', trigger: 'blur' }
        ],
        moduleType: [
          { required: true, message: "内容模型不能为空", trigger: "change" },
        ],
      },
      timing: false,
      columnList: [],
      fileList: [],
      dialogVisible: false,
      treeData: [],
    };
  },
  methods: {
    goBack() {
      this.$emit("close");
    },
    init(id) {
      this.initColumnTree();
      this.userList = this.$store.getters.userList;
      this.dataForm.id = id || '';
      this.visible = true;
      this.formLoading = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          getColumnInfo(this.dataForm.id)
            .then((res) => {
              this.dataForm = res.data;
              this.formLoading = false;
            })
            .catch((err) => {
              this.formLoading = false;
            });
        } else {
          this.formLoading = false;
        }
      });
    },
    initColumnTree() {
      listTree().then((res) => {
        let list = res.data;
        list.forEach((item) => {
          item.children = null;
        });
        let topItem = {
          categoryName: "顶级节点",
          hasChildren: true,
          categoryCode: "-1",
          icon: "icon-ym icon-ym-tree-organization3",
          children: list,
        };
        this.treeData = [topItem];
      });
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          const formMethod = this.dataForm.id ? updateColumn : createColumn;
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