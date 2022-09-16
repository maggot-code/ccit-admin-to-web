/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\shared\utils.js
 * @Author: maggot-code
 * @Date: 2022-09-16 11:21:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 11:21:59
 * @Description:
 */
export function pickProps(props) {
  const data = {};
  Object.keys(props).forEach((key) => {
    data[key] = props[key].default;
  });
  return data;
}

export default {};
