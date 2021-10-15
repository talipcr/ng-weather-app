import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';

@NgModule({
  declarations: [ForecastComponent],
  imports: [SharedModule, ForecastRoutingModule],
})
export class ForecastModule {}
