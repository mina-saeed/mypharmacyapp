import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedAddressPage } from './detailed-address';

@NgModule({
  declarations: [
    DetailedAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailedAddressPage),
  ],
  exports: [
    DetailedAddressPage
  ]
})
export class DetailedAddressPageModule {}
