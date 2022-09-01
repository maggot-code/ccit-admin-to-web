<template>
  <div class="container" v-if="!loading">
    <portal-page
      v-if="layout.length > 0"
      :layout="layout"
      :layoutBg="layoutBg"
      :activeLayout="activeLayout"
      @change-theme="changeTheme"
    ></portal-page>
    <default-page v-if="showDefaultPage"></default-page>
  </div>
</template>

<script>
import { faceLogin, faceScan } from "@/api/system/face";
import { getLoginPortal } from "@/api/onlineDev/portal";
import { mapState } from "vuex";
import defaultPage from "./default-page.vue";
import portalPage from "./portal-page.vue";
export default {
  name: "Login",
  components: { defaultPage, portalPage },
  data() {
    return {
      layout: [],
      activeLayout: {},
      layoutBg: "",
      loginForm: {
        account: "",
        password: "",
        timestamp: "",
        code: "",
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
      loading: true,
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
      showDefaultPage: false,
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
      let loginBg = require("../../assets/images/login/" +
        this.loginBg +
        ".jpg");
      return {
        backgroundImage: "url(" + loginBg + ")",
      };
    },
  },
  watch: {
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
    this.loading = true;
    this.showDefaultPage = false;
    getLoginPortal()
      .then((res) => {
        if (res.code == 200 && res.data) {
          let formData = JSON.parse(res.data.formData);
          this.layout = formData.layout || [];
          if (!this.layoutBg) {
            this.layoutBg = formData.layoutBg;
          }
          this.activeLayout = formData.activeLayout;
          if (this.layout.length === 0) {
            this.showDefaultPage = true;
          }
        } else {
          this.showDefaultPage = true;
        }
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.showDefaultPage = true;
      });
  },
  mounted() {
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
    changeTheme(fileId) {
      this.layoutBg = fileId;
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
          } else if (arr2[0] == "layoutBg") {
            this.layoutBg = arr2[1];
          }
        }
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
}
</style>
