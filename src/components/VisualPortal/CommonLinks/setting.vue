<template>
  <div>
    <div>
      <el-form-item label="位置">
        <el-radio-group v-model="activeData.position">
          <el-radio-button
            v-for="item in posOptions"
            :key="item.value"
            :label="item.value"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="字体颜色">
        <el-color-picker v-model="activeData.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="字体大小">
        <el-input-number v-model="activeData.fontSize" :min="1" :max="20"></el-input-number>
      </el-form-item>
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