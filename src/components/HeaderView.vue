<template>
  <v-app-bar app dense height="70" class="glass-header">
    <v-container fluid class="pa-0">
      <v-row align="center" justify="space-between" no-gutters>
        <!-- Ліва частина: логотип + назва -->
        <v-col cols="auto" class="d-flex align-center">
          <v-icon color="secondary" :size="36" class="mr-2"
            >mdi-weather-partly-cloudy</v-icon
          >
          <span class="text-h6 mb-0">WeatherNow</span>
        </v-col>

        <!-- Права частина: кнопка -->
        <v-col cols="auto" class="d-flex justify-end">
          <v-btn
            outlined
            text
            class="location-btn rounded-xl"
            :disabled="isLoading"
            @click="getCurrentLocation"
          >
            <v-icon small color="success" class="mr-1"
              >mdi-crosshairs-gps</v-icon
            >
            <span class="btn-text">{{
              isLoading ? "Loading..." : "My location"
            }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store/types";

export default Vue.extend({
  name: "HeaderView",
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
      } catch {
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
        async () => {
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

<style scoped>
.v-application .v-app-bar.glass-header {
  background-color: rgb(245 245 245 / 15%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.location-btn {
  min-width: 40px;
  padding: 4px 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

@media (max-width: 400px) {
  .btn-text {
    display: none;
  }
}
</style>
