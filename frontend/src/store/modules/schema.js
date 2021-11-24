import { schemas as criteria } from "../../config/map";

const state = {
  schemas: {
    default: [],
    custom: [],
  },
};

const getters = {
  allSchemas: ({ schemas }) => {
    return schemas.custom;
  },
  defaultSchemas: ({ schemas }) => {
    return schemas.default
      .filter((item) => item !== null)
      .map((schema) => schema.title);
  },
  customSchemas: ({ schemas }) => schemas.custom.map((schema) => schema.title),
  schemaPath: ({ schemas }) => (schema) => {
    const found = schemas.default.find((item) => item.title === schema);
    return found && found.$id;
  },
  properties: ({ schemas }) => (selected, mode = "create") => {
    const schema = schemas.default.find(
      (schema) => schema.title === selected || schema.$id === selected
    );

    if (!schema) return [];

    const { [mode]: visible } = criteria[schema.$id];

    const schemaProps = schema.allOf.filter((item) => item["properties"]);
    const properties = schemaProps[0].properties;

    const createFields = schema?.layouts?.create || visible || [];

    return _.pick(properties, createFields);
  },
};

const mutations = {
  setSchemas(state, { type, list }) {
    state.schemas[type] = list;
  },
  addSchemas(state, { type, list }) {
    state.schemas[type].push(list);
  },
};

const actions = {
  async fetchSchemas({ commit }) {
    const data = await this._vm.axios.get("/schema");
    commit("setSchemas", { list: data.data, type: "default" });
  },

  async fetchSchemasWithId({ commit }) {
    const data = await this._vm.axios.get("/schema/list");
    commit("setSchemas", { list: data.data, type: "custom" });
  },

  async addNewSchemas({ commit }, payload) {
    const data = await this._vm.axios.post("/schema", payload);
    commit("addSchemas", { list: data.data, type: "custom" });
  },

  async deleteSchema({ commit }, payload) {
    await this._vm.axios.delete(`/schema/${payload.id}`);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
