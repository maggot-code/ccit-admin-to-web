<template>
  <div>
    <div
      v-for="(item, index) in activeData.list"
      :key="index"
      class="dataBoard-item"
    >
      <el-divider></el-divider>
      <el-form-item label="名称">
        <el-input v-model="item.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="item.icon" placeholder="请输入图标名称">
          <el-button slot="append" @click="openIconsDialog(index)">
            选择</el-button
          >
        </el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="item.urlAddress" placeholder="请输入跳转链接" />
      </el-form-item>
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
  mounted() {
    if (!this.activeData.dataInterface) {
      return;
    }
    getInterfaceData(this.activeData.dataInterface)
      .then((res) => {
        this.loading = false;
        res.data.forEach((item, i) => {
          this.activeData.list[i].num = item.num
        })
      })
      .catch((err) => {
        this.loading = false;
      });
  },
  methods: {
    openIconsDialog(index) {
      this.$emit("open-icons-dialog", index);
    },
  }
};
</script>