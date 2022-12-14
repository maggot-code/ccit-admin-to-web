import { login, logout, getInfo, unlock } from "@/api/user";
import { getSysInfoVal } from "@/api/system/sysConfig";
import {
  setLock,
  getLock,
  removeLock,
  getToken,
  setToken,
  removeToken,
  setUserAccount,
  getUserAccount,
} from "@/utils/auth";
import { resetRouter } from "@/router";
import { isBizRouter, useBizRouter } from "../user.router";
import md5 from "js-md5";

const define = require("@/utils/define");
const { bizRouter, setupBizRouter } = useBizRouter();

const state = {
  token: getToken(),
  isLock: getLock() || 0,
  menuList: [],
  userInfo: {},
  permissionList: [],
  loginLoading: false,
  socket: "",
  hasGetMenu: false,
  changePassword: false,
};

const mutations = {
  SET_SOCKET: (state, socket) => {
    state.socket = socket;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_MENULIST: (state, menuList) => {
    state.menuList = menuList;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_USERINFO_HEADICON: (state, headIcon) => {
    state.userInfo.headIcon = headIcon;
  },
  SET_USERINFO_USERNAME: (state, userName) => {
    state.userInfo.userName = userName;
  },
  SET_USERINFO_PORTALID: (state, portalId) => {
    state.userInfo.portalId = portalId;
  },
  SET_PERMISSION_LIST: (state, permissionList) => {
    state.permissionList = permissionList;
  },
  SET_LOCK: (state, isLock) => {
    state.isLock = isLock;
  },
  SET_LOGIN_LOADING: (state, loginLoading) => {
    state.loginLoading = loginLoading;
  },
  SET_HASGETMENU: (state, hasGetMenu) => {
    state.hasGetMenu = hasGetMenu;
  },
  CHANGE_PASSWORD: (state, changePassword) => {
    state.changePassword = changePassword;
  },
};

const actions = {
  // 锁屏
  setLock({ commit }) {
    commit("SET_LOCK", 1);
    setLock(1);
  },
  clearLock({ commit }) {
    commit("SET_LOCK", "");
    removeLock();
  },
  unlock({ dispatch }, userInfo) {
    const { account, password } = userInfo;
    return new Promise((resolve, reject) => {
      unlock({ account: account.trim(), password: md5(password) })
        .then((response) => {
          dispatch("clearLock");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // user login
  login({ commit }, userInfo) {
    const { account, password, code, timestamp, type } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        account: account.trim(),
        password: md5(password),
        code: code.trim(),
        timestamp: timestamp,
        type: type,
      })
        .then((response) => {
          const { data } = response;
          const layoutList = [
            "classic",
            "functional",
            "plain",
            "custom",
            "custom2",
          ];
          let layoutType =
            data.theme && layoutList.indexOf(data.theme) > -1
              ? data.theme
              : "classic";
          commit("SET_TOKEN", data.token);
          commit(
            "settings/CHANGE_SETTING",
            { key: "layoutType", value: layoutType },
            { root: true }
          );
          setToken(data.token);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          const { data } = response;
          if (!data) reject("验证失败，请重新登录。");
          let { menuList, userInfo, permissionList } = data;
          setUserAccount(userInfo.userAccount);
          // if (!menuList.length) {
          //   router.push('/home');
          //   reject('您的权限不足，请联系管理员')
          //   return false;
          // }
          let routerList = [];

          function setData(list) {
            for (let i = 0; i < list.length; i++) {
              const e = list[i];
              let name = e.enCode.replace(/\./g, "-");
              e.vueName = name;
              if (e.type == 1) {
                e.path = "/" + e.enCode;
                if (e.hasChildren && e.children.length) {
                  setData(e.children);
                }
              }
              if (e.type == 2) {
                e.path = "/" + e.urlAddress;
                let newObj = {
                  path: "/" + e.urlAddress,
                  component: (resolve) =>
                    require([`@/views/${e.urlAddress}`], resolve),
                  name: name,
                  meta: {
                    title: name,
                    icon: e.icon,
                    zhTitle: e.fullName,
                    modelId: e.id,
                  },
                };
                routerList.push(newObj);
              }
              // 功能、字典、报表
              if ([3, 4, 5].indexOf(e.type) > -1) {
                let propertyJson = e.propertyJson
                    ? JSON.parse(e.propertyJson)
                    : null,
                  relationId = "",
                  isTree = 0,
                  componentUrl = "";
                if (propertyJson) {
                  relationId = propertyJson.moduleId || "";
                  isTree = propertyJson.isTree || 0;
                }
                if (e.type == 3) {
                  componentUrl = "dynamicModel";
                } else if (e.type == 4) {
                  componentUrl = "dynamicDictionary";
                } else {
                  componentUrl = "dynamicDataReport";
                }
                e.path = "/" + e.urlAddress;
                let newObj = {
                  path: "/" + e.urlAddress,
                  component: (resolve) =>
                    require([`@/views/basic/${componentUrl}`], resolve),
                  name: e.enCode,
                  meta: {
                    title: name,
                    icon: e.icon,
                    zhTitle: e.fullName,
                    modelId: e.id,
                    relationId,
                    isTree,
                  },
                };
                routerList.push(newObj);
              }
              // 大屏
              if (e.type == 6) {
                let propertyJson = e.propertyJson
                    ? JSON.parse(e.propertyJson)
                    : null,
                  moduleId = "";
                if (propertyJson) moduleId = propertyJson.moduleId || "";
                e.path = `${define.dataV}/view/${moduleId}?token=${getToken()}`;
              }
              // 外链
              if (e.type == 7) {
                let propertyJson = e.propertyJson
                  ? JSON.parse(e.propertyJson)
                  : null;
                let paramsDataJson = e.paramsData
                  ? JSON.parse(e.paramsData)
                  : null;
                let params = [];
                let token = propertyJson.showTokenType
                  ? getToken()
                  : getToken().split(" ")[1];
                for (let key in paramsDataJson) {
                  if (paramsDataJson[key] === "${token}") {
                    params.push(key + "=" + token);
                  } else if (paramsDataJson[key] === "${account}") {
                    params.push(key + "=" + getUserAccount());
                  } else {
                    params.push(key + "=" + paramsDataJson[key]);
                  }
                }

                if (e.linkTarget === "_self") {
                  let urlAddress = e.urlAddress + "?" + params.join("&");
                  e.path = "/" + e.enCode;
                  let newObj = {
                    path: "/" + e.enCode,
                    component: (resolve) =>
                      require([`@/views/basic/externalLink`], resolve),
                    name: e.enCode,
                    meta: {
                      title: name,
                      icon: e.icon,
                      zhTitle: e.fullName,
                      modelId: e.id,
                      urlAddress: urlAddress,
                    },
                  };
                  routerList.push(newObj);
                } else {
                  e.path = e.urlAddress + "?" + params.join("&");
                }
              }

              // 扩展类型
              // [不能直接将一个对象赋值给 e]
              // e = setupBizRouter(e) [x]
              isBizRouter(e) && Object.assign(e, setupBizRouter(e));
            }
          }

          setData(menuList);
          commit("SET_MENULIST", menuList);
          commit("SET_USERINFO", userInfo);
          commit("SET_PERMISSION_LIST", permissionList);
          commit("SET_HASGETMENU", true);
          routerList.push(bizRouter);
          resolve(routerList);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_MENULIST", []);
          commit("SET_USERINFO", {});
          commit("SET_PERMISSION_LIST", []);
          commit("SET_HASGETMENU", false);
          removeToken();
          resetRouter();

          // reset visited views and cached views
          dispatch("tagsView/delAllViews", null, { root: true });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_MENULIST", []);
      commit("SET_USERINFO", {});
      commit("SET_PERMISSION_LIST", []);
      commit("SET_LOGIN_LOADING", false);
      commit("SET_HASGETMENU", false);
      removeToken();
      resolve();
    });
  },
  changePassword({ commit }, password) {
    getSysInfoVal("defaultPwd").then((res) => {
      let defaultPwd = res.data.value;
      commit("CHANGE_PASSWORD", password == defaultPwd);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
