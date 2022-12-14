// 规则
const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change',
  'el-color-picker': 'change',
  'CCIT-Quill': 'blur',
  "CCIT-Text": 'blur',
  "CCIT-Amount": 'change',
  "CCIT-UploadFz": 'change',
  "CCIT-UploadImg": 'change',
  "com-select": 'change',
  "dep-select": 'change',
  "pos-select": 'change',
  "user-select": 'change',
  "dic-select": 'change',
  "CCIT-Address": 'change',
}
// 动态options
const dyOptionsList = ['radio', 'checkbox', 'select', 'cascader', 'treeSelect']
// 不添加vModel
const noVModelList = ['divider', 'CCITText', 'groupTitle', 'relationFormAttr', 'relationFlowAttr']
// 不可以添加到子表组件
const noTableAllowList = ['textarea', 'CCITText', 'CCITAmount', 'divider', 'editor', 'uploadImg', 'uploadFz', 'radio', 'checkbox', 'relationForm', 'relationFormAttr', 'relationFlow', 'relationFlowAttr', 'groupTitle', 'createUser', 'createTime', 'modifyUser', 'modifyTime', 'currOrganize', 'currDept', 'currPosition', 'rate', 'slider', 'PsdInput']
// 不可以添加到列表展示
const noColumnShowList = ['PsdInput', 'colorPicker', 'rate', 'slider', 'divider', 'uploadImg', 'uploadFz', 'editor', 'CCITText', 'relationFormAttr', 'relationFlowAttr', 'groupTitle']
// 不可以添加到搜索
const noSearchList = [...noColumnShowList, 'switch', 'timeRange', 'dateRange', 'relationForm', 'relationFlow']
// 搜索时控件为input
const useInputList = ['comInput', 'textarea', 'CCITText', 'numInput', 'CCITAmount', 'billRule', 'createUser', 'modifyUser', 'currOrganize', 'currDept', 'currPosition', 'calculate']
// 搜索时控件为时间选择器
const useTimeList = ['createTime', 'modifyTime']
// 搜索时控件为下拉选择器
const useSelectList = ['radio', 'checkbox', 'select']
// 在线开发-功能设计/流程设计独有组件
const webPeculiarList = [{
    __config__: {
      ccitKey: 'relationForm',
      label: '关联表单',
      labelWidth: null,
      showLabel: true,
      tag: 'relationForm',
      tagIcon: 'icon-ym icon-ym-generator-menu',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    placeholder: '请选择',
    flowId: '',
    relationField: '',
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      ccitKey: 'relationFormAttr',
      label: '关联表单属性',
      labelWidth: null,
      showLabel: true,
      tag: 'relationFormAttr',
      tagIcon: 'icon-ym icon-ym-generator-nature',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    showField: '',
    relationField: ''
  },
  {
    __config__: {
      ccitKey: 'calculate',
      label: '计算公式',
      labelWidth: null,
      showLabel: true,
      required: false,
      tag: 'calculate',
      tagIcon: 'icon-ym icon-ym-generator-count',
      defaultValue: null,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      regList: []
    },
    expression: [],
    precision: 0,
  }
]
// 在线开发-流程设计独有组件
const flowPeculiarList = [{
    __config__: {
      ccitKey: 'relationFlow',
      label: '关联流程表单',
      labelWidth: null,
      showLabel: true,
      tag: 'relationFlow',
      tagIcon: 'icon-ym icon-ym-generator-flow',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false,
      regList: [],
      trigger: 'change'
    },
    placeholder: '请选择',
    modelId: '',
    relationField: '',
    clearable: true,
    filterable: false,
    disabled: false
  },
  {
    __config__: {
      ccitKey: 'relationFlowAttr',
      label: '关联流程属性',
      labelWidth: null,
      showLabel: true,
      tag: 'relationFlowAttr',
      tagIcon: 'icon-ym icon-ym-generator-nature',
      defaultValue: '',
      required: false,
      layout: 'colFormItem',
      span: 24,
      dragDisabled: false
    },
    showField: '',
    relationField: ''
  }
]
export { ruleTrigger, dyOptionsList, noVModelList, noTableAllowList, noColumnShowList, noSearchList, webPeculiarList, flowPeculiarList, useInputList, useTimeList, useSelectList }