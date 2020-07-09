import Vue from "vue";
import VueRouter from "vue-router";

import { isAuth } from "../helpers/RouteGuard";
import { DASHBOARD } from "../constants/route";
import {token} from "../constants/token";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login/sa-pathology"
  },
  {
    path: "/login/:type",
    name: "Login",
    component: () => import("../views/login/Login"),
    meta: { guest: true }
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () => import("../views/login/AdminLogin"),
    meta: { guest: true },
    // beforeEnter: (from, to, next) => {
      // return token() ?
    //}
  },
  {
    path: "/dashboard",
    name: DASHBOARD,
    component: () => import("../views/Dashboard"),
    meta: { saPathology: true }
  },
  {
    path: "/issuers",
    name: "Issuers",
    component: () => import("../views/Issuers"),
    meta: { admin: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
