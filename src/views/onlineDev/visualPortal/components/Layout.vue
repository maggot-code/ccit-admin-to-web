<template>
  <el-row type="flex" justify="center" align="middle" class="basic-box">
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="10" class="basicForm">
      <el-form label-width="80px" @submit.native.prevent label-position="right">
        <el-form-item label="门户布局" prop="description">
          <div class="layouts">
            <div class="layout" v-for="(item, index) in layouts" :key="index">
              <div
                class="item"
                :class="[activeLayout.value === item.value ? 'active' : '']"
                @click="changeLayout(item)"
              >
                <div class="content" :style="gridStyle(item)">
                  <div :style="itemStyle(item, 'A')">A</div>
                  <div v-if="item.config.B" :style="itemStyle(item, 'B')">B</div>
                  <div v-if="item.config.C" :style="itemStyle(item, 'C')">C</div>
                </div>
              </div>
              <p>{{ item.name }}</p>
            </div>
          </div>
        </el-form-item>
        <div v-for="(value, key, index) in activeLayout.config" :key="index">
          <el-divider>{{ key }}区域</el-divider>
          <el-row>
            <el-col :span="7">
              <el-form-item
                v-if="activeLayout.type === 'horizontal'"
                label="高度"
              >
                <el-input
                  placeholder="请输入高度"
                  type="number"
                  v-model="activeLayout.config[key].height"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
              <el-form-item
                v-else-if="activeLayout.type === 'vertical'"
                label="宽度"
              >
                <el-input
                  placeholder="请输入宽度"
                  type="number"
                  v-model="activeLayout.config[key].width"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="背景色">
                <el-color-picker
                  v-model="activeLayout.config[key].bgColor"
                  show-alpha
                ></el-color-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="背景图">
                <div class="uploader">
                  <div v-if="activeLayout.config[key].bgImg" class="bg">
                    <el-image
                      :src="uploadBgImg(activeLayout.config[key].bgImg)"
                    ></el-image>
                    <div class="bg-cover">
                      <i class="el-icon-delete" @click="delBgImg(key)"></i>
                    </div>
                  </div>
                  <el-upload
                    v-else
                    :action="define.comUploadUrl + '/portal/theme'"
                    :headers="uploadHeaders"
                    :show-file-list="false"
                    accept="image/*"
                    :multiple="false"
                    :on-success="(res) => handleSuccess(res, key)"
                    :before-upload="beforeUpload"
                  >
                    <i class="el-icon-plus uploader-icon"></i>
                    <!-- <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件
                    </div> -->
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="样式">
                <el-button type="primary" @click="editStyle(key)"
                  >编辑</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <style-setting
        ref="styleSetting"
        @style-submit="styleSubmit"
      ></style-setting>
    </el-col>
  </el-row>
</template>
<script>
import styleSetting from "@/components/VisualPortal/StyleSetting";
import { myBrowser } from "@/utils";
export default {
  components: { styleSetting },
  props: {
    value: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      activeLayout: {},
      config: {},
      layouts: [
        {
          name: "默认布局",
          value: "default",
          config: {
            A: { width: 100, height: 100, bgImg: "", css: "", bgColor: "", row: 1, col: 1 },
          },
          type: "default",
        },
        {
          name: "水平两栏布局",
          value: "row-2",
          config: {
            A: {
              width: 100,
              height: 50,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 1, col: 1
            },
            B: {
              width: 100,
              height: 50,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 2, col: 1
            },
          },
          type: "horizontal",
        },
        {
          name: "水平三栏布局",
          value: "row-3",
          config: {
            A: {
              width: 100,
              height: 33.3,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 1, col: 1
            },
            B: {
              width: 100,
              height: 33.3,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 2, col: 1
            },
            C: {
              width: 100,
              height: 33.3,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 3, col: 1
            },
          },
          type: "horizontal",
        },
        {
          name: "垂直两栏布局",
          value: "col-2",
          config: {
            A: {
              width: 50,
              height: 100,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 1, col: 1
            },
            B: {
              width: 50,
              height: 100,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 1, col: 2
            },
          },
          type: "vertical",
        },
        {
          name: "垂直三栏布局",
          value: "col-3",
          config: {
            A: {
              width: 33.3,
              height: 100,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 1, col: 1
            },
            B: {
              width: 33.3,
              height: 100,
              bgImg: "",
              css: "",
              bgColor: "",
              row: 1, col: 2
            },
            C: {
              width: 33.3,
              height: 100,
              bgImg: "",
              css: "",
              row: 1, col: 3
            },
          },
          type: "vertical",
        },
      ],
      uploadHeaders: { Authorization: this.$store.getters.token },
      currentKey: "",
      browser: ""
    };
  },
  computed: {
    gridStyle() {
      return (item) => {
        let rows = "";
        let cols = "";
        for (let key in item.config) {
          rows += item.config[key].height + "% ";
          cols += item.config[key].width + "% ";
        }
        return {
          gridTemplateRows: item.type === "horizontal" ? rows : "100%",
          gridRows: item.type === "horizontal" ? rows : "100%",
          gridTemplateColumns: item.type === "vertical" ? cols : "100%",
          gridColumns: item.type === "vertical" ? cols : "100%",
        };
      };
    },
    itemStyle() {
      return (value, key) => {
        let obj = {};
        if (this.browser === "IE") {
          obj.gridRow = value.config[key].row;
          obj.gridColumn = value.config[key].col;
        }
        return obj;
      };
    },
    uploadBgImg() {
      return (img) => {
        return this.define.comUrl + "/api/file/Portal/theme/" + img;
      };
    },
  },
  mounted() {
    this.activeLayout = this.value || this.layouts[0];
    this.browser = myBrowser();
  },
  methods: {
    changeLayout(item) {
      this.activeLayout = item;
    },
    handleSuccess(res, key) {
      if (res.code == 200) {
        this.activeLayout.config[key].bgImg = res.data.name;
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
    editStyle(key) {
      let content = this.activeLayout.config[key].css;
      this.$refs.styleSetting.init(content);
      this.currentKey = key;
    },
    styleSubmit(content) {
      this.activeLayout.config[this.currentKey].css = content;
    },
    delBgImg(key) {
      this.$confirm("确定删除该背景图吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$set(this.activeLayout.config[key], "bgImg", "");
        })
        .catch(() => {});
    },
    getActiveLayout() {
      return this.activeLayout;
    },
  },
};
</script>
<style lang="scss" scoped>
.layouts {
  display: flex;
  flex-wrap: wrap;
  p {
    text-align: center;
  }
  .item {
    border: 1px solid #dadada;
    width: 130px;
    height: 130px;
    margin: 10px 10px 0 10px;
    padding: 15px;
    .content {
      width: 100px;
      height: 100px;
      display: grid;
      display: -ms-grid;
      overflow: hidden;
      grid-auto-flow: row;
      div {
        width: 100%;
        height: 100%;
        border: 1px dashed #1890ff;
        color: #1890ff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .active {
    border: 2px solid #1890ff;
  }
}
.uploader {
  >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 102px;
    width: 102px;
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
.bg {
  width: 100px;
  height: 100px;
  &-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    justify-content: center;
    align-items: center;
    i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
}
.bg:hover .bg-cover {
  display: flex;
}
</style>