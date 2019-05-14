import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import { store } from "@/store/index.js";
import "./vuetify/vuetify.js";
import firebase from "@/firebase/firebase";
import AlertComponent from "./components/Shared/alert.vue";
Vue.component("alert-component", AlertComponent);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch("autoSignIn", user);
      }
    });
  }
}).$mount('#app')
