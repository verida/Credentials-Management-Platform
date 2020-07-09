import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver
} from "vee-validate/dist/vee-validate.full.esm";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
