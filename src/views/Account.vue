<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="250px">
          <v-container fill-height>
                    <v-layout align-center>
                      <strong class="display-1 font-weight-regular white--text mr-4">My Account</strong>
                    </v-layout>
                  </v-container>
        </v-img>

        <v-list two-line>
            <v-list-tile @click>
            <v-list-tile-action>
              <v-icon color="primary">tag_faces</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="text-truncate">Rajul Saxena</v-list-tile-title>
              <v-list-tile-sub-title>Name</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>edit</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile @click>
            <v-list-tile-action>
              <v-icon color="primary">phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>(+91) 8285437376</v-list-tile-title>
              <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>edit</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click>
            <v-list-tile-action>
              <v-icon color="primary">mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="text-truncate">rajulsaxena13@gmail.com</v-list-tile-title>
              <v-list-tile-sub-title>Email</v-list-tile-sub-title>
            </v-list-tile-content>
            
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click>
            <v-list-tile-action>
              <v-icon color="primary">location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>B5 503</v-list-tile-title>
              <v-list-tile-sub-title>Address</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
<v-divider inset></v-divider>
          <v-list-tile @click>
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center">
                <v-icon color="error" left>power_settings_new</v-icon>Logout
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>