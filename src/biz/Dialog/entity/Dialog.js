/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\entity\Dialog.js
 * @Author: maggot-code
 * @Date: 2022-09-15 15:05:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 10:00:23
 * @Description:
 */
import {
  provide,
  defineAsyncComponent,
  ref,
  computed,
  onBeforeUnmount,
} from "@vue/composition-api";
import DialogTmp from "@/views/dialog";

const defProps = {
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

export function Dialog(options = {}) {
  const { key, release, template } = options;
  const props = Object.assign({}, defProps, options.props);

  const visible = ref(true);
  const bind = computed(() => props);

  const toComponent = defineAsyncComponent(
    DialogTmp[template] ?? DialogTmp.unknow
  );

  provide(key, {});

  onBeforeUnmount(() => {
    release();
  });

  return {
    visible,
    bind,
    release,
    name: "DialogAdd",
    toComponent,
  };
}

export default Dialog;
