import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: "#01579B",
    secondary: colors.blue.darken3,
    accent: colors.orange,
    error: colors.red.lighten1,
    warning: colors.purple.accent4,
    info: colors.blue.base,
    success: colors.green.base,
    extra: "#BF360C"
  }
});