<template>
  <div>
    <el-divider>图片</el-divider>
    <el-form-item></el-form-item>
    <el-input placeholder="请输入图片地址"></el-input>
    <div class="demo-image">
  <div class="block" v-for="fit in fits" :key="fit">
    <span class="demonstration">{{ fit }}</span>
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :fit="fit"></el-image>
  </div>
</div>
  </div>
</template>
<script>
export default {
};
</script>