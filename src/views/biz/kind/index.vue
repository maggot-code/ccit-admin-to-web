<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\kind\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-09 13:54:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-15 11:08:50
 * @Description: 
-->
<template>
  <router-view></router-view>
</template>

<script>
import { provide } from "@vue/composition-api";
import { useTmpParams } from "@/biz/Template/usecase/useTmpParams";
import { ListConfigSymbolKey } from "@/biz/Template/shared/context";

import { mockRequest } from "@/biz/shared/mock";
import MockResponse from "@/biz/Template/__test__/response/test-table.v2.json";
export default {
  name: "BizKind",
  props: {},
  setup(props) {
    const { config } = useTmpParams();

    provide(ListConfigSymbolKey, () => {
      return mockRequest("/api", MockResponse).then((res) => {
        const controller = res.controller.map((item) => {
          item.useAll = false;
          return item;
        });

        return Object.assign({}, res, { controller });
      });
    });

    return {};
  },
};
</script>
<style lang="scss" scoped></style>
