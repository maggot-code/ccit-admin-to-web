const getters = {
  token: state => state.user.token,
  theme: state => state.user.theme,
  isLock: state => state.user.isLock,
  menuList: state => state.user.menuList,
  userInfo: state => state.user.userInfo,
  permissionList: state => state.user.permissionList,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes,
  dictionaryList: state => state.base.dictionaryList,
  userList: state => state.base.userList,
  positionList: state => state.base.positionList,
  socket: state => state.user.socket,
  hasTable: state => state.generator.hasTable,
  dimensionList: state => state.base.dimensionList,
  currentDimension: state => state.base.currentDimension
}
export default getters