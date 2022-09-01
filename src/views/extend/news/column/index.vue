<template>
  <div class="CCIT-common-layout">
    <div class="CCIT-common-layout-center">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="栏目名称">
              <el-input
                v-model="params.categoryName"
                placeholder="请输入栏目名称查询"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="栏目编号">
              <el-input
                v-model="params.categoryCode"
                placeholder="请输入栏目编号查询"
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
        <CCIT-table
          v-loading="listLoading"
          :data="list"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: '' }"
          default-expand-all
        >
          <el-table-column
            prop="categoryName"
            label="栏目名称"
            v-if="ccit.hasP('categoryName')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="categoryCode"
            label="栏目编号"
            v-if="ccit.hasP('categoryCode')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="moduleType"
            label="内容模型"
            v-if="ccit.hasP('moduleType')"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.moduleType === 'article'">文章</span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" v-if="ccit.hasP('sort')" />
          <el-table-column
            prop="status"
            label="状态"
            width="70"
            align="center"
            v-if="ccit.hasP('status')"
          >
            <template slot-scope="scope">
              <div>
                <el-switch
                  v-model="scope.row.status"
                  :active-value="9"
                  :inactive-value="2"
                  @click.native="handleUpdateState(scope.row)"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="120"
            v-if="ccit.hasP('createBy')"
          />
          <el-table-column
            prop="createDate"
            label="创建时间"
            width="140"
            v-if="ccit.hasP('createDate')"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <tableOpts
                :hasDel="scope.row.children == null"
                @edit="handleAddEdit(scope.row.id)"
                @del="handleDel(scope.row)"
              >
              </tableOpts>
            </template>
          </el-table-column>
        </CCIT-table>
      </div>
    </div>
    <Form
      v-if="formVisible"
      ref="Form"
      @close="formVisible = false"
      @refreshDataList="initData"
    />
  </div>
</template>

<script>
import Form from "./Form";
import {
  enableColumn,
  disableColumn,
  listTree,
  delColumn,
} from "@/api/extend/column";
import { getArticleList } from "@/api/extend/article";
export default {
  name: "news-column",
  components: { Form },
  data() {
    return {
      params: {
        categoryCode: "",
        categoryName: "",
      },
      list: [],
      listLoading: false,
      formVisible: false,
      btnLoading: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.listLoading = true;
      listTree(this.params).then((res) => {
        this.list = res.data;
        this.listLoading = false;
        this.btnLoading = false;
      });
    },
    search() {
      this.btnLoading = true;
      this.initData();
    },
    reset() {
      this.params = {
        categoryCode: "",
        categoryName: "",
      };
      this.initData();
    },
    // 启用禁用栏目
    handleUpdateState(row) {
      if (!this.ccit.hasBtnP("btn_edit"))
        return this.$message.warning(this.$t("common.noPerTip"));
      row.status = row.status === 9 ? 2 : 9;
      const txt = row.status === 9 ? "停用" : "开启";
      this.$confirm(`您确定要${txt}当前栏目吗, 是否继续?`, "提示", {
        type: "warning",
      })
        .then(() => {
          const formMethod = row.status === 9 ? disableColumn : enableColumn;
          formMethod(row.id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                row.status = row.status === 9 ? 2 : 9;
              },
            });
          });
        })
        .catch(() => {});
    },
    handleAddEdit(id) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.Form.init(id);
      });
    },
    handleDel(row) {
      getArticleList({categoryCode: row.categoryCode}).then((res) => {
        if (res.data.list.length) {
          this.$message({
            type: "warning",
            message: "该栏目下有文章，请先删除文章!",
            duration: 1500,
          });
        } else {
          this.$confirm(this.$t("common.delTip"), this.$t("common.tipTitle"), {
            type: "warning",
          })
            .then(() => {
              delColumn(row.id).then((res) => {
                this.$message({
                  type: "success",
                  message: res.msg,
                  duration: 1000,
                });
                this.initData();
              });
            })
            .catch(() => {});
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.TableTree-container {
  padding: 0;
}
</style>