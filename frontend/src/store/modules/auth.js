const state = {
  token: null,
  user: null
};

const mutations = {
  login(state, { data, access_token }) {
    state.user = data;
    state.token = access_token;
    localStorage.setItem(process.env.VUE_APP_TOKEN, access_token);
  }
};

const actions = {
  async login({ commit }, payload) {
    const result = await this._vm.axios.post("/login", payload);
    commit("login", result.data);
  },
  closeModal() {
    state.modal = null;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
