<template>
    <div>
        <template v-if="activeData.option">
            <el-form-item v-if="activeData.option.title" label="副标题">
                <el-input v-model="activeData.option.title.subtext" placeholder="请输入副标题" />
            </el-form-item>
            <el-form-item v-if="activeData.option.theme" label="主题">
                <el-select v-model="activeData.option.theme" placeholder="请选择图表主题">
                    <el-option v-for="item in echartTheme" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <template v-if="activeData.props.groupColorList.length > 0">
                <div v-for="(item, index) in activeData.props.groupColorList" :key="index" class="dataBoard-item">
                    <el-form-item :label="item.name" prop="nickname">
                        <el-color-picker v-model="item.color" size="medium" @change="changeGroupColor(index, item.color)"></el-color-picker>
                    </el-form-item>
                </div>
            </template>
            <template v-if="activeData.option.toolbox">
                <el-divider>工具栏</el-divider>
                <el-form-item v-if="activeData.option.toolbox.feature.saveAsImage" label="下载图表">
                    <el-switch v-model="activeData.option.toolbox.feature.saveAsImage.show"></el-switch>
                </el-form-item>
                <el-form-item v-if="activeData.option.toolbox.feature.dataView" label="数据视图">
                    <el-switch v-model="activeData.option.toolbox.feature.dataView.show"></el-switch>
                </el-form-item>
                <el-form-item v-if="activeData.option.toolbox.feature.magicType" label="切换折线">
                    <el-switch v-model="activeData.option.toolbox.feature.magicType.show"></el-switch>
                </el-form-item>
            </template>
        </template>
        <component :is="`${activeData.ccitKey}Setting`" :activeData="activeData" @open-icons-dialog="openIconsDialog"></component>
        <com-events v-if="activeData.events" :activeData="activeData" :eventList="activeData.eventList"></com-events>
    </div>
</template>
<script>
import ComEvents from "./ComEvents";
import {
    TodoSetting,
    TaskSetting,
    CommonFuncSetting,
    TodoListSetting,
    NoticeSetting,
    EmailSetting,
    MailboxSetting,
    SingleLoginSetting,
    CommonLinksSetting,
    DailyScheduleSetting,
    WeatherSetting,
    DataBoardSetting,
    IframeDivSetting,
    CarouselSetting,
    BarChartSetting,
    AnnularChartSetting,
    AreaChartSetting,
    LineChartSetting,
    PieChartSetting,
    RadarChartSetting,
    AddFlowSetting,
    DocumentSetting,
    NoteSetting,
    ContactBookSetting,
    SinglePictureSetting,
    ModelQuerySetting,
    NewsSetting,
    RankListSetting,
    CCITAudioSetting,
    CCITVideoSetting,
    CCITMapSetting,
    TimeLineSetting,
    CurrentTimeSetting,
    DisplayFieldSetting,
    CopyrightSetting,
    ThemeSetting,
    LoginFormSetting,
    VersionSetting,
    LoginTabSetting,
    // Emaill2Setting,
    // MeetingMattersSetting,
    // ToReadSetting,
    // TodoList2Setting,
    // ToLearnSetting,
    // DailySchedule2Setting,
    // LoginForm2Setting
} from "./setting.js";
export default {
    components: {
        ComEvents,
        TodoSetting,
        TaskSetting,
        CommonFuncSetting,
        TodoListSetting,
        NoticeSetting,
        EmailSetting,
        MailboxSetting,
        SingleLoginSetting,
        CommonLinksSetting,
        DailyScheduleSetting,
        WeatherSetting,
        DataBoardSetting,
        IframeDivSetting,
        CarouselSetting,
        BarChartSetting,
        AnnularChartSetting,
        AreaChartSetting,
        LineChartSetting,
        PieChartSetting,
        RadarChartSetting,
        AddFlowSetting,
        DocumentSetting,
        NoteSetting,
        ContactBookSetting,
        SinglePictureSetting,
        ModelQuerySetting,
        NewsSetting,
        RankListSetting,
        CCITAudioSetting,
        CCITVideoSetting,
        CCITMapSetting,
        TimeLineSetting,
        CurrentTimeSetting,
        DisplayFieldSetting,
        CopyrightSetting,
        ThemeSetting,
        LoginFormSetting,
        VersionSetting,
        LoginTabSetting,
        // Emaill2Setting,
        // MeetingMattersSetting,
        // ToReadSetting,
        // TodoList2Setting,
        // ToLearnSetting,
        // DailySchedule2Setting,
        // LoginForm2Setting
    },
    props: {
        activeData: {
            type: Object,
            default: () => { },
        },
    },
    data() {
        return {
            echartTheme: [
                "vintage",
                "dark",
                "chalk",
                "purple-passion",
                "macarons",
                "infographic",
                "shine",
            ],
        };
    },
    methods: {
        openIconsDialog(index) {
            this.$emit("open-icons-dialog", index);
        },
        //设置分组颜色
        changeGroupColor(index, c) {
            if (this.activeData.ccitKey === "pieChart") {
                this.activeData.option.series[0].data[index].itemStyle = { color: c };
            } else {
                let color = [];
                for (let i = 0; i < this.activeData.props.groupColorList.length; i++) {
                    color.push(this.activeData.props.groupColorList[i].color);
                }
                this.activeData.option.color = color;
            }
        },
    },
};
</script>