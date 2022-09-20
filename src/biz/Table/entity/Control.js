/*
 * @FilePath: \ccit-admin-to-web\src\biz\Table\entity\Control.js
 * @Author: maggot-code
 * @Date: 2022-09-20 11:16:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-20 13:41:13
 * @Description:
 */
import { unref, computed, ref } from "@vue/composition-api";
import SchemaFactory from "@/biz/shared/schema";

function toDrive() {
  const data = ref(Date.now());
  function refresh() {
    data.value = Date.now();
  }

  return {
    data,
    refresh,
  };
}

function toObject(list) {
  const data = {};
  if (!Array.isArray(list)) return data;

  list.forEach((item) => {
    const { mode } = item;
    data[mode] = item;
  });

  return data;
}

function AllController() {
  const schema = SchemaFactory([]);

  return schema;
}
function RowController() {
  const schema = SchemaFactory({});

  return schema;
}
function ResetPage() {
  const drive = toDrive();

  return drive;
}
function ResizeTable() {
  const drive = toDrive();

  return drive;
}

export function Control() {
  const all = AllController();
  const row = RowController();
  const reset = ResetPage();
  const resize = ResizeTable();
  const allController = computed(() => unref(all.data));
  const rowController = computed(() => unref(row.data));
  function setup(response) {
    const { controller } = response;

    all.setup(
      controller.filter((control) => {
        const { useAll } = control;
        return !!useAll;
      })
    );
    row.setup(
      toObject(
        controller.filter((control) => {
          const { useRow } = control;
          return !!useRow;
        })
      )
    );
  }

  return {
    all,
    row,
    reset,
    resize,
    allController,
    rowController,
    setup,
  };
}

export default Control;
