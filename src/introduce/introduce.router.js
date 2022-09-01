import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      redirect: '/main',
      component: () =>
        import("./index.vue"),
      meta: {
        title: "首页"
      },
    },
    {
      path: "/main",
      name: "main",
      component: () =>
        import("./main.vue"),
    },
    {
      path: "/product",
      name: "product",
      component: () =>
        import("./product.vue"),
    },
    {
      path: "/system",
      name: "system",
      component: () =>
        import("./system.vue"),
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: () =>
        import("./main.vue"),
    },
  ],
});