const state = {
  list: []
};

const mutations = {
  setList(state, list) {
    state.list = list;
  },
  addCredential(state, data) {
    state.list.push(data);
  }
};

const actions = {
  async fetchCredentials({ commit }) {
    const data = await this._vm.axios.get("/credential");
    commit("setList", data.data);
  },
  async createCredential({ commit }, payload) {
    const data = await this._vm.axios.post("/credential/issue", payload);
    commit("addCredential", data.data);
    return data.data;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
