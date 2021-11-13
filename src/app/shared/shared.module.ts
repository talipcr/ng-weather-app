import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownTimerDirective } from './directives/countdown-timer.directive';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const DIRECTIVES = [CountdownTimerDirective];

@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...MODULES, ...DIRECTIVES],
  imports: [...MODULES],
})
export class SharedModule {}
