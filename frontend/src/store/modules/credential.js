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

const getters = {
  cards: ({ list }, getters, rootState, rootGetters) => {
    return list.map(({ credentialId, mobile, data, insertedAt }) => {
      const properties = rootGetters["schema/properties"](data.schema, "view");

      const stub = "-- // --";

      const keys = _.keys(properties);
      const info = _.map(keys, key => ({
        title: properties[key].title,
        value: data[key] || stub
      }));

      info.unshift({
        title: "Inserted at",
        value: (insertedAt && moment(insertedAt).format("DD/MM/YYYY")) || stub
      });

      return {
        id: credentialId,
        patient: data.fullName,
        mobile: mobile,
        info
      };
    });
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
  actions,
  getters
};
