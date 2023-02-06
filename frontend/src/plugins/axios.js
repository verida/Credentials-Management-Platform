import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

import { token, logout } from "../constants/token";
import { config } from "../config";

console.log(config.apiServerURL)

const service = axios.create({
  baseURL: config.apiServerURL
});

service.interceptors.request.use(
  config => ({
    ...config,
    headers: { Authorization: "Bearer " + token() }
  }),
  error => Promise.reject(error)
);

service.interceptors.response.use(
  response => response,
  error => {
    error.response.status === 401 && logout();
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, service);
export default VueAxios;
