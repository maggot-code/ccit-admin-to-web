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
            <!-- <div class="redcirle" v-if="item.fullName === '督办管理'"></div> -->
            <item :title="generateTitle(item.vueName, item.fullName)" />
          </el-menu-item>
        </app-link>
      </el-menu>
    </div>
    <div class="date">
      {{ date }}&nbsp;
      {{ week }}
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
import { formatDate } from "@/utils/moment.js";

export default {
  components: { Item, AppLink },
  data() {
    return {
      list: [],
      activeMenu: "",
      date: "",
      week: "",
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
      for (let i = 0; i < this.list.length; i++) {
        let children = this.list[i].children;
        if (children) {
          for (let j = 0; j < children.length; j++) {
            if (children[j].path === to.path) {
              this.handleSelect(this.list[i].enCode);
              return;
            }
          }
        } else {
          if (this.list[i].path === to.path) {
            this.handleSelect(this.list[i].enCode);
            return;
          }
        }
      }
      this.activeMenu = "";
      this.$emit("on-select", []);
    },
  },
  created() {
    getMenuList({
      keyword: "",
      category: "PortalMenu",
    })
      .then((res) => {
        let path = this.$route.path;
        let portalList = res.data.list;
        this.list = this.menuList.filter((menu) => {
          return portalList.some((item) => {
            return item.id === menu.id;
          });
        });
        if (this.list.length) {
          for (let i = 0; i < this.list.length; i++) {
            let children = this.list[i].children;
            if (children) {
              for (let j = 0; j < children.length; j++) {
                if (children[j].path === path) {
                  this.handleSelect(this.list[i].enCode);
                  return;
                }
              }
            } else {
              if (this.list[i].path === path) {
                this.handleSelect(this.list[i].enCode);
                return;
              }
            }
          }
        }
      })
      .catch(() => {});
    this.getDate();
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
        this.$router.push(menu.path);
      }
      this.$emit("on-select", subMenu);
    },
    generateTitle,
    getDate() {
      let date = new Date();
      this.date = formatDate(date, "yyy年MM月DD日");
      this.week = formatDate(date, "dddd");
    },
  },
};
</script>
<style lang="scss" scoped>
.menu {
  position: relative;
  .date {
    position: absolute;
    right: 30px;
    top: 0;
    height: 50px;
    line-height: 50px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #8DC5FF;
    font-size: 14px;
  }
  .top-menu {
    background-size: 100% 100%;
    background-image: url("../../../assets/images/newcustom/menu.png");
  }
}

.redcirle {
  background: rgb(230, 27, 27);
  border-radius: 50%;
  height: 5px;
  width: 5px;
  position: absolute;
  right: 15px;
  top: 18px;
}
#app .custom .top-menu .el-menu.el-menu--horizontal {
  background-color: transparent !important;
}
#app .custom .top-menu .el-menu .el-menu-item,
#app .custom .top-menu .el-menu .el-submenu__titleP {
  color: #0F59A4;
}
#app .custom .top-menu .el-menu .el-menu-item.is-active span,
#app .custom .top-menu .el-menu .el-submenu__title.is-active span {
  border-bottom: 3px solid #0F59A4;
  padding-bottom: 8px;
}
#app .custom .top-menu .el-menu {
  height: 50px;
}
#app .custom .top-menu .el-menu .el-menu-item,
#app .custom .top-menu .el-menu .el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
}
</style>