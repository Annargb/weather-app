<template>
  <v-app>
    <header-view></header-view>
    <v-main class="py-16 main-bg">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderView from "./components/HeaderView.vue";

export default Vue.extend({
  name: "App",
  components: {
    HeaderView,
  },
  data: () => ({
    //
  }),
});
</script>

<style scoped>
.main-bg {
  background: #8e8ca9;
  min-height: 100vh;
  padding-top: 20px;
}
</style>
