import store from "../store";
import { token } from "../constants/token";

export const isAuth = ({ meta }, to, next) => {
  if (token()) next({ name: meta.go });
  next();
};

export const isAdminRole = async ({ meta }, next) => {
  if (!token()) next({ name: meta.home });

  if (!store.state.auth.user) {
    await store.dispatch("auth/fetchUser");
  }

  const { user } = store.state.auth;
  return user.isAdmin;
};
