import * as firebase from "firebase";
import db from "@/firebase/db";
import router from "@/router/index.js";
export default {
  state: {
    userid: null,
    username: "",
    useremail: "",
    usercontact: "",
    userblock: "",
    userroom: ""
  },
  getters: {
    getUserId(state) {
      return state.userid;
    },
    getUserName(state) {
      return state.username;
    },
    getUserEmail(state) {
      return state.useremail;
    },
    getUserContact(state) {
      return state.usercontact;
    },
    getUserBlock(state) {
      return state.userblock;
    },
    getUserRoom(state) {
      return state.userroom;
    }
  },
  mutations: {
    setUserId(state, payload) {
      state.userid = payload;
    },
    setUserName(state, payload) {
      state.username = payload;
    },
    setUserEmail(state, payload) {
      state.useremail = payload;
    },
    setUserContact(state, payload) {
      state.usercontact = payload;
    },
    setUserBlock(state, payload) {
      state.userblock = payload;
    },
    setUserRoom(state, payload) {
      state.userroom = payload;
    }
  },
  actions: {
    signUserIn({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          commit("setLoading", false);
          router.replace("/dashboard");
          setTimeout(() => dispatch("clearSuccess"), 2000);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    autoSignIn({ commit, dispatch }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      commit("setUserId", payload.uid);
      dispatch("getUserData");
      commit("setLoading", false);
      commit("setSuccess", { message: "Signed In Successfully", status: true });
      setTimeout(() => commit("clearSuccess"), 2000);
    },
    logout({ commit, dispatch }) {
      firebase.auth().signOut();
      commit("setUserId", null);
      commit("setSuccess", {
        message: "Logged Out Successfully",
        status: true
      });
      router.replace("/");
      setTimeout(() => dispatch("clearSuccess"), 2000);
    },
    getUserData({ commit, getters }) {
      commit("setLoading", true);
      db.collection("users")
        .doc(getters.getUserId)
        .onSnapshot(function(doc) {
          commit("setUserName", doc.data().name);
          commit("setUserEmail", doc.data().email);
          commit("setUserContact", doc.data().contact);
          commit("setUserBlock", doc.data().block);
          commit("setUserRoom", doc.data().room);
        });
    },
    changeName({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("users")
        .doc(getters.getUserId)
        .update({
          name: payload
        })
        .then(function() {
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Name Changed Successfully",
            status: true
          });
          setTimeout(() => commit("clearSuccess"), 6000);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    changeContact({ commit, getters }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("users")
        .doc(getters.getUserId)
        .update({
          contact: payload
        })
        .then(function() {
          commit("setLoading", false);
          commit("setSuccess", {
            message: "Contact Changed Successfully",
            status: true
          });
          setTimeout(() => commit("clearSuccess"), 6000);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
  }
};
