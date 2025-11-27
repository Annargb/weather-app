<template>
  <v-card elevation="9" color="card" class="pa-4 rounded-xl hourly-card">
    <v-card-text>
      <div class="text-h5 font-weight-bold mb-4">Hourly Forecast</div>

      <v-row dense>
        <v-col
          v-for="(hour, index) in hourlyData"
          :key="index"
          cols="6"
          sm="4"
          md="3"
          lg="2"
          class="pa-2"
        >
          <WeatherHourCard :hourData="hour" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "@/store/types";
import { HourlyWeatherData, HourlyWeather } from "@/types/weather";
import WeatherHourCard from "./WeatherHourCard.vue";
import { weatherCodeIcons } from "@/utils/weatherCodeIcons";

export default Vue.extend({
  name: "HourlyWeatherCard",
  components: { WeatherHourCard },

  computed: {
    hourlyState(): HourlyWeatherData | null {
      const store = this.$store.state as RootState;
      return store.weather.hourly || null;
    },
    hourlyData(): HourlyWeather[] {
      const hourly = this.hourlyState;
      if (!hourly) return [];

      const now = new Date();
      const currentHourISO = now.toISOString().slice(0, 13);

      const startIndex = hourly.time.findIndex((t) =>
        t.startsWith(currentHourISO)
      );

      if (startIndex === -1) return [];

      const endIndex = startIndex + 24;

      return hourly.time.slice(startIndex, endIndex).map((t, i) => {
        const idx = startIndex + i;

        return {
          time: t,
          temp: hourly.temperature_2m[idx],
          wind: hourly.windspeed_10m[idx],
          weathercode: hourly.weather_code?.[idx] ?? 0,
          icon:
            weatherCodeIcons[hourly.weather_code?.[idx] ?? 0] ||
            "mdi-weather-cloudy",
        };
      });
    },
  },
});
</script>

<style scoped>
.hourly-card {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
