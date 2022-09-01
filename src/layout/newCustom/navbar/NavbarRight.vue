<template>
  <div class="right-menu">
    <template v-if="device !== 'mobile'">
      <!-- <template v-if="showDimension">
        <dimension-select class="right-menu-item hover-effect" />
      </template>
      <template v-if="showSearch">
        <search id="header-search" class="right-menu-item" />
      </template> -->
      <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->
      <!-- <el-tooltip popper-class="tooltip-offset" :content="$t('navbar.chat')" placement="bottom">
        <i
          class="icon-ym icon-ym-header-IM right-menu-item hover-effect"
          @click="openUserList()"
          :class="{ twinkle: isTwinkle }"
        ></i>
      </el-tooltip> -->
      <!-- <el-tooltip popper-class="tooltip-offset" :content="$t('navbar.notice')" placement="bottom">
        <div
          class="right-menu-item hover-effect"
          @click="$refs.MessageList.init()"
        >
          <el-badge :value="messageCount" :hidden="!messageCount">
            <i class="el-icon-chat-dot-square"></i>
          </el-badge>
        </div>
      </el-tooltip> -->
      <!-- <template v-if="showLanguage">
        <lang-select class="right-menu-item hover-effect" />
      </template> -->
    </template>
    <message ref="message"></message>
    <div class="right-menu-item hover-effect links">
      <span
        v-for="(item, index) in links"
        :key="index"
        @click="jumpToLink(item)"
        >{{ item.name }}
        <span  v-if="index !== links.length - 1">丨</span>
        <!-- <el-divider v-if="index !== links.length - 1" direction="vertical" /> -->
      </span>
    </div>
    <el-dropdown
      class="avatar-container right-menu-item hover-effect"
      trigger="hover"
    >
      <div class="avatar-wrapper">
        <img
          :src="define.comUrl + userInfo.headIcon"
          class="user-avatar"
          v-if="userInfo.headIcon"
        />
        <el-avatar v-else class="user-avatar" :size="26"  icon="el-icon-user-solid"></el-avatar>
        <span>{{ userInfo.userName }},欢迎您！</span>
        <i class="el-icon-arrow-down"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="tooltip-offset">
        <!-- <el-dropdown-item
          @click.native="visibleRole = true"
          v-show="this.$store.getters.userInfo.userId != 'admin'"
        >
          <i class="icon-ym icon-ym-generator-flow"></i
          >{{ $t("navbar.switchRole") }}
        </el-dropdown-item> -->
        <router-link to="/profile">
          <el-dropdown-item>
            <i class="icon-ym icon-ym-header-userInfo"></i
            >{{ $t("navbar.profile") }}
          </el-dropdown-item>
        </router-link>
        <!-- <a
          href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=wzq.hk@qq.com"
          target="_blank"
        >
          <el-dropdown-item>
            <i class="icon-ym icon-ym-header-feedBack"></i
            >{{ $t("navbar.feedback") }}
          </el-dropdown-item>
        </a> -->
        <!-- <el-dropdown-item @click.native="visible = true">
          <i class="icon-ym icon-ym-header-about"></i>{{ $t("navbar.about") }}
        </el-dropdown-item> -->
        <!-- <el-dropdown-item @click.native="lock">
          <i class="icon-ym icon-ym-header-lockScreen"></i
          >{{ $t("navbar.lockScreen") }}
        </el-dropdown-item> -->
        <!-- <a href="https://ccit.chinacoal.com/" target="_blank">
          <el-dropdown-item>
            <i class="icon-ym icon-ym-file-text"></i
            >{{ $t("navbar.documentation") }}
          </el-dropdown-item>
        </a> -->
        <el-dropdown-item divided @click.native="handleLogout">
          <i class="icon-ym icon-ym-header-loginOut"></i
          >{{ $t("navbar.logOut") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div
      class="right-menu-item hover-effect"
      style="padding:0"
      @click="$refs.Settings.init()"
      v-if="showSettings && $store.getters.userInfo.userId == 'admin'"
    >
      <i class="icon-ym icon-ym-header-pannel"></i>
    </div>
    <!-- 关于平台弹窗 -->
    <!-- v-el-drag-dialog -->
    <el-dialog
      title="关于平台"
      :close-on-click-modal="false"
      :visible.sync="visible"
      class="CCIT-dialog CCIT-dialog_center about-dialog"
      lock-scroll
      width="400px"
    >
      <div class="about-dialog-main">
        <div>
          <img src="@/assets/images/ccit.png" class="about-logo" />
        </div>
        <div>
          <p class="title">
            <a href="https://ccit.chinacoal.com" target="_blank"
              >CCIT快速开发平台</a
            >
          </p>
          <p>版本：{{ define.version }}</p>
          <p>作者：基础技术开发平台软件</p>
          <p>中煤信息技术（北京）有限公司出品</p>
        </div>
      </div>
      <p class="about-dialog-main-tip">
        解放90%重复性的代码编写工作，让你更加专注于业务和体验！
      </p>
    </el-dialog>
    <el-dialog
      title="切换角色"
      :close-on-click-modal="false"
      :visible.sync="visibleRole"
      class="CCIT-dialog CCIT-dialog_center about-dialog"
      width="450px"
    >
      <div style="padding: 15px; max-height: 200px">
        <CCIT-table
          :data="roleList"
          hasC
          max-height="100%"
          ref="roleTable"
          @select-all="onSelectAll"
          @selection-change="selectItem"
          @row-click="onSelectOp"
        >
          <el-table-column prop="fullName" label="角色名称" />
          <el-table-column
            prop="enCode"
            label="角色编码"
            show-overflow-tooltip
            :width="180"
          />
        </CCIT-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="select()">确定</el-button>
      </span>
    </el-dialog>

    <MessageList ref="MessageList" @read="read" />
    <Settings ref="Settings" />
    <UserList ref="UserList" @changeTwinkle="changeTwinkle" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Message from "./Message.vue"
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import DimensionSelect from "@/components/DimensionSelect";
import LangSelect from "@/components/LangSelect";
import Search from "@/components/HeaderSearch";
import MessageList from "../../components/MessageList";
import Settings from "../../components/settings";
import UserList from "../../components/userList/UserList";
import elDragDialog from "@/directive/el-drag-dialog";
import { UserListAll, currentRole } from "@/api/permission/user";
import { getUserRoleList } from "@/api/permission/role";
import { deepClone } from "@/utils";

export default {
  directives: { elDragDialog },
  components: {
    Message,
    Screenfull,
    SizeSelect,
    DimensionSelect,
    LangSelect,
    Search,
    MessageList,
    UserList,
    Settings,
  },
  computed: {
    ...mapState({
      showDimension: (state) => state.settings.showDimension,
      showLanguage: (state) => state.settings.showLanguage,
      showSearch: (state) => state.settings.showSearch,
      showSettings: (state) => state.settings.showSettings,
    }),
    ...mapGetters(["device", "userInfo"]),
  },
  data() {
    return {
      visibleRole: false,
      visible: false,
      isTwinkle: false,

      userList: [],
      roleList: [],
      multipleSelection: [],
      links: [
        // { name: "刷新", url: "" },
        { name: "帮助", url: "http://app.chinacoal.com/help/bangzhu.html" },
        { name: "集团内网", url: "http://172.16.0.83/" },
        { name: "移动", url: "http://app.chinacoal.com/help/qrcode.html" },
        {
          name: "原门户",
          url: "http://oam.chinacoal.com/webcenter/portal/chinacoal_portal",
        },
      ],
    };
  },
  created() {
    this.getUserList();
    //管理员不进行角色切换
    if (this.$store.getters.userInfo.userId != "admin") {
      this.getUserRoleList();
    }
  },
  destroyed() {
    if (this.socket) {
      //离开路由之后断开websocket连接
      this.socket.close();
      this.socket = null;
      this.$store.commit("user/SET_SOCKET", this.socket);
    }
  },
  watch: {
    visibleRole: "toggle",
  },
  methods: {
    onSelectAll() {
      this.$refs.roleTable.$refs.CCITTable.clearSelection();
    },
    selectItem(rows) {
      if (rows.length > 1) {
        var newRows = rows.filter((it, index) => {
          if (index == rows.length - 1) {
            this.$refs.roleTable.$refs.CCITTable.toggleRowSelection(it, true);
            return true;
          } else {
            this.$refs.roleTable.$refs.CCITTable.toggleRowSelection(it, false);
            return false;
          }
        });
        this.multipleSelection = newRows;
      } else {
        this.multipleSelection = rows;
      }
    },
    onSelectOp(row) {
      this.$refs.roleTable.$refs.CCITTable.clearSelection();
      this.$refs.roleTable.$refs.CCITTable.toggleRowSelection(row, true);
      this.multipleSelection = [];
      this.multipleSelection.push(row);
    },

    toggle(v) {
      if (v) {
        let data = this.roleList;
        if (data.length) {
          setTimeout(() => {
            data.forEach((item) => {
              if (item.current) {
                this.$refs.roleTable.$refs.CCITTable.toggleRowSelection(
                  item,
                  true
                );
              }
            });
          }, 200);
        }
      }
    },
    closeDialog() {
      this.visibleRole = false;
    },
    select() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "至少指定一个角色",
          type: "error",
          duration: 1000,
        });
        return;
      }
      currentRole(this.multipleSelection[0].id).then((res) => {
        this.visibleRole = false;
        window.location.reload();
      });
    },
    getUserRoleList() {
      getUserRoleList(this.$store.getters.userInfo.userId).then((res) => {
        this.roleList = res.data.list;
      });
    },
    getUserList() {
      UserListAll().then((res) => {
        this.$store.commit("base/SET_USER_LIST", res.data.list || []);
        let list = deepClone(res.data.list).filter(
          (o) => o.id !== this.userInfo.userId
        );
        for (let i = 0; i < list.length; i++) {
          let e = list[i];
          this.$set(e, "isOnline", false);
          this.$set(e, "unreadNum", 0);
        }
        this.userList = list;
        this.$refs.message.initWebSocket();
      });
    },

    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    handleLogout() {
      this.$confirm("您确定要退出系统吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.logout();
        })
        .catch(() => {});
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`);
    },
    lock() {
      this.$store.dispatch("user/setLock");
      this.$nextTick(() => {
        this.$router.push("/lockScreen");
      });
    },
    read(isAll) {
      if (isAll) {
        this.messageCount = 0;
      } else {
        this.messageCount -= 1;
        this.messageCount = this.messageCount >= 0 ? this.messageCount : 0;
      }
    },
    openUserList() {
      this.$refs.UserList.init();
    },
    changeTwinkle(boo) {
      this.isTwinkle = boo;
    },
    jumpToLink(url) {
      if (url.name == "刷新") {
        window.location.reload();
      } else {
        window.open(url.url, "_blank");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      vertical-align: text-bottom;
      line-height:60px;
      color: #8DC5FF;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
      &.links {
        span {
          font-size: 14px;
        }
      }
      >>> .el-badge {
        line-height: 1;
        .el-badge__content {
          top: -4px;
        }
      }
      >>> .icon-ym {
        font-size: 18px;
      }
      .icon-ym {
        font-size: 20px;
      }
    }

    .avatar-container {
      // margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          vertical-align: top;
          margin-top: 18px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 24px;
          font-size: 18px;
        }
        span {
          font-size: 14px;
          line-height:60px;
        }
      }
    }
  }
}
.about-dialog {
  &.CCIT-dialog.CCIT-dialog_center >>> .el-dialog .el-dialog__body {
    padding: 0 0 40px 0;
  }
  .about-dialog-main {
    display: flex;
    align-items: center;
    height: 150px;
    padding: 0 30px;
    .about-logo {
      display: inline-block;
      width: 95px;
      height: auto;
      line-height: 95px;
      text-align: center;
      border-radius: 10px;
      color: #fff;
      margin-right: 30px;
    }
    line-height: 24px;
  }
  .about-dialog-main-tip {
    font-size: 12px;
    padding-left: 30px;
    margin: 0;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
  }
}
/* 定义keyframe动画，命名为blink */
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50.01% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.twinkle {
  animation: blink 0.5s linear infinite;
}
.el-divider{
  background-color: #8DC5FF !important;
}
</style>
