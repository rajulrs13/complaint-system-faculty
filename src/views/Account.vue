<template>
  <v-layout row>
    <v-flex xs12>
      <v-dialog v-model="name_edit_dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="title font-weight-light">Change Your Display Name?</v-card-title>
          <v-card-text>
            <v-text-field label="New Name" v-model="newname" single-line></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="closeChangeNameDialog">No</v-btn>
            <v-btn color="primary" flat @click="changeName">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="contact_edit_dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="title font-weight-light">Change Your Phone Number?</v-card-title>
          <v-card-text>
            <v-text-field label="New Phone Number" v-model="newcontact" single-line></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="closeChangeContactDialog">No</v-btn>
            <v-btn color="primary" flat @click="changeContact">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
      <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
      <v-toolbar flat color="primary">
        <v-spacer></v-spacer>
        <h1 class="font-weight-light text-xs-center my-4 white--text">My Account</h1>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-flex xs12 sm6 offset-sm3>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">tag_faces</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="text-truncate">{{username}}</v-list-tile-title>
              <v-list-tile-sub-title>Name</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon @click="openChangeNameDialog">edit</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>+91 {{usercontact}}</v-list-tile-title>
              <v-list-tile-sub-title>Contact</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon @click="contact_edit_dialog = true">edit</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="text-truncate">{{useremail}}</v-list-tile-title>
              <v-list-tile-sub-title>Email</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{userblock + " " + userroom}}</v-list-tile-title>
              <v-list-tile-sub-title>Address</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">
                <v-icon color="error" left @click="logout">power_settings_new</v-icon>
                <span @click="logout">Logout</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      newname: "",
      newcontact:"",
      name_edit_dialog: false,
      contact_edit_dialog: false
    };
  },
  methods: {
    openChangeNameDialog() {
      this.name_edit_dialog = true;
    },
    closeChangeNameDialog() {
      this.newname = "";
      this.name_edit_dialog = false;
    },
    changeName() {
      this.$store.dispatch("changeName", this.newname);
      this.closeChangeNameDialog();
    },
    openChangeContactDialog() {
      this.contact_edit_dialog = true;
    },
    closeChangeContactDialog() {
      this.newcontact = "";
      this.contact_edit_dialog = false;
    },
    changeContact() {
      this.$store.dispatch("changeContact", this.newcontact);
      this.closeChangeContactDialog();
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  watch: {
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
  },
  computed: {
    username() {
      return this.$store.getters.getUserName;
    },
    useremail() {
      return this.$store.getters.getUserEmail;
    },
    usercontact() {
      return this.$store.getters.getUserContact;
    },
    userblock() {
      return this.$store.getters.getUserBlock;
    },
    userroom() {
      return this.$store.getters.getUserRoom;
    },
    error() {
      return this.$store.getters.error;
    },
    success() {
      return this.$store.getters.success;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>