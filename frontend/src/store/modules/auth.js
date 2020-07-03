const state = {
  tokens: null,
  user: null
};

const mutations = {
  login() {}
};

const actions = {
  async login({ commit }, payload) {
    const result = await this._vm.axios("/login", payload);
    commit("login", result);
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
