/*
 * @FilePath: \ccit-admin-to-web\src\biz\Core\Form\entity\Schema.js
 * @Author: maggot-code
 * @Date: 2022-09-20 09:25:00
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 09:44:32
 * @Description:
 */
import { unref, computed, shallowRef } from "@vue/composition-api";

function SchemaFactory(parts) {
  const data = shallowRef(parts ?? {});
  const len = computed(() => {
    return Array.isArray(unref(data))
      ? unref(data).length
      : Object.keys(unref(data)).length;
  });
  const usable = computed(() => unref(len) > 0);
  const unusable = computed(() => !unref(usable));
  function setup(value) {
    data.value = value ?? {};
  }

  return {
    data,
    len,
    usable,
    unusable,
    setup,
  };
}

function FormSchema() {
  const schema = SchemaFactory({});

  return schema;
}

function CellSchema() {
  const schema = SchemaFactory([]);

  return schema;
}

export function Schema() {
  const form = FormSchema();
  const cell = CellSchema();
  const formSchema = computed(() => unref(form.data));
  const cellSchema = computed(() => unref(cell.data));
  function setup(response) {
    form.setup(response?.formSchema);
    cell.setup(response?.cellSchema);
  }
  return {
    formSchema,
    cellSchema,
    setup,
  };
}

export default Schema;
