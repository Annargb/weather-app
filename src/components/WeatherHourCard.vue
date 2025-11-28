<template>
  <v-card
    elevation="6"
    class="pa-3 rounded-xl d-flex flex-column align-center text-center glass-card"
  >
    <v-card-text class="w-100">
      <div class="text-subtitle-2 font-weight-medium mb-2">
        {{ formattedDateTime }}
      </div>

      <v-icon :size="36" color="yellow">{{ hourData.icon }}</v-icon>

      <div class="text-h6 font-weight-bold mt-2">{{ hourData.temp }}°</div>

      <div class="text-subtitle-2 mt-1">
        <v-icon small color="blue">mdi-weather-windy</v-icon>
        {{ hourData.wind }} km/h
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { HourlyWeather } from "@/types/weather";

export default Vue.extend({
  name: "WeatherHourCard",
  props: {
    hourData: { type: Object as () => HourlyWeather, required: true },
  },
  computed: {
    formattedDateTime(): string {
      const date = new Date(this.hourData.time + "Z");

      const day = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

      const time = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return `${day} ${time}`;
    },
  },
});
</script>

<style scoped>
.v-card {
  width: 100%;
  min-height: 140px;
}
.glass-card {
  background-color: rgb(245 245 245 / 15%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
