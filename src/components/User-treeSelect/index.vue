<template>
  <el-select
    :value="valueTitle"
    :clearable="clearable"
    :disabled="disabled"
    @clear="clearHandle"
    ref="elSelect"
    :placeholder="placeholder"
    :popper-class="`CCIT-select-tree ${themeClass}`"
    filterable
    :filter-method="filterMethodThrottle"
    class="CCIT-selectTree"
    :loading="loading"
  >
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree
        v-if="showTree"
        id="tree-option"
        ref="selectTree"
        :data="filterData"
        :props="props"
        :node-key="props.value"
        @node-click="handleNodeClick"
        :show-checkbox="multiple"
        :check-on-click-node="multiple"
        :default-expand-all="!lazy"
        :class="{ single: !multiple }"
        :expand-on-click-node="!multiple"
        :lazy="lazy"
        :load="loadNode"
        @check="check"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i :class="data.icon"></i>
          <span class="text">{{ data.fullName }}</span>
        </span>
      </el-tree>
      <p v-show="!filterData.length" class="empty-text">无数据</p>
    </el-option>
  </el-select>
</template>

<script>
import { getUserSelectorLazy, filterUserSelector } from "@/api/permission/user";
import { mapState } from "vuex";
export default {
  name: "el-tree-select",
  props: {
    // 是否禁用
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: "请选择" },
    // 初始值
    value: "",
    // 可清空选项
    clearable: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false }, // 是否多选，默认单选
  },
  computed: {
    ...mapState({
      themeClass: (state) => state.settings.themeClass,
    }),
    // 防抖
    filterMethodThrottle(){
      var time = null
      return (param)=>{
        if(time){
          clearTimeout(time)
        }
        time = setTimeout(()=>{
          // 搜索方法
            this.filterTree(param)
            clearTimeout(time)
        },500)
      }
    },
  },
  data() {
    return {
      selectedData: [],
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
      valueTitle: "",
    };
  },
  mounted() {
    this.initTreeData();
  },
  methods: {
    filterTree(filterText) {
      this.filterData = []
      this.showTree = false;
      if (filterText) {
        this.treeLoading = true;
        this.lazy = false;
        filterUserSelector({ dimensionCode: "xz", keyword: filterText })
          .then((res) => {
            this.filterData = res.data;
            this.showTree = true;
            this.treeLoading = false;
             this.initHandle();
          })
          .catch((err) => {
            this.treeLoading = false;
          });
      } else {
        this.filterData = JSON.parse(JSON.stringify(this.treeData))
        this.$nextTick(() => {
          this.lazy = true;
          this.showTree = true;
           this.initHandle();
        });
      }
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
          this.showTree = true;
            this.treeLoading = false;
          this.$nextTick(() => {
           this.initHandle()
          });
        })
        .catch((err) => {
          this.showTree = true;
          this.treeLoading = false;
        });
    },
    // 初始化值
    initHandle() {
      if (this.value) {
        if (this.multiple) {
          setTimeout(() => {
            let arr = this.value.split(","),
              titleList = [];
            this.$refs.selectTree.setCheckedKeys(arr);
            titleList = this.$refs.selectTree
              .getCheckedNodes(true)
              .map((o) => o[this.props.label]);
            this.valueTitle = titleList.join(",");
          }, 10);
        } else {
          setTimeout(() => {
            this.valueTitle = this.$refs.selectTree.getNode(this.value)
              ? this.$refs.selectTree.getNode(this.value).data[this.props.label]
              : ""; // 初始化显示
            this.$refs.selectTree.setCurrentKey(this.value); // 设置默认选中
            this.defaultExpandedKey = [this.value]; // 设置默认展开
          }, 10);
        }
      } else {
        this.valueTitle = "";
        if (this.multiple) {
          this.$refs.selectTree.setCheckedKeys([]);
        } else {
          this.$refs.selectTree.setCurrentKey(null);
        }
      }
      this.initScroll();
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let list = document.querySelectorAll(
          ".CCIT-select-tree .el-scrollbar .el-select-dropdown__wrap"
        );
        // 有多个下拉框，造成页面错位
        let index = list.length - 1;
        let scrollWrap = list[index];
        let scrollBar = document.querySelectorAll(
          ".el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style &&
          (scrollWrap.style.cssText =
            "margin: 0px; max-height: none; overflow: hidden;");
        for (let i = 0; i < scrollBar.length; i++) {
          scrollBar[i].style.width = 0;
        }
      });
    },
    // 单选切换选项
    handleNodeClick(node) {
      if (!this.multiple) {
        if (node.type && node.type != "user") return;
        this.valueTitle = node[this.props.label];
        this.$emit("input", node[this.props.value], node);
        this.$emit("getValue", node[this.props.value], node);
        this.defaultExpandedKey = [];
        this.$refs.elSelect.blur();
      }
    },
    // 多选选择
    check(node) {
      if (!this.multiple) return;
      let selectedData = [],
        titleList = [],
        selectedTextData = [];
      selectedTextData = this.$refs.selectTree.getCheckedNodes(true);
      for (let i = 0; i < selectedTextData.length; i++) {
        const e = selectedTextData[i];
        if (e.type == "user") {
          selectedData.push(e[this.props.value]);
          titleList.push(e[this.props.label]);
        }
      }
      this.valueTitle = titleList.join(",");
      this.$emit("input", selectedData.join(","), selectedTextData);
      this.$emit("getValue", selectedData.join(","), selectedTextData);
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.$emit("input", null);
      this.$emit("change", null);
      this.defaultExpandedKey = [];
      this.clearSelected();
      this.$emit("getValue", null);
      if (this.multiple) this.$refs.selectTree.setCheckedKeys([]);
    },
    // 清空选中样式
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      for (let i = 0; i < allNode.length; i++) {
        allNode[i].classList.remove("is-current");
      }
    },
    getNode(key) {
      return this.$refs.selectTree.getNode(key);
    },
  },
};
</script>

<style lang="scss" scoped>
.CCIT-selectTree {
  width: 100%;
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li::-webkit-scrollbar-track {
  border-radius: 0;
  background-color: #fff;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree.single >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree.single >>> .is-current .el-tree-node__content .custom-tree-node {
  color: #409eff;
  font-weight: 700;
}
.el-tree.single >>> .is-current .el-tree-node__children .custom-tree-node {
  color: #606266;
  font-weight: normal;
}
.el-tree.single >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.empty-text {
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
  background: #fff;
  cursor: auto;
  padding: 0;
  line-height: 24px;
}
</style>