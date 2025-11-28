export interface GeoLocation {
  latitude: number;
  longitude: number;
  name: string;
  country?: string;
}

export interface ReverseGeoLocation {
  cityName: string;
}
