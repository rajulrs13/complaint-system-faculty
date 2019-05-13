import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: "#009688",
    secondary: "#B2DFDB",
    accent: "#8BC34A",
    error: colors.red.lighten1,
    warning: colors.purple.accent4,
    info: colors.blue.base,
    success: "#4CAF50",
    extra: "#BF360C"
  }
});