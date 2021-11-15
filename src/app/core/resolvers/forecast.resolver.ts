import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Forecast } from '../models/forecast';
import { WeatherService } from '../services/weather.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastResolver implements Resolve<boolean> {
  constructor(private weatherService: WeatherService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    // if route /forecast with zipCode and country
    if (route.params.zipCode && route.params.countryCode) {
      return this.weatherService
        .getForecast(route.params.zipCode, route.params.countryCode)
        .pipe(
          map((forecast: Forecast[]) => {
            if (forecast) {
              return forecast;
            } else {
              this.router.navigate(['/']);
              return false;
            }
          }),
          catchError(() => {
            this.router.navigate(['/']);
            return of(false);
          })
        );
    } else {
      this.router.navigate(['/']);
      return of(false);
    }
  }
}
