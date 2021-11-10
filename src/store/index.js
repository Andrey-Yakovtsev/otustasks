import { createStore } from 'vuex';

export default createStore({
  state: {
    booksInState: [],
    tags: [],
  },
  actions: {
    onSetbooksInState: ({ commit }, booksInState) => {
      commit('setbooksInState', booksInState);
    },
    onSettags: ({ commit }, tags) => {
      console.log('COMMIT')
      commit('settags', tags);
    }
  },
  mutations: {
    setbooksInState: (state, newVal) => {
      state.booksInState = newVal;
    },
    settags: (state, newVal) => {
      for (let item of newVal) {
        state.tags.push(item)}
      return state
      }

  },
});
