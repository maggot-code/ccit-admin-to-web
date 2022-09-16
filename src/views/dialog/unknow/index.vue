<!--
 * @FilePath: \ccit-admin-to-web\src\views\dialog\unknow\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-16 09:35:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-16 10:00:40
 * @Description: 
-->
<template>
  <div class="biz biz-unknow">unknow</div>
</template>

<script>
import { inject } from "@vue/composition-api";
export default {
  name: "BizUnknow",
  mixins: [],
  components: {},
  props: {
    keyword: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    console.log(props.keyword);

    return {};
  },
};
</script>
<style lang="scss" scoped></style>
