<template>
  <v-card elevation="9" color="card" class="pa-6 rounded-xl" max-width="900">
    <v-card-text>
      <v-row align="center" class="mb-2">
        <v-icon left color="blue">mdi-map-marker</v-icon>
        <div class="text-h5 font-weight-bold">{{ cityName }}</div>
      </v-row>

      <div class="text-subtitle-1 mb-4">{{ currentDateTime }}</div>

      <v-row align="center">
        <v-col cols="8">
          <div class="text-h2 font-weight-bold">{{ temperatureDisplay }}°C</div>
          <div class="text-subtitle-1">{{ weatherDescription }}</div>

          <v-row class="mt-4" justify="start">
            <v-col class="d-flex align-center flex-column">
              <span class="text-subtitle-2 font-weight-medium mb-1">Wind</span>
              <div class="d-flex align-center">
                <v-icon left color="blue">mdi-weather-windy</v-icon>
                <span>{{ windDisplay }}</span>
              </div>
            </v-col>

            <v-col class="d-flex align-center flex-column">
              <span class="text-subtitle-2 font-weight-medium mb-1"
                >Humidity</span
              >
              <div class="d-flex align-center">
                <v-icon left color="blue">mdi-water-percent</v-icon>
                <span>{{ humidityDisplay }}</span>
              </div>
            </v-col>

            <v-col class="d-flex align-center flex-column">
              <span class="text-subtitle-2 font-weight-medium mb-1"
                >Visibility</span
              >
              <div class="d-flex align-center">
                <v-icon left color="blue">mdi-eye</v-icon>
                <span>{{ visibilityDisplay }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="4" class="d-flex justify-center align-center">
          <v-icon :size="180" color="yellow">{{ weatherIcon }}</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { weatherCodeDescriptions } from "@/utils/weatherCodeDescriptions";
import { weatherCodeIcons } from "@/utils/weatherCodeIcons";

interface WeatherCurrent {
  temperature: number | null;
  windspeed: number | null;
  humidity: number | null;
  visibility: number | null;
  description: string | null;
  weathercode: number;
}

interface WeatherState {
  city: string;
  current: WeatherCurrent;
}

export default Vue.extend({
  name: "WeatherCard",
  data() {
    return {
      dateTimeNow: new Date(),
      timer: null as number | null,
    };
  },
  computed: {
    cityName(): string {
      const state = this.$store.state.weather as WeatherState;
      return state.city || "Unknown location";
    },
    temperature(): number | null {
      const temp = (this.$store.state.weather as WeatherState).current
        .temperature;
      return temp !== null ? temp : null;
    },
    wind(): number | null {
      return (this.$store.state.weather as WeatherState).current.windspeed;
    },
    humidity(): number | null {
      return (this.$store.state.weather as WeatherState).current.humidity;
    },
    visibility(): number | null {
      return (this.$store.state.weather as WeatherState).current.visibility;
    },
    weatherDescription(): string {
      const code = (this.$store.state.weather as WeatherState).current
        .weathercode;
      return weatherCodeDescriptions[code] || "-";
    },
    currentDateTime(): string {
      const dateTime = this.dateTimeNow;

      const weekday = dateTime.toLocaleString("en-US", { weekday: "long" });
      const month = dateTime.toLocaleString("en-US", { month: "long" });
      const day = dateTime.getDate();
      const year = dateTime.getFullYear();

      const time = dateTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

      return `${weekday}, ${month} ${day}, ${year} ${time}`;
    },
    temperatureDisplay(): string {
      return this.temperature !== null ? this.temperature.toString() : "–";
    },
    windDisplay(): string {
      return this.wind !== null ? `${this.wind} km/h` : "–";
    },
    humidityDisplay(): string {
      return this.humidity !== null ? `${this.humidity}%` : "–";
    },
    visibilityDisplay(): string {
      return this.visibility !== null ? `${this.visibility} m` : "–";
    },
    weatherIcon(): string {
      const code = (this.$store.state.weather as WeatherState).current
        .weathercode;
      return weatherCodeIcons[code] || "mdi-weather-cloudy";
    },
  },
  mounted() {
    this.timer = window.setInterval(() => {
      this.dateTimeNow = new Date();
    }, 1000 * 30);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
});
</script>
