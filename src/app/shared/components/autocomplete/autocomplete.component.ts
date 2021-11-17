import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'weather-app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() controllerName: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = 'Search';
  @Input() options: any[] = [];

  optionsDisplayed: any[] = [];
  focused = false;

  constructor() {}

  public ngOnInit(): void {
    this.initOptionsDisplayed();

    this.form.controls[this.controllerName].valueChanges.subscribe((value) => {
      this.initOptionsDisplayed(value);
    });
  }

  public initOptionsDisplayed(value: string = ''): void {
    if (value) {
      this.optionsDisplayed = this.options
        .filter((option) => {
          return option.name.toLowerCase().includes(value.toLowerCase());
        })
        .splice(0, 5);
    }
  }

  public onOptionSelected(optionName: string): void {
    this.form.controls[this.controllerName].setValue(optionName);
    this.optionsDisplayed = [];
  }
}
