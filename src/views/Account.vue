<template>
  <v-layout row>
    <v-flex xs12>
      <v-dialog v-model="name_edit_dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="title font-weight-light">Change Your Display Name?</v-card-title>
          <v-card-text>
            <v-text-field label="New Name" single-line></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="name_edit_dialog = false">No</v-btn>
            <v-btn color="primary" flat @click="name_edit_dialog = false">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="phone_edit_dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="title font-weight-light">Change Your Phone Number?</v-card-title>
          <v-card-text>
            <v-text-field label="New Phone Number" single-line></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="phone_edit_dialog = false">No</v-btn>
            <v-btn color="primary" flat @click="phone_edit_dialog = false">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-toolbar flat color="primary">
        <v-spacer></v-spacer>
        <h1 class="font-weight-light text-xs-center my-4 white--text">My Account</h1>
        <v-spacer></v-spacer>
      </v-toolbar>
      <!-- <v-card> -->
      <!-- <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="250px">
          <v-container fill-height>
            <v-layout align-center>
              <strong class="display-1 font-weight-regular white--text mr-4">My Account</strong>
            </v-layout>
          </v-container>
      </v-img>-->
      <v-flex xs12 sm6 offset-sm3>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">tag_faces</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="text-truncate">Rajul Saxena</v-list-tile-title>
              <v-list-tile-sub-title>Name</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon @click="name_edit_dialog = true">edit</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>+918285437376</v-list-tile-title>
              <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon @click="phone_edit_dialog = true">edit</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="text-truncate">rajulsaxena13@gmail.com</v-list-tile-title>
              <v-list-tile-sub-title>Email</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>FH1 101</v-list-tile-title>
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
      <!-- </v-card> -->
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      name_edit_dialog: false,
      phone_edit_dialog: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>