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
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="content" :style="bodyStyle" v-loading="loading">
      <template v-if="fieldOrigin === 'userInfo' && userObj">
        <template v-if="userObj.type === 'text'">
          <div :style="msgStyle">{{ msg }}</div>
        </template>
        <template v-else-if="userObj.type === 'table'">
          <el-table :data="msg" style="width: 100%">
            <el-table-column
              v-for="(item, index) in userObj.column"
              :key="index"
              :prop="item.prop"
              :label="item.label"
            >
            </el-table-column>
          </el-table>
        </template>
      </template>
      <template v-else>
        <div :style="msgStyle">{{ msg }}</div>
      </template>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getInterfaceData } from "@/api/home";
import { mapGetters } from "vuex";
export default {
  mixins: [mixin],
  data() {
    return {
      fontSize: "",
      color: "",
      fontFamily: "",
      fieldOrigin: "",
      userOptions: [
        { label: "用户名", value: "userName", type: "text" },
        { label: "账号", value: "userAccount", type: "text" },
        {
          label: "用户角色",
          value: "positionIds",
          type: "table",
          column: [
            { prop: "id", label: "角色ID" },
            { prop: "name", label: "角色名称" },
          ],
        },
        { label: "所属组织", value: "organizeName", type: "text" },
        { label: "所属部门", value: "departmentName", type: "text" },
      ],
      userKey: "",
      userObj: {},
      interfaceKey: "",
      interfaceObj: {},
      msg: "",
      fillText: "",
      direction: "",
      dataInterface: ''
    };
  },
  watch: {
    dataInterface(val) {
      if (val) {
        getInterfaceData(val).then((res) => {
          this.interfaceObj = res.data;
        });
      }
    },
    fieldOrigin(val) {
      if (val === "userInfo") {
        if (this.userKey) {
          this.msg = this.userInfo[this.userKey];
          return;
        }
      } else if (val === "dataInterface") {
        if (this.interfaceKey) {
          this.msg = this.interfaceObj[this.interfaceKey];
          return;
        }
      } else {
        this.msg = this.fillText;
        return;
      }
      this.msg = "";
    },
    userKey(val) {
      let obj = this.userOptions.find((item) => {
        return item.value === val;
      });
      this.userObj = obj;
      this.msg = this.userInfo[this.userKey];
    },

    interfaceKey(val) {
      if (val) {
        this.msg = this.interfaceObj[this.interfaceKey];
      }
    },
    fillText(val) {
      this.msg = val;
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
    msgStyle() {
      let obj = {
        fontSize: this.fontSize + "px",
        color: this.color,
        fontFamily: this.fontFamily,
      };
      if (this.direction === "vertical") {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE =
          (userAgent.indexOf("compatible") > -1 &&
            userAgent.indexOf("MSIE") > -1) ||
          userAgent.indexOf("Edge") > -1; //判断是否IE浏览器
        obj.writingMode = isIE ? "tb-lr" : "vertical-lr";
      }
      return obj;
    },
  },
  // mounted() {
  //   this.getData();
  // },
  methods: {
    tabClick() {
      this.dataInterface = this.tabs[this.activeTab].dataInterface
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
