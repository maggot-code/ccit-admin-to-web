import Vue from 'vue';
import introduce from './index.vue';
import router from './introduce.router';
import Element from 'element-ui'
import '../styles/element-variables.scss'
import '../assets/scss/common.scss'
Vue.config.productionTip = false;
Vue.use(Element)
const vm = new Vue({
  el: '#introduce',
  router,
  render: h => h(introduce)
})
export default vm