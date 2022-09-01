<template>
    <div :class="['portal-box', titleColor]" :style="cardStyle">
        <!-- <marquee behavior="alternate" loop="2" direction="right" scrollamount="10" class="topline">
            让我掉下眼泪的 不止昨夜的酒
        </marquee> -->
        <div class="box topline">
            <div class="txt">
               <a href="http://172.16.0.83/web974758/subject/n1/n974758/n974770/n974869/c2099487/content.html" target="_blank">中煤集团虎年首月开门红&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a href="http://172.16.0.83/web974758/subject/n1/n974758/n974770/n974869/c2099450/content.html" target="_blank">虎力全开！中煤集团春节假期能源保供再创新高！&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a href="http://172.16.0.83/web974758/subject/n1/n974758/n974770/n974869/c2099216/content.html" target="_blank">彭毅看望慰问节日期间值班值守人员&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a href="http://172.16.0.83/web974758/subject/n1/n974758/n974770/n974869/c2098813/content.html" target="_blank">集团公司召开新春团拜会&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a href="http://172.16.0.83/web974758/subject/n1/n974758/n974770/n974869/c2097605/content.html" target="_blank">中煤集团董事会召开2022年第二次会议&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a href="http://172.16.0.83/web974758/subject/n1/n974758/n974770/n974869/c2097593/content.html" target="_blank">集团公司获“2021年度中央企业考核分配工作先进单位”荣誉称号&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a href="http://172.16.0.83/web974758/subject/n1/n974758/n974770/n974869/c2097536/content.html" target="_blank">中煤集团2022新春致辞&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;</a>
            </div>
        </div>
        <!-- <el-card > -->
        <div class="portal-boxokkok">
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
                <div class="checList">
                    <div class="OAclassBG" @click="filterData('oaid')">OA</div>
                    <div class="ITclassBG" @click="filterData('itzhid')">IT</div>
                    <div class="ERPclassBG" @click="filterData('erpid')">ERP</div>
                    <div class="dianshangclassBG" @click="filterData('pecid')">电商</div>
                    <div class="falvclassBG" @click="filterData('flswid')">法律</div>
                    <div class="kechuangclassBG" @click="filterData('kjcx')">科创</div>
                    <div class="kehuclassBG" @click="filterData('crmid')">客户</div>
                    <div class="waishiclassBG" @click="filterData('famsid')">外事</div>
                    <div class="xuexiclassBG" @click="filterData('xuexi')">学习</div>
                </div>
                <div class="right">
                    <span v-if="item.showFresh" title="刷新" class="item">
                        <span style="color:#F8BDC0;font-size:14px;font-weight:500;cursor: pointer;" @click="getData('')">刷新</span>
                    </span>
                    <span v-if="item.showMore" title="更多" class="item">
                        <span style="color:#F8BDC0;font-size:14px;font-weight:500;cursor: pointer;" @click="jumpToMore">更多</span>
                    </span>
                </div>
            </div>

            <div class="portal-box-body todolist" :style="bodyStyle" v-loading="loading">
                <div class="innerTabs" v-if="showOuter">
                    <el-tabs v-model="activeName">
                        <el-tab-pane :label="'待办(0)'" name="daiban">
                            <div v-if='toDoList.tasks && toDoList.tasks.length!=0'>
                                <div class="list" v-for="(item,index) in toDoList.tasks" :key="index" @click="formatUrl(toDoList,item,toDoList.state)">
                                    <div class="listIcon">
                                        <div v-if="item.appId==='加密'" class="listIcond33838">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='oaid' && xuexiState === false" class="OAclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='itzhid' && xuexiState === false" class="ITclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='erpid' && xuexiState === false" class="ERPclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='pecid' && xuexiState === false" class="dianshangclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='flswid' && xuexiState === false" class="falvclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='kjcx' && xuexiState === false" class="kechuangclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='crmid' && xuexiState === false" class="kehuclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='famsid' && xuexiState === false" class="waishiclass">{{item.typeName}}</div>
                                        <div v-else-if="xuexiState === true" class="xuexiclass">学习</div>
                                        <div v-else class="OAclass">{{item.typeName}}</div>
                                    </div>
                                    <div class="listcontent">
                                        {{item.taskName}}
                                    </div>
                                    <div class="listtext" v-if="item.leaderFlag===true">
                                        领导待办
                                    </div>
                                    <div class="listTime">
                                        {{item.handleTime}}
                                    </div>
                                </div>
                            </div>
                            <div v-else class="nolistparent">
                                <div class="nolist"></div>
                                <div class="listtextnopage">暂时没有待办事项...</div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="'已办'" name="yiban">
                            <div v-if='alreadyDone.tasks && alreadyDone.tasks.length!=0'>
                                <div class="list" v-for="(item,index) in alreadyDone.tasks" :key="index" @click="formatUrl(alreadyDone,item,alreadyDone.state)">
                                    <div class="listIcon">
                                        <div v-if="item.appId==='加密'" class="listIcond33838">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='oaid' && xuexiState === false" class="OAclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='itzhid' && xuexiState === false" class="ITclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='erpid' && xuexiState === false" class="ERPclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='pecid' && xuexiState === false" class="dianshangclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='flswid' && xuexiState === false" class="falvclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='kjcx' && xuexiState === false" class="kechuangclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='crmid' && xuexiState === false" class="kehuclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='famsid' && xuexiState === false" class="waishiclass">{{item.typeName}}</div>
                                        <div v-else-if="xuexiState === true" class="xuexiclass">学习</div>
                                        <div v-else class="OAclass">{{item.typeName}}</div>
                                    </div>
                                    <div class="listcontent">
                                        {{item.taskName}}
                                    </div>
                                    <div class="listtext" v-if="item.leaderFlag===true">
                                        领导已办
                                    </div>
                                    <div class="listTime">
                                        {{item.handleTime}}
                                    </div>
                                </div>
                            </div>
                            <div v-else class="nolistparent">
                                <div class="nolist"></div>
                                <div class="listtextnopage">暂时没有已办事项...</div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="'收藏'" name="save1">
                            <div v-if='collection.tasks && collection.tasks.length!=0'>
                                <div class="list" v-for="(item,index) in collection.tasks" :key="index" @click="formatUrl(collection,item,collection.state)">
                                    <div class="listIcon">
                                        <div v-if="item.appId==='加密'" class="listIcond33838">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='oaid' && xuexiState === false" class="OAclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='itzhid' && xuexiState === false" class="ITclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='erpid' && xuexiState === false" class="ERPclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='pecid' && xuexiState === false" class="dianshangclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='flswid' && xuexiState === false" class="falvclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='kjcx' && xuexiState === false" class="kechuangclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='crmid' && xuexiState === false" class="kehuclass">{{item.typeName}}</div>
                                        <div v-else-if="item.appId==='famsid' && xuexiState === false" class="waishiclass">{{item.typeName}}</div>
                                        <div v-else-if="xuexiState === true" class="xuexiclass">学习</div>
                                        <div v-else class="OAclass">{{item.typeName}}</div>
                                    </div>
                                    <div class="listcontent">
                                        {{item.taskName}}
                                    </div>
                                    <div class="listtext" v-if="item.leaderFlag===true">
                                        领导收藏
                                    </div>
                                    <div class="listTime">
                                        {{item.handleTime}}
                                    </div>
                                </div>
                            </div>
                            <div v-else class="nolistparent">
                                <div class="nolist"></div>
                                <div class="listtextnopage">暂时没有收藏事项...</div>
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
                        <pagination v-if="showPagination" :total="total" :page.sync="params.currentPage" :limit.sync="params.pageSize" @pagination="getData('')" />
                    </template>
                </div>
            </div>
        </div>
        <!-- </el-card> -->
    </div>

</template>
<script>
import { getFlowTodo } from "@/api/home";
import { mixin } from "../visualPortalMixin";
import { getMyToDoList, getMyToDoList2, getUser, toBeLearn } from '@/api/todolist/index'
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
            activeName: 'daiban',
            // 三中数据的数据源
            toDoList: '',
            alreadyDone: '',
            collection: '',
            // 筛选数据的copy
            toDoListCopy: '',
            alreadyDoneCopy: '',
            collectionCopy: '',
            userInfo: '',
            xuexiState: false,
            panduanstate: ''

        };
    },
    mounted() {
        if (this.pageSize) {
            this.params.pageSize = this.pageSize
        }
        this.columns = this.list;
        this.getData('');
        document.addEventListener('visibilitychange', () => { // 浏览器切换事件
            if (document.visibilityState === 'hidden') { // 离开当前tab标签
                // console.log("离开当前tab标签");
            } else { // 回到当前tab标签
                this.getData(this.panduanstate);
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
        getData(appId) {
            this.loading = true
            // 利用当前3.1的用户id获取对应关联用户的cookie
            if (!!this.userInfo && !!this.cookie) {
                //根据用户信息获取待办
                getMyToDoList2(
                    {
                        size: '6',
                        cookie: this.cookie,
                        state: '0',
                        portal: this.userInfo.data.id,
                        appId: appId
                    }).then(
                        (res) => {
                            if (res.code == 200) {
                                this.loading = false
                                this.toDoList = res.data
                                // this.toDoListCopy = res.data
                                document.getElementById("tab-daiban").innerHTML = `待办(<span style="color:red">${res.data.dbNums}</span>)`
                            }
                        }
                    )
                getMyToDoList2(
                    {
                        size: '6',
                        cookie: this.cookie,
                        state: '2',
                        portal: this.userInfo.data.id,
                        appId: appId
                    }).then(
                        (res) => {
                            if (res.code == 200) {
                                this.alreadyDone = res.data
                                // this.alreadyDoneCopy = res.data
                            }
                        }
                    )
                getMyToDoList2(
                    {
                        size: '6',
                        cookie: this.cookie,
                        state: '7',
                        portal: this.userInfo.data.id,
                        appId: appId
                    }).then(
                        (res) => {
                            if (res.code == 200) {
                                this.collection = res.data
                                // this.collectionCopy = res.data
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
                            //利用门户的cookie获取门户的用户信息
                            getUser({ cookie: res.data.oamCookie }).then(
                                (res) => {
                                    if (res.code == 200) {
                                        this.userInfo = res
                                        //根据用户信息获取待办
                                        getMyToDoList2(
                                            {
                                                size: '6',
                                                cookie: this.cookie,
                                                state: '0',
                                                portal: this.userInfo.data.id,
                                                appId: appId
                                            }).then(
                                                (res) => {
                                                    if (res.code == 200) {
                                                        this.loading = false
                                                        this.toDoList = res.data
                                                        // this.toDoListCopy = res.data
                                                        document.getElementById("tab-daiban").innerHTML = `待办(<span style="color:red">${res.data.dbNums}</span>)`
                                                    }
                                                }
                                            )
                                        getMyToDoList2(
                                            {
                                                size: '6',
                                                cookie: this.cookie,
                                                state: '2',
                                                portal: this.userInfo.data.id,
                                                appId: appId
                                            }).then(
                                                (res) => {
                                                    if (res.code == 200) {
                                                        this.alreadyDone = res.data
                                                        // this.alreadyDoneCopy = res.data
                                                    }
                                                }
                                            )
                                        getMyToDoList2(
                                            {
                                                size: '6',
                                                cookie: this.cookie,
                                                state: '7',
                                                portal: this.userInfo.data.id,
                                                appId: appId
                                            }).then(
                                                (res) => {
                                                    if (res.code == 200) {
                                                        this.collection = res.data
                                                        // this.collectionCopy = res.data
                                                    }
                                                }
                                            )
                                    }




                                }
                            )
                        } else if (res.code == 400) {
                            document.getElementById("tab-daiban").innerHTML = `待办(<span style="color:red">0</span>)`
                            this.loading = false
                        }
                    }
                ).catch((err) => {
                    console.log(err)
                });

            }

        },
        getData2() {
            this.loading = true
            // 利用当前3.1的用户id获取对应关联用户的cookie
            if (!!this.userInfo && !!this.cookie) {
                toBeLearn(
                    {
                        size: '6',
                        cookie: this.cookie,
                        state: '0',
                        portal: this.userInfo.data.id,
                    }).then(
                        (res) => {
                            if (res.code == 200) {
                                this.loading = false
                                this.toDoList = res.data
                                // this.toDoListCopy = res.data
                                document.getElementById("tab-daiban").innerHTML = `待办(<span style="color:red">${res.data.dyNums}</span>)`
                            }
                        }
                    )
                toBeLearn(
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
                toBeLearn(
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
            } else {
                getMyToDoList({ userId: this.$store.getters.userInfo.userAccount }).then(
                    (res) => {
                        if (res.code == 200) {
                            let url = res.data.loginCookie + ';domain=chinacoal.com'
                            document.cookie = url
                            this.cookie = res.data.oamCookie
                            //利用门户的cookie获取门户的用户信息
                            getUser({ cookie: res.data.oamCookie }).then(
                                (res) => {
                                    if (res.code == 200) {
                                        this.userInfo = res
                                        //根据用户信息获取待办
                                        toBeLearn(
                                            {
                                                size: '6',
                                                cookie: this.cookie,
                                                state: '0',
                                                portal: this.userInfo.data.id,
                                            }).then(
                                                (res) => {
                                                    if (res.code == 200) {
                                                        this.loading = false
                                                        this.toDoList = res.data
                                                        // this.toDoListCopy = res.data
                                                        document.getElementById("tab-daiban").innerHTML = `待办(<span style="color:red">${res.data.dyNums}</span>)`
                                                    }
                                                }
                                            )
                                        toBeLearn(
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
                                        toBeLearn(
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
                        } else if (res.code == 400) {
                            document.getElementById("tab-daiban").innerHTML = `待办(<span style="color:red">0</span>)`
                            this.loading = false
                        }


                    }
                ).catch((err) => {
                    console.log(err)
                });
            }

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
        jumpToMore() {
            let url = ''
            if (this.activeName == 'daiban') {
                url = `http://oam.chinacoal.com/unionTaskWS/taskListUserUAT.jsp?userCode=${this.userInfo.data.id}&state=0`
            } else if (this.activeName == 'yiban') {
                url = `http://oam.chinacoal.com/unionTaskWS/taskListUserUAT.jsp?userCode=${this.userInfo.data.id}&state=2`
            } else if (this.activeName == 'save1') {
                url = `http://oam.chinacoal.com/unionTaskWS/taskListUserUAT.jsp?userCode=${this.userInfo.data.id}&state=7`
            }
            window.open(url)
        },
        filterData(data) {
            this.panduanstate = data
            if (data === 'xuexi') {
                this.xuexiState = true
                this.getData2()
            } else {
                this.xuexiState = false
                this.getData(data)
            }
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
    display: flex;
    align-items: center;
    // justify-content: space-between;
    padding: 8px 0;
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
    width: calc(100% - 230px);
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 20px;
    // flex-grow: 1;
}
.listtext {
    width: 70px;
    height: 27px;
    text-align: center;
    background: #f95c28;
    color: #ffffff !important;
    border-radius: 5px;
    line-height: 27px;
    font-size: 12px !important;
    margin-right: 35px !important;
}
.listtext,
.listTime {
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: auto;
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
.listIcon3db0d9 {
    background: #3db0d9;
}
.listIcond33838 {
    background: #d33838;
}
.listIcone5951f {
    background: #e5951f;
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
}
.nolist {
    width: 184px;
    height: 129px;
    margin: 40px auto 40px;
    background: url("images/nolist.png") no-repeat;
    background-size: 100%;
}
.listtext {
    margin: auto;
    // font-size: 13px;
    color: #999999;
}
.checList {
    display: flex;
    // align-items: center;
    margin-top: 4px;
    padding-left: 45px;
}
.checList > div {
    width: 61px;
    height: 30px;
    align-items: center;
    line-height: 30px;
    text-align: center;
    // border-radius: 6px;
    font-size: 12px;
    // margin: 0px 2px;
    cursor: pointer;
}
.portal-common-title {
    justify-content: unset;
}
.right {
    flex-grow: 1;
    text-align: right;
}
// 切换的颜色
.OAclass {
    background: #3289e0;
    color: #ffffff;
}
.ITclass {
    background: #7cabb1;
    color: #ffffff;
}
.ERPclass {
    background: #bc84a8;
    color: #ffffff;
}
.dianshangclass {
    background: #c7b25c;
    color: #ffffff;
}
.falvclass {
    background: #d4845b;
    color: #ffffff;
}
.kechuangclass {
    background: #579572;
    color: #ffffff;
}
.kehuclass {
    background: #d99c56;
    color: #ffffff;
}
.waishiclass {
    background: #8776c0;
    color: #ffffff;
}
.xuexiclass {
    background: #3e8ab8;
    color: #ffffff;
}

// 按钮的背景
.OAclassBG {
    background: url("./images/OAclass.png") no-repeat;
    color: #ffffff;
}
.ITclassBG {
    background: url("./images/ITclass.png") no-repeat;
    color: #ffffff;
}
.ERPclassBG {
    background: url("./images/ERPclass.png") no-repeat;
    color: #ffffff;
}
.dianshangclassBG {
    background: url("./images/dianshangclass.png") no-repeat;
    color: #ffffff;
}
.falvclassBG {
    background: url("./images/falvclass.png") no-repeat;
    color: #ffffff;
}
.kechuangclassBG {
    background: url("./images/kechuangclass.png") no-repeat;
    color: #ffffff;
}
.kehuclassBG {
    background: url("./images/kehuclass.png") no-repeat;
    color: #ffffff;
}
.waishiclassBG {
    background: url("./images/waishiclass.png") no-repeat;
    color: #ffffff;
}
.xuexiclassBG {
    background: url("./images/xuexiclass.png") no-repeat;
    color: #ffffff;
}

.listtextnopage {
    width: 150px;
    text-align: center;
    margin: auto;
    color: #999;
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
// .titleIconhover:hover {
//     color: #000 !important;
//     font-weight: bold !important;
// }
.portal-box {
    background-color: transparent !important;
}
.portal-boxokkok {
    height: calc(100% - 30px);
    background: url("images/body01.png") no-repeat !important;
    background-size: 100% 100% !important;
    // border-radius: 15px;
    margin-top: -1.5px;
}
.topline {
    // height:calc(100% - 30px) ;
    height: 30px;
    line-height: 30px;
    background: url("images/top-02.png") no-repeat !important;
    background-size: 100% 100% !important;
    // border-radius: 5px;
}
.box {
    // width: 100%;
    color: #95252a;
    font-size: 14px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    .txt {
        // display: flex;
        // overflow: auto;
        animation: 20s wordsLoop linear infinite normal;
        a {
            // width: 100%;
            // margin-right: 20px;
            text-align: center;
        }
    }
    .txt:hover {
        animation-play-state: paused;
        // -webkit-animation: wordsLoop 0s;
        // color: #000000;
        // opacity: 0.5;
    }
}

@keyframes wordsLoop {
    0% {
        transform: translateX(0px);
    }
    100% {
        transform: translateX(-100%);
    }
}
.el-card {
    border: 0 !important;
}
.portal-common-title .right span:hover {
    color: #f8bdc0 !important;
    font-weight: 500 !important;
}
.portal-common-title .left span {
    padding-left: 1px;
}
</style>