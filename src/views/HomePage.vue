<template>
  <v-container class="pa-6">
    <v-row dense>
      <v-col
        v-for="(card, index) in weatherCards"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <WeatherCard
          :city="card.city"
          :temperature="card.temperature"
          :condition="card.condition"
          @refresh="refreshWeather"
        />
      </v-col>
    </v-row>
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
  data: () => ({
    weatherCards: [{ city: "Poznan", temperature: 12, condition: "Cloudy" }],
  }),
  methods: {
    refreshWeather() {
      // TODO: тут можна зробити запит до API
      console.log("Оновлення погоди...");
    },
  },
});
</script>
