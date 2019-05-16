<template>
  <v-container fill-height>
    <div class="text-xs-center">
      <v-dialog v-model="password_change_dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="title font-weight-light">Reset Your Password ?</v-card-title>
          <v-form @submit.prevent="resetPassword" ref="resetform" v-model="resetformvalid">
            <v-card-text>
              <span class="font-weight-light">
                Enter your email id and we will send a
                <span
                  class="font-weight-regular"
                >Password Reset Email</span> to you.
              </span>
              <v-text-field
                label="Registered Email ID"
                v-model="emailforreset"
                single-line
                :disabled="loading"
                :rules="emailrules"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" :disabled="loading" flat @click="clearresetform()">No</v-btn>
              <v-btn color="primary" :disabled="!resetformvalid || loading" flat type="submit">Yes</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
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
        <h1 class="text-xs-center display-1 font-weight-light">Service Desk</h1>
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
            label="Password"
            counter
            @click:append="showpassword = !showpassword"
          ></v-text-field>

          <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
              <span
                class="caption font-weight-light"
                @click="password_change_dialog = true"
              >Forgot Password ?</span>
            </v-flex>
          </v-layout>
          <br>
          <br>
          <v-layout row wrap>
            <v-flex xs6>
              <div class="text-xs-center">
                <v-btn @click="clear()" :disabled="loading" fab large color="error" raised ripple>
                  <v-icon>clear</v-icon>
                </v-btn>
              </div>
            </v-flex>
            <v-flex xs6>
              <div class="text-xs-center">
                <v-btn :disabled="!valid || loading" type="submit" fab large color="primary" raised ripple>
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
// import manipal from "@/assets/mujbiglogo.jpg";
export default {
  data: () => ({
    password_change_dialog: false,
    emailforreset: "",
    dialog: false,
    // manipal: manipal,
    valid: false,
    resetformvalid:false,
    email: "",
    showpassword: false,
    password: "",
    passwordrule: [value => !!value || "Required."],
    emailrules: [
      v => !!v || "E-mail is required",
      v =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "Please enter valid Email ID"
    ],
    checkbox: false
  }),
  methods: {
    clear() {
      this.$refs.form.reset();
    },
    clearresetform() {
      this.$refs.resetform.reset();
      this.password_change_dialog = false;
    },
    signUserIn() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    resetPassword() {
      this.$store.dispatch("resetPassword", this.emailforreset);
      this.clearresetform();
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