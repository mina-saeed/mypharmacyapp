import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapTestPage } from './map-test';

@NgModule({
  declarations: [
    MapTestPage,
  ],
  imports: [
    IonicPageModule.forChild(MapTestPage),
  ],
  exports: [
    MapTestPage
  ]
})
export class MapTestPageModule {}
