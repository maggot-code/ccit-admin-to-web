/*
 * @FilePath: \ccit-admin-to-web\src\store\modules\user.router.js
 * @Author: maggot-code
 * @Date: 2022-09-09 09:48:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 13:53:33
 * @Description:
 */
// 业务路由类型白名单
const bizRouterTypeWhiteList = ["100", "101"];

// 基础业务路由 负责挂载业务模块下的共享组件
const baseBizRouter = {
  path: "/biz",
  component: (resolve) => require(["@/views/biz"], resolve),
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

export function useBizRouter() {
  baseBizRouter.children = [];

  function isBizRouter(router) {
    const { type } = router;
    return bizRouterTypeWhiteList.includes(`${type}`);
  }

  function setupBizRouter(router) {
    const { type, enCode } = router;
    const name = enCode.replace(/\./g, "-");
    const codeMap = enCode.split(".");

    router.vueName = name;

    if (type == 100) {
      const tmp = codeMap.pop();
      const urlAddress = codeMap.join("/");
      router.path = `/${urlAddress}/${tmp}`;
      router.urlAddress = router.path;
      baseBizRouter.children.push({
        path: `/${urlAddress}`,
        component: (resolve) => require([`@/views/${urlAddress}`], resolve),
        name: enCode,
        children: [
          {
            path: router.path,
            component: (resolve) => require([`@/views/biz/${tmp}`], resolve),
            name: `${enCode}Model`,
            meta: {
              title: name,
              icon: router.icon,
              zhTitle: router.fullName,
              modelId: router.id,
            },
          },
        ],
      });
    }

    // tmp = CURD
    if (type == 101) {
      const urlAddress = codeMap.join("/");
      router.path = `/${urlAddress}`;
      router.urlAddress = urlAddress;
      baseBizRouter.children.push({
        path: router.path,
        component: (resolve) => require([`@/views/biz/curd`], resolve),
        name: enCode,
        meta: {
          title: name,
          icon: router.icon,
          zhTitle: router.fullName,
          modelId: router.id,
        },
      });
    }

    return router;
  }

  return {
    bizRouter: baseBizRouter,
    isBizRouter,
    setupBizRouter,
  };
}

export default useBizRouter;
