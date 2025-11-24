export interface DailyWeatherData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  windspeed_10m_max: number[];
  weather_code: number[];
}

export interface CurrentWeatherData {
  temperature: number;
  windspeed: number;
  humidity: number;
  visibility: number;
  weathercode: number;
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  wind_speed_10m: number[];
}

export interface WeatherData {
  current: CurrentWeatherData;
  daily: DailyWeatherData;
  hourly: HourlyWeatherData;
}

export interface WeeklyDay {
  date: string;
  tempMax?: number;
  tempMin?: number;
  wind?: number;
  weathercode?: number;
  icon: string;
  description: string;
}
