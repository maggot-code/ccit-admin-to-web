/*
 * @FilePath: \ccit-admin-to-web\src\biz\Table\usecase\defineTable.js
 * @Author: maggot-code
 * @Date: 2022-09-20 11:13:10
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 13:25:01
 * @Description:
 */
import { onBeforeUnmount } from "@vue/composition-api";

import Table from "../entity/Table";
import Control from "../entity/Control";
import Schema from "../entity/Schema";

export function defineTable() {
  const table = Table();
  const control = Control();
  const schema = Schema();

  onBeforeUnmount(table.toNotReady);

  const template = {
    ...table.other,
    tableReady: table.isReady,
    tableRefs: table.refs,
    resetCurrentPage: control.reset.data,
    resizeTable: control.resize.data,
    allController: control.allController,
    rowController: control.rowController,
    uiSchema: schema.uiSchema,
    columnSchema: schema.columnSchema,
  };
  return {
    template,
    table,
    control,
    schema,
  };
}

export default defineTable;
