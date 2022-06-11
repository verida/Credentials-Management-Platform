const state = {
	schemas: {
		default: [],
		custom: [],
	},
	clientContext: {},
};

const getters = {
	allSchemas: ({ schemas }) => {
		return schemas.custom;
	},
	clientContext: ({ clientContext }) => {
		return clientContext;
	},
	defaultSchemas: ({ schemas }) => {
		return {
			schemaTitles: schemas.default
				.filter((item) => item !== null)
				.map((schema) => schema.title),
			schemaObj: schemas.custom,
		};
	},
	customSchemas: ({ schemas }) => schemas.custom.map((schema) => schema.title),
	schemaPath: ({ schemas }) => (schema) => {
		const found = schemas.default.find((item) => item.title === schema);
		return found && found.$id;
	},
};

const mutations = {
	setSchemas(state, { type, list }) {
		state.schemas[type] = list;
	},
	setContext(state, payload) {
		state.clientContext = payload;
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
