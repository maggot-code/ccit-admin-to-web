<template>
  <div>
    <!-- <com-data-interface
      label="表头数据"
      :dataInterface="activeData.columnsInterface"
      @getInterfaceData="getInterfaceData($event, 'columns')"
    ></com-data-interface> -->
    <el-form-item label="显示表头">
      <el-radio-group v-model="activeData.showHeader">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="显示边框">
      <el-radio-group v-model="activeData.showBorder">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="带斑马纹">
      <el-radio-group v-model="activeData.showStripe">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- <el-checkbox v-model="activeData.showHeader">显示表头</el-checkbox> -->
    <el-table
      :data="activeData.columns"
      class="CCIT-common-table"
      ref="noticeDragTable"
      :row-key="(row) => row.prop"
    >
      <el-table-column prop="selection" align="center" width="50">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.selection"
            :disabled="scope.row.prop == 'fullName'"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="列名" width="80" />
      <!-- <el-table-column prop="width" label="宽度" width="80">
        <template slot-scope="scope">
          <el-input v-model="scope.row.width"></el-input>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span
            title="上移"
            class="el-icon-caret-top"
            @click="moveUp(scope.$index)"
            :style="{ visibility: scope.$index > 0 ? 'visible' : 'hidden' }"
          ></span>
          <span
            title="下移"
            class="el-icon-caret-bottom"
            @click="moveDown(scope.$index)"
            :style="{
              visibility:
                scope.$index < activeData.columns.length - 1
                  ? 'visible'
                  : 'hidden',
            }"
          ></span>
          <el-dropdown style="margin-left: 5px">
            <el-button type="text" size="mini" style="color: #606266">
              {{ $t("common.moreBtn")
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="settingWidth(scope.row, scope.$index)"
              >
                宽度
              </el-dropdown-item>
              <el-dropdown-item @click.native="settingLink(scope.row, scope.$index)">
                超链接
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- <com-data-interface
      label="表格数据"
      :dataInterface="activeData.dataInterface"
      @getInterfaceData="getInterfaceData($event, 'data')"
    ></com-data-interface> -->
    <el-dialog
      title="设置宽度"
      :visible.sync="widthVisible"
      append-to-body
      width="25%"
    >
      <el-form label-width="100px">
        <el-form-item label="类型">
          <el-radio-group v-model="widthType">
            <el-radio label="fixed">固定宽度</el-radio>
            <el-radio label="auto">自适应</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="widthType === 'fixed'" label="宽度">
          <el-input v-model="width" type="number">
            <template slot="append">px</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="widthVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitWidth">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="设置超链接"
      :visible.sync="linkVisible"
      append-to-body
      width="25%"
    >
      <el-form
        ref="linkForm"
        label-width="60px"
        :model="linkForm"
        :rules="linkRules"
      >
        <el-form-item label="超链接" prop="status">
          <el-switch
            v-model="linkForm.status"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <template v-if="linkForm.status === '1'">
          <el-form-item
            label="地址"
            prop="url"
            :required="linkForm.status === '1'"
          >
            <el-input
              v-model="linkForm.url"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
          <el-button
            icon="el-icon-circle-plus-outline"
            type="text"
            @click="addParam"
            >添加参数</el-button
          >
          <el-table v-if="linkForm.params.length" :data="linkForm.params">
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="key" label="key" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.key" placeholder="请输入key">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="field" label="value" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.field" placeholder="请选择行内值">
                  <el-option
                    v-for="(column, index1) in activeData.columns"
                    :key="index1"
                    :label="column.label"
                    :value="column.prop"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="delParam(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-form-item
            v-for="(item, index) in linkParams"
            :key="index"
            :label="`参数${index}`"
          >
            <el-button type="danger" @click="delParam(index)">删除</el-button>
          </el-form-item> -->
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="linkVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitLink">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ComDataInterface from "@/components/VisualPortal/RightPanel/DataInterface";
import { previewDataInterface } from "@/api/systemData/dataInterface";
export default {
  components: { ComDataInterface },
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    var validURL = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入地址"));
        return;
      }
      let reg =
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
      let test = reg.test(value);
      if (test) {
        callback();
      } else {
        callback(new Error("请输入正确的url地址"));
      }
    };
    return {
      widthVisible: false,
      widthType: "fixed",
      width: 0,
      linkVisible: false,
      linkForm: {
        status: "1",
        url: "",
        params: [],
      },

      currentRow: {},
      linkRules: {
        url: [{ validator: validURL, trigger: "blur" }],
      },
    };
  },
  mounted() {
    if (this.activeData.columns.length) {
      return;
    }
    if (this.activeData.tabs[0].dataInterface) {
      previewDataInterface(this.activeData.tabs[0].dataInterface)
        .then((res) => {
          res.data.columns.forEach((item) => {
            item.selection = true;
          });
          this.activeData.columns = res.data.columns;
        })
        .catch((err) => {});
    }
  },
  methods: {
    getInterfaceData(e, type) {
      this.activeData[type + "Interface"] = e.dataInterface;
      this.activeData[type] = e.data;
    },
    // 上移
    moveUp(index) {
      if (index <= 0) {
        return;
      }
      let upData = this.activeData.columns[index - 1];
      this.activeData.columns.splice(index - 1, 1);
      this.activeData.columns.splice(index, 0, upData);
    },
    // 下移
    moveDown(index) {
      if (index == this.activeData.columns.length - 1) {
        return;
      }
      let downData = this.activeData.columns[index + 1];
      this.activeData.columns.splice(index + 1, 1);
      this.activeData.columns.splice(index, 0, downData);
    },
    settingWidth(row, index) {
      this.widthVisible = true;
      this.widthType = row.width === "auto" ? "auto" : "fixed";
      this.width = row.width;
      this.currentRow = row;
      this.currentIndex = index;
    },
    submitWidth() {
      if (this.widthType === "auto") {
        this.width = "auto";
      }
      this.activeData.columns[this.currentIndex].width = this.width;
      this.widthVisible = false;
    },
    settingLink(row, index) {
      this.linkVisible = true;
      this.currentRow = row;
      this.currentIndex = index;
      if (row.link) {
        this.linkForm = row.link;
      } else {
        this.linkForm = {
          status: "1",
          url: "",
          params: [],
        };
      }
    },
    addParam() {
      this.linkForm.params.push({
        key: "",
        field: "",
      });
    },
    delParam(index) {
      this.linkForm.params.splice(index, 1);
    },
    submitLink() {
      this.$refs.linkForm.validate((valid) => {
        if (valid) {
          this.activeData.columns[this.currentIndex].link = this.linkForm;
          this.linkVisible = false;
        }
      });
    },
  },
};
</script>