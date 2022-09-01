<template>
  <div>
    <el-divider>文本</el-divider>
    <el-form-item label="位置">
      <el-radio-group v-model="activeData.textPosition">
        <el-radio-button
          v-for="item in posOptions"
          :key="item.value"
          :label="item.value"
          >{{ item.name }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
    <el-collapse
        value="0"
        class="collapse"
        v-for="(item, index) in activeData.list"
        :key="index"
      >
        <el-collapse-item
          class="collapse-item"
          :title="`文本${index + 1}`"
          name="0"
        >
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
        </el-collapse-item>
        <div class="collapse-btn" @click="delSelectItem(index)">
          <i class="el-icon-remove-outline" />
        </div>
      </el-collapse>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      @click="addSelectItem"
      v-if="activeData.list.length < 10"
      >添加文本</el-button
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
  data() {
    return {
      posOptions: [
        { name: "左", value: "flex-start" },
        { name: "中", value: "center" },
        { name: "右", value: "flex-end" },
      ],
    };
  },
  methods: {
    addSelectItem() {
      this.activeData.list.push({
        text: "",
        color: "#999",
        fontSize: 12,
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
      this.activeData.list[index].color = c;
    }
  },
};
</script>
<style lang="scss" scoped>
.collapse {
  display: flex;
  justify-content: space-between;
  &-item {
    width: 85%;
  }
  &-btn {
    width: 10%;
    cursor: pointer;
    color: #f56c6c;
    height: 45px;
    line-height: 45px;
  }
}
</style>