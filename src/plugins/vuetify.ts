import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#f4f4f4",
        secondary: "#292929",
        accent: "#4CBB17",
      },
      dark: {
        primary: "#444444",
        secondary: "#fff",
        accent: "#4CBB17",
      },
    },
  },
});
