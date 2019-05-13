<template>
  
    <v-layout row>
      <v-flex xs12>
        <v-layout row wrap v-if="true">
          <v-flex xs12>
            <h1 class="font-weight-light text-xs-center my-4">Active Service Requests</h1>
            <v-list two-line>
              <template v-for="(item, index) in items">
                <v-list-tile :key="item.title" @click="toggle(index)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{ item.subtitle2 }}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                    
                    <v-icon color="info">lens</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                
                <v-divider class="my-2" v-if="index + 1 < items.length" :key="index"></v-divider>

              </template>
            </v-list>
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
      selected: [2],
      items: [
        {
          action: "12 May 2019 7:30PM",
          headline: "Civil",
          title: "123456789",
          subtitle:
            "Wall Touchup Required",
            subtitle2: "B5 503"
        },
        {
          action: "12 May 2019 7:30PM",
          headline: "Civil",
          title: "123456789",
          subtitle:
            "Wall Touchup Required",
            subtitle2: "B5 503"
        }
      ]
    };
  }
};
</script>
