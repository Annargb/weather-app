<template>
  <v-card elevation="9" color="card" class="pa-4 rounded-xl weekly-card">
    <v-card-text>
      <div class="text-h5 font-weight-bold mb-4">Weekly Forecast</div>

      <v-row dense>
        <v-col
          v-for="(day, index) in weeklyData"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="pa-3"
        >
          <WeatherDayCard :dayData="day" class="day-card" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherDayCard from "./WeatherDayCard.vue";
import { weatherCodeIcons } from "@/utils/weatherCodeIcons";
import { weatherCodeDescriptions } from "@/utils/weatherCodeDescriptions";

export default Vue.extend({
  name: "WeeklyWeatherCard",
  components: { WeatherDayCard },
  computed: {
    weeklyData() {
      const daily = this.$store.state.weather.daily;

      if (!daily || !daily.time) return [];

      return daily.time.map((_, i: number) => ({
        date: daily.time[i],
        tempMax: daily.temperature_2m_max?.[i],
        tempMin: daily.temperature_2m_min?.[i],
        wind: daily.windspeed_10m_max?.[i],
        weathercode: daily.weather_code?.[i],
        icon: weatherCodeIcons[daily.weather_code?.[i]] || "mdi-weather-cloudy",
        description:
          weatherCodeDescriptions[daily.weather_code?.[i]] || "Unknown",
      }));
    },
  },
});
</script>

<style scoped>
.weekly-card {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.day-card {
  flex: 1 1 auto;
}
</style>
