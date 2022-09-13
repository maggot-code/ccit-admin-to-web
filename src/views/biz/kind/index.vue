<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\kind\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-09 13:54:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-13 14:23:19
 * @Description: 
-->
<template>
  <router-view></router-view>
</template>

<script>
import { useTmpParams } from "@/biz/Template/usecase/useTmpParams";
import { useListConfig } from "@/biz/Template/usecase/useIntercept";
export default {
  name: "BizKind",
  props: {},
  setup(props) {
    const { config } = useTmpParams();

    const { setupListConfig } = useListConfig(config);

    setupListConfig(() => {
      console.log("我是kind的列表配置");
      return {};
    });

    return {};
  },
};
</script>
<style lang="scss" scoped></style>
