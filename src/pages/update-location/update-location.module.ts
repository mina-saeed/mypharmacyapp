import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateLocationPage } from './update-location';

@NgModule({
  declarations: [
    UpdateLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateLocationPage),
  ],
  exports: [
    UpdateLocationPage
  ]
})
export class UpdateLocationPageModule {}
