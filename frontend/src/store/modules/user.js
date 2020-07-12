const state = {
  list: null
};

const mutations = {
  setList(state, list) {
    state.list = list;
  },
  addIssuer(state, data) {
    state.list.push(data);
  }
};

const actions = {
  async fetchUsers({ commit }) {
    const data = await this._vm.axios.get("/user");
    commit("setList", data.data);
    return data.data;
  },
  async createUser({ commit }, payload) {
    const data = await this._vm.axios.post("/user", payload);
    commit("addIssuer", data.data);
    return data.data;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
