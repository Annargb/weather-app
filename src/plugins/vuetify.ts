import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#f4f4f4",
        secondary: "#292929",
        accent: "#4CBB17",
        card: "#9ec9fc",
      },
      dark: {
        primary: "#312a2a",
        secondary: "#fff",
        accent: "#4CBB17",
      },
    },
    options: {
      customProperties: true,
    },
  },
});
