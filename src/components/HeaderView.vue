<template>
  <v-app-bar app color="card" class="px-16">
    <div class="d-flex align-center">
      <v-icon color="secondary" class="shrink mr-2" :size="40"
        >mdi-weather-partly-cloudy</v-icon
      >

      <p class="text-h6 mb-0">WeatherNow</p>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      outlined
      text
      :disabled="isLoading"
      class="rounded-xl"
      @click="getCurrentLocation"
    >
      <span class="mr-2">
        <template v-if="isLoading">Loading...</template>
        <template v-else>My location</template>
      </span>
      <v-icon color="success">mdi-crosshairs-gps</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store/types";

export default Vue.extend({
  name: "HeaderView",
  data() {
    return {
      logo: require("@/assets/images/logo.svg"),
    };
  },
  computed: {
    isLoading(): boolean {
      return (this.$store.state as RootState).weather.isLoading;
    },
  },
  methods: {
    async saveLocationAndFetchWeather(lat: number, lon: number): Promise<void> {
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
        await this.$store.dispatch(
          "weather/fetchWeatherByCity",
          "Warsaw, Poland"
        );
      }
    },
    getCurrentLocation(): void {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await this.saveLocationAndFetchWeather(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        async (error) => {
          console.error("Geolocation error:", error);
          alert("Cannot get your location. Showing default city.");
          await this.$store.dispatch(
            "weather/fetchWeatherByCity",
            "Warsaw, Poland"
          );
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
