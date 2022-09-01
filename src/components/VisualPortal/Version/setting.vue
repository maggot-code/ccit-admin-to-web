<template>
<div></div>
  <!-- <el-form-item label="版本号">
    <el-input
      v-model="activeData.version"
      placeholder="请输入版本号"
    ></el-input>
  </el-form-item> -->
</template>
<script>
import { getSysInfoVal } from "@/api/system/sysConfig";
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    if (!this.activeData.version) {
      getSysInfoVal("sysVersion").then((res) => {
        this.activeData.version = res.data.value;
      });
    }
  },
};
</script>