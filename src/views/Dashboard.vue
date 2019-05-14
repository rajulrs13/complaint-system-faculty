<template>
  <v-app>
    <v-content class="white">
      <router-view/>
    </v-content>

    <v-bottom-nav :active.sync="activeBtn" value="true" fixed app>
      <v-btn to="/newservice" flat color="teal">
        <span>New</span>
        <v-icon>add</v-icon>
      </v-btn>

      <v-btn to="/currentrequest" flat color="teal">
        <span>Active</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn to="/pastrequest" flat color="teal">
        <span>Past</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn to="/account" flat color="teal">
        <span>Account</span>
        <v-icon>person</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      activeBtn: 0,
      showNav: true
    };
  },
  created(){
    this.$router.replace('/newservice')
  }
};
</script>