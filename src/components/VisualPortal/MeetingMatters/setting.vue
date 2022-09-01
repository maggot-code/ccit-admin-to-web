 <template>
  <div>
    <el-form-item label="展示外部待办" label-width="120px">
      <el-switch
        v-model="activeData.showOuter"
      ></el-switch>
    </el-form-item>
    <el-divider>列表</el-divider>
    <!-- <el-checkbox v-model="activeData.showHeader">显示表头</el-checkbox><br /> -->
    <el-table
      :data="activeData.list"
      class="CCIT-common-table"
      ref="noticeDragTable"
      :row-key="(row) => row.prop"
    >
      <el-table-column prop="selection" align="center">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.selection"
            :disabled="scope.row.prop == 'fullName'"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="列名" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <span
            title="上移"
            class="el-icon-caret-top"
            @click="moveUp(scope.$index)"
            v-if="scope.$index > 0"
          ></span>
          <span
            title="下移"
            class="el-icon-caret-bottom"
            @click="moveDown(scope.$index)"
            v-if="scope.$index < activeData.list.length - 1"
          ></span>
        </template>
      </el-table-column>
    </el-table>
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