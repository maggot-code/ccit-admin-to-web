<template>
    <div class="parentContainer">
        <div class="headercolor">
            <navbar class="bar" />
        </div>
        <div class="app-wrapper custom">
            <div :class="[{ hasTagsView: needTagsView }]" class="main-container">
                <div :class="{ 'fixed-header': fixedHeader }" class="Menubg">
                    <Menu class="main-menu" @on-select="menuSelect" />
                </div>
                <div class="container">
                    <sidebar :menuList="subMenu" />
                    <app-main />
                </div>
            </div>
            <Footer class="footer" />
        </div>
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
        Sidebar,
    },
    mixins: [ResizeMixin],
    data() {
        return {
            subMenu: [],
        };
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
            this.subMenu = subMenu;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.custom {
    background: url("../../assets/images/newcustom/web-bj.png") #FFFFFF !important;
    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-color: #eff3fe;
}
.app-wrapper {
    @include clearfix;
    position: relative;
    // height: calc(100% - 50px);
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
    .gif {
        position: absolute;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .left {
        top: 0;
        left: -110px;
        // height: 300px;
        // width: 100px;
        z-index: 150;
    }
    .right {
        top: 0;
        // height: 300px;
        // width: 150px;
        right: -110px;
    }
    .left2 {
        top: 300px;
        left: -250px;
        height: 270px;
        width: 185px;
        z-index: 100;
    }
    .bottom {
        bottom: 10px;
        right: 100px;
        width: 120px;
        height: 120px;
    }
    .closebt {
        bottom: 110px;
        right: 100px;
        width: 18px;
        height: 18px;
    }
    .shanzi {
        bottom: 120px;
        right: 25px;
        width: 230px;
        height: 127px;
    }
}
.huan,
.tian,
.xi,
.di {
    width: 45px;
    height: 45px;
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
        height: 50px;
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

<style lang="scss" scoped>
.parentContainer {
    // background: url("../../assets/images/newcustom/web-bj.png");
    // background-size: 100%;
    // background-repeat: no-repeat;
    // background-color: #eff3fe;
}
.headercolor {
    background: url("../../assets/images/newcustom/Top_bj.png") repeat;
}
.bar {
    width: 1374px;
    margin: auto;
}
.parentContainer {
    width: 100%;
    height: 100%;
}
>>> .navbar .right-menu .right-menu-item {
    line-height: 60px !important;
}

</style>