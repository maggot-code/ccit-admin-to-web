<template>
  <div
    class="login-container"
    @keyup.enter.native="handleLogin"
    :style="loginbgImage"
  >
    <div class="login-version">
      <p class="login-version-text">
        {{ $t("login.version") }} {{ define.version }}
      </p>
    </div>
    <div class="login-content" :style="contentWidth">
      <img
        class="login-img"
        src="../../assets/images/login_content_img.png"
        alt=""
      />
      <div class="login-form">
        <img
          class="login-logo"
          src="../../assets/images/login_logo.png"
          alt=""
        />
        <div class="login-tab">
          <a
            class="item"
            :class="{ active: active == 1 }"
            @click="active = 1"
            >{{ $t("login.title") }}</a
          >&nbsp;&nbsp;
          <a
            class="item"
            :class="{ active: active == 2 }"
            @click="active = 2"
            >{{ $t("login.scanTitle") }}</a
          >&nbsp;&nbsp;
          <a
            class="item"
            :class="{ active: active == 3 }"
            @click="active = 3"
            >{{ $t("login.faceTitle") }}</a
          >
        </div>
        <el-form
          v-show="active == 1"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          autocomplete="on"
          label-position="left"
        >
          <el-form-item prop="account">
            <el-input
              ref="account"
              v-model="loginForm.account"
              :placeholder="$t('login.username')"
              name="account"
              type="text"
              tabindex="1"
              autocomplete="on"
              prefix-icon="el-icon-user"
              size="large"
            ></el-input>
          </el-form-item>
          <!--<el-form-item class="rule-tip">{{$t('login.rule')}}</el-form-item>-->
          <el-tooltip
            v-model="capsTooltip"
            :content="$t('login.upper')"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <el-input
                ref="password"
                v-model="loginForm.password"
                show-password
                :placeholder="$t('login.password')"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                prefix-icon="el-icon-lock"
                size="large"
              ></el-input>
              <!-- @keyup.enter.native="handleLogin" -->
            </el-form-item>
          </el-tooltip>
          <el-form-item prop="code">
            <el-input
              ref="code"
              type="text"
              class="input-with-code"
              name="code"
              v-model="loginForm.code"
              autocomplete="on"
              tabindex="3"
              placeholder="请输入验证码"
              prefix-icon="el-icon-picture-outline"
              size="large"
            >
              <img
                id="imgcode"
                alt="点击切换验证码"
                title="点击切换验证码"
                :src="define.comUrl + imgUrl"
                @click="changeImg"
                slot="append"
              />
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-checkbox v-model="remember" style="color: #a0a0a0"
              >自动登录</el-checkbox
            >
            <span
              style="
                cursor: pointer;
                color: #f19149;
                font-size: 0.75rem;
                margin-left: 5px;
              "
              >忘记密码？</span
            >
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            size="large"
            @click.native.prevent="handleLogin"
            >{{ $t("login.logIn") }}</el-button
          >
          <!-- <div class="foot">
            <span class="register">立即注册</span>
            <span class="forget">忘记密码</span>
          </div> -->
        </el-form>
        <div v-show="active == 2" class="login-form-QRCode">
          <img class="qrcode-img" src="../../assets/images/login_qr.png" />
          <p class="qrcode-tip">{{ $t("login.scanTip") }}</p>
        </div>
        <div v-show="active == 3">
          <div style="position: relative">
            <div class="face-scan">
              <div v-if="!cut" class="face-scan-inner">
                <video
                  id="video_login"
                  width="210px"
                  height="210px"
                  autoplay="autoplay"
                  style="
                    border-radius: 10px;
                    margin-top: 70px;
                    margin-left: 72px;
                  "
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
      </div>
    </div>
    <div class="login-foot">
      <span
        >助力企业数字化转型<br />Copyright 中煤信息技术（北京）有限公司, All
        Rights Reserved. 京ICP备19049344号-1 京公网安备110401000041号
      </span>
      <el-popover placement="top-start" width="380" trigger="click">
        <div class="change-img">
          <img
            :class="[loginBg === 'bg' + i ? 'img-active' : '']"
            v-for="i in 10"
            :key="i"
            :src="require(`@/assets/images/login/bg${i}.jpg`)"
            alt=""
            @click="changeBg(i)"
          />
        </div>
        <div slot="reference" class="change-btn">
          <img src="@/assets/images/login/edit.png" alt="" />
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { faceLogin, faceScan } from "@/api/system/face";
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
        timestamp: "",
        code: "",
        type: 0
      },
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
      loading: false,
      showDialog: false,
      imgUrl: "",
      faceMsg: "", //控制人脸识别日志进度
      success: false, //控制人脸登录是否成功
      cut: false, //控制人脸识别是否成功
      faceShow: false, //控制人脸识别圆形外框的特效图是否显示
      redirect: undefined,
      remember: false,
      otherQuery: {},
      active: 1,
    };
  },
  computed: {
    ...mapState({
      loginBg: (state) => state.settings.loginBg,
    }),
    loginLoading() {
      return this.$store.state.user.loginLoading;
    },
    contentWidth() {
      return {
        width: screen.width >= 1920 ? "70%" : "80%",
      };
    },
    loginbgImage() {
      let loginBg = require("../../assets/images/login/bg1.jpg");
      return {
        backgroundImage: "url(" + loginBg + ")",
      };
    },
  },
  watch: {
    active(val) {
      this.loginForm.type = newVal;
      let _this = this;
      if (val != 3) {
        _this.loginForm.code = "";
        _this.faceShow = false;
        _this.closeVideo();
        return;
      }
      _this.initFaceScan();
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
  },
  created() {
    // if (screen.width >= 1920) {
    //   require.ensure([], function (require) {
    //     require("../../assets/scss/bigScreen.scss");
    //   });
    // } else {
    //   require.ensure([], function (require) {
    //     require("../../assets/scss/smallScreen.scss");
    //   });
    // }
    const _this = this;
    document.onkeydown = function (e) {
      const { keyCode } = e;
      if (keyCode === 13) {
        _this.handleLogin();
      }
    };
    this.changeImg();
  },
  mounted() {
    // if (this.loginForm.account === '') {
    //   this.$refs.account.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
    this.$store.commit("user/SET_LOGIN_LOADING", false);
    this.getCookie();
  },
  destroyed() {
    document.onkeydown = function (e) {
      const { keyCode } = e;
      if (keyCode === 13) {
      }
    };
  },
  methods: {
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

      let timer = setInterval(function () {
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
    handleLogin() {
      if (this.loading) return;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store.commit("user/SET_LOGIN_LOADING", true);
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
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

              this.$router.push('/home');
                  this.checkPassword();
            })
            .catch(() => {
              this.changeImg();
              this.$store.commit("user/SET_LOGIN_LOADING", false);
            });
        } else {
          this.changeImg();
          return false;
        }
      });
    },
    checkPassword() {
      this.$store.dispatch('user/changePassword', this.loginForm.password)
    },
    changeImg() {
      let timestamp = Math.random();
      this.loginForm.timestamp = timestamp;
      this.imgUrl = `/api/file/ImageCode/${timestamp}`;
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
    changeBg(i) {
      this.$store.dispatch("settings/changeSetting", {
        key: "loginBg",
        value: "bg" + i,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./login.scss";
.input-with-code .el-input-group__append {
  padding: 0px;
  background-color: #fff;
}
.face-scan {
  width: 350px;
  height: 350px;
  left: -25px;
  position: absolute;
}
.face-scan-img {
  background-image: url("../../assets/images/face_scan.gif");
  background-size: cover;
  background-position: center;
  z-index: 9999;

  position: absolute;
}
.face-scan-success-img {
  background-image: url("../../assets/images/face_scan_success.gif");
  background-repeat: no-repeat;
  background-position: center;
  z-index: 99999;
}
.face-scan-inner {
  /* margin-top: 100px;
  margin-left: 105px;*/
}
.log-font {
  text-align: center;
  color: #666;
  font-size: small;
}
.login-foot {
  position: absolute;
  color: #999;
  font-size: 12px;
  position: fixed;
  bottom: 20px;
  left: 31%;
  text-align: left;
}
.change-img {
  display: flex;
  flex-wrap: wrap;
  img {
    width: 70px;
    height: 70px;
  }
  .img-active {
    border: 3px solid #2db7f5;
  }
}
.change-btn {
  position: fixed;
  right: 50px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
  }
}
.change-btn:hover {
  opacity: 0.8;
}
</style>
