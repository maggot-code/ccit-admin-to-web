<template>
  <div class="CCIT-common-layout">
    <div class="CCIT-common-layout-center">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input
                v-model="params.keyword"
                placeholder="请输入关键词查询"
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

        <CCIT-table v-loading="listLoading" :data="list" max-height="100%">
          <el-table-column
            prop="fullName"
            label="主题名"
            v-if="ccit.hasP('fullName')"
          />
          <el-table-column
            prop="type"
            label="布局类型"
            v-if="ccit.hasP('type')"
          />
          <el-table-column
            prop="weight"
            label="权重"
            v-if="ccit.hasP('weight')"
          />
          <el-table-column
            prop="startTime"
            label="开始时间"
            :formatter="ccit.tableDateFormat2"
            v-if="ccit.hasP('startTime')"
          ></el-table-column>
          <el-table-column
            prop="endTime"
            label="结束时间"
            :formatter="ccit.tableDateFormat2"
            v-if="ccit.hasP('endTime')"
          ></el-table-column>
          <el-table-column
            prop="portalTitle"
            label="关联门户"
            v-if="ccit.hasP('portalTitle')"
          />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <tableOpts
                @edit="handleAddEdit(scope.row)"
                @del="handleDel(scope.row.id)"
              >
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
      @close="formVisible = false"
      @refreshDataList="initData"
    />
  </div>
</template>

<script>
import { delSystemTheme, getSystemTheme } from "@/api/system/theme";
import Form from "./Form";

export default {
  name: "system-theme",
  components: { Form },
  data() {
    return {
      list: [],
      total: 0,
      btnLoading: false,
      listLoading: true,
      params: {
        keyword: "",
        currentPage: 1,
        pageSize: 20,
      },
      formVisible: false,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.listLoading = true;
      getSystemTheme(this.params)
        .then((res) => {
          this.list = res.data.list;
          this.total = res.data.pagination.total;
          this.listLoading = false;
          this.btnLoading = false;
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
    handleDel(id) {
      this.$confirm(this.$t("common.delTip"), this.$t("common.tipTitle"), {
        type: "warning",
      }).then(() => {
        delSystemTheme(id)
          .then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1500,
              onClose: () => {
                this.initData();
              },
            });
          })
          .catch(() => {});
      });
    },
    search() {
      this.params.currentPage = 1;
      this.params.pageSize = 20;
      this.params.sort = "desc";
      this.initData();
    },
    reset() {
      this.params.keyword = "";
      this.search();
    },
  },
};
</script>