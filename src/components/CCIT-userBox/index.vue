<template>
  <el-dialog
    title="选择审批人"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="CCIT-dialog CCIT-dialog_center CCIT-dialog-tree"
    lock-scroll
    append-to-body
    width="450px"
  >
    <el-input
      placeholder="输入姓名或者编号进行过滤"
      v-model="filterText"
      clearable
      @change="filterTree"
    >
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
        @click="filterTree"
      ></i>
    </el-input>
    <div class="tree-box">
      <el-tree
        v-if="showTree"
        :data="filterData"
        :props="defaultProps"
        highlight-current
        ref="treeBox"
        check-on-click-node
        @node-click="handleNodeClick"
        :lazy="lazy"
        :default-expand-all="!lazy"
        :load="loadNode"
        class="CCIT-common-el-tree"
        node-key="id"
        v-loading="loading"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i :class="data.icon"></i>
          <span class="text">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{
        $t("common.cancelButton")
      }}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{
        $t("common.confirmButton")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUserSelectorLazy, filterUserSelector } from "@/api/permission/user";
export default {
  name: "UserBox",
  data() {
    return {
      visible: false,
      id: "",
      defaultProps: {
        value: "id",
        label: "fullName",
        children: "children",
        isLeaf: "leaf",
      },
      treeData: [],
      filterData: [],
      loading: false,
      filterText: "",
      lazy: true,
      showTree: false,
    };
  },
  methods: {
    init(id) {
      this.visible = true;
      this.loading = true;
      this.filterText = "";
      getUserSelectorLazy({
        dimensionCode: "xz",
        parentId: "-1",
      })
        .then((res) => {
          let data = res.data;
          data.forEach((item) => {
            this.$set(item, "leaf", !item.hasChildren);
            this.$set(item, "disabled", item.type !== "user");
          });
          this.treeData = data;
          this.filterData = data;
          this.lazy = true;
          this.$nextTick(() => {
            this.showTree = true;
            this.loading = false;
          });
        })
        .catch((err) => {
          this.showTree = true;
          this.loading = false;
        });
    },
    loadNode(node, resolve) {
      getUserSelectorLazy({
        dimensionCode: "xz",
        parentId: node.data.id || "-1",
      }).then((res) => {
        let data = res.data;
        data.forEach((item) => {
          this.$set(item, "leaf", !item.hasChildren);
          this.$set(item, "disabled", item.type !== "user");
        });
        return resolve(data);
      });
    },
    filterTree() {
      this.showTree = false;
      if (this.filterText) {
        this.loading = true;
        this.lazy = false;
        filterUserSelector({ dimensionCode: "xz", keyword: this.filterText })
          .then((res) => {
            this.filterData = res.data;
            this.$nextTick(() => {
              this.showTree = true;
              this.loading = false;
            });
          })
          .catch((err) => {
            this.loading = false;
          });
      } else {
        this.filterData = this.treeData;
        this.$nextTick(() => {
          this.lazy = true;
          this.showTree = true;
        });
      }
    },
    handleNodeClick(data) {
      if (data.hasChildren) return;
      this.id = data.id;
    },
    dataFormSubmit() {
      if (!this.id) {
        this.$message({
          message: "请选择审批人员",
          type: "error",
          duration: 1000,
        });
        return;
      }
      this.visible = false;
      this.$emit("submit", this.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.tree-box {
  height: 300px;
  overflow: auto;
}
</style>