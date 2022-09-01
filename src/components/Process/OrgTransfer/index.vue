<template>
  <div
    class="transfer__body"
    v-loading="loading"
    :element-loading-text="$t('common.loadingText')"
    :style="{ height }"
  >
    <div class="transfer-pane">
      <div class="transfer-pane__tools">
        <el-input placeholder="输入关键词进行搜索" v-model="filterText" />
      </div>
      <div class="transfer-pane__body">
        <el-tree
          highlight-current
          :expand-on-click-node="false"
          check-on-click-node
          show-checkbox
          v-loading="loading"
          :filter-node-method="filterNode"
          :props="props"
          :data="treeData"
          ref="treeBox"
          class="CCIT-common-el-tree"
          node-key="id"
          :lazy="true"
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
            <span>{{ item.fullName }}/{{ item.enCode }}</span>
            <i class="el-icon-delete" @click="removeData(item, index)"></i>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getPositionSelector } from "@/api/permission/position";
export default {
  name: "Org-transfer",
  data() {
    return {
      selectedData: [],
      filterText: "",
      treeData: [],
      loading: false,
      props: { value: "id", label: "fullName", children: "children", isLeaf: 'leaf' },
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
  },
  watch: {
    filterText(val) {
      this.$refs.treeBox.filter(val);
    },
    selectedData(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    this.loading = true;
    getPositionSelector({
      dimensionCode: "xz",
      parentId: "-1",
    }).then((res) => {
      this.treeData = res.data;
      this.loading = false;
       if (this.value.length) {
        this.$refs.treeBox.setCheckedKeys(this.value);
        this.selectedData = this.value
      } else {
        this.$refs.treeBox.setCheckedKeys([]);
        this.selectedData = [];
      }
    })
  },
  computed: {
    selectedTextData() {
      let list = this.$store.getters.positionList.filter((o) => {
        let index = this.selectedData.findIndex((id) => {
          return id === o.id;
        });
        return index !== -1;
      });
      return list;
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      if (data.realName) {
        return (
          data.id.indexOf(value) !== -1 || data.realName.indexOf(value) !== -1
        );
      }
      if (data.fullName) {
        return (
          data.id.indexOf(value) !== -1 || data.fullName.indexOf(value) !== -1
        );
      }
    },
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
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.treeData);
      } else {
        getPositionSelector({
          dimensionCode: "xz",
          parentId: node.data.id || "-1",
        }).then((res) => {
          let data = res.data;
          data.forEach((item) => {
            this.$set(item, "leaf", !item.hasChildren);
            this.$set(item, 'disabled', item.type !== 'position')
          });
          return resolve(data);
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
