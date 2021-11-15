export interface Forecast {
  zipCode: string;
  country: string;
  city: string;
  condition: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  icon: string;
  timestamp: number;
}

export interface ForecastFromLocalStorage {
  zipCode: string;
  country: string;
}
