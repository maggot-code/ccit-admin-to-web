/*
 * @FilePath: \ccit-admin-to-web\src\biz\Search\entity\Schema.js
 * @Author: maggot-code
 * @Date: 2022-09-19 17:42:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-19 18:10:04
 * @Description:
 */
import { unref, computed, shallowRef } from "@vue/composition-api";

function FormSchema() {
  const data = shallowRef({});
  const len = computed(() => Object.keys(unref(data)).length);
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
function CellSchema() {
  const data = shallowRef([]);
  const len = computed(() => unref(data).length);
  const usable = computed(() => unref(cellSchemaLen) > 0);
  const unusable = computed(() => !unref(usable));
  function setup(value) {
    data.value = value ?? [];
  }

  return {
    data,
    len,
    usable,
    unusable,
    setup,
  };
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
