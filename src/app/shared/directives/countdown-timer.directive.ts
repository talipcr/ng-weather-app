import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[weatherAppCountdownTimer]',
})
export class CountdownTimerDirective implements OnInit {
  @Input('weatherAppCountdownTimer') isRefreshTimer$ = new Subject();

  countDown$: Observable<number> = new Observable();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initialize();
    this.countDown$.subscribe((value) => {
      if (value) {
        this.renderer.setProperty(
          this.el.nativeElement,
          'innerHTML',
          'Last update 00:' + (value < 10 ? '0' + value : value) + ' min ago'
        );
      }
    });
  }

  initialize(): void {
    this.countDown$ = this.isRefreshTimer$.pipe(
      startWith(0),
      switchMap(() => timer(0, 1000))
    );

    this.isRefreshTimer$.subscribe((value) => {
      if (value === 0) {
        this.renderer.setProperty(
          this.el.nativeElement,
          'innerHTML',
          'Updating weather...'
        );
      }
    });
  }
}
