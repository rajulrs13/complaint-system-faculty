import * as firebase from "firebase";
import db from "@/firebase/db";
import router from "@/router/index.js";
export default {
  state: {
    // userid: null
  },
  getters: {
    // getUserId(state) {
    //   return state.userid;
    // }
  },
  mutations: {
    // setUserId(state, payload) {
    //   state.userid = payload;
    // }
  },
  actions: {
    // logout({ commit, dispatch }) {
    //   firebase.auth().signOut();
    //   commit("setUserId", null);
    //   commit("setSuccess", {
    //     message: "Logged Out Successfully",
    //     status: true
    //   });
    //   router.replace("/");
    //   setTimeout(() => dispatch("clearSuccess"), 2000);
    // }
  }
};
