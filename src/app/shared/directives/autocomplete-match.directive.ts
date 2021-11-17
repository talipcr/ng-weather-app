import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[weatherAppAutocompleteMatch]',
})
export class AutocompleteMatchDirective implements OnChanges {
  @Input('weatherAppAutocompleteMatch') public option: string = '';
  @Input() public searchValue: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  public ngOnChanges(): void {
    const match = this.option.replace(
      new RegExp(`(${this.searchValue})`, 'gi'),
      `<b>$1</b>`
    );

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      match
    );
  }
}
