<template>
    <el-card :class="['portal-box', titleColor]" :style="cardStyle">
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
            <div class="right">
                <span v-if="item.showFresh" title="刷新" class="item">
                    <i class="el-icon-refresh-right" @click="getData"></i></span>
                <span v-if="item.showMore" title="更多" class="item">
                    <i class="el-icon-more more" @click="jumpToMore"></i></span>
            </div>
        </div>
        <div class="portal-box-body todolist" :style="bodyStyle" v-loading="loading">
            <div class="innerTabs" v-if="showOuter">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="todoList" name="daikai">
                        <div v-if='toDoList.tasks && toDoList.tasks.length!=0'>
                            <div class="list" v-for="(item,index) in toDoList.tasks" :key="index" @click="formatUrl(toDoList,item,toDoList.state)">
                                <div class="listcontent">
                                    {{item.taskName}}
                                </div>
                                <div class="listTime">
                                    {{item.handleTime}}
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="nolist"></div>
                            <div class="listtext">暂时没有待开会议...</div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane :label="'已开'" name="yikai">
                        <div v-if='alreadyDone.tasks && alreadyDone.tasks.length!=0'>
                            <div class="list" v-for="(item,index) in alreadyDone.tasks" :key="index" @click="formatUrl(alreadyDone,item,alreadyDone.state)">
                                <div class="listcontent">
                                    {{item.taskName}}
                                </div>
                                <div class="listTime">
                                    {{item.handleTime}}
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="nolist"></div>
                            <div class="listtext">暂时没有已开会议...</div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="'收藏'" name="save2">
                        <div v-if='collection.tasks && collection.tasks.length!=0'>
                            <div class="list" v-for="(item,index) in collection.tasks" :key="index" @click="formatUrl(collection,item,collection.state)">
                                <div class="listcontent">
                                    {{item.taskName}}
                                </div>
                                <div class="listTime">
                                    {{item.handleTime}}
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="nolist"></div>
                            <div class="listtext">暂时没有收藏会议...</div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <!-- <a
          v-for="item in innerTabs"
          :key="item.name"
          class="item"
          :class="{ active: active == item.name }"
          @click="active = item.name"
          >{{ item.label }}</a
        >&nbsp;&nbsp; -->
            </div>
            <div class="pane" v-show="innerActiveTab == 'sys'">
                <template v-if="todoList.length">
                    <el-table class="table" stripe :data="todoList" style="width: 100%" :show-header="showHeader" :row-style="{ height: '0' }" :cell-style="{ padding: '0' }" :height="tableHeight">
                        <template v-for="(colItem, index) in columns">
                            <el-table-column :key="index" v-if="colItem.selection && colItem.prop == 'fullName'" :prop="colItem.prop" :label="colItem.label" :show-overflow-tooltip="true">
                                <template slot-scope="scope">
                                    <el-button class="fullname" type="text" style="color: #333 !import" @click="toDetail(scope.row)">{{ scope.row.fullName }}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column :key="index" v-if="colItem.selection && colItem.prop == 'flowUrgent'" :prop="colItem.prop" :label="colItem.label" width="100px">
                                <template slot-scope="scope">
                                    {{ scope.row.flowUrgent | urgentText() }}
                                </template>
                            </el-table-column>
                            <el-table-column :key="index" v-if="colItem.selection && colItem.prop == 'status'" :prop="colItem.prop" :label="colItem.label" width="100px">
                                <template slot-scope="scope">
                                    <el-tag type="success" v-if="scope.row.status == 2">审核通过</el-tag>
                                    <el-tag type="danger" v-else-if="scope.row.status == 3">审核驳回</el-tag>
                                    <el-tag type="warning" v-else-if="scope.row.status == 4">审核撤回</el-tag>
                                    <el-tag type="info" v-else-if="scope.row.status == 5">审核终止</el-tag>
                                    <el-tag type="primary" v-else>等待审核</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column :key="index" v-if="
                  colItem.selection &&
                  (colItem.prop == 'startTime' || colItem.prop == 'creatorTime')
                " :prop="colItem.prop" :label="colItem.label" width="120px">
                                <template slot-scope="scope">
                                    {{ scope.row[colItem.prop] | toDate() }}
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                    <pagination v-if="showPagination" :total="total" :page.sync="params.currentPage" :limit.sync="params.pageSize" @pagination="getData" />
                </template>
            </div>
        </div>
    </el-card>
</template>
<script>
import { getFlowTodo } from "@/api/home";
import { mixin } from "../visualPortalMixin";
import { getMyToDoList, toBeMatter, getUser } from '@/api/todolist/index.js'
export default {
    mixins: [mixin],
    props: {
        showHeader: { type: Boolean, default: false },
        showOuter: { type: Boolean, default: true },
        innerTabs: {
            type: Array,
            default: () => ([]),
        },
    },
    data() {
        return {
            columns: [],
            todoList: [],
            innerActiveTab: "sys",
            params: {
                currentPage: 1,
                pageSize: 10,
            },
            total: 0,
            showPagination: false,
            pageSize: 5,
            activeName: 'daikai',
            toDoList: '',
            alreadyDone: '',
            collection: '',
            cookie: ''
        };
    },
    mounted() {
        if (this.pageSize) {
            this.params.pageSize = this.pageSize
        }
        this.columns = this.list;
        this.getData();
    },
    watch: {
        list: {
            handler(val) {
                this.columns = val;
            },
            deep: true,
        },
    },
    computed: {
        tableHeight() {
            if (this.showOuter) {
                if (this.showPagination) {
                    return "calc(100% - 80px)";
                } else {
                    return "calc(100% - 40px)";
                }
            } else {
                return "80%";
            }
        },
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        formatUrl(data, task, state) {
            var I = state == 2 ? "&state=2" : "";
            var y = task.url;
            if (task.appId == "flswid" && task.processFlag != 1) {
                y = data.serverUrl
                    + "?page&sysId="
                    + task.appId
                    + "&userid="
                    + data.userCn
                    + "&taskappid="
                    + task.appTaskId + I
                    + "&tasktypeid="
                    + task.taskTypeId
                    + "&taskuuid="
                    + task.uuid
                    + "&state="
                    + task.stateId
                    + "&userCn="
                    + data.userCn
                    + "&leaderFlag="
                    + task.leaderFlag;
            } else {
                if (task.appId == "erpid") {
                    if (task.processFlag != 1) {
                        y = data.serverUrl
                            + "?erp&sysId="
                            + task.appId
                            + "&userid="
                            + task.appReceiveUid
                            + "&taskappid="
                            + task.appTaskId
                            + I
                            + "&tasktypeid="
                            + task.taskTypeId
                            + "&url="
                            + "&status="
                            + task.stateId
                            + "&taskuuid="
                            + task.uuid
                            + "&userCn="
                            + data.userCn
                            + "&leaderFlag="
                            + task.leaderFlag;

                    }
                } else {
                    if (task.appId == "oaid" && task.processFlag != 1) {
                        if (data.state != "4") {
                            y = data.serverUrl
                                + "?oa&sysId="
                                + task.appId
                                + "&userid="
                                + task.appReceiveUid
                                + "&taskappid="
                                + task.appTaskId
                                + "&rmark="
                                + task.remark
                                + I
                                + "&tasktypeid="
                                + task.taskTypeId
                                + "&status="
                                + task.stateId
                                + "&taskuuid="
                                + task.uuid
                                + "&userCn="
                                + data.userCn
                                + "&leaderFlag="
                                + task.leaderFlag;
                        }

                    } else {
                        if (task.appId == "zsjid"
                            || task.appId == "gysid") {
                            y = "http://oam.chinacoal.com/unionTaskWS/Iframe.jsp?sysId="
                                + task.appId
                                + "&tasktypeid="
                                + task.taskTypeId
                                + "&tageturl="
                                + task.url
                        }
                    }
                }
            }
            // window.location.href = y
            window.open(y)
            // return y;
        },
        getData() {
            this.loading = true
            // 利用当前3.1的用户id获取对应关联用户的cookie
            getMyToDoList({ userId: this.$store.getters.userInfo.userId }).then(
                (res) => {
                    if (res.code == 200) {
                        let url = res.data.loginCookie + ';domain=chinacoal.com'
                        document.cookie = url
                        this.cookie = res.data.oamCookie
                    }
                    //利用门户的cookie获取门户的用户信息
                    getUser({ cookie: res.data.oamCookie }).then(
                        (res) => {
                            if (res.code == 200) {
                                this.userInfo = res
                                //根据用户信息获取待办
                                toBeMatter(
                                    {
                                        size: '6',
                                        cookie: this.cookie,
                                        state: '4',
                                        portal: this.userInfo.data.id,
                                    }).then(
                                        (res) => {
                                            if (res.code == 200) {
                                                this.loading = false
                                                this.toDoList = res.data
                                                document.getElementById("tab-daikai").innerHTML = `待开(<span style="color:red">${res.data.meetDyNums}</span>)`
                                            }
                                        }
                                    )
                                toBeMatter(
                                    {
                                        size: '6',
                                        cookie: this.cookie,
                                        state: '5',
                                        portal: this.userInfo.data.id,
                                    }).then(
                                        (res) => {
                                            if (res.code == 200) {
                                                this.alreadyDone = res.data
                                            }
                                        }
                                    )
                                toBeMatter(
                                    {
                                        size: '6',
                                        cookie: this.cookie,
                                        state: '6',
                                        portal: this.userInfo.data.id,
                                    }).then(
                                        (res) => {
                                            if (res.code == 200) {
                                                this.collection = res.data
                                            }
                                        }
                                    )
                            }




                        }
                    )

                }
            ).catch((err) => {
                console.log(err)
            });
        },
        toDetail(item) {
            this.$router.push({
                name: "workFlow-flowTodo",
                params: {
                    ...item,
                    comp: "todoList",
                    type: "detail",
                },
            });
        },
        jumpToMore(){
            let url = ''
            if(this.activeName == 'daikai'){
                url = `http://oam.chinacoal.com/unionTaskWS/meetListUAT.jsp?userCode=${this.userInfo.data.id}&state=4`
            }else if(this.activeName == 'yikai'){
                url = `http://oam.chinacoal.com/unionTaskWS/meetListUAT.jsp?userCode=${this.userInfo.data.id}&state=5`
            }else if(this.activeName == 'save2'){
                url = `http://oam.chinacoal.com/unionTaskWS/meetListUAT.jsp?userCode=${this.userInfo.data.id}&state=6`
            }   
            window.open(url)
        }
    },
};
</script>
<style lang="scss" scoped>
.todolist {
    padding: 0 20px;
    >>> .el-tabs__header {
        margin: 0;
    }
    .table {
        // margin-top: 10px;
        .fullname {
            color: #333;
        }
    }
}
.tabs {
    height: 32px;
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .item {
        position: relative;
        line-height: 32px;
        font-size: 12px;
        color: #334d65;
        &::after {
            display: block;
            content: "";
            overflow: hidden;
            width: 60px;
            height: 2px;
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: transparent;
            border-radius: 1px;
        }
        &.active {
            &::after {
                background-color: #1890ff;
            }
        }
    }
}
.pane {
    height: 100%;
}
</style>
<style lang="scss" scoped>
.toDolistMain {
    width: 500px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 5px;
}
.toDolistHead {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
}
.toDolistHead > div {
    display: flex;
    align-items: center;
}
.lineIcon {
    background: #506cd2;
    height: 20px;
    width: 5px;
    border-radius: 5px;
}
.headTitke {
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
}
.toDolistHeadRight {
    width: 60px;
    margin-right: 20px;
}
.toDolistHeadRight > div {
    width: 16px;
    height: 16px;
}
.el-icon-more,
.el-icon-refresh-right {
    font-size: 24px;
    color: #d2d2d2;
}
.toDolistHeadRight > div:nth-child(1) {
    margin-right: 15px;
}
.toDolistHeadRight > div:nth-child(2) {
    margin-left: 15px;
}
.listContent {
    padding: 0 20px;
}
>>> .el-tabs__item {
    font-size: 14px;
    font-weight: 700;
    color: #999999;
}
>>> .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: #dfe4ed;
    z-index: 1;
}
>>> .el-tabs__item:hover {
    color: #000;
}
>>> .is-active {
    color: #000 !important;
}
>>> .el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    background-color: #1890ff;
    z-index: 1;
    -webkit-transition: -webkit-transform 0.3s
        cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        -webkit-transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    list-style: none;
}
.list {
    // display: block;
    height: 30px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 8px 0;
    box-sizing: content-box;
    cursor: pointer;
}
.list:hover {
    color: #1890ff !important;
    cursor: pointer;
    .listTime {
        width: 80px;
        color: #1890ff !important;
    }
    .listcontent {
        text-decoration: underline;
    }
}
.listIcon > div {
    width: 40px;
    height: 30px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
}
.listcontent {
    width: 230px;
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // padding-left: 20px;
}
.listtext {
    width: 150px;
    text-align: center;
}
.listtext,
.listTime {
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.listTime {
    width: 80px;
    color: #999999;
}
.listIconba7adc {
    background: #ba7adc;
}
.listIcon597af2 {
    background: #597af2;
}
.listIcond33838 {
    background: #d33838;
}
>>> .el-tabs__content {
    position: relative;
    height: 300px;
    // overflow: scroll;
}
>>> .el-tabs__header {
    margin: 0 0 10px;
}
.nolist {
    width: 200px;
    height: 200px;
    margin: 0px auto 0px;
    background: url("images/nolist.png") no-repeat;
    background-size: cover;
}
.listtext {
    margin: auto;
    // font-size: 13px;
    color: #999999;
}
</style>