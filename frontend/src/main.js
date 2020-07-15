import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import _ from "underscore";
import moment from "moment";

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import vuetify from "./plugins/vuetify";
import "./plugins";

Vue.config.productionTip = false;

window._ = _;
window.moment = moment;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

import "@/styles/index.scss";
