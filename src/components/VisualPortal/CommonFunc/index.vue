<template>
  <el-card
    :class="['commonFunc-box', titleColor]"
    :style="cardStyle"
  >
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
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="commonFunc-box-body" :style="bodyStyle" v-loading="loading">
      <router-link
        class="item"
        :to="'/' + item.urlAddress"
        v-for="(item, i) in menuList"
        :key="i"
      >
        <i
          :class="item.icon"
          :style="{ color: item.iconBackgroundColor || '#1890FF' }"
        ></i>
        <p class="name">{{ item.fullName }}</p>
      </router-link>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      initData: [],
      menuList: [],
    };
  },
  watch: {
    list: {
      handler(val) {
        if (val) {
          this.menuList = val.filter((item) => {
            return this.initData.indexOf(item.id) !== -1;
          });
        } else {
          this.menuList = [];
        }
      },
      deep: true,
    },
  },
  mounted() {
    let list = this.$store.state.user.menuList;
    this.initList(list);
  },
  methods: {
    initList(data) {
      data.forEach((item) => {
        this.initData.push(item.id);
        if (item.children) {
          this.initList(item.children);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.commonFunc-box {
  >>> .el-card__body {
    width: 100%;
    height: 100%;
  }
  .commonFunc-box-body {
    padding: 0 30px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      display: block;
      text-align: center;
      i {
        display: inline-block;
        height: 40px;
        font-size: 40px;
        margin-bottom: 10px;
      }
      .name {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
