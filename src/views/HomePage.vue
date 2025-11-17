<template>
  <v-container class="pa-6">
    <v-container fluid class="d-flex flex-column align-center pa-4">
      <WeatherCard class="weather-card-fixed-width mb-6" />
      <WeeklyWeatherCard class="weather-card-fixed-width" />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherCard from "@/components/WeatherCard.vue";
import WeeklyWeatherCard from "@/components/WeeklyWeatherCard.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    WeatherCard,
    WeeklyWeatherCard,
  },
  methods: {
    refreshWeather() {
      console.log("Оновлення погоди...");
    },
  },
});
</script>

<style scoped>
.weather-card-fixed-width {
  width: 100%;
  max-width: 1100px;
  min-width: 280px;
}
</style>
