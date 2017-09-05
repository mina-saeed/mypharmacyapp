import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedOrderPage } from './detailed-order';

@NgModule({
  declarations: [
    DetailedOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailedOrderPage),
  ],
  exports: [
    DetailedOrderPage
  ]
})
export class DetailedOrderPageModule {}
