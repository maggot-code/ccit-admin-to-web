/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\entity\Dialog.js
 * @Author: maggot-code
 * @Date: 2022-09-15 15:05:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 11:28:25
 * @Description:
 */
import { defineAsyncComponent, ref, computed } from "@vue/composition-api";
import { pickProps } from "@/biz/Dialog/shared/utils";
import DialogTmp from "@/views/dialog";
import DialogTitleProps from "@/biz/Dialog/shared/props/title";

const defaultBind = {
  fullscreen: false,
  modal: true,
  modalAppendToBody: true,
  appendToBody: true,
  lockScroll: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  showClose: false,
  center: false,
  destroyOnClose: true,
  customClass: "biz-dialog",
  width: "50%",
};

const defaultTitle = pickProps(DialogTitleProps);

export function Dialog(options = {}) {
  const { keyword, template, release } = options;
  const rawBind = Object.assign({}, defaultBind, options.bind);
  const rawTitle = Object.assign({}, defaultTitle, options.title);

  const visible = ref(true);
  const bind = computed(() => rawBind);
  const title = computed(() => rawTitle);

  const toComponent = defineAsyncComponent(
    DialogTmp[template] ?? DialogTmp.unknow
  );

  console.log(keyword);
  return {
    visible,
    bind,
    title,
    release,
    toComponent,
  };
}

export default Dialog;
