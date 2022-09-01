<template>
  <el-card class="login-form" :style="cardStyle" :shadow="shadow">
    <img class="login-logo" :src="imgUrl.logo" alt="" />
    <div class="login-tab" v-if="showTab">
      <a class="item" :class="{ active: active == 0 }" @click="active = 0">{{
        $t("login.title")
      }}</a
      >&nbsp;&nbsp;
      <a
        v-if="useScan"
        class="item"
        :class="{ active: active == 1 }"
        @click="active = 1"
        >{{ $t("login.scanTitle") }}</a
      >&nbsp;&nbsp;
      <a
        v-if="useFace"
        class="item"
        :class="{ active: active == 2 }"
        @click="active = 2"
        >{{ $t("login.faceTitle") }}</a
      >
    </div>
    <el-form
      v-show="active == 0"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      label-position="left"
    >
      <el-form-item
        prop="account"
        class="default-input"
        :style="cssStyle(0, 'accountSts')"
      >
        <!-- <el-tooltip
          popper-class="login-tooltip"
          v-model="showTooltip"
          placement="top"
          effect="light"
          manual
        >
          <div class="tooltip" slot="content">
            <i class="el-icon-error tooltip-icon" />账号或密码错误
          </div>
          <el-input
            ref="account"
            v-model="loginForm.account"
            :placeholder="list[0].placeholder"
            name="account"
            type="text"
            tabindex="1"
            autocomplete="on"
            size="large"
            @blur="onBlur('accountSts')"
            @focus="onFocus('accountSts')"
          >
            <template slot="prepend">
              <template v-if="list[0].iconType === 'icon'">
                <i
                  v-show="list[0].focus && accountSts"
                  :class="list[0].activeIcon"
                ></i>
                <i
                  v-show="!list[0].focus || !accountSts"
                  :class="list[0].originIcon"
                ></i>
              </template>
              <template v-else
                ><img
                  v-show="list[0].focus && accountSts"
                  :src="imgUrl.userActive" />
                <img
                  v-show="!list[0].focus || !accountSts"
                  :src="imgUrl.userOrigin"
              /></template>
              <div
                class="divide"
                :style="divideStyle(0, 'accountSts')"
              ></div> </template
          ></el-input>
        </el-tooltip> -->
        <el-input
          ref="account"
          v-model="loginForm.account"
          :placeholder="list[0].placeholder"
          name="account"
          type="text"
          tabindex="1"
          autocomplete="on"
          size="large"
          @blur="onBlur('accountSts')"
          @focus="onFocus('accountSts')"
        >
          <template slot="prepend">
            <template v-if="list[0].iconType === 'icon'">
              <i
                v-show="list[0].focus && accountSts"
                :class="list[0].activeIcon"
              ></i>
              <i
                v-show="!list[0].focus || !accountSts"
                :class="list[0].originIcon"
              ></i>
            </template>
            <template v-else
              ><img
                v-show="list[0].focus && accountSts"
                :src="imgUrl.userActive" />
              <img
                v-show="!list[0].focus || !accountSts"
                :src="imgUrl.userOrigin"
            /></template>
            <div
              class="divide"
              :style="divideStyle(0, 'accountSts')"
            ></div> </template
        ></el-input>
      </el-form-item>
      <!--<el-form-item class="rule-tip">{{$t('login.rule')}}</el-form-item>-->
      <el-tooltip
        v-model="capsTooltip"
        :content="$t('login.upper')"
        placement="right"
        manual
      >
        <el-form-item
          prop="password"
          class="default-input"
          :style="cssStyle(1, 'passwordSts')"
        >
          <el-input
            ref="password"
            v-model="loginForm.password"
            show-password
            :placeholder="list[1].placeholder"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleLogin"
            @blur="onBlur('passwordSts')"
            @focus="onFocus('passwordSts')"
            size="large"
          >
            <template slot="prepend">
              <template v-if="list[1].iconType === 'icon'">
                <i
                  v-show="list[1].focus && passwordSts"
                  :class="list[1].activeIcon"
                ></i>
                <i
                  v-show="!list[1].focus || !passwordSts"
                  :class="list[1].originIcon"
                ></i>
              </template>
              <template v-else
                ><img
                  v-show="list[1].focus && passwordSts"
                  :src="imgUrl.pwdActive" />
                <img
                  v-show="!list[1].focus || !passwordSts"
                  :src="imgUrl.pwdOrigin"
              /></template>

              <div
                class="divide"
                :style="divideStyle(1, 'passwordSts')"
              ></div></template
          ></el-input>
        </el-form-item>
      </el-tooltip>
      <el-form-item
        v-if="useVerifiCode"
        prop="code"
        :style="cssStyle(2, codeSts)"
      >
        <el-row>
          <el-col :span="18">
            <el-input
              class="default-input"
              ref="code"
              type="text"
              name="code"
              v-model="loginForm.code"
              autocomplete="on"
              tabindex="3"
              :placeholder="list[2].placeholder"
              :prefix-icon="list[2].icon"
              size="large"
              @keyup.enter.native="handleLogin"
              @blur="onBlur('codeSts')"
              @focus="onFocus('codeSts')"
            >
            </el-input>
          </el-col>
          <el-col :span="6">
            <img
              id="imgcode"
              class="imgcode"
              alt="点击切换验证码"
              title="点击切换验证码"
              :src="define.comUrl + codeUrl"
              @click="changeImg"
            />
          </el-col>
        </el-row>
      </el-form-item>

      <el-button
        :loading="loading"
        class="login-btn"
        size="large"
        :style="cssStyle(3, 'buttonSts')"
        @click.native.prevent="handleLogin"
        @mouseenter.native="buttonSts = true"
        @mouseleave.native="buttonSts = false"
        >登 录</el-button
      >
      <el-form-item v-if="useRemember">
        <el-checkbox v-model="remember" :style="cssStyle(4, 'remember')"
          >记住密码</el-checkbox
        >
        <!-- <span
          style="
            cursor: pointer;
            color: #f19149;
            font-size: 0.75rem;
            margin-left: 5px;
          "
          >忘记密码？</span
        > -->
      </el-form-item>

      <div v-if="list.length > 4 && list[5].show" :style="cssStyle(5)">
        <span style="line-height: 24px">温馨提示： </span><br />
        <span>{{ list[5].text }}</span>
      </div>
    </el-form>
    <div v-show="active == 1" class="login-form-QRCode">
      <img class="qrcode-img" src="@/assets/images/login_qr.png" />
      <p class="qrcode-tip">{{ $t("login.scanTip") }}</p>
    </div>
    <div v-show="active == 2">
      <div style="position: relative">
        <div class="face-scan">
          <div v-if="!cut" class="face-scan-inner">
            <video
              id="video_login"
              width="210px"
              height="210px"
              autoplay="autoplay"
              style="border-radius: 10px; margin-top: 70px; margin-left: 72px"
            ></video>
            <canvas
              id="canvas_login"
              width="210px"
              height="210px"
              style="display: none"
            ></canvas>
          </div>
          <div v-else class="face-scan-inner">
            <img
              :src="imgData"
              alt=""
              style="
                width: 210px;
                height: 210px;
                border-radius: 10px;
                margin-top: 70px;
                margin-left: 72px;
              "
            />
          </div>
        </div>
        <div v-show="faceShow" class="face-scan face-scan-img"></div>
        <div v-show="success" class="face-scan face-scan-success-img"></div>
        <div v-html="faceMsg" class="log-font"></div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getSysInfoVal } from "@/api/system/sysConfig";
import { faceLogin, faceScan } from "@/api/system/face";
var timer = null;
export default {
  mixins: [mixin],
  props: {
    item: { type: Object, default: () => {} },
  },
  data() {
    return {
      list: [],
      loginForm: {
        account: "",
        password: "",
        timestamp: "",
        code: "",
        type: 0,
      },
      active: 0,
      loginRules: {
        account: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("login.accountTip"),
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("login.passwordTip"),
          },
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("login.smsCode"),
          },
        ],
      },
      capsTooltip: false,
      remember: false,
      loading: false,
      faceMsg: "", //控制人脸识别日志进度
      success: false, //控制人脸登录是否成功
      cut: false, //控制人脸识别是否成功
      faceShow: false, //控制人脸识别圆形外框的特效图是否显示
      useScan: true, //启用扫码登录
      useFace: true, //启用人脸识别
      useVerifiCode: true, //启用验证码
      useRemember: false, //启用记住密码
      showTab: false,
      logoObject: {},
      accountSts: false,
      passwordSts: false,
      codeSts: false,
      buttonSts: false,
      codeUrl: "",
      imgUrl: {
        logo: require("@/assets/images/login_logo.png"),
        userOrigin: "",
        userActive: "",
        pwdOrigin: "",
        pwdActive: "",
      },
      buttonCss: "",
      showTooltip: false,
    };
  },

  watch: {
    list: {
      handler(val) {
        this.handleImgUrl();
      },
      deep: true,
    },
    loginLoading(val) {
      if (!val) this.loading = false;
    },
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
    item: {
      handler(val) {
        this.active = 0;
        this.showTab = this.useScan || this.useFace;
        this.useVerifiCode = val.useVerifiCode;
        this.logoObject = val.logoObject;
      },
      deep: true,
    },
    active(newVal, oldVal) {
      this.loginForm.type = newVal;
      let _this = this;
      if (newVal != 2) {
        _this.loginForm.code = "";
        if (oldVal === 2) {
          _this.faceShow = false;
          _this.closeVideo();
          clearInterval(timer);
        }
        return;
      } else {
        _this.initFaceScan();
      }
    },
  },
  computed: {
    cssStyle() {
      return (index, focusType) => {
        let obj = {};
        let color = "";
        if (index < this.list.length) {
          let css = this.list[index].css;

          if (css) {
            obj = JSON.parse(css);
          }
          if (this.list[index].focus) {
            color = this[focusType]
              ? this.list[index].activeColor
              : this.list[index].originColor;
          } else {
            color = this.list[index].originColor;
          }
        }
        switch (index) {
          case 0:
          case 1:
          case 2:
            obj.borderColor = color;
            if (this[focusType]) {
              obj.boxShadow = `5px 5px 10px 0px ${this.list[index].shadowColor}`;
            }
            break;
          case 3:
            obj.backgroundColor = color;
            break;
          case 4:
            obj.borderColor = color;
            obj.color = color;
            break;
          default:
            break;
        }
        return obj;
      };
    },
    divideStyle() {
      return (index, focusType) => {
        let color = "";
        if (this.list[index].focus) {
          color = this[focusType]
            ? this.list[index].activeColor
            : this.list[index].originColor;
        } else {
          color = this.list[index].originColor;
        }
        return { borderColor: color, backgroundColor: color };
      };
    },
  },
  created() {
    if (!this.useVerifiCode) {
      getSysInfoVal("universalLoginCode")
        .then((res) => {
          this.loginForm.code = res.data.value;
        })
        .catch((err) => {});
    } else {
      this.changeImg();
    }
    this.getCookie();
    this.handleImgUrl();
  },
  methods: {
    handleImgUrl() {
      if (this.list[0].iconType === "img") {
        this.imgUrl.userOrigin =
          this.define.comUrl +
          "/api/file/Image/annex/" +
          this.list[0].originImg;
        this.imgUrl.userActive =
          this.define.comUrl +
          "/api/file/Image/annex/" +
          this.list[0].activeImg;
      }
      if (this.list[1].iconType === "img") {
        this.imgUrl.pwdOrigin =
          this.define.comUrl +
          "/api/file/Image/annex/" +
          this.list[1].originImg;
        this.imgUrl.pwdActive =
          this.define.comUrl +
          "/api/file/Image/annex/" +
          this.list[1].activeImg;
      }
      if (this.logoObject.fileId) {
        this.imgUrl.logo =
          this.define.comUrl +
          "/api/file/Image/annex/" +
          this.logoObject.fileId;
      }
    },
    openVideo(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(success)
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error);
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      } else {
        this.$message({ message: "获取摄像头权限失败", type: "warning" });
      }
    },
    initFaceScan() {
      let _this = this;
      _this.faceMsg = '<p class="log-font">打开摄像头中...</p>';
      let constraints = {
        video: { width: 210, height: 210 },
        audio: false,
      };
      //获得video摄像头区域
      let video = document.getElementById("video_login");
      let success = function (MediaStream) {
        video.srcObject = MediaStream;
        video.play();
        _this.faceShow = true;
        _this.faceMsg = "<p>正在获取人脸数据...</p>";
      };
      _this.openVideo(constraints, success);

      timer = setInterval(function () {
        if (_this.cut) {
          return;
        }
        //获得Canvas对象
        let video = document.getElementById("video_login");
        let canvas = document.getElementById("canvas_login");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, 210, 210);
        let base64File = canvas.toDataURL();
        let formData = new FormData();
        formData.append("file", base64File);
        faceScan(formData).then((res) => {
          if (res.data) {
            _this.faceMsg = "<p>人脸识别中...</p>";
            _this.imgData = base64File;
            faceLogin(formData).then((res) => {
              if (res.msg) {
                _this.cut = true;
                _this.closeVideo();
                _this.faceMsg = "<p>识别成功，开始登录认证...</p>";
                _this.handleFaceLogin(res.msg);
              } else {
                _this.cut = false;
                _this.faceMsg =
                  '<p style="color: red">识别失败，请重试或尝试其他方式登录！</p>';
              }
            });
          }
        });
      }, 1000);
    },
    closeVideo() {
      let video = document.getElementById("video_login");
      if (video && video.srcObject) {
        //关闭摄像头
        for (let item of video.srcObject.getTracks()) {
          item.stop();
        }
      }
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    handleFaceLogin(key) {
      this.loginForm.code = key;
      console.log(this.loginForm);
      this.$store.dispatch("user/login", this.loginForm).then(() => {
        this.faceMsg = '<p style="color: #08b41f">认证通过，登录成功！</p>';
        this.success = true;
        this.$router.push({
          path: this.redirect || "/home",
          query: this.otherQuery,
        });
      });
    },
    changeImg() {
      let timestamp = Math.random();
      this.loginForm.timestamp = timestamp;
      this.codeUrl = `/api/file/ImageCode/${timestamp}`;
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.loginForm.account = arr2[1]; //保存到保存数据的地方
            this.remember = true;
          } else if (arr2[0] == "userPwd") {
            this.loginForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    handleLogin() {
      if (this.loading) return;
      this.$nextTick(() => {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store.commit("user/SET_LOGIN_LOADING", true);
            this.$store
              .dispatch("user/login", this.loginForm)
              .then((res) => {
                if (res.code == 200) {
                  if (this.remember == true) {
                    //传入账号名，密码，和保存天数3个参数
                    this.setCookie(
                      this.loginForm.account,
                      this.loginForm.password,
                      30
                    );
                  } else {
                    this.clearCookie();
                  }
                  this.$router.push("/home");
                  // this.$router.push({
                  //   path: this.redirect || "/home",
                  //   query: this.otherQuery,
                  // });
                  this.checkPassword();
                } else {
                  this.loading = false;
                  this.changeImg();
                  this.$store.commit("user/SET_LOGIN_LOADING", false);
                }
              })
              .catch(() => {
                this.showTooltip = true;
                setTimeout(() => {
                  this.showTooltip = false;
                }, 2000);
                // this.$message.error("登录失败，请重试！");
                this.loading = false;
                this.changeImg();
                this.$store.commit("user/SET_LOGIN_LOADING", false);
              });
          } else {
            this.changeImg();
            return false;
          }
        });
      });
    },
    checkPassword() {
      this.$store.dispatch("user/changePassword", this.loginForm.password);
    },

    onBlur(name) {
      this[name] = false;
      if (name == "passwordSts") {
        this.capsTooltip = false;
      }
    },

    onFocus(name) {
      this[name] = true;
    },
  },
};
</script>
<style lang="scss" scoped>
$bg: #fff;
$cursor: #fff;

.login-form {
  width: 100%;
  height: 100%;
  // background-color: $bg;
  border-radius: 5px;
  .login-logo {
    width: 100%;
    height: 10%;
    margin-bottom: 10%;
  }
  .login-tab {
    height: 32px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-around;
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
  .rule-tip {
    color: #a0acb7;
    font-size: 12px;
    line-height: 12px;
    text-align: left;
    >>> .el-form-item__content {
      line-height: 8px;
      font-size: 8px;
    }
  }
  .el-form {
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    >>> .el-form-item__content .el-input-group {
      border: none;
      border-radius: 6px;
    }
    >>> .el-input-group__prepend {
      background-color: #fff;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      border: none;
      img {
        width: 16px;
        height: 19px;
        margin-top: 4px;
      }
      .divide {
        position: absolute;
        height: 28px;
        width: 1px;
        opacity: 0.7;
        top: 5px;
        right: 0;
      }
    }
    >>> .el-input__inner {
      background-color: #fff;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border: none;
    }
    >>> .el-input-group .el-form-item.is-error .el-input__inner {
      border: none;
    }
    >>> .el-checkbox__input .el-checkbox__inner {
      border-color: #72a5da;
    }
    >>> .el-checkbox__inner:hover,
    >>> .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #0f4697 !important;
    }
    >>> .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #0f4697 !important;
    }
    // >>> .el-button--primary {
    //   background: #9c1017;
    //   border-radius: 4px;
    //   border: 1px solid #cf2d37;
    // }
    input:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #fff inset !important;
      -webkit-text-fill-color: #606266 !important;
    }
    input::-webkit-input-placeholder {
      color: #a0acb7;
    }
    .imgcode {
      height: 38px;
      width: 100%;
    }
    .login-btn {
      width: 100%;
      font-size: 16px;
    }
    .login-btn:hover {
      opacity: 1;
    }
    .foot {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #188ae2;
      .register,
      .forget {
        cursor: pointer;
      }
    }
  }
  .login-form-QRCode {
    text-align: center;
    .qrcode-img {
      position: relative;
      width: 240px;
      height: 240px;
    }
    .qrcode-tip {
      color: #334d65;
      line-height: 22px;
      font-size: 16px;
    }
  }
  .inputfocus {
    border: 1px solid #ff000d;
    box-sizing: border-box;
    border-radius: 6px;
  }
  .default-input {
    border: 1px solid;
    box-sizing: border-box;
    border-radius: 6px;
  }
}
.tooltip {
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #333;
  &-icon {
    color: #e55a63;
    font-size: 18px;
    margin-right: 4px;
  }
}
</style>
