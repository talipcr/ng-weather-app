import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownTimerDirective } from './directives/countdown-timer.directive';
import { StateButtonComponent } from './components/state-button/state-button.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const COMPONENTS = [
  CountdownTimerDirective,
  StateButtonComponent,
  LoaderSpinnerComponent,
];

const DIRECTIVES = [CountdownTimerDirective];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS],
  exports: [...MODULES, ...DIRECTIVES, ...COMPONENTS],
  imports: [...MODULES],
})
export class SharedModule {}
