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
    <template v-if="!isEmpty">
      <div class="portal-box-body" :style="bodyStyle">
        <el-table
          :data="data"
          style="width: 100%"
          :border="showBorder"
          :stripe="showStripe"
          :show-header="showHeader"
        >
          <template v-for="(colItem, index) in columns">
            <el-table-column
              v-if="colItem.selection"
              :key="index"
              :prop="colItem.prop"
              :label="colItem.label"
              :width="colItem.width || 100"
            >
              <template slot-scope="scope">
                <template
                  v-if="colItem.link && colItem.link.status === '1'"
                >
                  <el-link type="primary" @click="jumpToLink(colItem.link, scope.row)">{{ scope.row[colItem.prop] }}</el-link>
                </template>
                <span v-else>{{ scope.row[colItem.prop] }}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </template>
    <div class="portal-common-noData" v-else>
      <img src="@/assets/images/portal-nodata.png" alt="" class="noData-img" />
      <p class="noData-txt">暂无数据</p>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { previewDataInterface } from "@/api/systemData/dataInterface";
export default {
  mixins: [mixin],
  data() {
    return {
      data: [],
      columnInterface: "",
      columns: [],
      isEmpty: true,
      showBorder: false,
      showStripe: false,
    };
  },
  mounted() {
    // this.getColumn();
    this.getData();
  },
  watch: {
    dataInterface(val) {
      // this.getColumn();
      this.getData();
    },
  },
  methods: {
    getData() {
      if (!this.dataInterface) {
        this.isEmpty = true;
        return;
      }
      previewDataInterface(this.dataInterface)
        .then((res) => {
          res.data.columns.forEach((item) => {
            item.selection = true;
          });
          if (!this.columns) {
            this.columns = res.data.columns;
          }
          this.data = res.data.data;
          this.isEmpty = false;
        })
        .catch((err) => {
          this.isEmpty = true;
        });
    },
    jumpToLink(link, row) {
      let param = ''
      link.params.forEach((o, index) => {
        if(index === 0) {
          param += '?'
        }
        param += `${o.key}=${row[o.field]}`
        if(index !== link.params.length- 1) {
          param += '&'
        }
      })
      window.open(link.url + param, '_blank') 
    }
  },
};
</script>