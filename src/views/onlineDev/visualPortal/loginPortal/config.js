// 基础控件 【左面板】
export const basicComponents = [
  {
    icon: 'ym-custom ym-custom-format-paragraph',
    ccitKey: "copyright",
    label: '版权元素',
    title: "版权元素",
    position: { type: 'fixed', left: 0, bottom: 0 },
    gridCss: '{"width": "100%"}',
    list: [{
      text: '助力企业数字化转型',
      color: '#999',
      fontSize: 12
    },
    {
      text: 'Copyright 中煤信息技术（北京）有限公司, All Rights Reserved. 京ICP备19049344号-1 京公网安备110401000041号',
      color: '#999',
      fontSize: 12
    }],
    bgColor: '',
    textPosition: 'center',
    x: 0,
    y: 13,
    w: 16,
    h: 1,
    minW: 16,
    minH: 1,
    maxW: 16,
    maxH: 3,
    draggable: false,
    resizable: true,
    static: true,
    opacity: 1,
    radius: 8,
  },
  {
    icon: 'icon-ym icon-ym-formExample',
    label: '表单元素',
    ccitKey: 'loginForm',
    title: '表单元素',
    list: [
      { fullName: "用户名", placeholder: '请输入用户名/手机号', focus: true, iconType: 'icon', originIcon: "el-icon-user", activeIcon: 'el-icon-user', originImg: '', activeImg: '', css: '{"marginBottom": "5%"}', originColor: '#ccc', activeColor: '#ccc', showdowColor: '#C3DAFA' },
      { fullName: "密码", placeholder: "请输入密码", focus: true, iconType: 'icon', originIcon: "el-icon-lock", activeIcon: 'el-icon-lock', originImg: '', activeImg: '', css: '{"marginBottom": "5%"}', originColor: '#ccc', activeColor: '#ccc', showdowColor: '#C3DAFA' },
      { fullName: "验证码", placeholder: "请输入验证码", focus: true, iconType: 'icon', originIcon: "el-icon-picture-outline", activeIcon: 'el-icon-picture-outline', originImg: '', activeImg: '', css: '{"marginBottom": "5%"}', originColor: '#ccc', activeColor: '#ccc', showdowColor: '#C3DAFA' },
      { fullName: "登录按钮", focus: true, originColor: '#0f4697', activeColor: '#1b5dbe', css: '{"color": "#fff","marginTop": "5%"}' },
      { fullName: "记住密码", focus: true, originColor: '#b0cbf4', activeColor: '#0f4697' },
      { fullName: "温馨提示", show: true, text: '登录问题可联系技术支持，电话010-82256543。', css: '{"fontSize": "14px","color": "#000","fontFamily": "PingFangSC-Medium, PingFang SC"}' },
    ],
    buttonCss: '',
    useScan: true, //启用扫码
    useFace: true, //启用人脸登录
    useVerifiCode: true, //启用验证码
    useRemember: true, //启用记住密码
    logoObject: {
      fileId: '',
      name: '',
      url: ''
    },
    bgColor: '#fff',
    w: 4,
    h: 9,
    x: 8,
    y: 2,
    minW: 3,
    minH: 6,
    maxW: 8,
    maxH: 18,
    draggable: true,
    resizable: true,
    editable: true,
    opacity: 1,
    radius: 8,
    shadow: 'always',
    cardCss: '{"padding": "7% 9%"}'
  },
  {
    icon: 'icon-ym icon-ym-formExample',
    label: '表单元素(新春)',
    ccitKey: 'loginForm2',
    title: '表单元素',
    list: [
      { fullName: "用户名", placeholder: '8位数字员工编号', icon: "el-icon-user", css: '' },
      { fullName: "密码", placeholder: "原门户登录密码", icon: "el-icon-lock", css: '' },
      { fullName: "验证码", placeholder: "请输入验证码", icon: "el-icon-picture-outline", css: '' },
    ],
    useScan: true, //启用扫码
    useFace: true, //启用人脸登录
    useVerifiCode: true, //启用验证码
    useRemember: true,
    logoObject: {
      fileId: '',
      name: '',
      url: ''
    },
    bgColor: '#fff',
    w: 4,
    h: 9,
    x: 8,
    y: 2,
    minW: 3,
    minH: 6,
    maxW: 8,
    maxH: 18,
    draggable: true,
    resizable: true,
    editable: true,
    opacity: 1,
    radius: 8,
  },
  {
    icon: 'icon-ym icon-ym-file-photo',
    label: '图片元素',
    ccitKey: 'singlePicture',
    title: '图片元素',
    round: false,
    showTitle: false,
    fileId: '',
    fit: 'fill',
    w: 3,
    h: 4,
    x: 2,
    y: 8,
    minW: 2,
    minH: 3,
    maxW: 8,
    maxH: 8,
    draggable: true,
    resizable: true,
    editable: true,
    opacity: 1,
    radius: 8,
  },
  {
    icon: 'icon-ym icon-ym-header-expand',
    label: '多页签元素',
    ccitKey: 'loginTab',
    title: '图片元素',
    round: false,
    showTitle: false,
    bgColor: '#fff',
    fontColor: '#000',
    list: [{
      fullName: '页签1',
      dataInterface: '',
      data: []
    }, {
      fullName: '页签2',
      dataInterface: '',
      data: []
    }
    ],
    w: 6,
    h: 9,
    x: 1,
    y: 2,
    minW: 3,
    minH: 6,
    maxW: 8,
    maxH: 12,
    draggable: true,
    resizable: true,
    editable: true,
    opacity: 1,
    radius: 8,
  },
  {
    icon: 'el-icon-document-remove',
    label: '版本元素',
    ccitKey: "version",
    title: "版本元素",
    x: 15,
    y: 0,
    w: 1,
    h: 1,
    version: '',
    draggable: false,
    resizable: false,
    static: true,
    editable: true,
  },
  {
    icon: 'ym-custom ym-custom-theme-light-dark',
    label: '主题元素',
    ccitKey: "theme",
    title: "主题元素",
    x: 14,
    y: 12,
    w: 1,
    h: 1,
    minW: 1,
    minH: 1,
    maxW: 2,
    maxH: 2,
    draggable: true,
    resizable: false,
    static: false,
    editable: false,
    opacity: 1,
    radius: 8,
  },
  {
    icon: 'el-icon-link',
    label: '常用链接',
    ccitKey: 'commonLinks',
    showTitle: false,
    list: [
      {
        name: "集团外网",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "集团内网",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "中煤ERP",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "集团OA",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "劳动力系统",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "调度系统",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "法务系统",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "主数据平台",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "档案系统",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      },
      {
        name: "考试系统",
        url: "http://172.16.0.83/web974758/subject/n1/n974758/index.html"
      }
    ],
    color: '#999',
    fontSize: 12,
    bgColor: '',
    round: true,
    x: 2,
    y: 12,
    w: 16,
    h: 1,
    minW: 16,
    minH: 1,
    maxW: 16,
    maxH: 3,
    draggable: true,
    resizable: true,
    editable: true,
    opacity: 1,
    radius: 8,
  },
]
