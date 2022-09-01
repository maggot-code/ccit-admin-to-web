<template>
  <div class="CCIT-common-layout main">
    <div class="CCIT-common-layout-left">
      <div class="CCIT-common-title">
        <h2>{{ $t("common.column") }}</h2>
      </div>
      <el-tree
        :data="treeData"
        v-loading="treeLoading"
        :element-loading-text="$t('common.loadingText')"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
        node-key="id"
        @node-click="handleNodeClick"
        class="CCIT-common-el-tree"
      >
        <span class="custom-tree-node" slot-scope="{ node }">
          <span class="text">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <div class="CCIT-common-layout-center CCIT-flex-main">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item :label="$t('common.keyWord')">
              <el-input
                v-model="params.keyword"
                :placeholder="$t('common.enterKeyword')"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{ $t("common.search") }}</el-button
              >
              <el-button icon="el-icon-refresh-right" @click="reset()"
                >{{ $t("common.reset") }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="CCIT-common-layout-main CCIT-flex-main">
        <div class="CCIT-common-head">
          <topOpts @add="handleAddEdit()"></topOpts>
          <div class="CCIT-common-head-right">
            <el-tooltip
              effect="dark"
              :content="$t('common.refresh')"
              placement="top"
            >
              <el-link
                icon="icon-ym icon-ym-Refresh CCIT-common-head-icon"
                :underline="false"
                @click="reset()"
              />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <CCIT-table v-loading="listLoading" :data="tableData">
          <el-table-column prop="title" label="标题" v-if="ccit.hasP('title')"> </el-table-column>
          <el-table-column prop="categoryName" label="所属栏目" v-if="ccit.hasP('categoryName')">
          </el-table-column>
          <el-table-column prop="createBy" label="创建人" width="120" v-if="ccit.hasP('createBy')" />
          <el-table-column prop="createDate" label="创建时间" width="120" v-if="ccit.hasP('createDate')" />
          <el-table-column prop="sort" label="排序" width="70" align="center" v-if="ccit.hasP('sort')" />
          <el-table-column prop="status" label="状态" width="70" align="center" v-if="ccit.hasP('status')">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.status == 1
                    ? 'success'
                    : scope.row.status == 0
                    ? ''
                    : 'danger'
                "
                disable-transitions
              >
                {{
                  scope.row.status == 1
                    ? "已发布"
                    : scope.row.status == 0
                    ? "草稿"
                    : "已停用"
                }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts
                :editDisabled="scope.row.status === 1"
                :delDisabled="scope.row.status === 1"
                @edit="handleAddEdit(scope.row)"
                @del="handleDel(scope.row.id)"
              >
                <el-dropdown hide-on-click v-has="'btn_more'">
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">
                      {{ $t("common.moreBtn")
                      }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-if="scope.row.status === 0 || scope.row.status === 2"
                      @click.native="handlePublish(scope.row.id)"
                      v-has="'btn_publish'"
                    >
                      {{ $t("article.publish") }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      v-if="scope.row.status === 1"
                      @click.native="handleStop(scope.row.id)"
                      v-has="'btn_stop'"
                    >
                      {{ $t("article.stop") }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="handlePreview(scope.row.id)"
                      v-has="'btn_preview'"
                    >
                      {{ $t("article.preview") }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </CCIT-table>
        <pagination
          :total="total"
          :page.sync="params.currentPage"
          :limit.sync="params.pageSize"
          @pagination="initData"
        />
      </div>
    </div>
    <Form
      v-if="formVisible"
      ref="Form"
      @refreshDataList="initData"
      @close="formVisible = false"
    />
    <ViewArticle v-if="viewVisible" ref="View" :props="dataForm" />
  </div>
</template>
<script>
import { getElTree } from "@/api/extend/column";
import {
  getArticleList,
  delArticle,
  enableArticle,
  disableArticle,
  getArticleInfo,
} from "@/api/extend/article";
import Form from "./Form";
import ViewArticle from "./View";

export default {
  components: {
    Form,
    ViewArticle,
  },
  name: "news-article",
  data() {
    return {
      treeData: [],
      tableData: [],
      treeLoading: false,
      listLoading: false,
      btnLoading: false,
      formVisible: false,
      params: {
        categoryCode: "",
        keyword: "",
        currentPage: 1,
        pageSize: 20,
      },
      total: 0,
      dataForm: {},
      viewVisible: false,
    };
  },
  mounted() {
    this.getTree();
  },
  methods: {
    getTree() {
      getElTree().then((res) => {
        this.treeData = res.data;
        this.initData();
      });
    },
    handleNodeClick(e) {
      this.params.categoryCode = e.categoryCode;
      this.initData();
    },
    initData() {
      this.listLoading = true;
      getArticleList(this.params)
        .then((res) => {
          this.tableData = res.data.list;
          this.listLoading = false;
          this.btnLoading = false;
          this.total = res.data.pagination.total;
        })
        .catch(() => {
          this.listLoading = false;
          this.btnLoading = false;
        });
    },
    handleAddEdit(row) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.Form.init(row);
      });
    },
    search() {
      this.btnLoading = true;
      this.initData();
    },
    reset() {
      this.params.keyword = "";
      this.initData();
    },
    handleDel(id) {
      this.$confirm(this.$t("common.delTip"), this.$t("common.tipTitle"), {
        type: "warning",
      })
        .then(() => {
          delArticle(id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1500,
              onClose: () => {
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    handlePreview(id) {
      this.viewVisible = true;
      getArticleInfo(id).then((res) => {
        this.dataForm = res.data;
        this.$nextTick(() => {
          this.$refs.View.init();
        });
      });
    },
    handlePublish(id) {
      enableArticle(id).then((res) => {
        this.$message({
          message: "发布文章成功",
          type: "success",
          duration: 1500,
        });
        this.initData();
      });
    },
    handleStop(id) {
      disableArticle(id).then((res) => {
        this.$message({
          message: "停用文章成功",
          type: "success",
          duration: 1500,
        });
        this.initData();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  .CCIT-common-layout-left {
    .btn {
      margin-top: 10px;
    }
  }
  .CCIT-el_tabs {
    >>> .el-tabs__content {
      padding: 0;
    }
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
