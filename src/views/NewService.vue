<template>
  <v-layout row>
    <v-flex xs12>
      <alert-component v-if="error" :text="error.message" :color="'error'"></alert-component>
      <alert-component v-if="success" :text="success.message" :color="'success'"></alert-component>
      <v-layout row wrap>
        <v-flex xs12>
          <v-toolbar flat color="primary">
            <v-spacer></v-spacer>
            <h1 class="font-weight-light text-xs-center my-4 white--text">New Service Request</h1>
            <v-spacer></v-spacer>
          </v-toolbar>
          <!-- <h1 class="font-weight-light text-xs-center my-4">New Service Request</h1> -->
          <v-form @submit.prevent="requestService" ref="form" v-model="requestformvalid">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
                  <span class="font-weight-thin caption">Request For</span>
                  <v-btn
                    ref="change_room_type_btn"
                    color="primary"
                    flat
                    @click="toggleTypeOfRoom"
                  >{{type_of_room}}</v-btn>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3>
                  <v-select
                    v-model="block_selected"
                    :items="list_of_blocks"
                    item-text="name"
                    item-value="name"
                    label="Select Block *"
                    prepend-icon="list_alt"
                    persistent-hint
                    :disabled="type_of_room == 'My Room'"
                    return-object
                    :rules="inputruleforselect"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 v-if="block_selected != ''">
                  <v-select
                    v-model="room_selected"
                    :items="list_of_rooms[block_selected.code]"
                    :disabled="type_of_room == 'My Room'"
                    item-text="name"
                    item-value="name"
                    label="Select Room *"
                    prepend-icon="list_alt"
                    persistent-hint
                    return-object
                    :rules="inputruleforselect"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 v-if="block_selected != '' && room_selected != ''">
                  <v-select
                    v-model="category"
                    :items="list_of_categories"
                    item-text="name"
                    item-value="name"
                    label="Select Category *"
                    prepend-icon="list_alt"
                    persistent-hint
                    return-object
                    :rules="inputruleforselect"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 v-if="category != ''">
                  <v-select
                    v-model="description"
                    :items="list_of_descriptions[category.code]"
                    item-text="name"
                    item-value="name"
                    label="Select Description *"
                    prepend-icon="horizontal_split"
                    persistent-hint
                    return-object
                    :rules="inputruleforselect"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 v-if="description != ''">
                  <v-select
                    v-model="availabilityoftime"
                    :items="list_of_time"
                    item-text="name"
                    item-value="name"
                    label="Availability Time *"
                    prepend-icon="access_time"
                    persistent-hint
                    return-object
                    :rules="inputruleforselect"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 v-if="availabilityoftime != ''">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="availabilityofdate"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="availabilityofdate"
                        label="Availability Date *"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        :rules="inputruleforselect"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="availabilityofdate" scrollable :min="minDate" :max="maxDate">
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(availabilityofdate)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex
                  xs12
                  sm6
                  offset-sm3
                  v-if="availabilityoftime != '' && availabilityofdate != ''"
                >
                  <v-textarea
                    name="input-7-1"
                    v-model="comments"
                    label="Comments/ Details"
                    auto-grow
                    rows="2"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :loading="loading"
                :disabled="!requestformvalid || loading"
                type="submit"
                raised
                ripple
              >Submit</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-form>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    inputruleforselect: [t => !!t || "Required"],
    requestformvalid: false,
    dialog: false,
    modal: false,
    valid: true,
    type_of_room: "",
    block_selected: "",
    list_of_blocks: [
      {
        name: "FH1",
        code: 1
      },
      {
        name: "FH2",
        code: 2
      },
      {
        name: "FH3",
        code: 3
      }
    ],
    room_selected: "",
    list_of_rooms: {
      1: [
        "001",
        "002",
        "003",
        "004",
        "005",
        "101",
        "102",
        "103",
        "104",
        "105",
        "201",
        "202",
        "203",
        "204",
        "205"
      ],
      2: [
        "001",
        "002",
        "003",
        "004",
        "005",
        "101",
        "102",
        "103",
        "104",
        "105",
        "201",
        "202",
        "203",
        "204",
        "205"
      ],
      3: [
        "001",
        "002",
        "003",
        "004",
        "005",
        "101",
        "102",
        "103",
        "104",
        "105",
        "201",
        "202",
        "203",
        "204",
        "205"
      ]
    },
    category: "",
    list_of_categories: [
      {
        name: "Assets",
        code: 1
      },
      {
        name: "Carpentry",
        code: 2
      },
      {
        name: "Civil",
        code: 3
      },
      {
        name: "Electrical",
        code: 4
      },
      {
        name: "Heating, Ventilation & AC",
        code: 5
      },
      {
        name: "House Keeping",
        code: 6
      },

      {
        name: "Pest Control",
        code: 7
      },
      {
        name: "Plumbing",
        code: 8
      },
      {
        name: "Safety & Security",
        code: 9
      }
    ],
    description: "",
    list_of_descriptions: {
      1: [
        {
          name: "Bucket Required",
          code: 1
        },
        {
          name: "Cot Replacement",
          code: 2
        },
        {
          name: "Dustbin Required",
          code: 3
        },
        {
          name: "Mattress Replacement",
          code: 4
        },
        {
          name: "Mug Required",
          code: 5
        },
        {
          name: "Pillows Required",
          code: 6
        },
        {
          name: "Other",
          code: 7
        }
      ],
      2: [
        {
          name: "Balcony Door Broken",
          code: 1
        },
        {
          name: "Balcony Door Latch Broken",
          code: 2
        },
        {
          name: "Chair Problem",
          code: 3
        },
        {
          name: "Cloth Hanger Required",
          code: 4
        },
        {
          name: "Cot Tightening",
          code: 5
        },
        {
          name: "Cupboard Drawer Broken",
          code: 6
        },
        {
          name: "Cupboard Handle Required",
          code: 7
        },
        {
          name: "Cupboard Latches Loose To Be Fixed",
          code: 8
        },
        {
          name: "Cupboard Latches Required",
          code: 9
        },
        {
          name: "Cupboard Lock Required",
          code: 10
        },
        {
          name: "Cupboard Problem",
          code: 11
        },
        {
          name: "Curtain Hooks Required",
          code: 12
        },
        {
          name: "Curtain Rod Required",
          code: 13
        },
        {
          name: "Curtain Rod To Be Fixed",
          code: 14
        },
        {
          name: "Door Needs To Be Replaced",
          code: 15
        },
        {
          name: "Door Handle Required",
          code: 16
        },
        {
          name: "Door Handle With Lock Required",
          code: 17
        },
        {
          name: "Door Lock Problem",
          code: 18
        },
        {
          name: "Door Lock Required",
          code: 19
        },
        {
          name: "Door Not Closing Properly",
          code: 20
        },
        {
          name: "Door Stopper Required",
          code: 21
        },
        {
          name: "Long Mirror Required",
          code: 22
        },
        {
          name: "Main Door Handle Required",
          code: 23
        },
        {
          name: "Mirror Hanging, Needs To Be Fixed",
          code: 24
        },
        {
          name: "Mirror Required",
          code: 25
        },
        {
          name: "Notice Board Required",
          code: 26
        },
        {
          name: "Other",
          code: 27
        },
        {
          name: "Pad Lock (7 Lever) Required",
          code: 28
        },
        {
          name: "Pad Lock (Small) Required",
          code: 29
        },
        {
          name: "Restroom Door Handle Required",
          code: 30
        },
        {
          name: "Rope Required For Drying Clothes",
          code: 31
        },
        {
          name: "Soap Tray Needs To Be Fixed",
          code: 32
        },
        {
          name: "Table Drawer Needs To Be Fixed",
          code: 33
        },
        {
          name: "Towel Rod Required",
          code: 34
        },
        {
          name: "Towel Rod Needs To Be Fixed",
          code: 35
        },
        {
          name: "Window Glass Broken",
          code: 36
        },
        {
          name: "Window Lock Broken",
          code: 37
        }
      ],
      3: [
        {
          name: "Other",
          code: 1
        },
        {
          name: "Paint Touchup On Wall",
          code: 2
        },
        {
          name: "Tiles Broken",
          code: 3
        },
        {
          name: "Wall Painting Required",
          code: 4
        },
        {
          name: "Wall Seepage",
          code: 5
        }
      ],
      4: [
        {
          name: "3 Pin Plug Point Required",
          code: 1
        },
        {
          name: "Ceiling Fan Not Working",
          code: 2
        },
        {
          name: "CFL Bulb Required",
          code: 3
        },
        {
          name: "Electric Switch Required",
          code: 4
        },
        {
          name: "Electric Switch Board Required",
          code: 5
        },
        {
          name: "Exhaust Fan Not Working",
          code: 6
        },
        {
          name: "Exhaust Fan Required",
          code: 7
        },
        {
          name: "Fan Regulator Required",
          code: 8
        },
        {
          name: "Fan Required",
          code: 9
        },
        {
          name: "Geyser Not Working",
          code: 10
        },
        {
          name: "Geyser Connection Pipe Required",
          code: 11
        },
        {
          name: "Lift Problem",
          code: 12
        },
        {
          name: "MCB Not Working",
          code: 13
        },
        {
          name: "Night Lamp Required",
          code: 14
        },
        {
          name: "Other",
          code: 15
        },
        {
          name: "Tube Light Required",
          code: 16
        },
        {
          name: "TV Not Working",
          code: 17
        }
      ],
      5: [
        {
          name: "AC Cooling Not Effective",
          code: 1
        },
        {
          name: "AC Heating Not Effective",
          code: 2
        },
        {
          name: "AC Noisy",
          code: 3
        },
        {
          name: "AC Not Working",
          code: 4
        },
        {
          name: "Bathroom Exhaust Not Working",
          code: 5
        },
        {
          name: "Other",
          code: 6
        }
      ],
      6: [
        {
          name: "Chair & Sofa Cleaning Required",
          code: 1
        },
        {
          name: "Cob Web Cleaning Required",
          code: 2
        },
        {
          name: "Common Area Cleaning Required",
          code: 3
        },
        {
          name: "Common Washroom Cleaning Required",
          code: 4
        },
        {
          name: "Corridor Cleaning Required",
          code: 5
        },
        {
          name: "Corridor Dustbin Cleaning Required",
          code: 6
        },
        {
          name: "Fan Cleaning Required",
          code: 7
        },
        {
          name: "Floor Cleaning Of Room Required",
          code: 8
        },
        {
          name: "Lift Cleaning Required",
          code: 9
        },
        {
          name: "Mirror Cleaning Of Room Required",
          code: 10
        },
        {
          name: "Other",
          code: 11
        },
        {
          name: "Room Cleaning Required",
          code: 12
        },
        {
          name: "Room Dustbin Cleaning Required",
          code: 13
        },
        {
          name: "Wardrobe Cleaning Required",
          code: 14
        },
        {
          name: "Washroom Cleaning Required",
          code: 15
        },
        {
          name: "Window Cleaning Required",
          code: 16
        }
      ],
      7: [
        {
          name: "Bed Bugs Problem",
          code: 1
        },
        {
          name: "Cockroach Problem",
          code: 2
        },
        {
          name: "Flies Problem",
          code: 3
        },
        {
          name: "Mouse Problem",
          code: 4
        },
        {
          name: "Other",
          code: 5
        }
      ],
      8: [
        {
          name: "Automatic Water Level Controller Not Working",
          code: 1
        },
        {
          name: "Dummy Cap Required",
          code: 2
        },
        {
          name: "H/F Gun Handle Broken",
          code: 3
        },
        {
          name: "H/F Gun Replacement",
          code: 4
        },
        {
          name: "H/F Gun Stand Required",
          code: 5
        },
        {
          name: "H/F Pipe Replacement",
          code: 6
        },
        {
          name: "Hot & Cold Dispenser Not Working",
          code: 7
        },
        {
          name: "Hot & Cold Dispenser Tap Leakage",
          code: 8
        },
        {
          name: "Hot Water Problem",
          code: 9
        },
        {
          name: "Other",
          code: 10
        },
        {
          name: "Shower Not Working",
          code: 11
        },
        {
          name: "Sink Needs To Be Fixed",
          code: 12
        },
        {
          name: "Tap Required",
          code: 13
        },
        {
          name: "W/C Broken (Required)",
          code: 14
        },
        {
          name: "W/C Drain Pipe Blocked",
          code: 15
        },
        {
          name: "W/C Flush Tank Clamp",
          code: 16
        },
        {
          name: "W/C Flushing Problem",
          code: 17
        },
        {
          name: "W/C Seat Cover Required",
          code: 18
        },
        {
          name: "W/C Seat Required",
          code: 19
        },
        {
          name: "Wash Basin Broken",
          code: 20
        },
        {
          name: "Wash Basin Drain Pipe Blocked",
          code: 21
        },
        {
          name: "Wash Basin Drain Pipe Required",
          code: 22
        },
        {
          name: "Wash Basin Tap Required",
          code: 23
        },
        {
          name: "Wash Basin Tap Splendor Problem",
          code: 24
        },
        {
          name: "Wash Basin Tap To Be Tighten",
          code: 25
        }
      ],
      9: [
        {
          name: "CCTV Not Working",
          code: 1
        },
        {
          name: "Fire Alarm System Not Working",
          code: 2
        },
        {
          name: "Fire Extinguisher Refilling Required",
          code: 3
        },
        {
          name: "Fire Signange Missing",
          code: 4
        },
        {
          name: "First Aid Medicines To Replenished",
          code: 5
        },
        {
          name: "Medical Equipment To Be Repaired",
          code: 6
        },
        {
          name: "Other",
          code: 7
        },
        {
          name: "PA System Not Working",
          code: 8
        }
      ]
    },
    availabilityoftime: "",
    list_of_time: [
      "6AM - 7AM",
      "7AM - 8AM",
      "8AM - 9AM",
      "9AM - 10AM",
      "10AM - 11AM",
      "11AM - 12PM",
      "12PM - 1PM",
      "1PM - 2PM",
      "2PM - 3PM",
      "3PM - 4PM",
      "4PM - 5PM",
      "5PM - 6PM",
      "6PM - 7PM",
      "7PM - 8PM",
      "8PM - 9PM",
      "9PM - 10PM",
      "10PM - 11PM",
      "11PM - 12AM"
    ],
    availabilityofdate: new Date().toISOString().substr(0, 10),
    minDate: new Date().toISOString().substr(0, 10),
    comments: ""
  }),
  methods: {
    toggleTypeOfRoom() {
      var userblk = this.$store.getters.getUserBlockShortName;
      var userblkcode = userblk[userblk.length - 1];
      var userroom = this.$store.getters.getUserFlat;
      if (this.type_of_room == "My Room") {
        this.type_of_room = "Other Room";
        this.block_selected = "";
        this.room_selected = "";
        this.category = "";
        this.description = "";
        this.availabilityoftime = "";
        this.comments = "";
      } else {
        this.type_of_room = "My Room";
        this.block_selected = {
          name: userblk,
          code: userblkcode
        };
        this.room_selected = userroom;
        this.category = "";
        this.description = "";
        this.availabilityoftime = "";
        this.comments = "";
      }
    },
    requestService() {
      var userblk = this.$store.getters.getUserBlockShortName;
      var userblkcode = userblk[userblk.length - 1];
      var userroom = this.$store.getters.getUserFlat;
      var obj = {
        block: this.block_selected.name,
        room: this.room_selected,
        category: this.category.name,
        description: this.description.name,
        availabilityoftime: this.availabilityoftime,
        availabilityofdate: this.availabilityofdate,
        comments: this.comments
      };
      this.$store.dispatch("requestService", obj);
      this.type_of_room = "My Room";
      this.block_selected = {
        name: userblk,
        code: userblkcode
      };
      this.room_selected = userroom;
      this.category = "";
      this.description = "";
      this.availabilityoftime = "";
      this.comments = "";
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
    maxDate() {
      var k = new Date().getTime();
      k = k + 1000 * 60 * 60 * 24 * 1;
      return new Date(k).toISOString().substr(0, 10);
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
  created() {
    var userblk = this.$store.getters.getUserBlockShortName;
    var userblkcode = parseInt(userblk[userblk.length - 1]);
    var userroom = this.$store.getters.getUserFlat;
    this.type_of_room = "My Room";
    this.block_selected = {
      name: userblk,
      code: userblkcode
    };
    this.room_selected = userroom;
  },
  mounted() {
    this.toggleTypeOfRoom();
    this.toggleTypeOfRoom();
  }
};
</script>
