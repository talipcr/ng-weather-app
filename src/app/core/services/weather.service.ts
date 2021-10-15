import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Forecast } from '../models/forecast';

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

  getAllWeather(): Observable<any> {
    const zipCodeLocalStorage = localStorage.getItem('zipCode');
    const zipCodeTab: string[] = zipCodeLocalStorage
      ? JSON.parse(zipCodeLocalStorage)
      : [];

    if (zipCodeTab.length > 0) {
      const zipCodes = zipCodeTab.map((zipCode) => {
        return this.getWeatherByZipCode(zipCode);
      });

      return forkJoin(zipCodes).pipe(
        map((response) => response),
        catchError((error) => error)
      );
    } else {
      return of([]);
    }
  }

  getWeatherByZipCode(zipCode: string): Observable<any> {
    return this.httpClient
      .get(
        `${this.apiUrl}weather?zip=${zipCode
          .toString()
          .toLowerCase()},fr&appid=${this.apiKey}&units=metric`
      )
      .pipe(
        map((response: any) => {
          const icon = this.icons.filter((icon) => {
            return icon.includes(response.weather[0].main.toLowerCase());
          });

          return {
            zipCode,
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

  setZipCode(zipCode: string): void {
    const zipCodeStringify = JSON.stringify(zipCode);
    const zipCodeLocalStorage = localStorage.getItem('zipCode');

    if (!zipCodeLocalStorage?.includes(zipCodeStringify)) {
      let zipCodeTab: string[] = zipCodeLocalStorage
        ? JSON.parse(zipCodeLocalStorage)
        : [];
      zipCodeTab = [zipCodeStringify, ...zipCodeTab];
      localStorage.setItem('zipCode', JSON.stringify(zipCodeTab));
    }
  }

  deleteZipCode(zipCode: string): void {
    const zipCodeStringify = JSON.stringify(zipCode);
    const zipCodeLocalStorage = localStorage.getItem('zipCode');

    if (zipCodeLocalStorage?.includes(zipCodeStringify)) {
      const zipCodeTab: string[] = JSON.parse(zipCodeLocalStorage);
      const index = zipCodeTab.indexOf(zipCodeStringify);
      zipCodeTab.splice(index, 1);
      localStorage.setItem('zipCode', JSON.stringify(zipCodeTab));
    }
  }

  isZipCodeExist(zipCode: string): boolean {
    const zipCodeStringify = JSON.stringify(zipCode);
    const zipCodeLocalStorage = localStorage.getItem('zipCode');
    const zipCodeTab: string[] = zipCodeLocalStorage
      ? JSON.parse(zipCodeLocalStorage)
      : [];

    if (zipCodeTab.includes(zipCodeStringify)) {
      this.toastr.info('Zip Code already exist', 'Info');
      return true;
    }
    return false;
  }

  getForecast(zipCode: string): Observable<any> {
    return this.httpClient
      .get(
        `${this.apiUrl}forecast/daily?zip=${zipCode},fr&cnt=5&appid=${this.apiKey}&units=metric`
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
