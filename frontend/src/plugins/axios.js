import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const token = () => localStorage.getItem(process.env.VUE_APP_TOKEN);
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

service.interceptors.request.use(
  config => ({
    ...config,
    headers: { Authorization: "Bearer " + token() }
  }),
  error => Promise.reject(error)
);

Vue.use(VueAxios, service);
export default VueAxios;
