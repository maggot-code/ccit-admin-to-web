<template>
    <div>
            <el-divider>我的邮箱</el-divider>
            <div
              v-for="(item, index) in activeData.list"
              :key="index"
              class="dataBoard-item"
            >
              <el-form-item label="名称">
                <el-input
                  v-model="item.name"
                  placeholder="请输入按钮名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-input v-model="item.icon" placeholder="请输入图标名称">
                  <el-button slot="append" @click="openIconsDialog(index)">
                    选择</el-button
                  >
                </el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-input v-model="item.type" placeholder="请输入按钮链接">
                </el-input>
              </el-form-item>
              <el-divider></el-divider>
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
   openIconsDialog(index) {
      this.$emit('open-icons-dialog', index)
    },
  },
};
</script>