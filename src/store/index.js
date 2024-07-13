import { createStore } from 'vuex';
import mutations from './modules/auth/mutations.js';
import actions from './modules/auth/actions.js';
import getters from './modules/auth/getters.js';

const store = createStore({
  state() {
    return {
      userId: localStorage.getItem('userId') || null,
      token: localStorage.getItem('token') || null,
      tokenExpiration: localStorage.getItem('tokenExpiration') || null,
    };
  },
  mutations,
  actions,
  getters
});

export default store;
