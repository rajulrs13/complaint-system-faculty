import * as firebase from "firebase";
import db from "@/firebase/db";
import router from "@/router/index.js";
export default {
  state: {
    servicerequests: null
  },
  getters: {
    getServiceRequests(state) {
      return state.servicerequests;
    }
  },
  mutations: {
    setServiceRequests(state, payload) {
      state.servicerequests = payload;
    }
  },
  actions: {
    requestService({ getters, commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      commit("clearSuccess");
      db.collection("servicerequests")
        .add({
          block: payload.block,
          room: payload.room,
          category: payload.category,
          description: payload.description,
          availabilityoftime: payload.availabilityoftime,
          availabilityofdate: payload.availabilityofdate,
          comments: payload.comments,
          status: 0,
          user: getters.getUserId,
          username: getters.getUserName,
          requesttimestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          commit("setLoading", false);
          commit("setSuccess", {
            message: "New Service Request Successfully Filed",
            status: true
          });
          setTimeout(() => commit("clearSuccess"), 6000);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    getUserServiceRequests({ getters, commit }) {
      db.collection("servicerequests")
        .where("user", "==", getters.getUserId)
        .onSnapshot(function(querySnapshot) {
          var listofrequests = [];
          querySnapshot.forEach(function(doc) {
            var obj = doc.data();
            var pair = { id: doc.id };
            obj = { ...obj, ...pair };
            listofrequests.push(obj);
          });
          commit("setServiceRequests", listofrequests);
        });
    }
  }
};
