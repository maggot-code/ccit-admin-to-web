<template>
  <el-tabs
    type="border-card"
    v-model="activeTab"
    class="tabs"
    @tab-click="search"
  >
    <el-tab-pane
      v-for="(item, index) in tabs"
      :key="index"
      :label="item.label"
      :name="item.name"
    >
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input
                v-model="params.taskName"
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
      <div class="CCIT-common-layout-main CCIT-flex-main main">
        <CCIT-table v-loading="listLoading" :data="list" max-height="100%">
          <el-table-column
            prop="taskName"
            label="待办标题"
            :width="200"
            show-overflow-tooltip
            v-if="ccit.hasP('taskName')"
          >
            <template slot-scope="scope">
              <el-link
                class="link"
                v-if="scope.row.pcUrl !== undefined && scope.row.pcUrl !== ''"
                @click="openUrl(scope.row.pcUrl)"
              >
                {{ scope.row.taskName }}
              </el-link>
              <span v-else>{{ scope.row.taskName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sysTaskId"
            label="待办编号"
            :width="200"
            show-overflow-tooltip
            v-if="ccit.hasP('sysTaskId')"
          />
          <el-table-column
            prop="sysCode"
            label="系统编号"
            v-if="ccit.hasP('sysCode')"
          />
          <el-table-column
            prop="handleUserName"
            label="当前处理用户"
            v-if="ccit.hasP('handleUserName')"
          />
          <el-table-column
            prop="sendTime"
            label="推送时间"
            :formatter="ccit.tableDateFormat"
            :width="120"
            v-if="ccit.hasP('sendTime')"
          ></el-table-column>
          <el-table-column
            prop="sendUserName"
            label="上一环节用户"
            v-if="ccit.hasP('sendUserName')"
          />
          <el-table-column
            prop="state"
            label="待办状态"
            v-if="ccit.hasP('state')"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.state == 0"
                type="danger"
                disable-transitions
              >
                待办
              </el-tag>
              <el-tag
                v-if="scope.row.state == 2"
                type="success"
                disable-transitions
              >
                已办
              </el-tag>
              <el-tag
                v-if="scope.row.state == 3"
                type="warning"
                disable-transitions
              >
                取消
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="待办名称"
            :width="120"
            show-overflow-tooltip
            v-if="ccit.hasP('typeName')"
          />
          <el-table-column
            prop="linkName"
            label="活动名称"
            :width="120"
            show-overflow-tooltip
            v-if="ccit.hasP('linkName')"
          />
        </CCIT-table>
        <pagination
          :total="total"
          :page.sync="params.first"
          :limit.sync="params.limit"
          @pagination="initData"
        />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { getTaskList, getCompleteList } from "@/api/system/task";

export default {
  name: "task",
  data() {
    return {
      list: [],
      total: 0,
      btnLoading: false,
      listLoading: true,
      params: {
        first: 1,
        limit: 20,
        handleUserCode: "",
        taskName: "",
      },
      tabs: [
        {
          label: "待办",
          name: "0",
        },
        {
          label: "已办",
          name: "1",
        },
      ],
      activeTab: "0",
    };
  },
  created() {
    debugger
    this.params.handleUserCode = this.$store.getters.userInfo.userAccount
    this.initData();
  },
  methods: {
    initData() {
      debugger
      this.listLoading = true;
      const method = this.activeTab === "0" ? getTaskList : getCompleteList;
      method(this.params)
        .then((res) => {
          this.list = res.data.records;
          this.total = res.data.total;
          this.listLoading = false;
          this.btnLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
          this.btnLoading = false;
        });
    },
    search() {
      this.params.first = 1;
      this.params.limit = 20;
      this.initData();
    },
    reset() {
      this.params.taskName = "";
      this.search();
    },
    openUrl(url) {
      window.open(url, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.tabs {
  height: 100%;
  >>> .el-tabs__content {
    height: calc(100% - 39px);
    .el-tab-pane {
      height: 100%;
      .main {
        height: calc(100% - 64px);
      }
    }
  }
}
.link {
  font-size: 12px;
}
</style>