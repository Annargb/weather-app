<template>
  <v-card elevation="9" class="pa-6 rounded-xl weather-card">
    <v-card-text>
      <v-row align="center" class="mb-2">
        <v-icon left color="blue">mdi-map-marker</v-icon>
        <div class="text-h5 font-weight-bold">{{ cityName }}</div>
      </v-row>

      <div class="text-subtitle-1 mb-4">{{ currentDateTime }}</div>

      <v-row align="center" class="weather-content">
        <v-col cols="12" md="8" class="text-center text-md-left">
          <div class="text-h2 font-weight-bold weather-temp">
            {{ temperatureDisplay }}°C
          </div>
          <div class="text-subtitle-1 mb-3">{{ weatherDescription }}</div>

          <v-row class="mt-4" justify="center" justify-md="start">
            <v-col class="d-flex align-center flex-column weather-parameter">
              <span class="text-subtitle-2 font-weight-medium mb-1">Wind</span>
              <div class="d-flex align-center">
                <v-icon left color="blue">mdi-weather-windy</v-icon>
                <span>{{ windDisplay }}</span>
              </div>
            </v-col>

            <v-col class="d-flex align-center flex-column weather-parameter">
              <span class="text-subtitle-2 font-weight-medium mb-1">
                Humidity
              </span>
              <div class="d-flex align-center">
                <v-icon left color="blue">mdi-water-percent</v-icon>
                <span>{{ humidityDisplay }}</span>
              </div>
            </v-col>

            <v-col class="d-flex align-center flex-column weather-parameter">
              <span class="text-subtitle-2 font-weight-medium mb-1">
                Visibility
              </span>
              <div class="d-flex align-center">
                <v-icon left color="blue">mdi-eye</v-icon>
                <span>{{ visibilityDisplay }}</span>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="4"
          class="d-flex justify-center align-center icon-wrapper"
        >
          <v-icon class="weather-icon" color="yellow">
            {{ weatherIcon }}
          </v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { RootState } from "../store/types";
import { weatherCodeDescriptions } from "@/utils/weatherCodeDescriptions";
import { weatherCodeIcons } from "@/utils/weatherCodeIcons";

export default Vue.extend({
  name: "WeatherCard",
  data() {
    return {
      dateTimeNow: new Date(),
      timer: null as number | null,
    };
  },
  computed: {
    weatherState(): RootState["weather"] {
      return this.$store.state.weather;
    },
    cityName(): string {
      return this.weatherState.city ?? "Unknown location";
    },
    temperature(): number | null {
      return this.weatherState.current?.temperature ?? null;
    },
    wind(): number | null {
      return this.weatherState.current?.windspeed ?? null;
    },
    humidity(): number | null {
      return this.weatherState.current?.humidity ?? null;
    },
    visibility(): number | null {
      return this.weatherState.current?.visibility ?? null;
    },
    weatherDescription(): string {
      const code = this.weatherState.current?.weathercode;
      return code != null ? weatherCodeDescriptions[code] : "-";
    },
    weatherIcon(): string {
      const code = this.weatherState.current?.weathercode;
      return code != null ? weatherCodeIcons[code] : "mdi-weather-cloudy";
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

<style scoped>
.weather-card {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgb(245 245 245 / 15%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.weather-temp {
  word-break: keep-all;
}
.weather-icon {
  font-size: 160px;
  transition: 0.3s ease;
}
.weather-parameter {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

@media (max-width: 960px) {
  .weather-icon {
    font-size: 120px;
  }
}

@media (max-width: 768px) {
  .weather-content {
    flex-direction: column !important;
    align-items: center;
    text-align: center;
  }
  .weather-parameter {
    width: 100%;
    margin-bottom: 16px;
  }
  .weather-temp {
    font-size: 36px !important;
  }
  .weather-icon {
    font-size: 100px;
    margin-bottom: 20px;
  }
}

@media (max-width: 470px) {
  .weather-temp {
    font-size: 32px !important;
  }
  .weather-icon {
    font-size: 80px;
  }
  .weather-parameter {
    margin-bottom: 18px;
  }
}
</style>
