// 基础控件 【左面板】
export const basicComponents = [
  {
    ccitKey: 'todo',
    label: '我的待办',
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    tabs: [
      {
        title: '我的待办',
        icon: 'icon-ym icon-ym-generator-todo',
      }
    ],
    list: [
      {
        "name": "待办事宜",
        "icon": "icon-ym icon-ym-flowTodo",
        "urlAddress": "workFlow/flowTodo"
      },
      {
        "name": "已办事宜",
        "icon": "icon-ym icon-ym-flowDone",
        "urlAddress": "workFlow/flowDone"
      }
    ],
    activeTab: 0,
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '/task',
    moreParams: {},
    showFresh: true,
    radius: 8,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    w: 12,
    h: 4,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   ccitKey: 'todo',
  //   label: '我的待办',
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#506CD2',
  //   blockWidth: 5,
  //   usePortalStyle: true,
  //   tabs: [
  //     {
  //       title: '我的待办',
  //       icon: 'icon-ym icon-ym-generator-todo',
  //       dataInterface: '',
  //     }
  //   ],
  //   list: [],
  //   activeTab: 0,
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '/workFlow/flowTodo',
  //   moreParams: {},
  //   showFresh: true,
  //   radius: 8,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   w: 12,
  //   h: 4,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 24,
  //   maxH: 12,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  //   lock: false
  // },
  // {

  //   label: '我的任务',
  //   ccitKey: 'task',
  //   tabs: [
  //     {
  //       title: '我的任务',
  //       icon: 'icon-ym icon-ym-generator-menu',
  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '',
  //   moreParams: {},
  //   showFresh: true,
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#506CD2',
  //   blockWidth: 5,
  //   usePortalStyle: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   radius: 8,
  //   w: 6,
  //   h: 7,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 24,
  //   maxH: 12,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  //   lock: false
  // },
  {

    ccitKey: 'commonFunc',
    label: '常用功能',
    tabs: [
      {
        title: '常用功能',
        icon: 'icon-ym icon-ym-generator-function',
      }
    ],
    showTabsSetting: false,
    showMore: false,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    list: [
      { fullName: "功能设计", id: "85cd7bca426e49ce83a061bf461b1447", urlAddress: "OnlineDev/WebDesign", icon: "icon-ym icon-ym-webDesign", iconBackgroundColor: "#FF3B3B" },
      { fullName: "流程设计", id: "fe0150960dd542ec9328067e4495074b", urlAddress: "WorkFlow/FlowEngine", icon: "icon-ym icon-ym-flowDesign", iconBackgroundColor: "#7B1AE1" },
      { fullName: "权限管理", id: "9057d797550e4457b7ddf2456ce45882", urlAddress: "Permission/Authorize", icon: "icon-ym icon-ym-authorize", iconBackgroundColor: "#1890FF" },
      { fullName: "报表设计", id: "c7159f97177b420d9fc8ec8c74ae541b", urlAddress: "OnlineDev/DataReport", icon: "icon-ym icon-ym-reportDesign", iconBackgroundColor: "#F68900" },
      { fullName: "门户设计", id: "232d7226f00446d882e1e1bd999f7b2d", urlAddress: "OnlineDev/VisualPortal", icon: "icon-ym icon-ym-portalDesign", iconBackgroundColor: "#33B932" }
    ],
    radius: 8,
    w: 12,
    h: 4,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  {
    ccitKey: 'notice',
    label: '公告通知',
    tabs: [
      {
        title: '公告通知',
        icon: 'icon-ym icon-ym-generator-notice',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '/system/notice',
    moreParams: {},
    showFresh: true,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    showHeader: false,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    list: [
      { label: '标题', prop: 'fullName', selection: true },
      { label: '发布人', prop: 'creator', selection: true },
      { label: '发布时间', prop: 'publishTime', selection: true }
    ],
    radius: 8,
    w: 8,
    h: 7,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   ccitKey: 'email',
  //   label: '未读邮件',
  //   tabs: [
  //     {
  //       title: '未读邮件',
  //       icon: 'icon-ym icon-ym-generator-email',
  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '/extend/email',
  //   moreParams: {},
  //   showFresh: true,
  //   radius: 8,
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#506CD2',
  //   blockWidth: 5,
  //   usePortalStyle: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   w: 12,
  //   h: 7,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 24,
  //   maxH: 12,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  //   lock: false
  // },
  {
    ccitKey: 'todoList',
    label: '待办事项',
    tabs: [
      {
        title: '待办事项',
        icon: 'icon-ym icon-ym-generator-todolist',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    showHeader: false,
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    showPagination: false,
    innerTabs: [
      {
        label: '待办', name: 'sys', show: true
      },
      { label: '已办', name: 'complate', show: true }
    ],
    pageSize: 5,
    list: [
      { label: '待办标题', prop: 'taskName', selection: true },
      { label: '待办编号', prop: 'sysTaskId', selection: true },
      { label: '推送时间', prop: 'sendTime', selection: true },
      { label: '当前处理用户', prop: 'handleUserName', selection: true },
      { label: '上一环节用户', prop: 'sendUserName', selection: true },
      { label: '待办名称', prop: 'typeName', selection: true },
      { label: '活动名称', prop: 'linkName', selection: true }
    ],
    w: 12,
    h: 7,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   ccitKey: 'todoList',
  //   label: '待办事项',
  //   tabs: [
  //     {
  //       title: '待办事项',
  //       icon: 'icon-ym icon-ym-generator-todolist',
  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '',
  //   moreParams: {},
  //   showFresh: true,
  //   showHeader: false,
  //   radius: 8,
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#506CD2',
  //   blockWidth: 5,
  //   usePortalStyle: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   showPagination: false,
  //   innerTabs: [
  //     {
  //       label: '待办', name: 'sys', show: true
  //     },
  //     { label: '已办', name: 'outer', show: true }
  //   ],
  //   showOuter: true,
  //   pageSize: 5,
  //   list: [
  //     { label: '标题', prop: 'fullName', selection: true },
  //     { label: '紧急程度', prop: 'flowUrgent', selection: true },
  //     { label: '发起时间', prop: 'startTime', selection: true },
  //     { label: '流程状态', prop: 'status', selection: true },
  //     { label: '接收时间', prop: 'creatorTime', selection: true }
  //   ],
  //   w: 12,
  //   h: 7,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 24,
  //   maxH: 12,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  //   lock: false
  // },
  // {
  //   icon: 'icon-ym icon-ym-generator-Panel',
  //   label: '数据计算',
  //   ccitKey: 'dataBoard',
  //   dataInterface: '',
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   list: [
  //     { fullName: "", num: 0, icon: "icon-ym icon-ym-wf-contractApproval" },
  //     { fullName: "", num: 0, icon: "icon-ym icon-ym-wf-outgoingApply" }
  //   ],
  //   radius: 8,
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   w: 12,
  //   h: 3,
  //   minW: 12,
  //   minH: 3,
  //   maxW: 12,
  //   maxH: 6,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  {
    ccitKey: 'iframeDiv',
    label: 'iframe元素',
    tabs: [
      {
        title: 'iframe元素',
        icon: 'el-icon-news',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    iframeUrl: '',
    param: '',
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    events: [],
    eventList: [
      { name: "渲染前事件(mounted)", funName: "mounted", funContext: "" },
    ],
    w: 24,
    h: 6,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  {
    ccitKey: 'carousel',
    label: '图片轮播',
    tabs: [
      {
        title: '图片轮播',
        icon: 'ym-custom ym-custom-numeric--box-multiple-outline',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    list: [],
    config: { interval: 3000, type: 'card', arrow: 'always', indicatorPosition: 'none', autoplay: 'false' },
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    w: 24,
    h: 5,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  {
    ccitKey: 'mailbox',
    label: '我的邮箱',
    tabs: [
      {
        title: '我的邮箱',
        icon: 'ym-custom ym-custom-email-outline',

      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    list: [
      { name: '写信', icon: 'icon-ym icon-ym-extend-pencil', type: 'write' },
      { name: '通讯录', icon: 'icon-ym icon-ym-generator-jobs', type: 'loadIn' },
      { name: '进入邮箱', icon: 'el-icon-right', type: 'loadIn' },
    ],
    radius: 8,
    w: 16,
    h: 6,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  {
    ccitKey: 'singleLogin',
    label: '单点登录',
    tabs: [
      {
        title: '单点登录',
        icon: 'ym-custom ym-custom-power',

      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    list: [
      {
        name: "ERP系统",
        imgUrl: require('@/assets/images/singleLogin/erp.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "业财一体化",
        imgUrl: require('@/assets/images/singleLogin/money.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "OA系统",
        imgUrl: require('@/assets/images/singleLogin/oa.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "法律事务",
        imgUrl: require('@/assets/images/singleLogin/law.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "历史公文查询",
        imgUrl: require('@/assets/images/singleLogin/doc.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "应用运维",
        imgUrl: require('@/assets/images/singleLogin/manage.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "综合管理系统",
        imgUrl: require('@/assets/images/singleLogin/manage.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "阿米加",
        imgUrl: require('@/assets/images/singleLogin/ame.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "业务综合管理",
        imgUrl: require('@/assets/images/singleLogin/business.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
      {
        name: "中煤易购",
        imgUrl: require('@/assets/images/singleLogin/shop.png'),
        sysUrl: "http://ame.chinacoalit.com/"
      },
    ],
    radius: 8,
    events: [],
    w: 8,
    h: 5,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   ccitKey: 'commonLinks',
  //   label: '常用链接',
  //   tabs: [
  //     {
  //       title: '常用链接',
  //       icon: 'el-icon-link',

  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '',
  //   moreParams: {},
  //   showFresh: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   list: [
  //     {
  //       name: "集团外网",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "集团内网",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "中煤ERP",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "集团OA",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "劳动力系统",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "调度系统",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "法务系统",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "主数据平台",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "档案系统",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     },
  //     {
  //       name: "考试系统",
  //       url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
  //     }
  //   ],
  //   color: '#333',
  //   fontSize: 14,
  //   radius: 8,
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#506CD2',
  //   blockWidth: 5,
  // usePortalStyle: true,
  //   w: 8,
  //   h: 5,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 24,
  //   maxH: 12,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  {
    ccitKey: 'dailySchedule',
    label: '我的事项',
    tabs: [
      {
        title: '我的事项',
        icon: 'ym-custom ym-custom-calendar-check',

      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    showBtn: false,
    reverse: false,
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    isCollapes: true,
    scheduleType: 'timeline',
    showAdd: true,
    showWeather: true,
    w: 6,
    h: 12,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 24,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   ccitKey: 'dailySchedule2',
  //   label: '我的事项(新春)',
  //   tabs: [
  //     {
  //       title: '我的事项',
  //       icon: 'ym-custom ym-custom-calendar-check',

  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '',
  //   moreParams: {},
  //   showFresh: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   showBtn: false,
  //   reverse: false,
  //   radius: 8,
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#C74C54',
  //   blockWidth: 5,
  // usePortalStyle: true,
  //   isCollapes: true,
  //   scheduleType: 'card',
  //   showAdd: true,
  //   showWeather: true,
  //   w: 6,
  //   h: 12,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 24,
  //   maxH: 24,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  {
    ccitKey: 'weather',
    label: '天气预报',
    tabs: [
      {
        title: '天气预报',
        icon: 'ym-custom ym-custom-weather-cloudy',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    mode: 'standard',
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    radius: 8,
    bgColor: '#fff',
    w: 12,
    h: 3,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   ccitKey: 'addFlow',
  //   label: '新建流程',
  //   tabs: [
  //     {
  //       title: '新建流程',
  //       icon: 'icon-ym icon-ym-flowDesign',

  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '',
  //   moreParams: {},
  //   showFresh: true,
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#506CD2',
  //   blockWidth: 5,
  // usePortalStyle: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   radius: 8,
  //   w: 16,
  //   h: 6,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 24,
  //   maxH: 12,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  // {
  //   ccitKey: 'document',
  //   label: '文档中心',
  //   tabs: [
  //     {
  //       title: '文档中心',
  //       icon: 'el-icon-document',

  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '',
  //   moreParams: {},
  //   showFresh: true,
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#506CD2',
  //   blockWidth: 5,
  // usePortalStyle: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   radius: 8,
  //   w: 6,
  //   h: 7,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 24,
  //   maxH: 12,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  {
    ccitKey: 'contactBook',
    label: '通讯录',
    tabs: [
      {
        title: '通讯录',
        icon: 'ym-custom ym-custom-cellphone-link',

      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    showHeader: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    radius: 8,
    showPagination: true,
    list: [
      { label: '账号', prop: 'account', selection: true },
      { label: '姓名', prop: 'realName', selection: true },
      { label: '性别', prop: 'gender', selection: true },
      { label: '手机', prop: 'mobilePhone', selection: true },
      { label: '部门', prop: 'department', selection: true },
      { label: '岗位', prop: 'position', selection: true },
    ],
    w: 16,
    h: 6,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  {
    ccitKey: 'singlePicture',
    label: '图片元素',
    tabs: [
      {
        title: '图片元素',
        icon: 'icon-ym icon-ym-file-photo',

      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    radius: 8,
    fileId: '',
    fit: 'fill',
    w: 6,
    h: 4,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   icon: 'ym-custom ym-custom-calendar-check',
  //   label: '我的会议',
  //   ccitKey: 'dailySchedule',
  //   title: '我的会议',
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   showBtn: false,
  //   reverse: false,
  //   radius: 8,
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   list: [
  //     {
  //       timestamp: "2021-09-17 20:46",
  //       content: "远程会议，准备演示。",
  //       status: 'unFinished',
  //     },
  //     {
  //       timestamp: "2021-09-17 14:00",
  //       content: "致电客户Tom并讨论相关项目详细信息。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 11:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 10:00",
  //       content: "远程会议，准备演示。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 9:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //   ],
  //   w: 4,
  //   h: 11,
  //   minW: 4,
  //   minH: 11,
  //   maxW: 6,
  //   maxH: 15,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  // {
  //   icon: 'ym-custom ym-custom-calendar-check',
  //   label: '会议室使用',
  //   ccitKey: 'dailySchedule',
  //   title: '会议室使用',
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   showBtn: false,
  //   reverse: false,
  //   radius: 8,
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   list: [
  //     {
  //       timestamp: "2021-09-17 20:46",
  //       content: "远程会议，准备演示。",
  //       status: 'unFinished',
  //     },
  //     {
  //       timestamp: "2021-09-17 14:00",
  //       content: "致电客户Tom并讨论相关项目详细信息。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 11:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 10:00",
  //       content: "远程会议，准备演示。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 9:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //   ],
  //   w: 4,
  //   h: 11,
  //   minW: 4,
  //   minH: 11,
  //   maxW: 6,
  //   maxH: 15,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  {
    ccitKey: 'modelQuery',
    label: '建模查询中心',
    tabs: [
      {
        title: '建模查询中心',
        icon: 'el-icon-s-data',
        dataInterface: '313ab6ca0c884d3980ee315dd364f26b',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    showHeader: true,
    showBorder: false,
    showStripe: false,
    columns: [],
    w: 8,
    h: 11,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 15,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   icon: 'ym-custom ym-custom-calendar-check',
  //   label: '任务列表',
  //   ccitKey: 'dailySchedule',
  //   title: '任务列表',
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   showBtn: false,
  //   reverse: false,
  //   radius: 8,
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   list: [
  //     {
  //       timestamp: "2021-09-17 20:46",
  //       content: "远程会议，准备演示。",
  //       status: 'unFinished',
  //     },
  //     {
  //       timestamp: "2021-09-17 14:00",
  //       content: "致电客户Tom并讨论相关项目详细信息。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 11:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 10:00",
  //       content: "远程会议，准备演示。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 9:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //   ],
  //   w: 4,
  //   h: 11,
  //   minW: 4,
  //   minH: 11,
  //   maxW: 6,
  //   maxH: 15,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  {
    ccitKey: 'rankList',
    label: '排行榜',
    tabs: [
      {
        title: '排行榜',
        icon: 'ym-custom ym-custom-sort-descending',
        dataInterface: '03bcc499a1c64c73a5173cb2e1787de9',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    listSize: 5,
    sortField: '',
    sortType: 'asc',
    displayType: 'list',
    axisField: '',
    dynamic: true,
    interval: 10,
    showHeader: true,
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    columns: [
      {
        label: "对象",
        prop: "name",
        span: 8,
      },
      {
        label: "数据",
        prop: "value",
        span: 8,
      },
    ],
    w: 12,
    h: 8,
    minW: 1,
    minH: 1,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   icon: 'ym-custom ym-custom-calendar-check',
  //   label: '新建菜单',
  //   ccitKey: 'dailySchedule',
  //   title: '新建菜单',
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   showBtn: false,
  //   reverse: false,
  //   radius: 8,
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   list: [
  //     {
  //       timestamp: "2021-09-17 20:46",
  //       content: "远程会议，准备演示。",
  //       status: 'unFinished',
  //     },
  //     {
  //       timestamp: "2021-09-17 14:00",
  //       content: "致电客户Tom并讨论相关项目详细信息。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 11:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 10:00",
  //       content: "远程会议，准备演示。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 9:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //   ],
  //   w: 4,
  //   h: 11,
  //   minW: 4,
  //   minH: 11,
  //   maxW: 6,
  //   maxH: 15,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  // {
  //   ccitKey: 'CCITAudio',
  //   label: '音频元素',
  //   tabs: [
  //     {
  //       title: "音频元素",
  //       icon: 'el-icon-video-play',
  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '',
  //   moreParams: {},
  //   showFresh: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   radius: 8,
  //   showTitle: false,
  //   usePortalStyle: true,
  //   config: { autoplay: false, loop: false },
  //   fileId: '',
  //   w: 8,
  //   h: 1,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 12,
  //   maxH: 12,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  //   lock: false
  // },
  {
    ccitKey: 'CCITVideo',
    label: '视频元素',
    tabs: [
      {
        title: "视频元素",
        icon: 'el-icon-video-camera',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    radius: 8,
    usePortalStyle: true,
    showTitle: false,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    config: { autoplay: false, loop: false },
    fileId: '',
    w: 5,
    h: 5,
    minW: 4,
    minH: 4,
    maxW: 8,
    maxH: 8,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  {
    ccitKey: 'CCITMap',
    label: '地图元素',
    tabs: [
      {
        title: '地图元素',
        icon: 'el-icon-map-location',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    point: {
      lng: 0, //经度
      lat: 0 //纬度
    },
    zoom: 17, //缩放级别
    address: '',
    searchable: true,
    w: 4,
    h: 4,
    minW: 6,
    minH: 6,
    maxW: 24,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  {
    ccitKey: 'timeLine',
    label: '时间线',
    tabs: [
      {
        title: '时间线',
        icon: 'icon-ym icon-ym-wf-staffOvertime',
        dataInterface: 'c15a7e8d04424c22b7d231a635df4595',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    reverse: false,
    format: 'yyyy-MM-dd',
    list: [],
    node: {
      noStart: {
        color: '#e4e7ed',
        icon: '',
        condition: -1,
        value: 0
      },
      progress: {
        color: '#0bbd87',
        icon: 'el-icon-loading',
        condition: 0,
        value: 0
      },
      finish: {
        color: '#409eff',
        icon: 'el-icon-check',
        condition: 1,
        value: 0
      }
    },
    statusField: '',
    w: 4,
    h: 6,
    minW: 2,
    minH: 2,
    maxW: 8,
    maxH: 10,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  {
    ccitKey: 'currentTime',
    label: '当前时间',
    tabs: [
      {
        title: '当前时间',
        icon: 'icon-ym icon-ym-generator-time',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    moreParams: {},
    showFresh: true,
    radius: 8,
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '',
    titleBorder: '1px solid #EBEEF5',
    titleCss: '',
    opacity: 1,
    format: 'YYYY年MM月DD日 HH:mm:ss',
    color: '#3A8AD1',
    fontSize: 18,
    fontFamily: 'PingFang SC',
    showWeek: true,
    showClock: true,
    css: '',
    w: 12,
    h: 6,
    minW: 2,
    minH: 1,
    maxW: 18,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   ccitKey: 'displayField',
  //   label: '展示字段',
  //   tabs: [
  //     {
  //       title: '展示字段',
  //       icon: 'icon-ym icon-ym-header-userInfo',
  //       dataInterface: '',
  //     }
  //   ],
  //   showTabsSetting: false,
  //   showMore: true,
  //   moreType: 'sys',
  //   moreUrl: '',
  //   moreParams: {},
  //   showFresh: true,
  //   radius: 8,
  //   showTitle: true,
  //   showBlock: true,
  //   showIcon: true,
  //   blockColor: '#506CD2',
  //   blockWidth: 5,
  //   usePortalStyle: true,
  //   titleColor: '',
  //   titleBorder: '1px solid #EBEEF5',
  //   titleCss: '',
  //   opacity: 1,
  //   userKey: '',
  //   interfaceKey: '',
  //   color: '#333',
  //   fontSize: 16,
  //   fontFamily: 'PingFang SC',
  //   fieldOrigin: 'userInfo',
  //   fillText: '',
  //   direction: 'horizontal',
  //   w: 4,
  //   h: 2,
  //   minW: 1,
  //   minH: 1,
  //   maxW: 8,
  //   maxH: 10,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  //   lock: false
  // },
  // {
  //   icon: 'ym-custom ym-custom-calendar-check',
  //   label: '收藏元素',
  //   ccitKey: 'dailySchedule',
  //   title: '收藏元素',
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   showBtn: false,
  //   reverse: false,
  //   radius: 8,
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   w: 4,
  //   h: 11,
  //   minW: 4,
  //   minH: 11,
  //   maxW: 6,
  //   maxH: 15,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  // {
  //   icon: 'ym-custom ym-custom-calendar-check',
  //   label: '我的项目',
  //   ccitKey: 'dailySchedule',
  //   title: '我的项目',
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   showBtn: false,
  //   reverse: false,
  //   radius: 8,
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   list: [
  //     {
  //       timestamp: "2021-09-17 20:46",
  //       content: "远程会议，准备演示。",
  //       status: 'unFinished',
  //     },
  //     {
  //       timestamp: "2021-09-17 14:00",
  //       content: "致电客户Tom并讨论相关项目详细信息。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 11:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 10:00",
  //       content: "远程会议，准备演示。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 9:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //   ],
  //   w: 4,
  //   h: 11,
  //   minW: 4,
  //   minH: 11,
  //   maxW: 6,
  //   maxH: 15,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  // {
  //   icon: 'ym-custom ym-custom-calendar-check',
  //   label: '期刊中心',
  //   ccitKey: 'dailySchedule',
  //   title: '期刊中心',
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   showBtn: false,
  //   reverse: false,
  //   radius: 8,
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   list: [
  //     {
  //       timestamp: "2021-09-17 20:46",
  //       content: "远程会议，准备演示。",
  //       status: 'unFinished',
  //     },
  //     {
  //       timestamp: "2021-09-17 14:00",
  //       content: "致电客户Tom并讨论相关项目详细信息。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 11:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 10:00",
  //       content: "远程会议，准备演示。",
  //       status: 'finished',
  //     },
  //     {
  //       timestamp: "2021-09-17 9:00",
  //       content: "BOSS分配给你一个新任务。",
  //       status: 'finished',
  //     },
  //   ],
  //   w: 4,
  //   h: 11,
  //   minW: 4,
  //   minH: 11,
  //   maxW: 6,
  //   maxH: 15,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  // {
  //   icon: 'icon-ym icon-ym-wf-documentApproval',
  //   label: '规章制度',
  //   ccitKey: 'rulesDoc',
  //   title: '规章制度',
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   radius: 8,
  //   w: 3,
  //   h: 7,
  //   minW: 3,
  //   minH: 7,
  //   maxW: 4,
  //   maxH: 8,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
  {
    ccitKey: 'news',
    label: '企业新闻',
    tabs: [
      {
        title: '企业新闻',
        icon: 'ym-custom ym-custom-newspaper',
      }
    ],
    showTabsSetting: false,
    showMore: true,
    moreType: 'sys',
    moreUrl: '',
    showTitle: true,
    showBlock: true,
    showIcon: true,
    blockColor: '#506CD2',
    blockWidth: 5,
    usePortalStyle: true,
    titleColor: '', titleBorder: '1px solid #EBEEF5',
    radius: 8,
    categoryCode: '',
    columns: [{
      label: '标题', prop: 'title',
      selection: true,
    },
    {
      label: '所属栏目', prop: 'categoryName',
      selection: false,
    },
    {
      label: '创建人', prop: 'createBy',
      selection: false,
    },
    {
      label: '创建时间', prop: 'createDate',
      selection: true,
      width: 120
    }],
    showHeader: false,
    showCarousel: true,
    showRecommend: true,
    w: 12,
    h: 7,
    minW: 3,
    minH: 7,
    maxW: 24,
    maxH: 16,
    draggable: true,
    resizable: true,
    editable: true,
    lock: false
  },
  // {
  //   icon: 'ym-custom ym-custom-newspaper',
  //   label: '行业资讯',
  //   ccitKey: 'industryInfo',
  //   title: '行业资讯',
  //   showTitle: true,
  // showBlock: true,
  // showIcon: true,
  // blockColor: '#506CD2',
  // blockWidth: 5,
  // usePortalStyle: true,
  //   titleColor: '',titleBorder:'1px solid #EBEEF5',
  //   radius: 8,
  //   w: 3,
  //   h: 7,
  //   minW: 3,
  //   minH: 7,
  //   maxW: 4,
  //   maxH: 8,
  //   draggable: true,
  //   resizable: true,
  //   editable: true,
  // lock: false
  // },
]
// 图表控件 【左面板】
export const chartComponents = [{
  ccitKey: 'barChart',
  label: '柱状图',
  tabs: [
    {
      title: '柱状图',
      icon: 'icon-ym icon-ym-generator-bar',
      dataInterface: '',
    }
  ],
  showTabsSetting: false,
  showMore: true,
  moreType: 'sys',
  moreUrl: '',
  moreParams: {},
  showFresh: true,
  titleColor: '',
  titleBorder: '1px solid #EBEEF5',
  titleCss: '',
  opacity: 1,
  radius: 8,
  showTitle: true,
  showBlock: true,
  showIcon: true,
  blockColor: '#506CD2',
  blockWidth: 5,
  usePortalStyle: true,
  markLine: [],
  markPoint: [],
  //配置
  props: {
    barWidth: 30,
    groupColorList: [],
    directionValue: '纵向',
    alignWithLabel: true,
    splitLineShow: false,
    stack: false,
    showValue: false,
    valuePosition: ''
  },
  option: {
    color: [],
    title: {
      text: '',
      subtext: '',
    },
    legend: {
      show: true,
      data: []
    },
    toolbox: {
      feature: {
        dataView: { show: false, readOnly: true },
        magicType: { show: false, type: ['line', 'bar'] },
        saveAsImage: { show: false }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '15%', //避免纵坐标值显示不全，所以调大一点
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      name: '',
      type: 'category',
      data: [],
      axisTick: { alignWithLabel: true },
      splitLine: { show: false }
    }],
    yAxis: [{
      name: '',
      type: 'value',
    }],
    series: []
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20,
  draggable: true,
  resizable: true,
  editable: true,
  lock: false
},
{
  ccitKey: 'pieChart',
  label: '饼图',
  tabs: [
    {
      title: '饼图',
      icon: 'icon-ym icon-ym-generator-pie',
    }
  ],
  showTabsSetting: false,
  showMore: true,
  moreType: 'sys',
  moreUrl: '',
  moreParams: {},
  showFresh: true,
  titleColor: '',
  titleBorder: '1px solid #EBEEF5',
  titleCss: '',
  opacity: 1,
  radius: 8,
  showTitle: true,
  showBlock: true,
  showIcon: true,
  blockColor: '#506CD2',
  blockWidth: 5,
  usePortalStyle: true,
  //配置
  props: {
    groupColorList: [],
  },
  option: {
    title: {
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      // orient: 'vertical',
      // top: 'middle',
      bottom: 10,
      left: 'center',
      data: []
    },
    toolbox: {
      feature: {
        dataView: { show: false, readOnly: true },
        saveAsImage: { show: false }
      }
    },
    series: [],
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20,
  draggable: true,
  resizable: true,
  editable: true,
  lock: false
},
{
  ccitKey: 'lineChart',
  label: '折线图',
  tabs: [
    {
      title: '折线图',
      icon: 'icon-ym icon-ym-generator-line',
    }
  ],
  showTabsSetting: false,
  showMore: true,
  moreType: 'sys',
  moreUrl: '',
  moreParams: {},
  showFresh: true,
  titleColor: '',
  titleBorder: '1px solid #EBEEF5',
  titleCss: '',
  opacity: 1,
  radius: 8,
  showTitle: true,
  showBlock: true,
  showIcon: true,
  blockColor: '#506CD2',
  blockWidth: 5,
  usePortalStyle: true,
  //配置
  props: {
    groupColorList: [],
    directionValue: '纵向',
    alignWithLabel: true,
    splitLineShow: false,
    stack: false,
    showValue: false,
    valuePosition: ''
  },
  option: {
    theme: '',
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '10%',
      top: '3%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      data: []
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: [],
      axisTick: { alignWithLabel: false },
      splitLine: { show: false }
    }],
    yAxis: [{
      type: 'value'
    }],
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20,
  draggable: true,
  resizable: true,
  editable: true,
  lock: false
},
{
  ccitKey: 'annularChart',
  label: '环形图',
  tabs: [
    {
      title: '环形图',
      icon: 'icon-ym icon-ym-generator-annular',
    }
  ],
  showTabsSetting: false,
  showMore: true,
  moreType: 'sys',
  moreUrl: '',
  moreParams: {},
  showFresh: true,
  titleColor: '',
  titleBorder: '1px solid #EBEEF5',
  titleCss: '',
  opacity: 1,
  radius: 8,
  showTitle: true,
  showBlock: true,
  showIcon: true,
  blockColor: '#506CD2',
  blockWidth: 5,
  usePortalStyle: true,
  //配置
  props: {
    groupColorList: [],
  },
  option: {
    theme: '',
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 335, name: '直接访问', itemStyle: { color: '#33b932' } },
        { value: 310, name: '邮件营销', itemStyle: { color: '#ff3b3b' } },
        { value: 234, name: '联盟广告', itemStyle: { color: '#7b1ae1' } },
        { value: 135, name: '视频广告', itemStyle: { color: '#f68900' } },
        { value: 1548, name: '搜索引擎', itemStyle: { color: '#1890ff' } }
      ]
    }]
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20
},
{
  ccitKey: 'areaChart',
  label: '面积图',
  tabs: [
    {
      title: '面积图',
      icon: 'icon-ym icon-ym-generator-area',
    }
  ],
  showTabsSetting: false,
  showMore: true,
  moreType: 'sys',
  moreUrl: '',
  moreParams: {},
  showFresh: true,
  titleColor: '',
  titleBorder: '1px solid #EBEEF5',
  titleCss: '',
  opacity: 1,
  radius: 8,
  showTitle: true,
  showBlock: true,
  showIcon: true,
  blockColor: '#506CD2',
  blockWidth: 5,
  usePortalStyle: true,
  //配置
  props: {
    groupColorList: [],
  },
  option: {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {
        color: '#d0e2f3'
      },
      itemStyle: {
        normal: {
          color: '#1890FF',
          lineStyle: { color: '#1890FF' }
        }
      },
    }]
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20
},
{
  ccitKey: 'radarChart',
  label: '雷达图',
  tabs: [
    {
      title: '雷达图',
      icon: 'icon-ym icon-ym-generator-radar',
    }
  ],
  showTabsSetting: false,
  showMore: true,
  moreType: 'sys',
  moreUrl: '',
  moreParams: {},
  showFresh: true,
  titleColor: '',
  titleBorder: '1px solid #EBEEF5',
  titleCss: '',
  opacity: 1,
  radius: 8,
  showTitle: true,
  showBlock: true,
  showIcon: true,
  blockColor: '#506CD2',
  blockWidth: 5,
  usePortalStyle: true,
  //配置
  props: {
    groupColorList: [],
  },
  option: {
    title: {
      text: '雷达图'
    },
    grid: {
      left: '3%',
      right: '10%',
      top: '3%',
      bottom: '3%'
    },
    tooltip: {},
    legend: {
      data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
      shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '销售（sales）', max: 6500 },
        { name: '管理（Administration）', max: 16000 },
        { name: '信息技术（Information Techology）', max: 30000 },
        { name: '客服（Customer Support）', max: 38000 },
        { name: '研发（Development）', max: 52000 },
        { name: '市场（Marketing）', max: 25000 }
      ]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [{
        value: [4300, 10000, 28000, 35000, 50000, 19000],
        name: '预算分配（Allocated Budget）',
        itemStyle: { color: '#ff3b3b' }
      },
      {
        value: [5000, 14000, 28000, 31000, 42000, 21000],
        name: '实际开销（Actual Spending）',
        itemStyle: { color: '#1890ff' }
      }
      ]
    }]
  },
  w: 6,
  h: 8,
  minW: 4,
  minH: 8,
  maxW: 12,
  maxH: 20,
  draggable: true,
  resizable: true,
  editable: true,
  lock: false
}
]
