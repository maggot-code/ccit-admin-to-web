<template>
  <div style="height:100%">
    <div class="components-title">
      门户主题<el-button
        size="small"
        icon="el-icon-upload"
        style="margin-left: 15px"
        @click="uploadVisible = true"
        >上传主题</el-button
      >
    </div>
    <el-scrollbar class="aside-scrollbar"
      ><div class="list">
        <div v-for="item in themeList" :key="item.id" class="theme">
          <img
            :class="[activeTheme === item.fileId ? 'theme-active' : '']"
            :src="define.comUrl + '/api/file/Portal/theme/' + item.fileId"
            alt=""
          />
          <div class="theme-name">{{ item.fullName }}</div>
          <div class="theme-cover">
            <i
              class="el-icon-circle-check"
              @click="changeTheme(item.fileId)"
            ></i>
            <i class="el-icon-delete" @click="delPortalTheme(item.id)"></i>
          </div>
        </div>
      </div>
      <div class="tips">
        <span>没有更多啦~</span>
      </div>
    </el-scrollbar>
    <el-dialog
      title="上传主题"
      :visible.sync="uploadVisible"
      :append-to-body="true"
      width="30%"
      @closed="cancelTheme"
    >
      <el-form
        :model="uploadForm"
        label-width="80px"
        :rules="uploadRules"
        ref="uploadForm"
      >
        <el-form-item label="主题名称" prop="fullName">
          <el-input
            v-model="uploadForm.fullName"
            placeholder="请输入主题名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="主题图片" prop="fileId">
          <el-upload
            class="uploader"
            :action="define.comUploadUrl + '/portal/theme'"
            :headers="uploadHeaders"
            :show-file-list="false"
            accept="image/*"
            :multiple="false"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
          >
            <el-image v-if="uploadForm.fileId" :src="uploadThemeUrl"></el-image>
            <i v-else class="el-icon-plus uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，建议图片分辨率3000*1875
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { saveTheme, getPortalTheme, delTheme } from "@/api/onlineDev/portal.js";

export default {
  props: {
    type: {
      type: Number,
      default: 0,
    },
    activeTheme: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      param: {
        currentPage: 1,
        type: 0,
        pageSize: 10000,
      },
      uploadHeaders: { Authorization: this.$store.getters.token },
      themeList: [],
      uploadVisible: false,
      uploadForm: {
        fullName: "",
        fileId: "",
        type: "",
      },
      uploadRules: {
        fullName: [
          { required: true, message: "请输入主题名称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" },
        ],
        fileId: [
          { required: true, message: "请上传主题图片", trigger: "change" },
        ],
      },
      uploadThemeUrl: "",
    };
  },
  mounted() {
    this.param.type = this.type;
    this.getThemeList()
  },
  methods: {
    getThemeList() {
      return getPortalTheme(this.param).then((res) => {
        this.themeList = res.data.list
      });
    },
    initThemeList(type) {
      getPortalTheme(this.param).then((res) => {
        this.themeList = res.data.list;
        if (type === "del") {
          this.changeTheme(this.themeList[0].fileId);
        }
      });
    },
    handleSubmit() {
      this.uploadForm.type = this.type;
      this.$refs.uploadForm.validate((valid) => {
        if (valid) {
          saveTheme(this.uploadForm)
            .then((res) => {
              this.uploadVisible = false;
              this.initThemeList("add");
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1000,
              });
            })
            .catch((err) => {});
        }
      });
    },
    cancelTheme() {
      this.$refs.uploadForm.resetFields();
    },
    handleSuccess(res) {
      if (res.code == 200) {
        this.uploadForm.fileId = res.data.name;
        this.uploadThemeUrl = this.define.comUrl + res.data.url;
      } else {
        this.$message({
          message: "上传失败",
          type: "error",
          duration: 1000,
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/png" || "image/jpeg";
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG或PNG 格式!");
      }
      return isJPG;
    },
    changeTheme(fileId) {
      if (fileId === this.activeTheme) fileId = '';
      this.$emit("change-theme", fileId);
    },
    delPortalTheme(id) {
      if (this.themeList.length === 1) {
        this.$message({
          message: "门户主题至少为一个!",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("确定删除该门户主题吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTheme(id)
            .then((res) => {
              this.$message({
                message: "删除门户成功",
                type: "success",
                duration: 1000,
              });
              this.initThemeList("del");
            })
            .catch((err) => {
              this.$message({
                message: "删除门户失败",
                type: "error",
                duration: 1000,
              });
            });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.components-list {
  box-sizing: border-box;
  background-color: #fff;
  padding: 10px 0 10px 10px;
  .components-title {
    font-size: 14px;
    color: #043254;
    line-height: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .theme {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    position: relative;
    margin: 0 10px 10px 0;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
    &-active {
      border: 4px solid #2db7f5;
    }
    &-name {
      position: absolute;
      z-index: 100;
      bottom: 0;
      text-align: center;
      width: 100%;
      color: #fff;
      font-size: 12px;
    }
    &-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      justify-content: space-around;
      align-items: center;
      i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
      }
    }
  }
  .theme:hover .theme-cover {
    display: flex;
  }
  .tips {
    text-align: center;
    font-size: 10px;
    line-height: 20px;
    clear: both;
  }
}
.uploader {
  >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  >>> .el-upload:hover {
    border-color: #409eff;
  }
  >>> .el-image {
    width: 100px;
    height: 100px;
  }
  &-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  img {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>