import { openMeteoApi, geoMeteoApi, nominatimApi } from "./apiClient";
import { GeoLocation, ReverseGeoLocation } from "../types/geo";
import { WeatherData } from "../types/weather";

export async function getGeoLocationByCity(
  city: string
): Promise<GeoLocation | null> {
  const { data } = await geoMeteoApi.get("search", {
    params: { name: city, language: "en" },
  });
  const location = data.results?.[0];
  if (!location) return null;
  return {
    latitude: location.latitude,
    longitude: location.longitude,
    name: location.name,
  };
}

export async function getCityNameByCoords(
  lat: number,
  lon: number
): Promise<ReverseGeoLocation> {
  const { data } = await nominatimApi.get("reverse", {
    params: {
      lat,
      lon,
      "accept-language": "en",
      format: "json",
    },
  });

  const cityName =
    data.address.city ||
    data.address.town ||
    data.address.village ||
    data.address.municipality ||
    data.address.locality ||
    data.display_name ||
    "Unknown location";

  return { cityName };
}

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const { data } = await openMeteoApi.get("forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      current:
        "temperature_2m,wind_speed_10m,relativehumidity_2m,visibility,weather_code",
      hourly: "temperature_2m,wind_speed_10m",
      daily:
        "temperature_2m_max,temperature_2m_min,windspeed_10m_max,weather_code",
      timezone: "auto",
    },
  });

  return {
    current: {
      temperature: data.current.temperature_2m,
      windspeed: data.current.wind_speed_10m,
      humidity: data.current.relativehumidity_2m,
      visibility: data.current.visibility,
      weathercode: data.current.weather_code,
    },
    daily: {
      time: data.daily.time,
      temperature_2m_max: data.daily.temperature_2m_max,
      temperature_2m_min: data.daily.temperature_2m_min,
      windspeed_10m_max: data.daily.windspeed_10m_max,
      weather_code: data.daily.weather_code,
    },
    hourly: {
      time: data.hourly.time,
      temperature_2m: data.hourly.temperature_2m,
      wind_speed_10m: data.hourly.wind_speed_10m,
    },
  };
}
