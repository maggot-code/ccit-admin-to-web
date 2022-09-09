/*
 * @FilePath: \ccit-admin-to-web\src\router\modules\biz.js
 * @Author: maggot-code
 * @Date: 2022-09-09 09:09:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 09:33:51
 * @Description:
 */
// 业务路由
const bizRouter = [
  {
    path: "/biz",
    component: (resolve) => require(["@/views/biz"], resolve),
    name: "Biz",
    meta: {
      title: "Biz",
      icon: "icon-ym icon-ym-nav-home",
      hidden: true,
      affix: false,
      zhTitle: "业务",
    },
    children: [
      {
        path: "/biz/curd",
        component: (resolve) => require(["@/views/biz/curd"], resolve),
        name: "BizCurd",
        meta: {
          title: "BizCurd",
          icon: "icon-ym icon-ym-nav-home",
          affix: false,
          zhTitle: "业务-CURD",
        },
      },
    ],
  },
];

export default bizRouter;
