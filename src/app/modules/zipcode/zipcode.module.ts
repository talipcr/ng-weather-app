import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ZipcodeRoutingModule } from './zipcode-routing.module';
import { ZipcodeComponent } from './zipcode.component';

@NgModule({
  declarations: [ZipcodeComponent],
  imports: [SharedModule, ZipcodeRoutingModule],
})
export class ZipcodeModule {}
