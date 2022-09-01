<template>
  <div>
    <el-divider>选项</el-divider>
    <div>
      <el-collapse
        class="collapse"
        v-for="(item, index) in activeData.list"
        :key="index"
      >
        <el-collapse-item
          class="collapse-item"
          :title="`选项${index + 1}`"
          name="0"
        >
          <el-form-item label="名称">
            <el-input
              v-model="item.name"
              placeholder="请输入系统名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-input v-model="item.imgUrl" placeholder="请输入图片地址">
            </el-input>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="item.sysUrl" placeholder="请输入系统链接">
            </el-input>
          </el-form-item>
        </el-collapse-item>
        <div class="collapse-btn" @click="delSelectItem(index)">
          <i class="el-icon-remove-outline" />
        </div>
      </el-collapse>
      <el-button
        icon="el-icon-circle-plus-outline"
        type="text"
        @click="addSingleLoginItem"
        v-if="activeData.list.length < 10"
        >添加选项</el-button
      >
    </div>
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
    addSingleLoginItem() {
      this.activeData.list.push({ name: "", imgUrl: "", sysUrl: "" });
    },
    delSelectItem(index) {
      if (this.activeData.list.length < 3) {
        this.$message({
          message: "选项最少要保留两项",
          type: "warning",
        });
        return;
      }
      this.activeData.list.splice(index, 1);
    },
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