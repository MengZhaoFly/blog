import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      username: ''
    },
    actions: {
      getUsername({ commit }) {
        // `store.dispatch()`会返回 Promise，以便我们能够知道数据在何时更新
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('yujihu')
          }, 1000);
        }).then(result => commit('setUsername', result));
      }
    },
    mutations: {
      setUsername(state, username) {
        state.username = username;
      }
    }
  });
}
