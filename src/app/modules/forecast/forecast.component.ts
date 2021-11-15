import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from 'src/app/core/models/forecast';

@Component({
  selector: 'weather-app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent {
  zipCode: string = '';
  listForecast: Forecast[] = [];
  city: string = '';
  country: string = '';

  constructor(private route: ActivatedRoute) {
    // get data from forecast
    this.route.data.subscribe((data) => {
      this.listForecast = data.forecast;
      this.city = this.listForecast[0].city;
      this.country = this.listForecast[0].country;
    });
  }
}
