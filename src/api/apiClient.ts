import axios from "axios";

export const openMeteoApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const geoMeteoApi = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const nominatimApi = axios.create({
  baseURL: "https://nominatim.openstreetmap.org/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
