import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { location, LocationState } from "./location";
import { weather, WeatherState } from "./weather";

Vue.use(Vuex);

export interface RootState {
  location: LocationState;
  weather: WeatherState;
}

const store: StoreOptions<RootState> = {
  modules: {
    location,
    weather,
  },
};

export default new Vuex.Store<RootState>(store);
