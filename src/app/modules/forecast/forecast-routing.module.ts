import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastResolver } from 'src/app/core/resolvers/forecast.resolver';
import { ForecastComponent } from './forecast.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      forecast: ForecastResolver,
    },
  },
  {
    path: ':zipCode',
    component: ForecastComponent,
    resolve: {
      forecast: ForecastResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForecastRoutingModule {}
