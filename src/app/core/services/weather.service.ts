import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Forecast, ForecastFromLocalStorage } from '../models/forecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = environment.apiUrl;
  private readonly apiKey = environment.apiKey;

  icons = ['snow', 'rain', 'clouds'];

  constructor(
    private readonly httpClient: HttpClient,
    private toastr: ToastrService
  ) {}

  public getAllWeather(
    zipCodeList: ForecastFromLocalStorage[]
  ): Observable<any> {
    if (zipCodeList.length > 0) {
      const zipCodes = zipCodeList.map((zipCodeData) => {
        return this.getWeatherByZipCode(
          zipCodeData.zipCode,
          zipCodeData.country
        );
      });

      return forkJoin(zipCodes).pipe(
        map((response) => response),
        catchError((error) => error)
      );
    } else {
      return of([]);
    }
  }

  public getWeatherByZipCode(
    zipCode: string,
    countryCode: string = 'fr'
  ): Observable<any> {
    return this.httpClient
      .get(
        `${this.apiUrl}weather?zip=${zipCode},${countryCode}&appid=${this.apiKey}&units=metric`
      )
      .pipe(
        map((response: any) => {
          const icon = this.icons.filter((icon) => {
            return icon.includes(response.weather[0].main.toLowerCase());
          });

          return {
            zipCode,
            country: response.sys.country,
            city: response.name,
            condition: response.weather[0]?.main,
            temperature: response.main.temp,
            minTemp: response.main.temp_min,
            maxTemp: response.main.temp_max,
            icon: icon.length ? icon[0] : 'sun',
            timestamp: response.dt,
          } as Forecast;
        }),
        catchError((error) => {
          // toastr error
          this.toastr.error(
            'An error occurred while retrieving the weather data',
            'Error'
          );
          return error;
        })
      );
  }

  public getForecast(
    zipCode: string,
    countryCode: string = 'fr'
  ): Observable<any> {
    return this.httpClient
      .get(
        `${this.apiUrl}forecast/daily?zip=${zipCode},${countryCode}&cnt=5&appid=${this.apiKey}&units=metric`
      )
      .pipe(
        map((response: any) => {
          const forecastTab: Forecast[] = [];
          const forecast = response?.list.map((forecast: any) => {
            const icon = this.icons.filter((icon) => {
              return icon.includes(forecast.weather[0].main.toLowerCase());
            });

            return {
              zipCode,
              country: response.sys.country,
              city: response.city.name,
              condition: forecast.weather[0].main,
              temperature: forecast.temp.day,
              minTemp: forecast.temp.min,
              maxTemp: forecast.temp.max,
              icon: icon.length ? icon[0] : 'sun',
              timestamp: forecast.dt,
            } as Forecast;
          });

          forecastTab.push(...forecast);

          return forecastTab;
        }),
        catchError((error) => {
          // toastr error
          this.toastr.error(
            'An error occurred while retrieving the weather data',
            'Error'
          );
          return error;
        })
      );
  }
}
