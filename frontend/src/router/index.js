import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login/sa-pathology"
  },
  {
    path: "/login/:type",
    name: "Login",
    component: () => import("../views/Login"),
    meta: { guest: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
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