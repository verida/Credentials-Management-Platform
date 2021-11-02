export const token = () => localStorage.getItem(process.env.VUE_APP_TOKEN);
export const logout = () => {
  localStorage.removeItem("VeridaAccess");
  const location = window.location;

  const paths = ["/login", "/admin/login"];

  if (!paths.includes(location.pathname)) {
    window.location.href = "/";
  }
};
