import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Forecast } from '../models/forecast';
import { WeatherService } from '../services/weather.service';

@Injectable({
  providedIn: 'root',
})
export class ForecastResolver implements Resolve<boolean> {
  constructor(private weatherService: WeatherService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // if route /forecast with zipCode
    if (route.params.zipCode) {
      return this.weatherService.getForecast(route.params.zipCode).pipe(
        map((forecast: Forecast) => {
          if (forecast) {
            return true;
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
