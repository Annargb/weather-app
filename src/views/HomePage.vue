<template>
  <v-container class="pa-6">
    <WeatherCard />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import WeatherCard from "@/components/WeatherCard.vue";

export default Vue.extend({
  name: "HomeView",
  components: {
    WeatherCard,
  },
  methods: {
    refreshWeather() {
      console.log("Оновлення погоди...");
    },
  },
});
</script>
