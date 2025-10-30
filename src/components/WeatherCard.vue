<template>
  <v-card elevation="9" color="primary" class="pa-6 rounded-xl" max-width="400">
    <v-card-title class="justify-center">
      <span class="headline">Weather today</span>
    </v-card-title>

    <v-card-text class="text-center">
      <v-icon large color="blue">mdi-weather-partly-cloudy</v-icon>
      <div class="text-h5 mt-3">{{ city }}</div>
      <div class="text-h6 grey--text">
        +{{ temperature }}°C, {{ condition }}
      </div>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn color="primary" @click="$emit('refresh', city)"> Refresh </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "WeatherCard",
  props: {
    city: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
  },
});
</script>
