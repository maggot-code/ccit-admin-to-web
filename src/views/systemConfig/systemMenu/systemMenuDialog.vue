<!--
 * @FilePath: \ccit-admin-to-web\src\views\systemConfig\systemMenu\systemMenuDialog.vue
 * @Author: zhangxin
 * @Date: 2022-08-30 17:49:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-08 18:12:23
 * @Description: 
-->
<template>
  <div class="systemMenuDialog" v-loading="loading">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="上级" prop="parentId">
        <CCIT-TreeSelect
          v-model="form.parentId"
          :props="treeProps"
          :options="treeData"
          placeholder="请选择上级菜单"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="名称" prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="enCode">
        <el-input v-model="form.enCode" placeholder="请输入编码"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-col :span="22">
          <el-input
            v-model="form.icon"
            placeholder="请选择图标"
            readonly
            :suffix-icon="form.icon"
          >
            <el-button slot="append" @click="openIconsDialog()">
              选择</el-button
            >
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-color-picker
            v-model="form.propertyJson.iconBackgroundColor"
          ></el-color-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择类型"
          clearable
          :style="{ width: '100%' }"
          :multiple="false"
        >
          <el-option
            v-for="(item, index) in typeMapping"
            :key="index"
            :label="item.description"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="isShowAddress" label="地址" prop="urlAddress">
        <el-input v-model="form.urlAddress" placeholder="请填写地址"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.sortCode"></el-input-number>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.enabledMark"
          inactive-value="00"
          active-value="01"
        />
      </el-form-item>
      <el-form-item label="说明">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          v-model="form.description"
          maxlength="150"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <div class="systemMenuDialog-btn">
        <el-button @click="$emit('closeDialog')">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-form>
    <iconBox
      :visible.sync="iconsVisible"
      :current="form.icon"
      @choiceIcon="setIcon"
    ></iconBox>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import iconBox from "@/components/CCIT-iconBox";
import {
  getSystemMenuInfoById,
  createSystemMenuInfo,
  putSystemMenuInfoById,
  selectSystemMenu,
} from "../api/system-menu.api";
import { getSelectionList } from "../api/system-menu.api";

// 设置需要填写地址的白名单类型
const useAddressType = ["2"];

export default {
  name: "systemMenuDialog",
  //混入
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: { iconBox },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    //这里存放数据
    return {
      loading: true,
      iconsVisible: false,
      form: {
        fullName: null,
        enCode: null,
        icon: null,
        type: null,
        sortCode: null,
        enabledMark: null,
        description: null,
        parentId: null,
        propertyJson: {
          iconBackgroundColor: null,
        },
        urlAddress: null,
      },
      typeMapping: [],
      rules: {
        parentId: [
          {
            required: true,
            message: "请选择上级菜单",
            trigger: "change",
          },
        ],
        fullName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        enCode: [
          {
            required: true,
            message: "请输入编码",
            trigger: "blur",
          },
        ],
        icon: [
          {
            required: true,
            message: "请选择图标",
            trigger: "change",
          },
        ],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change",
          },
        ],
        urlAddress: [
          {
            required: true,
            message: "请填写地址",
            trigger: "blur",
          },
        ],
      },
      treeData: [],
      treeProps: {
        value: "id",
        label: "fullName",
        children: "children",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    isInfoId() {
      return this.info.id ? true : false;
    },
    isShowAddress() {
      // return this.form.type == 2;
      return useAddressType.includes(`${this.form.type}`);
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getTypeSelectList() {
      getSelectionList("FTTYPE").then((res) => {
        this.typeMapping = res.data;
      });
    },
    getSelectMenuList() {
      selectSystemMenu().then((res) => {
        this.treeData = res.data.list;
      });
    },
    executionQuery() {
      this.resetForm();
      if (!this.isInfoId) {
        this.loading = false;
        return;
      }
      getSystemMenuInfoById(this.info.id).then((res) => {
        this.form = res.data;
        this.form.propertyJson = JSON.parse(this.form.propertyJson);
        this.loading = false;
      });
    },
    resetForm() {
      this.form = {
        fullName: null,
        enCode: null,
        icon: null,
        type: null,
        sortCode: null,
        enabledMark: null,
        description: null,
        parentId: null,
        propertyJson: {
          iconBackgroundColor: null,
        },
      };
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return false;
        if (!this.isInfoId) this.addSysTemMenuInfo();
        if (this.isInfoId) this.putSysTemMenuInfo();
      });
    },
    addSysTemMenuInfo() {
      this.form.propertyJson = JSON.stringify(this.form.propertyJson);
      createSystemMenuInfo(this.form).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {
            this.$emit("closeDialog", true);
          },
        });
      });
    },
    putSysTemMenuInfo() {
      this.form.propertyJson = JSON.stringify(this.form.propertyJson);
      putSystemMenuInfoById(this.form).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {
            this.$emit("closeDialog", true);
          },
        });
      });
    },
    setIcon(icon) {
      this.form.icon = icon;
    },
    openIconsDialog() {
      this.iconsVisible = true;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTypeSelectList();
    this.getSelectMenuList();
    this.executionQuery();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.systemMenuDialog {
  width: 100%;
  height: 55vh;
  &-btn {
    text-align: center;
  }
}
</style>
