<template>
  <div
    class="dialog"
    id="dialog"
    :style="{ visibility: value ? 'visible' : 'hidden' }"
    v-dialogDrag
    draggable="false"
  >
    <div class="header">
      <span class="header-title">智能客服</span>
      <i class="el-icon-minus" @click="closeDialog"></i>
    </div>
    <div class="main" id="main">
      <div v-for="item in msg" :key="item.id">
        <template v-if="item.person === 'robot'">
          <el-row class="row">
            <el-col :span="2"
              ><img src="@/assets/images/cust-service.png" alt=""
            /></el-col>
            <el-col :span="22"
              ><span class="msg">
                {{ item.message }}
              </span></el-col
            >
          </el-row>
        </template>
        <template v-else>
          <el-row class="row" justify="end">
            <el-col :span="22"
              ><span class="msg" style="float: right">
                <p
                  v-if="item.type == 'text'"
                  v-html="item.message"
                  class="chatList__msg--text"
                ></p>
                <img
                  :src="
                    define.comUrl + '/api/file/Image/IM/' + item.message
                  "
                  alt=""
                  class="chatList__msg--img"
                  v-if="item.type == 'image' && item.message"
                  @click="
                    handleEvent(
                      'image',
                      define.comUrl + '/api/file/Image/IM/' + item.message
                    )
                  "
                />
                <audio
                  class="chatList__msg--audio"
                  controls
                  :src="define.comUrl + item.message"
                  v-if="item.type == 'voice' && item.message"
                  @click="
                    handleEvent('voice', define.comUrl + item.message)
                  "
                ></audio>
                <video
                  :src="item.message"
                  controls
                  class="chatList__msg--video"
                  v-if="item.type == 'video'"
                  @click="handleEvent('video', item.message)"
                ></video> </span
            ></el-col>
            <el-col :span="2"
              ><img src="@/assets/images/cust-avatar.png" alt=""
            /></el-col>
          </el-row>
        </template>
      </div>
    </div>
    <div class="bottom">
      <div class="toolbar">
        <el-popover
          placement="top-start"
          trigger="click"
          ref="popover"
          v-model="popoverVisible"
        >
          <div class="emjioBox">
            <ul class="emjio">
              <li
                v-for="(item, i) in this.emojiList"
                :key="i"
                @click="selectEmit(item)"
              >
                <img :src="item.url | urlFilter()" />
              </li>
            </ul>
          </div>
          <el-link
            icon="ym-custom ym-custom-emoticon-neutral"
            :underline="false"
            title="发送表情"
            slot="reference"
          >
          </el-link>
        </el-popover>
        <el-upload
          :show-file-list="false"
          action=""
          :limit="1"
          class="uploadImg-btn"
          :auto-upload="false"
          :on-change="getFile"
          ref="upload"
          accept="image/*"
        >
          <el-link
            icon="ym-custom ym-custom-image"
            :underline="false"
            title="发送图片"
          >
          </el-link>
        </el-upload>
        <!-- <img src="@/assets/images/cust-emoji.png" alt="" />
        <img src="@/assets/images/cust-image.png" alt="" /> -->
      </div>
      <div class="box">
        <el-input
          type="textarea"
          placeholder="很高兴为您服务，请描述您的问题"
          v-model="message"
          @keyup.enter.native="sendMsg"
        ></el-input>
        <el-button
          class="send"
          type="primary"
          size="mini"
          :disabled="!message"
          @click="sendMsg"
          >发送</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import emojiList from "static/emoji.json";
export default {
  filters: {
    urlFilter(url) {
      return require(`static/emoji/${url}`);
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      message: "",
      msg: [
        {
          id: 0,
          person: "robot",
          message: "您好，请问有什么可以帮助您的吗？",
        },
      ],
      emojiList: emojiList,
      popoverVisible: false,
    };
  },
  watch: {
    value(val) {
      if (val) {
        let dialogDiv = document.getElementById("dialog");
        let btnDiv = dialogDiv.parentElement.firstElementChild;
        let clientW = document.documentElement.clientWidth;
        let clientH = document.documentElement.clientHeight;
        // 按钮在屏幕左侧
        if (btnDiv.offsetLeft < clientW / 3) {
          dialogDiv.style.left = "0px";
        } else if (btnDiv.offsetLeft > (clientW / 3) * 2) {
          // 按钮在屏幕右侧
          dialogDiv.style.left = `${clientW - dialogDiv.offsetWidth}px`;
        } else {
          // 按钮在屏幕中间
          dialogDiv.style.left = `${clientW / 2 - dialogDiv.offsetWidth / 2}px`;
        }
        // 按钮在屏幕上方
        if (btnDiv.offsetTop < clientH / 2) {
          dialogDiv.style.top = "0px";
        } else {
          dialogDiv.style.top = `${clientH - dialogDiv.offsetHeight}px`;
        }
      }
    },
  },
  methods: {
    sendMsg() {
      this.msg.push({
        person: "mine",
        message: this.message,
        type: "text",
        id: this.msg.length,
      });
      this.message = "";
      this.$nextTick(() => {
        let div = document.getElementById("main");
        div.scrollTop = div.scrollHeight - div.offsetHeight;
      });
    },
    closeDialog() {
      this.$emit("on-close");
    },
    // 选择表情
    selectEmit(item) {
      this.message += item.alt;
      this.popoverVisible = false;
    },
    // 发送图片
    getFile(file) {
      let isRightSize = file.size < 1024 * 1024 * 5;
      if (!isRightSize) return this.$message.error(`图片大小不能超过5M`);
      this.getBase64(file.raw).then((res) => {
        let data = res;
        this.getImgSize(data.e).then((res) => {
          let messageContent = {
            base64: data.base64,
            width: res.width,
            height: res.height,
          };

          //   this.socket.send(JSON.stringify(sendMessage));
          this.msg.push({
            person: "mine",
            message: this.message,
            type: "image",
            id: this.msg.length,
          });
          this.$refs.upload.clearFiles();
        });
      });
    },
    getBase64(file) {
      let _this = this;
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let msg = { base64: "", e: null };
        reader.readAsDataURL(file);
        reader.onload = function (event) {
          msg.base64 = reader.result.replace(/data:image\/.*;base64,/, "");
          msg.e = event;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(msg);
        };
      });
    },
    getImgSize(event) {
      return new Promise(function (resolve, reject) {
        let size = { width: 0, height: 0 };
        const txt = event.target.result;
        const img = document.createElement("img");
        img.src = txt;
        img.onload = function () {
          size.width = img.width;
          size.height = img.height;
          resolve(size);
        };
        img.onerror = function (error) {
          reject(error);
        };
      });
    },
  },
  directives: {
    dialogDrag(el) {
      const dialogHeaderEl = el.querySelector(".header-title");
      dialogHeaderEl.style.cursor = "move";

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = el.currentStyle || window.getComputedStyle(el, null);
      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;
        // 获取到的值带px 正则匹配替换
        let styL, styT;
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes("%")) {
          styL =
            +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
          styT =
            +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
        } else {
          styL = +sty.left.replace(/\px/g, "");
          styT = +sty.top.replace(/\px/g, "");
        }
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX;
          const t = e.clientY - disY;
          let clientW = document.documentElement.clientWidth;
          let clientH = document.documentElement.clientHeight;
          if (l + styL < 0) {
            el.style.left = "0px";
          } else if (l + styL > clientW - el.offsetWidth) {
            el.style.left = `${clientW - el.offsetWidth}px`;
          } else {
            el.style.left = `${l + styL}px`;
          }
          if (t + styT < 0) {
            el.style.top = "0px";
          } else if (t + styT > clientH - el.offsetHeight) {
            el.style.top = `${clientH - el.offsetHeight}px`;
          } else {
            el.style.top = `${t + styT}px`;
          }
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  z-index: 9999;
  position: fixed;
  width: 420px;
  height: 490px;
  background: #eeeeee;
  border: 1px solid #cccccc;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .header {
    height: 40px;
    background-color: #297bf6;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 14px;
      color: #ffffff;
      line-height: 40px;
      flex: 1;
      padding-left: 20px;
    }
    i {
      color: #fff;
      line-height: 40px;
      padding-right: 20px;
    }
  }
  .main {
    flex: 1;
    overflow-y: auto;
    padding: 10px 20px 10px;
    box-sizing: border-box;
    .row {
      margin-bottom: 10px;
      img {
        width: 36px;
        height: 36px;
      }
      .msg {
        background: #ffffff;
        border-radius: 15px;
        font-size: 14px;
        margin: 0 10px;
        display: inline-block;
        word-wrap: break-word;
        max-width: 100%;
        padding: 10px;
      }
    }
  }
  .bottom {
    height: 110px;
    background-color: #fff;
    .toolbar {
      height: 36px;
      border-bottom: 1px solid #eeeeee;
      padding: 0 20px;
      >>> .el-link {
        line-height: 36px;
        i {
          font-size: 20px;
          margin-right: 10px;
        }
      }
      .uploadImg-btn {
        display: inline-block;
      }
    }
    .box {
      display: flex;
      height: 80px;
      >>> textarea.el-textarea__inner {
        border: 0;
        height: 100%;
      }
      .send {
        height: 30px;
        align-self: center;
        margin-right: 10px;
      }
    }
  }
}

.emjioBox {
  background: #fff;
  height: 150px;
  width: 300px;
  overflow: auto;
  text-align: left;
}
.emjioBox .emjio {
  padding: 0;
}
.emjioBox li {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
}
.chatList__msg--text {
  line-height: 24px;
  >>> img {
    vertical-align: top;
    width: 24px;
    height: 24px;
    display: inline-block;
  }
}
</style>