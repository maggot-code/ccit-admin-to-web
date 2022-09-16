/*
 * @FilePath: \ccit-admin-to-web\src\store\user.router\index.js
 * @Author: maggot-code
 * @Date: 2022-09-09 14:02:36
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 09:58:55
 * @Description:
 */
import { TemplateAccess, TemplateKeys } from "./template";

// 定义业务模板的共享路由
// 会在该路由组件下集成业务模板所需的一些能力，并注入到下层组件中
const BizTemplateRouter = {
  component: (resolve) => require(["@/views/biz"], resolve),
  path: "/biz",
  name: "Biz",
  hidden: true,
  meta: {
    title: "Biz",
    icon: "icon-ym icon-ym-nav-home",
    affix: false,
    zhTitle: "业务",
  },
  children: [],
};
function setupChild(router) {
  BizTemplateRouter.children.push(router);
}
function clearChild() {
  BizTemplateRouter.children = [];
}

// 使用模板，生成业务路由，扩展和变更菜单属性
function useTemplate({ template, router }) {
  const { extend, vueRouter, hasAppend } = template(router);

  return {
    hasAppend,
    vueRouter,
    extendRouter: extend,
  };
}

// 校验模板类型是否存在
export function isBizRouter(router) {
  const { type } = router;

  return TemplateKeys.includes(type);
}

export function useBizRouter() {
  clearChild();

  function setupBizRouter(rawRouter) {
    const { type, enCode } = rawRouter;
    const codeMap = enCode.split(".");
    const urlAddress = codeMap.join("/");
    const path = `/${urlAddress}`;
    const router = Object.assign({}, rawRouter, {
      path,
      urlAddress,
      codeMap,
    });
    const { hasAppend, vueRouter, extendRouter } = useTemplate({
      template: TemplateAccess[type],
      router,
    });
    hasAppend && setupChild(vueRouter);
    return extendRouter;
  }

  return {
    bizRouter: BizTemplateRouter,
    setupBizRouter,
  };
}

export default useBizRouter;
