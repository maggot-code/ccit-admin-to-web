/*
 * @FilePath: \ccit-admin-to-web\src\store\modules\permission.js
 * @Author: maggot-code
 * @Date: 2022-02-23 10:01:13
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 09:55:14
 * @Description:
 */
import { constantRoutes } from "@/router";
/* Layout */
import Layout from "@/layout";
import baseRouters from "@/router/modules/base";

const state = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes({ commit }, route) {
    return new Promise((resolve) => {
      let accessedRoutes;
      let dtRoutes = {
        path: "/",
        component: Layout,
        redirect: "/home",
        children: [
          ...baseRouters,
          ...route,
          // {
          //   path: '/404',
          //   component: (resolve) => require(['@/views/error-page/404'], resolve),
          //   hidden: true
          // },
        ],
      };
      accessedRoutes = [
        dtRoutes,
        {
          path: "*",
          redirect: "/404",
          hidden: true,
        },
      ];
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true, //需要加上所属的模块名
  state,
  mutations,
  actions,
};
