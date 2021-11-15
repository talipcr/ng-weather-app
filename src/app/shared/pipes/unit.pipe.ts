import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit',
})
export class UnitPipe implements PipeTransform {
  transform(value: string | null, args: 'METRIC' | 'IMPERIAL'): string {
    const unit = args === 'METRIC' ? '°' : 'F';
    return value + unit;
  }
}
