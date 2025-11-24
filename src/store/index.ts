import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";
import { location } from "./location/index";
import { weather } from "./weather/index";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    location,
    weather,
  },
};

export default new Vuex.Store<RootState>(store);
