import { mapState } from "vuex";
import { colorRgba } from "@/utils"
import '../../../static/echart/dark'
import '../../../static/echart/infographic'
import '../../../static/echart/chalk'
import '../../../static/echart/purple-passion'
import '../../../static/echart/macarons'
import '../../../static/echart/shine'
import '../../../static/echart/vintage'
export const mixin = {
  data() {
    return {
      activeTab: 0,
      tabs: [],
      dataInterface: '',
      title: '',
      icon: '',
      radius: 0,
      showTitle: true,
      showBlock: true,
      showIcon: true,
      titleColor: '',
      list: [],
      bgColor: '',
      titleBorder: '',
      titleCss: '',
      opacity: 1,
      css: '',
      cardCss: '',
      loading: false,
      blockColor: '',
      blockWidth: 0,
      showMore: false,
      moreType: 'sys',
      moreUrl: '',
      moreParams: {},
      paramsData: [],
      showFresh: false,
      shadow: 'never',
      usePortalStyle: false,
      color: ''
    }
  },
  props: {
    item: { type: Object, default: () => ({}) },
    portalStyle: { type: Object, default: () => ({}) }
  },
  computed: {
    ...mapState({
      slideClass: (state) => state.settings.slideClass
    }),
    headerSlot() {
      return this.showTitle || this.showBlock || this.showIcon ? 'header' : ''
    },
    cardStyle() {
      let obj = {};
      if (this.cardCss) {
        obj = JSON.parse(this.cardCss)
      }
      if (this.bgColor) {
        obj.backgroundColor = colorRgba(this.bgColor, this.opacity)
      } else {
        if (this.slideClass === 'lightWhite') {
          obj.bgColor = `rgba(255,255,255, ${this.opacity})`
        } else {
          obj.bgColor = `rgba(52,60,99, ${this.opacity})`
        }
      }
      obj.borderRadius = this.radius + 'px'
      return obj
    },
    titleStyle() {
      let obj = {};
      if (this.titleCss) {
        obj = JSON.parse(this.titleCss)
      }
      obj.borderBottom = this.titleBorder
      return obj
    },
    bodyStyle() {
      let obj = {}
      if (this.css) {
        obj = JSON.parse(this.css)
      }
      obj.height = this.showTitle ? 'calc(100% - 55px)' : '100%'
      return obj
    },
    bgStyle() {
      // let color = ''
      // if (this.bgColor === 'white') {
      //   color = '#fff'
      // } else {
      //   color = themeColor[this.bgColor + 'RgbaTheme']
      // }
      return {
        backgroundColor: this.bgColor,
        height: '100%'
      }
    },
    blockStyle() {
      return {
        backgroundColor: this.blockColor,
        width: this.blockWidth + 'px'
      }
    }
  },
  watch: {
    item: {
      handler(val) {
        for (let key in val) {
          this[key] = val[key]
        };
        this.handleStyle();
      }, deep: true
    },
    portalStyle(val) {
      this.handleStyle();
    },
    usePortalStyle(val) {
      this.handleStyle();
    }
  },
  created() {
    for (let key in this.item) {
      this[key] = this.item[key]
    }
    if (this.tabs && this.tabs.length) {
      this.dataInterface = this.tabs[this.activeTab].dataInterface || ''
    }
  },
  methods: {
    tabClick() {
      this.dataInterface = this.tabs[this.activeTab].dataInterface
    },
    handleEdit() {
      this.$emit('on-edit', this.item)
    },
    jumpToMore() {
      if (this.moreUrl === '') {
        this.$message.warning('功能待开放')
        return
      }
      if (this.moreType === 'sys') {
        this.$router.push({
          path: this.moreUrl,
          query: this.moreParams,
        });
      } else {
        let url = this.moreUrl;
        if (this.moreParams) {
          url += '?'
          for (let key in this.moreParams) {
            url += `${key}=${this.moreParams[key]}&`
          }
          url = url.substr(0, url.length - 1);
        }
        window.open(url, "_blank");
      }

    },
    /**
     * 设置组件样式，usePortalStyle为true时启用门户统一样式，否则使用comp自定义样式
     */
     handleStyle() {
      if (this.usePortalStyle) {
        this.radius = this.portalStyle.radius;
        this.showBlock = this.portalStyle.showBlock
        this.showIcon = this.portalStyle.showIcon
        this.blockColor = this.portalStyle.blockColor
        this.blockWidth = this.portalStyle.blockWidth
        this.titleColor = this.portalStyle.titleColor
        this.showTitle = this.portalStyle.showTitle
      } else {
        this.radius = this.item.radius;
        this.showBlock = this.item.showBlock
        this.showIcon = this.item.showIcon
        this.blockColor = this.item.blockColor
        this.blockWidth = this.item.blockWidth
        this.titleColor = this.item.titleColor
        this.showTitle = this.item.showTitle
      }
    },
  }
}