import { createStore } from 'vuex';

export default createStore({
  state: {
    booksInState: []
  },
  actions: {
    onSetbooksInState: ({ commit }, booksInState) => {
      commit('setbooksInState', booksInState);
    }
  },
  mutations: {
    setbooksInState: (state, booksInState) => {
      state.booksInState = booksInState;
    }
  }
});
