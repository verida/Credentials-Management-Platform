const state = {
  list: [],
};

const mutations = {
  setList(state, list) {
    state.list = list;
  },
  addCredential(state, data) {
    state.list.push(data);
  },
};

const getters = {
  cards: ({ list }, getters, rootState, rootGetters) => {
    return list.map(({ credentialId, did, data, insertedAt }) => {
      // const properties = rootGetters["schema/properties"](data.schema, "view");

      const stub = "-- // --";

      // const keys = _.keys(properties);

      return {
        id: credentialId,
        did: `${did.slice(0, 10)}...`,
        schema: {
          ...data,
        },
        date: (insertedAt && moment(insertedAt).format("DD/MM/YYYY")) || stub,
      };
    });
  },
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
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
