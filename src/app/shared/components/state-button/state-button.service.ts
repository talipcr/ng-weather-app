import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { ButtonStateModel } from './state-button';

@Injectable({
  providedIn: 'root',
})
export class StateButtonService {
  public buttonState$: BehaviorSubject<ButtonStateModel> =
    new BehaviorSubject<ButtonStateModel>(ButtonStateModel.DEFAULT);

  public setButtonStateDefault(): void {
    this.buttonState$.next(ButtonStateModel.DEFAULT);
  }

  public setButtonStateWorking(): void {
    this.buttonState$.next(ButtonStateModel.WORKING);
  }

  public setButtonStateDone(): void {
    this.buttonState$.next(ButtonStateModel.DONE);
    timer(2000).subscribe(() => this.setButtonStateDefault());
  }
}
