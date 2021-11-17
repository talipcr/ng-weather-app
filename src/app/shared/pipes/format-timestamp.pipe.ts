import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimestamp',
})
export class FormatTimestampPipe implements PipeTransform {
  transform(value: number): Date {
    return new Date(value * 1000);
  }
}
