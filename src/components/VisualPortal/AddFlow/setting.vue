<template>
  <div>
    <el-divider>新建流程</el-divider>
    <div>
      <el-collapse
        value="0"
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
          <el-form-item label="链接">
            <el-input v-model="item.url" placeholder="请输入系统链接">
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
        @click="addLinksItem"
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
    addLinksItem() {
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
</style>