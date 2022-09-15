/*
 * @FilePath: \ccit-admin-to-web\src\biz\Dialog\entity\Dialog.js
 * @Author: maggot-code
 * @Date: 2022-09-15 15:05:19
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 18:02:03
 * @Description:
 */
import {
  defineAsyncComponent,
  ref,
  computed,
  onBeforeUnmount,
} from "@vue/composition-api";

const aa = {
  add: () => import(`@/views/dialog/add`),
  edit: () => import(`@/views/dialog/edit`),
};

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
  const { release, template } = options;
  const props = Object.assign({}, defProps, options.props);

  const visible = ref(true);
  const bind = computed(() => props);

  // `../../../views/dialog/add/index.vue`;
  // 动态加载vue3组件
  const toComponent = defineAsyncComponent(aa[template] ?? aa.add);

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
