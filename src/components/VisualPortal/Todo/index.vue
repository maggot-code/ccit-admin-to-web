<template>
  <el-card :class="['todo-box', titleColor]" :style="cardStyle">
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
    <div class="todo-box-body" :style="bodyStyle">
      <router-link
        class="item"
        :to="'/' + item.urlAddress"
        v-for="(item, i) in list"
        :key="i"
      >
        <i :class="item.icon + ' todo-body-item' + (i + 1)"></i>
        <div class="text">
          <p class="num">{{ item.num }}</p>
          <p class="name">{{ item.name }}</p>
        </div>
      </router-link>
    </div>
  </el-card>
</template>
<script>
import { getTaskListNum } from "@/api/system/task";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getTaskListNum({
        state: "0",
        handleUserCode: this.$store.getters.userInfo.userAccount,
      })
        .then((res) => {
          if(res.code == 10000) {
            this.list[0].num = res.data;
          } else {
            this.list[0].num = 0;
          }
        })
        .catch((err) => {
        });
      getTaskListNum({
        state: "2",
        handleUserCode: this.$store.getters.userInfo.userAccount,
      })
        .then((res) => {
          if(res.code == 10000) {
            this.list[1].num = res.data;
          } else {
            this.list[1].num = 0;
          }
        })
        .catch((err) => {
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.todo-box {
  >>> .el-card__body {
    width: 100%;
    height: 100%;
  }
  .todo-box-body {
    padding: 0 30px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      height: 56px;
      display: block;
      i {
        width: 56px;
        height: 56px;
        margin-right: 14px;
        border-radius: 50%;
        color: #fff;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        line-height: 56px;
        font-size: 30px;
        &.todo-body-item1 {
          background: #f68900;
        }
        &.todo-body-item2 {
          background: #1890ff;
        }
        &.todo-body-item3 {
          background: #7b1ae1;
        }
      }
      .text {
        display: inline-block;
        height: 56px;
        .num {
          font-size: 20px;
          line-height: 36px;
        }
        .name {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>
