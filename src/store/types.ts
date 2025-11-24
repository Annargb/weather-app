import { LocationState } from "./location/types";
import { WeatherState } from "./weather/types";

export interface RootState {
  location: LocationState;
  weather: WeatherState;
}
