<template>
  <div
    class="transfer__body"
    v-loading="loading"
    :element-loading-text="$t('common.loadingText')"
    :style="{ height }"
  >
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <el-input
          placeholder="输入关键词进行搜索"
          v-model="filterText"
          @change="filterTree"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="filterTree"
          ></i>
        </el-input>
      </div>
      <div class="transfer-pane__body" v-loading="treeLoading">
        <el-tree
          v-if="showTree"
          highlight-current
          :expand-on-click-node="false"
          :default-expand-all="!lazy"
          check-on-click-node
          show-checkbox
          v-loading="loading"
          :props="props"
          :data="filterData"
          ref="treeBox"
          class="CCIT-common-el-tree"
          node-key="id"
          :lazy="lazy"
          :load="loadNode"
          @check="onCheck"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <i :class="data.icon"></i>
            <span class="text">{{ data.fullName }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <span>已选</span>
        <div>
          <el-button @click="removeAll" type="text">清空列表</el-button>
        </div>
      </div>
      <div class="transfer-pane__body shadow right-pane">
        <template>
          <div
            v-for="(item, index) in selectedTextData"
            :key="index"
            class="selected-item"
          >
            <span>{{ item.realName }}/{{ item.account }}</span>
            <i class="el-icon-delete" @click="removeData(item, index)"></i>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserSelectorLazy, filterUserSelector } from "@/api/permission/user";
export default {
  name: "User-transfer",
  data() {
    return {
      selectedData: [],
      filterText: "",
      treeData: [],
      filterData: [],
      loading: false,
      props: {
        value: "id",
        label: "fullName",
        children: "children",
        isLeaf: "leaf",
      },
      lazy: true,
      showTree: false,
      treeLoading: false,
    };
  },
  props: {
    height: {
      type: String,
      default: "380px",
    },
    value: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.value.length) {
          this.$refs.treeBox.setCheckedKeys(this.value);
          this.selectedData = this.value;
        } else {
          this.$refs.treeBox.setCheckedKeys([]);
          this.selectedData = [];
        }
      }
    },
    selectedData(val) {
      this.$emit('change', val)
    }
  },
  computed: {
    selectedTextData() {
      let list = []
      this.selectedData.forEach(id => {
        let obj = this.$store.getters.userList.find(o => {
          return id === o.id
        })
        if(obj) {
          list.push(obj)
        }
      })
      return list
    },
  },
  mounted() {
    this.initTreeData();
  },
  methods: {
    onCheck() {
      let list = this.$refs.treeBox.getCheckedNodes(true);
      list.forEach((o) => {
        if (
          this.selectedData.findIndex((id) => {
            return id === o.id;
          }) === -1
        ) {
          this.selectedData.push(o.id);
        }
      });
    },
    removeData(item, index) {
      this.$refs.treeBox.setChecked(item.id, false);
      this.selectedData.splice(index, 1);
    },
    removeAll() {
      this.$refs.treeBox.setCheckedKeys([]);
      this.selectedData = [];
    },
    initTreeData() {
      this.treeLoading = true;
      this.treeData = [];
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
            this.treeLoading = false;
          });
        })
        .catch((err) => {
          this.showTree = true;
          this.treeLoading = false;
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
        this.treeLoading = true;
        this.lazy = false;
        filterUserSelector({ dimensionCode: "xz", keyword: this.filterText })
          .then((res) => {
            this.filterData = res.data;
            this.showTree = true;
            this.treeLoading = false;
          })
          .catch((err) => {
            this.treeLoading = false;
          });
      } else {
        this.filterData = this.treeData;
        this.$nextTick(() => {
          this.lazy = true;
          this.showTree = true;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.transfer__body {
  line-height: 32px;
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  .transfer-pane {
    width: 360px;
  }
  .transfer-pane__tools {
    margin-bottom: 8px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .transfer-pane__body {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    overflow: auto;
    overflow-x: hidden;
    font-size: 14px;
    border: 1px solid #dcdfe6;
  }

  .right-pane {
    box-sizing: border-box;
    overflow: auto;
    border: 1px solid #dcdfe6;

    .selected-item {
      padding: 0px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background-color: #f5f7fa;
      }

      span {
        max-width: 90%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      i:hover {
        color: #f56c6c;
        cursor: pointer;
      }
    }
  }
}
</style>
