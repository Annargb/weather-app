import { Module } from "vuex";
import { RootState } from "../types";
import { LocationState } from "./types";

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
