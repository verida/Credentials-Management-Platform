const state = {
  list: []
};

const getters = {
  schemas: ({ list }) => list.map(schema => schema.title),
  properties: ({ list }) => selected => {
    const schema = list.find(schema => schema.title === selected);
    return schema.properties;
  }
};

const mutations = {
  setList(state, list) {
    state.list = list;
  }
};

const actions = {
  async fetchSchemas({ commit }) {
    const data = await this._vm.axios.get("/schema");
    commit("setList", data.data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
