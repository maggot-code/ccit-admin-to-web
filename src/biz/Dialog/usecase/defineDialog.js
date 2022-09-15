/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\usecase\defineDialog.js
 * @Author: maggot-code
 * @Date: 2022-09-15 14:25:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 18:01:38
 * @Description:
 */
import Vue from "vue";
import { onUnmounted, unref, ref, computed } from "@vue/composition-api";
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
    console.log(key);
    const index = unref(cache).findIndex((item) => item === key);
    if (index <= -1) return;

    DialogStore.delete(unref(cache)[index]);
    unref(cache).splice(index, 1);
  }
  function setupDialog(props = {}) {
    const key = uuidv4();
    const store = Dialog({
      props,
      release: () => deleteDialog(key),
    });

    unref(cache).push(key);
    DialogStore.set(key, store);
  }

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
