// 基础路由
const baseRouter = [
  // {
  //   path: '/home',
  //   component: (resolve) => require(['@/views/dashboard'], resolve),
  //   name: 'home',
  //   meta: {
  //     title: 'home',
  //     icon: 'icon-ym icon-ym-nav-home',
  //     affix: true,
  //     zhTitle: '首页'
  //   }
  // },
  {
    path: "/test",
    component: (resolve) => require(["@/views/test"], resolve),
    name: "test",
    meta: {
      title: "test",
      icon: "icon-ym icon-ym-nav-home",
      affix: true,
      zhTitle: "测试",
    },
  },
  {
    path: "/home",
    component: (resolve) => require(["@/views/basic/dashboard"], resolve),
    name: "home",
    meta: {
      title: "home",
      icon: "icon-ym icon-ym-nav-home",
      affix: true,
      zhTitle: "首页",
    },
  },
  // {
  //   path: '/dashboard',
  //   component: (resolve) => require(['@/views/basic/dashboard'], resolve),
  //   name: 'dashboard',
  //   meta: {
  //     title: 'dashboard',
  //     icon: 'icon-ym icon-ym-generator-kanban',
  //     affix: true,
  //     zhTitle: '门户展示'
  //   }
  // },
  {
    path: "/messageRecord",
    component: (resolve) => require(["@/views/basic/messageRecord"], resolve),
    name: "messageRecord",
    meta: {
      title: "messageRecord",
      affix: false,
      zhTitle: "消息中心",
      icon: "icon-ym icon-ym-sysNotice",
    },
  },
  {
    path: "/previewModel",
    component: (resolve) => require(["@/views/basic/previewModel"], resolve),
    name: "previewModel",
    meta: {
      title: "previewModel",
      affix: false,
      zhTitle: "功能预览",
      icon: "icon-ym icon-ym-btn-preview",
    },
  },
  {
    path: "/profile",
    component: (resolve) => require(["@/views/basic/profile"], resolve),
    name: "profile",
    meta: {
      title: "profile",
      affix: false,
      zhTitle: "个人信息",
      icon: "icon-ym icon-ym-user",
    },
  },
  {
    path: "/portal-news",
    component: (resolve) => require(["@/views/basic/portal/news"], resolve),
    name: "portal-news",
    meta: {
      title: "portalNews",
      affix: false,
      zhTitle: "资讯门户",
      icon: "ym-custom ym-custom-newspaper",
    },
  },
  {
    path: "/workFlow/flowTodo",
    component: (resolve) => require(["@/views/workFlow/flowTodo"], resolve),
    name: "flowTodo",
    meta: {
      title: "flowTodo",
      affix: false,
      zhTitle: "待办事宜",
      icon: "icon-ym icon-ym-generator-todo",
    },
  },
  {
    path: "/workFlow/flowDone",
    component: (resolve) => require(["@/views/workFlow/flowDone"], resolve),
    name: "flowDone",
    meta: {
      title: "flowDone",
      affix: false,
      zhTitle: "已办事宜",
      icon: "icon-ym icon-ym-flowDone",
    },
  },
];
export default baseRouter;
