<template>
  <div>
    <el-submenu
      v-if="item.children && item.children.length"
      ref="subMenu"
      :index="item.path"
      popper-append-to-body
      :popper-class="`${slideClass} ${themeClass} ${layoutType}`"
      :key="item.path"
    >
      <template slot="title">
        <i :class="`${item.icon} left-icon`" />
        <span v-if="!collapse" slot="title">{{
          generateTitle(item.vueName, item.fullName)
        }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="child.path"
        class="nest-menu"
        :collapse="collapse"
      />
    </el-submenu>
    <template v-else>
      <app-link :to="item" :key="item.path">
        <el-menu-item
          :index="item.path"
          :id="item.path"
          :class="{ 'submenu-title-noDropdown': true }"
        >
          <i :class="`${item.icon} left-icon`" />
          <span slot="title">{{
            generateTitle(item.vueName, item.fullName)
          }}</span>
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>


<script>
import { mapState } from "vuex";
import path from "path";
import { generateTitle } from "@/utils/i18n";
import { isExternal } from "@/utils/validate";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      slideClass: (state) => state.settings.slideClass,
      themeClass: (state) => state.settings.themeClass,
      layoutType: (state) => state.settings.layoutType,
    }),
  },
  data() {
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        // return false
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    generateTitle,
  },
};
</script>
