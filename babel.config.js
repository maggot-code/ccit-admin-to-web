/*
 * @FilePath: \ccit-admin-to-web\babel.config.js
 * @Author: maggot-code
 * @Date: 2022-02-23 10:01:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 18:18:45
 * @Description:
 */
module.exports = {
  presets: ["@vue/app"],
  env: {
    development: {
      plugins: [
        "dynamic-import-node",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining",
      ],
    },
  },
  sourceType: "unambiguous",
};
