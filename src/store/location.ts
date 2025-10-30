import { Module } from "vuex";
import { RootState } from "./index";

export interface LocationState {
  lat: number | null;
  lon: number | null;
}

export const location: Module<LocationState, RootState> = {
  namespaced: true,
  state: () => ({
    lat: null,
    lon: null,
  }),
  mutations: {
    setLocation(state, payload: { lat: number; lon: number }) {
      state.lat = payload.lat;
      state.lon = payload.lon;
    },
  },
  actions: {
    updateLocation({ commit }, payload: { lat: number; lon: number }) {
      commit("setLocation", payload);
    },
  },
};
