<template>
  <div :class="classObj" class="app-wrapper functional">
    <div :class="[slideClass, {hasTagsView:needTagsView === '1'}]" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView === '1'" />
      </div>
      <app-main />
      <cust-service />
      <note />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, TagsView, CustService, Note } from "./index";
import ResizeMixin from "../mixin/ResizeHandler";
import { mapState } from "vuex";

export default {
  name: "Functional",
  components: {
    AppMain,
    Navbar,
    TagsView,
    CustService,
    Note
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      themeClass: state => state.settings.themeClass,
      slideClass: (state) => state.settings.slideClass,
    }),
    classObj() {
      return {
        [this.themeClass]: true,
        // mobile: this.device === "mobile"
      };
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
#app .functional {
  .main-container {
    margin-left: 0;
  }
}
</style>