module.exports = {
  title: '基础技术平台',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: '1',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  themeClass: 'blue',
  layoutType: 'custom',
  slideClass: 'lightWhite',
  tagsIcon: '0',
  showDimension: true,
  showLanguage: '1',
  showSearch: '1',
  showCustomer: '0',
  showPortalToolbar: '1',
  showNote: '0',
  errorLog: 'production'
}
