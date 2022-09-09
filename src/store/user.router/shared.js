/*
 * @FilePath: \ccit-admin-to-web\src\store\user.router\shared.js
 * @Author: maggot-code
 * @Date: 2022-09-09 17:53:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-09 17:54:37
 * @Description:
 */
// modelId 后面会对接具体业务，需要加入对应逻辑，所以单独声明变量出来方便后面修改
export function toMeta(router) {
  const { id, icon, fullName: zhTitle, name: title } = router;
  const modelId = id;
  return {
    modelId,
    icon,
    zhTitle,
    title,
  };
}
