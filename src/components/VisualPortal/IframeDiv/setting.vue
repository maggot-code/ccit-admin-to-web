<template>
  <div>
    <el-form-item label="链接">
      <el-input placeholder="请输入链接地址" v-model="activeData.iframeUrl">
        <el-button slot="append" @click="previewIframe">预览</el-button>
      </el-input>
    </el-form-item>
    <el-form-item label="参数">
      <el-row type="flex">
        <div style="flex:1;margin-right:10px">
          <i class="el-icon-circle-plus-outline" @click="addParam"/>
          <el-tooltip class="item" effect="dark" content="值为${token}与${account}分别对应token信息与用户账号" placement="top-start">
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>
        </div>
        <div>
          <el-switch style="font-size: 12px" v-model="activeData.showTokenType" active-text="保留token类型" inactive-text=""></el-switch>
        </div>
      </el-row>
    </el-form-item>
    <el-table :data="tableData">
      <el-table-column prop="key" label="键" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.key"
            v-if="scope.row.editable"
          ></el-input>
          <span v-else>{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="值" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.value"
            v-if="scope.row.editable"
          ></el-input>
          <span v-else>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.editable"
            size="mini"
            type="text"
            @click="handleAdd(scope.$index)"
            >确定</el-button
          >
          <el-button
            v-else
            size="mini"
            type="text"
            @click="handleEdit(scope.$index)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            class="CCIT-table-delBtn"
            @click="handleDel(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  watch: {
    tableData(val) {
      let param = {};
      if (val) {
        val.forEach((item) => {
          if (item.key && item.value) {
            param[item.key] = item.value;
          }
        });
      }
      this.activeData.param = param;
    },
    'activeData.showTokenType'(val){
      this.activeData.showTokenType = val;
    },
  },
  mounted() {
    let _param = this.activeData.param
    for(let key in _param) {
      this.tableData.push({
        key: key,
        value: _param[key],
        editable: false
      })
    }
  },
  methods: {
    //预览iframe
    previewIframe() {
      let pattern = /^((https|http)?:\/\/)[^\s]+/;
      if (!pattern.test(this.activeData.iframeUrl)) {
        this.$message.warning("预览失败，请填写正确的链接地址");
      }
    },
    addParam() {
      this.tableData.push({
        key: "",
        value: "",
        editable: true,
      });
    },
    handleAdd(index) {
      let obj = this.tableData[index];
      if (!obj.key || !obj.value) {
        this.$message.warning("键或值不能为空");
        return;
      }
      obj.editable = false;
      this.$set(this.tableData, index, obj);
    },
    handleEdit(index) {
      this.tableData[index].editable = true;
    },
    handleDel(index) {
      this.tableData.splice(index, 1);
    },
  },
};
</script>
