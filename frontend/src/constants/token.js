export const token = () => localStorage.getItem(process.env.VUE_APP_TOKEN);
export const logout = () => {
  localStorage.removeItem("VeridaAccess");
  window.location.href = "/";
};
