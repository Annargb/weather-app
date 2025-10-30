<template>
  <v-app-bar app color="primary" class="px-6">
    <div class="d-flex align-center">
      <v-img
        alt="Logo"
        class="shrink mr-2"
        contain
        :src="logo"
        transition="scale-transition"
        width="74"
      />

      <p class="white--text font-weight-bold text-h5 mb-0">
        Weather<span class="logo-highlight">App</span>
      </p>
    </div>

    <v-spacer></v-spacer>

    <v-btn text @click="getCurrentLocation">
      <span class="mr-2">Current location</span>
      <v-icon color="success">mdi-crosshairs-gps</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import logo from "@/assets/images/logo.svg";

export default Vue.extend({
  name: "HeaderView",
  data() {
    return {
      logo,
    };
  },
  methods: {
    ...mapActions("location", ["updateLocation"]),
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.$store.dispatch("location/updateLocation", {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
            console.log("Location saved to Vuex!");
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
  },
});
</script>

<style scoped>
.logo-highlight {
  color: #fbd473;
}
</style>
