<template>
    <el-card :class="['commonFunc-box', titleColor]" :style="cardStyle">
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
            <div class="commonFunc-box-body" :style="bodyStyle" v-loading="loading">
                <!-- <router-link class="item" :to="'/' + item.urlAddress" v-for="(item, i) in menuList" :key="i">
                    <i :class="item.icon" :style="{ color: item.iconBackgroundColor || '#1890FF' }"></i>
                    <span class="name">{{ item.fullName }}</span>
                </router-link> -->
                <div class="listcontent">
                    <a href="http://oam.chinacoal.com:7778/springMVC/sso.controller?erprlFlag=1" target="_blank">
                        <div><img :src='require("./images/EmployeeSelfService-2.png")'></div>
                        <!-- <div>我的信息</div> -->
                    </a>
                    <a href="http://oam.chinacoal.com:7778/CICloud/app/myasset.portal?RU=F2335B2E0BCA51B1E04010AC1600103C" target="_blank">
                        <div><img :src='require("./images/EmployeeSelfService-3.png")'></div>
                        <!-- <div>我的设备</div> -->
                    </a>
                    <a href="http://oam.chinacoal.com:7778/springMVC/sso.controller?erprlFlag=2" target="_blank">
                        <div><img :src='require("./images/EmployeeSelfService-4.png")'></div>
                        <!-- <div>我的薪酬</div> -->
                    </a>
                    <a href="http://oam.chinacoal.com:7781/chinacoal/hygl.nsf/myview?openform&count=20&view=vwHuiYiShiShenq&RND=11566" target="_blank">
                        <div><img :src='require("./images/EmployeeSelfService-5.png")'></div>
                        <!-- <div>会议预订</div> -->
                    </a>
                    <!-- <a href="http://oam.chinacoal.com:7781/chinacoal/qjgl01.nsf/myview?openform&view=vwDocByDate&count=20" target="_blank">
                        <div><img style="width:74px" :src='require("./images/EmployeeSelfService-6.png")'></div>
                        <div>请假管理</div>
                    </a> -->
                    <!-- <a href="http://erp.chinacoal.com:8000/OA_HTML/OA.jsp?OAFunc=OAHOMEPAGE&akRegionApplicationId=0&navRespId=105339&navRespAppId=800&navSecGrpId=0&transactionid=-1&oapc=4" target="_blank">
                        <div><img :src='require("./images/EmployeeSelfService-2.png")'></div>
                        <div>经理自助</div>
                    </a> -->
                </div>
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
.el-card{
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
}
.openall {
    position: absolute;
    top: 50%;
    margin-top: -15px;
    right: 40px;
}
</style>
