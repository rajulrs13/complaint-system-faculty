import Vue from "vue";
import Vuex from "vuex";
import user from "./User/index";
import shared from "./Shared/index";
import requests from "./Requests/index";


Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    requests: requests
  }
});
