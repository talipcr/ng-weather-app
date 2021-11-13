import { Component, Input, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonStateModel } from './state-button';
import { StateButtonService } from './state-button.service';

@Component({
  selector: 'weather-app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.scss'],
})
export class StateButtonComponent {
  @Input() defaultTemplate: TemplateRef<any> | null = null;

  state$ = new BehaviorSubject<ButtonStateModel>(ButtonStateModel.DEFAULT);

  ButtonStateModel = ButtonStateModel;

  constructor(private StateButtonService: StateButtonService) {
    this.state$ = this.StateButtonService.buttonState$;
  }
}
