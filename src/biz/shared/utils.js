/*
 * @FilePath: \ccit-admin-to-web\src\biz\shared\utils.js
 * @Author: maggot-code
 * @Date: 2022-09-13 10:48:05
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 10:52:22
 * @Description:
 */
// 设置首字母大写
export function firstUpperCase(str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1);
}

// 使用命名空间限定属性
export function toNamespace(namespace, obj) {
  if (namespace.length <= 0) return obj;

  return Object.keys(obj).reduce((acc, key) => {
    acc[`${namespace}${firstUpperCase(key)}`] = obj[key];
    return acc;
  }, {});
}

export default {};
