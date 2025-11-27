<template>
  <v-app-bar app dense height="70" color="card">
    <v-container fluid class="px-8">
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="auto" class="d-flex align-center">
          <v-icon color="secondary" :size="36" class="mr-2"
            >mdi-weather-partly-cloudy</v-icon
          >
          <span class="text-h6 mb-0">WeatherNow</span>
        </v-col>

        <v-col cols="auto" class="d-flex align-center justify-end">
          <v-btn
            outlined
            text
            class="location-btn rounded-xl mr-6"
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

          <div class="theme-toggle mr-6" @click="toggleTheme">
            <div class="toggle-track" :class="{ active: isDark }">
              <div class="toggle-thumb">
                <v-icon small color="white">
                  {{ isDark ? "mdi-weather-night" : "mdi-white-balance-sunny" }}
                </v-icon>
              </div>
            </div>
          </div>
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
  data() {
    return {
      isDark: false,
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
    toggleTheme(): void {
      this.isDark = !this.isDark;
      this.$vuetify.theme.dark = this.isDark;
      localStorage.setItem("themeDark", this.isDark ? "1" : "0");
    },
  },
  mounted() {
    const saved = localStorage.getItem("themeDark");
    if (saved !== null) {
      this.isDark = saved === "1";
      this.$vuetify.theme.dark = this.isDark;
    }

    this.$store.dispatch("weather/initWeather");
  },
});
</script>

<style scoped>
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
.theme-toggle {
  width: 46px;
  height: 24px;
  cursor: pointer;
  position: relative;
}
.toggle-track {
  background: #fff;
  border-radius: 24px;
  height: 100%;
  width: 100%;
  transition: 0.25s ease;
  display: flex;
  align-items: center;
}
.toggle-track.active {
  background: #fff;
}
.toggle-thumb {
  height: 20px;
  width: 20px;
  background: #9ec9fc;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.25s ease;
}
.toggle-track.active .toggle-thumb {
  transform: translateX(22px);
  background: #1e1e1e;
}
@media (max-width: 400px) {
  .btn-text {
    display: none;
  }
}
</style>
