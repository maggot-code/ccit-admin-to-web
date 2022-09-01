<template>
  <div class="app-wrapper custom">
    <div :class="[{hasTagsView:needTagsView === '1'}]" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <Menu class="main-menu" @on-select="menuSelect" />
      </div>
      <div class="container">
        <sidebar :menuList="subMenu" />
      <app-main />
      </div>
      
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import { AppMain, Navbar, TagsView, Footer, Sidebar } from "./index";
import ResizeMixin from "../mixin/ResizeHandler";
import { mapState } from "vuex";
import Menu from "./menu";
export default {
  name: "Custom",
  components: {
    AppMain,
    Navbar,
    TagsView,
    Menu,
    Footer,
    Sidebar
  },
  mixins: [ResizeMixin],
  data() {
    return {
      subMenu: []
    }
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
      themeClass: (state) => state.settings.themeClass,
      slideClass: (state) => state.settings.slideClass,
    }),
    classObj() {
      return {
        [this.themeClass]: true,
      };
    },
  },
  methods: {
    menuSelect(subMenu) {
      this.subMenu = subMenu
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  // height: calc(100% - 50px);
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
  .main-menu {
    flex: 1;
    overflow: hidden;
    height: 60px;
  }
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>