import Vue from "vue";
import axios  from "axios";
import VueAxios from "vue-axios";

import { API_URL } from "../../config";

Vue.use(VueAxios, axios);

export default axios.create({
  baseURL: API_URL
});
