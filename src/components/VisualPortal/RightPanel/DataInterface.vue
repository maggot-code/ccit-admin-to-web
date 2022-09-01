<template>
  <el-form-item :label="label" request="true">
    <el-select
      :value="dataInterface"
      placeholder="请选择数据接口"
      clearable
      filterable
      remote
      @change="getInterfaceData"
    >
      <el-option
        v-for="item in dataInterfaceList"
        :key="item.id"
        :label="item.fullName"
        :value="item.id"
        :disabled="item.enabledMark === 0"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script>
import {
  getDataInterfaceList,
  previewDataInterface,
} from "@/api/systemData/dataInterface";
export default {
  props: {
    dataInterface: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '数据源'
    }
  },
  data() {
    return {
      dataInterfaceList: [],
    };
  },
  created() {
    this.getInterfaceList();
  },
  methods: {
    // 数据接口列表
    getInterfaceList(keyword) {
      let params = {
        keyword: keyword ? keyword : "",
        currentPage: 1,
        pageSize: 50,
        categoryId: "30be5ef4e3074dd89385ad6b4540c63d",
        sort: "desc",
      };
      getDataInterfaceList(params).then((res) => {
        this.dataInterfaceList = res.data.list;
      });
    },

    getInterfaceData(e) {
      if (!e) {
        this.$emit("getInterfaceData", {dataInterface: '', data: []});
        return;
      }
      previewDataInterface(e).then((res) => {
        this.$emit("getInterfaceData", {dataInterface: e, data: res.data});
        return;
      });
    },
  },
};
</script>
