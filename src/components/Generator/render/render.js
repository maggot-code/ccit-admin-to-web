import { deepClone } from '@/utils'
const componentChild = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */
const slotsFiles = require.context('./slots', false, /\.js$/);
const keys = slotsFiles.keys() || []
keys.forEach(key => {
  const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = slotsFiles(key).default
  componentChild[tag] = value
})

function vModel(dataObject, defaultValue) {
  dataObject.props.value = defaultValue

  dataObject.on.input = val => {
    this.$emit('input', val)
  }
}

function mountSlotFiles(h, confClone, children) {
  const childObjs = componentChild[confClone.__config__.tag]
  if (childObjs) {
    Object.keys(childObjs).forEach(key => {
      const childFunc = childObjs[key]
      if (confClone.__slot__ && confClone.__slot__[key]) {
        children.push(childFunc(h, confClone, key))
      }
    })
  }
}

function emitEvents(confClone) {
  ['on', 'nativeOn'].forEach(attr => {
    const eventKeyList = Object.keys(confClone[attr] || {})
    eventKeyList.forEach(key => {
      const val = confClone[attr][key]
      if (typeof val === 'string') {
        confClone[attr][key] = event => this.$emit(val, event)
      }
    })
  })
}

/**
 * 创建事件
 * @param _this  当前的VNode
 * @param dataObject  Vue渲染所需要的数据对象
 * @param event_contexts  js事件对象
 */
function createEvents(_this,dataObject,event_contexts){
  var no_fun = {};
  var nativeOn_fun = {};
  event_contexts.forEach(eventcontext => {
    var n_event = function (event){

      // 获取form的VNode
      var form = _this.$parent.elForm;

      // 获取指定字段名的VNode
      form.getField = function (filedId) {
        var rs = null;
        this.$data.fields.forEach(field => {
          if(field.$children[0].$el.htmlFor == filedId){
            rs = field.$children[1].$children[0];
          }
        })
        return rs;
      }

      // 更新指定字段的值
      form.setFieldValue = function (fieldId,value) {
        var field = this.getField(fieldId);
        field.$emit('input', value);
      }

      // 执行注入的脚本
      eval(eventcontext.funContext);
    }

    // 设置数据对象
    nativeOn_fun[eventcontext.funName] = n_event;
    no_fun[eventcontext.funName] = n_event;

  });
  // 添加事件
  dataObject['on'] = no_fun;
  dataObject['nativeOn'] = nativeOn_fun;
}

function buildDataObject(confClone, dataObject, formData) {
  var _this = this;
  Object.keys(confClone).forEach(key => {
    const val = confClone[key];
    if (key === '__vModel__') {
      vModel.call(_this, dataObject, confClone.__config__.defaultValue)
    }else if(key == "__events__" && _this.$route.name.indexOf('generator') == -1){
      createEvents.call(_this,_this,dataObject,val);
    }else if (dataObject[key] !== undefined) {
      if (dataObject[key] === null || dataObject[key] instanceof RegExp || ['boolean', 'string', 'number', 'function'].includes(typeof dataObject[key])) {
        dataObject[key] = val
      } else if (Array.isArray(dataObject[key])) {
        dataObject[key] = [...dataObject[key], ...val]
      } else {
        dataObject[key] = { ...dataObject[key], ...val }
      }
    } else {
      dataObject.attrs[key] = val
    }
  })
  if (confClone.__config__.ccitKey === 'CCITText') {
    vModel.call(this, dataObject, confClone.__config__.defaultValue)
  }
  if (confClone.__config__.ccitKey === 'calculate' || confClone.__config__.ccitKey === 'table') {
    dataObject.attrs['formData'] = formData
  }
  if (confClone.__config__.ccitKey === 'relationForm' || confClone.__config__.ccitKey === 'relationFlow') {
    dataObject.attrs['field'] = confClone.__vModel__
  }
  if(confClone.__config__.ccitKey === 'date') {
    if(confClone.__config__.defaultType === 'current') {
      let date = new Date().getTime()
      vModel.call(this, dataObject, date)
    }
  }

  // 清理属性
  clearAttrs(dataObject)
}

function clearAttrs(dataObject) {
  delete dataObject.attrs.__config__
  delete dataObject.attrs.__slot__
  delete dataObject.attrs.__methods__
}

function makeDataObject() {
  return {
    class: {},
    attrs: {},
    props: {},
    domProps: {},
    nativeOn: {},
    on: {},
    style: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key: null,
    ref: null,
    refInFor: true
  }
}

export default {
  props: {
    conf: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      default: () => {}
    },
  },
  render(h) {
    const dataObject = makeDataObject()
    const confClone = deepClone(this.conf)
    const children = this.$slots.default || []

    // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    mountSlotFiles.call(this, h, confClone, children)

    // 将字符串类型的事件，发送为消息
    emitEvents.call(this, confClone)

    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
    buildDataObject.call(this, confClone, dataObject, this.formData)

    return h(this.conf.__config__.tag, dataObject, children)
  }
}
