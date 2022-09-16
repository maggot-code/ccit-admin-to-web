/*
 * @FilePath: \ccit-admin-to-web\src\store\user.router\template.js
 * @Author: maggot-code
 * @Date: 2022-09-09 14:04:00
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 09:58:37
 * @Description:提供给用户路由用作模板匹配使用，这里主要是实现了自定义的扩展，项目中原本携带的依然可以正常使用
 *
 * 整个文件中所有方法都是带有副作用的方法
 * 使用的时候需要注意
 *
 * 绑定模板方法返回值需要严格按照下面的格式返回
 * @return {Object} { extend, vueRouter, hasAppend }
 * extend: 扩展属性，用来对写入的 router 对象进行扩展
 * vueRouter: 生成的 vue-router 对象
 * hasAppend: 校验是否需要追加到模板路由中
 */
import { toMeta } from "./shared";

// 100 用于扩展模板
export function bindExtendTemplate(router) {
  const { codeMap } = router;
  const tmp = codeMap.at(-1);
  const urlAddress = codeMap.slice(0, -1).join("/");
  const path = `/${urlAddress}/${tmp}`;
  const extend = Object.assign({}, router, {
    tmp,
    path,
    urlAddress: `${urlAddress}/${tmp}`,
  });
  const vueRouter = {
    component: (resolve) => require([`@/views/${urlAddress}`], resolve),
    path: `/${urlAddress}`,
    name: extend.enCode,
    children: [
      {
        component: (resolve) => require([`@/views/biz/${tmp}`], resolve),
        path,
        name: `${extend.enCode}.model`,
        meta: toMeta(extend),
      },
    ],
  };

  return {
    hasAppend: true,
    vueRouter,
    extend,
  };
}

// 101 增删改查模板
export function bindCurdTemplate(router) {
  const vueRouter = {
    component: (resolve) => require([`@/views/biz/curd`], resolve),
    path: router.path,
    name: router.enCode,
    meta: toMeta(router),
  };

  return {
    hasAppend: true,
    vueRouter,
    extend: router,
  };
}

export const TemplateAccess = {
  "100": bindExtendTemplate,
  "101": bindCurdTemplate,
};
export const TemplateKeys = Reflect.ownKeys(TemplateAccess);
export default TemplateAccess;
