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
    <div class="portal-box-body" :style="bodyStyle">
      <template v-if="noticeList.length">
        <el-table
          :data="noticeList"
          style="width: 100%"
          :show-header="showHeader"
          :row-style="{ height: '0' }"
          :cell-style="{ padding: '0' }"
          height="100%"
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
                  type="text"
                  style="color: #333 !import"
                  @click="handleView(scope.row.id)"
                  >{{ scope.row.fullName }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              :key="index"
              v-if="colItem.selection && colItem.prop == 'creator'"
              :prop="colItem.prop"
              :label="colItem.label"
              width="100px"
            ></el-table-column>
            <el-table-column
              :key="index"
              v-if="colItem.selection && colItem.prop == 'publishTime'"
              :prop="colItem.prop"
              :label="colItem.label"
              width="100px"
            >
              <template slot-scope="scope">
                {{ scope.row[colItem.prop] | toDate("yyyy-MM-dd") }}
              </template>
            </el-table-column>
          </template>
        </el-table>
        <!--<router-link class="item" to="/messageRecord" v-for="(item, i) in list" :key="i">
          <span class="name">{{item.fullName}}</span>
          <span class="time">{{item.creatorTime | toDate('yyyy-MM-dd')}}</span>
        </router-link>-->
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
    <ViewNotice v-if="viewVisible" ref="View" @refreshDataList="getData" />
  </el-card>
</template>
<script>
import { getNotice } from "@/api/home";
import { mixin } from "../visualPortalMixin";
import ViewNotice from "@/views/system/notice/View";
export default {
  mixins: [mixin],
  components: { ViewNotice },
  data() {
    return {
      columns: [],
      noticeList: [],
      viewVisible: false,
      showHeader: false,
    };
  },
  created() {
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
    getData() {
      getNotice().then((res) => {
        if (res.data) {
          if (res.data.list.length > 6) {
            this.noticeList = res.data.list.slice(0, 6);
          } else {
            this.noticeList = res.data.list;
          }
        }
      });
    },
    handleView(id) {
      this.viewVisible = true;
      this.$nextTick(() => {
        this.$refs.View.init(id);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  display: inline-block;
  width: calc(100% - 180px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  vertical-align: top;
}
</style>
