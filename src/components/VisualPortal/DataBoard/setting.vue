<template>
  <div>
    <el-divider></el-divider>
    <div
      v-for="(item, index) in activeData.list"
      :key="index"
      class="dataBoard-item"
    >
      <el-divider v-if="index > 0"></el-divider>
      <p>
        选项{{ index + 1 }}
        <span
          @click="delSelectItem(index)"
          style="cursor: pointer; color: #f56c6c"
          ><i class="el-icon-remove-outline"
        /></span>
      </p>
      <el-form-item label="标题">
        <el-input v-model="item.fullName" placeholder="请输入标题" />
      </el-form-item>
      <!--<el-form-item label="数值">
                <el-input v-model="item.num" placeholder="请输入数值" />
              </el-form-item>-->
      <el-form-item label="图标">
        <el-input v-model="item.icon" placeholder="请输入图标名称">
          <el-button slot="append" @click="openIconsDialog(index)">
            选择</el-button
          >
        </el-input>
      </el-form-item>
    </div>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      @click="addDataSelectItem"
      v-if="activeData.list.length < 4"
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
    openIconsDialog(index) {
      this.$emit("open-icons-dialog", index);
    },
    addDataSelectItem() {
      this.activeData.list.push({ fullName: "", num: 0, icon: "" });
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