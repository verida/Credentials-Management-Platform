import { schemas as criteria } from "../../config/map";

const state = {
  list: [],
};

const getters = {
  schemas: ({ list }) => list.map((schema) => schema.title),
  schemaPath: ({ list }) => (schema) => {
    const found = list.find((item) => item.title === schema);
    return found && found.$id;
  },
  properties: ({ list }) => (selected, mode = "create") => {
    const schema = list.find(
      (schema) => schema.title === selected || schema.$id === selected
    );
    if (!schema) return [];

    const { [mode]: visible } = criteria[schema.$id];
    return _.pick(schema.properties, visible);
  },
};

const mutations = {
  setList(state, list) {
    state.list = list;
  },
};

const actions = {
  async fetchSchemas({ commit }) {
    const data = await this._vm.axios.get("/schema");
    commit("setList", data.data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
