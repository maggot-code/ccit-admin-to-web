/*
 * @FilePath: \ccit-admin-to-web\src\biz\Table\entity\Schema.js
 * @Author: maggot-code
 * @Date: 2022-09-20 11:16:17
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 11:28:02
 * @Description:
 */
import { unref, computed } from "@vue/composition-api";
import SchemaFactory from "@/biz/shared/schema";

function UISchema() {
  const schema = SchemaFactory({});

  return schema;
}

function ColumnSchema() {
  const schema = SchemaFactory([]);

  return schema;
}

export function Schema() {
  const ui = UISchema();
  const column = ColumnSchema();
  const uiSchema = computed(() => unref(ui.data));
  const columnSchema = computed(() => unref(column.data));
  function setup(response) {
    ui.setup(response?.uiSchema);
    column.setup(response?.columnSchema);
  }

  return {
    ui,
    column,
    uiSchema,
    columnSchema,
    setup,
  };
}

export default Schema;
