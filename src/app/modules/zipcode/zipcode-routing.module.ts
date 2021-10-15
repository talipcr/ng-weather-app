import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZipcodeComponent } from './zipcode.component';

const routes: Routes = [
  {
    path: '',
    component: ZipcodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZipcodeRoutingModule {}
