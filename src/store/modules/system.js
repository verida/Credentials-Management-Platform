const state = {
  modal: null
};

const mutations = {
  openModal(state, payload) {
    state.modal = payload;
  },
  closeModal() {
    state.modal = null;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
