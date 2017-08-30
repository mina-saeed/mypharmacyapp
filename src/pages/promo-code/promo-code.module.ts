import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromoCodePage } from './promo-code';

@NgModule({
  declarations: [
    PromoCodePage,
  ],
  imports: [
    IonicPageModule.forChild(PromoCodePage),
  ],
  exports: [
    PromoCodePage
  ]
})
export class PromoCodePageModule {}
