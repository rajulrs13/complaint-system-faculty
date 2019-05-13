<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout row wrap v-if="true">
        <v-flex xs12>
          <!-- <h1 class="font-weight-light text-xs-center my-4">Past Service Requests</h1> -->
          <v-card flat>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="250px">
              <v-container fill-height>
                <v-layout align-center>
                  <strong
                    class="display-1 font-weight-regular white--text mr-4"
                  >Past Service Requests</strong>
                </v-layout>
              </v-container>
            </v-img>
            <v-list three-line>
              <template v-for="(item, index) in items">
                <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-tile v-else :key="item.title" avatar @click>
                  <v-list-tile-avatar>
                      <v-avatar color="success">
                    <v-icon class="white--text">done</v-icon></v-avatar>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center column fill-height v-else>
        <br>
        <div class="text-xs-center">
          <v-icon size="220">vertical_split</v-icon>
        </div>
        <br>
        <h2 style="text-align:center;" class="font-weight-light">No Past Service Requests</h2>
        <br>
        <p style="text-align:center;" class="font-weight-light">
          To request a service, click on
          <v-icon color="teal">add</v-icon>button down below
        </p>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { header: "Today" },
        {
          
          title: "Brunch this weekend?",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          
          title: "Oui oui",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        { divider: true, inset: true },
        {
          
          title: "Birthday gift",
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        { divider: true, inset: true },
        {
          
          title: "Recipe to try",
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
    };
  }
};
</script>
