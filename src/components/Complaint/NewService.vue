<template>
  
    <v-layout row>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12>
            <h1 class="font-weight-light text-xs-center my-4">New Service Request</h1>
            <v-form @submit.prevent="validate" ref="form" v-model="registrationformvalid">
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-select
                      v-model="category"
                      :items="list_of_categories"
                      item-text="name"
                      item-value="name"
                      label="Select Category"
                      prepend-icon="list_alt"
                      persistent-hint
                      return-object
                      :rules="inputruleforsubject"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-select
                      v-if="category != ''"
                      v-model="description"
                      :items="list_of_descriptions[category.code]"
                      item-text="name"
                      item-value="name"
                      label="Select Description"
                      prepend-icon="horizontal_split"
                      persistent-hint
                      return-object
                      :rules="inputruleforsubject"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-select
                      v-if="description != ''"
                      v-model="availabilityoftime"
                      :items="list_of_time"
                      item-text="name"
                      item-value="name"
                      label="Availability Time"
                      prepend-icon="access_time"
                      persistent-hint
                      return-object
                      :rules="inputruleforsubject"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 offset-sm3 v-if="availabilityoftime != ''">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="availabilityofdate"
                          label="Availability Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="availabilityofdate" scrollable :min="minDate">
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm6 offset-sm3>
                    <v-textarea
                      v-if="availabilityoftime != '' && availabilityofdate != ''"
                      name="input-7-1"
                      label="Comments/ Details"
                      auto-grow
                      rows="3"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="accent" :loading="loading" type="submit" raised ripple>Submit</v-btn>
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
    dialog: false,
    modal: false,
    valid: true,
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
    minDate: new Date().toISOString().substr(0, 10)
  }),
  methods: {},
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
