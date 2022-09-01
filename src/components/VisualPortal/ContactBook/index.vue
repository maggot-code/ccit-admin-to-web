<template>
  <div>
    <el-card ref="card" :class="['portal-box', titleColor]" :style="cardStyle">
      <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
        <div class="left">
          <div v-if="showBlock" class="block" :style="blockStyle"></div>
          <template v-if="tabs.length === 1">
            <i
              v-if="showIcon"
              :class="tabs[0].icon"
              style="font-size: 18px"
            ></i>
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
          <el-input
            class="input"
            suffix-icon="el-icon-search"
            placeholder="请搜索姓名/账号/手机号"
            v-model="params.keyword"
            clearable
            @change="handleSearch"
          ></el-input>
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
      <div class="portal-box-body" :style="bodyStyle" v-loading="loading">
        <!-- <el-input
          class="input"
          suffix-icon="el-icon-search"
          placeholder="请搜索姓名/账号/手机号"
          v-model="params.keyword"
          clearable
          @change="handleSearch"
        ></el-input> -->
        <el-tabs class="tabs" :value="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in innerTabs"
            :key="item.id"
            :label="item.label"
            :name="item.id"
          >
            <template v-if="tableData.length">
              <el-table
                :columns="columns"
                :data="tableData"
                v-loading="listLoading"
                :show-header="showHeader"
                :row-style="{ height: '0' }"
                style="width: 100%"
                :height="tableHeight"
              >
                <template v-for="(colItem, index) in columns">
                  <template v-if="colItem.selection">
                    <el-table-column
                      v-if="colItem.prop == 'gender'"
                      :key="index"
                      :prop="colItem.prop"
                      :label="colItem.label"
                      :show-overflow-tooltip="true"
                    >
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.gender == 1
                            ? "男"
                            : scope.row.gender == 2
                            ? "女"
                            : "保密"
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :key="index"
                      v-else
                      :prop="colItem.prop"
                      :label="colItem.label"
                      :show-overflow-tooltip="true"
                    >
                    </el-table-column>
                  </template>
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getUserList } from "@/api/permission/user";
import { mixin } from "../visualPortalMixin";
import { mapGetters } from "vuex";
export default {
  mixins: [mixin],
  data() {
    return {
      innerTabs: [
        { id: "0", label: "同部门" },
        { id: "1", label: "所有" },
      ],
      columns: [],
      activeName: "0",
      params: {
        organizeId: "",
        keyword: "",
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
      listLoading: false,
      tableData: [],
      showHeader: false,
      showPagination: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    tableHeight() {
      if (this.item.h) {
        return (
          this.$refs.card.$el.clientHeight -
          85 -
          (this.showPagination ? 40 : 0) -
          (this.showTitle ? 55 : 0)
        );
      } else {
        return 0;
      }
    },
  },
  created() {
    if (!this.showPagination) {
      this.params.pageSize = 10000;
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
  methods: {
    handleClick(e) {
      if (e.name === this.activeName) return;
      this.activeName = e.name;
      this.getData();
    },
    getData() {
      if (this.activeName === "0") {
        this.params.organizeId = this.userInfo.organizeId;
      } else {
        this.params.organizeId = "";
      }
      this.params.sort = "desc";
      this.listLoading = true;
      getUserList(this.params)
        .then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.pagination.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    handleSearch() {
      this.params.currentPage = 1;
      this.params.sort = "desc";
      this.getData();
    },
    resize() {},
  },
};
</script>
<style lang="scss" scoped>
.input {
  width: 200px;
  margin-left: 20px;
  cursor: pointer;
}
.tabs {
  height: 100%;
  cursor: pointer;
}
</style>