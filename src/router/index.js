import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/",
      component: () => import("../components/Home.vue"),
      meta: { title: "home" },
      children: [
        {
          path: "dashboard",
          component: () => import("../pages/dashboard"),
          meta: { title: "系统首页" },
        },
        {
          path: "health_checkin",
          component: () => import("../pages/health_checkin"),
          meta: { title: "健康打卡" },
        },
        {
          path: "checkin_records",
          component: () => import("../pages/checkin_records"),
          meta: { title: "打卡记录" },
        },
        {
          path: "userinfo",
          component: () => import("../pages/userinfo"),
          meta: { title: "个人信息管理" },
        },
      ],
    },
    {
      path: "/login",
      component: () => import("../pages/login"),
      meta: { title: "登录" },
    },
  ],
});
