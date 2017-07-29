import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedProductPage } from './detailed-product';

@NgModule({
  declarations: [
    DetailedProductPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailedProductPage),
  ],
  exports: [
    DetailedProductPage
  ]
})
export class DetailedProductPageModule {}
