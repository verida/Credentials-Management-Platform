const state = {
  list: []
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
  async fetchIssuers({ commit }) {
    const data = await this._vm.axios.get("/issuer");
    commit("setList", data.data);
  },
  async createIssuer({ commit }, payload) {
    const data = await this._vm.axios.post("/issuer", payload);
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
