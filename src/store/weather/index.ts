import { Module } from "vuex";
import {
  getGeoLocationByCity,
  getCityNameByCoords,
  getWeather,
} from "@/api/weatherService";
import { RootState } from "../types";
import { WeatherState } from "./types";

export const weather: Module<WeatherState, RootState> = {
  namespaced: true,

  state: () => ({
    city: localStorage.getItem("current_city") || null,
    current: null,
    daily: null,
    hourly: null,
    isLoading: false,
    error: null,
  }),
  mutations: {
    setCity(state, payload: string) {
      state.city = payload;
      localStorage.setItem("current_city", payload);
    },
    setIsLoading(state, payload: boolean) {
      state.isLoading = payload;
    },
    setCurrentWeather(state, payload: WeatherState["current"]) {
      state.current = payload;
    },
    setDailyWeather(state, payload: WeatherState["daily"]) {
      state.daily = payload;
    },
    setHourlyWeather(state, payload: WeatherState["hourly"]) {
      state.hourly = payload;
    },
    setError(state, payload: string | null) {
      state.error = payload;
    },
  },
  actions: {
    async fetchWeatherData(
      { commit },
      { lat, lon, cityName }: { lat: number; lon: number; cityName: string }
    ) {
      try {
        const weatherData = await getWeather(lat, lon);
        commit("setCity", cityName);
        commit("setCurrentWeather", weatherData.current);
        commit("setHourlyWeather", weatherData.hourly);
        commit("setDailyWeather", weatherData.daily);
      } catch (err: unknown) {
        commit(
          "setError",
          err instanceof Error ? err.message : "Weather loading error"
        );
      }
    },

    async fetchWeatherByCity({ commit, dispatch }, city: string) {
      commit("setIsLoading", true);
      commit("setError", null);
      try {
        const location = await getGeoLocationByCity(city);
        if (!location) throw new Error("City not found");

        await dispatch("fetchWeatherData", {
          lat: location.latitude,
          lon: location.longitude,
          cityName: location.name,
        });
      } catch (err: unknown) {
        commit(
          "setError",
          err instanceof Error ? err.message : "Weather loading error"
        );
      } finally {
        commit("setIsLoading", false);
      }
    },

    async fetchWeatherByCoords(
      { commit, dispatch },
      { lat, lon }: { lat: number; lon: number }
    ) {
      commit("setIsLoading", true);
      commit("setError", null);

      try {
        const { cityName } = await getCityNameByCoords(lat, lon);
        await dispatch("fetchWeatherData", { lat, lon, cityName });
      } catch (err: unknown) {
        console.error("Error fetching weather by coords:", err);
        commit(
          "setError",
          err instanceof Error ? err.message : "Weather loading error"
        );
      } finally {
        commit("setIsLoading", false);
      }
    },

    async initWeather({ dispatch }) {
      const savedLat = localStorage.getItem("lat");
      const savedLon = localStorage.getItem("lon");
      const savedCity = localStorage.getItem("current_city");

      if (savedLat && savedLon) {
        await dispatch("fetchWeatherByCoords", {
          lat: Number(savedLat),
          lon: Number(savedLon),
        });
      } else if (savedCity) {
        await dispatch("fetchWeatherByCity", savedCity);
      } else {
        await dispatch("fetchWeatherByCity", "Warsaw, Poland");
      }
    },
  },
};
