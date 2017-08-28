import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IllnessPage } from './illness';

@NgModule({
  declarations: [
    IllnessPage,
  ],
  imports: [
    IonicPageModule.forChild(IllnessPage),
  ],
  exports: [
    IllnessPage
  ]
})
export class IllnessPageModule {}
