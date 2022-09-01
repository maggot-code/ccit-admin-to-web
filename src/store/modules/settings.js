import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import ccit from '@/utils/ccit'
import { updateUserConfig } from "@/api/user";
const {
  showSettings,
  tagsView,
  tagsIcon,
  showDimension,
  showLanguage,
  showSearch,
  showCustomer,
  showPortalToolbar,
  showNote,
  fixedHeader,
  sidebarLogo,
  themeClass,
  slideClass,
  layoutType,
  loginBg
} = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  tagsIcon: tagsIcon,
  showDimension: ccit.storageGet('showDimension') === null ? showDimension : ccit.storageGet('showDimension'),
  showLanguage: showLanguage,
  showSearch: showSearch,
  showCustomer: showCustomer,
  showPortalToolbar: showPortalToolbar,
  showNote: showNote,
  fixedHeader: ccit.storageGet('fixedHeader') === null ? fixedHeader : ccit.storageGet('fixedHeader'),
  sidebarLogo: ccit.storageGet('sidebarLogo') === null ? sidebarLogo : ccit.storageGet('sidebarLogo'),
  themeClass: ccit.storageGet('themeClass') === null ? themeClass : ccit.storageGet('themeClass'),
  slideClass: ccit.storageGet('slideClass') === null ? slideClass : ccit.storageGet('slideClass'),
  layoutType: ccit.storageGet('layoutType') === null ? layoutType : ccit.storageGet('layoutType'),
  loginBg: ccit.storageGet('loginBg') === null ? loginBg : ccit.storageGet('loginBg')
}

const mutations = {
  INIT_SETTING: (state, settings) => {
    for (var key in settings) {
      if (state.hasOwnProperty(key)) {
        state[key] = settings[key]
      }
    }
  },
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
      let arr = ['showCustomer', 'showLanguage', 'showNote', 'showPortalToolbar', 'showSearch', 'tagsIcon', 'tagsView']
      if (arr.findIndex(i=> i === key) === -1) {
        ccit.storageSet({
          [key]: value
        })
      } else {
        updateUserConfig(state).then((res) => { })
      }

    }
  }
}

const actions = {
  initSetting({ commit }, data) {
    commit('INIT_SETTING', data)
  },
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
