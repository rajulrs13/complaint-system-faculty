<template>
  <v-container fill-height>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text class="text-xs-center">
            Verifying...Please Stand By
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <div class="text-xs-center">
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text class="text-xs-center">
            Verifying...Please Stand By
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
    <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
    <v-layout justify-center row align-center class="px-1">
      <v-flex xs12 sm6>
        <!-- <v-layout row wrap align-center justify-center>  
          <v-img :src="manipal" style="max-width:50%;
  max-height:10%;"></v-img>
        </v-layout>
        <br>-->
        <h1 class="text-xs-center display-1 font-weight-light">My Faculty Days</h1>
        <br>
        <v-layout row wrap class="text-xs-center">
          <v-flex xs12>
            <p class="font-weight-light">Your One Stop Solution To Every Problem</p>
          </v-flex>
        </v-layout>

        <br>

        <v-form @submit.prevent="signUserIn" ref="form" v-model="valid">
          <v-text-field v-model="email" :rules="emailrules" label="Email ID" required></v-text-field>
          <br>
          <v-text-field
            v-model="password"
            :append-icon="showpassword ? 'visibility_off' : 'visibility'"
            :rules="passwordrule"
            :type="showpassword ? 'text' : 'password'"
            label="Quiz Password"
            counter
            @click:append="showpassword = !showpassword"
          ></v-text-field>
          <br>
          <br>
          <v-layout row wrap>
            <v-flex xs6>
              <div class="text-xs-center">
                <v-btn @click="clear()" fab large color="error" raised ripple>
                  <v-icon>clear</v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs6>
              <div class="text-xs-center">
                <v-btn :disabled="!valid" type="submit" fab large color="primary" raised ripple>
                  <v-icon>near_me</v-icon>
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import manipal from "@/assets/mujbiglogo.jpg";
export default {
  data: () => ({
    dialog: false,
    manipal: manipal,
    valid: false,
    email: "",
    showpassword: false,
    password: "",
    emailrules: [v => !!v || "Please enter valid Email ID"],
    passwordrule: [value => !!value || "Required."],
    checkbox: false
  }),
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    signUserIn() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUserId;
    },
    loading() {
      return this.$store.getters.loading;
    },
    success() {
      return this.$store.getters.success;
    },
    error() {
      return this.$store.getters.error;
    },
    ...mapGetters(["getUserId"]),
    nextRoute() {
      return this.$route.query.redirect || "/";
    }
  },
  watch: {
    user(auth) {
      if (!!auth) {
        this.dialog = true;
        if (this.nextRoute == "/") {
          setTimeout(() => this.$router.replace("/dashboard"), 1200);
        } else {
          setTimeout(() => this.$router.replace(this.nextRoute), 1200);
        }
      }
    },
    error(err) {
      if (!!err) {
        setTimeout(() => this.$store.dispatch("clearError"), 3000);
      }
    },
    success(con) {
      if (!!con) {
        setTimeout(() => this.$store.dispatch("clearSuccess"), 2000);
      }
    }
  }
};
</script>