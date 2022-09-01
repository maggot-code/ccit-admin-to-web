<template>
  <div>
    <el-form-item v-if="operator === 'admin'" label="选择栏目">
      <CCIT-TreeSelect v-model="activeData.categoryCode"
        :props="treeProps"
        :options="treeData"
        placeholder="请选择新闻栏目"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="显示轮播">
      <el-switch v-model="activeData.showCarousel"></el-switch>
    </el-form-item>
    <el-form-item label="显示推荐">
      <el-switch v-model="activeData.showRecommend"></el-switch>
    </el-form-item>
    <el-checkbox v-model="activeData.showHeader">显示表头</el-checkbox>
    <el-table
      :data="activeData.columns"
      class="CCIT-common-table"
      ref="noticeDragTable"
      :row-key="(row) => row.prop"
    >
      <el-table-column prop="selection" align="center">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.selection"
            :disabled="scope.row.prop == 'fullName'"
          ></el-checkbox>
        </template>
      </el-table-column>
<el-table-column prop="label" label="列名" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span
            title="上移"
            class="el-icon-caret-top"
            @click="moveUp(scope.$index)"
            v-if="scope.$index > 0"
          ></span>
          <span
            title="下移"
            class="el-icon-caret-bottom"
            @click="moveDown(scope.$index)"
            v-if="scope.$index < activeData.columns.length - 1"
          ></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { listTree } from "@/api/extend/column";
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  inject: {
    operator: { default: "admin" },
  },
  data() {
    return {
      treeData: [],
      treeProps: {
        value: "categoryCode",
        label: "categoryName",
        children: "children",
      },
    };
  },
  created() {
    this.getColumnTree()
  },
  methods: {
    getColumnTree() {
      listTree().then((res) => {
        this.treeData = res.data;
      });
    },
    // 上移
    moveUp(index) {
      if (index <= 0) {
        return;
      }
      let upData = this.activeData.columns[index - 1];
      this.activeData.columns.splice(index - 1, 1);
      this.activeData.columns.splice(index, 0, upData);
    },
    // 下移
    moveDown(index) {
      if (index == this.activeData.columns.length - 1) {
        return;
      }
      let downData = this.activeData.columns[index + 1];
      this.activeData.columns.splice(index + 1, 1);
      this.activeData.columns.splice(index, 0, downData);
    },
  },
};
</script>