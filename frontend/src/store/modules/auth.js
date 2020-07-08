const state = {
  token: null,
  user: null
};

const mutations = {
  login(state, data) {
    state.user = data;
  },
  setToken(state, access_token) {
    state.token = access_token;
    localStorage.setItem("VeridaAccess", access_token);
  }
};

const actions = {
  async login({ commit }, payload) {
    const result = await this._vm.axios.post("/login", payload);
    const { user, access_token: token } = result.data;

    commit("login", user);
    commit("setToken", token);
  },
  async fetchUser({ commit }) {
    console.log("test")
    const result = await this._vm.axios.get("/restore");
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
