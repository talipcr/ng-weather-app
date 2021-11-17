import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { interval, Subject, timer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Country } from 'src/app/core/models/country';
import {
  Forecast,
  ForecastFromLocalStorage,
} from 'src/app/core/models/forecast';
import { CountryService } from 'src/app/core/services/country.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { StateButtonService } from 'src/app/shared/components/state-button/state-button.service';

@Component({
  selector: 'weather-app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss'],
})
export class ZipcodeComponent implements OnInit {
  autoRefresh$ = new Subject();
  autoRefreshInterval = interval(31000);

  zipCodeForm: FormGroup = this.fb.group({
    country: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
  });

  weatherList: Forecast[] = [];
  zipCodeList: ForecastFromLocalStorage[] = [];
  countries: Country[] = [];

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private localStorage: LocalStorageService,
    private stateButtonService: StateButtonService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    // Get countries
    this.countries = this.countryService.countries;

    // Init on first load
    this.initWeather();

    // Auto refresh every 30 seconds
    this.autoRefreshInterval.subscribe(async () => {
      this.autoRefresh$.next(0);
      timer(1000).subscribe(async () => await this.initWeather());
    });
  }

  public async initWeather(): Promise<void> {
    // Get weather list from local storage
    this.zipCodeList = this.localStorage.getLocalStorage('zipCode') ?? [];

    // Get weather list from API
    if (this.zipCodeList?.length > 0) {
      this.weatherService.getAllWeather(this.zipCodeList).subscribe((data) => {
        this.weatherList = data;
      });
    }
  }

  public async deleteWeather(weather: Forecast): Promise<void> {
    if (weather.zipCode && this.zipCodeList?.length > 0) {
      // Remove from local storage
      this.zipCodeList = this.zipCodeList.filter(
        (zipCodeData: ForecastFromLocalStorage) =>
          zipCodeData.zipCode !== weather.zipCode
      );
      this.localStorage.setLocalStorage('zipCode', this.zipCodeList);

      // Filter weather list
      this.weatherList = await this.weatherList.filter(
        (item) => item.zipCode !== weather.zipCode
      );

      // Toastr success
      this.toastr.success(
        'The weather data has been successfully deleted',
        'Success'
      );
    }
  }

  public getCountryCode(countryName: string): string {
    // return country code from country name
    return this.countries.find((item: Country) => item.name === countryName)!
      .code;
  }

  public async onSubmit(): Promise<void> {
    // Set button state to working
    this.stateButtonService.setButtonStateWorking();

    // Verify if zipcode is already in the list
    const isAlreadyInList = this.zipCodeList.includes(
      this.zipCodeForm.value.toString()
    );

    if (this.zipCodeForm.value && !isAlreadyInList) {
      // Get crountry code
      const country = this.getCountryCode(
        this.zipCodeForm.controls['country'].value
      )
        .toString()
        .toLowerCase();
      // Get zip code
      const zipCode = this.zipCodeForm.controls['zipCode'].value
        .toString()
        .toLowerCase();

      // Get weather data from API
      this.weatherService
        .getWeatherByZipCode(zipCode, country)
        .pipe(
          finalize(async () => {
            // Reset form
            await this.zipCodeForm.reset();
            // Set button state to done
            this.stateButtonService.setButtonStateDone();
          })
        )
        .subscribe((data: Forecast | unknown) => {
          if (data) {
            // add to current list
            this.weatherList = [data as Forecast, ...this.weatherList];
            // add to local storage
            this.zipCodeList = [{ zipCode, country }, ...this.zipCodeList];
            this.localStorage.setLocalStorage('zipCode', this.zipCodeList);

            // toastr success
            this.toastr.success(
              'The weather data has been successfully recovered',
              'Success'
            );
          }
        });
    } else {
      // Set button state to default
      this.stateButtonService.setButtonStateDefault();
      // toastr info
      this.toastr.info('Zipcode already in the list', 'Info');
    }
  }
}
