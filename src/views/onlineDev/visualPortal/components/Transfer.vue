
<template>
  <el-dialog
    title="选择角色"
    :close-on-click-modal="false"
    class="CCIT-dialog CCIT-dialog_center transfer-dialog"
    lock-scroll
    append-to-body
    v-bind="$attrs"
    width="800px"
    :modal-append-to-body="false"
    v-on="$listeners"
    @open="onOpen"
  >
    <CCITTransfer
      :loading="loading"
      :treeData="treeData"
      v-model="selectedData"
      ref="CCITTransfer"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeTransfer">{{
        $t("common.cancelButton")
      }}</el-button>
      <el-button type="primary" @click="confirm">{{
        $t("common.confirmButton")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getModelData, setModelData } from "@/api/permission/authorize";
import { getRoleList } from "@/api/permission/role";
import CCITTransfer from "@/components/CCIT-transfer";
import { getAppTree } from "@/api/system/application";
export default {
  name: "transfer",
  components: { CCITTransfer },
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedData: [],
      treeData: [],
      loading: false,
      userList: [],
      params: {
        parentId: "",
        keyword: "",
        currentPage: 1,
        pageSize: 10000,
        dimensionCode: "",
        type: "SystemRole",
      },
    };
  },
  methods: {
    onOpen() {
      this.dataInit();
    },
    closeTransfer() {
      this.$emit("update:visible", false);
    },
    confirm() {
      let query = {
        itemType: "portal",
        objectType: "Role",
        objectId: this.selectedData,
      };
      setModelData(this.id, query).then((res) => {
        this.$message({
          type: "success",
          message: res.msg,
          duration: 1000,
          onClose: () => {
            this.closeTransfer();
          },
        });
      });
    },
    async dataInit() {
      this.loading = true;
      this.selectedData = [];
      this.params.dimensionCode = 'xz';
      this.$nextTick(() => {
        this.$refs.CCITTransfer && (this.$refs.CCITTransfer.filterText = "");
        // UserListAll().then((res) => {
        //   this.userList = res.data.list;
        //   getModelData(this.id, "Role").then((res) => {
        //     this.selectedData = res.data.ids;
        //     this.loading = false;
        //   });
        // });
      });
      getAppTree()
        .then((res) => {
          let treeData = res.data.list;
          if (res.data.list.length) {
            getRoleList(this.params).then((res) => {
              let list = res.data.list;
              this.treeData = list.filter(item => {
                return item.parentId === "business"
              })
              // this.treeData = this.handleTree(treeData, list);
              getModelData(this.id, "Role").then((res) => {
                this.selectedData = res.data.ids;
                this.loading = false;
              });
            });
          }
        })
        .catch((err) => {});
    },
    handleTree(treeData, list) {
      treeData.forEach(item => {
        if(item.children) {
          this.handleTree(item.children, list)
        } else {
          let arr = list.filter(obj => {
            return obj.parentId == item.id
          })
          item.children = arr
        }
      })
      return treeData
    }
  },
};
</script>
