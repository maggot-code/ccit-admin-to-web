/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\shared\props\title.js
 * @Author: maggot-code
 * @Date: 2022-09-16 11:20:12
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 13:07:23
 * @Description:
 */
import defaultConfig from "@/settings";
export default {
  text: {
    type: String,
    default: defaultConfig.title,
  },
  release: {
    type: Function,
    default: () => {},
  },
};
