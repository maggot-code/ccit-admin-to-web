<template>
  <el-card
    :class="['portal-box', titleColor]"
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
        <span v-if="item.showFresh" title="刷新" class="item">
          <i class="el-icon-refresh-right" @click="getData"></i
        ></span>
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="portal-box-body addflow" :style="bodyStyle" v-loading="loading">
      <div class="select">
        <label>请选择流程分类</label>
        <el-select v-model="currFlowType">
          <el-option
            v-for="(item, i) in flowEngineListAll"
            :key="i"
            :label="item.fullName"
            :value="i"
          ></el-option>
        </el-select>
      </div>
      <div class="iconList" v-if="flowEngineListAll.length > 0">
        <div
          class="iconbox"
          v-for="(child, i) in flowEngineListAll[currFlowType].children"
          :key="i"
          @click="chioceFlow(child)"
        >
          <div
            class="box-icon"
            :style="{ backgroundColor: child.iconBackground || '#008cff' }"
          >
            <i :class="child.icon"></i>
          </div>
          <p class="box-title">{{ child.fullName }}</p>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { FlowEngineListAll } from "@/api/workFlow/FlowEngine";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      categoryList: [],
      flowEngineListAll: [],
      activeNames: "",
      currFlowType: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch("base/getDictionaryData", { sort: "WorkFlowCategory" })
        .then((res) => {
          this.categoryList = res;
          this.getFlowEngineList();
        });
    },
    getFlowEngineList() {
      FlowEngineListAll().then((res) => {
        let flowEngineList = res.data.list;
        this.flowEngineListAll = JSON.parse(JSON.stringify(this.categoryList));
        for (let i = 0; i < this.flowEngineListAll.length; i++) {
          let child = flowEngineList.filter(
            (o) => this.flowEngineListAll[i].enCode === o.category
          );
          let count = child.length;
          this.$set(this.flowEngineListAll[i], "children", child);
          this.$set(this.flowEngineListAll[i], "count", count);
        }
        this.flowEngineListAll = this.flowEngineListAll.filter(
          (o) => o.children.length
        );
        if (this.flowEngineListAll.length > 0) {
          this.activeNames = this.flowEngineListAll[0].id;
        }
      });
    },
    handleChange() {},
    chioceFlow(item) {
      if (!item.enCode) {
        this.$message({
          type: "error",
          message: "流程不存在",
        });
        return;
      }
      this.$router.push({
        name: "workFlow-flowLaunch",
        params: { ...item, comp: "addFlow" },
      });
    },
    randomHexColor() {
      //随机生成十六进制颜色
      return (
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.addflow {
  padding: 20px;
  box-sizing: border-box;
  .select {
    margin: 0px 25px 10px;
    font-size: 16px;
    label {
      margin-right: 10px;
    }
  }
  .iconList {
    height: calc(100% - 50px);
    overflow: auto;
    .iconbox {
      cursor: pointer;
      width: 100px;
      height: 90px;
      overflow: hidden;
      float: left;
      margin: 10px;
      margin-left: 0px;
      margin-bottom: 20px;
      &:hover {
        opacity: 0.8;
        .iconbox:hover .box-icon {
          box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
        }
      }
      .box-icon {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        text-align: center;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: #ccc;
        i {
          text-align: center;
          font-size: 38px;
          color: #fff;
          line-height: 50px;
        }
      }
      .box-title {
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>