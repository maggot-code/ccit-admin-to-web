/*
 * @FilePath: \ccit-admin-to-web\src\main.js
 * @Author: maggot-code
 * @Date: 2022-02-23 10:01:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 18:21:12
 * @Description:
 */
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import service from "./utils/request";
const ccit = require("./utils/ccit").default;

import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import Element from "element-ui";
import "./styles/element-variables.scss";
import "./assets/scss/common.scss";
import "@/assets/fonts/ym-mobile/iconfont.js";

import "@/styles/index.scss"; // global css
import "./assets/scss/theme.scss"; // 主题

import App from "./App";
import store from "./store";
import router from "./router";
import MGform from "maggot-form";
import MGtable from "maggot-table";

import i18n from "./lang"; // internationalization
import "./permission"; // permission control
import "./utils/error-log"; // error log

import * as filters from "./filters"; // global filters

// 自定义按钮权限指令
import permission from "@/directive/permission";

import elDragDialog from "@/directive/el-drag-dialog"; // 引入移动事件（el-drag-dialog.js的内容为上面的代码块）
Vue.directive("el-drag-dialog", elDragDialog); //添加标签事件绑定 可以放大移动弹窗

Vue.prototype.$http = service;
Vue.prototype.$axios = service;

Vue.use(VueCompositionAPI);
Vue.use(permission);
Vue.use(MGform);
Vue.use(MGtable);

Vue.use(Element, {
  size: ccit.storageGet("size") || "small", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});
// 批量引入组件
import components from "./components";
Vue.use(components);

// 添加实例属性
Object.assign(Vue.prototype, {
  define: require("./utils/define"), // 常量
  ccit, // 公共方法
  formValidate: require("./utils/formValidate").default, // 表单验证
});

// 全局注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

const vm = new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});
export default vm;
