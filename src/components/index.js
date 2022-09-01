import CCITTreeSelect from '@/components/CCIT-treeSelect'
import UserTreeSelect from '@/components/User-treeSelect'
import topOperation from '@/components/CCIT-topOperation/index'
import tableOperation from '@/components/CCIT-tableOperation'
import Pagination from '@/components/Pagination'
import CCITTable from '@/components/CCIT-table'
import UserBox from '@/components/CCIT-userBox'
import UploadFile from '@/components/Upload/UploadFile'
import UploadFileSingle from '@/components/Upload/UploadFileSingle'
import SingleImg from '@/components/Upload/SingleImg'
import Screenfull from '@/components/Screenfull'
import ColumnSettings from '@/components/ColumnSettings'
import CCITQuill from '@/components/CCITEditor/quill'
// 代码生成器专供
import CCITText from '@/components/Generator/components/CCITText'
import CCITUploadFz from '@/components/Generator/components/Upload/UploadFz' // 代码生成器专用上传附件
import CCITUploadImg from '@/components/Generator/components/Upload/UploadImg' // 代码生成器专用上传图片
import ComSelect from '@/components/Generator/components/ComSelect'
import DepSelect from '@/components/Generator/components/DepSelect'
import PosSelect from '@/components/Generator/components/PosSelect'
import UserSelect from '@/components/Generator/components/UserSelect'
import DicSelect from '@/components/Generator/components/DicSelect'
import BillRule from '@/components/Generator/components/BillRule'
import CCITInputTable from '@/components/Generator/components/InputTable'
import CCITAddress from '@/components/Generator/components/Address'
import GroupTitle from '@/components/Generator/components/GroupTitle'
import RelationForm from '@/components/Generator/components/RelationForm'
import RelationFormAttr from '@/components/Generator/components/RelationFormAttr'
import RelationFlow from '@/components/Generator/components/RelationFlow'
import RelationFlowAttr from '@/components/Generator/components/RelationFlowAttr'
import Calculate from '@/components/Generator/components/Calculate'

export default {
  install(Vue, options) {
    Vue.component('CCITTreeSelect', CCITTreeSelect)
    Vue.component('UserTreeSelect', UserTreeSelect)
    Vue.component('topOpts', topOperation)
    Vue.component('tableOpts', tableOperation)
    Vue.component('Pagination', Pagination)
    Vue.component('CCITTable', CCITTable)
    Vue.component('UploadFile', UploadFile)
    Vue.component('UploadFileSingle', UploadFileSingle)
    Vue.component('SingleImg', SingleImg)
    Vue.component('UserBox', UserBox)
    Vue.component('CCITText', CCITText)
    Vue.component('CCITUploadFz', CCITUploadFz)
    Vue.component('CCITUploadImg', CCITUploadImg)
    Vue.component('ComSelect', ComSelect)
    Vue.component('DepSelect', DepSelect)
    Vue.component('PosSelect', PosSelect)
    Vue.component('UserSelect', UserSelect)
    Vue.component('DicSelect', DicSelect)
    Vue.component('BillRule', BillRule)
    Vue.component('CCITInputTable', CCITInputTable)
    Vue.component('CCITAddress', CCITAddress)
    Vue.component('GroupTitle', GroupTitle)
    Vue.component('RelationForm', RelationForm)
    Vue.component('RelationFormAttr', RelationFormAttr)
    Vue.component('RelationFlow', RelationFlow)
    Vue.component('RelationFlowAttr', RelationFlowAttr)
    Vue.component('Calculate', Calculate)
    Vue.component('CCITQuill', CCITQuill)
    Vue.component('Screenfull', Screenfull)
    Vue.component('ColumnSettings', ColumnSettings)
  }
}