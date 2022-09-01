 <template>
  <div>
    <div
      v-for="(item, index) in activeData.innerTabs"
      :key="index"
      class="dataBoard-item"
    >
      <el-divider></el-divider>
      <el-form-item label="标签名">
        <el-input v-model="item.label" placeholder="请输入标签名" />
      </el-form-item>
      <el-form-item label="显示">
        <el-radio-group v-model="item.show">
        <el-radio :label="true">显示</el-radio>
        <el-radio :label="false">隐藏</el-radio>
      </el-radio-group>
      </el-form-item>
    </div>
    <!-- <el-form-item label="展示外部待办" label-width="120px">
      <el-switch
        v-model="activeData.showOuter"
      ></el-switch>
    </el-form-item> -->
    <el-divider>列表</el-divider>
    <el-row>
      <el-col :span="12"><el-checkbox v-model="activeData.showHeader">显示表头</el-checkbox></el-col>
      <el-col :span="12"><el-checkbox v-model="activeData.showPagination">显示分页</el-checkbox></el-col>
    </el-row>
    <el-form-item label="展示条数">
      <el-input-number :min="1" :max="20" v-model="activeData.pageSize"></el-input-number>
    </el-form-item>
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