import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from 'src/app/core/models/forecast';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'weather-app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  zipCode: string = '';
  listForecast: Forecast[] = [];
  city: string = '';

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    // get zipcode from url
    this.route.params.subscribe((params) => {
      this.zipCode = params?.zipCode;
    });
  }

  ngOnInit(): void {
    this.weatherService
      .getForecast(this.zipCode)
      .subscribe((data: Forecast[]) => {
        if (data) {
          this.listForecast = data;
          this.city = data[0].city;
        }
      });
  }

  returnDate(date: number): Date {
    return new Date(date * 1000);
  }
}
