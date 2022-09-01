<template>
    <div class="parentContainer">
        <div class="headercolor">
            <navbar class="bar" />
        </div>
        <div class="app-wrapper custom">
            <div :class="[{ hasTagsView: needTagsView === '1' }]" class="main-container">
                <div :class="{ 'fixed-header': fixedHeader }" class="Menubg">
                    <Menu class="main-menu" @on-select="menuSelect" />
                </div>
                <div class="container">
                    <sidebar :menuList="subMenu" />
                    <app-main />
                </div>
                <div class="gif left">
                    <img src="../../assets/images/custom2/A01.png" />
                </div>
                <div class="gif right">
                    <img src="../../assets/images/custom2/A02.png" />
                </div>
                
                <transition name="fade2">
                    <div class="gif bottom" @mouseover="shanziIsshow" @mouseleave="closesanzi" ref="laohu" v-show="tigerDIv">
                        <img :src="tiger" />
                        <!-- <img src="../../assets/images/custom2/tiger/G44-(5).gif" /> -->
                    </div>
                </transition>
                <div class="gif left2">
                    <img src="../../assets/images/custom2/A03.png" />
                </div>
                <transition name="fade">
                    <div class="gif shanzi" ref="shanzi" v-show="shanzi" @mouseover="shanzicontent" @mouseleave="closesanzi">
                        <img src="../../assets/images/custom2/tiger/shanzi.png" />
                        <div class="huan" @click="chooseimg('huan')"></div>
                        <div class="tian" @click="chooseimg('tian')"></div>
                        <div class="xi" @click="chooseimg('xi')"></div>
                        <div class="di" @click="chooseimg('di')"></div>
                    </div>
                </transition>
                <div v-show="close" class="gif closebt">
                    <img src="../../assets/images/custom2/tiger/close.png" @click="closebt" />
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
            shanzi: false,
            tiger: require(`@/assets/images/custom2/tiger/G44-(5).gif`),
            tigerDIv: true,
            close: true
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
        shanziIsshow() {

            this.shanzi = true
            // setTimeout(res => {
            //     console.log(this.shanzi)
            //     this.shanzi = false
            // }, 5000)
        },
        shanzicontent() {
            this.shanzi = true
        },
        closesanzi() {
            this.shanzi = false
        },
        chooseimg(data) {
            if (data == 'huan') {
                this.tiger = require('../../assets/images/custom2/tiger/G44-(86).gif')
                this.$refs.laohu.style = "right:80px"
                // this.shanzi = false
            } else if (data == 'tian') {
                this.tiger = require('../../assets/images/custom2/tiger/G44-(87).gif')
                this.$refs.laohu.style = "right:80px"
                // this.shanzi = false
            } else if (data == 'xi') {
                this.tiger = require('../../assets/images/custom2/tiger/G44-(88).gif')
                this.$refs.laohu.style = "right:80px"
                // this.shanzi = false
            } else if (data == 'di') {
                this.tiger = require('../../assets/images/custom2/tiger/G44-(89).gif')
                this.$refs.laohu.style = "right:80px"
                // this.shanzi = false
            }
        },
        closebt() {
            this.shanzi = false
            this.tigerDIv = false
            this.close = false
        }
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.custom {
    background: url("../../assets/images/custom2/web-bj.png") #95252a !important;
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
.huan {
    position: absolute;
    top: 35px;
    left: 25px;
    background: url("../../assets/images/custom2/tiger/a1.png") no-repeat;
    background-size: cover;
}
.tian {
    position: absolute;
    top: 15px;
    left: 70px;
    background: url("../../assets/images/custom2/tiger/a2.png") no-repeat;
    background-size: cover;
}
.xi {
    position: absolute;
    top: 15px;
    right: 70px;
    background: url("../../assets/images/custom2/tiger/a3.png") no-repeat;
    background-size: cover;
}
.di {
    position: absolute;
    top: 35px;
    right: 25px;
    background: url("../../assets/images/custom2/tiger/a4.png") no-repeat;
    background-size: cover;
}
.huan:hover {
    position: absolute;
    top: 35px;
    left: 25px;
    background: url("../../assets/images/custom2/tiger/b1.png") no-repeat;
    background-size: cover;
}
.tian:hover {
    position: absolute;
    top: 15px;
    left: 70px;
    background: url("../../assets/images/custom2/tiger/b2.png") no-repeat;
    background-size: cover;
}
.xi:hover {
    position: absolute;
    top: 15px;
    right: 70px;
    background: url("../../assets/images/custom2/tiger/b3.png") no-repeat;
    background-size: cover;
}
.di:hover {
    position: absolute;
    top: 35px;
    right: 25px;
    background: url("../../assets/images/custom2/tiger/b4.png") no-repeat;
    background-size: cover;
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
    // background: url("../../assets/images/custom2/web-bj.png");
    // background-size: 100%;
    // background-repeat: no-repeat;
    // background-color: #eff3fe;
}
.headercolor {
    background: url("../../assets/images/custom2/Top_bj.png") repeat;
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
.Menubg {
    // height: 50px ;
    // padding: 0 ;
    // background: url("../../assets/images/custom2/menu.png") !important;
    // background-repeat: no-repeat !important;
    // background-position-y: 100%;
    // background-position-x: 100%;
    // background-color: #eff3fe;
}
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 1s;
}
.fade2-enter {
    opacity: 0;
}
.fade2-enter-active {
    transition: opacity 0.5s;
}
</style>