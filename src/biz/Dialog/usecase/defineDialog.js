/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\usecase\defineDialog.js
 * @Author: maggot-code
 * @Date: 2022-09-15 14:25:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 13:09:31
 * @Description:
 */
import {
  provide,
  onUnmounted,
  unref,
  ref,
  computed,
} from "@vue/composition-api";
import { v4 as uuidv4 } from "uuid";
import { DialogStore, getStore } from "@/biz/Dialog/entity/Store";
import { Dialog } from "@/biz/Dialog/entity/Dialog";

export function releaseDialog() {
  DialogStore.clear();
}

export function defineDialog(options = {}) {
  const { namespace } = options;
  const cache = ref([]);
  const dialogs = computed(() =>
    unref(cache)
      .map(getStore)
      .filter(Boolean)
  );
  function deleteDialog(key) {
    const index = unref(cache).findIndex((item) => item === key);
    if (index <= -1) return;

    DialogStore.delete(unref(cache)[index]);
    unref(cache).splice(index, 1);
  }
  function setupDialog(config = {}) {
    const { template, bind, title } = config;
    const keyword = uuidv4();
    const store = Dialog({
      keyword,
      template,
      bind: bind ?? {},
      title: title ?? {},
      release: () => deleteDialog(keyword),
    });

    unref(cache).push(keyword);
    DialogStore.set(keyword, store);
    return [store, true];
  }

  provide(namespace, { setupDialog, deleteDialog });

  onUnmounted(() => {
    unref(cache).forEach(deleteDialog);
  });

  return {
    dialogs,
    setupDialog,
    deleteDialog,
  };
}

export default defineDialog;
