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
    <div
      class="portal-box-body todolist"
      :style="bodyStyle"
      v-loading="loading"
    >
      <div class="innerTabs">
        <el-tabs v-model="innerActiveTab" @tab-click="getData">
          <template v-for="(item, index) in innerTabs">
            <el-tab-pane
              v-if="item.show"
              :key="index"
              :label="item.label"
              :name="item.name"
            >
              <template v-if="list.length > 0">
                <el-table
                  stripe
                  :data="list"
                  style="width: 100%"
                  :show-header="showHeader"
                  :height="tableHeight"
                >
                  <template v-for="(colItem, index) in columns">
                    <el-table-column
                      :key="index"
                      v-if="colItem.selection && colItem.prop == 'taskName'"
                      :prop="colItem.prop"
                      :label="colItem.label"
                      :width="200"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-link
                          class="link"
                          v-if="
                            scope.row.pcUrl !== undefined &&
                            scope.row.pcUrl !== ''
                          "
                          @click="openUrl(scope.row.pcUrl)"
                        >
                          {{ scope.row.taskName }}
                        </el-link>
                        <span v-else>{{ scope.row.taskName }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :key="index"
                      v-else-if="
                        colItem.selection && colItem.prop == 'sendTime'
                      "
                      prop="sendTime"
                      label="推送时间"
                      :formatter="ccit.tableDateFormat"
                      :width="120"
                    />
                    <el-table-column
                      :key="index"
                      v-else-if="colItem.selection"
                      :prop="colItem.prop"
                      :label="colItem.label"
                      :show-overflow-tooltip="true"
                    />
                  </template>
                </el-table>
                <pagination
                  v-if="showPagination"
                  :total="total"
                  :page.sync="params.first"
                  :limit.sync="params.limit"
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
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getTaskList, getCompleteList } from "@/api/system/task";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      columns: [],
      list: [],
      innerActiveTab: "sys",
      params: {
        first: 1,
        limit: 20,
        handleUserCode: "",
      },
      total: 0,
      showPagination: false,
      pageSize: 5,
      showHeader: false,
      innerTabs: [],
    };
  },
  mounted() {
    this.params.handleUserCode = this.$store.getters.userInfo.userAccount;
    if (this.showPagination) {
      this.params.limit = this.pageSize;
    }
    this.columns = this.list;
    this.getData();
  },
  computed: {
    tableHeight() {
      if (this.showPagination) {
        return "calc(100% - 40px)";
      } else {
        return "100%";
      }
    },
  },
  methods: {
    getData() {
      this.loading = true;
      this.list = [];
      const method =
        this.innerActiveTab === "sys" ? getTaskList : getCompleteList;
      method(this.params)
        .then((res) => {
          this.list = res.data.records;
          this.total = res.data.total;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    openUrl(url) {
      window.open(url, "_blank");
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
  .innerTabs {
    height: 100%;
    >>> .el-tabs {
      height: 100%;
      .el-tabs__content {
        height: calc(100% - 40px);
        .el-tab-pane {
          height: 100%;
        }
      }
    }
  }
}
.link {
  font-size: 12px;
}
</style>