<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/validate";
export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
  },
  methods: {
    linkProps(to) {
      if (to.children) {
        return {
          is: "div"
        };
      }
      var url = to.path;
      if (isExternal(url)) {
        if (!(to.type === 7 && to.linkTarget === "_blank")) {
          if (url.indexOf("?") != -1) {
            url = "&modelId=" + to.id;
          }
        }
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener",
        };
      }
      return {
        is: "router-link",
        to: url + "?modelId=" + to.id,
      };
    },
  },
};
</script>
