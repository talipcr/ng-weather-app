export interface WeatherResponse {
  dt: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: Weather[];
}

export interface WeatherFiveDaysResponse {
  city: {
    coord: { lon: number; lat: number };
    country: string;
    id: number;
    name: string;
    population: number;
  };
  cnt: number;
  cod: string;
  list: WeatherList[];
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherList {
  weather: Weather[];
  temp: {
    day: number;
    min: number;
    max: number;
  };
  dt: number;
}
