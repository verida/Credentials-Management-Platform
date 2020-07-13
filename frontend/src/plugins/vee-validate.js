import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from "vee-validate/dist/vee-validate.full.esm";

extend("mobile", {
  params: ["valid"],
  validate: (value, { valid }) => valid
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
