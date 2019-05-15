<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout
        row
        wrap
        v-if="pastServiceRequest!=null && pastServiceRequest!=undefined && pastServiceRequest.length>0"
      >
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
                      <v-flex xs5 class="text-xs-left font-weight-regular">Complaint ID:</v-flex>
                      <v-flex xs7 class="text-xs-right font-weight-light">{{detailitem.id}}</v-flex>
                    </v-layout>
                    <br>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Category:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light">{{detailitem.category}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Description:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light">{{detailitem.description}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Flat:</v-flex>
                      <v-flex
                        xs8
                        class="text-xs-right font-weight-light"
                      >{{detailitem.block + " " + detailitem.room}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Time:</v-flex>
                      <v-flex
                        xs8
                        class="text-xs-right font-weight-light"
                      >{{calculateTime(detailitem.requesttimestamp.seconds)}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Date:</v-flex>
                      <v-flex
                        xs8
                        class="text-xs-right font-weight-light"
                      >{{calculateDate(detailitem.requesttimestamp.seconds)}}</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Comments:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light">{{detailitem.comments}}</v-flex>
                    </v-layout>
                    <br>
                    <v-layout row wrap>
                      <v-flex xs4 class="text-xs-left font-weight-regular">Status:</v-flex>
                      <v-flex xs8 class="text-xs-right font-weight-light success--text">Resolved</v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs5 class="text-xs-left font-weight-regular">Time Taken:</v-flex>
                      <v-flex
                        xs7
                        class="text-xs-right font-weight-light"
                      >{{calculateTimeBetweenDates(detailitem.requesttimestamp.seconds,detailitem.resolvetimestamp.seconds)}}</v-flex>
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
          <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
          <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
          <v-toolbar flat color="primary">
            <v-spacer></v-spacer>
            <h1 class="font-weight-light text-xs-center my-4 white--text">Past Service Requests</h1>
            <v-spacer></v-spacer>
          </v-toolbar>
          <!-- <h1 class="font-weight-light text-xs-center my-4">Past Service Requests</h1> -->

          <v-flex xs12 sm6 offset-sm3>
            <v-list three-line>
              <div v-for="(item, index) in pastServiceRequest" :key="index">
                <v-list-tile @click="opendetails(item)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.category }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">{{ item.description }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ item.block + " " + item.room }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title class="text-truncate">{{ item.comments }}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ calculateTime(item.requesttimestamp.seconds) }}</v-list-tile-action-text>
                    <v-list-tile-action-text>{{ calculateDate(item.requesttimestamp.seconds) }}</v-list-tile-action-text>

                    <!-- <v-icon v-if="item.status==1" color="success">lens</v-icon> -->
                    <!-- <v-icon v-else-if="item.status==2" color="error">lens</v-icon> -->
                    <!-- <v-icon v-else color="info">lens</v-icon> -->
                    <v-icon color="success">lens</v-icon>
                  </v-list-tile-action>
                </v-list-tile>

                <v-divider class="my-2" v-if="index + 1 < pastServiceRequest.length" :key="index"></v-divider>
              </div>
            </v-list>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center column fill-height v-else>
        <v-container>
          <br>
          <div class="text-xs-center">
            <v-icon size="220">history</v-icon>
          </div>
          <br>
          <h2 style="text-align:center;" class="font-weight-light">No Past Service Requests</h2>
          <br>
          <p style="text-align:center;" class="font-weight-light">
            To request a service, click on
            <v-icon color="teal">add</v-icon>button down below
          </p>
        </v-container>
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
          id: "V8IBVpaTLnHPEc1lPhTB",
          date: "12 May 2019",
          time: "7:30 PM",
          comments: "Jaldi Kar Do Please",
          category: "Civil",
          description: "Wall Touchup Required",
          blockandroom: "FH1 101",
          status: 1
        },
        {
          id: "V8IBVpaTLnHPEc1lPhTB",
          date: "12 May 2019",
          time: "7:30 PM",
          comments: "Jaldi Kar Do Please",
          category: "Heating, Ventilation & AC",
          description: "Wall Touchup Required",
          blockandroom: "FH2 001",
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
    },
    calculateDate(secs) {
      var temp = new Date(secs * 1000);
      var date =
        temp.getDate() < 10
          ? "0" + temp.getDate().toString()
          : temp.getDate().toString();
      var month =
        temp.getMonth() + 1 < 10
          ? "0" + (temp.getMonth() + 1).toString()
          : (temp.getMonth() + 1).toString();
      var year = temp
        .getFullYear()
        .toString()
        .substr(-2);
      return date + "/" + month + "/" + year;
    },
    calculateTime(secs) {
      var temp = new Date(secs * 1000);
      var hrs =
        temp.getHours() < 10
          ? "0" + temp.getHours().toString()
          : temp.getHours().toString();
      var mins =
        temp.getMinutes() < 10
          ? "0" + temp.getMinutes().toString()
          : temp.getMinutes().toString();
      return hrs + ":" + mins;
    },
    calculateTimeBetweenDates(req, res) {
      const date1 = new Date(req * 1000);
      const date2 = new Date(res * 1000);
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      var diffMins = Math.floor(diffTime / 60000);
      var diffHours = Math.floor(diffMins / 60);
      var diffDays = Math.floor(diffHours / 24);
      if (diffDays < 1) {
        return (
          (diffHours % 24).toString() +
          "hrs" +
          " " +
          (diffMins % 60).toString() +
          "mins"
        );
      } else {
        return (
          diffDays.toString() +
          " days " +
          (diffHours % 24).toString() +
          " hrs " +
          (diffMins % 60).toString() +
          " mins"
        );
      }
    }
  },
  computed: {
    pastServiceRequest() {
      var temp = this.$store.getters.getServiceRequests;
      var pastrequests = [];
      if (temp != null && temp != undefined) {
        pastrequests = temp.filter(function(pastrequest) {
          return pastrequest.status == 1;
        });
      }
      function compare(a, b) {
        return b.resolvetimestamp.seconds - a.resolvetimestamp.seconds;
      }
      pastrequests.sort(compare);
      return pastrequests;
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
  }
};
</script>
