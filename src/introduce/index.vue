<template>
  <div ref="introduce" id="introduce" class="main">
    <div class="header">
      <img
        @click="goHome"
        class="logo"
        src="@/assets/images/introduce/logo.png"
      />
      <div class="operate">
        <div class="top">
          <img src="@/assets/images/introduce/phone.png" />
          <span class="tel">400-8888-000</span>
        </div>
        <div class="bottom">
          <span
            v-for="item in tabs"
            :key="item.id"
            :class="{ active: tabIndex === item.id }"
            @click="tabClick(item)"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <span>©️中煤信息技术(北京)有限公司</span>
      <span style="margin-left: 200px">备案号：京ICP备4008888000号</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabIndex: 0,
      tabs: [
        { id: 0, name: "首页", path: "/" },
        { id: 1, name: "产品介绍", path: "/product" },
        { id: 2, name: "关于我们", path: "/aboutUs" },
      ],
    };
  },
  mounted() {
    let that = this;
    setTimeout(function () {
      if (that.$route.path === "/main") {
        that.tabIndex = 0;
      } else if (
        that.$route.path === "/product" ||
        that.$route.path === "/system"
      ) {
        that.tabIndex = 1;
      } else {
        that.tabIndex = 2;
      }
    }, 100);
  },
  methods: {
    tabClick(item) {
      this.tabIndex = item.id;
      this.$router.push(item.path);
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      this.$nextTick(() => {
        if (item.id === 2) {
          window.scrollTo({
            top: scrollHeight,
            behavior: "smooth",
          });
        }
      });
    },
    goHome() {
      this.$router.push("/").catch((err) => {});
      this.tabIndex = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
  .header {
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .logo {
      width: 341px;
      height: 44px;
      cursor: pointer;
    }
    .operate {
      .top {
        text-align: right;
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
        .tel {
          font-size: 18px;
          color: #999999;
        }
        .lang {
          font-size: 12px;
          color: #333333;
        }
      }
      .bottom {
        margin-top: 15px;
        span {
          cursor: pointer;
          margin-left: 60px;
          height: 16px;
          font-size: 16px;
          color: #333333;
          padding: 4px;
        }
        .active {
          border-bottom: 3px solid #1f97ff;
        }
      }
    }
  }
  .footer {
    height: 80px;
    width: 100%;
    background-color: #333333;
    text-align: center;
    span {
      height: 80px;
      font-size: 12px;
      color: #ffffff;
      line-height: 80px;
    }
  }
}
</style>
