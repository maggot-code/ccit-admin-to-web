<template>
    <el-card :class="['commonFunc-box', titleColor]" :style="cardStyle"  v-loading="loading">
        <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
            <div class="left">
                <div v-if="showBlock" class="block" :style="blockStyle"></div>
                <template v-if="tabs.length === 1">
                    <i v-if="showIcon" :class="tabs[0].icon" style="font-size: 18px"></i>
                    <span v-if="showTitle">{{ tabs[0].title }}</span>
                </template>
                <template v-else>
                    <el-tabs v-model="activeTab" @tab-click="tabClick">
                        <el-tab-pane v-for="(item, index) in tabs" :key="index" :name="index.toString()">
                            <span slot="label"><i v-if="showIcon" :class="item.icon" style="font-size: 18px"></i><span v-if="showTitle">{{ item.title }}</span></span>
                        </el-tab-pane>
                    </el-tabs>
                </template>
            </div>
            <div class="commonFunc-box-body" :style="bodyStyle">
                <!-- <router-link class="item" :to="'/' + item.urlAddress" v-for="(item, i) in menuList" :key="i">
                    <i :class="item.icon" :style="{ color: item.iconBackgroundColor || '#1890FF' }"></i>
                    <span class="name">{{ item.fullName }}</span>
                </router-link> -->
                <div class="listcontent">
                    <a href="http://oam.chinacoal.com:7778/springMVC/sso.controller?erprlFlag=1" target="_blank">
                        <div class="EmployeeSelfService-2"></div>
                        <!-- <div>我的信息</div> -->
                    </a>
                    <a href="http://oam.chinacoal.com:7778/CICloud/app/myasset.portal?RU=F2335B2E0BCA51B1E04010AC1600103C" target="_blank">
                        <div class="EmployeeSelfService-3"></div>
                        <!-- <div>我的设备</div> -->
                    </a>
                    <a href="http://oam.chinacoal.com:7778/springMVC/sso.controller?erprlFlag=2" target="_blank">
                        <div class="EmployeeSelfService-4"></div>
                        <!-- <div>我的薪酬</div> -->
                    </a>
                    <a href="http://oam.chinacoal.com:7781/chinacoal/hygl.nsf/myview?openform&count=20&view=vwHuiYiShiShenq&RND=11566" target="_blank">
                        <div class="EmployeeSelfService-5"></div>
                        <!-- <div>会议预订</div> -->
                    </a>
                </div>
            </div>
            <div class="dongao">
                <img src="../../../assets/images/newcustom/dongao.png" />
            </div>
            <!-- <div class="right">
                <span v-if="item.showMore" title="更多" class="item">
                    <i class="el-icon-more more" @click="jumpToMore"></i></span>
            </div> -->
            <!-- <div class="openall" @click="openall">
                <img :src='require("./images/icon1.png")'>
            </div> -->
        </div>
    </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
export default {
    mixins: [mixin],
    data() {
        return {
            initData: [],
            menuList: [],
        };
    },
    watch: {
        list: {
            handler(val) {
                if (val) {
                    this.menuList = val.filter((item) => {
                        return this.initData.indexOf(item.id) !== -1;
                    });
                } else {
                    this.menuList = [];
                }
            },
            deep: true,
        },
    },
    mounted() {
        let list = this.$store.state.user.menuList;
        this.initList(list);
    },
    methods: {
        initList(data) {
            data.forEach((item) => {
                this.initData.push(item.id);
                if (item.children) {
                    this.initList(item.children);
                }
            });
        },
        openall() {

        }
    },
};
</script>
<style lang="scss" scoped>
.commonFunc-box {
    .commonFunc-box-body {
        padding: 0 30px;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .item {
            display: block;
            text-align: center;
            i {
                display: inline-block;
                height: 40px;
                font-size: 40px;
                margin-bottom: 10px;
            }
            .name {
                font-size: 14px;
                line-height: 20px;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.el-card {
    border: 0 !important;
}
>>> .el-card__header {
    height: 100%;
    background: url("images/body_04.png") no-repeat !important;
    background-size: 101% 100% !important;
}
.portal-common-title {
    height: 100%;
    align-items: center;
    justify-content: flex-start;
}
// .commonFunc-box-body > div > div {
//     display: flex;
// }
.listcontent {
    display: flex;
    align-items: center;
}
.listcontent > a {
    display: flex;
    align-items: center;
}
.listcontent > a > div {
    padding-right: 25px;
    font-weight: 500;
    width: 120px;
    height: 44px;
    margin-right: 20px;
}
.openall {
    position: absolute;
    top: 50%;
    margin-top: -15px;
    right: 40px;
}
</style>
<style lang="scss" scoped>
.EmployeeSelfService-2 {
    background: url("images/EmployeeSelfService-2.png") no-repeat ;
    background-size:cover ;
}
.EmployeeSelfService-3 {
    background: url("images/EmployeeSelfService-3.png") no-repeat ;
    background-size:cover ;
}
.EmployeeSelfService-4 {
    background: url("images/EmployeeSelfService-4.png") no-repeat ;
    background-size:cover ;
}
.EmployeeSelfService-5 {
    background: url("images/EmployeeSelfService-5.png") no-repeat ;
    background-size:cover ;
}
.EmployeeSelfService-2:hover {
    background: url("images/BT_01a.png") no-repeat ;
    background-size:cover ;
}
.EmployeeSelfService-3:hover {
    background: url("images/BT_02a.png") no-repeat ;
    background-size:cover ;
}
.EmployeeSelfService-4:hover {
    background: url("images/BT_03a.png") no-repeat ;
    background-size:cover ;
}
.EmployeeSelfService-5:hover {
    background: url("images/BT_04a.png") no-repeat ;
    background-size:cover ;
}
.dongao {
    position: absolute;
    bottom:0px;
    right:50px;
    z-index: 150;
}
</style>
