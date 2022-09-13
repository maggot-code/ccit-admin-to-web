/*
 * @FilePath: \ccit-admin-to-web\src\biz\Template\usecase\useRouterQuery.js
 * @Author: maggot-code
 * @Date: 2022-09-13 11:12:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 11:20:33
 * @Description:
 */
import { computed } from "";

// router参数暂时没有用到，后面可能会用到
export function useRouterQuery(route, router) {
  // 后面meta中也可能会携带参数
  const { params, query } = route;
  const gather = computed(() => {
    return Object.assign({}, params, query);
  });

  return {
    gather,
  };
}

export default useRouterQuery;
