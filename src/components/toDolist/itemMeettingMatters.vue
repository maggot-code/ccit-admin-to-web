<template>
    <div>
        <div class="toDolistMain">
            <!-- 待办事项的表头开始 -->
            <div class="toDolistHead">
                <div class="toDolistHeadLeft">
                    <div class="lineIcon"></div>
                    <div class="headTitke">会议事项</div>
                </div>
                <div class="toDolistHeadRight">
                    <div @click="reload"><i class="el-icon-refresh-right"></i></div>
                    <div @click="openNewtarg"><i class="el-icon-more"></i></div>
                </div>
            </div>
            <!-- 待办事项的表头结束 -->
            <!-- 事项列表的内容开始 -->
            <div class="listContent">
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
                    <el-tab-pane :label="nomalList" name="yikai">
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
                    <el-tab-pane :label="saveList" name="save2">
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
            </div>
            <!-- 事项列表的内容结束 -->
        </div>
    </div>
</template>

<script>
import { getMyToDoList, toBeMatter, getUser } from '@/api/todolist/index.js'
export default {
    data() {
        return {
            todoList: '待开(0)',
            nomalList: '已开',
            saveList: '收藏',
            activeName: 'daikai',
            toDoList: '',
            alreadyDone: '',
            collection: '',
            cookie: ''
        }
    },
    created() {
        this.getData()
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
        openNewtarg() {
            window.open("http://oam.chinacoal.com/webcenter/portal/chinacoal_portal/newlink7")
        },
        getData() {
            // 利用当前3.1的用户id获取对应关联用户的cookie
            getMyToDoList({ userId: this.$store.getters.userInfo.userAccount }).then(
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
                                        state: '0',
                                        portal: this.userInfo.data.id,
                                    }).then(
                                        (res) => {
                                            if (res.code == 200) {
                                                this.toDoList = res.data
                                                document.getElementById("tab-daikai").innerHTML = `待开(<span style="color:red">${res.data.tasks.length}</span>)`
                                            }
                                        }
                                    )
                                toBeMatter(
                                    {
                                        size: '6',
                                        cookie: this.cookie,
                                        state: '2',
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
                                        state: '7',
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
        reload() {
            if (!!this.cookie) {
                toBeMatter(
                    {
                        size: '6',
                        cookie: this.cookie,
                        state: '0',
                        portal: this.userInfo.data.id,
                    }).then(
                        (res) => {
                            console.log(res)
                            if (res.code == 200) {
                                this.toDoList = res.data
                               document.getElementById("tab-daikai").innerHTML = `待开(<span style="color:red">${res.data.tasks.length}</span>)`
                            }
                        }
                    )
                toBeMatter(
                    {
                        size: '6',
                        cookie: this.cookie,
                        state: '2',
                        portal: this.userInfo.data.id,
                    }).then(
                        (res) => {
                            console.log(res)
                            if (res.code == 200) {
                                this.alreadyDone = res.data
                                // this.nomalList = `已办(${res.data.tasks.length})`
                                console.log(this.alreadyDone)
                            }
                        }
                    )
                toBeMatter(
                    {
                        size: '6',
                        cookie: this.cookie,
                        state: '7',
                        portal: this.userInfo.data.id,
                    }).then(
                        (res) => {
                            console.log(res)
                            if (res.code == 200) {
                                this.collection = res.data
                                // this.saveList = `收藏(${res.data.tasks.length})`
                                console.log(this.collection)
                            }
                        }
                    )
            } else {
                this.getData()
            }
        }

    }
}
</script>

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