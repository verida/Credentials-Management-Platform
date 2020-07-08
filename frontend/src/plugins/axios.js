import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const token = localStorage.getItem(process.env.VUE_APP_TOKEN);
const axiosConfig = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: "Bearer " + token
  }
});

Vue.use(VueAxios, axiosConfig);
export default VueAxios;
