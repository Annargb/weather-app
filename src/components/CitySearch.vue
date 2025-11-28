<template>
  <div class="city-search-wrapper" v-click-outside="handleOutsideClick">
    <v-text-field
      ref="cityInput"
      v-model="cityQuery"
      label="Search city"
      placeholder="Type a city..."
      outlined
      rounded
      dense
      clearable
      @keydown.enter="searchCity"
      @focus="openSuggestions"
      @click="openSuggestions"
      class="city-search-input"
    ></v-text-field>

    <v-card
      v-if="showSuggestions && filteredSuggestions.length"
      class="suggestions-card"
      elevation="4"
      ref="menuContent"
    >
      <v-list dense>
        <v-list-item
          v-for="(city, index) in filteredSuggestions"
          :key="index"
          @mousedown.prevent="selectCity(city)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ city }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card
      v-else-if="showSuggestions && cityQuery"
      class="suggestions-card px-4 py-2 grey--text text--darken-1"
      elevation="4"
    >
      No results
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CitySearch",
  data() {
    return {
      cityQuery: "",
      showSuggestions: false,
      popularCities: [
        "Warsaw, Poland",
        "London, UK",
        "Paris, France",
        "Los Angeles",
        "Berlin, Germany",
        "Tokyo, Japan",
        "Sydney, Australia",
      ],
    };
  },
  computed: {
    filteredSuggestions(): string[] {
      const query = this.cityQuery?.toLowerCase() ?? "";
      return this.popularCities.filter((city) =>
        city.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    openSuggestions() {
      this.showSuggestions = true;
    },

    searchCity() {
      if (!this.cityQuery) return;
      this.$store.dispatch("weather/fetchWeatherByCity", this.cityQuery);
      this.showSuggestions = false;
      this.cityQuery = "";
    },

    selectCity(city: string) {
      this.$store.dispatch("weather/fetchWeatherByCity", city);
      this.cityQuery = "";
      this.showSuggestions = false;
    },

    handleOutsideClick() {
      this.showSuggestions = false;
    },
  },
});
</script>

<style scoped>
.city-search-wrapper {
  width: 100%;
  max-width: 1100px;
  min-width: 280px;
  position: relative;
  margin-bottom: 20px;
}

.city-search-input input {
  cursor: text;
}

.city-search-input input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(158, 201, 252, 0.6);
  border-radius: 16px;
}

.suggestions-card {
  position: absolute;
  width: 100%;
  top: 56px;
  z-index: 10;
  border-radius: 16px;
  max-height: 200px;
  overflow-y: auto;
}
</style>
