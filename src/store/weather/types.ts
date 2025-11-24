import {
  CurrentWeatherData,
  DailyWeatherData,
  HourlyWeatherData,
} from "../../types/weather";

export interface WeatherState {
  city: string | null;
  current: CurrentWeatherData | null;
  daily: DailyWeatherData | null;
  hourly: HourlyWeatherData | null;
  isLoading: boolean;
  error: string | null;
}
