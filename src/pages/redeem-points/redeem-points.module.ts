import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedeemPointsPage } from './redeem-points';

@NgModule({
  declarations: [
    RedeemPointsPage,
  ],
  imports: [
    IonicPageModule.forChild(RedeemPointsPage),
  ],
  exports: [
    RedeemPointsPage
  ]
})
export class RedeemPointsPageModule {}
