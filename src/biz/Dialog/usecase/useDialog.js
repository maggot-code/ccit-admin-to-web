/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\usecase\useDialog.js
 * @Author: maggot-code
 * @Date: 2022-09-16 10:08:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 10:19:57
 * @Description:
 */
import { inject } from "@vue/composition-api";

function setupDialog() {
  console.log("setup dialog");
  return [false];
}
function deleteDialog() {
  console.log("delete dialog");
}

const InjectHandler = {
  setupDialog,
  deleteDialog,
};

export function useDialog(options = {}) {
  const { namespace } = options;

  const handler = inject(namespace, InjectHandler);

  return {
    handler,
  };
}

export default useDialog;
