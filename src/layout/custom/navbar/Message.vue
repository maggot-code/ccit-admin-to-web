<template>
  <el-popover
    class="right-menu-item hover-effect"
    placement="bottom"
    width="400"
    trigger="click"
    v-model="popoverVisible"
    :disabled="!list.length"
  >
    <el-scrollbar class="msg-box">
      <div v-for="(item, index) in list" :key="index" class="item">
        <div class="left">
          <i
            :class="iconClass(item.type)"
          ></i>
        </div>
        <div class="middle">
          <div class="remind">{{item.type | dictType}}</div>
          <div class="content">{{ item.title }}</div>
          <!-- <div class="tip">
            <i class="el-icon-time"></i>
            <span>13:30-14:30</span>

            <i class="el-icon-location-outline"></i>
            <span>中煤大厦405</span>
          </div> -->
        </div>
        <div class="right"><i class="el-icon-arrow-right"></i></div>
      </div>
    </el-scrollbar>
    <div class="clean">
      <el-button type="primary" plain @click="cleanMsg">清空消息</el-button>
    </div>
    <el-badge slot="reference" :value="messageCount" :hidden="!messageCount">
      <i class="icon-ym icon-ym-header-message"></i>
    </el-badge>
  </el-popover>
</template>
<script>
import ReconnectingWebSocket from "reconnecting-websocket";
import { getMessageList, MessageAllRead } from "@/api/system/message";

export default {
  data() {
    return {
      messageCount: 0,
      list: [],
      popoverVisible: false
    };
  },
  computed: {
    iconClass() {
      return (type) => {
        switch (type) {
          case 4:
            return "el-icon-date";
          case 5:
            return "el-icon-s-order";
          case 6:
            return "el-icon-document";
          default:
            break;
        }
      };
    },
  },
  filters: {
  dictType(val) {
    switch (val) {
          case 4:
            return "日程提醒";
          case 5:
            return "督办提醒";
          case 6:
            return "公文提醒";
          default:
            break;
        }
    
  }
},
  mounted() {
    // this.initData();
  },
  methods: {
    initData() {
      let data = {
        currentPage: 1,
        pageSize: 10000,
        sort: "desc",
        type: "-1",
      };
      this.list = [];
      getMessageList(data).then((res) => {
        let list = res.data.list.filter((item) => {
          return item.isRead === 0;
        });
        this.list = list;
        console.log(list);
      });
    },
    initWebSocket() {
      this.socket = this.$store.getters.socket || null;
      if ("WebSocket" in window) {
        if (!this.socket) {
          this.socket = new ReconnectingWebSocket(this.define.WebSocketUrl);
          this.$store.commit("user/SET_SOCKET", this.socket);
        }
        //添加事件监听
        let socket = this.socket;
        socket.onopen = () => {
          var onConnection = {
            method: "OnConnection",
            token: this.$store.getters.token,
            mobileDevice: false,
          };
          socket.send(JSON.stringify(onConnection));
        };
        socket.onmessage = (event) => {
          let data = JSON.parse(event.data);
          if (data.method == "initMessage") {
            this.messageCount = data.unreadExtMsgCount;
            // data.unreadMessageCount + data.unreadNoticeCount;
            if (data.unreadNums.length) {
              this.isTwinkle = true;
            } else {
              this.isTwinkle = false;
            }
            // this.$refs.UserList.handleList(
            //   this.userList,
            //   data.onlineUsers,
            //   data.unreadNums
            // );
          }
          //用户在线
          if (data.method == "Online") {
            // let list = []
            // list.push(data.userId)
            // this.$refs.UserList.handleList(this.userList, list, [])
          }
          //用户离线
          if (data.method == "Offline") {
            // this.$refs.UserList.updateOffLine(data.userId)
          }
          // if (data.method == "messagePush") {
          //   //消息推送（消息公告用的）
          //   this.messageCount += data.unreadNoticeCount;
          //   if (this.$refs.MessageList.visible) {
          //     this.$refs.MessageList.init();
          //   }
          // }
          //用户过期
          if (data.method == "logout") {
            this.$message({
              message: "登录过期,请重新登录",
              type: "error",
              duration: 1000,
              onClose: () => {
                this.$store.dispatch("user/resetToken").then(() => {
                  location.reload();
                });
              },
            });
          }
          //接收对方发送的消息
          if (data.method == "receiveMessage") {
            //判断是否打开窗口
            if (
              this.$refs.UserList &&
              this.$refs.UserList.$refs.CCITIm &&
              this.$refs.UserList.$refs.CCITIm.visible
            ) {
              if (
                this.$refs.UserList.$refs.CCITIm.info.id === data.formUserId
              ) {
                let messIitem = {
                  userId: data.formUserId,
                  messageType: data.messageType,
                  message: data.formMessage,
                  dateTime: this.ccit.toDate(data.dateTime),
                };
                this.$refs.UserList.$refs.CCITIm.addItem(messIitem);
                //更新已读
                let updateReadMessage = {
                  method: "UpdateReadMessage",
                  formUserId: data.formUserId,
                  token: this.$store.getters.token,
                };
                socket.send(JSON.stringify(updateReadMessage));
              } else {
                this.$refs.UserList.updateUnreadNum(data.formUserId);
                this.$refs.UserList.isblink();
              }
            } else {
              this.$refs.UserList.updateUnreadNum(data.formUserId);
              this.$refs.UserList.isblink();
            }
          }
          //显示自己发送的消息
          if (data.method == "sendMessage") {
            if (this.$refs.UserList.$refs.CCITIm.info.id !== data.toUserId)
              return;
            //添加到客户端
            let messIitem = {
              userId: data.UserId,
              messageType: data.messageType,
              message: data.toMessage,
              dateTime: this.ccit.toDate(data.dateTime),
            };
            this.$refs.UserList.$refs.CCITIm.addItem(messIitem);
          }
          //消息列表
          if (data.method == "messageList") {
            this.$refs.UserList.$refs.CCITIm.getList(data);
          }
        };
      }
    },
    cleanMsg() {
      this.popoverVisible = false;
      this.$confirm("您确定全部为已读状态, 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          MessageAllRead().then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1500,
              onClose: () => {
                this.messageCount = 0;
              },
            });
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.el-popover {
  padding: 0;
}
.msg-box {
  width: 100%;
  >>> .el-scrollbar__wrap {
    max-height: 300px;
    overflow-x: hidden;
  }
  .item {
    border-bottom: 1px solid #ebeef5;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;
    .left {
      width: 30px;
      height: 30px;
      background-color: #00b8f4;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      position: relative;
      top: -30px;
      i {
        font-size: 18px;
        text-align: center;
        color: #fff;
        line-height: 30px;
      }
    }
    .middle {
      margin: 0 10px;
      flex: 1;
      .remind {
        font-size: 16px;
        font-weight: 600;
      }
      .content {
        font-size: 14px;
      }
      .tip {
        line-height: 30px;
        color: #9dacb5;
        i {
          color: #00b8f4;
        }
        span {
          margin-right: 20px;
        }
      }
    }
    .right {
      i {
        font-size: 20px;
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
.clean {
  height: 50px;
  margin-top: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-top: 1px solid #ebeef5;
  button {
    position: relative;
    top: 10px;
  }
}
</style>