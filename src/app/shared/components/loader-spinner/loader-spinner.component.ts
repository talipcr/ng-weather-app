import { Component, Input } from '@angular/core';

@Component({
  selector: 'weather-app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss'],
})
export class LoaderSpinnerComponent {
  @Input() text: string = '';
}
