import { DASHBOARD, LOGIN } from "../constants/route";

export const isAuth = (from, to, next) => {
  const token = localStorage.getItem(process.env.VUE_APP_TOKEN);
  token && next({ name: DASHBOARD });
  // to.name !== from.name && next({ name: from.name });
  next({ name: LOGIN });
};
