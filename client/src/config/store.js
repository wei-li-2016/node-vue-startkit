import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuVisible: false,
    user: null
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (!state.user) {
        state.isMenuVisible = false;
        return;
      }

      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible;
      } else {
        state.isMenuVisible = isVisible;
      }
    },
    setUser(state, token) {
      state.user = token;
      if (token) {
        axios.defaults.headers.common["Authorization"] = token; // set default header of axios configuration
        state.isMenuVisible = true;
      } else {
        delete axios.defaults.headers.common["Authorization"]; // delete default header of axios configuration
        state.isMenuVisible = false;
      }
    }
  }
});
