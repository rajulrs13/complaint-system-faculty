<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout row wrap v-if="true">
        <v-flex xs12>
          <v-dialog
            v-model="detailsdialog"
            v-if="detailitem!==null && detailitem!==undefined"
            persistent
            max-width="400"
          >
            <v-card>
              <v-card-title class="title font-weight-light">
                <v-spacer></v-spacer>Details
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Category:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light">{{detailitem.category}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Description:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light">{{detailitem.description}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Room:</v-flex>
                      <v-flex
                        xs8
                        class="text-xs-right font-weight-light"
                      >{{detailitem.blockandroom}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Date & Time:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light">{{detailitem.dateandtime}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Comments:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light">{{detailitem.comments}}</v-flex>
                    </v-layout>
                    <br>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Status:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light info--text">Pending</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs5 class="text-xs-left font-weight-regular">Elapsed Time :</v-flex>
                      <v-flex xs7 class="text-xs-right font-weight-light">11 hr</v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="closedetails">Okay</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-toolbar flat color="primary">
            <v-spacer></v-spacer>
            <h1 class="font-weight-light text-xs-center my-4 white--text">Active Service Requests</h1>
            <v-spacer></v-spacer>
          </v-toolbar>
          <!-- <h1 class="font-weight-light text-xs-center my-4">Active Service Requests</h1> -->

          <v-flex xs12 sm6 offset-sm3>
            <v-list three-line>
              <div v-for="(item, index) in items" :key="index">
                <v-list-tile @click="opendetails(item)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.category }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">{{ item.description }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ item.blockandroom }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title class="text-truncate">{{ item.comments }}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.dateandtime }}</v-list-tile-action-text>

                    <!-- <v-icon v-if="item.status==1" color="success">lens</v-icon> -->
                    <!-- <v-icon v-else-if="item.status==2" color="error">lens</v-icon> -->
                    <!-- <v-icon v-else color="info">lens</v-icon> -->
                    <v-icon color="info">lens</v-icon>
                  </v-list-tile-action>
                </v-list-tile>

                <v-divider class="my-2" v-if="index + 1 < items.length" :key="index"></v-divider>
              </div>
            </v-list>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center column fill-height v-else>
        <br>
        <div class="text-xs-center">
          <v-icon size="220">vertical_split</v-icon>
        </div>
        <br>
        <h2 style="text-align:center;" class="font-weight-light">No Active Service Requests</h2>
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
      detailsdialog: false,
      items: [
        {
          dateandtime: "12 May 2019 7:30PM",
          comments: "Jaldi Kar Do Please",
          category: "Civil",
          description: "Wall Touchup Required",
          blockandroom: "B5 503",
          status: 1
        },
        {
          dateandtime: "12 May 2019 11:30PM",
          comments: "Jaldi Kar Do Please",
          category: "Heating, Ventilation & AC",
          description: "Wall Touchup Required",
          blockandroom: "B5 503",
          status: 2
        }
      ],
      detailitem: null
    };
  },
  methods: {
    opendetails(item) {
      this.detailitem = item;
      this.detailsdialog = true;
    },
    closedetails() {
      this.detailitem = null;
      this.detailsdialog = false;
    }
  }
};
</script>
