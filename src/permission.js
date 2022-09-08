import router from "./router";
import store from "./store";
import { Message, MessageBox } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, setToken } from "@/utils/auth";
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect", "/jump"]; // no redirect whitelist
const noNeedToken = ["/introduce"]; // 不需要校验token的路由

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title, to.meta.zhTitle);

  if (
    noNeedToken.findIndex((item) => {
      return to.path.indexOf(item) !== -1;
    }) !== -1
  ) {
    // in the free login whitelist, go directly
    next();
    NProgress.done();
  } else {
    // determine whether the user has logged in
    const hasToken = getToken();
    if (hasToken) {
      if (
        store.getters.isLock &&
        to.path !== "/lockScreen" &&
        to.path !== "/login"
      ) {
        next({
          path: "/lockScreen",
        });
        NProgress.done();
      } else if (to.path === "/login") {
        // if is logged in, redirect to the home page
        next({
          path: "/",
        });
        NProgress.done();
      } else {
        if (to.path === "/home") {
          if (to.query.token) {
            store.commit("user/SET_TOKEN", to.query.token);
            setToken(to.query.token);
          }
        }
        const hasGetMenu = store.state.user.hasGetMenu;
        // const hasMenu = store.getters.menuList && store.getters.menuList.length > 0
        if (hasGetMenu) {
          next();
        } else {
          try {
            // get user info
            let res = await store.dispatch("user/getInfo");
            const accessRoutes = await store.dispatch(
              "permission/generateRoutes",
              res
            );
            // dynamically add accessible routes
            router.addRoutes(accessRoutes);
            if (res.length === 0) {
              Message.error("当前角色您的权限不足，请联系管理员，或切换角色");
              next("/home");
            } else {
              next({
                ...to,
                replace: true,
              });
            }
            // 提示变更密码
            if (store.state.user.changePassword) {
              setTimeout(() => {
                MessageBox.confirm(
                  "您当前密码为初始密码，为了安全请及时变更密码",
                  "提示",
                  {
                    type: "warning",
                  }
                )
                  .then(() => {
                    router.push({
                      name: "profile",
                      params: { page: "login", activeTab: "password" },
                    });
                  })
                  .catch(() => {});
              }, 1000);
            }
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch("user/resetToken");
            if (error && typeof error == "string")
              Message.error(error || "Has Error");
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else {
        var url = decodeURIComponent(window.location.href); //获取当前url
        if (url.indexOf("?") !== -1) {
          var dz_url = url.split("#")[0]; //获取#/之前的字符串
          var cs = dz_url.split("?")[1]; //获取?之后的参数字符串
          var cs_arr = cs.split("&"); //参数字符串分割为数组
          var cs = {};
          for (var i = 0; i < cs_arr.length; i++) {
            //遍历数组，拿到json对象
            cs[cs_arr[i].split("=")[0]] = cs_arr[i].split("=")[1];
          }
          if (cs.token) {
            store.commit("user/SET_TOKEN", cs.token);
            setToken(cs.token);
            next(to.path);
          } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        } else if (to.path === "/home") {
          if (to.query.token) {
            store.commit("user/SET_TOKEN", to.query.token);
            setToken(to.query.token);
            const hasGetMenu = store.state.user.hasGetMenu;
            if (hasGetMenu) {
              next();
            } else {
              try {
                let res = await store.dispatch("user/getInfo");
                router.addRoutes(accessRoutes);
                const accessRoutes = await store.dispatch(
                  "permission/generateRoutes",
                  res
                );
                router.addRoutes(accessRoutes);
                if (res.length === 0) {
                  Message.error(
                    "当前角色您的权限不足，请联系管理员，或切换角色"
                  );
                  next("/home");
                } else {
                  next({
                    ...to,
                    replace: true,
                  });
                }
              } catch (error) {
                next(`/login`);
                NProgress.done();
              }
            }
          } else {
            next(`/login`);
            NProgress.done();
          }
        } else {
          // other pages that do not have permissionEle to access are redirected to the login page.
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
