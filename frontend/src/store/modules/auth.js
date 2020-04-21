const state = {
  user: null
};

const mutations = {
  setAuth(state, payload) {
    state.user = payload;
  }
};

const actions = {
  async login(store, payload) {
    const response = await this._vm.axios.get("/auth", payload.data);
    console.log(response, "response");
    /*
    if (!response.data.error) {
      store.commit("setAuth", response.data);
    } else {
      throw new Error(response.data.error_description);
    }

    return response.data;*/
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
