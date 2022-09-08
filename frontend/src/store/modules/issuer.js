const state = {
	list: [],
	issuer: {},
};

const mutations = {
	setList(state, list) {
		state.list = list;
	},
	addIssuer(state, data) {
		state.list.push(data);
	},
	setIssuerById(state, issuer) {
		state.issuer = issuer;
	},
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
	},
	async updateIssuerProfile(_, payload) {
		await this._vm.axios.put(`/issuer/${payload.id}`, payload.data);
	},
	async fetchIssuerByUrl({ commit }, payload) {
		const data = await this._vm.axios.get(`/issuer/lookup?urlName=${payload}`);
		return data.data;
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
