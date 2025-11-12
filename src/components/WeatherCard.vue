<template>
  <v-card elevation="9" color="primary" class="pa-6 rounded-xl" max-width="400">
    <v-card-title class="justify-center">
      <span class="headline">Weather today</span>
    </v-card-title>

    <v-card-text class="text-center">
      <v-icon large color="blue">mdi-weather-partly-cloudy</v-icon>
      <div class="text-h5 mt-3">{{ cityName }}</div>
      <div class="text-h6 grey--text">
        <template v-if="isLoading">
          <v-progress-circular
            indeterminate
            color="white"
            size="24"
          ></v-progress-circular>
        </template>
        <span v-else-if="error">{{ error }}</span>
        <span v-else>
          +{{ temperatureDisplay }}°C, wind {{ windspeedDisplay }} km/h
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "WeatherCard",
  computed: {
    cityName(): string {
      return this.$store.state.weather.city || "Unknown location";
    },
    temperature(): number | null {
      return this.$store.state.weather.current.temperature;
    },
    windspeed(): number | null {
      return this.$store.state.weather.current.windspeed;
    },
    isLoading(): boolean {
      return this.$store.state.weather.isLoading;
    },
    error(): string | null {
      return this.$store.state.weather.error;
    },
    temperatureDisplay(): string {
      return this.temperature !== null ? this.temperature.toString() : "–";
    },
    windspeedDisplay(): string {
      return this.windspeed !== null ? this.windspeed.toString() : "–";
    },
  },
});
</script>
