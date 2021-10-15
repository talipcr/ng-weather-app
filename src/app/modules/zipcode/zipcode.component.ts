import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Forecast } from 'src/app/core/models/forecast';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'weather-app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss'],
})
export class ZipcodeComponent implements OnInit {
  weatherList$: Observable<any> = {} as Observable<any>;
  weatherList: Forecast[] = [];
  zipcodeForm: FormControl = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.weatherList$ = this.weatherService.getAllWeather();
    this.weatherList$.subscribe((data) => {
      this.weatherList = data;
    });

    this.zipcodeForm = this.fb.control(
      { value: '', disabled: false },
      Validators.required
    );
  }

  deleteWeather(weather: Forecast): void {
    if (weather.zipCode) {
      // remove from local storage
      this.weatherService.deleteZipCode(weather.zipCode);

      // remove from current list
      this.weatherList = this.weatherList.filter(
        (w) => w.zipCode !== weather.zipCode
      );

      // toastr success
      this.toastr.success(
        'The weather data has been successfully deleted',
        'Success'
      );
    }
  }

  onSubmit(): void {
    if (
      this.zipcodeForm.value &&
      !this.weatherService.isZipCodeExist(this.zipcodeForm.value)
    ) {
      this.weatherService
        .getWeatherByZipCode(this.zipcodeForm.value)
        .subscribe((data: Forecast) => {
          if (data) {
            // add to current list
            this.weatherList = [data, ...this.weatherList];

            // add to local storage
            this.weatherService.setZipCode(data.zipCode);

            // toastr success
            this.toastr.success(
              'The weather data has been successfully recovered',
              'Success'
            );
          }
        });
      this.zipcodeForm.reset();
    } else {
      this.zipcodeForm.markAsTouched();
    }
  }
}
