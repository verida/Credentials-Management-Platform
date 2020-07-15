import Vue from "vue";
import VueRouter from "vue-router";

import { isAuth, isAdminRole } from "../helpers/RouteGuard";
import { ADMIN_LOGIN, DASHBOARD, ISSUERS, LOGIN } from "../constants/route";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login/:type?",
    name: LOGIN,
    component: () => import("../views/login/Login"),
    meta: { guest: true, go: DASHBOARD },
    beforeEnter: (from, to, next) => isAuth(from, to, next)
  },
  {
    path: "/admin/login",
    name: ADMIN_LOGIN,
    component: () => import("../views/login/AdminLogin"),
    meta: { guest: true, go: ISSUERS },
    beforeEnter: (from, to, next) => isAuth(from, to, next)
  },
  {
    path: "/dashboard",
    name: DASHBOARD,
    component: () => import("../views/Dashboard"),
    meta: { user: true, home: LOGIN },
    beforeEnter: async (from, to, next) => {
      const isAdmin = await isAdminRole(to, next);
      isAdmin && next({ name: ISSUERS });
      next();
    }
  },
  {
    path: "/issuers",
    name: ISSUERS,
    component: () => import("../views/Issuers"),
    meta: { admin: true, home: ADMIN_LOGIN },
    beforeEnter: async (from, to, next) => {
      const isAdmin = await isAdminRole(to, next);
      !isAdmin && next({ name: DASHBOARD });
      next();
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
