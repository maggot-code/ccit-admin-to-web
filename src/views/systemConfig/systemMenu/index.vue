<!--
 * @FilePath: \中煤可视化系统\src\views\systemConfig\systemMenu\index.vue
 * @Author: zhangxin
 * @Date: 2022-08-30 16:13:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-01 10:39:19
 * @Description: 
-->
<template>
    <div class="CCIT-common-layout system-menu">
        <div class="CCIT-common-layout-center">
            <div class="CCIT-common-layout-main CCIT-flex-main">
                <div class="CCIT-common-head">
                    <div>
                        <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">新建 </el-button>
                    </div>
                    <div class="CCIT-common-head-right">
                        <el-tooltip effect="dark" content="刷新" placement="top">
                            <el-link
                                icon="icon-ym icon-ym-Refresh CCIT-common-head-icon"
                                :underline="false"
                                @click="executionQuery()"
                            />
                        </el-tooltip>
                        <screenfull :isContainer="true" />
                        <el-tooltip effect="dark" :content="defaultExpandAll ? '折叠' : '展开'" placement="top">
                            <a class="el-link el-link--default" @click="collapesCalendar()">
                                <i v-if="defaultExpandAll" class="icon-ym icon-ym-btn-collapse"></i>
                                <i v-else class="icon-ym icon-ym-btn-expand"></i>
                            </a>
                        </el-tooltip>
                    </div>
                </div>
                <CCIT-table
                    v-loading="listLoading"
                    :data="systemMenuList"
                    row-key="id"
                    :tree-props="{ children: 'children', hasChildren: '' }"
                    :default-expand-all="defaultExpandAll"
                    :key="ccitTableKey"
                >
                    <el-table-column label="名称">
                        <template slot-scope="scope">
                            <i :class="scope.row.icon"></i>
                            <span>{{ scope.row.fullName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="urlAddress" label="菜单地址" />
                    <el-table-column label="类型" align="center" width="100">
                        <template slot-scope="scope">
                            <span>{{ typeMap[scope.row.type] || "未知" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sortCode" label="排序" align="center" width="100" />
                    <el-table-column prop="enabledMark" label="状态" align="center" width="100">
                        <template slot-scope="scope">
                            <el-switch
                                :value="scope.row.enabledMark"
                                inactive-value="00"
                                active-value="01"
                                @change="handleMenuStatus(scope.row.id)"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="addOrUpdateHandle(scope.row.id)">编辑</el-button>
                            <el-button class="CCIT-table-delBtn" type="text" @click="handleDel(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </CCIT-table>
            </div>
        </div>
        <el-dialog
            class="CCIT-dialog CCIT-dialog_center"
            :title="dialogTitle"
            modal
            lock-scroll
            width="600px"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
        >
            <SystemMenuDialog :key="dialogKey" :info="info" @closeDialog="closeDialog"></SystemMenuDialog>
        </el-dialog>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getSystemMenuList, delSystemMenuInfoById, revisionMenuStatusById } from "../api/system-menu.api";
import SystemMenuDialog from "./systemMenuDialog.vue";
export default {
    name: "system-menu",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: { SystemMenuDialog },
    props: {},
    data() {
        //这里存放数据
        return {
            // 数据列表
            listLoading: true,
            systemMenuList: [],
            // 折叠tree结构
            defaultExpandAll: false,
            ccitTableKey: +new Date(),
            typeMap: ["目录", "页面"],
            // 弹框
            dialogVisible: false,
            dialogTitle: "新增",
            info: {},
            dialogKey: +new Date()
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // 查询菜单列表
        executionQuery() {
            this.listLoading = true;
            getSystemMenuList({ keyword: "", category: "Web", classify: "" }).then((res) => {
                this.systemMenuList = res.data.list;
                this.listLoading = false;
            });
        },
        // 处理当前列菜单是否禁用
        handleMenuStatus(id) {
            this.$confirm("您确定要禁用当前菜单吗, 是否继续?", "提示", {
                type: "warning"
            })
                .then(() => {
                    revisionMenuStatusById(id).then((res) => {
                        this.$message({
                            type: "success",
                            message: res.msg,
                            onClose: () => {
                                this.executionQuery();
                            }
                        });
                    });
                })
                .catch(() => {});
        },
        // 折叠tree结构
        collapesCalendar() {
            this.defaultExpandAll = !this.defaultExpandAll;
            this.ccitTableKey = +new Date();
        },
        // 弹框操作
        addOrUpdateHandle(id) {
            this.dialogTitle = id ? "编辑菜单" : "新增菜单";
            this.info = {
                id
            };
            this.dialogKey = +new Date();
            this.dialogVisible = true;
        },
        closeDialog(status) {
            this.dialogVisible = false;
            if (status) this.executionQuery();
        },
        // 处理删除操作
        handleDel(id) {
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                type: "warning"
            })
                .then(() => {
                    delSystemMenuInfoById(id).then((res) => {
                        this.$message({
                            type: "success",
                            message: res.msg,
                            onClose: () => {
                                this.executionQuery();
                            }
                        });
                    });
                })
                .catch(() => {});
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.executionQuery();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
</style>