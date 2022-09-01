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
      <div class="inner">
        <el-carousel
          v-if="showCarousel"
          class="carousel"
          indicator-position="outside"
        >
          <el-carousel-item
            v-for="(item, index) in imgList"
            :key="index"
            class="item"
          >
            <el-image
              class="item-img"
              :src="item.src"
              style="width: 100%; height: 100%"
              @click="jumpToNews(item.id)"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i></div
            ></el-image>
            <div class="item-text">
              {{ item.title }}
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="article">
          <div
            v-if="showRecommend && JSON.stringify(recommendObj) !== '{}'"
            class="recommend"
            @click="jumpToNews(recommendObj.id)"
          >
            <div class="title">{{ recommendObj.title }}</div>
            <div class="content">{{ recommendObj.description }}</div>
          </div>
          <el-tabs
            v-if="innerTabs.length"
            v-model="curTab"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              v-for="(item, index) in innerTabs"
              :key="index"
              :label="item.categoryName"
              :name="item.categoryCode"
            ></el-tab-pane>
          </el-tabs>
          <CCIT-table
            class="table"
            :height="tableHeight"
            v-loading="loading"
            :data="tableData"
            :show-header="showHeader"
            :hasNO="false"
          >
            <template v-for="(colItem, index) in columns">
              <template v-if="colItem.selection">
                <el-table-column
                  v-if="colItem.prop == 'title'"
                  :key="index"
                  :prop="colItem.prop"
                  :label="colItem.label"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-link
                      type="primary"
                      class="link"
                      @click="jumpToNews(scope.row.id)"
                      >{{ scope.row.title }}</el-link
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  v-else-if="colItem.prop == 'createDate'"
                  :key="index"
                  :prop="colItem.prop"
                  :label="colItem.label"
                  :width="100"
                >
                  <template slot-scope="scope">
                    {{ scope.row.createDate.slice(0, 10) }}
                  </template>
                </el-table-column>
                <el-table-column
                  v-else
                  :key="index"
                  :prop="colItem.prop"
                  :label="colItem.label"
                  :width="colItem.width || 120"
                >
                </el-table-column>
              </template>
            </template>
          </CCIT-table>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { listTree } from "@/api/extend/column";
import { mixin } from "../visualPortalMixin";
import {
  getArticleList,
  getRecommended,
  getCarousel,
} from "@/api/extend/article";
import { getDownloadUrl } from "@/api/common";
export default {
  mixins: [mixin],
  data() {
    return {
      categoryCode: "",
      innerTabs: [],
      tableData: [],
      columns: [],
      showHeader: false,
      showCarousel: false,
      showRecommend: false,
      recommendObj: {},
      imgList: [],
    };
  },
  // mounted() {
  //   this.getTabs();
  // },
  watch: {
    categoryCode(val) {
      this.getTabs();
    },
  },
  computed: {
    tableHeight() {
      let height = this.showRecommend && JSON.stringify(this.recommendObj) !== '{}' ? 'calc(100% - 120px)' : '100%'
      return height
    }
  },
  methods: {
    getTabs() {
      if (this.categoryCode) {
        listTree({
          parentCode: this.categoryCode,
        }).then((res) => {
          if (res.data.length) {
            this.innerTabs = res.data.map((o) => {
              return {
                categoryCode: o.categoryCode,
                categoryName: o.categoryName,
              };
            });
            this.curTab = this.innerTabs[0].categoryCode;
          } else {
            this.innerTabs = [];
            this.curTab = this.categoryCode;
          }
          this.getData();
          this.getRecommended();
          this.getCarousel();
        });
      }
    },
    getData() {
      this.loading = true;
      getArticleList({
        categoryCode: this.curTab,
        keyword: "",
        currentPage: 1,
        pageSize: 10000,
      })
        .then((res) => {
          this.tableData = res.data.list.filter((item) => {
            return item.status === 1;
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getRecommended() {
      getRecommended(this.categoryCode).then((res) => {
        if (res.data != null) {
          this.recommendObj = res.data;
        }
      });
    },
    getCarousel() {
      getCarousel(this.categoryCode).then((res) => {
        let list = [];
        if (res.data.length) {
          res.data.forEach((item) => {
            if (item.image !== "") {
              let imgList = item.image.split(",");
              imgList.forEach((i) => {
                getDownloadUrl("annex", i).then((res) => {
                  list.push({
                    ...item,
                    src: this.define.comUrl + res.data.url,
                  });
                });
              });
            }
          });
        }
        this.imgList = list;
      });
    },
    jumpToNews(id) {
      let url = `${window.location.origin}/portal-news?id=${id}`;
      window.open(url, "_blank");
    },
    handleTabClick() {
      this.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
.portal-box-body {
  padding: 10px 20px;
}
.inner {
  display: flex;
  height: 100%;
  .carousel {
    flex: 1;
    overflow: hidden;
    margin-right: 20px;
    .item {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      &-img {
        >>> .image-slot {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #f5f7fa;
          color: #909399;
          font-size: 30px;
        }
      }
      &-text {
        width: 100%;
        height: 30px;
        line-height: 30px;
        bottom: -20px;
        font-size: 14px;
        left: 0;
        text-align: center;
        color: #fff;
        background-color: #909399;
      }
    }
  }
  .article {
    width: 50%;
    flex: 1;
    .recommend {
      background: #fafafa;
      padding: 10px 20px;
      .title {
        font-weight: bold;
        font-size: 16px;
        color: #0086d1;
        line-height: 32px;
      }
      .content {
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
    .table {
      border: none;
      .link {
        font-size: 12px;
      }
    }
  }
}
>>> .el-table--border::after {
  display: none;
}
</style>