// import * as firebase from "firebase";
// import db from "@/firebase/db";
// import router from "@/router/index.js";
// export default {
//   state: {
//     userid: null
//   },
//   getters: {
//     getUserId(state) {
//       return state.userid;
//     }
//   },
//   mutations: {
//     setUserId(state, payload) {
//       state.userid = payload;
//     }
//   },
//   actions: {
//     signUserIn({ commit, dispatch }, payload) {
//       commit("setLoading", true);
//       commit("clearError");
//       commit("clearSuccess");
//       firebase
//         .auth()
//         .signInWithEmailAndPassword(payload.email, payload.password)
//         .then(data => {
//           commit("setLoading", false);
//           router.replace("/dashboard");
//           setTimeout(() => dispatch("clearSuccess"), 2000);
//         })
//         .catch(error => {
//           commit("setLoading", false);
//           commit("setError", error);
//         });
//     },
//     autoSignIn({ commit, dispatch }, payload) {
//       commit("setLoading", true);
//       commit("clearError");
//       commit("clearSuccess");
//       commit("setUserId", payload.uid);
//       commit("setLoading", false);
//       commit("setSuccess", { message: "Signed In Successfully", status: true });
//       setTimeout(() => commit("clearSuccess"), 2000);
//     },
//     logout({ commit, dispatch }) {
//       firebase.auth().signOut();
//       commit("setUserId", null);
//       commit("setSuccess", {
//         message: "Logged Out Successfully",
//         status: true
//       });
//       router.replace("/");
//       setTimeout(() => dispatch("clearSuccess"), 2000);
//     }
//   }
// };
