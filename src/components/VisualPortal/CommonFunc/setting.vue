<template>
  <div>
    <el-divider>常用功能</el-divider>
    <div
      v-for="(item, index) in activeData.list"
      :key="index"
      class="select-item"
    >
      <CCIT-TreeSelect
        class="tree"
        :options="menuList"
        v-model="item.id"
        placeholder="请选择菜单"
        lastLevel
        lastLevelKey="type"
        :lastLevelValue="2"
        clearable
        @getValue="getSelectValue(arguments, index)"
      >
      </CCIT-TreeSelect>
      <div class="close-btn select-line-icon" @click="delSelectItem(index)">
        <i class="el-icon-remove-outline" />
      </div>
    </div>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      @click="addSelectItem"
      v-if="activeData.list.length < 10"
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
  data() {
    return {
      menuList: []
    }
  },
  mounted() {
    // let list = this.$store.state.user.menuList;
    this.menuList = this.$store.state.user.menuList;
  },
  methods: {
    addSelectItem() {
      this.activeData.list.push({
        fullName: "",
        id: "",
        urlAddress: "",
        icon: "",
        iconBackgroundColor: "",
      });
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
    getSelectValue(data, i) {
      if (!data[0]) {
        this.activeData.list[i] = {
          fullName: "",
          id: "",
          urlAddress: "",
          icon: "",
          iconBackgroundColor: "",
        };
      } else {
        let iconBackgroundColor = "";
        if (data[1].propertyJson) {
          let propertyJson = JSON.parse(data[1].propertyJson);
          iconBackgroundColor = propertyJson.iconBackgroundColor || "";
        }
        this.activeData.list[i].fullName = data[1].fullName;
        this.activeData.list[i].id = data[1].id;
        this.activeData.list[i].urlAddress = data[1].urlAddress;
        this.activeData.list[i].icon = data[1].icon;
        this.activeData.list[i].iconBackgroundColor =
          data[1].iconBackgroundColor;
      }
    },
  },
  // handleTree(data) {
  //   debugger
  //   data.forEach(item => {
  //     if(item.type > 2) 
  //     if(item.children) {
  //     handleTree[item.children]
  //   }
  //   })
  // }
};
</script>
<style lang="scss" scoped>
.select-item {
  display: flex;
  margin-bottom: 10px;
  .tree {
    width: 95%;
    margin-right: 5px;
  }
}
</style>