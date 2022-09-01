<template>
  <div :class="classObj">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in list"
          :key="route.enCode"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { getMenuList } from "@/api/system/menu";
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar", "menuList"]),
    ...mapState({
      slideClass: (state) => state.settings.slideClass,
    }),
    classObj() {
      return {
        [this.slideClass]: true,
        "has-logo": this.showLogo,
      };
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if (meta.activeMenu) {
      //   return meta.activeMenu
      // }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  created() {
    getMenuList({
      keyword: "",
      category: "Web",
    })
    .then((res) => {
      let webList = res.data.list;
      this.list = this.menuList.filter((menu) => {
        return webList.some((item) => {
          return item.id === menu.id;
        });
      });
    })
    .catch(() => {});
  },
};
</script>
<style lang="scss" >
@import "../../../styles/variables.scss";
@import "../../../styles/sidebar.scss";
</style>