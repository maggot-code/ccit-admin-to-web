<template>
  <div>
    <el-form-item label="数据来源">
      <el-radio-group v-model="activeData.fieldOrigin">
        <el-radio-button label="userInfo">用户</el-radio-button>
        <el-radio-button label="dataInterface">接口</el-radio-button>
        <el-radio-button label="custom">手动填充</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="activeData.fieldOrigin === 'userInfo'" label="字段">
      <el-select v-model="activeData.userKey">
        <el-option
          v-for="(item, index) in userOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <com-data-interface
      v-if="activeData.fieldOrigin === 'dataInterface'"
      :data-interface="activeData.dataInterface"
      @getInterfaceData="checkInterface"
    ></com-data-interface>
    <el-form-item
      v-if="
        activeData.fieldOrigin === 'dataInterface' && activeData.dataInterface
      "
      label="字段"
    >
      <el-select v-model="activeData.interfaceKey">
        <el-option
          v-for="(item, index) in interfaceOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="activeData.fieldOrigin === 'custom'" label="字段">
      <el-input
        v-model="activeData.fillText"
        placeholder="请输入填充文本"
        type="textarea"
        :rows="3"
      ></el-input>
    </el-form-item>
    <el-form-item label="字号">
      <el-input-number v-model="activeData.fontSize"></el-input-number>
    </el-form-item>
    <el-form-item label="字体">
      <el-select v-model="activeData.fontFamily">
        <el-option
          v-for="(item, index) in fontFamilys"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文字方向">
      <el-radio-group v-model="activeData.direction">
        <el-radio-button label="horizontal">水平</el-radio-button>
        <el-radio-button label="vertical">竖排</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="activeData.color"></el-color-picker>
    </el-form-item>
  </div>
</template>
<script>
import { getInterfaceData } from "@/api/home";
import ComDataInterface from "../RightPanel/DataInterface.vue";
export default {
  components: {
    ComDataInterface,
  },
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
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
      interfaceOptions: [],
      key: "",
      fontFamilys: [
        { label: "宋体", value: "SimSun" },
        { label: "黑体", value: "SimHei" },
        { label: "微软雅黑", value: "Microsoft YaHei" },
        { label: "PingFang SC", value: "PingFang SC" },
        { label: "微软正黑体", value: "Microsoft JhengHei" },
        { label: "楷体", value: "KaiTi" },
        { label: "新宋体", value: "NSimSun" },
        { label: "仿宋", value: "FangSong" },
      ],
    };
  },
  watch: {
    "activeData.dataInterface"(val) {
      if (!val) {
        return;
      }
      this.getInterfaceOptions();
    },
    "activeData.fieldOrigin": {
      handler(val) {
        if (val === "userInfo") {
          this.activeData.userKey = this.userOptions[0].value;
          this.activeData.interfaceKey = "";
        } else if (val === "dataInterface") {
          this.activeData.userKey = "";
          if (this.activeData.dataInterface) {
            this.getInterfaceOptions();
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    //初始化展示字段
    checkInterface(params) {
      let type = Object.prototype.toString.call(params.data);
      if (type !== "[object Object]") {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      this.activeData.dataInterface = params.dataInterface;
    },
    getInterfaceOptions() {
      getInterfaceData(this.activeData.dataInterface).then((res) => {
        let obj = res.data;
        let options = [];
        for (let key in obj) {
          options.push({
            label: key,
            value: key,
          });
        }
        this.interfaceKey = "";
        this.interfaceOptions = JSON.parse(JSON.stringify(options));
      });
    },
  },
};
</script>