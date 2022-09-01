<template>
  <div>
    <!-- <el-divider>选项</el-divider>
    <el-form-item label="模式">
      <el-radio-group v-model="activeData.mode">
        <el-radio label="standard">标准</el-radio>
        <el-radio label="simple">简约</el-radio>
      </el-radio-group>
    </el-form-item> -->
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
};
</script>