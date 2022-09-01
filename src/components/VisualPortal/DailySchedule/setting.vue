<template>
  <div>
    <el-form-item label="排序">
      <el-radio-group v-model="activeData.reverse">
        <el-radio-button :label="false">正序</el-radio-button>
        <el-radio-button :label="true">倒序</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="日历展开">
      <el-radio-group v-model="activeData.isCollapes">
        <el-radio-button :label="true">是</el-radio-button>
        <el-radio-button :label="false">否</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="事项样式">
      <el-radio-group v-model="activeData.scheduleType">
        <el-radio-button label="timeline">时间轴</el-radio-button>
        <el-radio-button label="card">卡片</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="添加按钮">
      <el-radio-group v-model="activeData.showAdd">
        <el-radio-button :label="true">显示</el-radio-button>
        <el-radio-button :label="false">隐藏</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="天气">
      <el-radio-group v-model="activeData.showWeather">
        <el-radio-button :label="true">显示</el-radio-button>
        <el-radio-button :label="false">隐藏</el-radio-button>
      </el-radio-group>
    </el-form-item>
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
};
</script>