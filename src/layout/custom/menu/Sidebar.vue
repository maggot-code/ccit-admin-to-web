<template>
  <div
    v-show="menuList.length"
    :class="['sidebar', isCollapse ? 'collapse' : '']"
  >
    <div class="sidebar-icon">
      <i
        :class="['ym-custom', collapseIcon]"
        @click="isCollapse = !isCollapse"
      ></i>
    </div>
    <el-menu
      class="sidebar-menu"
      :default-active="activeMenu"
      :collapse="isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in menuList"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        :collapse="isCollapse"
      />
    </el-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SidebarItem from "./SidebarItem";
export default {
  components: { SidebarItem },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapState({
      slideClass: (state) => state.settings.slideClass,
      themeClass: (state) => state.settings.themeClass,
      layoutType: (state) => state.settings.layoutType,
    }),
    collapseIcon() {
      return this.isCollapse
        ? "ym-custom-view-parallel"
        : "ym-custom-view-sequential";
    },
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
      }
  },
  watch: {
    menuList(val) {
      if (val.length) {
        this.$nextTick(() => {
          document.getElementById(val[0].path).click();
        });
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  min-height: calc(100vh - 210px);
  background-color: #fff;
  margin-right: 10px;
  margin-bottom: 20px;
  &-icon {
    width: 100%;
    color: #666;
    text-align: center;
    padding: 10px 0;
    border-right: solid 1px #e6e6e6;
    i {
      font-size: 20px;
    }
  }
  .left-icon {
    margin-right: 10px;
  }
  &-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
.collapse >>> .el-icon-arrow-right {
display: none;
}
</style>