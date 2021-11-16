import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { StateButtonComponent } from './components/state-button/state-button.component';
import { AutocompleteMatchDirective } from './directives/autocomplete-match.directive';
import { CountdownTimerDirective } from './directives/countdown-timer.directive';
import { CountryPipe } from './pipes/country.pipe';
import { FormatTimestampPipe } from './pipes/format-timestamp.pipe';
import { UnitPipe } from './pipes/unit.pipe';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const COMPONENTS = [
  CountdownTimerDirective,
  StateButtonComponent,
  LoaderSpinnerComponent,
  AutocompleteComponent,
];

const DIRECTIVES = [CountdownTimerDirective, AutocompleteMatchDirective];

const PIPES = [UnitPipe, FormatTimestampPipe, CountryPipe];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS, ...PIPES],
  exports: [...MODULES, ...DIRECTIVES, ...COMPONENTS, ...PIPES],
  imports: [...MODULES],
})
export class SharedModule {}
