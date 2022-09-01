<template>
  <div>
    <div v-for="(item, index) in activeData.list" :key="index">
      <el-form-item label="文本">
        <el-input placeholder="请输入底部文本" v-model="item.text"> </el-input>
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker
          v-model="item.color"
          size="medium"
          @change="changeColor(index, item.color)"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="字体大小">
        <el-input v-model="item.fontSize">
          <template slot="append">px</template></el-input
        >
      </el-form-item>
    </div>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      @click="addSelectItem"
      v-if="activeData.list.length < 10"
      >添加选项</el-button
    >
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
  methods: {
    addSelectItem() {
      this.activeData.list.push({
        text: "",
        color: "#999",
        fontSize: 12
      });
    },
    delSelectItem(index) {
      if (this.activeData.list.length < 2) {
        this.$message({
          message: "选项最少要保留一项",
          type: "warning",
        });
        return;
      }
      this.activeData.list.splice(index, 1);
    },
    //设置分组颜色
    changeColor(index, c) {
      this.activeData.list[index].color = c
    },
  },
};
</script>