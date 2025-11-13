import { openMeteoApi, geoMeteoApi, nominatimApi } from "./apiClient";

export interface GeoLocation {
  latitude: number;
  longitude: number;
  name: string;
}

export interface ReverseGeoLocation {
  cityName: string;
}

export interface WeatherData {
  current: { temperature: number; windspeed: number };
  daily: number[];
  hourly: number[];
}

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
      current_weather: true,
      hourly: "temperature_2m,wind_speed_10m",
      daily: "temperature_2m_max,temperature_2m_min,windspeed_10m_max",
      timezone: "auto",
    },
  });

  console.log(data);

  return {
    current: {
      temperature: data.current_weather.temperature,
      windspeed: data.current_weather.windspeed,
    },
    daily: data.daily,
    hourly: data.hourly,
  };
}
