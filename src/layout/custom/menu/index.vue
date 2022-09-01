<template>
  <div class="menu">
    <div class="top-menu" id="topMenu">
      <el-menu
        :class="slideClass"
        mode="horizontal"
        :unique-opened="true"
        :default-active="activeMenu"
        @select="handleSelect"
      >
        <app-link v-for="item in list" :key="item.path" :to="item">
          <el-menu-item :index="item.enCode">
            <div class="redcirle" v-if="item.fullName === '督办管理'"></div>
            <item :title="generateTitle(item.vueName, item.fullName)" />
          </el-menu-item>
        </app-link>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import variables from "@/styles/variables.scss";
import { getMenuList } from "@/api/system/menu";
import { generateTitle } from "@/utils/i18n";
import Item from "./Item";
import AppLink from "./Link";

export default {
  components: { Item, AppLink },
  data() {
    return {
      list: [],
      activeMenu: ''
    };
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar", "menuList"]),
    ...mapState({
      slideClass: (state) => state.settings.slideClass,
    }),
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
  watch: {
    $route(to) {
      if(to.path === '/home') {
        this.handleSelect(this.list[0].enCode)
      }
    }
  },
  created() {
    getMenuList({
      keyword: "",
      category: "PortalMenu",
    })
      .then((res) => {
        let portalList = res.data.list;
        this.list = this.menuList.filter((menu) => {
          return portalList.some((item) => {
            return item.id === menu.id;
          });
        });
        if (this.list.length) {
          let index = this.list.findIndex(item => {
            return item.path === this.activeMenu
          })
          if(index === -1) {
            this.handleSelect(this.list[0].enCode);
          }
        }
      })
      .catch(() => {});
  },
  methods: {
    handleSelect(enCode) {
      this.activeMenu = enCode;
      let menu = this.list.find((item) => {
        return item.enCode === enCode;
      });
      let subMenu = [];
      if (menu.children) {
        subMenu = menu.children;
      } else {
        this.$router.push(menu.path)
      }
      this.$emit("on-select", subMenu);
    },
    generateTitle,
  },
};
</script>
<style scoped>
.redcirle{
  background: rgb(230, 27, 27);
  border-radius: 50%;
  height: 5px;
  width: 5px;
  position: absolute;
  right: 15px;
  top: 18px;
}
</style>