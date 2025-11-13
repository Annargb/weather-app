<template>
  <v-app-bar app color="primary" class="px-6">
    <div class="d-flex align-center">
      <v-icon color="secondary" class="shrink mr-3"
        >mdi-weather-partly-cloudy</v-icon
      >

      <p class="text-h6 mb-0">WeatherNow</p>
    </div>

    <v-spacer></v-spacer>

    <!-- <v-btn text @click="getCurrentLocation">
      <span class="mr-2">Current location</span>
      <v-icon color="success">mdi-crosshairs-gps</v-icon>
    </v-btn> -->
    <v-btn text :disabled="isLoading" @click="getCurrentLocation">
      <span class="mr-2">
        <template v-if="isLoading">Loading...</template>
        <template v-else>Current location</template>
      </span>
      <v-icon color="success">mdi-crosshairs-gps</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import logo from "@/assets/images/logo.svg";

export default Vue.extend({
  name: "HeaderView",
  data() {
    return {
      logo,
      isLoading: false,
    };
  },
  methods: {
    async saveLocationAndFetchWeather(lat: number, lon: number) {
      try {
        await this.$store.dispatch("weather/fetchWeatherByCoords", {
          lat,
          lon,
        });

        localStorage.setItem("lat", lat.toString());
        localStorage.setItem("lon", lon.toString());
      } catch (err) {
        console.error("Error fetching weather:", err);
        alert("Cannot fetch weather for your location. Showing default city.");
        this.$store.dispatch("weather/fetchWeatherByCity", "Warsaw, Poland");
      } finally {
        this.isLoading = false;
      }
    },

    getCurrentLocation() {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
      }

      this.isLoading = true;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.saveLocationAndFetchWeather(lat, lon);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Cannot get your location. Showing default city.");
          this.isLoading = false;
          this.$store.dispatch("weather/fetchWeatherByCity", "Warsaw, Poland");
        }
      );
    },
  },
  mounted() {
    this.$store.dispatch("weather/initWeather");
  },
});
</script>

<style scoped></style>
