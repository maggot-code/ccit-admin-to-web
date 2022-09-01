<template>
  <div class="CCIT-common-layout">
    <div class="CCIT-common-layout-center">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input
                v-model="query.keyword"
                placeholder="请输入关键词查询"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{ $t("common.search") }}</el-button
              >
              <el-button icon="el-icon-refresh-right" @click="reset()"
                >{{ $t("common.reset") }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="CCIT-common-layout-main CCIT-flex-main">
        <div class="CCIT-common-head">
          <div>
            <topOpts @add="addOrUpdateHandle()" addText="新建门户"></topOpts>
            <el-upload
              style="display: inline-block"
              :action="define.comUrl + '/api/visualdev/Portal/import'"
              multiple
              :show-file-list="false"
              :on-success="importSuccess"
              :headers="uploadHeaders"
            >
              <el-button
                v-has="'btn_import'"
                type="primary"
                icon="el-icon-upload2"
              >
                导入门户
              </el-button>
            </el-upload>
          </div>
          <div class="CCIT-common-head-right">
            <el-tooltip
              effect="dark"
              :content="$t('common.refresh')"
              placement="top"
            >
              <el-link
                icon="icon-ym icon-ym-Refresh CCIT-common-head-icon"
                :underline="false"
                @click="reset()"
              />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <CCIT-table
          v-loading="listLoading"
          :data="listAll"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: '' }"
          default-expand-all
        >
          <el-table-column
            prop="fullName"
            label="名称"
            show-overflow-tooltip
            width="200"
            v-if="ccit.hasP('fullName')"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.top" style="font-weight: bold"
                >{{ scope.row.fullName }}【{{ scope.row.count }}】</span
              >
              <span v-else>{{ scope.row.fullName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="enCode"
            label="编码"
            width="200"
            v-if="ccit.hasP('enCode')"
          >
            <template slot-scope="scope" v-if="!scope.row.top">{{
              scope.row.enCode
            }}</template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="70"
            align="center"
            v-if="ccit.hasP('enabledMark')"
          >
            <template slot-scope="scope" v-if="!scope.row.top">
              <el-tag
                :type="scope.row.enabledMark == 1 ? 'success' : 'danger'"
                disable-transitions
              >
                {{ scope.row.enabledMark == 1 ? "正常" : "停用" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="creatorUser"
            label="创建人"
            width="120"
            v-if="ccit.hasP('creatorUser')"
          />
          <el-table-column
            prop="creatorTime"
            label="创建时间"
            :formatter="ccit.tableDateFormat"
            width="120"
            v-if="ccit.hasP('creatorTime')"
          />
          <el-table-column
            prop="lastmodifyuser"
            label="最后修改人"
            width="120"
            v-if="ccit.hasP('lastmodifyuser')"
          />
          <el-table-column
            prop="lastmodifytime"
            label="最后修改时间"
            :formatter="ccit.tableDateFormat"
            width="120"
            v-if="ccit.hasP('lastmodifytime')"
          />
          <el-table-column
            prop="description"
            label="说明"
            v-if="ccit.hasP('description')"
            show-overflow-tooltip
          />
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts
                @edit="addOrUpdateHandle(scope.row.id)"
                @del="handleDel(scope.$index, scope.row.id)"
              >
                <el-dropdown v-has="'btn_more'">
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini"
                      >{{ $t("common.moreBtn")
                      }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="copy(scope.row.id)"
                      v-has="'btn_copy'"
                      >复制
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="preview(scope.row)"
                      v-has="'btn_preview'"
                    >
                      预览</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="distribute(scope.row.id)"
                      v-has="'btn_authorize'"
                      >权限分配</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="exportHandle(scope.row.id)"
                      v-has="'btn_export'"
                      >导出门户</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </CCIT-table>
      </div>
    </div>
    <Form
      v-if="formVisible"
      ref="Form"
      @close="closeForm"
    />
    <Preview :visible.sync="commonPreviewVisible" :portalId="portalId" />
    <Transfer ref="transfer" :visible.sync="transferShow" :id="transferId" />
  </div>
</template>

<script>
import {
  getPortalList,
  Delete,
  Copy,
  exportPortal,
  enablePortal,
} from "@/api/onlineDev/portal";
import Form from "./Form";
import Preview from "./Preview";
import Transfer from "../components/Transfer";
export default {
  name: "onlineDev-visualPortal",
  components: { Form, Preview, Transfer },
  data() {
    return {
      activeTab: "loginPortal",
      query: { keyword: "", type: 0 },
      list: [],
      transferId: "",
      transferShow: false,
      listLoading: false,
      formVisible: false,
      categoryList: [],
      listAll: [],
      uploadHeaders: { Authorization: this.$store.getters.token },
      loginPreviewVisible: false,
      commonPreviewVisible: false,
      portalId: "",
    };
  },
  created() {
    this.getDictionaryData();
  },
  methods: {
    search() {
      this.initData();
    },
    reset() {
      this.query.keyword = "";
      this.initData();
    },
    getDictionaryData() {
      this.$store.dispatch("base/getDictionaryData", { sort: 'commonPortalDesigner' }).then((res) => {
        this.categoryList = JSON.parse(JSON.stringify(res));
        this.initData();
      });
    },
    initData() {
      this.listLoading = true;
      getPortalList(this.query).then((res) => {
        this.list = res.data.list;
        this.listAll = JSON.parse(JSON.stringify(this.categoryList));
        for (let i = 0; i < this.listAll.length; i++) {
          let child = this.list.filter(
            (o) => this.listAll[i].id === o.category
          );
          let count = child.length;
          this.$set(this.listAll[i], "children", child);
          this.$set(this.listAll[i], "count", count);
          this.$set(this.listAll[i], "top", true);
        }
        this.listAll = this.listAll.filter((o) => o.children.length);
        this.listLoading = false;
      });
    },
    handleDel(index, id) {
      this.$confirm(this.$t("common.delTip"), this.$t("common.tipTitle"), {
        type: "warning",
      })
        .then(() => {
          Delete(id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    copy(id) {
      this.$confirm("您确定要复制该门户, 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          Copy(id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    preview(row) {
      if (!row.id) return;
      this.portalId = row.id;
      if (row.type === 1 || row.type === 3) {
        this.loginPreviewVisible = true;
      } else {
        this.commonPreviewVisible = true;
      }
    },
    distribute(id) {
      this.transferId = id;
      this.transferShow = true;
    },
    enablePortal(row) {
      row.enable = row.enable ? 0 : 1;
      if(!row.enabledMark) return
      if (row.enable) {
        let filter = this.list.filter((item) => item.enable);
        if (filter.length === 1) {
          this.$message.warning("登录门户必须有一个为默认登录页!");
          return;
        }
      }
      const txt = row.enable ? "取消" : "启用";
      this.$confirm(`您确定要${txt}当前门户作为默认登录页吗, 是否继续?`, "提示", {
        type: "warning",
      })
        .then(() => {
          enablePortal(row.id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                row.enable = row.enable ? 0 : 1;
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    addOrUpdateHandle(id) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.Form.init(this.categoryList, id);
      });
    },

    closeForm(isRefresh) {
      this.formVisible = false;
      if (isRefresh) {
        this.query.keyword = "";
        this.initData();
      }
    },
    exportHandle(id) {
      exportPortal(id)
        .then((res) => {
          if (!res.data || !res.data.url) return;
          window.location.href = this.define.comUrl + res.data.url;
        })
        .catch((err) => {});
    },
    importSuccess() {
      this.$message.success("导入门户成功!");
      this.initData();
    },
  },
};
</script>