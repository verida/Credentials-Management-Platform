import { config } from "../config";

export const token = () => localStorage.getItem(config.tokenKey);
export const logout = () => {
  localStorage.removeItem(config.tokenKey);
  const location = window.location;

  const paths = ["/login", "/admin/login"];

  if (!paths.includes(location.pathname)) {
    window.location.href = "/";
  }
};
