const state = {
  list: null
};

const mutations = {
  setList(state, list) {
    state.list = list;
  },
  addUser(state, data) {
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
    await this._vm.axios.post("/user", payload);
    // commit("addUser", data.data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
