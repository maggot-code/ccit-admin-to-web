<template>
  <el-card :class="['portal-box', titleColor]" :style="cardStyle">
    <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
      <div class="left">
        <div v-if="showBlock" class="block" :style="blockStyle"></div>
        <template v-if="tabs.length === 1">
          <i v-if="showIcon" :class="tabs[0].icon" style="font-size: 18px"></i>
          <span v-if="showTitle">{{ tabs[0].title }}</span>
        </template>
        <template v-else>
          <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane
              v-for="(item, index) in tabs"
              :key="index"
              :name="index.toString()"
            >
              <span slot="label"
                ><i
                  v-if="showIcon"
                  :class="item.icon"
                  style="font-size: 18px"
                ></i
                ><span v-if="showTitle">{{ item.title }}</span></span
              >
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <div class="right">
        <span v-if="item.showFresh" title="刷新" class="item">
          <i class="el-icon-refresh-right" @click="getData"></i
        ></span>
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="portal-box-body todolist" :style="bodyStyle" v-loading="loading">
      <div class="innerTabs" v-if="showOuter">
        <el-tabs v-model="innerActiveTab">
          <template v-for="(item, index) in innerTabs">
            <el-tab-pane
              v-if="item.show"
              :key="index"
              :label="item.label"
              :name="item.name"
            >
            </el-tab-pane>
          </template>
        </el-tabs>
        <!-- <a
          v-for="item in innerTabs"
          :key="item.name"
          class="item"
          :class="{ active: active == item.name }"
          @click="active = item.name"
          >{{ item.label }}</a
        >&nbsp;&nbsp; -->
      </div>
      <div class="pane" v-show="innerActiveTab == 'sys'">
        <template v-if="todoList.length">
          <el-table
            class="table"
            stripe
            :data="todoList"
            style="width: 100%"
            :show-header="showHeader"
            :row-style="{ height: '0' }"
            :cell-style="{ padding: '0' }"
            :height="tableHeight"
          >
            <template v-for="(colItem, index) in columns">
              <el-table-column
                :key="index"
                v-if="colItem.selection && colItem.prop == 'fullName'"
                :prop="colItem.prop"
                :label="colItem.label"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <el-button
                    class="fullname"
                    type="text"
                    style="color: #333 !import"
                    @click="toDetail(scope.row)"
                    >{{ scope.row.fullName }}</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column
                :key="index"
                v-if="colItem.selection && colItem.prop == 'flowUrgent'"
                :prop="colItem.prop"
                :label="colItem.label"
                width="100px"
              >
                <template slot-scope="scope">
                  {{ scope.row.flowUrgent | urgentText() }}
                </template>
              </el-table-column>
              <el-table-column
                :key="index"
                v-if="colItem.selection && colItem.prop == 'status'"
                :prop="colItem.prop"
                :label="colItem.label"
                width="100px"
              >
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status == 2"
                    >审核通过</el-tag
                  >
                  <el-tag type="danger" v-else-if="scope.row.status == 3"
                    >审核驳回</el-tag
                  >
                  <el-tag type="warning" v-else-if="scope.row.status == 4"
                    >审核撤回</el-tag
                  >
                  <el-tag type="info" v-else-if="scope.row.status == 5"
                    >审核终止</el-tag
                  >
                  <el-tag type="primary" v-else>等待审核</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                :key="index"
                v-if="
                  colItem.selection &&
                  (colItem.prop == 'startTime' || colItem.prop == 'creatorTime')
                "
                :prop="colItem.prop"
                :label="colItem.label"
                width="120px"
              >
                <template slot-scope="scope">
                  {{ scope.row[colItem.prop] | toDate() }}
                </template>
              </el-table-column>
            </template>
          </el-table>
          <pagination
            v-if="showPagination"
            :total="total"
            :page.sync="params.currentPage"
            :limit.sync="params.pageSize"
            @pagination="getData"
          />
        </template>
        <div class="portal-common-noData" v-else>
          <img
            src="@/assets/images/portal-nodata.png"
            alt=""
            class="noData-img"
          />
          <p class="noData-txt">暂无数据</p>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getFlowTodo } from "@/api/home";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  props: {
    showHeader: { type: Boolean, default: false },
    showOuter: { type: Boolean, default: true },
    innerTabs: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      columns: [],
      todoList: [],
      innerActiveTab: "sys",
      params: {
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      showPagination: false,
      pageSize: 5
    };
  },
  mounted() {
    if(this.pageSize) {
      this.params.pageSize = this.pageSize
    }
    this.columns = this.list;
    this.getData();
  },
  watch: {
    list: {
      handler(val) {
        this.columns = val;
      },
      deep: true,
    },
  },
  computed: {
    tableHeight() {
      if (this.showOuter) {
        if (this.showPagination) {
          return "calc(100% - 80px)";
        } else {
          return "calc(100% - 40px)";
        }
      } else {
        return "80%";
      }
    },
  },
  methods: {
    getData() {
      this.loading = true;
      this.todoList = [];
      getFlowTodo(this.params).then((res) => {
        this.loading = false;
        this.todoList = res.data.list || [];
        this.total = res.data.pagination.total;
      }).catch(err => {
        this.loading = false;
      });
    },
    toDetail(item) {
      this.$router.push({
        name: "workFlow-flowTodo",
        params: {
          ...item,
          comp: "todoList",
          type: "detail",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.todolist {
  padding: 0 20px;
  >>> .el-tabs__header {
    margin: 0;
  }
  .table {
    // margin-top: 10px;
    .fullname {
      color: #333;
    }
  }
}
.tabs {
  height: 32px;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .item {
    position: relative;
    line-height: 32px;
    font-size: 12px;
    color: #334d65;
    &::after {
      display: block;
      content: "";
      overflow: hidden;
      width: 60px;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: transparent;
      border-radius: 1px;
    }
    &.active {
      &::after {
        background-color: #1890ff;
      }
    }
  }
}
.pane {
  height: 100%;
}
</style>