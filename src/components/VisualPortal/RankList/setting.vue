<template>
  <div>
    <el-form-item label="展示条数" label-width="100px">
      <el-input-number
        v-model="activeData.listSize"
        :min="3"
        :max="10"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="排序字段" label-width="100px">
      <el-select v-model="activeData.sortField">
        <el-option
          v-for="(item, index) in activeData.columns"
          :key="index"
          :label="item.label"
          :value="item.prop"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="activeData.displayType === 'chart'"
      label="坐标轴字段"
      label-width="100px"
    >
      <el-select v-model="activeData.axisField">
        <el-option
          v-for="(item, index) in activeData.columns"
          :key="index"
          :label="item.label"
          :value="item.prop"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="activeData.sortField"
      label="排序方式"
      label-width="100px"
    >
      <el-radio-group v-model="activeData.sortType">
        <el-radio-button label="asc">升序</el-radio-button>
        <el-radio-button label="desc">降序</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="展现形式" label-width="100px">
      <el-radio-group v-model="activeData.displayType">
        <el-radio-button label="list">列表</el-radio-button>
        <el-radio-button label="chart">柱状图</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="数据动态刷新" label-width="100px">
      <el-radio-group v-model="activeData.dynamic">
        <el-radio-button :label="true">开</el-radio-button>
        <el-radio-button :label="false">关</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-if="activeData.dynamic"
      label="数据刷新间隔"
      label-width="100px"
    >
      <el-input-number
        v-model="activeData.interval"
        :step="1"
        :min="1"
        :max="999"
      ></el-input-number>
    </el-form-item>
    <el-form-item
      v-if="activeData.displayType === 'list'"
      label="显示头部"
      label-width="100px"
    >
      <el-checkbox v-model="activeData.showHeader"></el-checkbox>
    </el-form-item>
    <template v-if="activeData.displayType === 'list'">
      <div
        v-for="(item, index) in activeData.columns"
        :key="index"
        class="dataBoard-item"
      >
        <p>
          选项{{ index + 1 }}
          <span
            @click="delSelectItem(index)"
            style="cursor: pointer; color: #f56c6c"
            ><i class="el-icon-remove-outline"
          /></span>
        </p>
        <el-form-item label="列名">
          <el-input v-model="item.label" placeholder="请输入列名" />
        </el-form-item>
        <el-form-item label="字段">
          <el-input v-model="item.prop" placeholder="请输入字段" />
        </el-form-item>
        <el-form-item label="宽度">
          <el-input-number
            v-model="item.span"
            :min="1"
            :max="24"
          ></el-input-number>
        </el-form-item>
      </div>

      <el-button
        icon="el-icon-circle-plus-outline"
        type="text"
        @click="addSelectItem"
        v-if="activeData.columns.length < 10"
        >添加选项</el-button
      >
    </template>
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
  methods: {
    addSelectItem() {
      this.activeData.columns.push({
        label: "",
        prop: "",
        span: 8,
      });
    },
    delSelectItem(index) {
      if (this.activeData.columns.length < 3) {
        this.$message({
          message: "选项最少要保留两项",
          type: "warning",
        });
        return;
      }
      this.activeData.columns.splice(index, 1);
    },
  },
};
</script>