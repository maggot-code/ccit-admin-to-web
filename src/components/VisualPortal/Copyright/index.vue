<template>
  <div class="copyright" :style="[cardStyle, footText]">
    <span :style="textStyle(item)" v-for="(item, index) in list" :key="index"
      >{{ item.text }}<br
    /></span>
  </div>
</template>
<script>
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  props: {
    item: { type: Object, default: () => {} },
  },
  data() {
    return {
      list: [],
      themeList: [],
      hasMore: true,
      currentPage: 1,
      activeTheme: "",
    };
  },
  watch: {
    "item.list": {
      handler(val) {
        this.list = val;
      },
      deep: true,
    },
  },
  created() {
    this.list = this.item.list;
  },
  computed: {
    footText() {
      return {
        alignItems: this.item.textPosition,
      };
    },
    textStyle() {
      return (item) => {
        return {
          color: item.color,
          fontSize: item.fontSize + "px",
        };
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.copyright {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>