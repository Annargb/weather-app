<template>
  <v-card
    elevation="6"
    class="pa-3 rounded-xl d-flex flex-column align-center text-center glass-card"
  >
    <v-card-text class="w-100">
      <div class="text-subtitle-2 font-weight-medium mb-2">
        {{ weekday }}, {{ formattedDate }}
      </div>

      <v-icon :size="48" color="yellow">{{ dayData.icon }}</v-icon>

      <div class="text-h6 font-weight-bold mt-2">
        {{ dayData.tempMax }}° / {{ dayData.tempMin }}°
      </div>

      <div class="text-subtitle-2 mt-1">
        <v-icon small color="blue">mdi-weather-windy</v-icon>
        {{ dayData.wind }} km/h
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { WeeklyDay } from "../types/weather";

export default Vue.extend({
  name: "WeatherDayCard",
  props: {
    dayData: { type: Object as () => WeeklyDay, required: true },
  },
  computed: {
    weekday(): string {
      const date = new Date(this.dayData.date);
      return date.toLocaleString("en-US", { weekday: "long" });
    },
    formattedDate(): string {
      const date = new Date(this.dayData.date);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${day}.${month}`;
    },
  },
});
</script>

<style scoped>
.v-card {
  width: 100%;
  min-height: 180px;
}
.glass-card {
  background-color: rgb(245 245 245 / 15%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
