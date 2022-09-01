<template>
  <div>
    <el-form-item label="排序">
      <el-radio-group v-model="activeData.reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="时间格式">
      <el-select v-model="activeData.format">
        <el-option
          v-for="(item, index) in dateFormats"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态字段">
      <el-select v-model="activeData.statusField">
        <el-option
          v-for="(item, index) in fieldList"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-divider>未开始节点</el-divider>
    <el-form-item label="条件">
      <el-row>
        <el-col :span="12"
          ><el-select v-model="activeData.node.noStart.condition">
            <el-option label="小于" :value="-1"></el-option>
            <el-option label="等于" :value="0"></el-option>
            <el-option label="大于" :value="1"></el-option> </el-select
        ></el-col>
        <el-col :span="12">
          <el-input v-model="activeData.node.noStart.value"></el-input
        ></el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="颜色">
      <el-color-picker
        v-model="activeData.node.noStart.color"
      ></el-color-picker>
    </el-form-item>
    <el-form-item label="图标">
      <el-input
        v-model="activeData.node.noStart.icon"
        placeholder="请输入图标名称"
      >
        <el-button slot="append" @click="openIconsDialog('noStart')">
          选择</el-button
        >
      </el-input>
    </el-form-item>
    <el-divider>进行中节点</el-divider>
     <el-form-item label="条件">
      <el-row>
        <el-col :span="12"
          ><el-select v-model="activeData.node.progress.condition">
            <el-option label="小于" :value="-1"></el-option>
            <el-option label="等于" :value="0"></el-option>
            <el-option label="大于" :value="1"></el-option> </el-select
        ></el-col>
        <el-col :span="12">
          <el-input v-model="activeData.node.progress.value"></el-input
        ></el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="颜色">
      <el-color-picker
        v-model="activeData.node.progress.color"
      ></el-color-picker>
    </el-form-item>
    <el-form-item label="图标">
      <el-input
        v-model="activeData.node.progress.icon"
        placeholder="请输入图标名称"
      >
        <el-button slot="append" @click="openIconsDialog('progress')">
          选择</el-button
        >
      </el-input>
    </el-form-item>
    <el-divider>已完成节点</el-divider>
     <el-form-item label="条件">
      <el-row>
        <el-col :span="12"
          ><el-select v-model="activeData.node.finish.condition">
            <el-option label="小于" :value="-1"></el-option>
            <el-option label="等于" :value="0"></el-option>
            <el-option label="大于" :value="1"></el-option> </el-select
        ></el-col>
        <el-col :span="12">
          <el-input v-model="activeData.node.finish.value"></el-input
        ></el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="颜色">
      <el-color-picker v-model="activeData.node.finish.color"></el-color-picker>
    </el-form-item>
    <el-form-item label="图标">
      <el-input
        v-model="activeData.node.finish.icon"
        placeholder="请输入图标名称"
      >
        <el-button slot="append" @click="openIconsDialog('finish')">
          选择</el-button
        >
      </el-input>
    </el-form-item>
    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      @click="addItem"
      v-if="activeData.list.length < 10"
      >添加节点</el-button
    >
    <el-collapse
      value="0"
      class="collapse"
      v-for="(item, index) in activeData.list"
      :key="index"
    >
      <el-collapse-item
        class="collapse-item"
        :title="`节点${index + 1}`"
        name="0"
      >
        <el-form-item label="时间">
          <el-date-picker
            v-model="item.timestamp"
            type="datetime"
            :value-format="activeData.format"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="item.content" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <!-- <el-form-item label="大小">
          <el-radio-group v-model="item.size">
            <el-radio-button label="normal">默认</el-radio-button>
            <el-radio-button label="large">大</el-radio-button>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="颜色">
          <el-color-picker v-model="item.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="item.icon" placeholder="请输入图标名称">
            <el-button slot="append" @click="openIconsDialog(index)">
              选择</el-button
            >
          </el-input>
        </el-form-item> -->
      </el-collapse-item>
      <div class="collapse-btn" @click="delItem(index)">
        <i class="el-icon-remove-outline" />
      </div>
    </el-collapse>
    <iconBox
      :visible.sync="iconsVisible"
      :current="current"
      @choiceIcon="setIcon"
    />
  </div>
</template>
<script>
import { previewDataInterface } from "@/api/systemData/dataInterface";
import iconBox from "@/components/CCIT-iconBox";
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
   components: {
    iconBox,
  },
  data() {
    return {
      dateFormats: ["yyyy-MM-dd", "yyyy-MM-dd HH:mm", "yyyy-MM-dd HH:mm:ss"],
      iconsVisible: false,
      current: '',

    };
  },
  watch: {
    "activeData.format"(newVal, oldVal) {
      this.activeData.list.forEach((item) => {
        if (newVal === "yyyy-MM-dd") {
          item.timestamp = item.timestamp.substr(0, 10);
        } else if (newVal === "yyyy-MM-dd HH:mm") {
          if (oldVal === "yyyy-MM-dd") {
            item.timestamp += " 00:00";
          } else {
            item.timestamp = item.timestamp.substr(0, 16);
          }
        } else {
          if (oldVal === "yyyy-MM-dd") {
            item.timestamp += " 00:00:00";
          } else {
            item.timestamp += ":00";
          }
        }
      });
    },
  },
  computed: {
    fieldList() {
      let list = [];
      if (this.activeData.list.length) {
        let obj = this.activeData.list[0];
        for (let key in obj) {
          list.push(key);
        }
      }
      return list;
    },
  },
  mounted() {
    if (
      this.activeData.tabs[0].dataInterface &&
      this.activeData.list.length === 0
    ) {
      previewDataInterface(this.activeData.tabs[0].dataInterface).then(
        (res) => {
          if (this.activeData.listSize >= res.data.list) {
            this.activeData.list = res.data;
          } else {
            this.activeData.list = res.data.slice(0, this.activeData.listSize);
          }
          return;
        }
      );
    }
  },
  methods: {
    addItem() {
      this.activeData.list.push({
        timestamp: "",
        content: "",
        size: "",
        icon: "",
      });
    },
    delItem(index) {
      this.activeData.list.splice(index, 1);
    },
    openIconsDialog(type) {
      this.iconsVisible = true;
      this.current = type
    },
    setIcon(val) {
      this.activeData.node[this.current].icon = val
    },
  },
};
</script>
<style lang="scss" scoped>
.collapse {
  display: flex;
  justify-content: space-between;
  &-item {
    width: 85%;
  }
  &-btn {
    width: 10%;
    cursor: pointer;
    color: #f56c6c;
    height: 45px;
    line-height: 45px;
  }
}
</style>