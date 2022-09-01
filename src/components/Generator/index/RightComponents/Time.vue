<template>
  <el-row>
    <!-- <el-form-item label="字段名">
      <el-input v-model="activeData.__vModel__" placeholder="请输入字段名" readonly />
    </el-form-item> -->
    <el-form-item label="标题名">
      <el-input v-model="activeData.__config__.label" placeholder="请输入标题名" />
    </el-form-item>
    <el-form-item label="占位提示">
      <el-input v-model="activeData.placeholder" placeholder="请输入占位提示" />
    </el-form-item>
    <template v-if="!activeData.__config__.isSubTable">
      <el-form-item label="控件栅格">
        <el-slider v-model="activeData.__config__.span" :max="24" :min="6" show-stops :step="2"
          show-tooltip />
      </el-form-item>
      <el-form-item label="标题宽度">
        <el-input v-model.number="activeData.__config__.labelWidth" type="number"
          placeholder="请输入标题宽度" />
      </el-form-item>
    </template>
    <el-form-item label="控件宽度" v-if="activeData.__config__.isSubTable">
      <el-input-number v-model="activeData.__config__.columnWidth" placeholder="控件宽度" :min="0"
        :precision="0" /> px
    </el-form-item>
    <!-- <el-form-item label="组件宽度">
      <el-input v-model="activeData.style.width" placeholder="请输入组件宽度" clearable />
    </el-form-item> -->
    <el-form-item label="默认值">
      <el-time-picker v-model="activeData.__config__.defaultValue"
        :picker-options="activeData['picker-options']" placeholder="选择默认值" clearable
        :value-format="activeData['value-format']" :format="activeData.format">
      </el-time-picker>
    </el-form-item>
    <el-form-item label="时间段">
      <el-input v-model="activeData['picker-options'].selectableRange" placeholder="请输入时间段" />
    </el-form-item>
    <el-form-item label="时间格式">
      <el-input :value="activeData.format" placeholder="请输入时间格式" @input="setTimeValue($event)" />
    </el-form-item>
    <!-- <el-form-item label="显示标签">
      <el-switch v-model="activeData.__config__.showLabel" />
    </el-form-item> -->
    <el-form-item label="能否清空">
      <el-switch v-model="activeData.clearable" />
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="activeData.readonly" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="activeData.disabled" />
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="activeData.__config__.required" />
    </el-form-item>

    <template v-if="this.$route.name.indexOf('generator') == -1">
      <el-divider>事件</el-divider>
      <span style="line-height: 30px;">注意：设计子表中无效</span>
      <div v-for="(item, index) in activeData.__events__" :key="index" class="reg-item">
          <span class="close-btn" @click="activeData.__events__.splice(index, 1)">
            <i class="el-icon-close"/>
          </span>
        <el-form-item label="事件名称">
          <el-input v-model="item.funName" :disabled="true"/>
        </el-form-item>
        <el-form-item label="内容" style="margin-bottom:0">
          <el-button type="text" @click="openCodeDialog(item.funContext,item.funName,index)">编辑</el-button>
        </el-form-item>
      </div>
      <div class="mt-10">
        <el-dropdown>
          <el-button type="primary">添加常用事件<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="addEvent(item)" v-for="(item,i) in eventList" :key="i">
              {{item.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <el-dialog :title="funName" :visible.sync="dialogVisible" class="CCIT-dialog CCIT-dialog_center" lock-scroll
                 width="66%"
                 :before-close="handleClose" append-to-body>
        <div class="codeArea">
          <CCITCodeEditor v-model="codeData" :options="options" ref="codeEditor"/>
        </div>
        <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogVisible = false">{{$t('common.cancelButton')}}</el-button>
                 <el-button type="primary" @click="setEventCode()"
                            :loading="btnLoading">{{$t('common.confirmButton')}}</el-button>
            </span>
      </el-dialog>
    </template>
  </el-row>
</template>
<script>
import comMinix from './minix';
import CCITCodeEditor from '@/components/CCITEditor/monaco'
export default {
  props: ['activeData'],
  mixins: [comMinix],
  components: { CCITCodeEditor },
  data() {
    return {
      codeData: "",
      btnLoading: false,
      dialogVisible: false,
      funNameFlag: "",
      funName: "",
      options: {
        language: 'javascript',
        fontSize: 14,
        theme: "vs-dark"
      },
      eventList: [
        {name: "点击事件(click)", funName: "click", funContext: ""},
        {name: "值改变事件(change)", funName: "change", funContext: ""}
      ]
    }
  },
  created() { },
  methods: {
    setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData.__config__, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', valueFormat)
      this.$set(this.activeData, 'format', val)
    },
    addEvent(row) {
      this.activeData.__events__.push({
        funName: row.funName,
        funContext: row.funContext
      })
    },
    openCodeDialog(data, flag, index) {
      this.dialogVisible = true;
      this.funNameFlag = flag;
      this.arrIndex = index;
      this.funName = flag + "事件";
      this.$nextTick(function () {
        this.$refs.codeEditor.changeEditor({
          value: data,
          options: this.options
        })
      })
    },
    handleClose(done) {
      this.setEventData();
      this.$confirm('确认关闭？').then(_ => {
        done();
      }).catch(_ => {
      });
    },
    setEventData() {
      this.$set(this.activeData.__events__, this.arrIndex, {
        funName: this.funNameFlag,
        funContext: this.codeData
      });
    },
    setEventCode() {
      this.setEventData();
      this.dialogVisible = false;
    }
  }
}
</script>
