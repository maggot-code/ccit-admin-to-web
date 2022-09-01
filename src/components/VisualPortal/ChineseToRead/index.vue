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
                <!-- <span v-if="item.showFresh" title="刷新" class="item">
                    <i class="el-icon-refresh-right" @click="getData"></i></span>
                <span v-if="item.showMore" title="更多" class="item">
                    <i class="el-icon-more more" @click="jumpToMore"></i></span> -->
                <span v-if="item.showFresh" title="刷新" class="item">
                    <span style="color:#72A5DA;font-size:14px;font-weight:500;cursor: pointer;" class="titleIconhover" @click="getData('')">刷新</span>
                </span>
                <span v-if="item.showMore" title="更多" class="item">
                    <span style="color:#72A5DA;font-size:14px;font-weight:500;cursor: pointer;" class="titleIconhover" @click="jumpToMore">更多</span>
                </span>
            </div>
        </div>
        <div class="allcheck" ref='allcheck' @click="toggleSelection(toDoList.tasks)" v-if="toDoList.tasks && toDoList.tasks.length>1 && activeName==='daiyue'">全选</div>
        <div class="allread" ref='allread' @click="toggleSelectionChecked(toDoList.tasks)" v-show="multipleSelection.length>0 && activeName==='daiyue'">已阅</div>
        <div class="portal-box-body todolist" :style="bodyStyle" v-loading="loading">
            <div class="innerTabs" v-if="showOuter">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="'待阅(0)'" name="daiyue">
                        <div v-if='toDoList.tasks && toDoList.tasks.length!=0'>
                            <el-table ref="multipleTable" :data="toDoList.tasks" tooltip-effect="dark" style="width: 100%" :show-header="false" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="30">
                                </el-table-column>
                                <el-table-column label="标题">
                                    <template slot-scope="scope">
                                        <div class="tabletext" @click="formatUrl(toDoList,scope.row,toDoList.state)">{{ scope.row.taskName }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="领导待阅" width="70px">
                                    <template slot-scope="scope">
                                        <div class="leaderFlag" @click="formatUrl(toDoList,scope.row,toDoList.state)" v-if="scope.row.leaderFlag?'领导待阅':''">领导待阅</div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="日期" width="90px">
                                    <template slot-scope="scope">
                                        <div class="tabletime" @click="formatUrl(toDoList,scope.row,toDoList.state)">{{ scope.row.handleTime }}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else class="nolistparent">
                            <div class="nolist"></div>
                            <div class="listtext">暂时没有待阅事项</div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane :label="'已阅'" name="yiyue">
                        <div v-if='alreadyDone.tasks && alreadyDone.tasks.length!=0'>
                            <div class="list" v-for="(item,index) in alreadyDone.tasks" :key="index" @click="formatUrl(alreadyDone,item,alreadyDone.state)">
                                <div class="listcontent">
                                    {{item.taskName}}
                                </div>
                                <div>
                                    <div class="leaderFlag" v-if="item.leaderFlag">领导已阅</div>
                                </div>
                                <div class="listTime">
                                    {{item.handleTime}}
                                </div>
                            </div>
                        </div>
                        <div v-else class="nolistparent">
                            <div class="nolist"></div>
                            <div class="listtext">暂时没有已阅事项</div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="'收藏'" name="daiyuesave">
                        <div v-if='collection.tasks && collection.tasks.length!=0'>
                            <div class="list" v-for="(item,index) in collection.tasks" :key="index" @click="formatUrl(collection,item,collection.state)">
                                <div class="listcontent">
                                    {{item.taskName}}
                                </div>
                                <div>
                                    <div class="leaderFlag" v-if="item.leaderFlag">领导收藏</div>
                                </div>
                                <div class="listTime">
                                    {{item.handleTime}}
                                </div>
                            </div>
                        </div>
                        <div v-else class="nolistparent">
                            <div class="nolist"></div>
                            <div class="listtext">暂时没有收藏事项</div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
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
import { getMyToDoList, toBeRead, getUser, batchUpdateReadState } from '@/api/todolist/index.js'
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
            activeName: 'daiyue',
            toDoList: '',
            alreadyDone: '',
            collection: '',
            cookie: '',
            oam7778Cookie: '',
            multipleSelection: [],
        };
    },
    mounted() {
        if (this.pageSize) {
            this.params.pageSize = this.pageSize
        }
        this.columns = this.list;
        this.getData();
        document.addEventListener('visibilitychange', () => { // 浏览器切换事件
            if (document.visibilityState === 'hidden') { // 离开当前tab标签
                // console.log("离开当前tab标签");
            } else { // 回到当前tab标签
                // console.log("回到当前tab标签");
                this.getData();

            }
        });
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
                            y = data.serverUrl.replace("app", "appNew")
                                + "?oaviewnew&sysId="
                                + task.appId
                                + "&bus_user_id="
                                + task.appReceiveUid
                                + "&bus_view_id="
                                + task.appTaskId
                                + "&rmark="
                                + task.remark
                                + "&view_type_id="
                                + task.taskTypeId
                                + "&userCode="
                                + data.userCn
                                + "&userCn="
                                + data.userCn
                                + "&state="
                                + task.stateId
                                + "&uuid="
                                + task.uuid
                                + "&taskuuid="
                                + task.uuid
                                + "&leaderFlag="
                                + task.leaderFlag;

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
            if (!!this.userInfo && !!this.cookie) {
                toBeRead(
                    {
                        size: '5',
                        cookie: this.cookie,
                        state: '4',
                        portal: this.userInfo.data.id,
                    }).then(
                        (res) => {
                            this.loading = false
                            if (res.code == 200) {
                                this.toDoList = res.data
                                console.log("window11")
                                document.getElementById("tab-daiyue").innerHTML = `待阅(<span style="color:red">${res.data.dyNums}</span>)`
                            }
                        }
                    )
                toBeRead(
                    {
                        size: '5',
                        cookie: this.cookie,
                        state: '5',
                        portal: this.userInfo.data.id,
                    }).then(
                        (res) => {
                            this.loading = false
                            if (res.code == 200) {
                                this.alreadyDone = res.data
                            }
                        }
                    )
                toBeRead(
                    {
                        size: '5',
                        cookie: this.cookie,
                        state: '7',
                        portal: this.userInfo.data.id,
                    }).then(
                        (res) => {
                            this.loading = false
                            if (res.code == 200) {
                                this.collection = res.data
                            }
                        }
                    )
            } else {
                getMyToDoList({ userId: this.$store.getters.userInfo.userAccount }).then(
                    (res) => {
                        if (res.code == 200) {
                            let url = res.data.loginCookie + ';domain=chinacoal.com'
                            document.cookie = url
                            this.cookie = res.data.oamCookie
                            this.oam7778Cookie = res.data.oam7778Cookie
                            //利用门户的cookie获取门户的用户信息
                            getUser({ cookie: res.data.oamCookie }).then(
                                (res) => {
                                    if (res.code == 200) {
                                        this.userInfo = res
                                        //根据用户信息获取待办
                                        toBeRead(
                                            {
                                                size: '5',
                                                cookie: this.cookie,
                                                state: '4',
                                                portal: this.userInfo.data.id,
                                            }).then(
                                                (res) => {
                                                    this.loading = false
                                                    if (res.code == 200) {
                                                        this.toDoList = res.data
                                                        document.getElementById("tab-daiyue").innerHTML = `待阅(<span style="color:red">${res.data.dyNums}</span>)`
                                                    }
                                                }
                                            )
                                        toBeRead(
                                            {
                                                size: '5',
                                                cookie: this.cookie,
                                                state: '5',
                                                portal: this.userInfo.data.id,
                                            }).then(
                                                (res) => {
                                                    this.loading = false
                                                    if (res.code == 200) {
                                                        this.alreadyDone = res.data
                                                    }
                                                }
                                            )
                                        toBeRead(
                                            {
                                                size: '5',
                                                cookie: this.cookie,
                                                state: '7',
                                                portal: this.userInfo.data.id,
                                            }).then(
                                                (res) => {
                                                    this.loading = false
                                                    if (res.code == 200) {
                                                        this.collection = res.data
                                                    }
                                                }
                                            )
                                    }




                                }
                            )
                        } else if (res.code == 400) {
                            document.getElementById("tab-daiyue").innerHTML = `待阅(<span style="color:red">0</span>)`
                            this.loading = false
                        }


                    }
                ).catch((err) => {
                    console.log(err)
                });
            }

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
        toggleSelection(rows) {
            console.log(rows)
            if (rows) {
                this.$refs.multipleTable.toggleAllSelection();
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length === 0) {
                this.$refs.allread.style.color = "#999"
                this.$refs.allcheck.style.fontWeight = "400"
            } else {
                this.$refs.allread.style.color = "#000000"
                this.$refs.allcheck.style.fontWeight = "bold"
            }
        },
        jumpToMore() {
            var url = ''
            if (this.activeName == 'daiyue') {
                url = ` http://oam.chinacoal.com/unionTaskWS/readListUAT.jsp?userCode=${this.userInfo.data.id}&state=4`
            } else if (this.activeName == 'yiyue') {
                url = ` http://oam.chinacoal.com/unionTaskWS/readListUAT.jsp?userCode=${this.userInfo.data.id}&state=5`
            } else if (this.activeName == 'daiyuesave') {
                url = ` http://oam.chinacoal.com/unionTaskWS/readListUAT.jsp?userCode=${this.userInfo.data.id}&state=7`
            }
            window.open(url)
        },
        toggleSelectionChecked() {
            this.$refs.allread.style.color = "#999"
            if (this.multipleSelection.length === 0) {
                this.$message('请选择需要阅读的事项');
                return
            }
            this.loading = true
            var list = this.multipleSelection
            var datalist = []
            list.forEach(item => {
                datalist.push({
                    taskAppId: item.appTaskId,
                    remark: item.remark,
                    userId: this.userInfo.data.id
                })
            })
            console.log(datalist)
            batchUpdateReadState(datalist, this.oam7778Cookie).then(res => {
                if (res.code == 200 && res.data.length === 0) {
                    this.getData()
                } else {
                    var html = ''
                    for (var i = 0; i < res.data.length; i++) {
                        html += res.data[i].errorTaskAppId + "已阅失败" + "<br/>"
                    }
                    this.$message({
                        dangerouslyUseHTMLString: true,
                        message: html,
                        type: 'warning'
                    });
                    this.getData()
                }
            })
        },

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
    position: relative;
}
>>> .el-tabs__item {
    font-size: 12px !important;
    // font-weight: 700;
    color: #999999;
    padding: 0 13px;
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
    font-weight: 700;
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
    width: 250px;
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
    text-align: right;
}
.listTime {
    width: 80px;
    // color: #999999;
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
.nolistparent {
    display: flex;
    align-items: center;
    flex-flow: column;
    cursor: default;
}
.nolist {
    width: 108px;
    height: 104px;
    margin: 20px auto 20px;
    background: url("images/nolist.png") no-repeat;
    background-size: 100%;
}
.listtext {
    margin: auto;
    // font-size: 13px;
    text-align: center;
    color: #999999;
}
</style>
<style lang="scss" scoped>
>>> .el-table td.el-table__cell {
    border-bottom: 0px solid #dcdfe6 !important;
    font-size: 14px;
}
.tabletext {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    color: #000;
}
>>> .el-table {
    border-top: 0px solid #ebeef5;
}
>>> .el-table__row {
    height: 46px;
    cursor: pointer;
}
>>> .el-table__row:hover {
    .tabletext {
        color: #1890ff !important;
        text-decoration: underline;
    }
    .tabletime {
        color: #1890ff !important;
    }
}
.tabletime {
    text-align: right;
    // color: #999;
}
.allcheck {
    font-size: 12px;
    // font-weight: 700;
    color: #000;
    position: absolute;
    top: 74px;
    right: 65px;
    z-index: 999;
    cursor: pointer;
}
.allread {
    font-size: 12px;
    // font-weight: 700;
    color: #999;
    position: absolute;
    top: 74px;
    right: 20px;
    z-index: 999;
    cursor: pointer;
}
.allcheck:hover{
    font-weight: bold;
}
.allread:hover{
    font-weight: bold;
}
>>> .el-table .cell {
    padding: 0;
}
.leaderFlag {
    width: 70px;
    height: 27px;
    text-align: center;
    background: #f95c28;
    color: #ffffff !important;
    border-radius: 5px;
    line-height: 27px;
    font-size: 12px !important;
}
.titleIconhover:hover {
    color: #000 !important;
    font-weight: bold !important;
}
.portal-box {
    height: 100%;
    background: url("images/body03.png") no-repeat !important;
    background-size: 100% 100% !important;
}
.el-card {
    border: 0 !important;
}
.portal-common-title .right span:hover {
    color: #0f59a4 !important;
    font-weight: 500 !important;
}
.portal-common-title {
    margin-top: 10px;
}
.portal-common-title .left span {
    padding-left: 1px;
}
.right {
    // padding-right: 8px !important;
}
.portal-common-title .right span {
    padding-left: 3px !important;
}
</style>
<style lang="scss" scoped>
// .t_btn2为你的上级父元素class名称
// 由于是只在本页面修改, 所以必须要用 /deep/ 或者 >>> 才能生效  /deep/ 是深度选择器,可自行百度了解更多
>>> .el-table,
.el-table__expanded-cell {
    background-color: transparent;
}
>>> .el-table tr {
    background-color: transparent !important;
}
>>> .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
    background-color: transparent;
}
>>> .el-table__row > td {
    border: none;
}
/* 清除底部横线 */
.el-table::before {
    height: 0px;
}
>>> .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: transparent !important;
}
</style>