<template>
    <div class="main">
        <template v-if="config.layout && config.layout.length">
            <el-scrollbar class="layout-area" :style="layoutStyle">
                <grid-layout :layout.sync="config.layout" :row-height="40" :col-num="24" :isDraggable="false"
        :isResizable="false">
                    <grid-item v-for="item in config.layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
                        <!-- <div class="setting" :style="settingStyle(item)">
                            <span v-if="item.draggable" title="可拖拽" class="item hover-show">
                                <i class="el-icon-rank drag"></i></span>
                            <span v-if="item.resizable" title="可伸缩" class="item hover-show">
                                <i class="ym-custom ym-custom-arrow-expand"></i></span>
                            <span v-if="item.editable && layoutType !=='custom'" title="可编辑" class="item editable hover-show" @click.stop="handleEdit(item)">
                                <i class="el-icon-edit-outline"></i></span>
                        </div> -->
                        <component :style="{ width: '100%', height: '100%' }" :is="item.ccitKey" :item="item" :parentComp="parentComp" :portal-style="portalStyle"></component>
                    </grid-item>
                </grid-layout>
            </el-scrollbar>
        </template>
        <div class="portal-layout-nodata" v-else>
            <img src="@/assets/images/dashboard-nodata.png" alt="" class="layout-nodata-img" />
            <p class="layout-nodata-txt">暂无数据</p>
        </div>
        <el-drawer :visible.sync="rightPanelVisible" :size="300" :with-header="false">
            <right-panel :active-data="activeData" :parentComp="parentComp" />
        </el-drawer>
    </div>
</template>
<script>
import { mapState } from "vuex";
import {
    Todo,
    Task,
    CommonFunc,
    TodoList,
    Notice,
    Email,
    Mailbox,
    SingleLogin,
    CommonLinks,
    DailySchedule,
    Weather,
    DataBoard,
    IframeDiv,
    Carousel,
    BarChart,
    AnnularChart,
    AreaChart,
    LineChart,
    PieChart,
    RadarChart,
    AddFlow,
    Document,
    Note,
    ContactBook,
    SinglePicture,
    ModelQuery,
    News,
    RankList,
    CCITAudio,
    CCITVideo,
    CCITMap,
    TimeLine,
    CurrentTime,
    DisplayField,
    // TodoList2,
    // Emaill2,
    // MeetingMatters,
    // ToLearn,
    // ToRead,
    // EmployeeSelfService,
    // TodoList3,
    // Emaill3,
    // ToRead3,
    // EmployeeSelfService3,
    // DailySchedule2,
    //国风版本门户待办待阅邮件员工自助
    // ChineseTodoList,
    // ChineseEmaill,
    // ChineseToRead,
    // ChineseEmployeeSelfService,
} from "@/components/VisualPortal";
import RightPanel from "@/components/VisualPortal/RightPanel";
import VueGridLayout from "vue-grid-layout";
export default {
    props: {
        config: {
            type: Object,
            default: () => ({}),
        },
        layout: { type: Array, default: () => [] },
        mask: { type: Boolean, default: false },
        parentComp: { type: String, default: "" },
        layoutBg: {
            type: String,
            default: "",
        },
        bgColor: {
            type: String,
            default: "",
        },
        portalStyle: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        Todo,
        Task,
        CommonFunc,
        TodoList,
        Notice,
        Email,
        Mailbox,
        SingleLogin,
        CommonLinks,
        DailySchedule,
        Weather,
        DataBoard,
        IframeDiv,
        Carousel,
        BarChart,
        AnnularChart,
        AreaChart,
        LineChart,
        PieChart,
        RadarChart,
        RightPanel,
        AddFlow,
        Document,
        Note,
        ContactBook,
        SinglePicture,
        ModelQuery,
        News,
        RankList,
        CCITAudio,
        CCITVideo,
        CCITMap,
        TimeLine,
        CurrentTime,
        DisplayField,
        // TodoList2,
        // Emaill2,
        // MeetingMatters,
        // ToLearn,
        // ToRead,
        // EmployeeSelfService,
        // TodoList3,
        // Emaill3,
        // ToRead3,
        // EmployeeSelfService3,
        // DailySchedule2,
        // ChineseTodoList,
        // ChineseEmaill,
        // ChineseToRead,
        // ChineseEmployeeSelfService
    },
    data() {
        return {
            activeId: null,
            activeData: null,
            rightPanelVisible: false,
        };
    },
    computed: {
        ...mapState({
            layoutType: state => state.settings.layoutType
        }),
        layoutStyle() {
            let obj = {};
            if (this.config.layoutBg) {
                obj.backgroundImage = `url(${this.define.comUrl}/api/file/Portal/theme/${this.config.layoutBg})`;
            }
            if (this.config.bgColor) {
                obj.backgroundColor = this.config.bgColor;
            }
            return obj;
        },
        settingStyle() {
            return (item) => {
                let offsetRight =
                    10 + (item.showMore ? 32 : 0) + (item.showFresh ? 32 : 0);
                return {
                    right: offsetRight + "px",
                };
            };
        },
    },
    methods: {
        handleEdit(item) {
            if (this.parentComp === "preview") return;
            this.activeId = item.i;
            this.activeData = item;
            this.rightPanelVisible = true;
        },
    },
};
</script>
<style lang="scss" scoped>
$lighterBlue: #409eff;
.main {
    height: 100%;
    .layout-area {
        height: 100%;
        >>> .el-scrollbar__wrap {
            margin-bottom: 0 !important;
            overflow-x: hidden;
        }
        >>> .el-scrollbar__view {
            height: 100%;
        }
        >>> .el-scrollbar__bar.is-horizontal > div {
            display: none;
        }
        >>> .el-card {
            width: 100%;
            height: 100%;
            .el-card__body {
                padding: 0;
            }
        }
        .vue-grid-layout {
            margin: -10px -10px 0 -10px;
            overflow: hidden;
            .vue-grid-item {
                .mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }
                .setting {
                    height: 20px;
                    top: 15px;
                    position: absolute;
                    z-index: 20;
                    color: #d2d2d2;
                    .hover-show {
                        visibility: hidden;
                    }
                    .item {
                        font-size: 16px;
                        margin-left: 8px;
                    }
                    .editable {
                        cursor: pointer;
                    }
                }
                &:hover {
                    .setting .hover-show {
                        visibility: visible;
                    }
                }
            }
        }
    }
}
</style>