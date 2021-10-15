export interface Forecast {
  condition: string;
  temperature: number;
  maxTemp: number;
  minTemp: number;
  city: string;
  icon: string;
  timestamp: number;
  zipCode: string;
}
