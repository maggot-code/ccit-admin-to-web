/*
 * @FilePath: \ccit-admin-to-web\src\biz\Tmp\DataSource\usecase\useDataAction.js
 * @Author: maggot-code
 * @Date: 2022-09-20 14:36:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 15:04:25
 * @Description:
 */
export function useDataAction(options) {
  const { list } = options;
  const { table } = list;

  function tableHandle(target) {
    table.data.setup(target);
  }

  return {
    tableHandle,
  };
}

export default useDataAction;
