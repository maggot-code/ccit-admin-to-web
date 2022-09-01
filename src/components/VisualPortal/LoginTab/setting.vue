<template>
  <div>
    <template v-if="activeData.list">
      <!-- <el-form-item label="页签颜色"></el-form-item> -->
      <div v-for="(item, index) in activeData.list" :key="index">
        <el-divider></el-divider>
        <p>
          选项{{ index + 1 }}
          <span
            @click="delSelectItem(index)"
            style="cursor: pointer; color: #f56c6c"
            ><i class="el-icon-remove-outline"
          /></span>
        </p>
        <el-form-item label="页签名">
          <el-input v-model="item.fullName"></el-input>
        </el-form-item>
        <com-data-interface
          :data-interface="item.dataInterface"
          @getInterfaceData="getInterfaceData($event, index)"
        ></com-data-interface>
      </div>
    </template>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      @click="addSelectItem"
      v-if="activeData.list.length < 6"
      >添加选项</el-button
    >
  </div>
</template>
<script>
import ComDataInterface from "../RightPanel/DataInterface.vue";
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ComDataInterface,
  },
  data() {
    return {};
  },
  methods: {
    getInterfaceData(params, index) {
      this.activeData.list[index].dataInterface = params.dataInterface;
      this.activeData.list[index].data = params.data;
    },
    addSelectItem() {
      this.activeData.list.push({
        fullName: "",
        dataInterface: "",
        data: []
      });
    },
    delSelectItem(index) {
      if (this.activeData.list.length < 3) {
        this.$message({
          message: "选项最少要保留一项",
          type: "warning",
        });
        return;
      }
      this.activeData.list.splice(index, 1);
    }
  },
};
</script>
