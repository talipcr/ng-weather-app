import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { interval, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Forecast } from 'src/app/core/models/forecast';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
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
  autoRefreshInterval = interval(31000);
  autoRefresh$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    // init Form
    this.zipcodeForm = this.fb.control(
      { value: '', disabled: false },
      Validators.required
    );

    // init on first load
    this.initWeather();

    // auto refresh every 30 seconds
    this.autoRefreshInterval.subscribe(async () => {
      await this.initWeather();
      this.autoRefresh$.next(0);
    });
  }

  async initWeather(): Promise<void> {
    // Get weather list from local storage
    const zipCodeList = await this.localStorage.getLocation('zipCode');

    // Get weather list from API
    if (zipCodeList?.length > 0) {
      this.weatherService.getAllWeather(zipCodeList).subscribe((data) => {
        this.weatherList = data;
      });
    }
  }

  async deleteWeather(weather: Forecast): Promise<void> {
    // Get weather list from local storage
    const zipCodeList = await this.localStorage.getLocation('zipCode');

    if (weather.zipCode && zipCodeList?.length > 0) {
      // remove from local storage
      this.localStorage.setLocation(
        'zipCode',
        zipCodeList.filter((zipCode: string) => zipCode !== weather.zipCode)
      );

      // filter weather list
      this.weatherList = await this.weatherList.filter(
        (item) => item.zipCode !== weather.zipCode
      );

      // toastr success
      this.toastr.success(
        'The weather data has been successfully deleted',
        'Success'
      );
    }
  }

  async onSubmit(): Promise<void> {
    // Get weather list from local storage
    const zipCodeList = (await this.localStorage.getLocation('zipCode')) ?? [];

    // Verify if zipcode is already in the list
    const isAlreadyInList = zipCodeList.includes(
      this.zipcodeForm.value.toString()
    );

    if (this.zipcodeForm.value && !isAlreadyInList) {
      this.weatherService
        .getWeatherByZipCode(this.zipcodeForm.value)
        .pipe(
          finalize(async () => {
            this.zipcodeForm.clearValidators();
            await this.zipcodeForm.reset();
          })
        )
        .subscribe((data: Forecast) => {
          if (data) {
            // add to current list
            this.weatherList = [data, ...this.weatherList];

            // add to local storage
            this.localStorage.setLocation('zipCode', [
              data.zipCode.toString(),
              ...zipCodeList,
            ]);

            // toastr success
            this.toastr.success(
              'The weather data has been successfully recovered',
              'Success'
            );
          }
        });
    } else {
      this.zipcodeForm.markAsTouched();

      // toastr info
      this.toastr.info('Zipcode already in the list', 'Info');
    }
  }
}
