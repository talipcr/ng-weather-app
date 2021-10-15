import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/zipcode/zipcode.module').then(
        (mod) => mod.ZipcodeModule
      ),
  },
  {
    path: 'forecast',
    loadChildren: () =>
      import('./modules/forecast/forecast.module').then(
        (mod) => mod.ForecastModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
