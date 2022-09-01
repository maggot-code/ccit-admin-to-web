<template>
  <el-tabs v-model="activeName" :style="bgStyle" class="tabs" :stretch="false">
    <el-tab-pane
      :name="item.dataInterface"
      v-for="(item, index) in list"
      :key="index"
      :label="item.fullName"
    >
      <template v-if="item.data.length">
        <el-link
          class="link"
          :style="{ color: fontColor }"
          v-for="(notice, index) in item.data"
          :key="index"
          @click="open(notice.url)"
          >[{{ notice.date }}] {{ notice.title }}</el-link
        >
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getInterfaceData } from "@/api/home";
export default {
  mixins: [mixin],
  data() {
    return {
      activeName: "",
      fontColor: "",
    };
  },
  created() {
    this.init();
  },
  watch: {
    list: {
      handler(val) {
        if (val && val.length > 0) {
          this.activeName = val[0].dataInterface;
        }
      },
      deep: true,
    },
  },
  methods: {
    open(url) {
      window.open(url, "_blank");
    },
    init() {
      if (this.list && this.list.length > 0) {
        this.list.forEach((item, index) => {
          this.getData(item.dataInterface, index);
        });
      }
    },
    getData(dataInterface, index) {
      if (!dataInterface) {
        return;
      }
      getInterfaceData(dataInterface).then((res) => {
        if (res.data instanceof Array) {
          this.list[index].data = res.data;
        } else {
          this.$message.warning("数据格式不符!");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.tabs {
  padding: 20px;
  border-radius: 5px;
  >>> .el-tabs__content {
    height: calc(100% - 50px);
    .el-tab-pane {
      height: 100%;
      overflow: auto;
    }
  }
  .link {
    line-height: 25px;
  }
}
</style>
