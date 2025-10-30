import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { location, LocationState } from "./location";

Vue.use(Vuex);

export interface RootState {
  location: LocationState;
}

const store: StoreOptions<RootState> = {
  modules: {
    location,
  },
};

export default new Vuex.Store<RootState>(store);
