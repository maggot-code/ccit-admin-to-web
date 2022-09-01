 <template
            >
  <div>
    <el-divider>公告通知</el-divider>
    <el-checkbox v-model="activeData.showHeader">显示表头</el-checkbox><br />
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
  methods: {
    // 上移
    moveUp(index) {
      if (index <= 0) {
        return;
      }
      let upData = this.activeData.list[index - 1];
      this.activeData.list.splice(index - 1, 1);
      this.activeData.list.splice(index, 0, upData);
    },
    // 下移
    moveDown(index) {
      if (index == this.activeData.list.length - 1) {
        return;
      }
      let downData = this.activeData.list[index + 1];
      this.activeData.list.splice(index + 1, 1);
      this.activeData.list.splice(index, 0, downData);
    },
  },
};
</script>