<template>
  <transition name="el-zoom-in-center">
    <div>
<div class="CCIT-preview-main">
      <div class="CCIT-common-page-header">
        <el-page-header
          @back="goBack"
          :content="!dataForm.id ? '新建文章' : '编辑文章'"
        />
        <div class="options">
          <el-button @click="handleView">预览</el-button>
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
        label-width="100px"
        class="main"
      >
        <div class="CCIT-common-title mb-20">
          <h2 class="bold">基本信息</h2>
        </div>
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="dataForm.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属栏目" prop="categoryCode">
              <CCIT-TreeSelect
                placeholder="请选择所属栏目"
                :props="treeProps"
                :options="treeData"
                v-model="dataForm.categoryCode"
                clearable
                v-on="$listeners"
                lastLevel
              >
              </CCIT-TreeSelect>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来源">
              <el-radio-group v-model="dataForm.source">
                <el-radio label="0">原创</el-radio>
                <el-radio label="1">转载</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="dataForm.source == '1'">
          <el-col :span="12">
            <el-form-item
              label="外部链接"
              prop="href"
              :required="dataForm.source == '1'"
            >
              <el-input
                v-model="dataForm.href"
                placeholder="请输入外部链接"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="来源出处"
              prop="copyfrom"
              :required="dataForm.source == '1'"
            >
              <el-input
                v-model="dataForm.copyfrom"
                placeholder="请输入来源出处"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="CCIT-common-title mb-20">
          <h2 class="bold">详细信息</h2>
        </div>
        <el-form-item label="摘要" prop="description">
          <el-input
            v-model="dataForm.description"
            type="textarea"
            :rows="3"
            :maxlength="200"
            placeholder="请输入文章摘要"
          />
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <CCITQuill v-model="dataForm.articleData.content" />
        </el-form-item>
        <div class="CCIT-common-title mb-20">
          <h2 class="bold">其他信息</h2>
        </div>
        <el-form-item label="内容图片" prop="image">
          <CCIT-UploadImg
          v-model="fileList"
            accept="image/*"
            type="annex"
            :fileSize="100"
            sizeUnit="MB"
            :limit="4"
            buttonText="上传图片"
          ></CCIT-UploadImg>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="dataForm.sort"
                :min="0"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="推荐位" prop="postid">
              <el-checkbox-group v-model="postidList">
                <el-checkbox label="1">轮播图</el-checkbox>
                <el-checkbox label="2">首页推荐</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="dataForm.status"
                placeholder="请选择文章状态"
                style="width: 100%"
              >
                <el-option label="草稿" :value="0"></el-option>
                <el-option label="发布" :value="1"></el-option>
                <el-option label="停用" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="dataForm.remarks" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <ViewArticle v-if="viewVisible" ref="View" :props="dataForm"/>
    </div>
  </transition>
</template>

<script>
import ViewArticle from './View'
import { listTree } from "@/api/extend/column";
import { getDownloadUrl } from "@/api/common";
import {
  getArticleInfo,
  createArticle,
  updateArticle,
} from "@/api/extend/article";
export default {
  components: { ViewArticle },
  props: {
    parentId: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    var validateContent = (rule, value, callback) => {
      if(this.dataForm.articleData.content === '') {
        callback(new Error('请输入正文'));
      } else {
        callback();
      }
      };
    return {
      visible: false,
      viewVisible: false,
      formLoading: false,
      btnLoading: false,
      typeOptions: [],
      treeData: [],
      treeProps: {
        value: "categoryCode",
        label: "categoryName",
        children: "children",
      },
      dataForm: {
        articleData: {
          content: "", // 文章内容
          id: "",
        },
        categoryCode: "", //栏目编码， 必填
        copyfrom: "", // 文章来源出处
        corpCode: "", //租户代码
        corpName: "", //租户名称
        description: "", //摘要
        href: "", //外部链接
        image: "", //内容图片
        postid: "", //推荐位置（1轮播图 2首页推荐）
        remarks: "", //备注信息
        sort: "", //排序
        source: "0", //源（原创/转载）
        status: 0, //状态（0草稿 1已发布 2停用）， 必填
        title: "", //内容标题， 必填
        type: "annex", //内容图片类型，默认类型 annex
      },
      dataRule: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        categoryCode: [
          { required: true, message: "请选择所属栏目", trigger: "change" },
        ],
        href: [{ required: true, message: "请输入外部链接", trigger: "blur" }],
        copyfrom: [
          { required: true, message: "请输入来源出处", trigger: "blur" },
        ],
        content: [
          {required: true, validator: validateContent, trigger: 'change'}
        ]
      },
      postidList: [],
      fileList: [],
    };
  },
  methods: {
    goBack() {
      this.$emit("close");
    },
    init(row) {
      this.dataForm.id = "";
      this.visible = true;
      this.formLoading = true;
      this.getTree();
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (row && row.id) {
          this.dataForm.id = row.id;
          getArticleInfo(this.dataForm.id).then((res) => {
            this.dataForm = Object.assign(this.dataForm, res.data);
            this.postidList = this.dataForm.postid.split(",");
            let tempList = this.dataForm.image.split(",");
            tempList.forEach((id) => {
              if (id) {
                getDownloadUrl("annex", id).then((downloadRes) => {
                  if (downloadRes.data.url) {
                    this.fileList.push({
                      name: id,
                      fileId: id,
                      url: downloadRes.data.url,
                    });
                  }
                });
              }
            });
          });
        }
      });
      this.formLoading = false;
    },
    getTree() {
      listTree().then((res) => {
        this.treeData = res.data;
      });
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          const formMethod = this.dataForm.id ? updateArticle : createArticle;
          this.dataForm.postid = this.postidList.join(",");
          this.dataForm.image = this.fileList.map(o => o.fileId).join(",");
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
    handleView() {
      this.viewVisible = true
      this.$nextTick(() => {
        this.$refs.View.init()
      })
    },
  },
};
</script>
