import { Pipe, PipeTransform } from '@angular/core';
import { CountryService } from 'src/app/core/services/country.service';

@Pipe({
  name: 'country',
})
export class CountryPipe implements PipeTransform {
  constructor(private countryService: CountryService) {}
  transform(value: string): string | undefined {
    const country = this.countryService.countries.find(
      (country) => country.code === value
    );

    return country?.name;
  }
}
